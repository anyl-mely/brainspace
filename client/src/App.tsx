// client/src/App.tsx
import Header from './components/Header';
import { LessonSidebar, LessonContent, useLessons } from './features/lessons';
import { NotesPanel } from './features/notes';

function App() {
    const {
        lessons,
        selectedLesson: activeLesson,
        selectedLessonId: currentLessonId,
        setSelectedLessonId: setCurrentLessonId,
        isLoading,
        error,
        toggleLessonCompletion: handleToggleComplete,
        refreshLessons,
    } = useLessons();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            {isLoading ? (
                <main className="flex-1 flex items-center justify-center text-slate-400">
                    Đang tải danh sách bài học từ máy chủ...
                </main>
            ) : error ? (
                <main className="flex-1 flex flex-col items-center justify-center gap-3 text-rose-400">
                    <p>{error}</p>
                    <button
                        type="button"
                        onClick={refreshLessons}
                        className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                    >
                        Thử kết nối lại
                    </button>
                </main>
            ) : (
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
            )}
        </div>
    );
}

export default App;