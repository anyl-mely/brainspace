# Checklist dành cho Leader — Khởi động và bàn giao

**BrainSpace 1.0** · 25/11/2026–16/12/2026 · 3 thành viên · Kế hoạch gốc: 43 Issue / 184h. Xem [Lộ trình dự án](PROJECT_ROADMAP.md). Các ô đã đánh dấu ghi nhận bằng chứng thiết lập; tiến độ hoàn thành tính năng được kiểm chứng riêng. Cập nhật checklist sau khi đối chiếu kết quả thực tế.

## 1. Nền tảng repository

- [x] Đổi tên repository thành brainspace; Leader đã clone và kiểm tra remote.
- [x] Xóa các nhánh cũ an/hong/quan sau khi kiểm tra đã merge; giữ lại lịch sử commit.
- [x] PR #1 bổ sung bộ tài liệu và cấu hình khởi tạo đã được merge vào main.
- [x] Main được bảo vệ; repository được cấu hình cho phép merge commit (đã đối chiếu metadata).
- [x] Tạo 43 Issue #2–#44, phân công cho ba thành viên chính thức, gắn P0 và sáu Milestone.
- [x] Đã kiểm tra cấu hình tại thời điểm thiết lập: Development Board có 43 mục ở Backlog, WIP 3/3; Team Workload hiển thị 66/55/63h; các mốc Release Roadmap khớp hạn bàn giao (theo ảnh Leader cung cấp). Xem Project để biết tiến độ hiện tại.
- [x] Đã ghi nhận kết quả đồng bộ Estimate, Start date và Target date thành công (theo Terminal của Leader).
- [ ] Chạy bước kiểm tra đồng bộ cuối ở chế độ chỉ đọc: 43 Issue, 0 giá trị thiếu, 129 giá trị khớp; kiểm tra các view dùng chung đã được lưu.
- [ ] Hai thành viên tự kiểm tra quyền truy cập repository/Project và khả năng chỉnh sửa công việc được giao.
- [ ] Kiểm tra Git identity/email, phiên bản công cụ và bản clone trên máy từng thành viên.
- [ ] Cả nhóm xác nhận repository công khai, quy tắc review và việc review PR độc lập.

## 2. Quyết định tại buổi khởi động — Issue #2

> **Đối chiếu ngày 28/11/2026:** [Issue #2](https://github.com/anyl-mely/brainspace/issues/2) đã được đánh dấu 3/3 Acceptance Criteria (AC); các mục Definition of Done (DoD) còn chưa đánh dấu và Issue vẫn mở. Các ô dưới đây được giữ nguyên để nhóm đối chiếu bằng chứng và cập nhật checklist; việc dịch tài liệu không tự xác nhận hoàn tất các bước này.

- [ ] Cả ba thành viên review và xác nhận bảy module P0, quyền của các actor/ownership, phần ngoài phạm vi và quy tắc nghiệp vụ trong [Đặc tả chức năng](../FUNCTIONAL_SPECIFICATION.md).
- [ ] Xác nhận lịch, thời gian có thể làm việc, người phụ trách và phân bổ hỗ trợ: A @anyl-mely, B @khongloan9811-arch, C @Quanndhe186402. Review estimate 184h và rủi ro thời hạn.
- [ ] Đối chiếu [PR #45 cập nhật roadmap đã merge](https://github.com/anyl-mely/brainspace/pull/45), ghi nhận đồng thuận của nhóm và bằng chứng vào [#2](https://github.com/anyl-mely/brainspace/issues/2). Chỉ đóng #2 khi toàn bộ AC và DoD đạt yêu cầu.
- [ ] Đối chiếu tiến độ M1 thực tế tại buổi khởi động (hạn theo kế hoạch gốc: 27/11); ghi blocker, phần việc còn lại và các ngày được điều chỉnh nếu có; không tự ý thay đổi phạm vi.
- [ ] Review Dependencies: #2 trước, sau đó #3/#5/#8; #4 sau #3. Chuyển những công việc đủ điều kiện sang Ready; giữ các công việc còn lại ở Backlog. Đối chiếu danh sách Dependencies đầy đủ trong roadmap.
- [ ] Thống nhất trao đổi tiến độ hằng ngày, review độc lập, giới hạn WIP và quy ước PR; không push trực tiếp vào main đang được bảo vệ.

## 3. Điều kiện triển khai và nghiệm thu nền tảng — M1

- [ ] #3: duyệt ERD, constraints, quy tắc xóa và topic dùng chung; phối hợp vector dimension với #8.
- [ ] #4: duyệt hợp đồng API, role, validation, phân trang và DTO lỗi.
- [ ] #5: duyệt danh sách màn hình/wireframe, responsive và các trạng thái loading/empty/error.
- [ ] #8: kiểm chứng AI provider/model/dimension, quota/chi phí và retrieval bằng dữ liệu mẫu được phép sử dụng.
- [ ] #6/#7: chốt phiên bản Node/npm, bộ khung Frontend/Backend, lockfile và script; thống nhất cách xử lý auth cookie/CORS/CSRF.
- [ ] #9: có migration/seed cho PostgreSQL/Prisma/pgvector, DB dev/test tách biệt và quyền truy cập tối thiểu cần thiết.
- [ ] #10: có khung Authentication và kiểm thử guard; phần xác thực đầy đủ được triển khai ở #13.
- [ ] #11: các bước kiểm tra CI thực tế đạt yêu cầu; sau đó bật required checks theo quy tắc repository.
- [ ] #12: kiểm thử nhanh deployment Frontend/Backend, HTTPS công khai, env/CORS đúng; kiểm chứng nền tảng từ một bản clone sạch.
- [ ] Hoàn tất M1: cả mười một Issue đạt AC/DoD trước khi đóng Milestone; repository công khai không chứa secret hoặc dữ liệu riêng tư.

## 4. Đối chiếu yêu cầu và bàn giao

| Yêu cầu từ đề bài mock project | Bằng chứng dự kiến |
| --- | --- |
| Nhóm 2–3 người, >=2 loại người dùng, mật khẩu được hash | Đóng góp của ba thành viên, kiểm thử AUTH và RBAC |
| CRUD, danh sách/chi tiết, tìm kiếm + lọc/sắp xếp | PATH/LIB/COURSE, demo và kiểm thử nghiệm thu |
| Validation, loading/empty/error/success, responsive | Validation Frontend/Backend, kiểm thử NFR |
| React Router/state/props/hooks, REST, không hard-code dữ liệu nghiệp vụ | Mã nguồn Frontend và demo với API thật |
| Cấu trúc Node REST, HTTP status, xử lý lỗi, env | Mã nguồn Backend, kiểm thử API và các file mẫu |
| >=3 bảng nghiệp vụ, PK/FK, tránh dư thừa dữ liệu và có seed | Schema/migration/ERD; tối thiểu có path/item/document và các bảng liên quan |
| Git/GitHub, đóng góp, nhánh và quy tắc đặt tên | Commit, PR đã được review, lịch sử Issue |
| Điểm cộng cho AI | Demo và đánh giá Tutor/Quiz/Path dùng AI thật |
| Điểm cộng cho triển khai công khai | URL công khai hoạt động và kiểm thử nhanh deployment |

- [ ] Mã nguồn có trên GitHub; mỗi thành viên có đóng góp thực chất.
- [ ] README có hướng dẫn cài đặt, env, database và chạy Frontend/Backend đã kiểm chứng; đã thử từ bản clone sạch.
- [ ] FUNCTIONAL_SPECIFICATION.md và IMPLEMENTATION_GUIDE.md khớp với phần triển khai.
- [ ] Schema/ERD cuối cùng và dữ liệu seed đã được commit.
- [ ] Các file `.env.example` đầy đủ, không chứa secret; đã review bảo mật.
- [ ] Slide 3–5 trang: nhóm/phân công, sản phẩm, tính năng chính, kiến trúc/công nghệ, demo/kết quả.
- [ ] Demo các chức năng chính; mỗi thành viên trình bày phần mình thực hiện.
- [ ] Frontend/Backend/Database kết nối xuyên suốt; Authentication và CRUD hoạt động.
- [ ] Tính năng AI hoạt động thực tế; deployment công khai truy cập được; không còn lỗi nghiêm trọng chặn demo.
- [ ] Tạo tag và GitHub Release sau khi được duyệt; cập nhật URL bản triển khai vào README.

Các yêu cầu được đối chiếu từ đề bài mock project đã cung cấp. Checklist này hướng dẫn kiểm chứng đầu ra và chỉ ghi nhận hoàn tất khi có bằng chứng thực tế.
