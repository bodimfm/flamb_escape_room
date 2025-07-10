import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Shield, Key } from "lucide-react"

export default function Instructions() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gradient-to-br from-red-950 via-red-900 to-red-800">
      <div className="max-w-4xl w-full">
        <Link href="/" className="flex items-center text-red-200 hover:text-white mb-8 transition-colors font-semibold">
          <ArrowLeft className="mr-2 h-5 w-5" />← Voltar ao Início
        </Link>

        <div className="flex items-center justify-center mb-12">
          <div className="relative mr-6">
            <Image
              src="/images/logo.png"
              alt="Flamboyant Shopping Logo"
              width={120}
              height={120}
              className="drop-shadow-2xl"
            />
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl -z-10"></div>
          </div>
          <h1 className="text-5xl font-bold text-white game-text-shadow">📖 Como Jogar</h1>
        </div>

        <div className="space-y-8">
          <section className="game-card p-8 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-red-200 mb-6 flex items-center game-text-shadow">
              <Shield className="mr-3 h-8 w-8 text-red-400" />🎯 Objetivo do Jogo
            </h2>
            <p className="text-gray-100 text-lg leading-relaxed">
              Você foi alertado sobre um possível vazamento de dados no sistema do Flamboyant Shopping. Como
              especialista em segurança da informação, sua missão é responder corretamente às perguntas sobre segurança
              de dados e coletar os dígitos do código que bloqueará a brecha de segurança antes que os dados dos
              clientes sejam comprometidos.
            </p>
          </section>

          <section className="game-card p-8 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-red-200 mb-6 flex items-center game-text-shadow">
              <Clock className="mr-3 h-8 w-8 text-yellow-400" />⏰ Tempo Limitado
            </h2>
            <p className="text-gray-100 text-lg leading-relaxed">
              Você tem apenas <strong className="text-red-300 text-xl">10 minutos</strong> para completar todos os
              desafios. O cronômetro começará assim que você iniciar o jogo. Se o tempo acabar antes de você coletar
              todos os dígitos do código, o vazamento não poderá ser contido e você perderá o jogo.
            </p>
          </section>

          <section className="game-card p-8 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-red-200 mb-6 flex items-center game-text-shadow">
              <Key className="mr-3 h-8 w-8 text-green-400" />🎮 Como Funciona
            </h2>
            <ul className="list-none space-y-4 text-gray-100 text-lg">
              <li className="flex items-start">
                <span className="text-red-400 mr-4 text-2xl">1️⃣</span>
                <span>
                  Você enfrentará uma série de <strong className="text-red-300">5 perguntas</strong> sobre segurança de
                  dados e procedimentos de proteção de informações.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-4 text-2xl">2️⃣</span>
                <span>
                  Cada resposta correta revelará um <strong className="text-green-300">dígito do código final</strong>.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-4 text-2xl">3️⃣</span>
                <span>
                  Respostas incorretas não reduzem seu tempo, mas você precisará tentar novamente para avançar.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-4 text-2xl">4️⃣</span>
                <span>
                  Após coletar todos os dígitos, você poderá inserir o código completo para bloquear o vazamento.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-4 text-2xl">5️⃣</span>
                <span>
                  Ao concluir o jogo com sucesso, clique em <strong className="text-green-300">"Finalizar"</strong> para
                  registrar sua conquista.
                </span>
              </li>
            </ul>
          </section>

          <div className="flex justify-center mt-12">
            <Link href="/game">
              <Button className="px-12 py-8 text-2xl bg-red-600 hover:bg-red-700 text-white game-button border-2 border-red-500 hover:border-red-400">
                🚀 Iniciar Missão
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
