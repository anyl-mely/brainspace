// client/src/features/notes/components/NoteCard.tsx
import type { Note } from '../types/note.types';

interface NoteCardProps {
    note: Note;
    onToggleConfusing: (noteId: string, currentStatus: boolean) => Promise<void>;
    onDelete: (noteId: string) => Promise<void>;
}

function NoteCard({ note, onToggleConfusing, onDelete }: NoteCardProps) {
    const handleDeleteClick = () => {
        if (window.confirm(`Bạn có chắc muốn xóa ghi chú "${note.title}" không?`)) {
            onDelete(note.id);
        }
    };

    return (
        <div className="p-3.5 mb-2.5 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
            <div className="flex items-start justify-between gap-2 mb-1.5">
                <h4 className="text-sm font-semibold text-slate-900">{note.title}</h4>
                <button
                    onClick={handleDeleteClick}
                    title="Xóa ghi chú"
                    className="px-1 text-sm font-bold text-red-500 hover:text-red-700 cursor-pointer"
                >
                    ✕
                </button>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-2.5">{note.content}</p>

            <div className="flex items-center justify-between text-[11px]">
                <button
                    onClick={() => onToggleConfusing(note.id, note.isConfusing)}
                    title="Bấm để đổi trạng thái ôn tập"
                    className={`px-2 py-0.5 font-semibold rounded cursor-pointer transition-colors ${note.isConfusing
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        }`}
                >
                    {note.isConfusing ? '⚠️ Cần ôn lại' : '✅ Đã hiểu rõ'}
                </button>

                <span className="text-slate-400">{note.createdAt || 'Vừa xong'}</span>
            </div>
        </div>
    );
}

export default NoteCard;