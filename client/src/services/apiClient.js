// client/src/services/apiClient.js
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function apiClient(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;

    const config = {
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

    // Đọc dạng text trước để tránh lỗi parse JSON nếu API trả về body rỗng (204 No Content)
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}