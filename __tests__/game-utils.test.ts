import { describe, it, expect } from 'vitest'
import { buildRedirectUrl, isPuzzleSolved } from '../lib/game-utils'

const mockConfig = {
  redirectUrl: 'https://example.com/complete',
  includeScoreInRedirect: true,
  includeTimeInRedirect: true,
  enableGamiPressTracking: false,
  gamiPressWebhookUrl: '',
} as const

describe('game utils', () => {
  it('builds redirect url with params', () => {
    const url = buildRedirectUrl(mockConfig, 800, 300, 'ABCD', 'user1')
    expect(url).toBe(
      'https://example.com/complete?completed=true&score=800&time=300&code=ABCD&user_id=user1',
    )
  })

  it('validates puzzle solution', () => {
    expect(isPuzzleSolved('Code', 'code')).toBe(true)
    expect(isPuzzleSolved('code', 'wrong')).toBe(false)
  })
})
