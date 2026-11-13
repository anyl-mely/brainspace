// client/src/App.tsx
import { useState } from 'react';
import Header from './components/Header';
import { LessonSidebar, LessonContent, MOCK_LESSONS, type Lesson } from './features/lessons';
import { NotesPanel } from './features/notes';

function App() {
    const [lessons, setLessons] = useState<Lesson[]>(MOCK_LESSONS);
    const [currentLessonId, setCurrentLessonId] = useState<string>(MOCK_LESSONS[0].id);

    const activeLesson = lessons.find((lesson) => lesson.id === currentLessonId);

    const handleToggleComplete = (lessonId: string) => {
        setLessons((prevLessons) =>
            prevLessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, isCompleted: !lesson.isCompleted } : lesson
            )
        );
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 flex">
                <LessonSidebar
                    lessons={lessons}
                    currentLessonId={currentLessonId}
                    onSelectLesson={setCurrentLessonId}
                />

                <LessonContent
                    key={activeLesson?.id}
                    lesson={activeLesson}
                    onToggleComplete={handleToggleComplete}
                />

                <NotesPanel lessonId={currentLessonId} lessonTitle={activeLesson?.title} />
            </main>
        </div>
    );
}

export default App;