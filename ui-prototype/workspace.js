// File: ui-prototype/workspace.js

const noteForm = document.querySelector('.note-form');
const noteTitleInput = document.querySelector('#note-title');
const noteContentInput = document.querySelector('#note-content');
const confusingCheckbox = document.querySelector('#confusing-flag');
const notesPanel = document.querySelector('.notes-panel');

const API_URL = 'http://localhost:3001/notes';

// HÀM TIỆN ÍCH: Vẽ một thẻ ghi chú ra giao diện
// 1. CẬP NHẬT HÀM VẼ CARD (Thêm nút xóa ✕ và data-id)
const renderNoteCard = (note) => {
  const card = document.createElement('div');
  card.className = 'note-card';
  card.dataset.id = note.id; // Lưu id vào thuộc tính data của thẻ
  card.style.cssText = 'background: #F1F5F9; padding: 12px; margin-top: 12px; border-radius: 6px; border: 1px solid #CBD5E1;';

  card.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
      <h4 style="font-size: 15px; color: #0F172A; margin: 0;">${note.title}</h4>
      <button class="btn-delete-note" data-id="${note.id}" style="background: none; border: none; color: #EF4444; cursor: pointer; font-size: 16px; font-weight: bold; padding: 0 4px;" title="Xóa ghi chú">✕</button>
    </div>
    <p style="font-size: 13px; color: #334155; margin-bottom: 8px;">${note.content}</p>
    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
      <span style="color: ${note.isConfusing ? '#D97706' : '#10B981'}; font-weight: 600;">
        ${note.isConfusing ? '⚠️ Cần ôn lại' : '✅ Đã hiểu rõ'}
      </span>
      <span style="color: #64748B;">${note.createdAt || 'Vừa xong'}</span>
    </div>
  `;

  notesPanel.appendChild(card);
};

// 2. TÍNH NĂNG XÓA (DELETE): Dùng Event Delegation trên notesPanel
notesPanel.addEventListener('click', async (e) => {
  // Kiểm tra xem phần tử bị click có phải nút xóa (hoặc nằm trong nút xóa) không
  const deleteBtn = e.target.closest('.btn-delete-note');
  if (!deleteBtn) return;

  const noteId = deleteBtn.dataset.id;
  const cardElement = deleteBtn.closest('.note-card');

  // Xác nhận trước khi xóa
  const isConfirmed = confirm("Bạn có chắc chắn muốn xóa ghi chú này không?");
  if (!isConfirmed) return;

  try {
    // Gửi HTTP DELETE request lên mock server
    const response = await fetch(`${API_URL}/${noteId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`Lỗi khi xóa: ${response.status}`);
    }

    // Xóa thẻ khỏi giao diện ngay lập tức
    cardElement.remove();
    console.log(`Đã xóa thành công ghi chú [ID: ${noteId}]`);
  } catch (error) {
    console.error("Xóa thất bại:", error.message);
    alert("Không thể xóa ghi chú khỏi máy chủ. Vui lòng thử lại!");
  }
});

// 1. TÍNH NĂNG ĐỌC (GET): Tự động nạp toàn bộ ghi chú từ Server khi mở trang
const loadNotesFromApi = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Lỗi tải dữ liệu: ${response.status}`);

    const notes = await response.json();

    // Dùng forEach duyệt qua mảng dữ liệu lấy từ db.json và vẽ lên màn hình
    notes.forEach(note => renderNoteCard(note));
  } catch (error) {
    console.error("Không thể nạp danh sách ghi chú:", error.message);
  }
};

// Gọi hàm ngay khi file JS được nạp
loadNotesFromApi();

// 2. TÍNH NĂNG TẠO MỚI (POST): Gửi ghi chú lên Server khi submit form
noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = noteTitleInput.value.trim();
  const content = noteContentInput.value.trim();
  const isConfusing = confusingCheckbox.checked;

  if (!title || !content) {
    alert("Vui lòng nhập đầy đủ tiêu đề và nội dung ghi chú!");
    return;
  }

  const payload = {
    title,
    content,
    isConfusing,
    createdAt: new Date().toLocaleTimeString()
  };

  try {
    // Bắn request POST tương tự như khi bạn cấu hình trong Postman
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`Lỗi lưu dữ liệu: ${response.status}`);

    const savedNote = await response.json();

    // Vẽ ghi chú vừa được lưu thành công ra màn hình
    renderNoteCard(savedNote);

    noteForm.reset();
    console.log("Đã lưu ghi chú thành công lên server:", savedNote);
  } catch (error) {
    console.error("Lỗi khi gửi ghi chú:", error.message);
    alert("Không thể lưu ghi chú lên Server. Hãy kiểm tra xem json-server đã chạy chưa!");
  }
});