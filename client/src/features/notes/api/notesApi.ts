// client/src/features/notes/api/notesApi.ts
import { apiClient } from '../../../services/apiClient';
import type { CreateNotePayload, Note } from '../types/note.types';

export const notesApi = {
    getAll: () => apiClient<Note[]>('/notes'),

    create: (newNote: CreateNotePayload) =>
        apiClient<Note>('/notes', {
            method: 'POST',
            body: JSON.stringify(newNote),
        }),

    update: (id: string, updatedFields: Partial<Note>) =>
        apiClient<Note>(`/notes/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedFields),
        }),

    remove: (id: string) =>
        apiClient<void>(`/notes/${id}`, {
            method: 'DELETE',
        }),
};