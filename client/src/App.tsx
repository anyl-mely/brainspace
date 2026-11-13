// client/src/App.tsx
import { useEffect, useState } from 'react';
import Header from './components/Header';
import { AuthForm, authApi, type UserProfile } from './features/auth';
import { LessonSidebar, LessonContent, useLessons } from './features/lessons';
import { NotesPanel } from './features/notes';
import { authStorage } from './services/apiClient';

interface WorkspaceProps {
    user: UserProfile;
    onLogout: () => void;
}

function Workspace({ user, onLogout }: WorkspaceProps) {
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
            <Header user={user} onLogout={onLogout} />

            {isLoading ? (
                <main className="flex-1 flex items-center justify-center text-slate-400">
                    Đang tải danh sách bài học từ máy chủ...
                </main>
            ) : error ? (
                <main className="flex-1 flex flex-col items-center justify-center gap-3 text-rose-500">
                    <p>{error}</p>
                    <button
                        type="button"
                        onClick={refreshLessons}
                        className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
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

function App() {
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
    const [isCheckingSession, setIsCheckingSession] = useState<boolean>(() =>
        Boolean(authStorage.getToken())
    );

    useEffect(() => {
        const token = authStorage.getToken();
        if (!token) {
            return;
        }

        let isMounted = true;
        authApi
            .getMe()
            .then((profile) => {
                if (isMounted) {
                    setCurrentUser(profile);
                }
            })
            .catch(() => {
                authStorage.clearToken();
                if (isMounted) {
                    setCurrentUser(null);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setIsCheckingSession(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const handleLogout = () => {
        authStorage.clearToken();
        setCurrentUser(null);
    };

    if (isCheckingSession) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-sm text-slate-500">
                Đang khôi phục phiên đăng nhập...
            </div>
        );
    }

    if (!currentUser) {
        return <AuthForm onAuthSuccess={setCurrentUser} />;
    }

    return <Workspace user={currentUser} onLogout={handleLogout} />;
}

export default App;