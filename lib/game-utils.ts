import type { gameConfig as Config } from './config'

export function calculateScore(timeRemaining: number): number {
  const maxScore = 1000
  const timeBonus = Math.floor(timeRemaining / 10)
  return Math.min(maxScore, 500 + timeBonus)
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes} minutos e ${remainingSeconds} segundos`
}

export type GameConfig = typeof Config

export function buildRedirectUrl(config: GameConfig, score: number, time: number, code: string, userId?: string | null): string {
  let redirectUrl = config.redirectUrl
  if (config.includeScoreInRedirect || config.includeTimeInRedirect) {
    redirectUrl += (redirectUrl.includes('?') ? '&' : '?') + 'completed=true'
    if (config.includeScoreInRedirect) {
      redirectUrl += `&score=${score}`
    }
    if (config.includeTimeInRedirect) {
      redirectUrl += `&time=${time}`
    }
    redirectUrl += `&code=${code}`
    if (userId) {
      redirectUrl += `&user_id=${userId}`
    }
  }
  return redirectUrl
}

export function isPuzzleSolved(solution: string, answer: string): boolean {
  return solution.toLowerCase() === answer.toLowerCase()
}
