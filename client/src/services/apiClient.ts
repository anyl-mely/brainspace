// client/src/services/apiClient.ts
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
const TOKEN_STORAGE_KEY = 'brainspace_access_token';

export const authStorage = {
    getToken: (): string | null => localStorage.getItem(TOKEN_STORAGE_KEY),
    setToken: (token: string): void => localStorage.setItem(TOKEN_STORAGE_KEY, token),
    clearToken: (): void => localStorage.removeItem(TOKEN_STORAGE_KEY),
};

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    const token = authStorage.getToken();

    const config: RequestInit = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    };

    const response = await fetch(url, config);

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
        if (response.status === 401) {
            authStorage.clearToken();
        }
        const serverMessage =
            data && typeof data === 'object' && 'message' in data
                ? String(data.message)
                : `Lỗi HTTP ${response.status}: Không thể xử lý yêu cầu tới ${endpoint}`;

        throw new Error(serverMessage);
    }

    return data as T;
}