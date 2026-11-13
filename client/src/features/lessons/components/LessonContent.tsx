// client/src/features/lessons/components/LessonContent.tsx
import { useState } from 'react';
import type { Lesson } from '../types/lesson.types';

interface LessonContentProps {
    lesson?: Lesson;
    onToggleComplete: (lessonId: string) => void;
}

function LessonContent({ lesson, onToggleComplete }: LessonContentProps) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    if (!lesson) {
        return <section className="flex-1 p-6">Không tìm thấy nội dung bài học.</section>;
    }

    const isAnswered = selectedOption !== null;
    const isCorrect = selectedOption === lesson.quiz.correctIndex;

    return (
        <section className="flex-1 px-8 py-6 bg-white border-r border-slate-200">
            <div className="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-slate-200">
                <div>
                    <span className="inline-block px-2.5 py-1 mb-2 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full">
                        Chuyên đề • {lesson.duration} phút
                    </span>
                    <h1 className="text-2xl font-bold text-slate-900">{lesson.title}</h1>
                </div>

                <button
                    onClick={() => onToggleComplete(lesson.id)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${lesson.isCompleted
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                            : 'border-slate-200 bg-slate-50 text-slate-900 hover:bg-slate-100'
                        }`}
                >
                    {lesson.isCompleted ? '✅ Đã hoàn thành' : '⭕ Đánh dấu hoàn thành'}
                </button>
            </div>

            <div className="px-5 py-4 mb-6 rounded-lg bg-indigo-50">
                <h3 className="text-sm font-semibold text-indigo-700 mb-2">🎯 Mục tiêu cần đạt</h3>
                <ul className="pl-5 space-y-1 text-sm text-slate-800 list-disc">
                    {lesson.objectives.map((obj, index) => (
                        <li key={index}>{obj}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-7">
                <h3 className="text-base font-semibold text-slate-900 mb-2">Nội dung cốt lõi</h3>
                <p className="text-[15px] text-slate-700 leading-relaxed">{lesson.coreContent}</p>
            </div>

            <div className="p-5 rounded-lg border border-slate-200 bg-slate-50">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">
                    🧠 Kiểm tra nhận thức (Active Recall)
                </h3>
                <p className="text-sm font-medium text-slate-800 mb-3.5">{lesson.quiz.question}</p>

                <div className="flex flex-col gap-2">
                    {lesson.quiz.options.map((option, idx) => {
                        const isSelected = selectedOption === idx;
                        return (
                            <button
                                key={idx}
                                onClick={() => setSelectedOption(idx)}
                                className={`text-left px-3.5 py-2.5 text-sm rounded-lg border transition-colors cursor-pointer ${isSelected
                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-medium'
                                        : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
                                    }`}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                {isAnswered && (
                    <div
                        className={`mt-3.5 p-3 text-xs rounded-lg border ${isCorrect
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-red-50 text-red-800 border-red-200'
                            }`}
                    >
                        <strong>{isCorrect ? 'Chính xác! ' : 'Chưa chính xác. '}</strong>
                        {lesson.quiz.explanation}
                    </div>
                )}
            </div>
        </section>
    );
}

export default LessonContent;