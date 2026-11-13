// server/src/middlewares/validateRequest.ts
import type { Request, Response, NextFunction } from 'express';
import type { ZodType } from 'zod';

export const validateBody = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({
                status: 'fail',
                message: 'Dữ liệu đầu vào không hợp lệ',
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join('.') || 'body',
                    message: issue.message,
                })),
            });
            return;
        }

        // Ghi đè req.body bằng dữ liệu đã được Zod chuẩn hóa (trim khoảng trắng, loại bỏ trường lạ)
        req.body = result.data;
        next();
    };
};