// server/src/middlewares/errorHandler.ts
import type { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

// Bắt các đường dẫn API không tồn tại (404 Not Found)
export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
    next(new AppError(`Không tìm thấy đường dẫn: ${req.method} ${req.originalUrl}`, 404));
};

// Trạm xử lý lỗi tập trung toàn hệ thống
export const globalErrorHandler = (
    err: Error | AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    // Bắt lỗi cú pháp JSON khi Client gửi Request Body bị lỗi định dạng
    if (err instanceof SyntaxError && 'body' in err) {
        res.status(400).json({
            status: 'fail',
            message: 'Định dạng JSON trong Request Body không hợp lệ',
        });
        return;
    }

    const statusCode = err instanceof AppError ? err.statusCode : 500;
    const message = err.message || 'Lỗi hệ thống nội bộ (Internal Server Error)';

    console.error(`[Backend Error] ${statusCode} - ${message}`);

    res.status(statusCode).json({
        status: statusCode >= 500 ? 'error' : 'fail',
        message,
    });
};