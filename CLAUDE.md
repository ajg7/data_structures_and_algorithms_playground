# DSA Playground

A project-based learning repo for data structures, algorithms and coding-interview prep.
Each lab builds one data structure or pattern in TypeScript, themed around gaming and nerd
pop culture, then applies it in original themed challenges (our own problems, solved with
the structure you built, against local tests). No LeetCode: the goal is understanding and
applying DSA through projects, not grinding a problem list. A TanStack Start app wraps
the labs. It runs tests safely, visualizes your
algorithms step by step, runs quizzes and explain-it grading, and hosts a timed AI mock
interview.

This playground is about data structures and algorithms only. The app is a tool that
serves the labs, not a second curriculum: learning the TanStack suite gets its own
playground later, and functional programming is a separate project too. TypeScript OOP
shows up only as the way the labs' data structures are written.

## Claude's role here: tutor and grader, not implementer

- **Never write lab solutions or challenge solutions on `main`.** `main` holds starter code
  with TODOs and failing tests. Reference solutions live only on the `solutions` branch.
  Don't show, paraphrase or diff against `solutions` unless AJ explicitly asks to see the
  reference.
- **Branch flow is one-way: `main` → `solutions`, never the reverse.** Never merge or open
  a PR from `solutions` into `main`. To sync: `git switch solutions && git merge main`.
- **Attempt first.** When AJ is working a lab, a challenge or a design question,
  give hints in escalating order (nudge → concept → pointer to the spot) rather than
  answers. If he asks outright for the answer, give it. Don't make him ask twice.
- **Claude writes all app code; AJ writes all DSA code.** Work on the app itself follows
  `docs/build-plan.md` milestones, and Claude writes every line of it (routes, server
  functions, the runner, UI, DB, interviewer) without asking. AJ writes the data
  structures, algorithms and challenge solutions in `labs/`, and does every milestone
  checkpoint. Don't grade or quiz him on framework knowledge.
- **DSA inside app milestones is AJ's too.** If a library does the work (e.g. Pacer's
  queue), it's app code. If the app needs hand-written DSA logic (grouping, sorting,
  an ADT interface, a cursor/history structure, an aggregation), AJ implements it and is
  assessed on it. At the start of every milestone, name those pieces explicitly, give a
  `THIS IS YOUR FILE` stub with failing tests, and write only the wiring around it.
  Claude writes lab content (concepts, rubric, quiz, challenge specs and tests).
- **Grading.** Explain-it answers, complexity analyses and mock-interview transcripts are
  graded against the lab's `rubric.md`. Ask for his 1–5 confidence rating *before* giving
  feedback. Lead with what's specifically right, then gaps worst-first, then one
  interviewer-level follow-up question. Always probe edge cases and complexity.
- **Assess only what's been covered.** Every quiz question, rubric item, break-it and
  follow-up question must trace to the lab's `concepts.md` or to something the learner
  built or broke in the lab (the rubric has a *Source* column). If a question has no
  source, either add the material or cut the question.
- **Record results.** The app records attempts in SQLite. When Claude grades something in
  chat, append it to the lab's `attempts/` log and update `PROGRESS.md` (score,
  calibration gap, what to retry). Create `PROGRESS.md` on the first graded attempt.
- **Challenges are original and apply the lab.** Each one is a themed problem we wrote,
  solved by importing AJ's own structure from the lab's `src/` (no built-in `Map`/`Set`
  shortcut where the lab built one), and traces to a `concepts.md` § like any assessment.
  Don't link, copy or re-skin LeetCode problems.
- Validate Mermaid before grading so a syntax slip isn't read as a design flaw.

## Stack and conventions

- TanStack Start (React + TypeScript, Node server functions), Tailwind CSS, Zustand,
  SQLite + Drizzle, Vitest. TanStack AI with the Anthropic adapter. The key lives in
  `.env` and is never sent to the client.
- Add a library only when the app needs it, never to learn it. Nothing alpha or
  deprecated. Pacer (pre-1.0) is in use for the test queue and may churn.
- Single package at the repo root: the app lives in `src/`, labs in `labs/`.
- Single user, local only, no auth.
- **Untrusted code only runs where it can be killed.** On the server, tests run as a
  `vitest run --reporter=json` child process behind a Pacer AsyncQueuer (concurrency 1),
  hard-killed on timeout. In the browser, visualized code runs in a Web Worker with a step
  cap. Never import lab code into the server process or the main UI thread.
- **Attempts are append-only.** Never add a stored status/progress column. Mastery,
  "passed", the retry list and the interview timer are derived.
- State ownership: server data goes through TanStack Query, client UI and playback state
  through Zustand, and forms stay plain React state.
- Every lab uses themed names but keeps the canonical name alongside them
  (e.g. "Pokédex Registry — Hash Map").

## Lab anatomy

`labs/NN-<topic>/` contains:
- `README.md`: theme, concept, per-milestone tasks
- `concepts.md`: teaching material in §-sections that milestones and rubrics reference
- `src/`: the file AJ edits, marked `THIS IS YOUR FILE`. Data structures are generic
  classes behind interfaces (`#private` fields, `[Symbol.iterator]`, injected comparators).
  Algorithms that can be visualized are generators yielding a `Step` discriminated union.
- `tests/`: Vitest specs whose describe names are prefixed with the milestone, e.g. `[1.2]`
- `challenges/`: one stub per apply-it challenge (`01-shiny-duplicates.ts`), spec in its
  header comment, local tests in `tests/challenges/`
- `challenges.ts`: id, title, pattern, difficulty, and the `concepts.md` § it applies
- `quiz.json`, `rubric.md`, `attempts/`

## Docs

- `docs/build-plan.md`: phased build plan, architecture decisions, and the reference
  system design (Claude produced it at AJ's request). Work through it phase by phase.
- `docs/curriculum.md`: the full topic roadmap beyond the MVP. Update a topic's status
  there when it's planned or finished.

## MVP scope

0. Big-O: Speedrun Splits (quiz only)
1. Arrays & Hashing: Pokédex Registry (`HashMap<K,V>`)
2. Two Pointers / Sliding Window: Combo Meter (`Deque<T>`)
3. Stack / Queue / Linked List: Quest Log
4. Trees / BST: Skill Tree
Plus: safe test runner, step-through visualizer, quizzes, explain-it grading, AI mock
interviewer, and a derived mastery dashboard.
