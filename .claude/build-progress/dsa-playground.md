# DSA Playground — Progress

**Plan:** docs/build-plan.md
**Last touched:** 2026-11-07

## Phase 1 — Walking skeleton: run untrusted code safely  [in progress]
- [>] 1.1 Start app renders a lab page from the filesystem — autopilot — built, checkpoint pending
- [ ] 1.2 Run Tests button returns pass/fail per test
- [ ] 1.3 An infinite loop becomes a timeout, not a hang
- [ ] 1.4 Each run is an Attempt row, listed on the lab page

## Phase 2 — Lab format and TypeScript OOP data structures  [not started]
- [ ] 2.1 Lab 01 Pokédex Registry complete
- [ ] 2.2 Lab 02 Combo Meter complete
- [ ] 2.3 Problem tracker

## Phase 3 — Mock interviewer v1 (TanStack AI)  [not started]
- [ ] 3.1 Streaming interviewer chat
- [ ] 3.2 Interviewer reads your code and runs your tests
- [ ] 3.3 Interview timer and session record

## Phase 4 — Visualizer: generators, Zustand, Pacer  [not started]
- [ ] 4.1 Lab 03 Quest Log complete
- [ ] 4.2 Worker plays back your generator safely
- [ ] 4.3 Playback controls with Zustand and Pacer
- [ ] 4.4 Same store in TanStack Store, then pick one

## Phase 5 — Assessments that compound  [not started]
- [ ] 5.1 Attempts move into a TanStack DB collection
- [ ] 5.2 Quizzes and explain-it with TanStack Form
- [ ] 5.3 Interviews resume after refresh and end with a scorecard
- [ ] 5.4 Lab 04 Skill Tree and the mastery dashboard

## Scaffolding written by Claude
- Project init from `@tanstack/cli create` (router.tsx, tsconfig, tsr.config.json, .gitignore, .vscode) — phase 1
- `vite.config.ts`, `vitest.config.ts`, `package.json`, `src/styles.css` — phase 1

## Deviations from the plan
- 1.1: dropped `@tanstack/react-devtools` / `devtools-vite` from the scaffold (pre-1.0, excluded by plan). Kept Router Devtools (1.x).
- 1.1: dev server on port 3100, because Docker Grafana from System Design Playground holds 3000.
- 1.1: Start 1.169 server fns use `.validator()`, not `.inputValidator()`.

## Carryover
- No `solutions` branch yet. Create it when the first reference solution is written.
- Nothing committed yet.
