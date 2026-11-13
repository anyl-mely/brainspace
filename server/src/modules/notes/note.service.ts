// server/src/modules/notes/note.service.ts
import { randomUUID } from 'crypto';
import { AppError } from '../../middlewares/errorHandler';
import type { CreateNoteDto, NoteEntity, UpdateNoteDto } from './note.schema';

// Kho lưu trữ tạm trên RAM (Sẽ được thay thế bằng PostgreSQL + Prisma ở Giai đoạn 6)
let notesStore: NoteEntity[] = [
    {
        id: 'note-init-01',
        lessonId: 'les-01',
        title: 'Tư duy Semantic HTML',
        content: 'Dùng <article> và <section> giúp cấu trúc trang mạch lạc thay vì lạm dụng <div>.',
        isConfusing: false,
        createdAt: '09:30',
    },
];

export const noteService = {
    getAllNotes: async (): Promise<NoteEntity[]> => {
        return notesStore;
    },

    createNote: async (dto: CreateNoteDto): Promise<NoteEntity> => {
        const newNote: NoteEntity = {
            id: randomUUID(),
            lessonId: dto.lessonId,
            title: dto.title,
            content: dto.content,
            isConfusing: dto.isConfusing,
            createdAt:
                dto.createdAt ||
                new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        };

        notesStore = [newNote, ...notesStore];
        return newNote;
    },

    updateNote: async (id: string, dto: UpdateNoteDto): Promise<NoteEntity> => {
        const index = notesStore.findIndex((note) => note.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy ghi chú với ID: ${id}`, 404);
        }

        const updatedNote: NoteEntity = {
            ...notesStore[index],
            ...dto,
        };

        notesStore[index] = updatedNote;
        return updatedNote;
    },

    deleteNote: async (id: string): Promise<void> => {
        const exists = notesStore.some((note) => note.id === id);
        if (!exists) {
            throw new AppError(`Không tìm thấy ghi chú với ID: ${id}`, 404);
        }

        notesStore = notesStore.filter((note) => note.id !== id);
    },
};