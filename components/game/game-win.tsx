"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Shield, CheckCircle, ExternalLink } from "lucide-react"
import { gameConfig } from "@/lib/config"
import { useEffect, useState } from "react"

interface GameWinProps {
  code: string
  timeRemaining: number
  onPlayAgain: () => void
  userId?: string | null
  totalPoints?: number
}

export default function GameWin({ code, timeRemaining, onPlayAgain, userId = null, totalPoints = 0 }: GameWinProps) {
  const [score, setScore] = useState(0)

  useEffect(() => {
    // Calculate score based on time remaining
    const calculateScore = (time: number) => {
      const maxScore = 1000
      const timeBonus = Math.floor(time / 10)
      return Math.min(maxScore, 500 + timeBonus)
    }

    setScore(calculateScore(timeRemaining))
  }, [timeRemaining])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes} minutos e ${remainingSeconds} segundos`
  }

  const handleFinalize = () => {
    // Build the redirect URL with parameters
    let redirectUrl = gameConfig.redirectUrl

    // Add query parameters if configured
    if (gameConfig.includeScoreInRedirect || gameConfig.includeTimeInRedirect) {
      redirectUrl += (redirectUrl.includes("?") ? "&" : "?") + "completed=true"

      if (gameConfig.includeScoreInRedirect) {
        redirectUrl += `&score=${score}`
      }

      if (gameConfig.includeTimeInRedirect) {
        redirectUrl += `&time=${timeRemaining}`
      }

      // Add the code
      redirectUrl += `&code=${code}`

      // Add user ID if available
      if (userId) {
        redirectUrl += `&user_id=${userId}`
      }
    }

    // Track completion with GamiPress if enabled
    if (gameConfig.enableGamiPressTracking && gameConfig.gamiPressWebhookUrl) {
      fetch(gameConfig.gamiPressWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: "escape_room_completed",
          user_id: userId || "anonymous",
          score: score,
          time_remaining: timeRemaining,
          code: code,
        }),
      })
        .then(() => {
          // Redirect after tracking
          window.location.href = redirectUrl
        })
        .catch(() => {
          // Redirect even if tracking fails
          window.location.href = redirectUrl
        })
    } else {
      // Redirect directly if tracking is not enabled
      window.location.href = redirectUrl
    }
  }

  return (
    <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-50 p-4">
      <div className="max-w-lg w-full game-card rounded-2xl p-8 text-center shadow-2xl">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Image
              src="/images/logo.png"
              alt="Flamboyant Shopping Logo"
              width={120}
              height={120}
              className="drop-shadow-2xl"
            />
            <div className="absolute -top-3 -right-3 bg-green-600 rounded-full p-2 shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl -z-10"></div>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-green-400 mb-6 game-text-shadow">🎉 Vazamento Contido!</h2>

        <p className="text-white mb-8 text-lg leading-relaxed">
          <strong className="text-green-300">Parabéns!</strong> Você conseguiu bloquear o vazamento de dados com{" "}
          <strong className="text-yellow-300">{formatTime(timeRemaining)}</strong> de sobra. Os dados dos clientes do{" "}
          {gameConfig.companyName} estão seguros.
        </p>

        <div className="p-6 bg-red-900/60 rounded-xl border-2 border-red-700 mb-8">
          <h3 className="font-bold text-red-200 mb-4 text-xl">🔐 Código de Segurança:</h3>
          <div className="flex justify-center gap-3 my-4">
            {code.split("").map((digit, index) => (
              <div
                key={index}
                className="w-14 h-14 flex items-center justify-center bg-red-700 rounded-lg text-white font-bold text-xl border-2 border-red-500 shadow-lg"
              >
                {digit}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-green-900/40 rounded-xl border-2 border-green-600 mb-8 text-left">
          <h3 className="font-bold text-green-300 mb-4 flex items-center text-xl">
            <CheckCircle className="mr-3 h-6 w-6" />📊 Relatório de Sucesso:
          </h3>
          <ul className="space-y-3 text-gray-100 text-lg">
            <li className="flex items-center">
              <span className="text-green-400 mr-3">✅</span>
              Invasão detectada e bloqueada
            </li>
            <li className="flex items-center">
              <span className="text-green-400 mr-3">✅</span>
              Dados dos clientes protegidos
            </li>
            <li className="flex items-center">
              <span className="text-green-400 mr-3">✅</span>
              Sistema de segurança restaurado
            </li>
            <li className="flex items-center">
              <span className="text-yellow-400 mr-3">🏆</span>
              Pontuação: <strong className="text-yellow-300 ml-2">{score} pontos</strong>
            </li>
            <li className="flex items-center">
              <span className="text-yellow-400 mr-3">🏆</span>
              Pontuação Final: <strong className="text-yellow-300 ml-2">{totalPoints} pontos</strong>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center text-xl py-6 game-button border-2 border-green-500 hover:border-green-400"
            onClick={handleFinalize}
          >
            🎯 {gameConfig.finishButtonText} <ExternalLink className="ml-2 h-5 w-5" />
          </Button>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-red-600 hover:bg-red-700 text-white game-button px-6 py-3" onClick={onPlayAgain}>
              🔄 Jogar Novamente
            </Button>

            <Link href="/">
              <Button
                variant="outline"
                className="border-2 border-red-600 text-red-300 hover:bg-red-900/50 hover:text-white game-button px-6 py-3 bg-transparent"
              >
                🏠 Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
