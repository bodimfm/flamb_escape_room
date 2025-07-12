"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Target, Trophy, Music, Volume2, Star, Sparkles, Award, Medal, Crown } from "lucide-react"

export default function Instructions() {
  // Score range configurations for unique buttons
  const scoreRanges = [
    {
      id: "bronze_achievement",
      name: "Aprendiz de Segurança",
      range: "0-25%",
      points: "0-50 pontos",
      color: "#CD7F32",
      icon: Award,
      description: "Demonstra interesse inicial em segurança da informação",
      buttonText: "RESGATAR BRONZE",
    },
    {
      id: "silver_achievement",
      name: "Guardião Digital",
      range: "26-50%",
      points: "51-100 pontos",
      color: "#C0C0C0",
      icon: Medal,
      description: "Conhecimento básico em práticas de segurança",
      buttonText: "RESGATAR PRATA",
    },
    {
      id: "gold_achievement",
      name: "Especialista em Segurança",
      range: "51-75%",
      points: "101-150 pontos",
      color: "#FFD700",
      icon: Trophy,
      description: "Excelente domínio em segurança digital",
      buttonText: "RESGATAR OURO",
    },
    {
      id: "platinum_achievement",
      name: "Mestre da Segurança",
      range: "76-100%",
      points: "151-200 pontos",
      color: "#E5E4E2",
      icon: Crown,
      description: "Domínio excepcional em segurança da informação",
      buttonText: "RESGATAR PLATINA",
    },
  ]

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
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <h1 className="text-5xl font-bold text-white game-text-shadow transition-all duration-300 hover:text-yellow-100 hover:scale-105">
            📖 Como Jogar
          </h1>
        </div>

        <div className="space-y-8">
          {/* Objetivo do Desafio */}
          <section className="game-card p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-[1.02] hover:bg-red-800/60 group">
            <h2 className="text-3xl font-bold text-yellow-300 mb-6 flex items-center game-text-shadow transition-all duration-300 group-hover:text-yellow-200">
              <Target className="mr-3 h-8 w-8 text-yellow-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              🎯 Objetivo do Desafio
            </h2>
            <p className="text-gray-100 text-lg leading-relaxed font-medium transition-all duration-300 group-hover:text-white">
              Teste seus conhecimentos sobre segurança da informação através de um desafio interativo. Responda
              corretamente às perguntas sobre proteção de dados e práticas de segurança digital para demonstrar sua
              expertise e conquistar diferentes níveis de reconhecimento.
            </p>
          </section>

          {/* Como Funciona */}
          <section className="game-card p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-[1.02] hover:bg-red-800/60 group">
            <h2 className="text-3xl font-bold text-green-300 mb-6 flex items-center game-text-shadow transition-all duration-300 group-hover:text-green-200">
              <Clock className="mr-3 h-8 w-8 text-green-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              🎮 Mecânica do Jogo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start transition-all duration-300 hover:translate-x-2 group/step">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold text-lg mt-1 transition-all duration-300 group-hover/step:bg-blue-500 group-hover/step:scale-110 group-hover/step:rotate-12">
                    1
                  </span>
                  <div className="transition-all duration-300 group-hover/step:text-white">
                    <h3 className="text-blue-300 font-bold text-lg mb-2 transition-all duration-300 group-hover/step:text-blue-200">
                      Desafio Cronometrado
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      Enfrente{" "}
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
                      . Respostas incorretas não penalizam, permitindo foco no aprendizado.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start transition-all duration-300 hover:translate-x-2 group/step">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold text-lg mt-1 transition-all duration-300 group-hover/step:bg-blue-500 group-hover/step:scale-110 group-hover/step:rotate-12">
                    3
                  </span>
                  <div className="transition-all duration-300 group-hover/step:text-white">
                    <h3 className="text-blue-300 font-bold text-lg mb-2 transition-all duration-300 group-hover/step:text-blue-200">
                      Progressão Educativa
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      Avance independentemente de acertos ou erros. O foco está no{" "}
                      <strong className="text-purple-300 transition-all duration-300 group-hover/step:text-purple-200">
                        desenvolvimento de conhecimento
                      </strong>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex items-start transition-all duration-300 hover:translate-x-2 group/step">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold text-lg mt-1 transition-all duration-300 group-hover/step:bg-blue-500 group-hover/step:scale-110 group-hover/step:rotate-12">
                    4
                  </span>
                  <div className="transition-all duration-300 group-hover/step:text-white">
                    <h3 className="text-blue-300 font-bold text-lg mb-2 transition-all duration-300 group-hover/step:text-blue-200">
                      Conquistas por Performance
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      Desbloqueie diferentes níveis de reconhecimento baseados na sua{" "}
                      <strong className="text-yellow-300 transition-all duration-300 group-hover/step:text-yellow-200">
                        taxa de acerto
                      </strong>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sistema de Conquistas com Botões Únicos */}
          <section className="game-card p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-[1.02] hover:bg-red-800/60 group">
            <h2 className="text-3xl font-bold text-purple-300 mb-6 flex items-center game-text-shadow transition-all duration-300 group-hover:text-purple-200">
              <Trophy className="mr-3 h-8 w-8 text-purple-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              🏆 Níveis de Conquista
            </h2>
            <p className="text-gray-100 text-lg mb-8 text-center leading-relaxed">
              Cada faixa de desempenho desbloqueia um nível único de reconhecimento com botão específico para resgate:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scoreRanges.map((range, index) => {
                const IconComponent = range.icon
                return (
                  <div
                    key={range.id}
                    className="relative overflow-hidden rounded-xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl group/achievement cursor-pointer"
                    style={{
                      backgroundColor: `${range.color}15`,
                      borderColor: `${range.color}80`,
                    }}
                  >
                    {/* Animated background gradient */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover/achievement:opacity-20 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${range.color}40, transparent)`,
                      }}
                    ></div>

                    <div className="relative p-6">
                      <div className="flex items-center mb-4">
                        <div
                          className="p-3 rounded-full mr-4 transition-all duration-300 group-hover/achievement:scale-110 group-hover/achievement:rotate-12"
                          style={{ backgroundColor: `${range.color}30` }}
                        >
                          <IconComponent
                            className="h-8 w-8 transition-all duration-300"
                            style={{ color: range.color }}
                          />
                        </div>
                        <div>
                          <h3
                            className="text-xl font-bold transition-all duration-300 group-hover/achievement:scale-105"
                            style={{ color: range.color }}
                          >
                            {range.name}
                          </h3>
                          <p className="text-gray-300 text-sm transition-all duration-300 group-hover/achievement:text-gray-200">
                            {range.range} de acerto
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-200 text-sm mb-4 leading-relaxed transition-all duration-300 group-hover/achievement:text-white">
                        {range.description}
                      </p>

                      <div className="flex justify-between items-center mb-4">
                        <span className="text-yellow-300 font-semibold transition-all duration-300 group-hover/achievement:text-yellow-200">
                          {range.points}
                        </span>
                        <span className="text-xs text-gray-400 transition-all duration-300 group-hover/achievement:text-gray-300">
                          ID: {range.id}
                        </span>
                      </div>

                      {/* Unique Button for Each Score Range */}
                      <Button
                        className="w-full text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group-hover/achievement:animate-pulse"
                        style={{
                          backgroundColor: range.color,
                          boxShadow: `0 4px 15px ${range.color}40`,
                        }}
                        onClick={() => {
                          // This would be called when the user achieves this level
                          const redirectUrl = `https://v0-escape-room-game-development.vercel.app/conquista/?achievement_id=${range.id}&level=${range.name}&score_range=${range.range}`
                          console.log(`Redirect URL for ${range.name}:`, redirectUrl)
                        }}
                      >
                        <span className="flex items-center justify-center">
                          <IconComponent className="h-5 w-5 mr-2" />
                          {range.buttonText}
                        </span>
                      </Button>
                    </div>

                    {/* Animated border effect */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover/achievement:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        boxShadow: `inset 0 0 20px ${range.color}30`,
                      }}
                    ></div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Recursos Interativos */}
          <section className="game-card p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-[1.02] hover:bg-red-800/60 group">
            <h2 className="text-3xl font-bold text-cyan-300 mb-6 flex items-center game-text-shadow transition-all duration-300 group-hover:text-cyan-200">
              <Star className="mr-3 h-8 w-8 text-cyan-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              ✨ Recursos do Desafio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-cyan-900/30 rounded-lg border border-cyan-600 transition-all duration-300 hover:bg-cyan-800/40 hover:border-cyan-400 hover:scale-105 hover:shadow-lg group/feature cursor-pointer">
                  <Music className="h-6 w-6 text-cyan-400 mr-3 transition-all duration-300 group-hover/feature:animate-bounce group-hover/feature:text-cyan-300" />
                  <div>
                    <h3 className="text-cyan-300 font-bold transition-all duration-300 group-hover/feature:text-cyan-200">
                      Ambiente Sonoro
                    </h3>
                    <p className="text-gray-300 text-sm transition-all duration-300 group-hover/feature:text-gray-200">
                      Música corporativa para concentração máxima
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-green-900/30 rounded-lg border border-green-600 transition-all duration-300 hover:bg-green-800/40 hover:border-green-400 hover:scale-105 hover:shadow-lg group/feature cursor-pointer">
                  <Volume2 className="h-6 w-6 text-green-400 mr-3 transition-all duration-300 group-hover/feature:animate-pulse group-hover/feature:text-green-300" />
                  <div>
                    <h3 className="text-green-300 font-bold transition-all duration-300 group-hover/feature:text-green-200">
                      Feedback Auditivo
                    </h3>
                    <p className="text-gray-300 text-sm transition-all duration-300 group-hover/feature:text-gray-200">
                      Sons indicativos para respostas e alertas de tempo
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center p-4 bg-yellow-900/30 rounded-lg border border-yellow-600 transition-all duration-300 hover:bg-yellow-800/40 hover:border-yellow-400 hover:scale-105 hover:shadow-lg group/feature cursor-pointer">
                  <Clock className="h-6 w-6 text-yellow-400 mr-3 transition-all duration-300 group-hover/feature:animate-spin group-hover/feature:text-yellow-300" />
                  <div>
                    <h3 className="text-yellow-300 font-bold transition-all duration-300 group-hover/feature:text-yellow-200">
                      Timer Inteligente
                    </h3>
                    <p className="text-gray-300 text-sm transition-all duration-300 group-hover/feature:text-gray-200">
                      Indicador visual colorido do tempo restante
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-purple-900/30 rounded-lg border border-purple-600 transition-all duration-300 hover:bg-purple-800/40 hover:border-purple-400 hover:scale-105 hover:shadow-lg group/feature cursor-pointer">
                  <Trophy className="h-6 w-6 text-purple-400 mr-3 transition-all duration-300 group-hover/feature:animate-bounce group-hover/feature:text-purple-300" />
                  <div>
                    <h3 className="text-purple-300 font-bold transition-all duration-300 group-hover/feature:text-purple-200">
                      Análise Detalhada
                    </h3>
                    <p className="text-gray-300 text-sm transition-all duration-300 group-hover/feature:text-gray-200">
                      Relatório completo de performance e conquistas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Estratégias de Sucesso */}
          <section className="game-card p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-[1.02] hover:bg-red-800/60 group">
            <h2 className="text-3xl font-bold text-orange-300 mb-6 flex items-center game-text-shadow transition-all duration-300 group-hover:text-orange-200">
              <span className="mr-3 text-4xl transition-all duration-300 group-hover:animate-bounce">💡</span>
              Estratégias para Máxima Performance
            </h2>
            <div className="bg-gradient-to-r from-orange-900/40 to-red-900/40 rounded-xl p-6 border border-orange-600 transition-all duration-300 group-hover:border-orange-400 group-hover:from-orange-800/50 group-hover:to-red-800/50">
              <ul className="space-y-4 text-gray-200">
                <li className="flex items-start transition-all duration-300 hover:translate-x-2 hover:text-white group/tip">
                  <span className="text-orange-400 mr-3 text-xl mt-1 transition-all duration-300 group-hover/tip:animate-pulse group-hover/tip:text-orange-300">
                    🎯
                  </span>
                  <div>
                    <strong className="text-orange-300 transition-all duration-300 group-hover/tip:text-orange-200">
                      Análise Cuidadosa:
                    </strong>{" "}
                    Leia cada pergunta completamente antes de responder. As questões são baseadas em cenários reais de
                    segurança.
                  </div>
                </li>

                <li className="flex items-start transition-all duration-300 hover:translate-x-2 hover:text-white group/tip">
                  <span className="text-orange-400 mr-3 text-xl mt-1 transition-all duration-300 group-hover/tip:animate-pulse group-hover/tip:text-orange-300">
                    ⏰
                  </span>
                  <div>
                    <strong className="text-orange-300 transition-all duration-300 group-hover/tip:text-orange-200">
                      Gestão de Tempo:
                    </strong>{" "}
                    Mantenha-se atento aos avisos sonoros e mudanças de cor do timer para otimizar suas respostas.
                  </div>
                </li>

                <li className="flex items-start transition-all duration-300 hover:translate-x-2 hover:text-white group/tip">
                  <span className="text-orange-400 mr-3 text-xl mt-1 transition-all duration-300 group-hover/tip:animate-pulse group-hover/tip:text-orange-300">
                    🧠
                  </span>
                  <div>
                    <strong className="text-orange-300 transition-all duration-300 group-hover/tip:text-orange-200">
                      Aprendizado Contínuo:
                    </strong>{" "}
                    Cada pergunta inclui explicação detalhada. Use essas informações para melhorar seu conhecimento.
                  </div>
                </li>

                <li className="flex items-start transition-all duration-300 hover:translate-x-2 hover:text-white group/tip">
                  <span className="text-orange-400 mr-3 text-xl mt-1 transition-all duration-300 group-hover/tip:animate-pulse group-hover/tip:text-orange-300">
                    🎵
                  </span>
                  <div>
                    <strong className="text-orange-300 transition-all duration-300 group-hover/tip:text-orange-200">
                      Personalização:
                    </strong>{" "}
                    Ajuste os controles de áudio conforme sua preferência para uma experiência otimizada.
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Botão de Início Animado */}
          <div className="flex justify-center mt-12">
            <Link href="/game">
              <Button className="px-12 py-8 text-2xl bg-red-600 hover:bg-red-700 text-white game-button border-2 border-red-500 hover:border-red-400 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_50px_rgba(220,38,38,0.4)] group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  <span className="mr-3 transition-all duration-300 group-hover:animate-bounce">🚀</span>
                  Iniciar Desafio de Segurança
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
