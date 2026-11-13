// server/src/modules/notes/note.controller.ts
import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../../middlewares/errorHandler';
import { noteService } from './note.service';

function getAuthenticatedUserId(req: Request): string {
    if (!req.user?.userId) {
        throw new AppError('Chưa xác thực người dùng', 401);
    }
    return req.user.userId;
}

export const noteController = {
    getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = getAuthenticatedUserId(req);
            const notes = await noteService.getAllNotes(userId);
            res.status(200).json(notes);
        } catch (error) {
            next(error);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = getAuthenticatedUserId(req);
            const createdNote = await noteService.createNote(userId, req.body);
            res.status(201).json(createdNote);
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = getAuthenticatedUserId(req);
            const id = String(req.params.id);
            const updatedNote = await noteService.updateNote(userId, id, req.body);
            res.status(200).json(updatedNote);
        } catch (error) {
            next(error);
        }
    },

    remove: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = getAuthenticatedUserId(req);
            const id = String(req.params.id);
            await noteService.deleteNote(userId, id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
};