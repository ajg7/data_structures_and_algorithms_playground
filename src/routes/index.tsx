import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">DSA Playground</h1>
      <p className="mt-4 text-zinc-400">
        Build the data structures yourself, then solve the linked LeetCode problems.
      </p>
      <Link
        to="/labs/$labId"
        params={{ labId: '01' }}
        className="mt-6 inline-block rounded bg-indigo-600 px-4 py-2 font-medium hover:bg-indigo-500"
      >
        Start Lab 01: Pokédex Registry
      </Link>
    </main>
  )
}
