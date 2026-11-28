# BrainSpace

**Learn Smarter. Think Deeper.**

BrainSpace is an AI-powered personal learning workspace designed to turn learning materials into understanding, practice, review and actionable learning insights.

> Status: Planning / project foundation. This repository is not yet a runnable application. The features and stack below describe the proposed BrainSpace 1.0 scope, not implemented capabilities.

## Why BrainSpace?

Learners often collect scattered resources, struggle with difficult concepts, forget what they have studied and lack feedback on what to review next. BrainSpace connects these activities into one learning cycle: **Set goals → Learn → Practice → Analyze → Review → Improve**.

## Planned features (v1.0)

| Module | Planned capability |
|---|---|
| Authentication & profile | Registration, login/logout, student/instructor/admin roles |
| Learning Path | Editable personal roadmaps, AI-generated suggestions, progress |
| Course Management | Free courses, chapters, lessons, enrollment and moderation |
| AI Tutor | Document-grounded Q&A with retrieval and source references |
| Knowledge Library & Notes | Private PDF/TXT uploads, tags, notes and search |
| Quiz & Flashcards | AI-generated practice, scoring and basic spaced review |
| Learning Analytics | Progress, topic accuracy, due cards and review suggestions |

Knowledge graphs, community, advanced gamification, payments and external reminders are outside the committed v1.0 scope.

## Proposed technology stack

React + TypeScript + Vite, React Router, Tailwind CSS; Node.js + Express + TypeScript; PostgreSQL + Prisma; pgvector and one LLM/embedding provider; private object storage. Architecture: modular monolith with REST APIs. Public deployment is a release goal.

## Repository structure

```text
brainspace/
├── .github/                 # Issue and pull request templates
├── frontend/                # Environment template; application planned
├── backend/                 # Environment template; application planned
├── docs/                    # Design, workflow, roadmap and testing
├── README.md
├── CONTRIBUTING.md
├── FUNCTIONAL_SPECIFICATION.md
└── IMPLEMENTATION_GUIDE.md
```

## Getting started

### Clone the repository

```bash
git clone https://github.com/anyl-mely/brainspace.git
cd brainspace
```

Existing collaborators should update their remote URL rather than clone again if their local copy is already correct.

### Development setup (planned)

Install Git, a supported Node.js LTS release with npm, and PostgreSQL with pgvector support (local or approved cloud instance). Exact versions and prerequisites will be pinned during foundation setup. Copy each application's `.env.example` to `.env` and fill in development values locally; do not commit `.env`.

Once the application scaffolds, package scripts, migrations and seed exist, the intended workflow is:

1. Install frontend/backend dependencies using the committed lockfiles (`npm ci` in each directory).
2. Configure the database and private storage, run the documented migrations and seed command from `backend/`.
3. Run `npm run dev` in `backend/` and `frontend/` in separate terminals.
4. Open the frontend address shown in the terminal and verify the API health endpoint and the seeded demo flows.

These commands are **not runnable yet** in this starter kit. See the [Implementation Guide](IMPLEMENTATION_GUIDE.md) for the foundation tasks and update this section once they have been tested on a clean clone.

## Documentation

Development documentation and Issue/PR templates are maintained in Vietnamese for the team. Technical identifiers, commands and filenames retain their original form.

- [Functional specification](FUNCTIONAL_SPECIFICATION.md)
- [Implementation guide](IMPLEMENTATION_GUIDE.md)
- [Contribution guidelines](CONTRIBUTING.md)
- [Git workflow](docs/GIT_WORKFLOW.md)
- [Coding conventions](docs/CODING_CONVENTIONS.md)
- [Project roadmap](docs/PROJECT_ROADMAP.md)
- [Database design](docs/DATABASE_DESIGN.md)
- [API specification](docs/API_SPECIFICATION.md)
- [Testing guide](docs/TESTING_GUIDE.md)
- [Kickoff checklist](docs/KICKOFF_CHECKLIST.md)
- [Milestone dependency analysis](docs/DEPENDENCY_ANALYSIS.md)
- [UI design and wireframes](docs/UI_DESIGN.md)

## Team

A team of three developers: [anyl-mely](https://github.com/anyl-mely) (Leader / Platform), [khongloan9811-arch](https://github.com/khongloan9811-arch) (AI & Knowledge), and [Quanndhe186402](https://github.com/Quanndhe186402) (Learning Intelligence). See the [Project Roadmap](docs/PROJECT_ROADMAP.md) for issue ownership and [Kickoff Issue #2](https://github.com/anyl-mely/brainspace/issues/2) for recorded team decisions. Individual contributions are tracked through issues, commits and independently reviewed pull requests.

## Development workflow

GitHub Flow: short-lived task branches from `main`, Conventional Commits, pull requests, at least one independent approval and merge commits. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Live demo

Not deployed yet. A public URL and safe demo accounts will be added after deployment and verification.

## License

No open-source license has been selected. The repository's public visibility does not itself grant a license to reuse the code. The team will decide licensing before release.
