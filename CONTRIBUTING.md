# Hướng dẫn đóng góp cho BrainSpace

Áp dụng cho cả ba thành viên, kể cả Leader. Đọc [Functional Specification](FUNCTIONAL_SPECIFICATION.md), [Git Workflow](docs/GIT_WORKFLOW.md) và [Coding Conventions](docs/CODING_CONVENTIONS.md) trước khi làm task.

## Quy ước ngôn ngữ tài liệu

- Tiếng Việt là ngôn ngữ diễn giải chính của tài liệu làm việc: tiêu đề, hướng dẫn, checklist, mô tả nghiệp vụ và kiểm thử.
- Giữ nguyên tên file/đường dẫn, mã yêu cầu/test/Issue, lệnh, endpoint, JSON key, tên bảng/cột, kiểu dữ liệu, enum, mã lỗi và biến môi trường.
- Thuật ngữ kỹ thuật quen dùng có thể giữ tiếng Anh; giải thích ngắn bằng tiếng Việt ở lần xuất hiện đầu tiên nếu cần.
- README là trang giới thiệu công khai bằng tiếng Anh; tài liệu chi tiết và mẫu Issue/PR dùng tiếng Việt. Commit message và tên nhánh tiếp tục theo quy ước bên dưới.
- Khi đổi tiêu đề, kiểm tra lại mục lục, anchor và liên kết. Việc dịch phải bảo toàn ý nghĩa kỹ thuật; thay đổi contract hoặc quy trình cần được nêu rõ trong PR.
- Checkbox, trạng thái phê duyệt và kết quả kiểm thử chỉ cập nhật theo bằng chứng. Giữ nguyên các giá trị `PASS`, `FAIL`, `BLOCKED`, `NOT RUN` khi ghi kết quả.

## Thỏa thuận làm việc

- Mỗi task có GitHub Issue, assignee, requirement ID (nếu có), acceptance criteria và phạm vi rõ ràng.
- GitHub Flow: `main` ổn định; branch ngắn hạn theo task (`feature/13-session-authentication`, `fix/<issue>-<slug>`, `docs/functional-specification`, `chore/project-initialization`, `test/auth-api`, `refactor/ai-service`). Không dùng branch cá nhân dài hạn.
- Không push trực tiếp, force push hoặc xóa `main`. Không đưa tên tổ chức đào tạo vào repo/branch/commit. Không rewrite lịch sử chung.
- Conventional Commits: `feat(auth): implement registration`, `fix(quiz): prevent duplicate submissions`, `docs: update setup guide`. Commit nhỏ, đúng phạm vi, không commit secret.
- PR hướng vào `main`; dùng `Refs #13` cho ví dụ chỉ triển khai một phần của Issue #13. Chỉ dùng từ khóa tự đóng Issue khi toàn bộ AC/DoD tương ứng đã đạt. Thay số Issue và slug theo công việc thật; `<issue>`/`<slug>` là chỗ điền, không gõ nguyên văn.
- Cần ít nhất một approval độc lập từ thành viên khác người viết thay đổi; giải quyết góp ý, chạy kiểm thử liên quan và dùng Create a merge commit. Leader cũng cần được review. Approval từ tài khoản phụ của tác giả không thay thế review độc lập; không bypass để merge nhanh.
- Chỉ merge khi đáp ứng tất cả điều kiện bảo vệ nhánh; xóa branch sau merge. Tác giả đồng bộ local main.
- Nếu thay đổi schema/API, báo nhóm trước, cập nhật migration/contract, phối hợp để không làm hỏng module khác.

## Điều kiện sẵn sàng bắt đầu — Definition of Ready

Issue nêu rõ actor, mục tiêu, mã yêu cầu, tiêu chí nghiệm thu (AC), dependency và người phụ trách. Không có blocker đối với phần công việc bắt đầu; các dependency tích hợp còn thiếu phải ghi rõ đầu ra cần nhận và owner cung cấp. Có thể triển khai phần độc lập theo contract/mock đã review, đồng thời ghi rõ giới hạn và phần cần tích hợp thật.

## Điều kiện hoàn thành — Definition of Done

Issue đạt toàn bộ AC; validation và quyền FE/BE đúng khi có liên quan; kiểm thử phù hợp đạt và có bằng chứng; không có secret/log nhạy cảm; tài liệu được cập nhật; PR được review và merge nếu có thay đổi repository. Với Issue tài liệu hoặc điều phối, ghi bằng chứng nghiệm thu và lý do các kiểm tra kỹ thuật không áp dụng. Issue không được đóng chỉ vì code đã push hoặc một PR thành phần đã merge.

## Bảo mật và quyền riêng tư

Repo public. Không commit `.env`, API key, file PDF cá nhân, DB dump, email người học, token hay ảnh có dữ liệu riêng. Nếu lộ secret, revoke/rotate ngay, báo Leader, phối hợp xử lý lịch sử; xóa file đơn thuần không đủ. Không dùng dữ liệu học tập thực trong test public nếu chưa có quyền.

## Cách trao đổi khi review

Góp ý vào hành vi code, giải thích lý do và đề xuất cách sửa. Phân biệt blocker với suggestion. Người sửa phản hồi, push commit mới, yêu cầu review lại nếu cần. Xung đột nghiệp vụ được giải quyết cùng người phụ trách, không chọn ours/theirs toàn bộ một cách máy móc.
