import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import IntegrationSummary from "@/components/integration-summary"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-red-950 to-red-900">
      <div className="max-w-4xl w-full text-center space-y-8 py-12">
        <div className="flex flex-col items-center justify-center">
          <Image src="/images/logo.png" alt="Flamboyant Shopping Logo" width={200} height={200} className="mb-4" />
          <h1 className="text-4xl md:text-6xl font-bold text-white">Escape Room</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-red-300 mt-2">Vazamento de Dados</h2>
          <p className="mt-6 text-xl text-gray-200 max-w-2xl mx-auto">
            Você descobriu um potencial vazamento de dados no Flamboyant Shopping. Resolva os desafios para obter o
            código que bloqueia a brecha antes que o tempo acabe!
          </p>
        </div>

        <div className="space-y-4 mt-12">
          <Link href="/game">
            <Button className="px-8 py-6 text-xl bg-red-600 hover:bg-red-700 text-white">Começar Missão</Button>
          </Link>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
            <Link href="/instructions">
              <Button variant="outline" className="px-8 py-6 text-xl border-red-400 text-red-200 hover:bg-red-800">
                Como Jogar
              </Button>
            </Link>

            <Link href="/integration">
              <Button variant="outline" className="px-8 py-6 text-xl border-red-400 text-red-200 hover:bg-red-800">
                Instruções de Integração
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 p-6 bg-red-950/70 rounded-lg border border-red-800">
          <h2 className="text-2xl font-semibold text-red-300 mb-4">Sua Missão</h2>
          <p className="text-gray-200 mb-4">
            Um hacker está tentando acessar o banco de dados de clientes do Flamboyant Shopping. Como especialista em
            segurança, você precisa:
          </p>
          <ul className="text-left list-disc list-inside space-y-2 text-gray-200">
            <li>Responder corretamente às perguntas de segurança</li>
            <li>Coletar os dígitos do código de bloqueio</li>
            <li>Ativar o protocolo de segurança antes que o tempo acabe</li>
            <li>Proteger os dados pessoais dos clientes do shopping</li>
          </ul>
        </div>

        {/* Integration Summary Card */}
        <IntegrationSummary />
      </div>
    </main>
  )
}
