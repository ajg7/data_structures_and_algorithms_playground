import { describe, expect, it } from 'vitest'
import { longestDexStreak } from '../../challenges/05-dex-streak'

describe('[2.1] Challenge 05: Longest Pokédex-Number Streak', () => {
  it('finds the longest consecutive run in unsorted input', () => {
    expect(longestDexStreak([100, 4, 200, 1, 3, 2])).toBe(4)
  })
  it('ignores repeats', () => {
    expect(longestDexStreak([7, 7, 7])).toBe(1)
    expect(longestDexStreak([1, 2, 2, 3])).toBe(3)
  })
  it('empty input is 0', () => {
    expect(longestDexStreak([])).toBe(0)
  })
  it('handles negatives', () => {
    expect(longestDexStreak([-1, 1, 0, -2, 5])).toBe(4)
  })
  it('picks the longer of two runs', () => {
    expect(longestDexStreak([10, 11, 1, 2, 3, 12, 13, 14])).toBe(5)
  })
  it('handles 100,000 numbers quickly', () => {
    // 7919 is prime and shares no factor with 100,000, so this shuffles 0..99,999.
    const nums = Array.from({ length: 100_000 }, (_, i) => (i * 7919) % 100_000)
    expect(longestDexStreak(nums)).toBe(100_000)
  }, 2_000)
})
