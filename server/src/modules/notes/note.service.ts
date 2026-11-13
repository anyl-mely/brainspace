// server/src/modules/notes/note.service.ts
import { Prisma, type Note } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { AppError } from '../../middlewares/errorHandler';
import type { CreateNoteDto, NoteEntity, UpdateNoteDto } from './note.schema';

// Ánh xạ bản ghi từ PostgreSQL sang đúng hợp đồng NoteEntity trả về cho Frontend
function mapToNoteEntity(record: Note): NoteEntity {
    return {
        id: record.id,
        lessonId: record.lessonId,
        title: record.title,
        content: record.content,
        isConfusing: record.isConfusing,
        createdAt: record.createdAt.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
        }),
    };
}

export const noteService = {
    getAllNotes: async (): Promise<NoteEntity[]> => {
        const records = await prisma.note.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return records.map(mapToNoteEntity);
    },

    createNote: async (dto: CreateNoteDto): Promise<NoteEntity> => {
        const created = await prisma.note.create({
            data: {
                lessonId: dto.lessonId,
                title: dto.title,
                content: dto.content,
                isConfusing: dto.isConfusing,
            },
        });
        return mapToNoteEntity(created);
    },

    updateNote: async (id: string, dto: UpdateNoteDto): Promise<NoteEntity> => {
        try {
            const updated = await prisma.note.update({
                where: { id },
                data: dto,
            });
            return mapToNoteEntity(updated);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new AppError(`Không tìm thấy ghi chú với ID: ${id}`, 404);
            }
            throw error;
        }
    },

    deleteNote: async (id: string): Promise<void> => {
        try {
            await prisma.note.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new AppError(`Không tìm thấy ghi chú với ID: ${id}`, 404);
            }
            throw error;
        }
    },
};