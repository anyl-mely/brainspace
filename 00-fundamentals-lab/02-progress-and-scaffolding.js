// File: 00-fundamentals-lab/02-progress-and-scaffolding.js

// Danh sách các bài học trong Chương 00 của BrainSpace
const chapterZeroLessons = [
    { id: "lesson-01", title: "Variables & Data Types", isCompleted: true },
    { id: "lesson-02", title: "Conditions & Loops", isCompleted: true },
    { id: "lesson-03", title: "Functions & Algorithms", isCompleted: false },
    { id: "lesson-04", title: "Chapter 00 Final Review", isCompleted: false }
];

// =========================================================================
// BÀI TOÁN 1: TÍNH TIẾN ĐỘ HỌC TẬP (PROGRESS ANALYTICS)
// =========================================================================

// Định nghĩa hàm (Chế tạo cỗ máy)
function calculateCourseProgress(lessons) {
    // Kiểm tra an toàn (Edge Case): Nếu khóa học chưa có bài nào thì trả về 0% ngay
    if (lessons.length === 0) {
        return 0;
    }

    let completedCount = 0;
    for (const lesson of lessons) {
        if (lesson.isCompleted === true) {
            completedCount++;
        }
    }

    const percentage = Math.round((completedCount / lessons.length) * 100);
    return percentage; // Trả kết quả ra ngoài
}

// Sử dụng hàm (Vận hành cỗ máy với bất kỳ danh sách bài học nào)
const progressChap0 = calculateCourseProgress(chapterZeroLessons);
console.log(`Tiến độ Chương 00: ${progressChap0}%`);

// =========================================================================
// BÀI TOÁN 2: KIỂM TRA MỞ KHÓA BÀI HỌC (SCAFFOLDING LOGIC)
// Giả sử học viên muốn bấm vào học bài thứ 3 (vị trí index = 2: "Functions & Algorithms")
// Quy tắc: Bài phía trước nó (vị trí index = 1) bắt buộc phải có isCompleted === true
// =========================================================================

const targetLessonIndex = 2; // Bài muốn học: lesson-03
const previousLesson = chapterZeroLessons[targetLessonIndex - 1]; // Bài ngay trước đó: lesson-02
const targetLesson = chapterZeroLessons[targetLessonIndex];

if (previousLesson.isCompleted === true) {
    console.log(`✅ MỞ KHÓA: Bạn đủ điều kiện học bài "${targetLesson.title}".`);
} else {
    console.log(`🔒 ĐANG KHÓA: Vui lòng hoàn thành bài "${previousLesson.title}" trước!`);
}
//Bài tập thực hành
const myNotes = [
    { id: "note-01", title: "Cách dùng const và let", isConfusing: false },
    { id: "note-02", title: "Sự khác nhau giữa == và ===", isConfusing: true },
    { id: "note-03", title: "Cách hoạt động của vòng lặp for...of", isConfusing: true }
];

for (const note of myNotes) {
    if (note.isConfusing === true) {
        console.log(note.title);
    }
}