// ============================================================
// THIS IS YOUR FILE. Challenge 04: Most-Caught Species.
// Pattern: frequency counting, top-k (concepts.md §6.4). Difficulty: medium.
//
// Given a season's catch log, return the k most-caught species, most first.
// Ties on count: alphabetical order (a before b).
// If fewer than k distinct species exist, return all of them.
//
//   mostCaught(['Zubat', 'Geodude', 'Zubat', 'Onix', 'Geodude', 'Zubat'], 2)
//     → ['Zubat', 'Geodude']
//   mostCaught(['Onix', 'Abra'], 5) → ['Abra', 'Onix']
//
// k is a non-negative integer.
// Rules: count with your HashMap (no built-in Map/Set). Sorting an array is fine.
// Target: O(n + d log d) for d distinct species. Be ready to say how to get O(n).
// ============================================================
import { HashMap } from '../src/hash-map'

export function mostCaught(catches: string[], k: number): string[] {
  void HashMap
  void catches
  void k
  throw new Error('TODO(AJ): mostCaught')
}
