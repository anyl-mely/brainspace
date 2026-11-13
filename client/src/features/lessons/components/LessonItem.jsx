// client/src/features/lessons/components/LessonItem.jsx
function LessonItem({ lesson, isActive, onSelect }) {
    return (
        <li
            onClick={onSelect}
            style={{
                padding: '12px 14px',
                marginBottom: '8px',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: isActive ? '#EEF2FF' : 'transparent',
                border: isActive ? '1px solid #C7D2FE' : '1px solid transparent',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.15s ease'
            }}
        >
            <div>
                <div
                    style={{
                        fontSize: '14px',
                        fontWeight: isActive ? '600' : '500',
                        color: isActive ? 'var(--primary)' : 'var(--text-main)'
                    }}
                >
                    {lesson.title}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Thời lượng: {lesson.duration} phút
                </div>
            </div>

            <span style={{ fontSize: '15px' }} title={lesson.isCompleted ? 'Đã hoàn thành' : 'Đang học'}>
                {lesson.isCompleted ? '✅' : '⏳'}
            </span>
        </li>
    );
}

export default LessonItem;