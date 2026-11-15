import { describe, expect, it } from 'vitest'
import { groupUnownAnagrams } from '../../challenges/02-unown-anagrams'

describe('[2.1] Challenge 02: Unown Anagram Groups', () => {
  it('groups anagrams in first-appearance order', () => {
    expect(groupUnownAnagrams(['tea', 'eat', 'tan', 'ate', 'nat', 'bat'])).toEqual([
      ['tea', 'eat', 'ate'],
      ['tan', 'nat'],
      ['bat'],
    ])
  })
  it('letter counts must match, not just the set of letters', () => {
    expect(groupUnownAnagrams(['aab', 'abb', 'aba'])).toEqual([['aab', 'aba'], ['abb']])
  })
  it('keeps duplicates and the empty word', () => {
    expect(groupUnownAnagrams(['', 'ab', '', 'ba', 'ab'])).toEqual([
      ['', ''],
      ['ab', 'ba', 'ab'],
    ])
  })
  it('empty input gives no groups', () => {
    expect(groupUnownAnagrams([])).toEqual([])
  })
  it('order survives many groups (your HashMap resizes along the way)', () => {
    const words: string[] = []
    for (let i = 0; i < 200; i++) {
      const w = 'unown' + String.fromCharCode(97 + (i % 26)).repeat(1 + Math.floor(i / 26))
      words.push(w, [...w].reverse().join(''))
    }
    const groups = groupUnownAnagrams(words)
    expect(groups).toHaveLength(200)
    groups.forEach((g, i) => expect(g).toEqual([words[2 * i], words[2 * i + 1]]))
  })
})
