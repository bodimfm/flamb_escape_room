import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Target, Trophy, Music, Volume2, Star, Sparkles } from "lucide-react"

export default function Instructions() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gradient-to-br from-red-950 via-red-900 to-red-800">
      <div className="max-w-4xl w-full">
        {/* Animated Back Button */}
        <Link
          href="/"
          className="flex items-center text-red-200 hover:text-white mb-8 transition-all duration-300 font-semibold group hover:translate-x-1"
        >
          <ArrowLeft className="mr-2 h-5 w-5 group-hover:animate-pulse" />← Voltar ao Início
        </Link>

        {/* Animated Header */}
        <div className="flex items-center justify-center mb-12 group">
          <div className="relative mr-6 transition-transform duration-500 group-hover:scale-110">
            <Image
              src="/images/logo.png"
              alt="Flamboyant Shopping Logo"
              width={120}
              height={120}
              className="drop-shadow-2xl transition-all duration-500 group-hover:drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]"
            />
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl -z-10 transition-all duration-500 group-hover:bg-red-400/30 group-hover:blur-3xl"></div>
            {/* Floating sparkles animation */}
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <h1 className="text-5xl font-bold text-white game-text-shadow transition-all duration-300 hover:text-yellow-100 hover:scale-105">
            📖 Como Jogar
          </h1>
        </div>

        <div className="space-y-8">
          {/* Objetivo do Jogo - Animated Card */}
          <section className="game-card p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-[1.02] hover:bg-red-800/60 group">
            <h2 className="text-3xl font-bold text-yellow-300 mb-6 flex items-center game-text-shadow transition-all duration-300 group-hover:text-yellow-200">
              <Target className="mr-3 h-8 w-8 text-yellow-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              🎯 Objetivo do Desafio
            </h2>
            <p className="text-gray-100 text-lg leading-relaxed font-medium transition-all duration-300 group-hover:text-white">
              Você foi alertado sobre um possível vazamento de dados no sistema do Flamboyant Shopping. Como
              especialista em segurança da informação, sua missão é demonstrar seus conhecimentos respondendo
              corretamente às perguntas sobre proteção de dados e práticas de segurança digital.
            </p>
          </section>

          {/* Como Funciona - Animated Steps */}
          <section className="game-card p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-[1.02] hover:bg-red-800/60 group">
            <h2 className="text-3xl font-bold text-green-300 mb-6 flex items-center game-text-shadow transition-all duration-300 group-hover:text-green-200">
              <Clock className="mr-3 h-8 w-8 text-green-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              🎮 Como Funciona
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex items-start transition-all duration-300 hover:translate-x-2 group/step">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold text-lg mt-1 transition-all duration-300 group-hover/step:bg-blue-500 group-hover/step:scale-110 group-hover/step:rotate-12">
                    1
                  </span>
                  <div className="transition-all duration-300 group-hover/step:text-white">
                    <h3 className="text-blue-300 font-bold text-lg mb-2 transition-all duration-300 group-hover/step:text-blue-200">
                      Perguntas Cronometradas
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      Você enfrentará{" "}
                      <strong className="text-white transition-all duration-300 group-hover/step:text-yellow-300">
                        8 perguntas
                      </strong>{" "}
                      sobre segurança da informação, cada uma com tempo limitado entre{" "}
                      <strong className="text-yellow-300 transition-all duration-300 group-hover/step:text-yellow-200">
                        10 a 18 segundos
                      </strong>
                      .
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start transition-all duration-300 hover:translate-x-2 group/step">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold text-lg mt-1 transition-all duration-300 group-hover/step:bg-blue-500 group-hover/step:scale-110 group-hover/step:rotate-12">
                    2
                  </span>
                  <div className="transition-all duration-300 group-hover/step:text-white">
                    <h3 className="text-blue-300 font-bold text-lg mb-2 transition-all duration-300 group-hover/step:text-blue-200">
                      Sistema de Pontuação
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      Cada resposta correta vale{" "}
                      <strong className="text-green-300 transition-all duration-300 group-hover/step:text-green-200">
                        25 pontos
                      </strong>
                      . Respostas incorretas não penalizam, mas você não ganha pontos por elas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Step 3 */}
                <div className="flex items-start transition-all duration-300 hover:translate-x-2 group/step">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold text-lg mt-1 transition-all duration-300 group-hover/step:bg-blue-500 group-hover/step:scale-110 group-hover/step:rotate-12">
                    3
                  </span>
                  <div className="transition-all duration-300 group-hover/step:text-white">
                    <h3 className="text-blue-300 font-bold text-lg mb-2 transition-all duration-300 group-hover/step:text-blue-200">
                      Progressão Contínua
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      Você pode avançar para a próxima pergunta independentemente de acertar ou errar a atual. O foco é
                      no{" "}
                      <strong className="text-purple-300 transition-all duration-300 group-hover/step:text-purple-200">
                        aprendizado
                      </strong>
                      .
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start transition-all duration-300 hover:translate-x-2 group/step">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold text-lg mt-1 transition-all duration-300 group-hover/step:bg-blue-500 group-hover/step:scale-110 group-hover/step:rotate-12">
                    4
                  </span>
                  <div className="transition-all duration-300 group-hover/step:text-white">
                    <h3 className="text-blue-300 font-bold text-lg mb-2 transition-all duration-300 group-hover/step:text-blue-200">
                      Resgate de Pontos
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      Ao final, você poderá resgatar seus pontos clicando no botão{" "}
                      <strong className="text-yellow-300 transition-all duration-300 group-hover/step:text-yellow-200">
                        "RESGATE SEUS PONTOS!"
                      </strong>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pontuação e Recompensas - Animated Stats */}
          <section className="game-card p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-[1.02] hover:bg-red-800/60 group">
            <h2 className="text-3xl font-bold text-purple-300 mb-6 flex items-center game-text-shadow transition-all duration-300 group-hover:text-purple-200">
              <Trophy className="mr-3 h-8 w-8 text-purple-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              🏆 Pontuação e Recompensas
            </h2>
            <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-xl p-6 border border-purple-600 transition-all duration-300 group-hover:border-purple-400 group-hover:from-purple-800/50 group-hover:to-blue-800/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                {/* Max Points */}
                <div className="space-y-3 transition-all duration-300 hover:scale-110 hover:bg-yellow-900/20 rounded-lg p-4 group/stat">
                  <div className="text-4xl font-bold text-yellow-300 transition-all duration-300 group-hover/stat:text-yellow-200 group-hover/stat:animate-pulse">
                    200
                  </div>
                  <div className="text-yellow-200 font-semibold transition-all duration-300 group-hover/stat:text-yellow-100">
                    Pontos Máximos
                  </div>
                  <div className="text-gray-300 text-sm transition-all duration-300 group-hover/stat:text-gray-200">
                    8 perguntas × 25 pontos
                  </div>
                </div>

                {/* Points per Correct */}
                <div className="space-y-3 transition-all duration-300 hover:scale-110 hover:bg-green-900/20 rounded-lg p-4 group/stat">
                  <div className="text-4xl font-bold text-green-300 transition-all duration-300 group-hover/stat:text-green-200 group-hover/stat:animate-pulse">
                    25
                  </div>
                  <div className="text-green-200 font-semibold transition-all duration-300 group-hover/stat:text-green-100">
                    Pontos por Acerto
                  </div>
                  <div className="text-gray-300 text-sm transition-all duration-300 group-hover/stat:text-gray-200">
                    Cada resposta correta
                  </div>
                </div>

                {/* No Penalty */}
                <div className="space-y-3 transition-all duration-300 hover:scale-110 hover:bg-blue-900/20 rounded-lg p-4 group/stat">
                  <div className="text-4xl font-bold text-blue-300 transition-all duration-300 group-hover/stat:text-blue-200 group-hover/stat:animate-pulse">
                    0
                  </div>
                  <div className="text-blue-200 font-semibold transition-all duration-300 group-hover/stat:text-blue-100">
                    Penalidade
                  </div>
                  <div className="text-gray-300 text-sm transition-all duration-300 group-hover/stat:text-gray-200">
                    Sem desconto por erro
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recursos do Jogo - Interactive Feature Cards */}
          <section className="game-card p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-[1.02] hover:bg-red-800/60 group">
            <h2 className="text-3xl font-bold text-cyan-300 mb-6 flex items-center game-text-shadow transition-all duration-300 group-hover:text-cyan-200">
              <Star className="mr-3 h-8 w-8 text-cyan-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              ✨ Recursos do Jogo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Music Feature */}
                <div className="flex items-center p-4 bg-cyan-900/30 rounded-lg border border-cyan-600 transition-all duration-300 hover:bg-cyan-800/40 hover:border-cyan-400 hover:scale-105 hover:shadow-lg group/feature cursor-pointer">
                  <Music className="h-6 w-6 text-cyan-400 mr-3 transition-all duration-300 group-hover/feature:animate-bounce group-hover/feature:text-cyan-300" />
                  <div>
                    <h3 className="text-cyan-300 font-bold transition-all duration-300 group-hover/feature:text-cyan-200">
                      Música Ambiente
                    </h3>
                    <p className="text-gray-300 text-sm transition-all duration-300 group-hover/feature:text-gray-200">
                      Tema corporativo para concentração
                    </p>
                  </div>
                </div>

                {/* Sound Effects Feature */}
                <div className="flex items-center p-4 bg-green-900/30 rounded-lg border border-green-600 transition-all duration-300 hover:bg-green-800/40 hover:border-green-400 hover:scale-105 hover:shadow-lg group/feature cursor-pointer">
                  <Volume2 className="h-6 w-6 text-green-400 mr-3 transition-all duration-300 group-hover/feature:animate-pulse group-hover/feature:text-green-300" />
                  <div>
                    <h3 className="text-green-300 font-bold transition-all duration-300 group-hover/feature:text-green-200">
                      Efeitos Sonoros
                    </h3>
                    <p className="text-gray-300 text-sm transition-all duration-300 group-hover/feature:text-gray-200">
                      Feedback auditivo para respostas e tempo
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Timer Feature */}
                <div className="flex items-center p-4 bg-yellow-900/30 rounded-lg border border-yellow-600 transition-all duration-300 hover:bg-yellow-800/40 hover:border-yellow-400 hover:scale-105 hover:shadow-lg group/feature cursor-pointer">
                  <Clock className="h-6 w-6 text-yellow-400 mr-3 transition-all duration-300 group-hover/feature:animate-spin group-hover/feature:text-yellow-300" />
                  <div>
                    <h3 className="text-yellow-300 font-bold transition-all duration-300 group-hover/feature:text-yellow-200">
                      Timer Visual
                    </h3>
                    <p className="text-gray-300 text-sm transition-all duration-300 group-hover/feature:text-gray-200">
                      Indicador colorido do tempo restante
                    </p>
                  </div>
                </div>

                {/* Report Feature */}
                <div className="flex items-center p-4 bg-purple-900/30 rounded-lg border border-purple-600 transition-all duration-300 hover:bg-purple-800/40 hover:border-purple-400 hover:scale-105 hover:shadow-lg group/feature cursor-pointer">
                  <Trophy className="h-6 w-6 text-purple-400 mr-3 transition-all duration-300 group-hover/feature:animate-bounce group-hover/feature:text-purple-300" />
                  <div>
                    <h3 className="text-purple-300 font-bold transition-all duration-300 group-hover/feature:text-purple-200">
                      Relatório Final
                    </h3>
                    <p className="text-gray-300 text-sm transition-all duration-300 group-hover/feature:text-gray-200">
                      Análise detalhada da sua performance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Dicas para Sucesso - Interactive Tips */}
          <section className="game-card p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-[1.02] hover:bg-red-800/60 group">
            <h2 className="text-3xl font-bold text-orange-300 mb-6 flex items-center game-text-shadow transition-all duration-300 group-hover:text-orange-200">
              <span className="mr-3 text-4xl transition-all duration-300 group-hover:animate-bounce">💡</span>
              Dicas para o Sucesso
            </h2>
            <div className="bg-gradient-to-r from-orange-900/40 to-red-900/40 rounded-xl p-6 border border-orange-600 transition-all duration-300 group-hover:border-orange-400 group-hover:from-orange-800/50 group-hover:to-red-800/50">
              <ul className="space-y-4 text-gray-200">
                {/* Tip 1 */}
                <li className="flex items-start transition-all duration-300 hover:translate-x-2 hover:text-white group/tip">
                  <span className="text-orange-400 mr-3 text-xl mt-1 transition-all duration-300 group-hover/tip:animate-pulse group-hover/tip:text-orange-300">
                    🎯
                  </span>
                  <div>
                    <strong className="text-orange-300 transition-all duration-300 group-hover/tip:text-orange-200">
                      Leia com atenção:
                    </strong>{" "}
                    As perguntas são baseadas em situações reais de segurança da informação.
                  </div>
                </li>

                {/* Tip 2 */}
                <li className="flex items-start transition-all duration-300 hover:translate-x-2 hover:text-white group/tip">
                  <span className="text-orange-400 mr-3 text-xl mt-1 transition-all duration-300 group-hover/tip:animate-pulse group-hover/tip:text-orange-300">
                    ⏰
                  </span>
                  <div>
                    <strong className="text-orange-300 transition-all duration-300 group-hover/tip:text-orange-200">
                      Gerencie o tempo:
                    </strong>{" "}
                    Fique atento aos avisos sonoros quando restam poucos segundos.
                  </div>
                </li>

                {/* Tip 3 */}
                <li className="flex items-start transition-all duration-300 hover:translate-x-2 hover:text-white group/tip">
                  <span className="text-orange-400 mr-3 text-xl mt-1 transition-all duration-300 group-hover/tip:animate-pulse group-hover/tip:text-orange-300">
                    🧠
                  </span>
                  <div>
                    <strong className="text-orange-300 transition-all duration-300 group-hover/tip:text-orange-200">
                      Aprenda com os erros:
                    </strong>{" "}
                    Cada pergunta inclui uma explicação detalhada da resposta correta.
                  </div>
                </li>

                {/* Tip 4 */}
                <li className="flex items-start transition-all duration-300 hover:translate-x-2 hover:text-white group/tip">
                  <span className="text-orange-400 mr-3 text-xl mt-1 transition-all duration-300 group-hover/tip:animate-pulse group-hover/tip:text-orange-300">
                    🔊
                  </span>
                  <div>
                    <strong className="text-orange-300 transition-all duration-300 group-hover/tip:text-orange-200">
                      Use o áudio:
                    </strong>{" "}
                    Os controles de som e música podem ser ajustados conforme sua preferência.
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Animated Start Button */}
          <div className="flex justify-center mt-12">
            <Link href="/game">
              <Button className="px-12 py-8 text-2xl bg-red-600 hover:bg-red-700 text-white game-button border-2 border-red-500 hover:border-red-400 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_50px_rgba(220,38,38,0.4)] group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  <span className="mr-3 transition-all duration-300 group-hover:animate-bounce">🚀</span>
                  Iniciar Desafio
                </span>
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
