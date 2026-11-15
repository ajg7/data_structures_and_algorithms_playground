import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getLab } from '#/server/labs'
import { getLabHistory } from '#/server/attempts'
import { runLabTests, type RunResult } from '#/server/runTests'

export const Route = createFileRoute('/labs/$labId')({
  loader: ({ params }) => getLab({ data: params.labId }),
  component: LabPage,
  notFoundComponent: () => <main className="p-8">No such lab.</main>,
})

const historyKey = (labId: string) => ['lab-history', labId] as const

function LabPage() {
  const lab = Route.useLoaderData()
  return (
    <main className="mx-auto max-w-3xl p-8">
      <p className="text-xs uppercase tracking-wide text-zinc-500">labs/{lab.dir}</p>
      <RunTests labId={lab.labId} />
      <History labId={lab.labId} />
      {/* Safe: html is rendered from our own repo files, not user input. */}
      <article className="lab-prose mt-6" dangerouslySetInnerHTML={{ __html: lab.html }} />
    </main>
  )
}

function RunTests({ labId }: { labId: string }) {
  const queryClient = useQueryClient()
  const [pending, setPending] = useState(0)
  const [run, setRun] = useState<RunResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Deliberately not disabled while pending: the 1.2 checkpoint is clicking it fast.
  const onClick = async () => {
    setPending((n) => n + 1)
    try {
      setRun(await runLabTests({ data: labId }))
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setPending((n) => n - 1)
      // The run was recorded server-side; refetch the history that derives from it.
      void queryClient.invalidateQueries({ queryKey: historyKey(labId) })
    }
  }

  return (
    <section className="mt-4 rounded border border-zinc-700 p-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onClick}
          className="rounded bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-500"
        >
          Run Tests
        </button>
        {pending > 0 && <span className="text-sm text-zinc-400">{pending} run(s) in flight…</span>}
        {run && <RunSummary run={run} />}
      </div>
      {error && <pre className="mt-3 whitespace-pre-wrap text-sm text-red-400">{error}</pre>}
      {run?.status === 'timeout' && (
        <p className="mt-3 text-sm text-amber-400">
          Timed out: the run was killed after {run.limitMs / 1000}s. Look for an infinite loop, or an
          algorithm that's far slower than it should be on the large inputs.
        </p>
      )}
      {run?.status === 'ok' && (
        <ul className="mt-3 space-y-1 text-sm">
          {run.results.map((r) => (
            <li key={r.name}>
              <span className={r.status === 'passed' ? 'text-emerald-400' : r.status === 'failed' ? 'text-red-400' : 'text-zinc-500'}>
                {r.status === 'passed' ? '✓' : r.status === 'failed' ? '✗' : '–'}
              </span>{' '}
              {r.name} <span className="text-zinc-500">({r.durationMs}ms)</span>
              {r.message && <pre className="ml-5 mt-1 whitespace-pre-wrap text-xs text-red-300">{r.message.split('\n')[0]}</pre>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function RunSummary({ run }: { run: RunResult }) {
  const time = new Date(run.ranAt).toLocaleTimeString()
  if (run.status === 'timeout') return <span className="text-sm text-amber-400">timeout · {time}</span>
  const passed = run.results.filter((r) => r.status === 'passed').length
  return (
    <span className="text-sm text-zinc-300">
      {passed}/{run.results.length} passed · {(run.durationMs / 1000).toFixed(1)}s · {time}
    </span>
  )
}

function History({ labId }: { labId: string }) {
  const { data, isPending, error } = useQuery({
    queryKey: historyKey(labId),
    queryFn: () => getLabHistory({ data: labId }),
  })

  return (
    <section className="mt-4 rounded border border-zinc-800 p-4 text-sm">
      <h2 className="font-semibold">History</h2>
      {isPending && <p className="mt-2 text-zinc-500">Loading…</p>}
      {error && <p className="mt-2 text-red-400">{error.message}</p>}
      {data && (
        <>
          <p className="mt-2 text-zinc-400">
            Milestones passed:{' '}
            {data.passedMilestones.length ? (
              data.passedMilestones.map((m) => (
                <span key={m} className="mr-1 rounded bg-emerald-900/60 px-1.5 py-0.5 text-emerald-300">
                  {m}
                </span>
              ))
            ) : (
              <span className="text-zinc-500">none yet</span>
            )}
          </p>
          {data.runs.length === 0 ? (
            <p className="mt-2 text-zinc-500">No runs yet.</p>
          ) : (
            <ul className="mt-2 max-h-48 space-y-0.5 overflow-y-auto">
              {data.runs.map((a) => (
                <li key={a.id} className="text-zinc-400">
                  <span className="text-zinc-500">{new Date(a.createdAt).toLocaleString()}</span> ·{' '}
                  <RunSummary run={a.run} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  )
}
