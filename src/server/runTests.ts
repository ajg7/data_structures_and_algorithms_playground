import { createServerFn } from '@tanstack/react-start'
import { validateLabId } from './labs'

export type TestResult = {
  name: string
  status: 'passed' | 'failed' | 'skipped'
  durationMs: number
  message?: string
}

export type RunResult =
  | { status: 'ok'; labId: string; results: TestResult[]; ranAt: number; durationMs: number }
  // The run blew the time limit and its process tree was killed. A result, not an error:
  // the interviewer (Phase 3) treats it as information about your code.
  | { status: 'timeout'; labId: string; limitMs: number; ranAt: number; durationMs: number }

// The queue and the spawn live in testQueue.ts. Importing it inside the handler keeps
// them out of the client bundle: Start strips handler bodies from client code.
export const runLabTests = createServerFn({ method: 'POST' })
  .validator(validateLabId)
  .handler(async ({ data: labId }): Promise<RunResult> => {
    const { enqueueTestRun } = await import('./testQueue')
    const { recordTestRun } = await import('./attempts')
    const run = await enqueueTestRun(labId)
    await recordTestRun(run) // every run, timeouts included, becomes an Attempt row
    return run
  })
