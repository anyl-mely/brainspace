# Đặc tả REST API — Hợp đồng thiết kế dự thảo

Đường dẫn cơ sở: `/api/v1`; dữ liệu trao đổi dùng JSON, ngoại trừ tải lên bằng multipart. Tài liệu này mô tả hợp đồng thiết kế API; chưa phải API đang chạy hoặc file OpenAPI. Cần xác nhận schema của request/response trước khi triển khai, sau đó mô tả hành vi thực tế bằng Swagger/OpenAPI.

## 1. Quy ước chung

Request cần xác thực sử dụng `Authorization: Bearer <access-token>`; làm mới phiên qua HttpOnly cookie, kết hợp kiểm tra CSRF/Origin khi phù hợp. Endpoint công khai được ghi rõ trong bảng. Mỗi tài nguyên phải được giới hạn theo người sở hữu đã xác thực, quyền của giảng viên hoặc quyền ghi danh tương ứng; phạm vi Admin chỉ phục vụ chức năng quản trị. Trả 404 khi người gọi không có quyền nhìn thấy tài nguyên riêng tư, 403 khi vai trò không được phép, 401 khi chưa xác thực hoặc phiên đã hết hạn/bị thu hồi. Dùng 201 khi tạo tài nguyên, 202 khi tiếp nhận xử lý bất đồng bộ, 200 khi đọc/cập nhật, 204 khi xóa và không trả body, 400 khi đầu vào không hợp lệ, 409 khi xung đột, 429 khi vượt giới hạn tần suất/quota, 502/503/504 khi provider/dịch vụ gặp lỗi và 500 khi có lỗi ngoài dự kiến. Không trả stack trace. Phản hồi 204 không có body.

```json
{
  "success": true,
  "data": { "id": "example-id", "title": "Learn ReactJS" }
}
```

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [{ "field": "title", "message": "Title is required" }],
    "requestId": "example-request-id"
  }
}
```

Danh sách sử dụng `?page=1&limit=20&search=react&sort=createdAt:desc` cùng các bộ lọc riêng của từng tài nguyên. Giới hạn tối đa là 100. Trả `data.items` và `data.pagination` gồm page, limit, total. Chỉ cho phép các khóa sắp xếp đã định nghĩa; không đưa trực tiếp chuỗi query thô vào SQL. Ngày giờ theo ISO 8601 UTC. ID là chuỗi mà client không cần diễn giải cấu trúc bên trong. Ký hiệu `GET/PATCH/DELETE .../:id` trong bảng là cách viết gọn của ba endpoint riêng; tạo mới bằng POST vào collection. PATCH chỉ nhận các trường trong danh sách cho phép.

## 2. Danh mục endpoint

| Phương thức | Đường dẫn (tính từ đường dẫn cơ sở) | Phạm vi quyền / chức năng |
|---|---|---|
| GET | /health | Công khai, chỉ cung cấp trạng thái dịch vụ |
| POST | /auth/register | Công khai, vai trò mặc định là STUDENT |
| POST | /auth/login | Công khai, trả access token và refresh cookie |
| POST | /auth/refresh | Yêu cầu phiên refresh hợp lệ |
| POST | /auth/logout | Thu hồi phiên, xóa cookie |
| GET/PATCH | /users/me | Đã xác thực, hồ sơ của chính người dùng |
| POST | /users/me/change-password | Đã xác thực, thu hồi các phiên |
| GET | /admin/users | Admin, tìm kiếm/lọc người dùng |
| PATCH | /admin/users/:id | Admin, chỉ cập nhật role/status trong danh sách cho phép |
| GET | /admin/analytics | Admin, chỉ xem số lượng và mức sử dụng tổng hợp |
| GET/POST | /learning-paths | Người học, xem danh sách/tạo mới |
| GET/PATCH/DELETE | /learning-paths/:id | Người sở hữu |
| POST | /learning-paths/generate | Người học, trả bản nháp và chưa lưu dữ liệu |
| POST | /learning-paths/:id/items | Người sở hữu, tạo mục theo topic |
| PATCH/DELETE | /learning-path-items/:id | Người sở hữu, sửa/cập nhật trạng thái/xóa |
| GET | /courses | Công khai, danh sách khóa học đã xuất bản |
| GET | /courses/:id | Metadata đã xuất bản được công khai; metadata bản nháp dành cho người sở hữu/Admin |
| POST | /courses | Giảng viên, tạo bản nháp |
| PATCH/DELETE | /courses/:id | Giảng viên sở hữu khóa học, chỉ thao tác ở trạng thái được phép |
| GET | /instructor/courses | Giảng viên, danh sách khóa học do mình sở hữu |
| POST | /courses/:id/chapters | Giảng viên sở hữu khóa học |
| PATCH/DELETE | /chapters/:id | Giảng viên sở hữu khóa học |
| POST | /chapters/:id/lessons | Giảng viên sở hữu khóa học |
| PATCH/DELETE | /lessons/:id | Giảng viên sở hữu khóa học |
| POST | /courses/:id/submit | Giảng viên sở hữu khóa học, chuyển sang PENDING |
| POST | /courses/:id/reopen-draft | Giảng viên sở hữu khóa học, chuyển trạng thái theo quy tắc cho phép |
| POST | /courses/:id/archive | Giảng viên sở hữu khóa học, ngừng nhận ghi danh mới |
| GET | /admin/courses | Admin, hàng đợi kiểm duyệt |
| PATCH | /admin/courses/:id/status | Admin, duyệt/từ chối kèm lý do |
| POST | /courses/:id/enroll | Người học, khóa học đã xuất bản, bảo đảm ghi danh duy nhất |
| GET | /enrollments/me | Người học, các khóa học mình đã ghi danh |
| GET | /lessons/:id | Người học đã ghi danh / giảng viên sở hữu khóa học / Admin trong phạm vi kiểm duyệt |
| PATCH | /lessons/:id/progress | Người học đã ghi danh, cập nhật cờ hoàn thành |
| GET | /courses/:id/students/progress | Giảng viên sở hữu khóa học |
| GET/POST | /documents | Người học, xem danh sách / tải lên bằng multipart |
| GET/PATCH/DELETE | /documents/:id | Người sở hữu, xem metadata/sửa/xóa |
| GET | /documents/:id/download | Người sở hữu, nhận URL có thời hạn ngắn sau khi kiểm tra quyền |
| POST | /documents/:id/retry | Người sở hữu, chỉ áp dụng khi xử lý thất bại |
| GET/POST | /tags | Người học, tag của chính mình |
| PATCH/DELETE | /tags/:id | Người sở hữu |
| GET/POST | /notes | Người học, ghi chú của chính mình |
| GET/PATCH/DELETE | /notes/:id | Người sở hữu |
| GET/POST | /conversations | Người học, hội thoại của chính mình; tạo mới yêu cầu tài liệu READY |
| GET/PATCH/DELETE | /conversations/:id | Người sở hữu |
| GET/POST | /conversations/:id/messages | Người sở hữu, xem lịch sử / hỏi gia sư AI |
| GET/POST | /quizzes | Người học, xem danh sách/tạo mới, bao gồm bản nháp đã xác nhận |
| POST | /quizzes/generate | Người học, tạo bản nháp bằng AI |
| GET/PATCH/DELETE | /quizzes/:id | Người sở hữu, xem/sửa nội dung chi tiết dành cho trình biên tập, không phải dữ liệu của màn hình làm bài |
| POST | /quizzes/:id/attempts | Người sở hữu, tạo snapshot bất biến |
| GET | /quiz-attempts/:id | Người sở hữu, DTO làm bài/kết quả tùy theo trạng thái |
| POST | /quiz-attempts/:id/submit | Người sở hữu, chấm điểm đúng một lần |
| GET | /quiz-attempts | Người sở hữu, xem lịch sử làm bài |
| GET/POST | /flashcard-decks | Người học, xem danh sách/tạo mới từ bản nháp đã xác nhận |
| POST | /flashcard-decks/generate | Người học, tạo bản nháp bằng AI |
| GET/PATCH/DELETE | /flashcard-decks/:id | Người sở hữu |
| POST | /flashcard-decks/:id/cards | Người sở hữu |
| PATCH/DELETE | /flashcards/:id | Người sở hữu |
| GET | /flashcards/due | Người học, thẻ đến hạn ôn tập |
| POST | /flashcards/:id/reviews | Người sở hữu, gửi khóa định danh lượt ôn tập và mức đánh giá |
| GET | /analytics/overview | Người học, dữ liệu của chính mình |
| GET | /analytics/topics | Người học, số mẫu và độ chính xác theo topic của chính mình |
| GET | /analytics/recommendations | Người học, hành động tiếp theo được đề xuất cho chính mình |

Người học (Learner) gồm Student hoặc Instructor. Route guard ở Frontend không thay thế việc kiểm tra quyền tại API. Admin chỉ sử dụng metadata/nội dung khóa học trong phạm vi kiểm duyệt, không có quyền truy cập thư viện cá nhân từ quyền kiểm duyệt này.

## 3. Ví dụ dữ liệu gửi và nhận

`POST /learning-paths/generate`:

```json
{"goal":"Learn ReactJS","level":"BEGINNER","targetDays":30,"minutesPerDay":120}
```

Trả tiêu đề bản nháp và danh sách mục theo thứ tự, gồm nhãn topic, tiêu đề, mô tả và số phút ước tính. Khi xác nhận, gửi các trường/mục đã được kiểm tra hợp lệ tới `POST /learning-paths`; server xác định topic ID chuẩn thuộc người sở hữu và lưu trong transaction. Không chấp nhận topic ID tùy ý thuộc người khác.

`POST /documents`: multipart gồm `file` (PDF/TXT), `title` và `tagIds` tùy chọn, được mã hóa theo contract sau khi chốt. **Ví dụ phản hồi hiện tại là dự thảo:** trả id, status (PROCESSING hoặc READY) và metadata. Gọi GET chi tiết định kỳ trong lúc xử lý; khi lỗi, trả trạng thái FAILED và lý do. Không để lộ khóa của object riêng tư hoặc URL công khai vĩnh viễn.

> **Điểm cần chốt tại [#4](https://github.com/anyl-mely/brainspace/issues/4):** đối chiếu trạng thái phản hồi ban đầu của API upload với metadata UPLOADED trong [#21](https://github.com/anyl-mely/brainspace/issues/21) và ví dụ PROCESSING/READY ở trên. Nhóm cần thống nhất trạng thái trả về, thời điểm bắt đầu xử lý và mã phản hồi 201/202 tương ứng. Theo [#24](https://github.com/anyl-mely/brainspace/issues/24) và [#25](https://github.com/anyl-mely/brainspace/issues/25), READY thực tế chỉ có sau khi xử lý tài liệu và lưu đầy đủ embeddings thành công. Phương án phản hồi upload vẫn đang chờ quyết định; cập nhật DTO và kiểm thử liên quan sau khi chốt.

`POST /conversations/:id/messages`: `{ "question": "What is useEffect?" }` → văn bản trả lời và mảng citations chứa `chunkId`, `documentId` hợp lệ, page (có thể null) và đoạn trích ngắn. Backend đối chiếu citation ID với các chunk đã truy xuất và được phép sử dụng. Nếu thiếu nguồn, thông báo rõ chưa đủ ngữ cảnh. Khi gặp lỗi quota, không tạo câu trả lời giả.

`POST /quizzes/generate`: `{ "documentId": "doc-id", "count": 5, "difficulty": "BEGINNER" }` → câu hỏi dạng bản nháp với các lựa chọn, chỉ số đáp án đúng, lời giải và topic; người dùng có thể xem bản nháp của mình trong trình biên tập. Endpoint dành cho lượt làm bài **không** gửi chỉ số đáp án đúng hoặc lời giải trước khi nộp bài; tách DTO cho trình biên tập và màn hình làm bài.

`POST /quiz-attempts/:id/submit`:

```json
{"answers":[{"questionKey":"q1","selectedIndex":1},{"questionKey":"q2","selectedIndex":0}]}
```

Server kiểm tra khóa câu hỏi theo snapshot, tính câu bỏ trống là sai và chấm điểm nguyên tử đúng một lần; gửi lại request sẽ trả kết quả đã lưu mà không thay đổi điểm. Phản hồi sau khi nộp gồm đáp án đúng, lời giải và phần tổng hợp. Không nhận điểm do client gửi lên.

`POST /flashcards/:id/reviews`: `{ "rating":"GOOD", "requestKey":"unique-client-generated-id" }` → review ID và nextDueAt. Từ chối mức đánh giá không hợp lệ; cùng một khóa sẽ trả kết quả trước đó; timestamp do server xác định.

`GET /analytics/topics?days=7`: mỗi mục gồm topicId, label, correctCount, answeredCount, accuracy (có thể null), classification; dưới 5 câu trả lời được coi là chưa đủ dữ liệu. `GET /analytics/recommendations` trả các hành động ôn thẻ đến hạn và củng cố topic yếu, liên kết tới tài nguyên hiện có; không tạo ID không tồn tại.

## 4. Điều kiện chốt hợp đồng API

Trước khi viết code, thống nhất chính xác các trường DTO, enum, phương án auth/cookie, phân trang và lỗi, giới hạn upload, phiên bản schema, idempotency và trường hợp cho phép null. Mỗi PR thay đổi API phải cập nhật tài liệu này hoặc OpenAPI được sinh ra, đồng thời cập nhật type của Frontend và kiểm thử. Trước khi merge, kiểm thử trường hợp chưa có quyền, sai người sở hữu, payload không hợp lệ và luồng thành công.
