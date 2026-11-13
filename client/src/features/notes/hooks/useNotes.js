// client/src/features/notes/hooks/useNotes.js
import { useState, useEffect } from 'react';
import { notesApi } from '../api/notesApi';

export function useNotes(lessonId) {
    const [allNotes, setAllNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. READ: Nạp dữ liệu từ API khi Component Mount
    useEffect(() => {
        let isMounted = true;

        const fetchNotes = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await notesApi.getAll();
                if (isMounted) {
                    setAllNotes(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || 'Không thể kết nối tới máy chủ API.');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchNotes();

        return () => {
            isMounted = false;
        };
    }, []);

    // Derived State: Lọc các ghi chú thuộc bài học đang xem (giữ lại cả ghi chú cũ chưa gắn lessonId)
    const contextualNotes = allNotes.filter(
        (note) => note.lessonId === lessonId || !note.lessonId
    );

    // 2. CREATE: Thêm ghi chú mới lên Server và cập nhật State
    const addNote = async ({ title, content, isConfusing }) => {
        const payload = {
            lessonId,
            title,
            content,
            isConfusing,
            createdAt: new Date().toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
            }),
        };

        const savedNote = await notesApi.create(payload);
        setAllNotes((prev) => [savedNote, ...prev]);
    };

    // 3. UPDATE: Đảo trạng thái "Cần ôn lại" / "Đã hiểu rõ" trực tiếp trên thẻ
    const toggleConfusing = async (noteId, currentStatus) => {
        const updatedNote = await notesApi.update(noteId, {
            isConfusing: !currentStatus,
        });

        setAllNotes((prev) =>
            prev.map((note) => (note.id === noteId ? { ...note, ...updatedNote } : note))
        );
    };

    // 4. DELETE: Xóa ghi chú khỏi Server và loại bỏ khỏi danh sách hiển thị
    const deleteNote = async (noteId) => {
        await notesApi.remove(noteId);
        setAllNotes((prev) => prev.filter((note) => note.id !== noteId));
    };

    return {
        notes: contextualNotes,
        isLoading,
        error,
        addNote,
        toggleConfusing,
        deleteNote,
    };
}