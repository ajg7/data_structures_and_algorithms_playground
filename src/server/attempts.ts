import { createServerFn } from '@tanstack/react-start'
import { validateLabId } from './labs'
import type { RunResult } from './runTests'
import { passedMilestones } from '#/lib/progress'

export type TestRunAttempt = { id: number; score: number | null; createdAt: number; run: RunResult }

export type LabHistory = { runs: TestRunAttempt[]; passedMilestones: string[] }

// The db module is imported inside handlers so better-sqlite3 stays out of the client bundle.
export const recordTestRun = async (run: RunResult): Promise<void> => {
  const { db } = await import('#/db/client')
  const { attempts } = await import('#/db/schema')
  const score =
    run.status === 'ok' && run.results.length > 0
      ? run.results.filter((r) => r.status === 'passed').length / run.results.length
      : 0
  db.insert(attempts)
    .values({ kind: 'test-run', lab: run.labId, milestone: null, score, payload: run, createdAt: new Date(run.ranAt) })
    .run()
}

export const getLabHistory = createServerFn({ method: 'GET' })
  .validator(validateLabId)
  .handler(async ({ data: labId }): Promise<LabHistory> => {
    const { db } = await import('#/db/client')
    const { attempts } = await import('#/db/schema')
    const { and, desc, eq } = await import('drizzle-orm')
    const rows = db
      .select()
      .from(attempts)
      .where(and(eq(attempts.lab, labId), eq(attempts.kind, 'test-run')))
      .orderBy(desc(attempts.createdAt), desc(attempts.id))
      .all()
    const runs = rows.map((r) => ({
      id: r.id,
      score: r.score,
      createdAt: r.createdAt.getTime(),
      run: r.payload as RunResult,
    }))
    return { runs, passedMilestones: passedMilestones(runs.map((r) => r.run)) }
  })
