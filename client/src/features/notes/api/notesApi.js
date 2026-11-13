// client/src/features/notes/api/notesApi.js
import { apiClient } from '../../../services/apiClient';

export const notesApi = {
    // READ: Lấy toàn bộ danh sách ghi chú
    getAll: () => apiClient('/notes'),

    // CREATE: Tạo ghi chú mới
    create: (newNote) =>
        apiClient('/notes', {
            method: 'POST',
            body: JSON.stringify(newNote),
        }),

    // UPDATE: Cập nhật một phần thông tin ghi chú (ví dụ: trạng thái isConfusing)
    update: (id, updatedFields) =>
        apiClient(`/notes/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedFields),
        }),

    // DELETE: Xóa ghi chú theo id
    remove: (id) =>
        apiClient(`/notes/${id}`, {
            method: 'DELETE',
        }),
};