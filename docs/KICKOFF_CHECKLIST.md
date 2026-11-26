# Leader Checklist – Kickoff and Release

## Repository foundation

- [x] Repository renamed to brainspace; cloned and remote verified by Leader.
- [x] Old an/hong/quan branches deleted after merge check; previous commits retained.
- [ ] Verify Git email linked to account (prefer noreply for public commits).
- [ ] Both collaborators accept invitation; verify actual access.
- [ ] Description/topics saved; public visibility approved by team.
- [ ] main protection and merge settings saved; first PR independently reviewed.
- [ ] Starter kit imported via chore/project-initialization PR.

Only the first two boxes reflect user-reported terminal/screenshot evidence; settings and invitations remain unverified.

## Kickoff decisions

- [ ] Confirm deadline, capacity, Dev A/B/C names and scope of 7 modules.
- [ ] Review functional spec / business rules and priority; record deviations via PR.
- [ ] Approve ERD, API contract, screen list/wireframes and topic ownership model.
- [ ] Confirm Node/npm versions, DB/storage/AI provider, cost limit, auth cookie approach.
- [ ] Create issues, labels, project board and milestones; assign reviewers.
- [ ] Verify application foundation from a clean clone; pin versions and update README.

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
