# Lộ trình dự án — BrainSpace 1.0

**Kế hoạch cơ sở (baseline):** 25/11/2026–16/12/2026 (UTC+7) · Nhóm 3 người · 43 Issue P0 · 184 giờ công ước tính. Ngày 16/12 là ngày bàn giao; khoảng cách hai mốc là 21 ngày, gồm 22 ngày lịch nếu tính cả hai đầu. Mục tiêu sẵn sàng bàn giao ngày 15/12, dành 16/12 cho xác nhận cuối và release. Lịch này thay thế giả định 6 tuần; không thu hẹp phạm vi 1.0. Cả nhóm xác nhận capacity và acceptance tại kickoff.

Nguồn quản lý chính: [GitHub Issues](https://github.com/anyl-mely/brainspace/issues), [Milestones](https://github.com/anyl-mely/brainspace/milestones), [Development Board](https://github.com/users/anyl-mely/projects/1). Đây là baseline kế hoạch tại 27/11/2026, không phải báo cáo tiến độ triển khai. Nếu thay đổi lịch/estimate/owner, cập nhật Project và ghi lý do tại Issue; sửa baseline qua PR nếu cần. Các giờ dưới đây là estimate, không phải giờ thực tế.

## 1. Phân công theo lĩnh vực nghiệp vụ

| Role | GitHub | Domain chính | Issues | Estimate |
|---|---|---|---:|---:|
| Dev A / Leader | @anyl-mely | Auth, RBAC, profile, admin, course, repo governance | 17 | 66h |
| Dev B | @khongloan9811-arch | Library, notes, file processing, RAG/AIService | 12 | 55h |
| Dev C | @Quanndhe186402 | Learning path, quiz, flashcards, analytics | 14 | 63h |
| **Tổng** | | | **43** | **184h** |

Mỗi người thực hiện FE/BE/test/docs cho task được giao. Domain owner review các thay đổi hỗ trợ chéo: C làm enrollment/progress (#18), A làm shared AIService (#26), flashcard generation (#30) và dashboard (#34), B làm spaced repetition (#33). Giữ một assignee chính mỗi Issue; reviewer không đồng nghĩa assignee. Leader điều phối release, cả nhóm review chéo; không xem tự phê duyệt qua tài khoản phụ là review độc lập.

## 2. Các mốc nghiệm thu và khối lượng công việc

Mọi ngày trong bảng là năm 2026. Cột A/B/C là giờ công theo assignee, không phải ngày công.

| Milestone | Khoảng thực hiện và hạn chót (ngày cuối) | Số Issue | A / B / C (h) | Tổng (h) | Điều kiện hoàn tất |
|---|---|---:|---|---:|---|
| M1 - Foundation | 25/11–27/11 | 11 | 10 / 8 / 9 | 27 | Spec/ERD/API baseline; UI map; FE/BE scaffold, DB migration/seed, auth skeleton, RAG spike, CI và deploy smoke. |
| M2 - Core CRUD | 28/11–01/12 | 11 | 27 / 15 / 15 | 57 | Auth end-to-end, profile, admin/RBAC; path, course, enrollment/progress, document và note CRUD; search/filter/sort, phân quyền. |
| M3 - AI | 02/12–05/12 | 7 | 10 / 18 / 12 | 40 | Extract/chunk/embed, owner-scoped retrieval, tutor citations, shared AIService/quota, AI draft path/quiz/flashcards. |
| M4 - Practice | 06/12–09/12 | 6 | 5 / 5 / 19 | 29 | Quiz snapshot và server scoring, history/retry, spaced repetition, due cards, analytics theo topic và đề xuất ôn tập. |
| M5 - Integration | 10/12–12/12 | 4 | 9 / 5 / 5 | 19 | E2E, negative authorization, data integrity, RAG evaluation, UI error states và deployment smoke. |
| M6 - Release | 13/12–16/12 | 4 | 5 / 4 / 3 | 12 | Regression, clean clone, tài liệu, demo/slides, nghiệm thu và tag/release v1.0.0. |
| **Tổng** | **25/11–16/12** | **43** | **66 / 55 / 63** | **184** | Đạt release gate |

Các Milestone là mốc nghiệm thu, không phải ranh giới cấm làm song song. Có thể chuẩn bị trước hoặc phát triển theo mock contract đã duyệt, nhưng không coi dependency đã hoàn thành khi chưa kiểm chứng. Giữ đủ 7 module P0 theo [Functional Specification](../FUNCTIONAL_SPECIFICATION.md), AI thực và public deployment. P1/P2 vẫn theo đặc tả; không đưa yêu cầu ngoài phạm vi vào P0.

## 3. Danh mục Issue và lịch kế hoạch cơ sở

PR [#1](https://github.com/anyl-mely/brainspace/pull/1) đã merge phần starter kit, không tính vào 43 Issue nghiệp vụ. Mã kế hoạch cố định khác với số GitHub Issue; liên kết dưới đây lấy từ metadata thực tế. Chi tiết AC, test references, dependencies và DoD ở từng Issue. Các liên kết dependency dưới đây là tham chiếu trong nội dung Issue, không khẳng định đã cấu hình quan hệ blocked-by native của GitHub.

| Mã kế hoạch / Issue | Tiêu đề Issue trên GitHub | Owner | Giờ | Bắt đầu–Mục tiêu (2026) | Phụ thuộc |
|---|---|:---:|---:|---|---|
| S0-01 / [#2](https://github.com/anyl-mely/brainspace/issues/2) | docs: approve product scope and permissions | A | 1 | 25/11–27/11 | — |
| S0-02 / [#3](https://github.com/anyl-mely/brainspace/issues/3) | docs: finalize database model | C | 2 | 25/11–27/11 | [#2](https://github.com/anyl-mely/brainspace/issues/2) |
| S0-03 / [#4](https://github.com/anyl-mely/brainspace/issues/4) | docs: finalize API contract | B | 2 | 25/11–27/11 | [#2](https://github.com/anyl-mely/brainspace/issues/2), [#3](https://github.com/anyl-mely/brainspace/issues/3) |
| S0-04 / [#5](https://github.com/anyl-mely/brainspace/issues/5) | design: map student/instructor/admin screens | A | 2 | 25/11–27/11 | [#2](https://github.com/anyl-mely/brainspace/issues/2) |
| S0-05 / [#6](https://github.com/anyl-mely/brainspace/issues/6) | chore: scaffold frontend | A | 3 | 26/11–27/11 | [#4](https://github.com/anyl-mely/brainspace/issues/4), [#5](https://github.com/anyl-mely/brainspace/issues/5) |
| S0-06 / [#7](https://github.com/anyl-mely/brainspace/issues/7) | chore: scaffold backend | B | 3 | 26/11–27/11 | [#4](https://github.com/anyl-mely/brainspace/issues/4) |
| S0-08 / [#8](https://github.com/anyl-mely/brainspace/issues/8) | spike: validate RAG provider | B | 3 | 26/11–27/11 | [#2](https://github.com/anyl-mely/brainspace/issues/2) |
| S0-07 / [#9](https://github.com/anyl-mely/brainspace/issues/9) | chore: setup database and seed | C | 4 | 26/11–27/11 | [#3](https://github.com/anyl-mely/brainspace/issues/3), [#7](https://github.com/anyl-mely/brainspace/issues/7), [#8](https://github.com/anyl-mely/brainspace/issues/8) |
| S0-11 / [#10](https://github.com/anyl-mely/brainspace/issues/10) | chore: establish authentication skeleton | A | 2 | 26/11–27/11 | [#7](https://github.com/anyl-mely/brainspace/issues/7), [#9](https://github.com/anyl-mely/brainspace/issues/9) |
| S0-09 / [#11](https://github.com/anyl-mely/brainspace/issues/11) | ci: validate application on PR | A | 2 | 26/11–27/11 | [#6](https://github.com/anyl-mely/brainspace/issues/6), [#7](https://github.com/anyl-mely/brainspace/issues/7) |
| S0-10 / [#12](https://github.com/anyl-mely/brainspace/issues/12) | chore: deploy foundation smoke test | C | 3 | 26/11–27/11 | [#6](https://github.com/anyl-mely/brainspace/issues/6), [#7](https://github.com/anyl-mely/brainspace/issues/7), [#9](https://github.com/anyl-mely/brainspace/issues/9) |
| CORE-01 / [#13](https://github.com/anyl-mely/brainspace/issues/13) | feat: implement registration and session authentication | A | 7 | 28/11–29/11 | [#10](https://github.com/anyl-mely/brainspace/issues/10) |
| CORE-02 / [#14](https://github.com/anyl-mely/brainspace/issues/14) | feat: implement profile and password management | A | 4 | 29/11–30/11 | [#13](https://github.com/anyl-mely/brainspace/issues/13) |
| CORE-03 / [#15](https://github.com/anyl-mely/brainspace/issues/15) | feat: implement admin user management and role guards | A | 5 | 29/11–30/11 | [#13](https://github.com/anyl-mely/brainspace/issues/13) |
| CORE-04 / [#16](https://github.com/anyl-mely/brainspace/issues/16) | feat: implement course catalog and instructor course CRUD | A | 5 | 28/11–30/11 | [#9](https://github.com/anyl-mely/brainspace/issues/9), [#13](https://github.com/anyl-mely/brainspace/issues/13) |
| CORE-05 / [#17](https://github.com/anyl-mely/brainspace/issues/17) | feat: implement chapters lessons and course moderation | A | 6 | 29/11–01/12 | [#15](https://github.com/anyl-mely/brainspace/issues/15), [#16](https://github.com/anyl-mely/brainspace/issues/16) |
| CORE-06 / [#18](https://github.com/anyl-mely/brainspace/issues/18) | feat: implement enrollment and course learning progress | C | 5 | 30/11–01/12 | [#16](https://github.com/anyl-mely/brainspace/issues/16), [#17](https://github.com/anyl-mely/brainspace/issues/17) |
| CORE-07 / [#19](https://github.com/anyl-mely/brainspace/issues/19) | feat: implement learning path CRUD and search | C | 5 | 28/11–29/11 | [#9](https://github.com/anyl-mely/brainspace/issues/9), [#13](https://github.com/anyl-mely/brainspace/issues/13) |
| CORE-08 / [#20](https://github.com/anyl-mely/brainspace/issues/20) | feat: implement path items topics and progress | C | 5 | 29/11–30/11 | [#19](https://github.com/anyl-mely/brainspace/issues/19) |
| CORE-09 / [#21](https://github.com/anyl-mely/brainspace/issues/21) | feat: implement private document upload | B | 5 | 28/11–29/11 | [#9](https://github.com/anyl-mely/brainspace/issues/9), [#13](https://github.com/anyl-mely/brainspace/issues/13) |
| CORE-10 / [#22](https://github.com/anyl-mely/brainspace/issues/22) | feat: implement document management tags and search | B | 6 | 29/11–01/12 | [#21](https://github.com/anyl-mely/brainspace/issues/21) |
| CORE-11 / [#23](https://github.com/anyl-mely/brainspace/issues/23) | feat: implement smart notes CRUD | B | 4 | 29/11–01/12 | [#21](https://github.com/anyl-mely/brainspace/issues/21) |
| AI-01 / [#24](https://github.com/anyl-mely/brainspace/issues/24) | feat: implement document extraction and processing lifecycle | B | 5 | 02/12–03/12 | [#21](https://github.com/anyl-mely/brainspace/issues/21), [#22](https://github.com/anyl-mely/brainspace/issues/22), [#8](https://github.com/anyl-mely/brainspace/issues/8) |
| AI-02 / [#25](https://github.com/anyl-mely/brainspace/issues/25) | feat: implement embeddings and owner-scoped vector retrieval | B | 6 | 02/12–04/12 | [#24](https://github.com/anyl-mely/brainspace/issues/24), [#9](https://github.com/anyl-mely/brainspace/issues/9), [#8](https://github.com/anyl-mely/brainspace/issues/8) |
| AI-03 / [#26](https://github.com/anyl-mely/brainspace/issues/26) | feat: implement shared AI service quota and structured outputs | A | 5 | 02/12–03/12 | [#8](https://github.com/anyl-mely/brainspace/issues/8), [#13](https://github.com/anyl-mely/brainspace/issues/13) |
| AI-04 / [#27](https://github.com/anyl-mely/brainspace/issues/27) | feat: implement grounded AI tutor conversations | B | 7 | 03/12–05/12 | [#25](https://github.com/anyl-mely/brainspace/issues/25), [#26](https://github.com/anyl-mely/brainspace/issues/26) |
| AI-05 / [#28](https://github.com/anyl-mely/brainspace/issues/28) | feat: generate editable AI learning path drafts | C | 5 | 02/12–04/12 | [#20](https://github.com/anyl-mely/brainspace/issues/20), [#26](https://github.com/anyl-mely/brainspace/issues/26) |
| AI-06 / [#29](https://github.com/anyl-mely/brainspace/issues/29) | feat: implement manual quizzes and AI quiz generation | C | 7 | 03/12–05/12 | [#20](https://github.com/anyl-mely/brainspace/issues/20), [#25](https://github.com/anyl-mely/brainspace/issues/25), [#26](https://github.com/anyl-mely/brainspace/issues/26) |
| AI-07 / [#30](https://github.com/anyl-mely/brainspace/issues/30) | feat: implement flashcard decks and AI card generation | A | 5 | 03/12–05/12 | [#20](https://github.com/anyl-mely/brainspace/issues/20), [#25](https://github.com/anyl-mely/brainspace/issues/25), [#26](https://github.com/anyl-mely/brainspace/issues/26) |
| PRAC-01 / [#31](https://github.com/anyl-mely/brainspace/issues/31) | feat: implement quiz attempts and server-side scoring | C | 7 | 06/12–07/12 | [#29](https://github.com/anyl-mely/brainspace/issues/29) |
| PRAC-02 / [#32](https://github.com/anyl-mely/brainspace/issues/32) | feat: implement quiz results history and retry | C | 4 | 07/12–08/12 | [#31](https://github.com/anyl-mely/brainspace/issues/31) |
| PRAC-03 / [#33](https://github.com/anyl-mely/brainspace/issues/33) | feat: implement spaced repetition reviews and due cards | B | 5 | 06/12–08/12 | [#30](https://github.com/anyl-mely/brainspace/issues/30) |
| PRAC-04 / [#34](https://github.com/anyl-mely/brainspace/issues/34) | feat: implement learning dashboard and activity filters | A | 5 | 06/12–09/12 | [#18](https://github.com/anyl-mely/brainspace/issues/18), [#20](https://github.com/anyl-mely/brainspace/issues/20), [#31](https://github.com/anyl-mely/brainspace/issues/31), [#33](https://github.com/anyl-mely/brainspace/issues/33) |
| PRAC-05 / [#35](https://github.com/anyl-mely/brainspace/issues/35) | feat: implement topic-level learning analytics | C | 4 | 07/12–08/12 | [#31](https://github.com/anyl-mely/brainspace/issues/31), [#20](https://github.com/anyl-mely/brainspace/issues/20) |
| PRAC-06 / [#36](https://github.com/anyl-mely/brainspace/issues/36) | feat: recommend personalized review activities | C | 4 | 08/12–09/12 | [#32](https://github.com/anyl-mely/brainspace/issues/32), [#33](https://github.com/anyl-mely/brainspace/issues/33), [#35](https://github.com/anyl-mely/brainspace/issues/35) |
| INT-01 / [#37](https://github.com/anyl-mely/brainspace/issues/37) | test: verify end-to-end learning and course journeys | C | 5 | 10/12–11/12 | [#17](https://github.com/anyl-mely/brainspace/issues/17), [#18](https://github.com/anyl-mely/brainspace/issues/18), [#23](https://github.com/anyl-mely/brainspace/issues/23), [#27](https://github.com/anyl-mely/brainspace/issues/27), [#28](https://github.com/anyl-mely/brainspace/issues/28), [#29](https://github.com/anyl-mely/brainspace/issues/29), [#30](https://github.com/anyl-mely/brainspace/issues/30), [#32](https://github.com/anyl-mely/brainspace/issues/32), [#33](https://github.com/anyl-mely/brainspace/issues/33), [#34](https://github.com/anyl-mely/brainspace/issues/34), [#35](https://github.com/anyl-mely/brainspace/issues/35), [#36](https://github.com/anyl-mely/brainspace/issues/36) |
| INT-02 / [#38](https://github.com/anyl-mely/brainspace/issues/38) | test: verify authorization data integrity and security | A | 5 | 10/12–11/12 | [#15](https://github.com/anyl-mely/brainspace/issues/15), [#22](https://github.com/anyl-mely/brainspace/issues/22), [#27](https://github.com/anyl-mely/brainspace/issues/27), [#31](https://github.com/anyl-mely/brainspace/issues/31), [#33](https://github.com/anyl-mely/brainspace/issues/33) |
| INT-03 / [#39](https://github.com/anyl-mely/brainspace/issues/39) | test: evaluate RAG grounding and provider reliability | B | 5 | 10/12–11/12 | [#27](https://github.com/anyl-mely/brainspace/issues/27), [#28](https://github.com/anyl-mely/brainspace/issues/28), [#29](https://github.com/anyl-mely/brainspace/issues/29), [#30](https://github.com/anyl-mely/brainspace/issues/30) |
| INT-04 / [#40](https://github.com/anyl-mely/brainspace/issues/40) | chore: integrate production deployment and smoke checks | A | 4 | 11/12–12/12 | [#37](https://github.com/anyl-mely/brainspace/issues/37), [#38](https://github.com/anyl-mely/brainspace/issues/38), [#39](https://github.com/anyl-mely/brainspace/issues/39), [#12](https://github.com/anyl-mely/brainspace/issues/12) |
| REL-01 / [#41](https://github.com/anyl-mely/brainspace/issues/41) | test: complete regression and resolve release blockers | B | 4 | 13/12–14/12 | [#40](https://github.com/anyl-mely/brainspace/issues/40) |
| REL-02 / [#42](https://github.com/anyl-mely/brainspace/issues/42) | docs: verify clean clone and finalize documentation | A | 3 | 13/12–15/12 | [#40](https://github.com/anyl-mely/brainspace/issues/40) |
| REL-03 / [#43](https://github.com/anyl-mely/brainspace/issues/43) | docs: prepare demo data presentation and walkthrough | C | 3 | 13/12–15/12 | [#40](https://github.com/anyl-mely/brainspace/issues/40) |
| REL-04 / [#44](https://github.com/anyl-mely/brainspace/issues/44) | chore: publish BrainSpace v1.0.0 release | A | 2 | 15/12–16/12 | [#41](https://github.com/anyl-mely/brainspace/issues/41), [#42](https://github.com/anyl-mely/brainspace/issues/42), [#43](https://github.com/anyl-mely/brainspace/issues/43) |

## 4. Kickoff và thứ tự Foundation

- Bắt đầu bằng [#2](https://github.com/anyl-mely/brainspace/issues/2) (S0-01): xác nhận scope, permissions, deadline, owner và capacity; review/merge PR cập nhật roadmap. Cả nhóm tham gia, A chịu trách nhiệm chính.
- Sau khi #2 đạt điều kiện: #3 (ERD, C), #5 (UI map, A) và #8 (RAG spike, B) có thể tiến hành song song. #4 (API contract, B) cần #2 và #3; ghi rõ vector dimension chờ kết quả #8 nếu chưa chốt.
- #6 (FE) cần #4/#5; #7 (BE) cần #4; #9 (DB) cần #3/#7/#8; #10 (auth skeleton) cần #7/#9; #11 (CI) cần #6/#7; #12 (deploy smoke) cần #6/#7/#9. Đối chiếu toàn bộ AC: ví dụ FE/DB tích hợp thực tế sau khi BE sẵn sàng, không đóng task chỉ vì scaffold riêng đã chạy.
- 27/11 là deadline baseline M1. Các Issue còn mở tại lúc lập tài liệu không chứng minh chưa làm gì, cũng không chứng minh đã hoàn thành. Review evidence ngay tại kickoff; ghi blocker/remaining estimate, thống nhất hỗ trợ chéo và điều chỉnh ngày ở Project nếu cần. Không backdate kết quả hoặc đánh dấu Done khi chưa đạt AC.
- Chốt Node/npm, PostgreSQL/Prisma/pgvector, storage, AI provider/model/dimension, quota và budget, cookie/CORS/CSRF theo [Implementation Guide](../IMPLEMENTATION_GUIDE.md) và kết quả spike. Không tự nhận các lựa chọn chưa kiểm chứng là quyết định cuối cùng.

## 5. Quản lý Issue và tiến độ

- Labels: `feature`, `bug`, `documentation`, `setup`, `testing`; `priority:P0/P1/P2`; `module:auth/path/course/library/ai/quiz/flashcard/analytics` (tên module/priority là từng label riêng). Issue có nhiều module khi cần.
- Board: Backlog → Ready → In Progress → In Review → Done. Ready khi requirement/assignee/dependency rõ và điều kiện bắt đầu đã đáp ứng. Giữ WIP khoảng một task chính/người; board limit 3 In Progress và 3 In Review. Thay đổi Ready/In Progress/In Review do nhóm chủ động.
- Team Workload: group Assignees, sum Estimate, open non-Done. Release Roadmap: group Milestone, Start date/Target date, milestone markers. Estimate/Target date là Issue Fields; Start date là Project Field. Workflow tự thêm issue mới và đưa vào Backlog; đóng issue chuyển Done, reopen về Backlog. Không đóng issue để làm đẹp thống kê; kiểm tra các trường hợp canceled/not planned.
- GitHub Flow: branch từ main theo `feature/<issue>-<slug>`, `docs/<issue>-<slug>`, `fix/<issue>-<slug>` hoặc loại phù hợp. PR vào main, review độc lập tối thiểu một người theo quy tắc nhóm; kiểm thử và merge theo protection. Không tự approve để thay thế review. Dùng `Refs #n` cho PR một phần, chỉ dùng `Closes #n` khi toàn bộ AC của Issue đạt.
- Definition of Done: AC đạt, test evidence thật (PASS/FAIL/BLOCKED/NOT RUN), cập nhật docs khi cần, PR review/merge nếu thay đổi code/docs, xác nhận tích hợp. Với issue không thay đổi repository, lưu bằng chứng nghiệm thu và đóng thủ công. Không đánh đồng PR merge với milestone hoàn thành.
- Daily sync ngắn: đã làm, sẽ làm, blocker, dependency và remaining estimate. Kiểm tra workload/deadline từng ngày, ưu tiên đường găng, pair review và phân bổ hỗ trợ chéo khi cần. Phát sinh bug tạo Issue riêng, link nguồn và milestone thích hợp.

## 6. Rủi ro và điều kiện kiểm soát phạm vi

| Rủi ro | Cách xử lý |
|---|---|
| Hạn chót / phân bổ công sức chưa đều | M1 due 27/11; A có 27h M2, C có 19h M4; kiểm tra capacity thật, cập nhật remaining estimate, phối hợp hỗ trợ chéo và báo sớm blocker. 184h chưa phải cam kết chắc chắn. |
| Contract không khớp | Contract first, mock DTO được review, shared topic IDs, migration được review; không reset shared DB. |
| Hạn mức / chi phí provider | Spike sớm; quota/capped context, timeout, fallback; giữ key ở server. |
| AI tạo thông tin không có căn cứ | Grounded citations, no fabricated sources; evaluation theo Testing Guide. |
| Lộ dữ liệu riêng tư | RBAC + owner-scoped query, private storage, negative tests; không commit secret/dữ liệu cá nhân. |
| Triển khai môi trường chậm | Smoke từ M1, production integration M5, clean clone M6; HTTPS, backup, env theo host. |
| Phát sinh ngoài phạm vi | Freeze P0 đã thống nhất; giữ P1/P2 đúng đặc tả, không tự cắt yêu cầu P0. |

## 7. Điều kiện phát hành và demo

Theo [Functional Specification](../FUNCTIONAL_SPECIFICATION.md), [Testing Guide](TESTING_GUIDE.md) và [Kickoff Checklist](KICKOFF_CHECKLIST.md): đủ 7 module P0; test bắt buộc và kiểm tra authorization/ownership đạt, không còn blocker nghiêm trọng; RAG thực với citations, quota và lỗi đúng; public deployment hoạt động; clean clone/README được thành viên khác kiểm tra; tài liệu, ERD, env templates, demo và slide hoàn chỉnh. Ghi actual evidence, không công bố số đo chưa thực hiện. [#44](https://github.com/anyl-mely/brainspace/issues/44) chỉ phát hành v1.0.0 sau khi cả nhóm nghiệm thu.

Demo: người học ReactJS đăng ký → tạo path → upload PDF hợp lệ → hỏi AI có nguồn → tạo quiz → trả lời sai → dashboard đề xuất topic ôn → review flashcards; luồng phụ Instructor tạo khóa học và Admin kiểm duyệt, enrollment/progress. Cả ba trình bày phần của mình. Thu phản hồi 5–10 người nếu có; số liệu CV chỉ dùng kết quả đo thật.
