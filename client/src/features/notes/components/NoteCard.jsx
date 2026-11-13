// client/src/features/notes/components/NoteCard.jsx
function NoteCard({ note, onToggleConfusing, onDelete }) {
    const handleDeleteClick = () => {
        if (window.confirm(`Bạn có chắc muốn xóa ghi chú "${note.title}" không?`)) {
            onDelete(note.id);
        }
    };

    return (
        <div
            style={{
                backgroundColor: 'var(--bg-surface)',
                padding: '14px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                marginBottom: '10px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '8px',
                    marginBottom: '6px',
                }}
            >
                <h4 style={{ fontSize: '14px', color: 'var(--text-main)', margin: 0 }}>
                    {note.title}
                </h4>
                <button
                    onClick={handleDeleteClick}
                    title="Xóa ghi chú"
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#EF4444',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        cursor: 'pointer',
                        padding: '0 4px',
                    }}
                >
                    ✕
                </button>
            </div>

            <p style={{ fontSize: '13px', color: '#334155', marginBottom: '10px', lineHeight: '1.5' }}>
                {note.content}
            </p>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '11px',
                }}
            >
                <button
                    onClick={() => onToggleConfusing(note.id, note.isConfusing)}
                    title="Bấm để đổi trạng thái ôn tập"
                    style={{
                        border: 'none',
                        borderRadius: '4px',
                        padding: '3px 8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '11px',
                        backgroundColor: note.isConfusing ? '#FEF3C7' : '#D1FAE5',
                        color: note.isConfusing ? '#B45309' : '#065F46',
                    }}
                >
                    {note.isConfusing ? '⚠️ Cần ôn lại' : '✅ Đã hiểu rõ'}
                </button>

                <span style={{ color: 'var(--text-muted)' }}>{note.createdAt || 'Vừa xong'}</span>
            </div>
        </div>
    );
}

export default NoteCard;