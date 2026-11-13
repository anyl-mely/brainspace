// server/src/middlewares/requireAuth.ts
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';

export interface AuthUserPayload {
    userId: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthUserPayload;
        }
    }
}

export const requireAuth = (req: Request, _res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError('Vui lòng đăng nhập để thực hiện thao tác này', 401));
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        return next(new AppError('Lỗi cấu hình bảo mật máy chủ (JWT_SECRET)', 500));
    }

    try {
        const decoded = jwt.verify(token, secret) as AuthUserPayload;
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
        };
        next();
    } catch {
        next(new AppError('Phiên đăng nhập không hợp lệ hoặc đã hết hạn', 401));
    }
};