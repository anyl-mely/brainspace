// client/src/features/lessons/api/lessonsApi.ts
import type { Lesson } from '../types/lesson.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const lessonsApi = {
    getAll: async (): Promise<Lesson[]> => {
        const response = await fetch(`${API_BASE_URL}/lessons`);
        if (!response.ok) {
            throw new Error('Không thể tải danh sách bài học từ máy chủ');
        }
        return response.json();
    },

    updateCompletion: async (id: string, isCompleted: boolean): Promise<Lesson> => {
        const response = await fetch(`${API_BASE_URL}/lessons/${id}/completion`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isCompleted }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || 'Không thể cập nhật trạng thái hoàn thành bài học');
        }

        return response.json();
    },
};