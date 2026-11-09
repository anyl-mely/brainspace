// File: 00-fundamentals-lab/03-quiz-grading-engine.js

const PASSING_SCORE = 80;

// 1. Dữ liệu đề bài Quiz của Bài 00.1 & 00.2 (Lưu trên Server)
const quizQuestions = [
    {
        id: "q-01",
        questionText: "Từ khóa nào dùng để khai báo hằng số không thể gán lại?",
        correctOptionId: "opt-a" // Đáp án đúng là const
    },
    {
        id: "q-02",
        questionText: "Toán tử nào dùng để so sánh bằng nghiêm ngặt cả giá trị lẫn kiểu dữ liệu?",
        correctOptionId: "opt-c" // Đáp án đúng là ===
    },
    {
        id: "q-03",
        questionText: "Mảng (Array) trong JavaScript bắt đầu đếm vị trí (index) từ số mấy?",
        correctOptionId: "opt-a" // Đáp án đúng là 0
    }
];

// 2. Dữ liệu bài làm của Học viên gửi lên (Giả sử đúng câu 1, 2 và sai câu 3)
const userAnswers = {
    "q-01": "opt-a", // Đúng
    "q-02": "opt-c", // Đúng
    "q-03": "opt-b"  // Sai (Đáp án đúng phải là opt-a)
};

// 3. HÀM THUẬT TOÁN CHẤM ĐIỂM QUIZ
function gradeQuizAttempt(questions, submittedAnswers) {
    let correctCount = 0;
    const wrongQuestionIds = []; // Mảng lưu lại các câu sai để đưa vào Trung tâm Ôn tập

    for (const question of questions) {
        // Lấy ra đáp án mà học viên đã chọn cho câu hỏi hiện tại
        const userChoice = submittedAnswers[question.id];

        if (userChoice === question.correctOptionId) {
            correctCount++;
        } else {
            // Phương thức .push() dùng để nhét thêm 1 phần tử mới vào cuối mảng
            wrongQuestionIds.push(question.id);
        }
    }

    const scorePercentage = Math.round((correctCount / questions.length) * 100);
    const isPassed = scorePercentage >= PASSING_SCORE;

    // Trả về gói kết quả hoàn chỉnh (Giống hệt bảng QuizAttempt trong Prisma Schema!)
    return {
        scorePercentage: scorePercentage,
        isPassed: isPassed,
        wrongQuestionIds: wrongQuestionIds
    };
}

// 4. Chạy thử nghiệm bộ máy chấm điểm

const attemptResult = gradeQuizAttempt(quizQuestions, userAnswers);
console.log("=== KẾT QUẢ CHẤM ĐIỂM QUIZ ===");
console.log(attemptResult);

// Bài tập thực hành
const myNotes = [
    { id: "note-01", title: "Cách dùng const và let", isConfusing: false },
    { id: "note-02", title: "Sự khác nhau giữa == và ===", isConfusing: true },
    { id: "note-03", title: "Cách hoạt động của vòng lặp for...of", isConfusing: true }
];
function getConfusingNotes(notes) {
    const confusingList = [];
    for (const note of notes) {
        if (note.isConfusing) {
            confusingList.push(note.title);
        }
    }
    return confusingList;
}
console.log(getConfusingNotes(myNotes));