import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Shield, Key } from "lucide-react"

export default function Instructions() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gradient-to-b from-red-950 to-red-900">
      <div className="max-w-3xl w-full">
        <Link href="/" className="flex items-center text-red-300 hover:text-red-100 mb-8">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Voltar ao Início
        </Link>

        <div className="flex items-center justify-center mb-8">
          <Image src="/images/logo.png" alt="Flamboyant Shopping Logo" width={120} height={120} />
          <h1 className="text-4xl font-bold text-white ml-4">Como Jogar</h1>
        </div>

        <div className="space-y-8">
          <section className="bg-red-950/70 p-6 rounded-lg shadow-md border border-red-800">
            <h2 className="text-2xl font-semibold text-red-300 mb-4 flex items-center">
              <Shield className="mr-2 h-6 w-6" />
              Objetivo do Jogo
            </h2>
            <p className="text-gray-200">
              Você foi alertado sobre um possível vazamento de dados no sistema do Flamboyant Shopping. Como
              especialista em segurança da informação, sua missão é responder corretamente às perguntas sobre segurança
              de dados e coletar os dígitos do código que bloqueará a brecha de segurança antes que os dados dos
              clientes sejam comprometidos.
            </p>
          </section>

          <section className="bg-red-950/70 p-6 rounded-lg shadow-md border border-red-800">
            <h2 className="text-2xl font-semibold text-red-300 mb-4 flex items-center">
              <Clock className="mr-2 h-6 w-6" />
              Tempo Limitado
            </h2>
            <p className="text-gray-200">
              Você tem apenas <strong>10 minutos</strong> para completar todos os desafios. O cronômetro começará assim
              que você iniciar o jogo. Se o tempo acabar antes de você coletar todos os dígitos do código, o vazamento
              não poderá ser contido e você perderá o jogo.
            </p>
          </section>

          <section className="bg-red-950/70 p-6 rounded-lg shadow-md border border-red-800">
            <h2 className="text-2xl font-semibold text-red-300 mb-4 flex items-center">
              <Key className="mr-2 h-6 w-6" />
              Como Funciona
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-200">
              <li>
                Você enfrentará uma série de perguntas sobre segurança de dados e procedimentos de proteção de
                informações.
              </li>
              <li>Cada resposta correta revelará um dígito do código final.</li>
              <li>Respostas incorretas não reduzem seu tempo, mas você precisará tentar novamente para avançar.</li>
              <li>Após coletar todos os dígitos, você poderá inserir o código completo para bloquear o vazamento.</li>
              <li>Ao concluir o jogo com sucesso, clique em "Finalizar" para registrar sua conquista.</li>
            </ul>
          </section>

          <div className="flex justify-center mt-8">
            <Link href="/game">
              <Button className="px-8 py-4 text-lg bg-red-600 hover:bg-red-700 text-white">Iniciar Missão</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
