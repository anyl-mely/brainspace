// client/src/services/apiClient.ts
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    const config: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
        throw new Error(`Lỗi HTTP ${response.status}: Không thể xử lý yêu cầu tới ${endpoint}`);
    }

    const text = await response.text();
    return (text ? JSON.parse(text) : null) as T;
}