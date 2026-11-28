# Hướng dẫn kiểm thử và chất lượng

**Trạng thái:** Kế hoạch kiểm thử, chưa thực hiện kiểm thử. Mã test được liên kết với yêu cầu trong [Đặc tả chức năng](../FUNCTIONAL_SPECIFICATION.md). Ghi kết quả thực tế PASS/FAIL/BLOCKED và bằng chứng vào Issue/PR; chỉ đánh dấu đạt sau khi đã chạy và kiểm chứng.

## 1. Các lớp kiểm thử

- **Unit test:** tiến độ, chấm điểm, ngày đến hạn ôn tập, ngưỡng đánh giá topic và validation.
- **Integration test:** API kết nối DB kiểm thử riêng, xác thực/ownership, transaction và ràng buộc unique.
- **Kiểm thử AI:** dùng mock provider cho các test cần kết quả xác định; đánh giá riêng với provider thật.
- **E2E thủ công hoặc Playwright:** login → upload → Tutor → Quiz → Analytics → ôn tập Flashcards; luồng kiểm duyệt khóa học là luồng phụ.
- **Giao diện:** desktop/mobile, bàn phím và các trạng thái loading/error/empty/success.
- **CI khi đã có script:** chạy `npm ci`, lint, typecheck, test và build; DB kiểm thử phải tách khỏi production. Bảo vệ secret trước PR không đáng tin cậy; không chạy mã chưa được tin cậy với credential triển khai.

## 2. Ma trận kiểm thử nghiệm thu

| ID | Yêu cầu | Tình huống | Kết quả mong đợi |
| --- | --- | --- | --- |
| T01 | AUTH-01 | Đăng ký bằng email hợp lệ, sau đó đăng ký trùng email | Chỉ tạo một user, mật khẩu chỉ lưu dạng hash, trả 409 khi trùng |
| T02 | AUTH-02 | Nhập sai mật khẩu, đăng nhập, đăng xuất rồi dùng lại token | Trả 401 khi sai mật khẩu; tạo phiên hợp lệ khi đăng nhập đúng; từ chối phiên cũ sau đăng xuất |
| T03 | AUTH-05/06 | Student gọi endpoint Admin / Admin khóa user | Trả 403 khi sai role / từ chối user đã bị khóa |
| T04 | PATH-01/03 | CRUD path và item bằng tài khoản owner và tài khoản khác | Dữ liệu đúng; truy cập trái phép trả 404 |
| T05 | PATH-04/05 | Hoàn thành 2/4 item; lọc/tìm kiếm không có kết quả | Tiến độ 50%; danh sách được lọc đúng và hiển thị trạng thái rỗng |
| T06 | PATH-02 | AI trả JSON không hợp lệ hoặc timeout | Không lưu dữ liệu dở dang; hỗ trợ thử lại hoặc tạo path thủ công |
| T07 | COURSE-02/04 | Tạo bản nháp, gửi duyệt, từ chối, chỉnh sửa và phê duyệt | Chỉ nội dung đã được duyệt mới được công khai; từ chối chuyển trạng thái không hợp lệ |
| T08 | COURSE-05/06 | Ghi danh hai lần, hoàn thành bài học, truy cập bài học không thuộc phạm vi | Không ghi danh trùng; tính tiến độ đúng; từ chối thao tác không hợp lệ |
| T09 | LIB-01/06 | PDF có văn bản/TXT, file scan, file vượt giới hạn, MIME giả | Tài liệu hợp lệ đạt READY sau khi xử lý hoàn tất; file không hợp lệ bị từ chối hoặc FAILED, có hiển thị thao tác thử lại |
| T10 | LIB-02/03 | User B xem chi tiết/tải xuống/xóa tài liệu của User A | Trả 404; không truy cập được object riêng tư |
| T11 | LIB-04/05 | Tìm kiếm/tag và CRUD note | Danh sách, chi tiết đúng owner; hiển thị trạng thái rỗng phù hợp |
| T12 | AI-02 | Hỏi câu có đáp án đã biết trong PDF | Câu trả lời trích dẫn chunk/trang có thật và đúng nội dung |
| T13 | AI-02/03 | Nguồn không có đáp án / PDF chứa chỉ dẫn bị chèn | Thông báo thiếu ngữ cảnh; không thực thi chỉ dẫn bị chèn hoặc làm lộ dữ liệu |
| T14 | AI-05 | Hết quota hoặc timeout | Trả 429 / lỗi được xử lý có kiểm soát; không tạo câu trả lời bịa |
| T15 | QUIZ-01/02 | AI trả lựa chọn hoặc chỉ số đáp án không hợp lệ | Từ chối bản nháp; không lưu các bản ghi dở dang |
| T16 | QUIZ-03/04 | Bắt đầu làm bài, kiểm tra dữ liệu qua mạng, nộp hai lần | DTO làm bài không lộ đáp án đúng; chỉ lưu một kết quả chấm điểm |
| T17 | QUIZ-04 | Sửa/xóa Quiz sau khi đã nộp bài | Giữ nguyên snapshot và kết quả trước đó |
| T18 | FLASH-01/02 | CRUD, đánh giá GOOD, gửi trùng request key | Lần ôn tiếp theo sau 3 ngày; chỉ ghi một lần review |
| T19 | FLASH-03 | Thẻ đã đến hạn và chưa đến hạn của hai user | Chỉ trả thẻ đến hạn của user hiện tại |
| T20 | ANA-01/02 | Lịch sử rỗng, 2 mẫu, 5 mẫu | Trả null/trạng thái chưa đủ dữ liệu phù hợp; tính đúng số lượng và ngưỡng |
| T21 | ANA-03 | Topic có độ chính xác thấp và có thẻ đến hạn | Đề xuất hoạt động ôn tập có liên kết thật; không tạo dữ liệu bịa |
| T22 | LIB-03 / AI-02 | Xóa tài liệu nguồn rồi đặt câu hỏi | Chặn retrieval từ nguồn đã xóa; đánh dấu citation mất nguồn; theo dõi việc dọn storage |
| T23 | NFR-01/02 | Mobile, form không hợp lệ, lỗi mạng, trạng thái tải | Giao diện hỗ trợ khả năng truy cập, thông báo lỗi rõ ràng, không bị crash |
| T24 | NFR-04/06 | Clone sạch, chạy migration/seed DB và khởi động | Làm lại được theo README; API kết nối được DB |
| T25 | NFR-03/05 | Kiểm tra Git diff/log để tìm secret, kiểm tra quyền truy cập storage | Không có secret/dữ liệu mẫu riêng tư; chỉ tải xuống khi được cấp quyền |
| T26 | NFR-06 | Deployment công khai, tải lại route lồng nhau, kiểm thử nhanh E2E | Truy cập được URL công khai, route hoạt động, hành trình chính đạt yêu cầu |

## 3. Đánh giá AI với provider thật

Dùng PDF có văn bản và TXT dung lượng nhỏ, được phép sử dụng. Chuẩn bị **10 câu có đáp án** kèm đoạn trích mong đợi, **5 câu không có đáp án** và **3 tình huống tấn công/kiểm tra truy cập chéo owner**. Ghi provider/model, ngày kiểm thử, ID của chunk được truy xuất, mức độ câu trả lời bám nguồn, tính hợp lệ của citation và độ trễ.

Mục tiêu ban đầu được đề xuất:

- Ít nhất **8/10** câu có đáp án được trả lời bám nguồn.
- **5/5** câu không có đáp án không được bịa nguồn.
- **0** trường hợp rò rỉ dữ liệu chéo owner; không chấp nhận rò rỉ nghiêm trọng dù điểm tổng thể đạt mục tiêu.

Đây là mục tiêu nghiệm thu phát hành; kết quả đo thực tế phải được ghi riêng. Review các tình huống chưa đạt để điều chỉnh chunking/retrieval/context. Ghi token usage và chi phí thực tế nếu có dữ liệu. Không commit prompt riêng tư hoặc dữ liệu nguồn riêng tư.

## 4. Mẫu ghi nhận kết quả kiểm thử

```text
Test ID / Mã yêu cầu:
Môi trường / commit:
Dữ liệu đầu vào / điều kiện trước khi chạy:
Các bước thực hiện:
Kết quả mong đợi:
Kết quả thực tế:
Trạng thái: PASS | FAIL | BLOCKED | NOT RUN
Bằng chứng (đã loại bỏ dữ liệu riêng tư):
```

## 5. Điều kiện phát hành

Các luồng thành công bắt buộc và kiểm thử quan trọng về authorization/ownership phải đạt yêu cầu. Không còn blocker mức critical/high trong luồng demo chính; luồng AI dùng provider thật đã được kiểm chứng; deployment công khai đã được kiểm thử nhanh; một thành viên khác đã kiểm tra hướng dẫn bằng bản clone sạch. Ghi rõ các giới hạn đã biết. Xem [Checklist khởi động và bàn giao](KICKOFF_CHECKLIST.md) để đối chiếu bộ đầu ra.
