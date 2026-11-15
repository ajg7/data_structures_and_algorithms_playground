import { describe, expect, it } from 'vitest'
import { firstDuplicate } from '../../challenges/01-shiny-duplicates'

describe('[2.1] Challenge 01: Shiny Duplicates', () => {
  it('returns the species whose repeat comes first', () => {
    expect(firstDuplicate(['Pidgey', 'Rattata', 'Zubat', 'Rattata', 'Pidgey'])).toBe('Rattata')
  })
  it('first repeat, not first species that has a repeat', () => {
    expect(firstDuplicate(['Abra', 'Onix', 'Onix', 'Abra'])).toBe('Onix')
  })
  it('undefined when nothing repeats, including empty and single logs', () => {
    expect(firstDuplicate(['Bulbasaur', 'Charmander', 'Squirtle'])).toBeUndefined()
    expect(firstDuplicate([])).toBeUndefined()
    expect(firstDuplicate(['Mew'])).toBeUndefined()
  })
  it('is case-sensitive', () => {
    expect(firstDuplicate(['eevee', 'Eevee'])).toBeUndefined()
  })
  it('handles 100,000 catches quickly', () => {
    const log = Array.from({ length: 100_000 }, (_, i) => `mon-${i}`)
    log.push('mon-99998')
    expect(firstDuplicate(log)).toBe('mon-99998')
  }, 2_000)
})
