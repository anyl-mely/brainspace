// client/src/features/lessons/components/LessonItem.tsx
import type { Lesson } from '../types/lesson.types';

interface LessonItemProps {
    lesson: Lesson;
    isActive: boolean;
    onSelect: () => void;
}

function LessonItem({ lesson, isActive, onSelect }: LessonItemProps) {
    return (
        <li
            onClick={onSelect}
            className={`flex items-center justify-between px-3.5 py-3 mb-2 rounded-lg cursor-pointer border transition-colors ${isActive
                    ? 'bg-indigo-50 border-indigo-200'
                    : 'bg-transparent border-transparent hover:bg-slate-50'
                }`}
        >
            <div>
                <div
                    className={`text-sm ${isActive ? 'font-semibold text-indigo-600' : 'font-medium text-slate-900'
                        }`}
                >
                    {lesson.title}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">Thời lượng: {lesson.duration} phút</div>
            </div>

            <span className="text-base" title={lesson.isCompleted ? 'Đã hoàn thành' : 'Đang học'}>
                {lesson.isCompleted ? '✅' : '⏳'}
            </span>
        </li>
    );
}

export default LessonItem;