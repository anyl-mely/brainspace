# Contributing to BrainSpace

Áp dụng cho cả ba thành viên, kể cả Leader. Đọc [Functional Specification](FUNCTIONAL_SPECIFICATION.md), [Git Workflow](docs/GIT_WORKFLOW.md) và [Coding Conventions](docs/CODING_CONVENTIONS.md) trước khi làm task.

## Working agreement

- Mỗi task có GitHub Issue, assignee, requirement ID (nếu có), acceptance criteria và phạm vi rõ ràng.
- GitHub Flow: `main` ổn định; branch ngắn hạn theo task (`feature/12-user-registration`, `fix/25-quiz-scoring`, `docs/functional-specification`, `chore/project-initialization`, `test/auth-api`, `refactor/ai-service`). Không dùng branch cá nhân dài hạn.
- Không push trực tiếp, force push hoặc xóa `main`. Không đưa tên tổ chức đào tạo vào repo/branch/commit. Không rewrite lịch sử chung.
- Conventional Commits: `feat(auth): implement registration`, `fix(quiz): prevent duplicate submissions`, `docs: update setup guide`. Commit nhỏ, đúng phạm vi, không commit secret.
- PR target `main`, link Issue bằng `Closes #12` chỉ khi hoàn tất toàn bộ Issue. Nếu chỉ làm một phần, dùng `Refs #12`.
- Ít nhất một collaborator khác tác giả approve; giải quyết comment; chạy test liên quan; dùng Create a merge commit. Leader cũng cần review. Không tự approve hoặc bypass để merge nhanh.
- Chỉ merge khi đáp ứng tất cả điều kiện bảo vệ nhánh; xóa branch sau merge. Tác giả đồng bộ local main.
- Nếu thay đổi schema/API, báo nhóm trước, cập nhật migration/contract, phối hợp để không làm hỏng module khác.

## Definition of Ready

Issue rõ actor, mục tiêu, requirement ID, acceptance criteria, dependency, người phụ trách và không có blocker chưa giải quyết.

## Definition of Done

Issue đạt AC, FE/BE validation và quyền đúng, test liên quan pass, không secret/log nhạy cảm, tài liệu cập nhật, PR được review và merge. Issue không được đóng chỉ vì code đã push.

## Security and privacy

Repo public. Không commit `.env`, API key, file PDF cá nhân, DB dump, email người học, token hay ảnh có dữ liệu riêng. Nếu lộ secret, revoke/rotate ngay, báo Leader, phối hợp xử lý lịch sử; xóa file đơn thuần không đủ. Không dùng dữ liệu học tập thực trong test public nếu chưa có quyền.

## Review etiquette

Góp ý vào hành vi code, giải thích lý do và đề xuất cách sửa. Phân biệt blocker với suggestion. Người sửa phản hồi, push commit mới, yêu cầu review lại nếu cần. Xung đột nghiệp vụ được giải quyết cùng người phụ trách, không chọn ours/theirs toàn bộ một cách máy móc.
