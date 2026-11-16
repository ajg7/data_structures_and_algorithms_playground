// ============================================================
// THIS IS YOUR FILE. Challenge 01: Shiny Duplicates.
// Pattern: seen-set (concepts.md §6.1). Difficulty: easy.
//
// A trainer logs every Pokémon they catch, in order. Catching a species you already
// have means it's a duplicate, and maybe a shiny worth checking.
//
// Return the FIRST species caught a second time: the one whose repeat appears
// earliest in the log. Return undefined if no species repeats.
//
//   firstDuplicate(['Pidgey', 'Rattata', 'Zubat', 'Rattata', 'Pidgey']) → 'Rattata'
//   firstDuplicate(['Mew']) → undefined
//
// Rules: use your HashMap (no built-in Map/Set, no nested loops over the log).
// Target: O(n) time. Be ready to state the space cost.
// ============================================================
import { HashMap } from '../src/hash-map'

export function firstDuplicate(caught: string[]): string | undefined {
  void HashMap
  void caught
  throw new Error('TODO(AJ): firstDuplicate')
}
