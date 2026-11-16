import { index, integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

// Append-only. Every test run, quiz, explain-it and interview is one row, and nothing is
// ever updated. "Passed", mastery and the retry list are derived from these rows, so
// there is deliberately no status or progress column anywhere.
export const attempts = sqliteTable(
  'attempts',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    kind: text('kind', { enum: ['test-run', 'quiz', 'explain-it', 'interview'] }).notNull(),
    lab: text('lab').notNull(), // "01"
    milestone: text('milestone'), // "1.2"; null when the attempt covers the whole lab
    score: real('score'), // 0..1
    confidence: integer('confidence'), // 1..5, self-rated before feedback; null for test runs
    payload: text('payload', { mode: 'json' }).$type<unknown>().notNull(),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  },
  (t) => [index('attempts_lab_kind_idx').on(t.lab, t.kind)],
)

export type Attempt = typeof attempts.$inferSelect
export type NewAttempt = typeof attempts.$inferInsert
