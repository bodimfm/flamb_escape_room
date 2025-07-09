"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Shield, AlertTriangle } from "lucide-react"
import Timer from "@/components/game/timer"
import GameOver from "@/components/game/game-over"
import GameWin from "@/components/game/game-win"
import { gameConfig } from "@/lib/config"

// Define the questions for the game
const questions = [
  {
    id: 1,
    text: "Você recebe um e-mail de um fornecedor pedindo para 'atualizar' a planilha de clientes anexada. O que você deve fazer primeiro?",
    options: [
      { text: "Abrir rapidamente, verificar e reenviar.", correct: false },
      { text: "Confirmar a legitimidade do pedido com o fornecedor por outro canal.", correct: true },
      { text: "Ignorar, pois não é responsabilidade do meu departamento.", correct: false },
    ],
    code: 3,
    explanation:
      "Sempre verifique a legitimidade de solicitações que envolvem dados sensíveis através de um canal alternativo antes de tomar qualquer ação.",
  },
  {
    id: 2,
    text: "Ao notar um pen-drive desconhecido conectado a um computador interno, qual procedimento está alinhado à política de incidentes?",
    options: [
      { text: "Retirar o pen-drive, armazená-lo em local seguro e reportar imediatamente.", correct: true },
      { text: "Explorar o conteúdo para identificar o dono.", correct: false },
      { text: "Formatar o pen-drive antes de devolvê-lo.", correct: false },
    ],
    code: 8,
    explanation:
      "Dispositivos desconhecidos podem conter malware. O procedimento correto é isolá-los e reportar o incidente sem explorar seu conteúdo.",
  },
  {
    id: 3,
    text: "Um colega comenta no grupo de WhatsApp sobre um vazamento envolvendo dados de clientes. Qual é a melhor atitude?",
    options: [
      { text: "Compartilhar mais detalhes para esclarecer a história.", correct: false },
      {
        text: "Alertar o Comitê de Privacidade e usar o canal oficial para reportar o incidente.",
        correct: true,
      },
      { text: "Ignorar mensagens de rumores até que a mídia confirme.", correct: false },
    ],
    code: 6,
    explanation:
      "Incidentes de segurança devem ser reportados pelos canais oficiais para garantir uma resposta adequada e evitar o compartilhamento indevido de informações sensíveis.",
  },
  {
    id: 4,
    text: "Durante uma reunião online, um colega pede que você compartilhe sua tela mostrando a base de dados de clientes. O que fazer?",
    options: [
      { text: "Compartilhar apenas se for um colega de confiança.", correct: false },
      {
        text: "Verificar se ele tem autorização para acessar esses dados antes de compartilhar.",
        correct: true,
      },
      { text: "Compartilhar a tela, mas ocultar as colunas com CPF e e-mail.", correct: false },
    ],
    code: 5,
    explanation:
      "O acesso a dados pessoais deve ser baseado em necessidade legítima e autorização prévia, independentemente do nível de confiança no colega.",
  },
  {
    id: 5,
    text: "Você percebe que tem acesso a dados de clientes que não são necessários para sua função. O que deve fazer?",
    options: [
      { text: "Manter o acesso, pois pode ser útil no futuro.", correct: false },
      { text: "Solicitar a remoção do seu acesso a esses dados desnecessários.", correct: true },
      { text: "Não fazer nada, já que você não utiliza esses dados.", correct: false },
    ],
    code: 9,
    explanation:
      "O princípio do privilégio mínimo determina que cada pessoa deve ter acesso apenas aos dados necessários para sua função, reduzindo riscos de vazamentos.",
  },
]

export default function Game() {
  const [showIntro, setShowIntro] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [collectedCodes, setCollectedCodes] = useState<number[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")
  const [isGameOver, setIsGameOver] = useState(false)
  const [isGameWon, setIsGameWon] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(gameConfig.timeLimit) // from config
  const [showFinalCodeInput, setShowFinalCodeInput] = useState(false)
  const [finalCodeInput, setFinalCodeInput] = useState("")
  const [codeError, setCodeError] = useState("")
  const [userId, setUserId] = useState<string | null>(null)

  // Extract user ID from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userIdParam = params.get("user_id")
    if (userIdParam) {
      setUserId(userIdParam)
    }
  }, [])

  const handleStartGame = () => {
    setShowIntro(false)
  }

  const handleOptionClick = (isCorrect: boolean, code: number) => {
    if (isCorrect) {
      setCollectedCodes([...collectedCodes, code])
      setIsCorrect(true)
      setFeedbackText(questions[currentQuestion].explanation)
    } else {
      setIsCorrect(false)
      setFeedbackText("Resposta incorreta. Tente novamente.")
    }
    setShowFeedback(true)
  }

  const handleContinue = () => {
    setShowFeedback(false)
    if (isCorrect) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setShowFinalCodeInput(true)
      }
    }
  }

  const handleTimeUp = () => {
    setIsGameOver(true)
  }

  const handleFinalCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const correctCode = collectedCodes.join("")

    if (finalCodeInput === correctCode) {
      setIsGameWon(true)
    } else {
      setCodeError("Código incorreto. Verifique os dígitos coletados.")
    }
  }

  const handleTryAgain = () => {
    window.location.reload()
  }

  if (isGameOver) {
    return <GameOver onTryAgain={handleTryAgain} />
  }

  if (isGameWon) {
    return (
      <GameWin
        code={collectedCodes.join("")}
        timeRemaining={timeRemaining}
        onPlayAgain={handleTryAgain}
        userId={userId}
      />
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-red-950 to-red-900">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center p-4">
          <Link href="/" className="text-red-300 hover:text-red-100">
            Sair
          </Link>
          <div className="flex items-center">
            <Image src="/images/logo.png" alt="Flamboyant Shopping Logo" width={40} height={40} className="mr-2" />
            <h1 className="text-xl font-bold text-white">{gameConfig.gameTitle}</h1>
          </div>
          <Timer initialTime={timeRemaining} onTimeUp={handleTimeUp} setTimeRemaining={setTimeRemaining} />
        </div>

        {showIntro ? (
          <Card className="mt-8 bg-red-950/70 border-red-800 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-red-300 flex items-center">
                <AlertTriangle className="mr-2 h-6 w-6" />
                Alerta de Segurança
              </CardTitle>
              <CardDescription className="text-gray-300">
                Detectamos uma possível invasão no sistema do {gameConfig.companyName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Como especialista em segurança da informação, você foi acionado para conter um vazamento de dados em
                andamento. Um invasor está tentando extrair informações pessoais dos clientes do shopping.
              </p>
              <p className="mb-4">
                Você precisa responder corretamente às perguntas de segurança para obter os dígitos do código que
                bloqueará o acesso do invasor. Você tem apenas 10 minutos antes que o vazamento se torne irreversível.
              </p>
              <div className="p-4 bg-red-900/50 rounded-lg border border-red-700 mt-4">
                <h3 className="font-semibold text-red-300 mb-2">Status do Sistema:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                    Firewall: Comprometido
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                    Banco de Dados: Sob ataque
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                    Sistema de Backup: Operacional
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleStartGame}>
                Iniciar Contenção
              </Button>
            </CardFooter>
          </Card>
        ) : showFinalCodeInput ? (
          <Card className="mt-8 bg-red-950/70 border-red-800 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-red-300 flex items-center">
                <Shield className="mr-2 h-6 w-6" />
                Protocolo de Segurança
              </CardTitle>
              <CardDescription className="text-gray-300">
                Insira o código completo para bloquear o vazamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="mb-4">
                  Você coletou todos os dígitos necessários. Agora, insira o código completo na ordem correta para
                  ativar o protocolo de segurança e bloquear o vazamento.
                </p>
                <div className="p-4 bg-red-900/50 rounded-lg border border-red-700 mb-4">
                  <h3 className="font-semibold text-red-300 mb-2">Dígitos Coletados:</h3>
                  <div className="flex flex-wrap gap-2">
                    {collectedCodes.map((code, index) => (
                      <div
                        key={index}
                        className="w-10 h-10 flex items-center justify-center bg-red-800 rounded-md text-white font-bold"
                      >
                        {code}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <form onSubmit={handleFinalCodeSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="finalCode" className="block text-sm font-medium text-gray-300 mb-1">
                      Código de Segurança
                    </label>
                    <Input
                      id="finalCode"
                      type="text"
                      placeholder="Digite o código completo"
                      value={finalCodeInput}
                      onChange={(e) => setFinalCodeInput(e.target.value)}
                      className="bg-red-900/30 border-red-700 text-white placeholder:text-gray-400"
                    />
                    {codeError && <p className="text-red-400 text-sm mt-1">{codeError}</p>}
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    Ativar Protocolo de Segurança
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="mt-8 bg-red-950/70 border-red-800 text-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl text-red-300">
                  Desafio {currentQuestion + 1}/{questions.length}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-300">Códigos:</span>
                  <div className="flex">
                    {collectedCodes.map((code, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 flex items-center justify-center bg-red-800 rounded-md text-white text-xs font-bold ml-1"
                      >
                        {code}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">{questions[currentQuestion].text}</p>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left py-4 border-red-700 hover:bg-red-800 hover:text-white text-gray-200"
                    onClick={() => handleOptionClick(option.correct, questions[currentQuestion].code)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Feedback Dialog */}
      <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
        <DialogContent className="bg-red-950 border-red-800 text-white">
          <DialogHeader>
            <DialogTitle className={isCorrect ? "text-green-400" : "text-red-400"}>
              {isCorrect ? "Resposta Correta!" : "Resposta Incorreta"}
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              {isCorrect && (
                <div className="flex items-center mt-2 mb-2">
                  <span className="mr-2">Você obteve o dígito:</span>
                  <div className="w-8 h-8 flex items-center justify-center bg-red-800 rounded-md text-white font-bold">
                    {questions[currentQuestion].code}
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 text-gray-200">{feedbackText}</div>
          <div className="mt-4 flex justify-end">
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleContinue}>
              Continuar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
