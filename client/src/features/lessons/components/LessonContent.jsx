// client/src/features/lessons/components/LessonContent.jsx
import { useState } from 'react';

function LessonContent({ lesson, onToggleComplete }) {
    // State cục bộ lưu chỉ số đáp án người dùng đang chọn trong câu hỏi Active Recall
    const [selectedOption, setSelectedOption] = useState(null);

    if (!lesson) {
        return <section style={{ flex: 1, padding: '24px' }}>Không tìm thấy nội dung bài học.</section>;
    }

    const isAnswered = selectedOption !== null;
    const isCorrect = selectedOption === lesson.quiz.correctIndex;

    return (
        <section
            style={{
                flex: 1,
                padding: '24px 32px',
                backgroundColor: 'var(--bg-surface)',
                borderRight: '1px solid var(--border-color)'
            }}
        >
            {/* Tiêu đề & Nút đánh dấu hoàn thành */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '16px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid var(--border-color)',
                    marginBottom: '20px'
                }}
            >
                <div>
                    <span
                        style={{
                            display: 'inline-block',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: 'var(--primary)',
                            backgroundColor: '#EEF2FF',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            marginBottom: '8px'
                        }}
                    >
                        Chuyên đề • {lesson.duration} phút
                    </span>
                    <h1 style={{ fontSize: '22px', color: 'var(--text-main)' }}>{lesson.title}</h1>
                </div>

                <button
                    onClick={() => onToggleComplete(lesson.id)}
                    style={{
                        padding: '8px 14px',
                        borderRadius: '6px',
                        border: '1px solid',
                        borderColor: lesson.isCompleted ? 'var(--accent-success)' : 'var(--border-color)',
                        backgroundColor: lesson.isCompleted ? '#ECFDF5' : 'var(--bg-primary)',
                        color: lesson.isCompleted ? '#065F46' : 'var(--text-main)',
                        fontWeight: '600',
                        fontSize: '13px',
                        cursor: 'pointer'
                    }}
                >
                    {lesson.isCompleted ? '✅ Đã hoàn thành' : '⭕ Đánh dấu hoàn thành'}
                </button>
            </div>

            {/* Mục tiêu bài học */}
            <div
                style={{
                    backgroundColor: '#EEF2FF',
                    padding: '16px 20px',
                    borderRadius: '8px',
                    marginBottom: '24px'
                }}
            >
                <h3 style={{ fontSize: '14px', color: 'var(--primary)', marginBottom: '8px' }}>
                    🎯 Mục tiêu cần đạt
                </h3>
                <ul style={{ paddingLeft: '20px', fontSize: '14px', color: 'var(--text-main)' }}>
                    {lesson.objectives.map((obj, index) => (
                        <li key={index} style={{ marginBottom: '4px' }}>
                            {obj}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Nội dung cốt lõi */}
            <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '8px', color: 'var(--text-main)' }}>
                    Nội dung cốt lõi
                </h3>
                <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.7' }}>
                    {lesson.coreContent}
                </p>
            </div>

            {/* Khối kiểm tra nhanh Active Recall */}
            <div
                style={{
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)'
                }}
            >
                <h3 style={{ fontSize: '15px', color: 'var(--text-main)', marginBottom: '12px' }}>
                    🧠 Kiểm tra nhận thức (Active Recall)
                </h3>
                <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '14px' }}>
                    {lesson.quiz.question}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {lesson.quiz.options.map((option, idx) => {
                        const isSelected = selectedOption === idx;
                        return (
                            <button
                                key={idx}
                                onClick={() => setSelectedOption(idx)}
                                style={{
                                    textAlign: 'left',
                                    padding: '10px 14px',
                                    borderRadius: '6px',
                                    border: '1px solid',
                                    borderColor: isSelected ? 'var(--primary)' : 'var(--border-color)',
                                    backgroundColor: isSelected ? '#EEF2FF' : 'var(--bg-surface)',
                                    color: 'var(--text-main)',
                                    fontSize: '14px',
                                    cursor: 'pointer'
                                }}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                {isAnswered && (
                    <div
                        style={{
                            marginTop: '14px',
                            padding: '12px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            backgroundColor: isCorrect ? '#ECFDF5' : '#FEF2F2',
                            color: isCorrect ? '#065F46' : '#991B1B',
                            border: `1px solid ${isCorrect ? '#A7F3D0' : '#FECACA'}`
                        }}
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