// client/src/features/lessons/components/LessonSidebar.jsx
import LessonItem from './LessonItem';

function LessonSidebar({ lessons, currentLessonId, onSelectLesson }) {
    // Derived State: Tự động tính số bài đã hoàn thành từ mảng lessons
    const completedCount = lessons.filter((item) => item.isCompleted).length;
    const progressPercent = Math.round((completedCount / lessons.length) * 100);

    return (
        <aside
            style={{
                width: '290px',
                flexShrink: 0,
                backgroundColor: 'var(--bg-surface)',
                borderRight: '1px solid var(--border-color)',
                padding: '20px 16px'
            }}
        >
            {/* Thanh hiển thị tiến độ học tập */}
            <div
                style={{
                    padding: '12px',
                    backgroundColor: 'var(--bg-primary)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    marginBottom: '20px'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>Tiến độ lộ trình</span>
                    <span style={{ fontWeight: '700', color: 'var(--primary)' }}>
                        {completedCount}/{lessons.length} ({progressPercent}%)
                    </span>
                </div>
                <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
                    <div
                        style={{
                            width: `${progressPercent}%`,
                            height: '100%',
                            backgroundColor: 'var(--accent-success)',
                            transition: 'width 0.3s ease'
                        }}
                    />
                </div>
            </div>

            <h3
                style={{
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--text-muted)',
                    marginBottom: '12px'
                }}
            >
                Danh sách chuyên đề
            </h3>

            <ul style={{ listStyle: 'none' }}>
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