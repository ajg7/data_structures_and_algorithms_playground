// Challenge index for Lab 01. The app's challenge tracker (milestone 2.3) reads this.
export type Challenge = {
  id: string
  title: string
  pattern: string
  difficulty: 'easy' | 'medium' | 'hard'
  /** concepts.md section(s) the challenge applies */
  concept: string
  file: string
}

export const challenges: Challenge[] = [
  {
    id: '01-shiny-duplicates',
    title: 'Shiny Duplicates',
    pattern: 'Seen-set',
    difficulty: 'easy',
    concept: '§6.1',
    file: 'challenges/01-shiny-duplicates.ts',
  },
  {
    id: '02-unown-anagrams',
    title: 'Unown Anagram Groups',
    pattern: 'Canonical key grouping',
    difficulty: 'medium',
    concept: '§6.2, §7',
    file: 'challenges/02-unown-anagrams.ts',
  },
  {
    id: '03-trade-pair',
    title: 'Trade Pair Finder',
    pattern: 'Complement lookup',
    difficulty: 'easy',
    concept: '§6.3',
    file: 'challenges/03-trade-pair.ts',
  },
  {
    id: '04-most-caught',
    title: 'Most-Caught Species',
    pattern: 'Frequency counting (top-k)',
    difficulty: 'medium',
    concept: '§6.4',
    file: 'challenges/04-most-caught.ts',
  },
  {
    id: '05-dex-streak',
    title: 'Longest Pokédex-Number Streak',
    pattern: 'Membership for runs',
    difficulty: 'medium',
    concept: '§6.5',
    file: 'challenges/05-dex-streak.ts',
  },
]
