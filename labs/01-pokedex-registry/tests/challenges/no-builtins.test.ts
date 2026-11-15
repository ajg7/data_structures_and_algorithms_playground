import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// Challenges must use your HashMap, not the built-ins.
const dir = join(__dirname, '../../challenges')

describe('[2.1] Challenges use your HashMap', () => {
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.ts'))) {
    it(`${file} avoids built-in Map/Set`, () => {
      const code = readFileSync(join(dir, file), 'utf8').replace(/^\s*\/\/.*$/gm, '')
      expect(code).not.toMatch(/\bnew\s+(Weak)?(Map|Set)\b/)
      expect(code).not.toMatch(/\b(Object|Map)\.groupBy\b/)
    })
  }
})
