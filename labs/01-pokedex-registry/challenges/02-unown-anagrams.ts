// ============================================================
// THIS IS YOUR FILE. Challenge 02: Unown Anagram Groups.
// Pattern: canonical key grouping (concepts.md §6.2, §7). Difficulty: medium.
//
// Unown glyphs spell words on the Ruins of Alph walls. Words that use exactly the same
// letters (same counts) are anagrams and belong to the same inscription group.
//
// Group the words. Output order matters:
//   - groups appear in the order their FIRST word appears in the input
//   - words inside a group keep their input order
//   - every input word appears exactly once (duplicates included)
//
//   groupUnownAnagrams(['tea', 'eat', 'tan', 'ate', 'nat', 'bat'])
//     → [['tea', 'eat', 'ate'], ['tan', 'nat'], ['bat']]
//
// Words are lowercase a–z. The empty string is a valid word.
// Rules: use your HashMap (no built-in Map/Set). Watch §7: your HashMap does not
// iterate in insertion order.
// Target: O(n · m log m) for n words of length up to m. Be ready to say how to drop
// the log factor.
// ============================================================
import { HashMap } from '../src/hash-map'

export function groupUnownAnagrams(words: string[]): string[][] {
  void HashMap
  void words
  throw new Error('TODO(AJ): groupUnownAnagrams')
}
