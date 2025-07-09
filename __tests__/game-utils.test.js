import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { buildRedirectUrl, isPuzzleSolved } from '../dist/game-utils.js'

const mockConfig = {
  redirectUrl: 'https://example.com/complete',
  includeScoreInRedirect: true,
  includeTimeInRedirect: true,
  enableGamiPressTracking: false,
  gamiPressWebhookUrl: '',
}

describe('game utils', () => {
  it('builds redirect url with params', () => {
    const url = buildRedirectUrl(mockConfig, 800, 300, 'ABCD', 'user1')
    assert.equal(
      url,
      'https://example.com/complete?completed=true&score=800&time=300&code=ABCD&user_id=user1',
    )
  })

  it('validates puzzle solution', () => {
    assert.ok(isPuzzleSolved('Code', 'code'))
    assert.ok(!isPuzzleSolved('code', 'wrong'))
  })
})
