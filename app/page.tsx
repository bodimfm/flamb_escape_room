import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-br from-red-950 via-red-900 to-red-800">
      <div className="max-w-4xl w-full text-center space-y-8 py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="relative mb-6">
            <Image
              src="/images/logo.png"
              alt="Flamboyant Shopping Logo"
              width={200}
              height={200}
              className="drop-shadow-2xl"
            />
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl -z-10"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white game-text-shadow mb-4">Escape Room</h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-red-200 game-text-shadow mb-6">Vazamento de Dados</h2>
          <p className="mt-6 text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed game-text-shadow">
            Você descobriu um potencial vazamento de dados no Flamboyant Shopping. Resolva os desafios para obter o
            código que bloqueia a brecha antes que o tempo acabe!
          </p>
        </div>

        <div className="space-y-6 mt-16">
          <Link href="/game">
            <Button className="px-12 py-8 text-2xl bg-red-600 hover:bg-red-700 text-white game-button border-2 border-red-500 hover:border-red-400">
              🚨 Começar Missão
            </Button>
          </Link>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
            <Link href="/instructions">
              <Button
                variant="outline"
                className="px-8 py-6 text-xl border-2 border-red-400 hover:bg-red-800/50 text-red-100 hover:text-white game-button bg-transparent hover:border-red-300"
              >
                📖 Como Jogar
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 p-8 game-card rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-red-200 mb-6 game-text-shadow">🎯 Sua Missão</h2>
          <p className="text-gray-100 mb-6 text-lg leading-relaxed">
            Um hacker está tentando acessar o banco de dados de clientes do Flamboyant Shopping. Como especialista em
            segurança, você precisa:
          </p>
          <ul className="text-left list-none space-y-4 text-gray-100 text-lg max-w-2xl mx-auto">
            <li className="flex items-center">
              <span className="text-red-400 mr-3 text-xl">🔍</span>
              Responder corretamente às perguntas de segurança
            </li>
            <li className="flex items-center">
              <span className="text-red-400 mr-3 text-xl">🛡️</span>
              Proteger os dados pessoais dos clientes do shopping
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
