// client/src/features/lessons/types/lesson.types.ts
export interface LessonQuiz {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export interface Lesson {
    id: string;
    title: string;
    duration: number;
    order?: number;
    coreContent: string;
    objectives: string[];
    quiz: LessonQuiz;
    isCompleted: boolean;
    notesCount?: number;
}