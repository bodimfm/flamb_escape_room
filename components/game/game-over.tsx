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
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-4">
      <div className="max-w-md w-full bg-red-950 rounded-lg p-8 text-center border border-red-800">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Image src="/images/logo.png" alt="Flamboyant Shopping Logo" width={100} height={100} />
            <div className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-red-500 mb-4">Vazamento Crítico!</h2>

        <p className="text-white mb-6">
          O tempo acabou e o invasor conseguiu extrair os dados dos clientes. O vazamento não pôde ser contido a tempo.
        </p>

        <div className="p-4 bg-red-900/50 rounded-lg border border-red-700 mb-6 text-left">
          <h3 className="font-semibold text-red-300 mb-2">Relatório de Incidente:</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li>• Dados de clientes comprometidos</li>
            <li>• Sistema de segurança violado</li>
            <li>• Necessária notificação às autoridades</li>
            <li>• Recomendada auditoria completa do sistema</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={onTryAgain}>
            Tentar Novamente
          </Button>

          <Link href="/">
            <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/30">
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
