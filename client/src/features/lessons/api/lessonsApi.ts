// client/src/features/lessons/api/lessonsApi.ts
import { apiClient } from '../../../services/apiClient';
import type { Lesson } from '../types/lesson.types';

export const lessonsApi = {
    getAll: () => apiClient<Lesson[]>('/lessons'),

    updateCompletion: (id: string, isCompleted: boolean) =>
        apiClient<Lesson>(`/lessons/${id}/completion`, {
            method: 'PATCH',
            body: JSON.stringify({ isCompleted }),
        }),
};