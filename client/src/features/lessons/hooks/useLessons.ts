// client/src/features/lessons/hooks/useLessons.ts
import { useCallback, useEffect, useState } from 'react';
import { lessonsApi } from '../api/lessonsApi';
import type { Lesson } from '../types/lesson.types';

export function useLessons() {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [selectedLessonId, setSelectedLessonId] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLessons = useCallback(async () => {
        try {
            setError(null);
            const data = await lessonsApi.getAll();
            setLessons(data);
            setSelectedLessonId((prevId) => {
                if (prevId && data.some((item) => item.id === prevId)) {
                    return prevId;
                }
                return data[0]?.id ?? '';
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Lỗi kết nối máy chủ');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLessons();
    }, [fetchLessons]);

    const toggleLessonCompletion = async (lessonId: string) => {
        const target = lessons.find((item) => item.id === lessonId);
        if (!target) return;

        const nextStatus = !target.isCompleted;
        // Cập nhật lạc quan (Optimistic UI) để phản hồi tức thì
        setLessons((prev) =>
            prev.map((item) => (item.id === lessonId ? { ...item, isCompleted: nextStatus } : item))
        );

        try {
            const updated = await lessonsApi.updateCompletion(lessonId, nextStatus);
            setLessons((prev) => prev.map((item) => (item.id === lessonId ? updated : item)));
        } catch (err) {
            // Hoàn tác nếu API thất bại
            setLessons((prev) =>
                prev.map((item) => (item.id === lessonId ? { ...item, isCompleted: target.isCompleted } : item))
            );
            setError(err instanceof Error ? err.message : 'Không thể cập nhật tiến độ');
        }
    };

    const selectedLesson = lessons.find((item) => item.id === selectedLessonId);

    return {
        lessons,
        selectedLesson,
        selectedLessonId,
        setSelectedLessonId,
        isLoading,
        error,
        toggleLessonCompletion,
        refreshLessons: fetchLessons,
    };
}