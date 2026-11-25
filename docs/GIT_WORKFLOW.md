# Git & GitHub Workflow

**Policy:** GitHub Flow + merge commit + tối thiểu 1 approval độc lập. Repo: `https://github.com/anyl-mely/brainspace`.

## 1. Leader setup (kiểm tra trên GitHub)

- Settings → Collaborators: 2 thành viên accept invitation; xác nhận họ có write access. Public chỉ cho phép đọc nếu chưa có quyền.
- Settings → Branches: classic rule `main` (hoặc ruleset tương đương, không cần chồng cả hai). Require PR, 1 approval, dismiss stale approvals, conversation resolution, áp dụng cả admin/no bypass. Không allow force pushes/deletions. Tắt linear history để dùng merge commit. Chỉ bật required status checks sau khi CI chạy thành công và chọn đúng check.
- Settings → General → Pull Requests: Allow merge commits; tắt squash/rebase theo quy ước nhóm; tự xóa head branches; auto-merge tắt ban đầu.
- Settings → About: description/topics; website để trống tới khi deploy.
- Thiết lập trên web không được thực hiện bởi các file này. Kiểm tra bằng PR thử, không cố push thử vào main.

## 2. Setup máy thành viên

```bash
git --version
git config --local user.name "YOUR_NAME"
git config --local user.email "YOUR_VERIFIED_EMAIL_OR_NOREPLY"
git remote -v
git status
```

Chạy config local trong repo đã clone; dùng email xác minh trên GitHub hoặc noreply để không lộ email cá nhân. HTTPS dùng Git Credential Manager/browser sign-in; không lưu password/token trong remote URL. Nếu đã có clone tên cũ: `git remote set-url origin https://github.com/anyl-mely/brainspace.git`.

## 3. Một task từ đầu đến cuối

Ví dụ Issue #12. Bắt đầu khi working tree sạch; nếu đang có việc dở, commit vào đúng nhánh hoặc stash rồi mới chuyển.

```bash
git fetch origin --prune
git switch main
git pull --ff-only origin main
git switch -c feature/12-user-registration
```

Viết code, test, kiểm tra:

```bash
git status
git diff
# Stage tung file da kiem tra (duong dan vi du)
git add backend/src/modules/auth/auth.service.ts
git diff --cached
git commit -m "feat(auth): implement user registration"
git push -u origin feature/12-user-registration
```

Mở PR base `main`, compare nhánh task. Mô tả thay đổi, AC, test thực tế, ảnh UI nếu có; `Closes #12`; request review. Nếu CI chưa có, ghi rõ kiểm thử thủ công. Sửa theo feedback bằng commit mới rồi `git push`. Tác giả không tự approve. Reviewer kiểm tra security, contract, migration, test; approve khi đủ điều kiện. Leader hoặc người được giao merge dùng Create a merge commit.

## 4. Cập nhật task khi main thay đổi

```bash
git status
git fetch origin
git merge origin/main
```

Thực hiện trên feature branch sạch. Nếu conflict: `git status`, mở từng file có marker `<<<<<<<`, `=======`, `>>>>>>>`, thống nhất nội dung với owner, sửa và test, `git add <file>` (thay bằng đường dẫn thật), `git commit` để kết thúc merge, `git push`. Nếu cần hủy khi đang merge: `git merge --abort`. Không force push lên nhánh chung. Review cũ có thể bị dismiss, request review lại.

## 5. Sau merge

```bash
git switch main
git pull --ff-only origin main
git fetch origin --prune
git branch -d feature/12-user-registration
```

Chỉ dùng `-d` sau khi kiểm tra đã merge; nếu Git từ chối, kiểm tra lịch sử trước, không chuyển sang `-D` tùy tiện. Remote branch đã được auto-delete nếu cấu hình. `origin/HEAD` không phải feature branch.

## 6. Xử lý tình huống thường gặp

| Tình huống | Cách xử lý |
|---|---|
| Working tree có thay đổi | `git status`, commit vào đúng branch hoặc `git stash push -u -m "wip"`; khôi phục trên đúng branch bằng `git stash apply` rồi drop sau khi xác nhận. Stash không phải backup remote. |
| Stage nhầm | `git restore --staged path/to/file` (giữ nội dung working tree). |
| Muốn bỏ thay đổi chưa commit | Xem `git diff` trước; `git restore path/to/file` làm mất thay đổi tracked chưa stage, chỉ dùng khi chắc chắn. |
| Commit nhầm message chưa push | `git commit --amend` chỉ với commit cá nhân chưa chia sẻ. |
| Commit lỗi đã merge | Tạo branch fix từ main, `git revert <commit>` rồi PR; nếu revert merge commit cần xác định parent đúng với Leader (`-m 1` thường là main nhưng phải kiểm tra). |
| Non-fast-forward / main diverged | Dừng, fetch, xem `git log --graph --oneline --all`; trao đổi Leader, không reset/force push. |
| 403 khi push | Kiểm tra invitation, tài khoản đang đăng nhập, remote và quyền; nếu push main bị chặn thì chuyển sang PR. |
| Log hiện dấu `:` | Nhấn `q` hoặc dùng `git --no-pager log --oneline`. |
| Secret lộ | Revoke/rotate ngay; báo Leader, kiểm tra logs, phối hợp cleanup lịch sử và bản sao. |

## 7. Release

Chỉ tạo tag sau khi main đã pass release checklist, ví dụ `git tag -a v1.0.0 -m "BrainSpace 1.0"` rồi `git push origin v1.0.0`. Tạo GitHub Release, ghi chức năng đã làm và giới hạn đã biết. Không tag starter kit là v1.0 sản phẩm.

## References

- [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow)
- [Protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Git documentation](https://git-scm.com/docs)
