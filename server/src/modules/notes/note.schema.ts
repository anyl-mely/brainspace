// server/src/modules/notes/note.schema.ts
import { z } from 'zod';

export const createNoteSchema = z.object({
    lessonId: z.string().min(1, 'Mã bài học không được để trống'),
    title: z.string().trim().min(2, 'Tiêu đề ghi chú phải có ít nhất 2 ký tự'),
    content: z.string().trim().min(3, 'Nội dung ghi chú phải có ít nhất 3 ký tự'),
    isConfusing: z.boolean().default(false),
    createdAt: z.string().optional(),
});

export const updateNoteSchema = z.object({
    title: z.string().trim().min(2, 'Tiêu đề ghi chú phải có ít nhất 2 ký tự').optional(),
    content: z.string().trim().min(3, 'Nội dung ghi chú phải có ít nhất 3 ký tự').optional(),
    isConfusing: z.boolean().optional(),
});

export type CreateNoteDto = z.infer<typeof createNoteSchema>;
export type UpdateNoteDto = z.infer<typeof updateNoteSchema>;

export interface NoteEntity {
    id: string;
    lessonId: string;
    title: string;
    content: string;
    isConfusing: boolean;
    createdAt: string;
}