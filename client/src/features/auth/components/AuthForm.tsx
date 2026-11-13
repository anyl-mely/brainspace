// client/src/features/auth/components/AuthForm.tsx
import { useState, type FormEvent } from 'react';
import { authStorage } from '../../../services/apiClient';
import { authApi } from '../api/authApi';
import type { UserProfile } from '../types/auth.types';

interface AuthFormProps {
    onAuthSuccess: (user: UserProfile) => void;
}

export function AuthForm({ onAuthSuccess }: AuthFormProps) {
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSwitchMode = () => {
        setIsRegisterMode((prev) => !prev);
        setErrorMessage(null);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null);
        setIsSubmitting(true);

        try {
            const response = isRegisterMode
                ? await authApi.register({ fullName, email, password })
                : await authApi.login({ email, password });

            authStorage.setToken(response.token);
            onAuthSuccess(response.user);
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : 'Đã xảy ra lỗi xác thực');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl font-bold tracking-tight text-indigo-600">BrainSpace</span>
                    <span className="px-2.5 py-0.5 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-full">
                        Workspace
                    </span>
                </div>
                <p className="text-center text-sm text-slate-500 mb-6">
                    {isRegisterMode
                        ? 'Tạo tài khoản học viên để lưu trữ ghi chú cá nhân'
                        : 'Đăng nhập để tiếp tục lộ trình học tập của bạn'}
                </p>

                {errorMessage && (
                    <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegisterMode && (
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Họ và tên
                            </label>
                            <input
                                type="text"
                                required
                                minLength={2}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Ví dụ: Nguyễn Thành An"
                                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="an.dev@brainspace.vn"
                            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Tối thiểu 6 ký tự"
                            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-lg transition-colors cursor-pointer"
                    >
                        {isSubmitting
                            ? 'Đang xử lý...'
                            : isRegisterMode
                                ? 'Đăng ký tài khoản'
                                : 'Đăng nhập'}
                    </button>
                </form>

                <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-600">
                    {isRegisterMode ? 'Đã có tài khoản?' : 'Chưa có tài khoản học viên?'}{' '}
                    <button
                        type="button"
                        onClick={handleSwitchMode}
                        className="font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                    >
                        {isRegisterMode ? 'Đăng nhập ngay' : 'Đăng ký miễn phí'}
                    </button>
                </div>
            </div>
        </div>
    );
}