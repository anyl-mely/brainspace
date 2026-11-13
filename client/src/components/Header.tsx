// client/src/components/Header.tsx
function Header() {
    const learnerName = 'Minh Nguyen';
    const streakDays = 8;

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
            <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-indigo-600">BrainSpace</span>
                <span className="px-2 py-0.5 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-full">
                    TS + Tailwind
                </span>
            </div>

            <div className="text-sm text-slate-500">
                Học viên: <strong className="font-semibold text-slate-900">{learnerName}</strong>
                <span className="mx-2 text-slate-300">|</span>
                Chuỗi học: <span className="font-bold text-amber-600">{streakDays} ngày 🔥</span>
            </div>
        </header>
    );
}

export default Header;