// server/src/modules/lessons/lesson.schema.ts
import { z } from 'zod';

export const updateLessonStatusSchema = z.object({
    isCompleted: z.boolean({
        message: 'Trạng thái hoàn thành phải là kiểu boolean (true/false)',
    }),
});

export type UpdateLessonStatusDto = z.infer<typeof updateLessonStatusSchema>;

export interface LessonQuiz {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export interface LessonSummaryDto {
    id: string;
    title: string;
    duration: number;
    order: number;
    coreContent: string;
    objectives: string[];
    quiz: LessonQuiz;
    isCompleted: boolean;
    notesCount: number;
}