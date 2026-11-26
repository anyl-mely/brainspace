# Testing & Quality Guide

**Status:** Plan, no tests executed yet. Test IDs trace to requirements in [Functional Specification](../FUNCTIONAL_SPECIFICATION.md). Record actual Pass/Fail/Blocked and evidence in Issue/PR, do not mark pass based on planned code.

## 1. Testing layers

Unit: progress, scoring, due date, topic thresholds, validation. Integration: API + isolated test DB, auth/owner, transactions and unique constraints. Mock AI provider for deterministic tests, separate real-provider evaluation. E2E manual or Playwright: login → upload → tutor → quiz → analytics → flash review; course moderation secondary. Responsive: desktop/mobile, keyboard, loading/error/empty/success. CI once scripts exist: npm ci, lint, typecheck, tests, build; ensure test DB never production. Protect secrets from untrusted PRs, do not run untrusted code with deployment credentials.

## 2. Acceptance test matrix

| ID | Requirement | Scenario | Expected |
|---|---|---|---|
| T01 | AUTH-01 | Register valid email then duplicate | One user, hash only, 409 duplicate |
| T02 | AUTH-02 | Invalid password, login, logout then reuse token | 401, valid session, old session rejected |
| T03 | AUTH-05/06 | Student calls admin endpoint / admin locks user | 403 / locked user denied |
| T04 | PATH-01/03 | CRUD path + items, owner and another user | Correct data, unauthorized 404 |
| T05 | PATH-04/05 | Complete 2/4 items, filter/search no match | 50%, correct filtered/empty list |
| T06 | PATH-02 | AI invalid JSON/timeout | No partial save, retry or manual path |
| T07 | COURSE-02/04 | Create draft, submit, reject, edit, approve | Only approved published; invalid transition denied |
| T08 | COURSE-05/06 | Enroll twice, complete lesson, unrelated lesson | No duplicate; progress correct; invalid denied |
| T09 | LIB-01/06 | PDF text/TXT, scan, >limit, fake MIME | Valid ready; invalid rejected or failed, retry visible |
| T10 | LIB-02/03 | User B tries User A detail/download/delete | 404, private object inaccessible |
| T11 | LIB-04/05 | Search/tags, note CRUD | Correct owner list and detail, empty state |
| T12 | AI-02 | Ask known answer from PDF | Answer cites existing correct chunk/page |
| T13 | AI-02/03 | No answer in source / injected instruction in PDF | Insufficient context; no instruction execution or data leakage |
| T14 | AI-05 | Quota exhausted, timeout | 429 / controlled error, no fabricated message |
| T15 | QUIZ-01/02 | AI invalid options/answer index | Reject draft, no partial records |
| T16 | QUIZ-03/04 | Start attempt, inspect network, submit twice | No correct answers in player; one saved score |
| T17 | QUIZ-04 | Edit/delete quiz after submission | Prior snapshot/results retained |
| T18 | FLASH-01/02 | CRUD, rate GOOD, duplicate key | Due in 3 days, one review |
| T19 | FLASH-03 | Due and future cards from two users | Only current user's due cards |
| T20 | ANA-01/02 | Empty history, 2 samples, 5 samples | Null/insufficient data, correct counts and thresholds |
| T21 | ANA-03 | Low accuracy topic + due cards | Real linked review actions, no invented data |
| T22 | LIB-03 / AI-02 | Delete source document then ask | Retrieval denied, citations marked unavailable, storage cleanup tracked |
| T23 | NFR-01/02 | Mobile, invalid form, network error, loading | Accessible UX, errors clear, no crash |
| T24 | NFR-04/06 | Fresh clone, DB migration/seed, startup | Reproducible per README, API/DB connected |
| T25 | NFR-03/05 | Scan Git diff/log for secrets, inspect storage access | No secrets/private samples, authorized download only |
| T26 | NFR-06 | Public deployment, reload nested route, smoke E2E | Public URL accessible, route works, key journey passes |

## 3. AI evaluation (real provider)

Use a small authorized text PDF and TXT, prepare 10 answerable questions with expected excerpts, 5 unanswerable questions, 3 adversarial/cross-owner cases. Record provider/model, test date, retrieved chunk IDs, answer grounding, citation validity and latency. Initial target proposed: at least 8/10 answerable grounded, 5/5 unanswerable not inventing sources, 0 cross-owner leaks; no critical leakage allowed regardless of score. These are release targets, not measured metrics. Review weak cases and tune chunking/retrieval/context. Record token usage and actual cost if available. Do not commit private prompts or source data.

## 4. Test evidence template

```
Test ID / Requirement:
Environment / commit:
Input / precondition:
Steps:
Expected:
Actual:
Status: PASS | FAIL | BLOCKED | NOT RUN
Evidence (sanitized):
```

## 5. Release gate

All required happy paths and critical authorization/ownership tests pass, no critical/high severity blockers in main demo, AI real-provider path verified, public deployment smoke tested, clean clone guide validated by another team member. Known limitations documented. See [Kickoff Checklist](KICKOFF_CHECKLIST.md) for deliverables.
