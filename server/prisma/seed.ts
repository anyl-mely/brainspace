// server/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialLessons = [
    {
        id: 'les-01',
        title: 'Semantic HTML5',
        duration: 20,
        order: 1,
        isCompleted: true,
        objectives: [
            'Phân biệt thẻ ngữ nghĩa (Semantic) và thẻ vô nghĩa (div, span).',
            'Áp dụng đúng cấu trúc header, nav, main, article, section và aside.',
        ],
        coreContent:
            'Semantic HTML giúp trình duyệt và chính lập trình viên đọc hiểu ngay vai trò của từng khối giao diện mà không cần đoán qua tên class, đồng thời tối ưu SEO và khả năng tiếp cận (Accessibility).',
        quiz: {
            question: 'Thẻ nào phù hợp nhất để bao bọc nội dung độc lập, trọn vẹn của một bài viết hoặc bài học?',
            options: ['<div>', '<article>', '<span>', '<aside>'],
            correctIndex: 1,
            explanation: 'Thẻ <article> đại diện cho một khối nội dung độc lập, có thể tái sử dụng hoặc phân phối riêng biệt.',
        },
    },
    {
        id: 'les-02',
        title: 'CSS Grid & Flexbox',
        duration: 30,
        order: 2,
        isCompleted: true,
        objectives: [
            'Nắm vững tư duy bố cục 1 chiều (Flexbox) và 2 chiều (CSS Grid).',
            'Xây dựng layout 3 cột chuẩn ứng dụng Workspace.',
        ],
        coreContent:
            'Flexbox tối ưu cho việc căn chỉnh các phần tử theo một trục ngang hoặc dọc (như thanh Header), trong khi CSS Grid kiểm soát đồng thời cả hàng và cột cho bố cục tổng thể của trang.',
        quiz: {
            question: 'Khi muốn chia giao diện thành 3 cột cố định và 1 hàng ngang cùng lúc, công cụ nào trực quan nhất?',
            options: ['CSS Grid', 'Float Left', 'Position Absolute', 'Inline-block'],
            correctIndex: 0,
            explanation: 'CSS Grid cho phép định nghĩa lưới 2 chiều (grid-template-columns) cực kỳ mạch lạc.',
        },
    },
    {
        id: 'les-03',
        title: 'JavaScript Modern ES6+',
        duration: 45,
        order: 3,
        isCompleted: true,
        objectives: [
            'Làm chủ Destructuring, Spread/Rest Operator và Arrow Functions.',
            'Hiểu luồng bất đồng bộ Event Loop, Promise và async/await.',
        ],
        coreContent:
            'ES6+ cung cấp cú pháp ngắn gọn và bất biến (immutability), là nền tảng bắt buộc để thao tác dữ liệu mảng/object trong React mà không làm biến đổi trực tiếp dữ liệu gốc.',
        quiz: {
            question: 'Hàm mảng nào trả về một mảng mới cùng độ dài để render danh sách trong React JSX?',
            options: ['forEach()', 'map()', 'push()', 'splice()'],
            correctIndex: 1,
            explanation: 'map() biến đổi từng phần tử và trả về một mảng mới chứa các thẻ JSX để React hiển thị.',
        },
    },
    {
        id: 'les-04',
        title: 'React Fundamentals & Architecture',
        duration: 60,
        order: 4,
        isCompleted: false,
        objectives: [
            'Phân tách giao diện theo kiến trúc Component & Feature-based.',
            'Điều phối dữ liệu qua Props, useState và Lifting State Up.',
        ],
        coreContent:
            'Trong React, giao diện là một hàm của trạng thái: UI = f(state). Thay vì tìm thẻ DOM và sửa thủ công, ta cập nhật State và để Virtual DOM tự động tính toán phần giao diện cần vẽ lại.',
        quiz: {
            question: 'Khi hai Component ngang hàng cần dùng chung và đồng bộ một trạng thái, ta nên đặt State ở đâu?',
            options: [
                'Tạo 2 state giống nhau ở cả hai Component',
                'Lưu vào biến toàn cục bên ngoài file',
                'Nâng State lên Component cha chung gần nhất (Lifting State Up)',
                'Sửa trực tiếp Props của nhau',
            ],
            correctIndex: 2,
            explanation: 'Lifting State Up giúp giữ một nguồn chân lý duy nhất (Single Source of Truth) ở Component cha.',
        },
    },
];

async function main() {
    try {
        console.log('🌱 Đang nạp dữ liệu bài học mẫu vào PostgreSQL...');

        for (const lesson of initialLessons) {
            await prisma.lesson.upsert({
                where: { id: lesson.id },
                update: {
                    title: lesson.title,
                    duration: lesson.duration,
                    order: lesson.order,
                    coreContent: lesson.coreContent,
                    objectives: lesson.objectives,
                    quiz: lesson.quiz,
                },
                create: lesson,
            });
        }

        console.log(`✅ Đã đồng bộ thành công ${initialLessons.length} bài học vào bảng lessons.`);
    } finally {
        await prisma.$disconnect();
    }
}