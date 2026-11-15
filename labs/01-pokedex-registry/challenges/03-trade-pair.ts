// ============================================================
// THIS IS YOUR FILE. Challenge 03: Trade Pair Finder.
// Pattern: complement lookup (concepts.md §6.3). Difficulty: easy.
//
// Your box holds Pokémon with trade values (unsorted, may repeat, may be negative).
// A trader wants exactly `target` value from TWO different Pokémon.
//
// Return the indices [i, j] with i < j and values[i] + values[j] === target.
// If several pairs work, return the one with the smallest j; for that j, the smallest i.
// Return undefined if no pair works. A Pokémon can't be paired with itself.
//
//   findTradePair([3, 9, 4, 5, 6], 10) → [2, 4]   (4 + 6; j = 4 is the first j that works)
//   findTradePair([5, 5], 10)          → [0, 1]
//   findTradePair([5], 10)             → undefined
//
// Rules: use your HashMap (no built-in Map/Set, no nested loops).
// Target: one pass, O(n) time.
// ============================================================
import { HashMap } from '../src/hash-map'

export function findTradePair(values: number[], target: number): [number, number] | undefined {
  void HashMap
  void values
  void target
  throw new Error('TODO(AJ): findTradePair')
}
