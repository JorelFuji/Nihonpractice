# NihongoQuest / Nihon Pace

A collection of projects for building a gamified, AI-assisted **Japanese language learning platform**. This repository is a monorepo-style workspace that holds several parallel implementations (web, mobile, iOS) plus design mockups and extensive planning/status documentation gathered while the platform was being developed.

> © 2026 Osaka Oaks LLC

---

## 📦 What's in this repository

The repo contains multiple sub-projects that each explore a different slice of the platform. They are independent — pick the one you want to run and follow its own setup docs.

| Directory | Type | Description |
|-----------|------|-------------|
| [`nihon-quest-fullstack/`](nihon-quest-fullstack/) | Web (React + FastAPI) | The most complete full-stack build: React + Vite + TypeScript + TailwindCSS frontend with a FastAPI (Python) + PostgreSQL backend. FSRS spaced repetition, JMdict dictionary, kanji database, AI tutor, handwriting recognition. See its [`README.md`](nihon-quest-fullstack/README.md). |
| [`nihongo-quest-app/`](nihongo-quest-app/) | Web (React + Docker) | Alternate full-stack build with a `docker-compose.yml`, `start.sh`, and its own frontend/backend. Kawaii-themed UI, curriculum builder, progression roadmap. See its [`README.md`](nihongo-quest-app/README.md) and [`QUICKSTART.md`](nihongo-quest-app/QUICKSTART.md). |
| [`nihon_quest_mobile/`](nihon_quest_mobile/) | Mobile (Flutter) | Flutter application targeting Android, iOS, and web, wired up with Firebase (`firebase.json`, `.firebaserc`). Includes 2D learning games. |
| `Nihon Pace iOS/` | iOS (native) | Placeholder for the native iOS app. |
| [`stitch_nihongo_quest/`](stitch_nihongo_quest/) · `stitch_nihongo_quest 2/` · `stitch_nihongo_quest 3/` | Design mockups | Google Stitch UI exports. Each screen folder contains a `code.html` prototype and a `screen.png` render (e.g. `daily_practice_session`, `handwriting_practice`, `level_progression_map`, `course_curriculum_builder`). |

Root-level files:

- `package.json` / `package-lock.json` — root Node dependencies shared during prototyping.
- `GoogleService-Info.plist` — Firebase config for the iOS/Apple side.
- `*.md` status & guide files — see [Documentation](#-documentation) below.

---

## 🎯 Platform features

Across the builds, the platform aims to provide:

- **Adaptive spaced repetition** — FSRS-powered review scheduling
- **Multi-modal practice** — reading, writing, listening, speaking
- **Handwriting practice** — canvas-based kanji/kana with stroke-order guidance
- **AI tutor** — LLM-powered grammar explanations and conversation practice
- **N5–N1 curriculum** — structured lessons following JLPT levels
- **Dictionary & corpus** — JMdict (~175k entries), KANJIDIC2, Tatoeba example sentences
- **Japanese tooling** — kuromoji.js tokenization, furigana, TTS/STT
- **Kids mode** & bilingual (Japanese-first) toggle
- **Gamification** — streaks, achievements, progression maps, dark/kawaii themes

Feature availability varies per sub-project — check each project's own README for what's implemented there.

---

## 🚀 Getting started

Each sub-project runs on its own. Common entry points:

**Full-stack web (`nihon-quest-fullstack`)**
```bash
cd nihon-quest-fullstack
# follow SETUP.md — sets up the FastAPI backend and Vite frontend
cat SETUP.md
```

**Dockerized web (`nihongo-quest-app`)**
```bash
cd nihongo-quest-app
docker compose up      # or: ./start.sh
```

**Flutter mobile (`nihon_quest_mobile`)**
```bash
cd nihon_quest_mobile
flutter pub get
flutter run            # choose an Android/iOS/web target
```

**Design mockups (`stitch_nihongo_quest*`)**
Open any `code.html` in a browser, or view the paired `screen.png`.

---

## 📚 Documentation

The root of the repo collects the working notes and guides produced during development. Highlights:

- **Flutter / mobile** — `FLUTTER_SETUP.md`, `FLUTTER_MVP_COMPLETE.md`, `FLUTTER_2D_GAMES_COMPLETE.md`, `FLUTTER_FIREBASE_DEPLOYMENT.md`, `FLUTTER_GAMES_INSTRUCTIONS.md`, `FLUTTER_IMPLEMENTATION_STATUS.md`, `FLUTTER_INTEGRATION_COMPLETE.md`
- **Firebase & deployment** — `FIREBASE_TESTING_GUIDE.md`, `FIREBASE_TESTING_GUIDE_COMPLETE.md`, `DUAL_DEPLOYMENT_COMPLETE.md`, `HOME_BUTTON_AND_DEPLOYMENT.md`, `GIT_PUSH_COMPLETE.md`
- **Learning features** — `ENHANCED_KANJI_LEARNING.md`, `KANJI_FEATURE_COMPLETE.md`, `ADULT_LEARNING_JOURNAL_SYSTEM.md`, `FEATURED_BANNER_ADDED.md`
- **Localization** — `JAPANESE_LOCALIZATION_COMPLETE.md`, `JAPANESE_FIRST_LANGUAGE_TOGGLE.md`
- **QA / usage** — `TESTING_CHECKLIST.md`, `NAVIGATION_GUIDE.md`, `HARD_REFRESH_INSTRUCTIONS.md`
- **AI tooling** — [`AI_DEV_TOOLS.md`](AI_DEV_TOOLS.md) — comparison of open-source AI developer tools and a recommended stack for building these projects

Each sub-project also ships its own deeper docs (e.g. `nihon-quest-fullstack/CURRICULUM_SYSTEM.md`, `GRAMMAR_SRS_SYSTEM.md`, `JMDICT_INTEGRATION.md`, `KIDS_MODE.md`).

---

## 🗂️ Repository status

This is an active, exploratory workspace — several implementations coexist so approaches can be compared. `nihon-quest-fullstack` and `nihongo-quest-app` are the most developed web builds; `nihon_quest_mobile` is the Flutter track. Treat the numbered `stitch_*` folders as design references rather than shipping code.

## License

© 2026 Osaka Oaks LLC. See individual sub-projects for any bundled license files (e.g. `nihongo-quest-app/LICENSE`).
