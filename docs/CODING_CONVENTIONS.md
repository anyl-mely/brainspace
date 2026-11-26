# Coding Conventions

Baseline để review code BrainSpace. Khi scaffold xong, thống nhất ESLint/Prettier và pin config; file này không tự thay thế linter.

| Nội dung | Quy ước |
|---|---|
| TS variable/function | camelCase, tên theo ý nghĩa (`calculateQuizScore`) |
| React component/type | PascalCase (`DocumentCard`, `QuizAttempt`) |
| Hook | use prefix (`useDocuments`) |
| Backend file | kebab-case theo domain (`quiz-attempt.service.ts`) |
| Constant | UPPER_SNAKE_CASE khi thực sự là constant |
| DB | snake_case, tên bảng số nhiều; Prisma map nếu cần |
| API | plural kebab-case resources, `/api/v1/learning-paths` |
| Formatting | 2 spaces, LF, UTF-8; thống nhất qua linter |

## Frontend

Component nhỏ theo trách nhiệm, props có type, hook đúng quy tắc, list key ổn định. Không lưu derived state nếu có thể tính từ state hiện có. Query keys theo resource + params; invalidate cache sau mutation. Không hard-code dữ liệu nghiệp vụ, không gửi role/owner tin cậy từ client. Form FE validation giúp UX, server vẫn validate. Mọi trang data có loading/empty/error/success, retry hợp lý, responsive và keyboard focus. Không render HTML từ AI/Markdown không sanitize. Không lộ đáp án quiz trong player API.

## Backend

Routes/controller/service/repository, validate params/body/query; explicit DTO cho response, không trả nguyên user record (passwordHash/session/token). Authorization role + resource ownership; truy vấn scope theo user. Dùng async error handler, HTTP status đúng, structured errors. Dùng transaction cho write nhiều bảng, idempotency cho quiz submit/review, unique DB constraints. Parameterized SQL; không nối chuỗi user input. Không catch lỗi rồi trả 200 giả. Request ID, log metadata đủ debug, không log secrets hoặc nội dung riêng.

## Database & AI

Migration có PR riêng hoặc ghi rõ dependency; không sửa migration đã apply trên DB chung. Seed idempotent và an toàn, không chứa mật khẩu thật. Topic ID là canonical; timestamp UTC. AI prompts version theo module, structured output validate, citations phải thuộc nguồn retrieval, max context/quota. Không tin chỉ dẫn nằm trong tài liệu user. AI lỗi không làm hỏng CRUD thường.

## Review checklist

- [ ] Đúng requirement ID/AC và không mở rộng scope vô lý.
- [ ] Không duplicated logic lớn, tên rõ nghĩa, type an toàn (tránh `any` không giải thích).
- [ ] Validation, role/owner, state lỗi đầy đủ; không secret.
- [ ] Test happy path, invalid input, unauthorized và edge case có liên quan.
- [ ] API/DB contract, README/spec được cập nhật; migration/lockfile commit khi cần.
- [ ] PR nhỏ, diff rõ ràng, không trộn format toàn repo với feature.
