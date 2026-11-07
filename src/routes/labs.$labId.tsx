import { createFileRoute } from '@tanstack/react-router'
import { getLab } from '#/server/labs'

export const Route = createFileRoute('/labs/$labId')({
  // The loader decides WHEN (on SSR, and before client-side navigation); getLab decides WHERE (server).
  loader: ({ params }) => getLab({ data: params.labId }),
  component: LabPage,
  notFoundComponent: () => <main className="p-8">No such lab.</main>,
})

function LabPage() {
  const lab = Route.useLoaderData()
  return (
    <main className="mx-auto max-w-3xl p-8">
      <p className="text-xs uppercase tracking-wide text-zinc-500">labs/{lab.dir}</p>
      {/* Safe: html is rendered from our own repo files, not user input. */}
      <article className="lab-prose mt-4" dangerouslySetInnerHTML={{ __html: lab.html }} />
    </main>
  )
}
