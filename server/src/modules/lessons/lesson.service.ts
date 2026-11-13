// server/src/modules/lessons/lesson.service.ts
import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { AppError } from '../../middlewares/errorHandler';
import type { LessonQuiz, LessonSummaryDto } from './lesson.schema';

export const lessonService = {
    getAllLessons: async (): Promise<LessonSummaryDto[]> => {
        const lessons = await prisma.lesson.findMany({
            orderBy: { order: 'asc' },
            include: {
                _count: {
                    select: { notes: true },
                },
            },
        });

        return lessons.map((item) => ({
            id: item.id,
            title: item.title,
            duration: item.duration,
            order: item.order,
            coreContent: item.coreContent,
            objectives: item.objectives,
            quiz: item.quiz as unknown as LessonQuiz,
            isCompleted: item.isCompleted,
            notesCount: item._count.notes,
        }));
    },

    getLessonById: async (id: string) => {
        const lesson = await prisma.lesson.findUnique({
            where: { id },
            include: {
                notes: {
                    orderBy: { createdAt: 'desc' },
                },
            },
        });

        if (!lesson) {
            throw new AppError(`Không tìm thấy bài học với ID: ${id}`, 404);
        }

        return lesson;
    },

    updateCompletionStatus: async (id: string, isCompleted: boolean): Promise<LessonSummaryDto> => {
        try {
            const updated = await prisma.lesson.update({
                where: { id },
                data: { isCompleted },
                include: {
                    _count: {
                        select: { notes: true },
                    },
                },
            });

            return {
                id: updated.id,
                title: updated.title,
                duration: updated.duration,
                order: updated.order,
                coreContent: updated.coreContent,
                objectives: updated.objectives,
                quiz: updated.quiz as unknown as LessonQuiz,
                isCompleted: updated.isCompleted,
                notesCount: updated._count.notes,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new AppError(`Không tìm thấy bài học với ID: ${id}`, 404);
            }
            throw error;
        }
    },
};