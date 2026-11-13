// client/src/App.jsx
import { useState } from 'react';
import Header from './components/Header';
import { LessonSidebar, LessonContent, MOCK_LESSONS } from './features/lessons';
import { NotesPanel } from './features/notes';

function App() {
  const [lessons, setLessons] = useState(MOCK_LESSONS);
  const [currentLessonId, setCurrentLessonId] = useState(MOCK_LESSONS[0].id);

  const activeLesson = lessons.find((lesson) => lesson.id === currentLessonId);

  const handleToggleComplete = (lessonId) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, isCompleted: !lesson.isCompleted } : lesson
      )
    );
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, display: 'flex' }}>
        {/* Cột 1: Lộ trình bài học */}
        <LessonSidebar
          lessons={lessons}
          currentLessonId={currentLessonId}
          onSelectLesson={setCurrentLessonId}
        />

        {/* Cột 2: Khung đọc bài học & Active Recall */}
        <LessonContent
          key={activeLesson?.id}
          lesson={activeLesson}
          onToggleComplete={handleToggleComplete}
        />

        {/* Cột 3: Ghi chú ngữ cảnh kết nối REST API */}
        <NotesPanel
          lessonId={currentLessonId}
          lessonTitle={activeLesson?.title}
        />
      </main>
    </div>
  );
}

export default App;