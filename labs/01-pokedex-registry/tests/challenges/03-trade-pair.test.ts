import { describe, expect, it } from 'vitest'
import { findTradePair } from '../../challenges/03-trade-pair'

describe('[2.1] Challenge 03: Trade Pair Finder', () => {
  it('finds the pair with the smallest j', () => {
    expect(findTradePair([3, 9, 4, 5, 6], 10)).toEqual([2, 4])
  })
  it('allows equal values from two different Pokémon', () => {
    expect(findTradePair([5, 5], 10)).toEqual([0, 1])
  })
  it('never pairs a Pokémon with itself', () => {
    expect(findTradePair([5], 10)).toBeUndefined()
    expect(findTradePair([5, 1], 10)).toBeUndefined()
  })
  it('for the smallest j, picks the smallest i', () => {
    expect(findTradePair([2, 2, 8], 10)).toEqual([0, 2])
  })
  it('handles negatives and zero', () => {
    expect(findTradePair([-3, 7, 0, 13], 10)).toEqual([0, 3])
    expect(findTradePair([0, 4, 0], 0)).toEqual([0, 2])
  })
  it('undefined on empty input', () => {
    expect(findTradePair([], 10)).toBeUndefined()
  })
  it('handles 100,000 values quickly', () => {
    const values = Array.from({ length: 100_000 }, (_, i) => i * 2) // 0, 2, 4, ...
    expect(findTradePair(values, 199_997)).toBeUndefined() // odd target, all even values
    expect(findTradePair(values, 199_994)).toEqual([49_998, 49_999])
  }, 2_000)
})
