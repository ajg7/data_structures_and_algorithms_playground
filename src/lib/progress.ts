import type { RunResult } from '#/server/runTests'

// Test names carry their milestone as a prefix: "[1.2] HashMap set/get > ...".
const MILESTONE_TAG = /^\[(\d+\.\d+)\]/

export const milestoneOf = (testName: string): string | null => MILESTONE_TAG.exec(testName)?.[1] ?? null

// ─── THIS IS YOUR FILE (from here down) ──────────────────────────────────────────────
// Derived, never stored: which milestones have passed, given every recorded run.
//
// Spec (tests: src/lib/progress.test.ts):
// - A milestone has passed if at least one run with status 'ok' had EVERY one of that
//   milestone's tests passing. Use milestoneOf(test.name) to find a test's milestone;
//   skip tests with no tag.
// - A later failing run does not un-pass it. Timeout runs never count.
// - Return each passed milestone once, sorted numerically ('1.2' before '1.10').
// - Built-in Map/Set are allowed here: this runs in the server, and lab code (your
//   HashMap) must never be imported into the server process.
// - Think about it first: what's the time complexity in terms of runs × tests per run?
//
// Until you implement it, the lab page's "passed milestones" badges stay empty.
export const passedMilestones = (runs: RunResult[]): string[] => {
  void runs
  // TODO(AJ)
  return []
}
