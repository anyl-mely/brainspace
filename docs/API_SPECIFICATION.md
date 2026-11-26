# REST API Specification – Draft Contract

Base `/api/v1`; JSON except multipart upload. This is an API design contract, not a running API or OpenAPI file. Confirm request/response schemas before implementation; document actual behavior in Swagger/OpenAPI later.

## 1. Conventions

Protected request: `Authorization: Bearer <access-token>`; refresh via HttpOnly cookie (CSRF/Origin validation where applicable). Public endpoints explicitly marked. All resources scope to authenticated owner/instructor enrollment; Admin scope only for management. Return 404 for private resource not visible to caller, 403 for role denied, 401 for unauthenticated/expired/revoked session. Use 201 for creation, 202 for accepted async processing, 200 for reads/updates, 204 for deletion without body, 400 invalid input, 409 conflict, 429 rate/quota limit, 502/503/504 for provider/service failure, 500 unexpected. Do not return stack trace. No response body on 204.

```json
{
  "success": true,
  "data": { "id": "example-id", "title": "Learn ReactJS" }
}
```

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [{ "field": "title", "message": "Title is required" }],
    "requestId": "example-request-id"
  }
}
```

Lists: `?page=1&limit=20&search=react&sort=createdAt:desc` plus resource-specific filters. Max limit 100. Return `data.items` and `data.pagination` (page, limit, total). Whitelist sort keys, never pass raw query to SQL. ISO 8601 UTC dates. IDs opaque strings. `GET/PATCH/DELETE .../:id` in tables is shorthand for three separate endpoints; create via POST collection. PATCH fields whitelisted.

## 2. Endpoint map

| Method | Route (relative to base) | Scope / function |
|---|---|---|
| GET | /health | Public, service status only |
| POST | /auth/register | Public, STUDENT default |
| POST | /auth/login | Public, access token + refresh cookie |
| POST | /auth/refresh | Valid refresh session |
| POST | /auth/logout | Revoke session, clear cookie |
| GET/PATCH | /users/me | Authenticated, own profile |
| POST | /users/me/change-password | Authenticated, revoke sessions |
| GET | /admin/users | Admin, search/filter |
| PATCH | /admin/users/:id | Admin, role/status allowlist |
| GET | /admin/analytics | Admin, aggregate counts/usage only |
| GET/POST | /learning-paths | Learner, list/create |
| GET/PATCH/DELETE | /learning-paths/:id | Owner |
| POST | /learning-paths/generate | Learner, return draft, no persistence |
| POST | /learning-paths/:id/items | Owner, create topic item |
| PATCH/DELETE | /learning-path-items/:id | Owner, edit/status/delete |
| GET | /courses | Public, published list |
| GET | /courses/:id | Public published metadata; owner/admin draft metadata |
| POST | /courses | Instructor, draft |
| PATCH/DELETE | /courses/:id | Owner instructor, allowed status |
| GET | /instructor/courses | Instructor, owned list |
| POST | /courses/:id/chapters | Owner instructor |
| PATCH/DELETE | /chapters/:id | Owner instructor |
| POST | /chapters/:id/lessons | Owner instructor |
| PATCH/DELETE | /lessons/:id | Owner instructor |
| POST | /courses/:id/submit | Owner instructor, PENDING |
| POST | /courses/:id/reopen-draft | Owner instructor, allowed transition |
| POST | /courses/:id/archive | Owner instructor, no new enrollment |
| GET | /admin/courses | Admin, moderation queue |
| PATCH | /admin/courses/:id/status | Admin, approve/reject with reason |
| POST | /courses/:id/enroll | Learner, published, unique enrollment |
| GET | /enrollments/me | Learner, own courses |
| GET | /lessons/:id | Enrolled learner / owner instructor / Admin trong phạm vi kiểm duyệt |
| PATCH | /lessons/:id/progress | Enrolled learner, completed flag |
| GET | /courses/:id/students/progress | Owner instructor |
| GET/POST | /documents | Learner, list / multipart upload |
| GET/PATCH/DELETE | /documents/:id | Owner, metadata/edit/delete |
| GET | /documents/:id/download | Owner, authorized short-lived URL |
| POST | /documents/:id/retry | Owner, failed processing only |
| GET/POST | /tags | Learner, own tags |
| PATCH/DELETE | /tags/:id | Owner |
| GET/POST | /notes | Learner, own notes |
| GET/PATCH/DELETE | /notes/:id | Owner |
| GET/POST | /conversations | Learner, own chats; READY doc for create |
| GET/PATCH/DELETE | /conversations/:id | Owner |
| GET/POST | /conversations/:id/messages | Owner, history / ask tutor |
| GET/POST | /quizzes | Learner, list/create including confirmed draft |
| POST | /quizzes/generate | Learner, AI draft |
| GET/PATCH/DELETE | /quizzes/:id | Owner, edit detail (not attempt player) |
| POST | /quizzes/:id/attempts | Owner, immutable snapshot |
| GET | /quiz-attempts/:id | Owner, player/result DTO by status |
| POST | /quiz-attempts/:id/submit | Owner, grade exactly once |
| GET | /quiz-attempts | Owner, history |
| GET/POST | /flashcard-decks | Learner, list/create confirmed draft |
| POST | /flashcard-decks/generate | Learner, AI draft |
| GET/PATCH/DELETE | /flashcard-decks/:id | Owner |
| POST | /flashcard-decks/:id/cards | Owner |
| PATCH/DELETE | /flashcards/:id | Owner |
| GET | /flashcards/due | Learner, due cards |
| POST | /flashcards/:id/reviews | Owner, review key + rating |
| GET | /analytics/overview | Learner, own data |
| GET | /analytics/topics | Learner, own topic samples/accuracy |
| GET | /analytics/recommendations | Learner, own next actions |

Learner = Student or Instructor. Frontend route guard does not enforce API permissions. Admin course moderation uses metadata/content in moderation scope, not personal library.

## 3. Key payload examples

`POST /learning-paths/generate`:

```json
{"goal":"Learn ReactJS","level":"BEGINNER","targetDays":30,"minutesPerDay":120}
```

Returns draft title and ordered items (topic label, title, description, estimated minutes). On confirm send validated fields/items to `POST /learning-paths`; server resolves canonical owner topic IDs and persists transactionally. No arbitrary foreign topic IDs.

`POST /documents`: multipart `file` (PDF/TXT), `title`, optional `tagIds` encoded per finalized contract. Returns id, status (PROCESSING or READY), metadata. Poll GET detail while processing; error states FAILED and reason. Never expose private object key or permanent public URL.

`POST /conversations/:id/messages`: `{ "question": "What is useEffect?" }` → answer text, citations array containing valid `chunkId`, `documentId`, page (nullable) and short excerpt. Backend checks citation IDs against retrieved authorized chunks. If source missing, explicitly indicate insufficient context. Quota errors do not fabricate answer.

`POST /quizzes/generate`: `{ "documentId": "doc-id", "count": 5, "difficulty": "BEGINNER" }` → draft questions with options, correct index, explanation, topic; editor can inspect own draft. Attempt endpoint sends **no** correct index or explanation until submission; separate editor vs player DTO.

`POST /quiz-attempts/:id/submit`:

```json
{"answers":[{"questionKey":"q1","selectedIndex":1},{"questionKey":"q2","selectedIndex":0}]}
```

Server validates keys against snapshot, handles unanswered as incorrect, atomically scores once; retry returns saved result without changing score. Submitted response includes correct answers/explanations and summary. Score not accepted from client.

`POST /flashcards/:id/reviews`: `{ "rating":"GOOD", "requestKey":"unique-client-generated-id" }` → review ID, nextDueAt. Reject invalid rating; same key returns prior result; timestamp is server-derived.

`GET /analytics/topics?days=7`: each item topicId, label, correctCount, answeredCount, accuracy (nullable), classification; <5 answers insufficient data. `GET /analytics/recommendations` returns due review and weak topic actions linked to existing resources, not invented IDs.

## 4. Contract review gate

Before coding agree exact DTO fields, enums, auth/cookie approach, pagination and errors, upload limit, schema version, idempotency and nullability. Each PR changing an API updates this document or generated OpenAPI, FE types and tests. Test unauthorized, wrong owner, invalid payload and happy path before merge.
