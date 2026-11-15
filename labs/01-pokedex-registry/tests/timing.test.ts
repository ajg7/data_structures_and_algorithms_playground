import { describe, expect, it } from 'vitest'
import { HashMap } from '../src/hash-map'

// Used by the 2.1 checkpoint: make hash() return a constant, predict, then run
//   npx vitest run labs/01-pokedex-registry -t "Timing"
// and read the printed times.

function timeInserts(n: number): number {
  const dex = new HashMap<string, number>()
  const start = performance.now()
  for (let i = 0; i < n; i++) dex.set(`trainer-${i}`, i)
  for (let i = 0; i < n; i++) dex.get(`trainer-${i}`)
  return performance.now() - start
}

describe('[2.1] Timing', () => {
  it('set + get of n keys grows roughly linearly', () => {
    timeInserts(2_000) // warm up the JIT so the first measurement isn't inflated
    const small = timeInserts(5_000)
    const large = timeInserts(20_000)
    console.log(
      `n=5,000: ${small.toFixed(1)}ms   n=20,000: ${large.toFixed(1)}ms   ` +
        `ratio ${(large / small).toFixed(1)}x for 4x the keys`,
    )
    expect(large).toBeLessThan(1_000)
  })
})
