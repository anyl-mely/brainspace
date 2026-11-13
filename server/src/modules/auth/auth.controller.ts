// server/src/modules/auth/auth.controller.ts
import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../../middlewares/errorHandler';
import { authService } from './auth.service';

export const authController = {
    register: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await authService.register(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },

    login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await authService.login(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    getMe: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (!req.user) {
                throw new AppError('Chưa xác thực người dùng', 401);
            }
            const user = await authService.getCurrentUser(req.user.userId);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },
};