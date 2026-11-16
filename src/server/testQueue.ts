// Server-only: spawns processes. Loaded by runTests.ts inside the handler via dynamic
// import, so none of this ends up in the browser bundle.
import { spawn, type ChildProcess } from 'node:child_process'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { AsyncQueuer } from '@tanstack/pacer'
import { resolveLabDir } from './labFs'
import type { RunResult, TestResult } from './runTests'

const REPO_ROOT = process.cwd()
const VITEST_BIN = path.join(REPO_ROOT, 'node_modules', 'vitest', 'vitest.mjs')

// Wall-clock limit for one whole run, Vitest startup included. Vitest's own per-test
// timeout can't catch `while (true) {}`: a synchronous loop blocks the worker's event
// loop, so the timer never fires. Only killing the process from outside works.
export const TIME_LIMIT_MS = 10_000

// Kill the child and everything it spawned (Vitest runs tests in forked workers, so
// killing only the parent would leave the looping worker burning a core).
const killTree = (child: ChildProcess) => {
  if (child.pid === undefined) return
  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' })
  } else {
    // The child was started detached, so it leads its own process group: -pid kills the group.
    try {
      process.kill(-child.pid, 'SIGKILL')
    } catch {
      child.kill('SIGKILL')
    }
  }
}

// The subset of Vitest's JSON reporter output we read.
type VitestJson = {
  testResults: Array<{
    message?: string
    assertionResults: Array<{
      fullName: string
      status: string
      duration?: number | null
      failureMessages?: string[]
    }>
  }>
}

const toTestResults = (json: VitestJson): TestResult[] =>
  json.testResults.flatMap((file) => {
    // A file that fails to load (syntax error, bad import) has no assertions, only a message.
    if (file.assertionResults.length === 0 && file.message) {
      return [{ name: 'test file failed to load', status: 'failed' as const, durationMs: 0, message: file.message }]
    }
    return file.assertionResults.map((a) => ({
      name: a.fullName,
      status: a.status === 'passed' ? 'passed' : a.status === 'failed' ? 'failed' : 'skipped',
      durationMs: Math.round(a.duration ?? 0),
      message: a.failureMessages?.length ? a.failureMessages.join('\n') : undefined,
    }))
  })

// Spawns `vitest run` for one lab in a child process, so lab code never runs in the
// server process. Results go to a temp file rather than stdout, so log noise can't
// corrupt the JSON. Past TIME_LIMIT_MS the whole process tree is hard-killed and the
// run comes back as { status: 'timeout' }: a result, not an error.
const runVitest = async (labId: string, labDir: string): Promise<RunResult> => {
  const outDir = await mkdtemp(path.join(tmpdir(), 'dsa-run-'))
  const outFile = path.join(outDir, 'results.json')
  const startedAt = Date.now()
  try {
    const { stderr, timedOut } = await new Promise<{ stderr: string; timedOut: boolean }>((resolve, reject) => {
      const child = spawn(
        process.execPath,
        [VITEST_BIN, 'run', `labs/${labDir}/`, '--reporter=json', `--outputFile=${outFile}`],
        { cwd: REPO_ROOT, stdio: ['ignore', 'ignore', 'pipe'], detached: process.platform !== 'win32' },
      )
      let err = ''
      let timedOut = false
      const timer = setTimeout(() => {
        timedOut = true
        killTree(child)
      }, TIME_LIMIT_MS)
      child.stderr?.on('data', (chunk) => (err += chunk))
      child.on('error', (e) => {
        clearTimeout(timer)
        reject(e)
      })
      // Vitest exits 1 when any test fails. That's a normal result, not an error.
      child.on('close', () => {
        clearTimeout(timer)
        resolve({ stderr: err, timedOut })
      })
    })
    if (timedOut) {
      return { status: 'timeout', labId, limitMs: TIME_LIMIT_MS, ranAt: startedAt, durationMs: Date.now() - startedAt }
    }
    const raw = await readFile(outFile, 'utf8').catch(() => {
      throw new Error(`Vitest produced no results.\n${stderr.slice(-2000)}`)
    })
    return {
      status: 'ok',
      labId,
      results: toTestResults(JSON.parse(raw) as VitestJson),
      ranAt: startedAt,
      durationMs: Date.now() - startedAt,
    }
  } finally {
    await rm(outDir, { recursive: true, force: true })
  }
}

// A job carries its own resolve/reject: addItem only reports whether the item was
// queued, so this is how each caller awaits its own run.
type Job = {
  labId: string
  labDir: string
  resolve: (r: RunResult) => void
  reject: (e: unknown) => void
}

// One queue for the whole server process, concurrency 1: runs happen one at a time, in
// the order they were requested. The interviewer (Phase 3) uses this same queue.
const testQueue = new AsyncQueuer<Job>(
  async (job) => {
    try {
      job.resolve(await runVitest(job.labId, job.labDir))
    } catch (e) {
      job.reject(e)
    }
  },
  { concurrency: 1, started: true },
)

export const enqueueTestRun = async (labId: string): Promise<RunResult> => {
  const labDir = await resolveLabDir(labId)
  return new Promise<RunResult>((resolve, reject) => {
    testQueue.addItem({ labId, labDir, resolve, reject })
  })
}
