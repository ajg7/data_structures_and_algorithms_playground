import { describe, expect, it } from 'vitest'
import type { RunResult, TestResult } from '#/server/runTests'
import { milestoneOf, passedMilestones } from './progress'

const t = (name: string, status: TestResult['status']): TestResult => ({ name, status, durationMs: 1 })
const ok = (...results: TestResult[]): RunResult => ({ status: 'ok', labId: '01', results, ranAt: 0, durationMs: 0 })

describe('milestoneOf', () => {
  it('reads the [N.N] prefix', () => {
    expect(milestoneOf('[1.2] HashMap > grows')).toBe('1.2')
    expect(milestoneOf('[1.10] x')).toBe('1.10')
    expect(milestoneOf('no tag')).toBeNull()
  })
})

describe('passedMilestones', () => {
  it('passes a milestone only when all its tests pass in one run', () => {
    const run = ok(t('[1.1] a', 'passed'), t('[1.1] b', 'passed'), t('[1.2] a', 'passed'), t('[1.2] b', 'failed'))
    expect(passedMilestones([run])).toEqual(['1.1'])
  })

  it('a pass in any run counts, a timeout never does', () => {
    const early = ok(t('[1.2] a', 'passed'))
    const later = ok(t('[1.2] a', 'failed'))
    const timeout: RunResult = { status: 'timeout', labId: '01', limitMs: 10_000, ranAt: 0, durationMs: 10_000 }
    expect(passedMilestones([later, early, timeout])).toEqual(['1.2'])
    expect(passedMilestones([timeout])).toEqual([])
  })

  it('sorts numerically', () => {
    expect(passedMilestones([ok(t('[1.10] a', 'passed'), t('[1.2] a', 'passed'))])).toEqual(['1.2', '1.10'])
  })
})
