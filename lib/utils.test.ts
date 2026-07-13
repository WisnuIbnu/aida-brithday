import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('ignores falsy values', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b')
  })

  it('resolves conflicting Tailwind classes (last wins)', () => {
    // tailwind-merge: later utility overrides earlier conflicting one
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })
})
