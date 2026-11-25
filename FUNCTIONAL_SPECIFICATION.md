# BrainSpace – Functional Specification

**Version:** 0.1 · **Status:** Draft for team review · **Target:** BrainSpace 1.0 · **Owner:** Team leader

Tài liệu mô tả hệ thống phải làm được gì. Các yêu cầu dưới đây là baseline đề xuất, chưa xác nhận đã triển khai. Khi thay đổi phạm vi, cập nhật tài liệu và Issue liên quan qua PR.

## 1. Mục tiêu và phạm vi

BrainSpace là không gian học tập cá nhân, giúp sinh viên tổ chức tài liệu, hiểu kiến thức bằng AI, luyện tập và nhận phản hồi. Đối tượng thử nghiệm ưu tiên: sinh viên IT và người tự học. Vòng lặp: đặt mục tiêu → học → luyện tập → phân tích → ôn tập → cải thiện.

- P0: 7 module dưới đây, mỗi module chỉ triển khai luồng tối thiểu; AI hỏi đáp tài liệu là điểm nhấn, public deployment là mục tiêu release.
- P1: Knowledge Graph đơn giản, phân tích nâng cao, cải thiện lịch ôn nếu đủ thời gian.
- P2 / ngoài phạm vi 1.0: community, leaderboard, notification email/push, marketplace, thanh toán, video streaming, OCR, app mobile native, đa ngôn ngữ đầy đủ.
- Không cần AI cho mọi chức năng; CRUD, chấm điểm, tính tiến độ và lịch ôn vẫn do nghiệp vụ xác định.

## 2. Actor và phân quyền

Guest là trạng thái chưa xác thực, không phải role trong DB. Tài khoản mới mặc định STUDENT. INSTRUCTOR có quyền học như Student và thêm quyền tạo nội dung; ADMIN quản trị, không mặc nhiên được đọc tài liệu/trò chuyện riêng tư. Quyền phải kiểm tra tại Backend theo role **và** ownership.

| Quyền | Guest | Student | Instructor | Admin |
|---|---|---|---|---|
| Xem catalog khóa học đã xuất bản | Có | Có | Có | Có |
| Đăng ký / đăng nhập | Có | — | — | — |
| Hồ sơ, đăng xuất | — | Cá nhân | Cá nhân | Cá nhân |
| Lộ trình, thư viện, AI, luyện tập, analytics | — | Cá nhân | Cá nhân | — |
| Đăng ký khóa học, học bài | — | Cá nhân | Cá nhân | — |
| Tạo / quản lý khóa học, xem tiến độ học viên | — | — | Khóa học của mình | — |
| Kiểm duyệt khóa học / quản lý tài khoản, role | — | — | — | Có |
| Xem usage AI tổng hợp, không đọc nội dung riêng tư | — | — | — | Có |

## 3. Functional requirements

Mỗi dòng là một nhóm yêu cầu có ID để tạo Issue và trace test. Các ID không cần đổi khi sửa tên chức năng. Acceptance criteria (AC) là điều kiện nghiệm thu tối thiểu. Khi mở Issue, tách nhóm yêu cầu thành task đủ nhỏ.

### M01 – Authentication & User Profile (P0)

| ID | Chức năng / actor | Acceptance criteria |
|---|---|---|
| AUTH-01 | Đăng ký (Guest) | Email hợp lệ, duy nhất; mật khẩu hash; role STUDENT do server gán; trả lỗi trường nhập nếu sai |
| AUTH-02 | Đăng nhập / đăng xuất | Đúng thông tin tạo phiên; sai thông tin trả lỗi chung; logout vô hiệu hóa phiên phía server; token cũ không truy cập được |
| AUTH-03 | Xem / sửa hồ sơ | Chỉ sửa tên, avatar URL, giới thiệu, preferences của mình; không sửa role/status bằng endpoint hồ sơ |
| AUTH-04 | Đổi mật khẩu | Kiểm tra mật khẩu hiện tại; hash mới; thu hồi phiên cũ theo chính sách |
| AUTH-05 | Admin quản lý user | Tìm kiếm, lọc role/status; cấp Instructor, khóa/mở khóa; không tự hạ quyền hoặc khóa admin cuối cùng; khóa thu hồi phiên |
| AUTH-06 | Guard | Guest gọi API riêng nhận 401; người có role sai nhận 403; không lộ dữ liệu riêng của user khác |

### M02 – Learning Path (P0)

| ID | Chức năng | Acceptance criteria |
|---|---|---|
| PATH-01 | CRUD mục tiêu/lộ trình | Tạo tiêu đề, mục tiêu, trình độ, số ngày, phút/ngày; xem list/detail; sửa/xóa tài nguyên của mình |
| PATH-02 | AI tạo lộ trình | Nhận draft có thứ tự, chủ đề, nhiệm vụ và thời lượng; validate JSON; người dùng sửa/xác nhận trước khi lưu |
| PATH-03 | CRUD path item | Thêm/sửa/xóa/sắp xếp item; item liên kết topic; thứ tự nhất quán |
| PATH-04 | Cập nhật tiến độ | NOT_STARTED / IN_PROGRESS / COMPLETED; tiến độ tính từ item; list/detail cập nhật sau refresh |
| PATH-05 | Search/filter/sort | Tìm theo tiêu đề, lọc trạng thái hoặc trình độ; sắp xếp mới nhất; empty state đúng |

### M03 – Course Management (P0, LMS tối giản)

| ID | Chức năng / actor | Acceptance criteria |
|---|---|---|
| COURSE-01 | Catalog / detail (All) | Chỉ công khai PUBLISHED; tìm tiêu đề, lọc category/level, phân trang |
| COURSE-02 | CRUD course (Instructor) | Chỉ quản lý khóa học của mình; tạo DRAFT; xóa bản nháp chưa có enrollment; khóa học có enrollment dùng archive |
| COURSE-03 | CRUD chapter/lesson | Instructor sở hữu course; quản lý thứ tự, Markdown, video URL hoặc tài liệu đính kèm có quyền; bài học không thực thi HTML tùy ý |
| COURSE-04 | Kiểm duyệt | DRAFT → PENDING; Admin approve/reject có lý do; chỉ PUBLISHED xuất hiện trong catalog |
| COURSE-05 | Enrollment | Student/Instructor đăng ký miễn phí, không trùng; xem lesson khi enrolled và có quyền |
| COURSE-06 | Lesson progress | Đánh dấu hoàn thành/hoàn tác; mỗi enrollment + lesson một bản ghi; % tính bằng server |
| COURSE-07 | Tiến độ học viên | Instructor chỉ xem dữ liệu tiến độ của người học trong course mình quản lý, không xem tài liệu/quiz riêng |

### M04 – AI Tutor (P0)

| ID | Chức năng | Acceptance criteria |
|---|---|---|
| AI-01 | CRUD conversation | Tạo, list, detail, đổi tên, xóa; chọn đúng một tài liệu READY thuộc mình cho bản đầu |
| AI-02 | Hỏi đáp tài liệu | Truy xuất đoạn liên quan có kiểm tra owner; gửi context + câu hỏi tới LLM; lưu hỏi/đáp, trả nguồn đoạn/trang có thật |
| AI-03 | Giải thích / tóm tắt / ví dụ | Dùng cùng giao diện hỏi đáp; phân biệt thông tin trong tài liệu và diễn giải; không bịa nguồn |
| AI-04 | Lịch sử trò chuyện | Chỉ chủ sở hữu xem; có loading, empty, error, retry rõ ràng |
| AI-05 | Quota và lỗi | Quota theo user; quá hạn mức 429; timeout/provider lỗi có thông báo, không lưu câu trả lời giả thành công |

### M05 – Smart Notes & Knowledge Library (P0)

| ID | Chức năng | Acceptance criteria |
|---|---|---|
| LIB-01 | Upload PDF/TXT | Kiểm tra type, signature khi phù hợp, kích thước; private storage; trạng thái xử lý và lỗi rõ ràng |
| LIB-02 | Danh sách/chi tiết | Chỉ tài liệu cá nhân; xem metadata, trạng thái, nội dung/trích xuất và tải file bằng quyền hợp lệ |
| LIB-03 | Sửa/xóa tài liệu | Sửa title/tags; xóa ngăn retrieval ngay; dọn file và chunks; xử lý quan hệ theo chính sách §5 |
| LIB-04 | Search/filter/sort | Tìm theo title, lọc tag/type/status, sắp xếp ngày tạo, phân trang |
| LIB-05 | Notes CRUD | Tạo, sửa, xóa ghi chú Markdown; có thể liên kết tài liệu của mình; không render HTML không an toàn |
| LIB-06 | Xử lý tài liệu | UPLOADED → PROCESSING → READY hoặc FAILED; retry có kiểm soát; PDF scan báo không hỗ trợ |

### M06 – Smart Quiz & Flashcards (P0)

| ID | Chức năng | Acceptance criteria |
|---|---|---|
| QUIZ-01 | CRUD Quiz | Tạo thủ công hoặc AI draft từ document READY; 4 lựa chọn, 1 đáp án; có giải thích/topic; cho phép sửa trước khi dùng |
| QUIZ-02 | AI Generate | Số câu và độ khó trong giới hạn; validate schema, nguồn, topic; lỗi không lưu bộ câu hỏi dở dang |
| QUIZ-03 | Làm/nộp bài | Tạo attempt snapshot; player API không trả đáp án; chấm điểm server; nộp lại không nhân đôi kết quả |
| QUIZ-04 | Kết quả/lịch sử | Hiển thị đúng/sai, giải thích, % và lịch sử; cho phép luyện lại câu sai qua attempt mới |
| FLASH-01 | CRUD deck/card | List/detail, tạo thủ công, AI tạo từ tài liệu; sửa/xóa; mỗi thẻ có front/back/topic |
| FLASH-02 | Phiên ôn | Lật thẻ, chọn Again/Hard/Good/Easy; server lưu review và ngày đến hạn; không đếm trùng do double click |
| FLASH-03 | Danh sách đến hạn | Truy vấn thẻ của user có due_at ≤ now; hiển thị trên Dashboard; sắp theo due_at |

### M07 – Learning Analytics (P0)

| ID | Chức năng | Acceptance criteria |
|---|---|---|
| ANA-01 | Dashboard | Tổng hợp tiến độ path/course, quiz accuracy, số thẻ đến hạn từ DB; dữ liệu rỗng hiển thị chưa có dữ liệu |
| ANA-02 | Kết quả theo topic | Đếm đúng/tổng câu đã trả lời; hiển thị số mẫu; ít hơn 5 câu ghi chưa đủ dữ liệu |
| ANA-03 | Đề xuất ôn tập | Ưu tiên thẻ đến hạn và topic accuracy thấp; liên kết tài liệu/quiz/thẻ hiện có của user; không tạo số liệu bằng AI |
| ANA-04 | Lọc thời gian | Hỗ trợ 7/30 ngày cho dữ liệu hoạt động; thời gian học nếu có session đo được; không tự suy ra thời lượng từ việc mở trang |

## 4. Use cases tiêu biểu

### UC-01 – Đăng ký và đăng nhập (AUTH-01/02)

- Actor: Guest; precondition: chưa đăng nhập. Main flow: nhập email/mật khẩu → FE validate → BE validate, hash và lưu user → login → server cấp phiên → Dashboard.
- Alternative: email trùng → 409; sai thông tin → 401; quá nhiều lần thử → 429.
- Postcondition: user có quyền đúng role, phiên có hạn và logout có hiệu lực.

### UC-02 – Tạo lộ trình bằng AI (PATH-02)

- Actor: Student/Instructor; precondition: đăng nhập, còn quota. Nhập mục tiêu, beginner/intermediate/advanced, số ngày, phút/ngày → AI trả draft → người dùng sửa/xác nhận → lưu path và items nguyên tử.
- Alternative: JSON không hợp lệ hoặc timeout → báo lỗi, giữ form; người dùng có thể tạo thủ công.
- Postcondition: path xuất hiện trong list và progress = 0 nếu chưa có item hoàn thành.

### UC-03 – Xuất bản khóa học (COURSE-02/03/04)

- Actor: Instructor và Admin. Instructor tạo DRAFT, thêm chapter/lesson → submit PENDING → Admin xem → approve PUBLISHED hoặc reject có lý do.
- Alternative: chưa có bài học → không submit; không phải owner → từ chối; reject → Instructor sửa về DRAFT và submit lại.
- Postcondition: chỉ course PUBLISHED có mặt ở catalog công khai.

### UC-04 – Upload tài liệu và hỏi AI (LIB-01/06, AI-02)

- Actor: Student/Instructor; precondition: có phiên, file hợp lệ. Upload → private storage → extract/chunk/embed → READY → chọn tài liệu → gửi câu hỏi → retrieval giới hạn owner/document → LLM → hiển thị answer và nguồn.
- Alternative: file scan, lỗi embedding → FAILED và retry; tài liệu người khác → 404; thiếu nguồn → trả lời không đủ thông tin; AI timeout → lỗi có thể retry.
- Postcondition: tài liệu và conversation được lưu, không lộ sang tài khoản khác.

### UC-05 – Tạo Quiz, luyện tập và nhận đề xuất (QUIZ-02/03/04, ANA-02/03)

- Actor: Student/Instructor; precondition: document READY hoặc quiz thủ công. AI tạo draft → validate → xác nhận → bắt đầu attempt → chọn đáp án → nộp → BE chấm và lưu snapshot → analytics cập nhật → đề xuất topic cần ôn.
- Alternative: nộp hai lần → trả kết quả đã lưu, không chấm lại; thiếu mẫu → không gắn nhãn điểm yếu; AI lỗi → tạo thủ công.
- Postcondition: lịch sử và điểm không thay đổi khi quiz gốc bị sửa.

### UC-06 – Ôn Flashcard (FLASH-02/03)

- Actor: Student/Instructor; precondition: sở hữu deck. Mở due cards → lật thẻ → rate → lưu review và due_at → cập nhật dashboard.
- Alternative: không có thẻ đến hạn → empty state; request lặp cùng review key → không tạo review trùng.
- Postcondition: thẻ được lập lịch, lịch sử lưu được.

## 5. Business rules và validation

| Rule | Quy định baseline đề xuất |
|---|---|
| BR-01 | Email trim/lowercase, duy nhất; mật khẩu 8–72 byte UTF-8 nếu dùng bcrypt, không silently truncate; tên 1–100 ký tự. |
| BR-02 | Path 1–365 ngày, 15–480 phút/ngày; title 1–150 ký tự; item không rỗng; AI draft không tự xuất bản/lưu khi chưa xác nhận. |
| BR-03 | Course status DRAFT/PENDING/PUBLISHED/REJECTED/ARCHIVED. PENDING khóa chỉnh sửa. Bản đã xuất bản chỉ được sửa sau khi chuyển về DRAFT (tạm ẩn, kiểm duyệt lại); xác nhận tác động với học viên. |
| BR-04 | ARCHIVED không nhận enrollment mới; học viên cũ vẫn đọc nếu có quyền; không hard-delete course đã có enrollment. |
| BR-05 | PDF có text hoặc TXT UTF-8; tối đa 10 MB/file, 100 trang PDF đề xuất; cap số chunk/tokens và quota; reject file rỗng, scan hoặc giả mạo kiểu. |
| BR-06 | Tài liệu private; không dùng làm nguồn cho người khác. Khi xóa: chặn truy cập ngay, dọn object/chunks, giữ quiz/card/note đã tạo dưới quyền owner, xóa link nguồn hoặc đánh dấu nguồn không còn; không để citation trỏ file đã xóa. |
| BR-07 | Quiz 1–20 câu; mỗi câu 4 lựa chọn khác nhau, 1 đáp án; attempt snapshot bất biến; nộp 1 lần, server tính số đúng/tổng câu kể cả bỏ trống. |
| BR-08 | Flashcard 1–50 thẻ/deck khi generate; Again: cuối phiên (fallback 10 phút), Hard: 1 ngày, Good: 3 ngày, Easy: 7 ngày. Đây là lịch đơn giản, không tuyên bố là FSRS/SM-2. |
| BR-09 | Progress = completed/total × 100, total=0 trả 0; topic accuracy = correct/answered × 100, answered=0 trả null; ≥5 mẫu mới phân loại: <60% củng cố, 60–<80% luyện thêm, ≥80% kết quả tốt. |
| BR-10 | Topic ID dùng chung giữa path item/question/card; topic thuộc owner; tránh join bằng label AI sinh tự do. |
| BR-11 | Quota AI đề xuất 20 generation/chat requests/user/ngày UTC; giới hạn concurrency, embedding/upload riêng; điều chỉnh sau cost spike. Không dùng AI cho chấm điểm. |
| BR-12 | Mỗi list có pagination và sort hợp lệ; default page 1, limit 20, max 100; lỗi FE/BE nhất quán. |
| BR-13 | Tài khoản khóa không dùng protected API; không công khai email, file, lịch sử học; chỉ dùng dữ liệu demo có quyền sử dụng. |

## 6. Non-functional requirements

| ID | Tiêu chí nghiệm thu |
|---|---|
| NFR-01 | FE responsive desktop/mobile; form có label, focus keyboard và lỗi theo trường; loading/empty/error/success rõ ràng. |
| NFR-02 | REST API, validation FE/BE; centralized error handler, HTTP status đúng, không trả stack trace hoặc secret. |
| NFR-03 | Password hashing, authorization, private storage, HTTPS production, giới hạn request; kiểm thử access chéo tài khoản. |
| NFR-04 | DB PK/FK, unique constraints, migrations, seed; không hard-code dữ liệu nghiệp vụ ở FE. |
| NFR-05 | AI timeout/quota, validate output, trích dẫn nguồn kiểm chứng; nội dung tài liệu là dữ liệu không tin cậy, không phải chỉ dẫn hệ thống. |
| NFR-06 | Clone sạch có thể cài/chạy theo README khi release; có demo public, không đưa secret lên Git. |
| NFR-07 | Cả ba thành viên có contribution thực, feature branches, PR và review; tài liệu được cập nhật. |

## 7. Release acceptance / traceability

Xem [Testing Guide](docs/TESTING_GUIDE.md) và [Kickoff checklist](docs/KICKOFF_CHECKLIST.md). Bản 1.0 chỉ được gọi là hoàn thành khi Auth, CRUD chính, list/detail, search/filter, validation, phân quyền và FE–BE–DB end-to-end chạy được; AI thực sự hoạt động; website public truy cập được; đủ tài liệu và demo. Các phần mở rộng không được làm chậm P0. Cả nhóm xác nhận các giới hạn và ưu tiên ở kickoff; nếu deadline ngắn, ghi thay đổi scope tại đây.
