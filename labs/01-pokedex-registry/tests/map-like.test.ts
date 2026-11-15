import { describe, expect, it } from 'vitest'
import { HashMap } from '../src/hash-map'
import type { MapLike } from '../src/map-like'

// Written only against the ADT: nothing here knows it's a hash map.
// Until MapLike declares these members, `npx tsc --noEmit` fails on this file.
function registerStarters(dex: MapLike<string, number>): MapLike<string, number> {
  dex.set('Bulbasaur', 1).set('Charmander', 4).set('Squirtle', 7)
  return dex
}

describe('[2.1] MapLike ADT', () => {
  it('HashMap can be used through the MapLike interface', () => {
    const dex = registerStarters(new HashMap<string, number>())
    expect(dex.size).toBe(3)
    expect(dex.get('Charmander')).toBe(4)
    expect(dex.has('Squirtle')).toBe(true)
    expect(dex.delete('Squirtle')).toBe(true)
    expect(dex.has('Squirtle')).toBe(false)
    expect([...dex].sort()).toEqual([
      ['Bulbasaur', 1],
      ['Charmander', 4],
    ])
  })
})
