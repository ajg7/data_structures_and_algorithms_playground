import { describe, expect, it } from 'vitest'
import { HashMap } from '../src/hash-map'

type Entry = { dex: number; type: string }
const pikachu: Entry = { dex: 25, type: 'Electric' }
const bulbasaur: Entry = { dex: 1, type: 'Grass' }
const charmander: Entry = { dex: 4, type: 'Fire' }

describe('[1.1] Register and look up', () => {
  it('gets what was set', () => {
    const dex = new HashMap<string, Entry>()
    dex.set('Pikachu', pikachu)
    expect(dex.get('Pikachu')).toBe(pikachu)
    expect(dex.has('Pikachu')).toBe(true)
  })

  it('returns undefined / false for missing keys', () => {
    const dex = new HashMap<string, Entry>()
    expect(dex.get('Missingno')).toBeUndefined()
    expect(dex.has('Missingno')).toBe(false)
  })

  it('overwrites on duplicate set', () => {
    const dex = new HashMap<string, Entry>()
    dex.set('Pikachu', pikachu).set('Pikachu', bulbasaur)
    expect(dex.get('Pikachu')).toBe(bulbasaur)
  })

  it('keeps colliding keys apart (separate chaining)', () => {
    const dex = new HashMap<string, Entry>({ hash: () => 0 })
    dex.set('Bulbasaur', bulbasaur).set('Charmander', charmander)
    expect(dex.get('Bulbasaur')).toBe(bulbasaur)
    expect(dex.get('Charmander')).toBe(charmander)
  })

  it('hashes to a non-negative integer and is deterministic', () => {
    const dex = new HashMap<string | number, Entry>()
    for (const key of ['Pikachu', '', 'ñandú', 25, -7]) {
      const h = dex.hash(key)
      expect(Number.isInteger(h)).toBe(true)
      expect(h).toBeGreaterThanOrEqual(0)
      expect(dex.hash(key)).toBe(h)
    }
  })

  it('treats 25 and "25" as different keys', () => {
    const dex = new HashMap<string | number, Entry>()
    dex.set(25, pikachu).set('25', bulbasaur)
    expect(dex.get(25)).toBe(pikachu)
    expect(dex.get('25')).toBe(bulbasaur)
  })
})

describe('[1.2] Release and count', () => {
  it('tracks size across set, overwrite and delete', () => {
    const dex = new HashMap<string, Entry>()
    expect(dex.size).toBe(0)
    dex.set('Pikachu', pikachu).set('Bulbasaur', bulbasaur).set('Pikachu', pikachu)
    expect(dex.size).toBe(2)
    expect(dex.delete('Pikachu')).toBe(true)
    expect(dex.size).toBe(1)
  })

  it('delete on a missing key returns false and leaves size alone', () => {
    const dex = new HashMap<string, Entry>()
    dex.set('Pikachu', pikachu)
    expect(dex.delete('Mew')).toBe(false)
    expect(dex.size).toBe(1)
  })

  it('deletes the right entry inside a collided bucket', () => {
    const dex = new HashMap<string, Entry>({ hash: () => 0 })
    dex.set('Bulbasaur', bulbasaur).set('Charmander', charmander)
    dex.delete('Bulbasaur')
    expect(dex.has('Bulbasaur')).toBe(false)
    expect(dex.get('Charmander')).toBe(charmander)
  })
})

describe('[1.3] Grow the Pokédex', () => {
  it('doubles capacity when the load factor would be exceeded', () => {
    const dex = new HashMap<number, number>({ capacity: 4 })
    for (let i = 0; i < 3; i++) dex.set(i, i) // 3/4 = 0.75, not exceeded
    expect(dex.capacity).toBe(4)
    dex.set(3, 3) // 4/4 > 0.75
    expect(dex.capacity).toBe(8)
  })

  it('keeps every entry reachable after resizing', () => {
    const dex = new HashMap<number, number>({ capacity: 2 })
    for (let i = 0; i < 1000; i++) dex.set(i, i * i)
    expect(dex.size).toBe(1000)
    for (let i = 0; i < 1000; i++) expect(dex.get(i)).toBe(i * i)
  })

  it('stays fast: 100k inserts and lookups', () => {
    const dex = new HashMap<number, number>()
    const start = performance.now()
    for (let i = 0; i < 100_000; i++) dex.set(i, i)
    for (let i = 0; i < 100_000; i++) dex.get(i)
    expect(performance.now() - start).toBeLessThan(1000)
  })
})

describe('[1.4] Walk the registry', () => {
  it('iterates every [key, value] pair exactly once', () => {
    const dex = new HashMap<string, Entry>()
    dex.set('Pikachu', pikachu).set('Bulbasaur', bulbasaur).set('Charmander', charmander)
    const seen = [...dex].sort(([a], [b]) => a.localeCompare(b))
    expect(seen).toEqual([
      ['Bulbasaur', bulbasaur],
      ['Charmander', charmander],
      ['Pikachu', pikachu],
    ])
  })

  it('iterates nothing when empty', () => {
    expect([...new HashMap<string, Entry>()]).toEqual([])
  })
})
