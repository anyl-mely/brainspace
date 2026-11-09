// File: 00-fundamentals-lab/01-data-modeling.js

// 1. Hằng số cấu hình hệ thống (Dùng const + viết hoa UPPER_SNAKE_CASE cho hằng số cố định)
const PASSING_SCORE_PERCENTAGE = 80;

// 2. Biểu diễn thông tin Người học (Object kết hợp String, Number, Boolean)
const currentLearner = {
    id: "user-001",
    fullName: "Minh Nguyen",
    learningGoal: "Become a Full-stack Developer",
    streakDays: 1,
    isActive: true
};

// 3. Biểu diễn Danh sách các Bài học trong Chương 00 (Array chứa các Objects)
const chapterZeroLessons = [
    {
        id: "lesson-01",
        title: "Variables & Data Types",
        orderIndex: 1,
        estimatedMinutes: 20,
        isCompleted: true // Bài số 1 đã học xong
    },
    {
        id: "lesson-02",
        title: "Conditions & Loops",
        orderIndex: 2,
        estimatedMinutes: 25,
        isCompleted: false // Bài số 2 đang học
    }
];

// 4. In dữ liệu ra màn hình Console để kiểm tra
console.log("=== BRAINSPACE MEMORY SNAPSHOT ===");
console.log("Học viên:", currentLearner.fullName);
console.log("Mục tiêu:", currentLearner.learningGoal);
console.log("Bài học đầu tiên:", chapterZeroLessons[0].title); // Truy cập phần tử đầu tiên ở vị trí số 0

//5. Bài tập thực hành
const firstNote = {
    id: "note-001",
    lessonId: "lesson-01",
    title: "Phân biệt const và let trong JavaScript",
    content: "Luôn ưu tiên dùng const mặc định để tránh gán lại nhầm; chỉ dùng let khi biến cần thay đổi giá trị.",
    isConfusing: true,
    tags: ["javascript", "variables", "memory"]
};
console.log("Ghi chú vừa tạo:", firstNote.title);
console.log("Từ khóa đầu tiên:", firstNote.tags[0]); // Sẽ in ra: "javascript"