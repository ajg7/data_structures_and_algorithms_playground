import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { createServerFn } from '@tanstack/react-start'
import { notFound } from '@tanstack/react-router'
import { marked } from 'marked'

const LABS_DIR = path.resolve(process.cwd(), 'labs')

export type LabPage = { labId: string; dir: string; html: string }

// Runs only on the server: fs and marked never ship to the browser.
export const getLab = createServerFn({ method: 'GET' })
  .validator((labId: unknown) => {
    // Trust boundary: a URL param must never become an arbitrary path.
    if (typeof labId !== 'string' || !/^\d{2}$/.test(labId)) throw notFound()
    return labId
  })
  .handler(async ({ data: labId }): Promise<LabPage> => {
    const dir = (await readdir(LABS_DIR)).find((d) => d.startsWith(`${labId}-`))
    if (!dir) throw notFound()
    const markdown = await readFile(path.join(LABS_DIR, dir, 'README.md'), 'utf8')
    return { labId, dir, html: await marked.parse(markdown) }
  })
