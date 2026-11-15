# DSA Playground — Progress

**Plan:** docs/build-plan.md
**Last touched:** 2026-11-15

## Phase 1 — Walking skeleton: run untrusted code safely  [complete]
- [x] 1.1 Start app renders a lab page from the filesystem — autopilot — built and merged (PR #1), checkpoint passed (AJ-reported, 2026-11-10; originally skipped)
- [x] 1.2 Run Tests button returns pass/fail per test — autopilot (switched from sidekick 2026-11-15) — built and verified (14/14 on Lab 01) — **checkpoint skipped** (AJ chose to move on, 2026-11-15; can still do it: 5 fast clicks, predict order/timing)
- [x] 1.3 An infinite loop becomes a timeout, not a hang — autopilot (app code) — done: temp looping lab killed at 10s, returned timeout in 11.2s, server answered in 85ms mid-run, no orphan workers (2026-11-15)
- [x] 1.4 Each run is an Attempt row, listed on the lab page — autopilot (app code) — done: SQLite + Drizzle `attempts`, history via Query, passed milestones derived (1.1–1.4 shown for Lab 01) (2026-11-15). `passedMilestones` reverted to a stub for AJ (hand-written DSA), 3 tests failing until he implements it

## Phase 2 — Labs 01–02 in the final format  [next]
- [>] 2.1 Lab 01 Pokédex Registry complete — AJ in progress. Claude wrote lab content 2026-11-15: concepts.md §1–§7, rubric.md, quiz.json (11 q), challenges.ts, 5 challenge stubs + tests, no-builtins guard, map-like + timing tests (all verified against throwaway answers, then deleted). AJ: src/map-like.ts, `implements MapLike`, challenges 01–05, checkpoint. Timing baseline: 4.4x for 4x keys (constant hash: ~22x)
- [ ] 2.2 Lab 02 Combo Meter complete
- [ ] 2.3 Challenge tracker

## Phase 3 — Mock interviewer v1  [not started]
- [ ] 3.1 Streaming interviewer chat
- [ ] 3.2 Interviewer reads your code and runs your tests
- [ ] 3.3 Interview timer and session record

## Phase 4 — Lab 03 and the step-through visualizer  [not started]
- [ ] 4.1 Lab 03 Quest Log complete
- [ ] 4.2 Worker plays back your generator safely
- [ ] 4.3 Playback controls

## Phase 5 — Assessments that compound  [not started]
- [ ] 5.1 Quizzes and explain-it grading
- [ ] 5.2 Interviews resume after refresh and end with a scorecard
- [ ] 5.3 Lab 04 Skill Tree and the mastery dashboard

## Scaffolding written by Claude
- Project init from `@tanstack/cli create` (router.tsx, tsconfig, tsr.config.json, .gitignore, .vscode) — phase 1
- `vite.config.ts`, `vitest.config.ts`, `package.json`, `src/styles.css` — phase 1
- `@tanstack/pacer@^0.23.1` dependency installed — phase 1, setup for 1.2
- 1.3: process-tree kill + `TIME_LIMIT_MS` in `src/server/testQueue.ts`, `RunResult` union in `runTests.ts`
- 1.4: `src/db/schema.ts`, `src/db/client.ts` (migrates on load), `drizzle.config.ts`, `drizzle/0000_attempts.sql`, `src/server/attempts.ts`, `src/lib/progress.ts` (+test), QueryClient in `src/router.tsx`, History panel in the lab route; deps drizzle-orm, better-sqlite3, @tanstack/react-query, drizzle-kit
- 1.2: `src/server/runTests.ts` (server fn + types), `src/server/testQueue.ts` (Vitest child process, JSON parse, Pacer queue at concurrency 1), `src/server/labFs.ts` (lab dir lookup, split out of `labs.ts`), Run Tests panel in `src/routes/labs.$labId.tsx`

## Deviations from the plan
- Division clarified by AJ (2026-11-15): hand-written DSA inside app milestones is AJ's and assessed; library-provided (Pacer queue) is app code. Still to apply to the plan text: 2.1 `MapLike` interface (AJ), 4.3 playback history (AJ), 5.3 mastery/calibration aggregation (AJ). Lab 03 (4.1) is where AJ builds `Queue<T>`. Plan not yet amended.
- 1.1: dropped `@tanstack/react-devtools` / `devtools-vite` from the scaffold (pre-1.0, excluded by plan). Kept Router Devtools (1.x).
- 1.1: dev server on port 3100, because Docker Grafana from System Design Playground holds 3000.
- 1.1: Start 1.169 server fns use `.validator()`, not `.inputValidator()`.
- 2026-11-15: scope narrowed to DSA only. TanStack learning moves to a future separate playground. Cut old 4.4 (TanStack Store comparison) and old 5.1 (TanStack DB collection); old 5.2–5.4 renumbered 5.1–5.3. DB, Form, Table, Virtual and Store dropped from the stack. App milestones now have "Done when" instead of checkpoints. Claude writes all app code; AJ writes all DSA code and does the checkpoints.

## Carryover
- 10s limit: warm Lab 01 runs take 2.5–2.8s, but the first run after a cold dev-server start took 7.8s. Revisit if false timeouts appear (plan's open question).
- DB at `data/dsa.sqlite` (gitignored). The 1.3 verification wrote 2 rows for lab 99 from one click; Lab 01 counts matched clicks (4/4). Watch for duplicate inserts.
- No `solutions` branch yet. Create it when the first reference solution is written.
- Lab 01 `HashMap` ([1.1]–[1.4], 14/14 tests) written by AJ and merged into `main` via PR #1 (fd4151a). Conflicts with the CLAUDE.md rule "main = starter only". AJ to decide: amend the rule, or move the solution to `solutions` and restore the TODOs on main.
- Lab 01 content exists now; grading can use rubric.md. `npx tsc --noEmit` fails on map-like until AJ writes the interface (expected).
- 1.2: queue + spawn had to live in a module loaded via dynamic import inside the handler; at module level in the server fn file they leaked into the client bundle. Same reason fs helpers live in `labFs.ts`, not `labs.ts`.
