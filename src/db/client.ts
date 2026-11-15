// Server-only. Load it with a dynamic import inside server fn handlers (like testQueue.ts),
// so better-sqlite3 never ends up in the browser bundle.
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import * as schema from './schema'

const DATA_DIR = path.resolve(process.cwd(), 'data')
mkdirSync(DATA_DIR, { recursive: true })

const sqlite = new Database(path.join(DATA_DIR, 'dsa.sqlite'))
sqlite.pragma('journal_mode = WAL')

export const db = drizzle(sqlite, { schema })

// Apply any pending migrations from ./drizzle on first load. Single user, local only,
// so migrating at startup is simpler than a separate deploy step.
migrate(db, { migrationsFolder: path.resolve(process.cwd(), 'drizzle') })
