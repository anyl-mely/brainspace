// client/src/App.jsx
import { useState } from 'react';
import Header from './components/Header';
import { LessonSidebar, LessonContent, MOCK_LESSONS } from './features/lessons';

function App() {
  // Quản lý danh sách bài học & bài học đang được chọn tại Component cha chung
  const [lessons, setLessons] = useState(MOCK_LESSONS);
  const [currentLessonId, setCurrentLessonId] = useState(MOCK_LESSONS[0].id);

  // Derived State: Tìm đối tượng bài học khớp với currentLessonId
  const activeLesson = lessons.find((lesson) => lesson.id === currentLessonId);

  // Cập nhật trạng thái hoàn thành bài học (Bất biến với .map)
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

        {/* Cột 2: Khung đọc bài học (truyền key={activeLesson.id} để tự động reset quiz khi đổi bài) */}
        <LessonContent
          key={activeLesson?.id}
          lesson={activeLesson}
          onToggleComplete={handleToggleComplete}
        />

        {/* Cột 3: Khu vực dành cho Feature Notes (Sẽ dựng ở Giai đoạn 3) */}
        <aside
          style={{
            width: '360px',
            flexShrink: 0,
            padding: '20px',
            backgroundColor: 'var(--bg-primary)'
          }}
        >
          <h3 style={{ fontSize: '15px', color: 'var(--text-main)', marginBottom: '8px' }}>
            Ghi chú bài học (Contextual Notes)
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Khu vực này sẽ được kết nối với REST API ở Giai đoạn 3.
          </p>
        </aside>
      </main>
    </div>
  );
}

export default App;