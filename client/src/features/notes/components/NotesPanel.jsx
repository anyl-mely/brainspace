// client/src/features/notes/components/NotesPanel.jsx
import { useNotes } from '../hooks/useNotes';
import NoteForm from './NoteForm';
import NoteCard from './NoteCard';

function NotesPanel({ lessonId, lessonTitle }) {
    const { notes, isLoading, error, addNote, toggleConfusing, deleteNote } = useNotes(lessonId);

    return (
        <aside
            style={{
                width: '360px',
                flexShrink: 0,
                padding: '20px',
                backgroundColor: 'var(--bg-primary)',
                overflowY: 'auto',
            }}
        >
            <div style={{ marginBottom: '14px' }}>
                <h3 style={{ fontSize: '15px', color: 'var(--text-main)' }}>
                    Ghi chú bài học ({notes.length})
                </h3>
                {lessonTitle && (
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Chuyên đề: <strong>{lessonTitle}</strong>
                    </p>
                )}
            </div>

            {/* Form thêm mới ghi chú */}
            <NoteForm onAddNote={addNote} />

            {/* Trạng thái đang tải dữ liệu */}
            {isLoading && (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '16px' }}>
                    ⏳ Đang tải ghi chú từ máy chủ...
                </p>
            )}

            {/* Trạng thái lỗi kết nối Server */}
            {error && (
                <div
                    style={{
                        padding: '12px',
                        borderRadius: '6px',
                        backgroundColor: '#FEF2F2',
                        border: '1px solid #FECACA',
                        color: '#991B1B',
                        fontSize: '12px',
                        marginBottom: '12px',
                    }}
                >
                    <strong>Không thể kết nối API:</strong> {error}
                    <div style={{ marginTop: '4px', color: '#7F1D1D' }}>
                        Hãy đảm bảo bạn đã chạy <code>npx json-server db.json --port 3001</code> ở thư mục gốc.
                    </div>
                </div>
            )}

            {/* Danh sách thẻ ghi chú */}
            {!isLoading && !error && notes.length === 0 && (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '16px' }}>
                    Chưa có ghi chú nào cho bài học này. Hãy viết tóm tắt đầu tiên của bạn!
                </p>
            )}

            {!isLoading &&
                notes.map((note) => (
                    <NoteCard
                        key={note.id}
                        note={note}
                        onToggleConfusing={toggleConfusing}
                        onDelete={deleteNote}
                    />
                ))}
        </aside>
    );
}

export default NotesPanel;