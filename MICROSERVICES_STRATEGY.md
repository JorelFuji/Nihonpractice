# Nihon Quest — Monolith → Microservices Strategy

> **Honest gut-check first.** The `nihon-quest-fullstack` backend is *already* a
> modular monolith. Its API is cleanly split by business capability
> (`app/api/v1/endpoints/`: `auth`, `lessons`, `practice`, `srs`, `vocabulary`,
> `ai_tutor`, plus `dictionary`). That structure gives you ~80% of the benefit of
> microservices at ~20% of the operational cost. **Do not split into services
> until you have a real forcing function.** For a learning app that means one
> thing in practice: the AI tutor / TTS workload scaling (and costing) very
> differently from the CRUD endpoints. Everything else stays in the monolith.

This document is scoped to **managed services that have both a free tier (to start)
and a paid "fee" tier (to scale)** — so the whole path costs $0 until real usage
forces a paid upgrade, and never requires you to run your own Kubernetes cluster,
Vault, or Prometheus.

---

## 1. Where the app is today

| Piece | Tech (from repo) | Notes |
|---|---|---|
| Backend API | FastAPI (`backend/app/main.py`) | Domain-split endpoints — modular monolith |
| Relational DB | PostgreSQL 15 (`docker-compose.yml`) | Single owned DB |
| Cache / sessions | Redis 7 | SRS scheduling, rate limits |
| AI tutor | OpenAI (`gpt-4o-mini`) or local Ollama | The one workload that scales differently |
| TTS | VoiceVox engine (self-hosted container) | CPU-heavy, bursty |
| Web frontend | React + Vite (`frontend/`) | Static build |
| Mobile | Flutter (`nihon_quest_mobile/`) | Ships to app stores |
| Hosting (current) | Firebase Hosting (`firebase-hosting/`) | Already on a free→fee tier |

**Conclusion:** you have a modular monolith + a mobile client. The migration target
is *not* "14 microservices" — it's "keep the monolith, host it on free-tier managed
services, and peel off exactly one service (AI/TTS) if and when it forces the issue."

---

## 2. The proven pattern: Strangler Fig, applied minimally

You never do a big-bang rewrite. You put a routing layer in front and peel off one
capability at a time, keeping the old path as a fallback.

For this app the *only* strong extraction candidate is the **AI + TTS worker**:

- It has an independent scaling profile (GPU/CPU bursts, slow responses).
- It has an independent cost profile (OpenAI tokens, VoiceVox CPU).
- It can run **async** — the client asks for a tutor reply or audio, you enqueue it,
  and stream/poll the result. Synchronous chains multiply failure probability.

Everything else (`auth`, `lessons`, `practice`, `srs`, `vocabulary`, `dictionary`)
stays as modules in the FastAPI monolith. A service that can't own its own data isn't
a service — and these all share the user/progress tables.

### Extraction order (only if forced)

1. **Instrument first.** Add tracing/error tracking (Sentry, free tier) *before*
   splitting anything. You can't debug an async worker you can't see.
2. **Put the queue in.** Move AI-tutor and TTS calls behind a queue (Upstash QStash /
   Redis) inside the monolith — same deploy, new async boundary.
3. **Extract the worker.** Move the queue consumer to its own deploy (Cloud Run /
   Render). It owns *no* relational tables — it reads a job, calls OpenAI/VoiceVox,
   writes the result back through an API or to object storage.
4. **Delete the dead sync path** in the monolith.

That's the whole plan. Two deployables (API monolith + AI/TTS worker), not fourteen.

---

## 3. Free-tier → fee-tier service map

Every row starts free and has a paid tier you only pay for when usage grows. Pick
**one** per layer; alternatives are given so you're not locked in.

| Layer | Recommended (start here) | Free tier | Paid "fee" tier when you outgrow it | Alternatives (also free→fee) |
|---|---|---|---|---|
| **Frontend hosting** (web) | **Firebase Hosting** (already used) | Spark: free hosting + CDN | Blaze: pay-as-you-go bandwidth | Cloudflare Pages, Vercel, Netlify |
| **Backend / API compute** | **Google Cloud Run** | Generous monthly free requests + CPU | Pay-per-request beyond free | Render, Fly.io, Railway |
| **AI/TTS worker** (if extracted) | **Cloud Run** (scale-to-zero) | Same free pool | Pay only while jobs run | Render background worker, Fly.io |
| **PostgreSQL** | **Neon** | Free branch + storage cap | Paid compute/storage tiers | Supabase, Railway Postgres |
| **Redis / cache / queue** | **Upstash Redis + QStash** | Free daily command/message cap | Pay-per-request | Redis Cloud free tier |
| **Auth** | **Firebase Auth** (fits existing Firebase) | Free MAU allowance | Blaze / Identity Platform pricing | Supabase Auth, Clerk, Auth0 |
| **Object storage** (audio, media) | **Cloudflare R2** | Free storage + egress allowance | Pay-per-GB, no egress fees | Firebase Storage, Supabase Storage |
| **LLM API** | **Google Gemini API** (has a free tier) | Free request/day quota | Pay-per-token | OpenAI (**no free tier — fee only**), Groq |
| **TTS** | **VoiceVox** (self-host container) is free but not a managed tier | — | — | Google Cloud TTS (free monthly chars → fee), Azure TTS (free tier → fee) |
| **Error tracking / tracing** | **Sentry** | Free developer plan | Team plan (monthly fee) | Better Stack, Axiom, Grafana Cloud |
| **Uptime / logs** | **Better Stack** | Free monitors + log volume | Paid volume tiers | Grafana Cloud free tier |
| **CI/CD** | **GitHub Actions** | Free minutes for the repo | Paid minutes over the cap | GitLab CI free tier |
| **Container registry** | **GitHub Container Registry** | Free for public/small private | Paid storage/bandwidth | Docker Hub free→fee |

> ⚠️ **OpenAI has no free tier** — it's pay-as-you-go only. Your `.env.example`
> defaults to `gpt-4o-mini`. If you want a genuinely free-to-start LLM path, switch
> the default to **Gemini** (free daily quota) or keep the existing **Ollama local**
> option (`USE_LOCAL_LLM=true`) for $0 dev, and treat OpenAI as the paid production
> upgrade.

---

## 4. Concrete next steps (in order)

1. **Deploy the monolith as-is** to Cloud Run (or Render) from the existing
   `backend/Dockerfile`. One container, free tier. No K8s.
2. **Move Postgres to Neon** and Redis to **Upstash** — both free, both managed, both
   let each concern own its data without you running a database server.
3. **Point the web build at the deployed API**, keep hosting on **Firebase (Spark)**.
4. **Add Sentry** (free) to backend + frontend before doing anything else.
5. **Only if AI/TTS latency or cost becomes a problem:** put the queue in
   (Upstash QStash), then extract the AI/TTS worker to its own Cloud Run service.
6. **Wire CI/CD** with GitHub Actions: build the backend image → push to GHCR →
   deploy to Cloud Run; build the web bundle → deploy to Firebase Hosting.

Everything above stays inside free tiers until real traffic pushes one layer over its
cap — at which point you pay a fee on *that layer only*, not the whole stack.

---

## 5. CI/CD build-time optimization

This repo has several distinct build targets — FastAPI backend (`backend/Dockerfile`),
React/Vite web (`frontend/`), and the Flutter app (`nihon_quest_mobile/`). The single
biggest win is **not rebuilding what didn't change**, then caching and parallelizing
the rest. Aim for the **10-minute commit-to-feedback rule**: past that, developers
batch large risky PRs instead of shipping small ones.

Prioritized for *this* repo (highest impact first):

| Lever | How it applies here | Tooling (free → fee) |
|---|---|---|
| **Build only what changed** | Path filters so a `frontend/` change doesn't run backend/Flutter jobs, and docs-only PRs skip builds entirely. | GitHub Actions `paths:` filters (**free**); Turborepo/Nx if the JS side grows (**free**, Remote Cache/Nx Cloud **free→fee**) |
| **Dependency caching** | Cache `pip` (backend), `yarn`/`npm` (web), and `pub` (Flutter) keyed on the lockfile hash. | `actions/cache` keyed on `hashFiles('**/requirements.txt')` etc. (**free**) |
| **Docker layer caching** | Order `backend/Dockerfile` so deps install before `COPY . .` — code changes then don't bust the dep layer. Use Buildx (`DOCKER_BUILDKIT=1`) + registry cache. | Docker Buildx (**free**); GHCR / Docker Hub cache (**free→fee**) |
| **Parallelize** | Run backend tests, web lint/build, and Flutter analyze as concurrent jobs, not a chain. Run fast static checks first (fail-fast). | GitHub Actions job matrix (**free minutes → fee**) |
| **Artifact reuse** | Build the backend image once → reuse the same digest for test and deploy stages instead of rebuilding. | GH Actions artifacts / GHCR (**free→fee**) |
| **Dependency proxy / cache** | If install time or registry flakiness bites, put a caching proxy in front of PyPI/npm. | **Sonatype Nexus Repository OSS** (self-host, **free**) / Nexus Repository Pro (**fee**); or GitHub Packages (**free→fee**) |
| **Faster runners** | Only if image builds are CPU-bound — larger runners for the Docker/Flutter jobs. | GitHub larger runners (**fee**), Depot (**free tier → fee**) |

**Kubernetes tie-in:** once the backend image is built and pushed to GHCR, deployment
is a thin final stage — `helm upgrade` (or Argo CD / Flux GitOps, both **free→fee**)
against your cluster. Build the image once in CI and let the deploy stage only *ship*
it; don't rebuild in the deploy job.

> **Honest scope note:** for a repo this size, `paths:` filters + dependency caching +
> a couple of parallel jobs already gets you comfortably under 10 minutes. Turborepo/Nx
> remote caching, Bazel, self-hosted runners, and a Nexus proxy are worth it only once
> build times or team size actually justify them — don't add them preemptively.

---

## 6. What we deliberately did NOT recommend

Because they'd be premature for this app and/or require self-hosting you can't justify:

- A self-managed Kubernetes cluster, Helm charts, or a service mesh.
- Splitting `auth`/`lessons`/`practice`/`srs`/`vocabulary` into separate services —
  they share user/progress data and belong in one deploy.
- Self-hosted Prometheus/Grafana/Loki/Vault/Keycloak — the managed free tiers above
  cover the same needs with zero ops.
- Kafka/RabbitMQ clusters — Upstash QStash covers the async needs at this scale.

Revisit this doc when (not before) you have a concrete forcing function: independent
scaling, independent release cadence, or a second team owning a capability.
