# Project Roadmap – BrainSpace 1.0

**Draft** · Nhóm 3 người · Giả định 6 tuần, chưa biết deadline và năng lực thực tế. Leader cùng cả nhóm xác nhận trước Sprint 1. GitHub Issues/Projects là nguồn trạng thái công việc, bảng này chỉ là baseline.

## 1. Ownership by domain

| Role trong nhóm | Domain chính | Dependency |
|---|---|---|
| Dev A / Leader | Auth, RBAC, course tối giản, admin, repo governance | DB conventions, role contract |
| Dev B | Library, notes, file processing, RAG/AIService | Auth/owner contract, storage/embedding |
| Dev C | Learning path, quiz, flashcard, analytics | Topic IDs, AIService, document retrieval |

Mỗi người thực hiện FE/BE/test/docs của domain. Cả nhóm review chéo, hỗ trợ Dev B khi thử RAG và Dev C khi số nghiệp vụ nhiều. Không coi Leader là người duy nhất được merge nếu PR đáp ứng rule; thống nhất người chịu trách nhiệm release.

## 2. Milestones

| Tuần | Milestone | Exit criteria |
|---|---|---|
| 1 | Foundation | Repo settings, spec/ERD/API baseline, UI map, app scaffold, auth skeleton, AI spike, deploy smoke |
| 2 | Core CRUD | Auth end-to-end, path/document/course CRUD, list/detail/search/filter, sample data |
| 3 | AI | Extract + embeddings + retrieval owner-scoped, tutor with citations, AI path/quiz draft |
| 4 | Practice | Quiz scoring, flashcard review, dashboard/weak topic recommendation |
| 5 | Integration | End-to-end, negative auth tests, error states, deployment + smoke test |
| 6 | Release | Bug fixes, clean clone verification, docs, slides, demo and tag after approval |

Nếu chỉ 3–4 tuần: giữ CRUD document/path, auth, RAG một tài liệu, quiz/flashcard bản nhỏ, dashboard tối giản; course chỉ catalog/free enrollment/lesson cơ bản, hoãn các nhánh chức năng phụ bằng PR cập nhật scope. Không bỏ auth, validation, phân quyền, AI hoạt động và deployment để lấy thêm tính năng.

## 3. Sprint 0 – Issue seeds (tạo thủ công trên GitHub)

| Issue title | Owner dự kiến | Acceptance / dependency |
|---|---|---|
| chore: initialize repository | Leader | Starter kit PR được approve, main protected |
| docs: approve product scope and permissions | All | 7 module và out-of-scope được xác nhận |
| docs: finalize database model | All | PK/FK/unique, delete policy, topics, review |
| docs: finalize API contract | All | route/status/auth/payload thống nhất |
| design: map student/instructor/admin screens | All | wireframe list/detail/loading/error |
| chore: scaffold frontend | Dev A | dev/build/lint scripts, API health connect |
| chore: scaffold backend | Dev B | health, env validation, error middleware |
| chore: setup database and seed | Dev C | migration + sample records; test clone |
| spike: validate RAG provider | Dev B | one PDF, embeddings, source retrieval, cost/limits |
| ci: validate application on PR | Leader + All | actual lint/typecheck/test/build checks pass |
| chore: deploy foundation smoke test | All | public health + frontend route |

## 4. Issue management

Labels đề xuất: `feature`, `bug`, `documentation`, `setup`, `testing`, `priority:P0`, `priority:P1`, `priority:P2`, `module:auth`, `module:path`, `module:course`, `module:library`, `module:ai`, `module:quiz`, `module:flashcard`, `module:analytics`. Board: Backlog → Ready → In Progress → In Review → Done. Một Issue có assignee, AC, dependency, milestone; giữ WIP khoảng 1 task chính/người. PR link Issue. Done = đã merge + AC đạt; không báo hoàn thành chỉ vì push.

## 5. Risks and scope gates

| Risk | Mitigation |
|---|---|
| Scope creep | Freeze P0; hoãn Knowledge Graph/community/payment |
| Provider quota/cost | Spike sớm, quota, capped context, AI failure fallback |
| AI hallucination | Grounded citations, evaluation, no fabricated sources |
| Private data exposure | owner-scoped query, private storage, negative test |
| Schema/API mismatch | Contract first, reviewed migrations, shared IDs |
| Deadline / unequal load | Weekly review, pair on blockers, scope cuts documented |
| Deployment late | Deploy smoke từ tuần 1–2, test clean clone |

## 6. Release demo

Một người học ReactJS: register → tạo path → upload PDF hợp lệ → hỏi AI có nguồn → tạo quiz → trả lời sai → dashboard đề xuất topic ôn → review flashcards. Instructor tạo khóa học và Admin kiểm duyệt ở luồng phụ. Cả ba trình bày phần code của mình. Thu thập phản hồi 5–10 người nếu có; số liệu CV chỉ dùng kết quả đo thật.
