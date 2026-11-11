// 1. Dữ liệu mẫu bài học gửi tử API
const currentLesson = {
    id: "les-es6",
    title: "Modern ES6 Syntax & Immutability",
    orderIndex: 4,
    estimatesMinutes: 30,
    isCompleted: false,
    author: {
        name: "Minh Nguyen",
        role: "Learner"
    }
};

// 2. Thực hành Destructuring (Bóc tách lồng nhau)
const {
    title: lessonTitle,
    estimatesMinutes,
    author: { name: authorName }
} = currentLesson;

console.log(`Đang học: ${lessonTitle} bởi ${authorName} (${estimatesMinutes} phút)`);

// 3. Arrow function kết hợp Rest Parameter & Default Parameter
// Hàm này cho phép tạo ghi chú với số lượng tags tùy ý:
const createSmartNote = (id, title, isConfusing = false, ...tags) => ({
    id,
    title,
    isConfusing,
    tags, // tags tự động gom thành 1 Array nhờ Rest Parameter (...)
    createAt: new Date().toISOString()
});

const noteA = createSmartNote("note-01", "Học Destructuring", false, "es6", "javascript", "clean-code");
console.log("Ghi chú vừa tạo:", noteA);

// 4. Spread Operator: Cập nhật tiến độ bài học mà không làm thay đổi bản gốc
const markLessonComplete = (lesson) => ({
    ...lesson,
    isCompleted: true,
    completedAt: "2026-11-10T08:00:00Z"
});

const completedLesson = markLessonComplete(currentLesson);
console.log("Bài học gốc vẫn an toàn (isCompleted):", currentLesson.isCompleted);
console.log("Bản sao mới đã hoàn thành (isCompleted):", completedLesson.isCompleted);

// Bài tập thực hành
const user = {
    name: "Nguyễn An",
    role: "Learner",
    streak: 8,
    course: {
        name: "JS",
        level: "Foudation"
    }
};

const {
    name: nameUser,
    role,
    streak,
    course: { name: nameCourse }
} = user;

const formatUserInfoES6 = (name = nameUser, role1 = role , streak = 0) => ({
    nameUser,
    role,
    streak
})

const student = formatUserInfoES6();

const {
    nameUser: nameStudent,
    role: roleOfStudent,
    streak: streakOfStudent,
} = student;

console.log(`Học viên: ${nameStudent} | Vai trò: ${roleOfStudent} | Chuỗi học: ${streakOfStudent} ngày`);

// Bài mới
const currentLessonNew = {
    title: "Semantic HTML5",
    estimatesMinutes: 20
};

const formatLessonInfo = ({title, estimatesMinutes, isCompleted = false}) =>
    `Bài học: ${title} (${estimatesMinutes}) - Trạng thái: ${isCompleted}`;

console.log(formatLessonInfo(currentLessonNew));