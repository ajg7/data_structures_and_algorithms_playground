import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'DSA Playground' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-zinc-950 text-zinc-100">
        <nav className="flex gap-4 border-b border-zinc-800 px-8 py-3 text-sm">
          <Link to="/" className="font-semibold">
            DSA Playground
          </Link>
          <Link to="/labs/$labId" params={{ labId: '01' }} className="text-zinc-400 [&.active]:text-zinc-100">
            Lab 01
          </Link>
        </nav>
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
