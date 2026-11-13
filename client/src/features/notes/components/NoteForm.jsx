// client/src/features/notes/components/NoteForm.jsx
import { useState } from 'react';

function NoteForm({ onAddNote }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isConfusing, setIsConfusing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();

        if (!trimmedTitle || !trimmedContent) {
            alert('Vui lòng nhập đầy đủ tiêu đề và nội dung ghi chú!');
            return;
        }

        try {
            setIsSubmitting(true);
            await onAddNote({
                title: trimmedTitle,
                content: trimmedContent,
                isConfusing,
            });
            setTitle('');
            setContent('');
            setIsConfusing(false);
        } catch (err) {
            alert(`Lỗi khi lưu ghi chú: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                backgroundColor: 'var(--bg-surface)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                marginBottom: '20px',
            }}
        >
            <div style={{ marginBottom: '12px' }}>
                <label
                    htmlFor="note-title"
                    style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}
                >
                    Tiêu đề ghi chú
                </label>
                <input
                    id="note-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nhập tóm tắt kiến thức..."
                    style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        fontSize: '13px',
                    }}
                />
            </div>

            <div style={{ marginBottom: '12px' }}>
                <label
                    htmlFor="note-content"
                    style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}
                >
                    Nội dung tự diễn giải
                </label>
                <textarea
                    id="note-content"
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Viết lại theo cách hiểu của bạn..."
                    style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        fontSize: '13px',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                    }}
                />
            </div>

            <label
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    color: 'var(--accent-warning)',
                    fontWeight: '600',
                    marginBottom: '14px',
                    cursor: 'pointer',
                }}
            >
                <input
                    type="checkbox"
                    checked={isConfusing}
                    onChange={(e) => setIsConfusing(e.target.checked)}
                />
                Đánh dấu chưa hiểu rõ (Cần ôn lại)
            </label>

            <button
                type="submit"
                disabled={isSubmitting}
                style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: isSubmitting ? '#94A3B8' : 'var(--primary)',
                    color: '#FFFFFF',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                }}
            >
                {isSubmitting ? 'Đang lưu lên Server...' : 'Lưu ghi chú'}
            </button>
        </form>
    );
}

export default NoteForm;