import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { createServerFn } from '@tanstack/react-start'
import { notFound } from '@tanstack/react-router'
import { marked } from 'marked'
import { LABS_DIR, resolveLabDir } from './labFs'

export type LabPage = { labId: string; dir: string; html: string }

// Trust boundary: a URL param must never become an arbitrary path.
// Pure, so it's safe to share with other server fns' validators.
export const validateLabId = (labId: unknown): string => {
  if (typeof labId !== 'string' || !/^\d{2}$/.test(labId)) throw notFound()
  return labId
}

// Runs only on the server: fs and marked never ship to the browser.
export const getLab = createServerFn({ method: 'GET' })
  .validator(validateLabId)
  .handler(async ({ data: labId }): Promise<LabPage> => {
    const dir = await resolveLabDir(labId)
    const markdown = await readFile(path.join(LABS_DIR, dir, 'README.md'), 'utf8')
    return { labId, dir, html: await marked.parse(markdown) }
  })
