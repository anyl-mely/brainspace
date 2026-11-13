// server/src/app.ts
import express from 'express';
import cors from 'cors';
import noteRouter from './modules/notes/note.route';
import { notFoundHandler, globalErrorHandler } from './middlewares/errorHandler';

const app = express();

// 1. Bảo mật CORS: Chỉ cho phép tên miền Frontend được phép gọi API
app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
        credentials: true,
    })
);

// 2. Phân tích dữ liệu JSON từ Request Body
app.use(express.json());

// 3. Health Check Endpoint (Dùng giám sát trạng thái máy chủ trên Render)
app.get('/api/v1/health', (_req, res) => {
    res.status(200).json({
        status: 'OK',
        service: 'BrainSpace API',
        timestamp: new Date().toISOString(),
    });
});

// 4. Đăng ký các API Modules
app.use('/api/v1/notes', noteRouter);

// 5. Xử lý đường dẫn 404 & Trạm thu gom lỗi tập trung đặt ở cuối cùng
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;