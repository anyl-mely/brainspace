// server/src/modules/notes/note.controller.ts
import type { Request, Response, NextFunction } from 'express';
import { noteService } from './note.service';

export const noteController = {
    getAll: async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const notes = await noteService.getAllNotes();
            res.status(200).json(notes);
        } catch (error) {
            next(error);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const createdNote = await noteService.createNote(req.body);
            res.status(201).json(createdNote);
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = String(req.params.id);
            const updatedNote = await noteService.updateNote(id, req.body);
            res.status(200).json(updatedNote);
        } catch (error) {
            next(error);
        }
    },

    remove: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = String(req.params.id);
            await noteService.deleteNote(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
};