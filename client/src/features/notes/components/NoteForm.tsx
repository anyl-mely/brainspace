// client/src/features/notes/components/NoteForm.tsx
import { useState, type FormEvent } from 'react';
import type { CreateNoteInput } from '../types/note.types';

interface NoteFormProps {
    onAddNote: (input: CreateNoteInput) => Promise<void>;
}

function NoteForm({ onAddNote }: NoteFormProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isConfusing, setIsConfusing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
            const message = err instanceof Error ? err.message : 'Lỗi không xác định';
            alert(`Lỗi khi lưu ghi chú: ${message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 mb-5 bg-white rounded-lg border border-slate-200 shadow-2xs"
        >
            <div className="mb-3">
                <label htmlFor="note-title" className="block text-xs font-semibold text-slate-700 mb-1">
                    Tiêu đề ghi chú
                </label>
                <input
                    id="note-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nhập tóm tắt kiến thức..."
                    className="w-full px-2.5 py-2 text-xs rounded-md border border-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="note-content" className="block text-xs font-semibold text-slate-700 mb-1">
                    Nội dung tự diễn giải
                </label>
                <textarea
                    id="note-content"
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Viết lại theo cách hiểu của bạn..."
                    className="w-full px-2.5 py-2 text-xs rounded-md border border-slate-300 resize-y focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
            </div>

            <label className="flex items-center gap-2 mb-3.5 text-xs font-semibold text-amber-600 cursor-pointer">
                <input
                    type="checkbox"
                    checked={isConfusing}
                    onChange={(e) => setIsConfusing(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                Đánh dấu chưa hiểu rõ (Cần ôn lại)
            </label>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2.5 text-xs font-semibold text-white rounded-md transition-colors ${isSubmitting
                        ? 'bg-slate-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
                    }`}
            >
                {isSubmitting ? 'Đang lưu lên Server...' : 'Lưu ghi chú'}
            </button>
        </form>
    );
}

export default NoteForm;