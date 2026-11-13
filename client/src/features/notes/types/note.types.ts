// client/src/features/notes/types/note.types.ts
export interface Note {
    id: string;
    lessonId?: string;
    title: string;
    content: string;
    isConfusing: boolean;
    createdAt?: string;
}

export interface CreateNoteInput {
    title: string;
    content: string;
    isConfusing: boolean;
}

export interface CreateNotePayload extends CreateNoteInput {
    lessonId: string;
    createdAt: string;
}