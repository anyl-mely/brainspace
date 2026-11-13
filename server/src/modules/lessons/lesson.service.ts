// server/src/modules/lessons/lesson.service.ts
import { prisma } from '../../lib/prisma';
import { AppError } from '../../middlewares/errorHandler';
import type { LessonQuiz, LessonSummaryDto } from './lesson.schema';

export const lessonService = {
    getAllLessons: async (userId: string): Promise<LessonSummaryDto[]> => {
        const lessons = await prisma.lesson.findMany({
            orderBy: { order: 'asc' },
            include: {
                _count: {
                    select: {
                        notes: {
                            where: { userId },
                        },
                    },
                },
                progresses: {
                    where: { userId },
                    select: { isCompleted: true },
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
            isCompleted: Boolean(item.progresses[0]?.isCompleted),
            notesCount: item._count.notes,
        }));
    },

    getLessonById: async (userId: string, id: string) => {
        const lesson = await prisma.lesson.findUnique({
            where: { id },
            include: {
                notes: {
                    where: { userId },
                    orderBy: { createdAt: 'desc' },
                },
                progresses: {
                    where: { userId },
                    select: { isCompleted: true },
                },
            },
        });

        if (!lesson) {
            throw new AppError(`Không tìm thấy bài học với ID: ${id}`, 404);
        }

        const { progresses, ...lessonData } = lesson;

        return {
            ...lessonData,
            isCompleted: Boolean(progresses[0]?.isCompleted),
        };
    },

    updateCompletionStatus: async (
        userId: string,
        id: string,
        isCompleted: boolean
    ): Promise<LessonSummaryDto> => {
        const existingLesson = await prisma.lesson.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        notes: {
                            where: { userId },
                        },
                    },
                },
            },
        });

        if (!existingLesson) {
            throw new AppError(`Không tìm thấy bài học với ID: ${id}`, 404);
        }

        await prisma.lessonProgress.upsert({
            where: {
                userId_lessonId: {
                    userId,
                    lessonId: id,
                },
            },
            update: {
                isCompleted,
                completedAt: new Date(),
            },
            create: {
                userId,
                lessonId: id,
                isCompleted,
            },
        });

        return {
            id: existingLesson.id,
            title: existingLesson.title,
            duration: existingLesson.duration,
            order: existingLesson.order,
            coreContent: existingLesson.coreContent,
            objectives: existingLesson.objectives,
            quiz: existingLesson.quiz as unknown as LessonQuiz,
            isCompleted,
            notesCount: existingLesson._count.notes,
        };
    },
};