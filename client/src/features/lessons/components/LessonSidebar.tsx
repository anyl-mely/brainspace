// client/src/features/lessons/components/LessonSidebar.tsx
import type { Lesson } from '../types/lesson.types';
import LessonItem from './LessonItem';

interface LessonSidebarProps {
    lessons: Lesson[];
    currentLessonId: string;
    onSelectLesson: (lessonId: string) => void;
}

function LessonSidebar({ lessons, currentLessonId, onSelectLesson }: LessonSidebarProps) {
    const completedCount = lessons.filter((item) => item.isCompleted).length;
    const progressPercent = Math.round((completedCount / lessons.length) * 100);

    return (
        <aside className="w-72 shrink-0 bg-white border-r border-slate-200 px-4 py-5">
            <div className="p-3 mb-5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-900">Tiến độ lộ trình</span>
                    <span className="font-bold text-indigo-600">
                        {completedCount}/{lessons.length} ({progressPercent}%)
                    </span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>

            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Danh sách chuyên đề
            </h3>

            <ul className="list-none">
                {lessons.map((lesson) => (
                    <LessonItem
                        key={lesson.id}
                        lesson={lesson}
                        isActive={lesson.id === currentLessonId}
                        onSelect={() => onSelectLesson(lesson.id)}
                    />
                ))}
            </ul>
        </aside>
    );
}

export default LessonSidebar;