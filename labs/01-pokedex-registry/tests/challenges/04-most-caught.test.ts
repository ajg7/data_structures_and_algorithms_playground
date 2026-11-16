import { describe, expect, it } from 'vitest'
import { mostCaught } from '../../challenges/04-most-caught'

describe('[2.1] Challenge 04: Most-Caught Species', () => {
  it('returns the k most frequent, most first', () => {
    expect(mostCaught(['Zubat', 'Geodude', 'Zubat', 'Onix', 'Geodude', 'Zubat'], 2)).toEqual([
      'Zubat',
      'Geodude',
    ])
  })
  it('breaks ties alphabetically', () => {
    expect(mostCaught(['Onix', 'Abra', 'Mew', 'Abra', 'Onix'], 3)).toEqual(['Abra', 'Onix', 'Mew'])
  })
  it('returns everything when k exceeds distinct species', () => {
    expect(mostCaught(['Onix', 'Abra'], 5)).toEqual(['Abra', 'Onix'])
  })
  it('k = 0 and empty logs give []', () => {
    expect(mostCaught(['Onix'], 0)).toEqual([])
    expect(mostCaught([], 3)).toEqual([])
  })
  it('handles 100,000 catches quickly', () => {
    const log = Array.from({ length: 100_000 }, (_, i) => `mon-${i % 1_000}`)
    log.push('mon-500')
    expect(mostCaught(log, 2)).toEqual(['mon-500', 'mon-0'])
  }, 2_000)
})
