// client/src/features/notes/hooks/useNotes.ts
import { useState, useEffect } from 'react';
import { notesApi } from '../api/notesApi';
import type { CreateNoteInput, Note } from '../types/note.types';

export function useNotes(lessonId: string) {
    const [allNotes, setAllNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
                    const message = err instanceof Error ? err.message : 'Không thể kết nối tới máy chủ API.';
                    setError(message);
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

    const contextualNotes = allNotes.filter(
        (note) => note.lessonId === lessonId || !note.lessonId
    );

    const addNote = async ({ title, content, isConfusing }: CreateNoteInput): Promise<void> => {
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

    const toggleConfusing = async (noteId: string, currentStatus: boolean): Promise<void> => {
        const updatedNote = await notesApi.update(noteId, {
            isConfusing: !currentStatus,
        });

        setAllNotes((prev) =>
            prev.map((note) => (note.id === noteId ? { ...note, ...updatedNote } : note))
        );
    };

    const deleteNote = async (noteId: string): Promise<void> => {
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