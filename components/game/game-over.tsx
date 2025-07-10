"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"

interface GameOverProps {
  onTryAgain: () => void
}

export default function GameOver({ onTryAgain }: GameOverProps) {
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
            <div className="absolute -top-3 -right-3 bg-red-600 rounded-full p-2 shadow-lg">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl -z-10"></div>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-red-400 mb-6 game-text-shadow">💥 Vazamento Crítico!</h2>

        <p className="text-white mb-8 text-lg leading-relaxed">
          O tempo acabou e o invasor conseguiu extrair os dados dos clientes. O vazamento não pôde ser contido a tempo.
        </p>

        <div className="p-6 bg-red-900/60 rounded-xl border-2 border-red-700 mb-8 text-left">
          <h3 className="font-bold text-red-300 mb-4 text-xl">📋 Relatório de Incidente:</h3>
          <ul className="space-y-3 text-gray-100 text-lg">
            <li className="flex items-center">
              <span className="text-red-400 mr-3">❌</span>
              Dados de clientes comprometidos
            </li>
            <li className="flex items-center">
              <span className="text-red-400 mr-3">❌</span>
              Sistema de segurança violado
            </li>
            <li className="flex items-center">
              <span className="text-yellow-400 mr-3">⚠️</span>
              Necessária notificação às autoridades
            </li>
            <li className="flex items-center">
              <span className="text-yellow-400 mr-3">⚠️</span>
              Recomendada auditoria completa do sistema
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-red-600 hover:bg-red-700 text-white game-button px-8 py-4 text-lg" onClick={onTryAgain}>
            🔄 Tentar Novamente
          </Button>

          <Link href="/">
            <Button
              variant="outline"
              className="border-2 border-red-600 text-red-300 hover:bg-red-900/50 hover:text-white game-button px-8 py-4 text-lg bg-transparent"
            >
              🏠 Voltar ao Início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
