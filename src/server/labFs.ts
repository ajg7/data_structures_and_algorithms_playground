// Server-only filesystem helpers. Import them only from server fn handlers or other
// server-only modules (testQueue.ts), so Start can strip them from the client bundle.
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { notFound } from '@tanstack/react-router'

export const LABS_DIR = path.resolve(process.cwd(), 'labs')

// "01" -> "01-pokedex-registry", or 404.
export const resolveLabDir = async (labId: string): Promise<string> => {
  const dir = (await readdir(LABS_DIR)).find((d) => d.startsWith(`${labId}-`))
  if (!dir) throw notFound()
  return dir
}
