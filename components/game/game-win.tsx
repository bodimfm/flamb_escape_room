"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Shield, CheckCircle, ExternalLink } from "lucide-react"
import { gameConfig } from "@/lib/config"
import { useEffect, useState } from "react"
import { calculateScore, formatTime, buildRedirectUrl } from "@/lib/game-utils"

interface GameWinProps {
  code: string
  timeRemaining: number
  onPlayAgain: () => void
  userId?: string | null
}

export default function GameWin({ code, timeRemaining, onPlayAgain, userId = null }: GameWinProps) {
  const [score, setScore] = useState(0)

  useEffect(() => {
    setScore(calculateScore(timeRemaining))
  }, [timeRemaining])

  const handleFinalize = () => {
    const redirectUrl = buildRedirectUrl(
      gameConfig,
      score,
      timeRemaining,
      code,
      userId,
    )

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
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-4">
      <div className="max-w-md w-full bg-red-950 rounded-lg p-8 text-center border border-red-800">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Image src="/images/logo.png" alt="Flamboyant Shopping Logo" width={100} height={100} />
            <div className="absolute -top-2 -right-2 bg-green-600 rounded-full p-1">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-green-500 mb-4">Vazamento Contido!</h2>

        <p className="text-white mb-6">
          Parabéns! Você conseguiu bloquear o vazamento de dados com {formatTime(timeRemaining)} de sobra. Os dados dos
          clientes do {gameConfig.companyName} estão seguros.
        </p>

        <div className="p-4 bg-red-900/50 rounded-lg border border-red-700 mb-6">
          <h3 className="font-semibold text-red-300 mb-2">Código de Segurança:</h3>
          <div className="flex justify-center gap-2 my-3">
            {code.split("").map((digit, index) => (
              <div
                key={index}
                className="w-10 h-10 flex items-center justify-center bg-red-800 rounded-md text-white font-bold"
              >
                {digit}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-green-900/30 rounded-lg border border-green-700 mb-6 text-left">
          <h3 className="font-semibold text-green-300 mb-2 flex items-center">
            <CheckCircle className="mr-2 h-5 w-5" />
            Relatório de Sucesso:
          </h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li>• Invasão detectada e bloqueada</li>
            <li>• Dados dos clientes protegidos</li>
            <li>• Sistema de segurança restaurado</li>
            <li>
              • Pontuação: <strong>{score}</strong> pontos
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
            onClick={handleFinalize}
          >
            {gameConfig.finishButtonText} <ExternalLink className="ml-2 h-4 w-4" />
          </Button>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={onPlayAgain}>
              Jogar Novamente
            </Button>

            <Link href="/">
              <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/30">
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
