// client/src/features/notes/components/NotesPanel.tsx
import { useNotes } from '../hooks/useNotes';
import NoteForm from './NoteForm';
import NoteCard from './NoteCard';

interface NotesPanelProps {
    lessonId: string;
    lessonTitle?: string;
}

function NotesPanel({ lessonId, lessonTitle }: NotesPanelProps) {
    const { notes, isLoading, error, addNote, toggleConfusing, deleteNote } = useNotes(lessonId);

    return (
        <aside className="w-90 shrink-0 p-5 bg-slate-50 overflow-y-auto">
            <div className="mb-3.5">
                <h3 className="text-[15px] font-bold text-slate-900">Ghi chú bài học ({notes.length})</h3>
                {lessonTitle && (
                    <p className="text-xs text-slate-500 mt-0.5">
                        Chuyên đề: <strong className="text-slate-700">{lessonTitle}</strong>
                    </p>
                )}
            </div>

            <NoteForm onAddNote={addNote} />

            {isLoading && (
                <p className="p-4 text-xs text-center text-slate-500">⏳ Đang tải ghi chú từ máy chủ...</p>
            )}

            {error && (
                <div className="p-3 mb-3 text-xs text-red-800 bg-red-50 border border-red-200 rounded-md">
                    <strong>Không thể kết nối API:</strong> {error}
                    <div className="mt-1 text-red-900">
                        Hãy đảm bảo bạn đã chạy <code className="font-mono">npx json-server db.json --port 3001</code> ở thư mục gốc.
                    </div>
                </div>
            )}

            {!isLoading && !error && notes.length === 0 && (
                <p className="p-4 text-xs text-center text-slate-500">
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