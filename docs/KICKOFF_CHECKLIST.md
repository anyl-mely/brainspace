# Leader Checklist – Kickoff and Release

**BrainSpace 1.0** · 25/11/2026–16/12/2026 · 3 developers · Baseline 43 Issues / 184h. See [Project Roadmap](PROJECT_ROADMAP.md). Checked boxes record setup evidence, not completed product features. Update after actual verification.

## Repository foundation

- [x] Repository renamed to brainspace; cloned and remote verified by Leader.
- [x] Old an/hong/quan branches deleted after merge check; previous commits retained.
- [x] Starter kit PR #1 merged into main.
- [x] Main protected; repository configured to allow merge commits (verified metadata).
- [x] 43 Issues #2–#44 created, assigned to three official developers, P0 and six milestones.
- [x] Development Board has 43 Backlog items; WIP 3/3; Team Workload shows 66/55/63h; Release Roadmap markers match deadline (Leader screenshots).
- [x] Estimate, Start date and Target date sync reported successful (Leader terminal).
- [ ] Run final read-only synchronizer check: 43 issues, 0 missing, 129 matching; verify saved shared views.
- [ ] Both collaborators independently verify repository/Project access and ability to edit their tasks.
- [ ] Verify Git identity/email, tool versions and local clone for each member.
- [ ] Confirm public repository visibility, review rules and independent PR review with team.

## Kickoff decisions – Issue #2

- [ ] All three review and confirm seven P0 modules, actor permissions/ownership, out-of-scope and business rules in [Functional Specification](../FUNCTIONAL_SPECIFICATION.md).
- [ ] Confirm dates, available hours, owners and support allocation: A @anyl-mely, B @khongloan9811-arch, C @Quanndhe186402. Review 184h estimate and deadline risk.
- [ ] Review and merge the roadmap update PR; record team agreement and evidence in [#2](https://github.com/anyl-mely/brainspace/issues/2). Close #2 only after all its AC and DoD pass.
- [ ] Reconcile M1 actual progress at kickoff (baseline due 27/11); record blockers/remaining work and any revised dates, without silently changing scope.
- [ ] Review dependencies: #2 first, then #3/#5/#8; #4 after #3. Move only eligible tasks to Ready; keep other tasks in Backlog. Check full dependency list in roadmap.
- [ ] Agree daily sync, independent peer review, WIP limit and PR conventions; no direct push to protected main.

## Foundation execution gates (M1)

- [ ] #3: approve ERD, constraints, delete rules and shared topics; coordinate vector dimension with #8.
- [ ] #4: approve API contract, roles, validation, pagination and error DTO.
- [ ] #5: approve screen list/wireframes, responsive and loading/empty/error states.
- [ ] #8: validate AI provider/model/dimension, quota/cost and retrieval with authorized samples.
- [ ] #6/#7: pin Node/npm, FE/BE scaffold, lockfiles and scripts; agree auth cookie/CORS/CSRF approach.
- [ ] #9: PostgreSQL/Prisma/pgvector migrations/seed, isolated dev/test DB and least privilege.
- [ ] #10: authentication skeleton and guard tests; not a substitute for full auth in #13.
- [ ] #11: CI actual checks pass; then enable required checks according to repository policy.
- [ ] #12: FE/BE deployment smoke, public HTTPS, correct env/CORS; verify foundation from clean clone.
- [ ] M1 exit: all eleven Issues meet AC/DoD before closing milestone; no secrets/private data in public repo.

## Requirement traceability and handover

| Requirement from mock project | Planned evidence |
|---|---|
| Group 2–3, >=2 user types, auth hash | Three contributors, AUTH tests and RBAC |
| CRUD, list/detail, search + filter/sort | PATH/LIB/COURSE, demo and acceptance tests |
| Validation, loading/empty/error/success, responsive | FE/BE validation, NFR tests |
| React Router/state/props/hooks, REST, no hard-code | FE source + real API demo |
| Node REST structure, status codes, error handler, env | Backend source/API tests and templates |
| >=3 business tables, PK/FK, nonredundant + seed | Schema/migrations/ERD; at least paths/items/documents etc. |
| Git/GitHub, contributions, branches, naming | Commits, reviewed PRs, issue history |
| AI bonus | Real tutor/quiz/path generation demo and evaluation |
| Public deployment bonus | Working public URL and smoke test |

- [ ] Source code on GitHub; every member has meaningful contributions.
- [ ] README with tested install, env, database, FE/BE run instructions; clean clone tested.
- [ ] FUNCTIONAL_SPECIFICATION.md and IMPLEMENTATION_GUIDE.md match implementation.
- [ ] Final database schema/ERD and seed data committed.
- [ ] `.env.example` files complete and no secrets; security review.
- [ ] Slide 3–5 pages: team/assignment, product, main features, architecture/tech, demo/results.
- [ ] Demo main functions; each person presents their own work.
- [ ] End-to-end frontend/backend/database and authentication/CRUD functioning.
- [ ] AI feature actually works; public deployment accessible; no serious demo-blocking bug.
- [ ] Release tag and GitHub Release after approval; update README live URL.

The requirements are based on the supplied mock-project brief; this checklist is not a statement that the implementation is already complete.
