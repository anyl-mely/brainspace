// server/src/modules/lessons/lesson.controller.ts
import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../../middlewares/errorHandler';
import { lessonService } from './lesson.service';

function getAuthenticatedUserId(req: Request): string {
    if (!req.user?.userId) {
        throw new AppError('Chưa xác thực người dùng', 401);
    }
    return req.user.userId;
}

export const lessonController = {
    getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = getAuthenticatedUserId(req);
            const lessons = await lessonService.getAllLessons(userId);
            res.status(200).json(lessons);
        } catch (error) {
            next(error);
        }
    },

    getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = getAuthenticatedUserId(req);
            const id = String(req.params.id);
            const lesson = await lessonService.getLessonById(userId, id);
            res.status(200).json(lesson);
        } catch (error) {
            next(error);
        }
    },

    updateCompletion: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = getAuthenticatedUserId(req);
            const id = String(req.params.id);
            const updatedLesson = await lessonService.updateCompletionStatus(
                userId,
                id,
                req.body.isCompleted
            );
            res.status(200).json(updatedLesson);
        } catch (error) {
            next(error);
        }
    },
};