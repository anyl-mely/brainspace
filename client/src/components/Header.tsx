// client/src/components/Header.tsx
import type { UserProfile } from '../features/auth';

interface HeaderProps {
    user: UserProfile;
    onLogout: () => void;
}

function Header({ user, onLogout }: HeaderProps) {
    const streakDays = 8;

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
            <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-indigo-600">BrainSpace</span>
                <span className="px-2 py-0.5 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-full">
                    Fullstack TS
                </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-500">
                <div>
                    Học viên: <strong className="font-semibold text-slate-900">{user.fullName}</strong>
                    <span className="mx-2 text-slate-300">|</span>
                    Chuỗi học: <span className="font-bold text-amber-600">{streakDays} ngày 🔥</span>
                </div>

                <button
                    type="button"
                    onClick={onLogout}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                >
                    Đăng xuất
                </button>
            </div>
        </header>
    );
}

export default Header;