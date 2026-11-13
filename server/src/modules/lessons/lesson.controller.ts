// server/src/modules/lessons/lesson.controller.ts
import type { Request, Response, NextFunction } from 'express';
import { lessonService } from './lesson.service';

export const lessonController = {
    getAll: async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const lessons = await lessonService.getAllLessons();
            res.status(200).json(lessons);
        } catch (error) {
            next(error);
        }
    },

    getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = String(req.params.id);
            const lesson = await lessonService.getLessonById(id);
            res.status(200).json(lesson);
        } catch (error) {
            next(error);
        }
    },

    updateCompletion: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = String(req.params.id);
            const updatedLesson = await lessonService.updateCompletionStatus(id, req.body.isCompleted);
            res.status(200).json(updatedLesson);
        } catch (error) {
            next(error);
        }
    },
};