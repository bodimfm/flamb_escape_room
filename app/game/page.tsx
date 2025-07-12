"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  AlertTriangle,
  Star,
  ExternalLink,
  Volume2,
  VolumeX,
  Music,
  CheckCircle2,
  XCircle,
  Timer,
  Crown,
  Trophy,
  Medal,
  Award,
} from "lucide-react"
import GameOver from "@/components/game/game-over"
import { gameConfig } from "@/lib/config"

// Updated achievement levels with Flamboyant Shopping brand colors and images
const achievementLevels = {
  ciber_aprendiz_badge: {
    id: "ciber_aprendiz_badge",
    name: "Ciber Aprendiz",
    description: "Demonstra interesse inicial em segurança da informação",
    minPercentage: 0,
    maxPercentage: 25,
    points: 50,
    color: "#DC2626", // Flamboyant red
    image: "/images/achievements/ciber-aprendiz.png",
    url: "https://v0-escape-room-game-development.vercel.app/ciber-aprendiz",
  },
  ciber_vigilante_badge: {
    id: "ciber_vigilante_badge",
    name: "Ciber Vigilante",
    description: "Conhecimento básico em práticas de segurança",
    minPercentage: 26,
    maxPercentage: 50,
    points: 100,
    color: "#B91C1C", // Darker Flamboyant red
    image: "/images/achievements/ciber-vigilante.png",
    url: "https://v0-escape-room-game-development.vercel.app/ciber-vigilante",
  },
  ciber_guardiao_badge: {
    id: "ciber_guardiao_badge",
    name: "Ciber Guardião",
    description: "Excelente domínio em segurança digital",
    minPercentage: 51,
    maxPercentage: 75,
    points: 150,
    color: "#991B1B", // Deep Flamboyant red
    image: "/images/achievements/ciber-guardiao.png",
    url: "https://v0-escape-room-game-development.vercel.app/ciber-guardiao",
  },
  ciber_embaixador_flamboyant_badge: {
    id: "ciber_embaixador_flamboyant_badge",
    name: "Ciber Embaixador Flamboyant",
    description: "Domínio excepcional em segurança da informação",
    minPercentage: 76,
    maxPercentage: 100,
    points: 200,
    color: "#7F1D1D", // Darkest Flamboyant red
    image: "/images/achievements/ciber-embaixador.png",
    url: "https://v0-escape-room-game-development.vercel.app/ciber-embaixador-flamboyant",
  },
}

// Define the questions for the game with more options and shorter time limits
const questions = [
  {
    id: 1,
    text: "Você recebe um e-mail de um fornecedor pedindo para 'atualizar' a planilha de clientes anexada. O que você deve fazer primeiro?",
    options: [
      { text: "Abrir rapidamente, verificar e reenviar.", correct: false },
      { text: "Confirmar a legitimidade do pedido com o fornecedor por outro canal.", correct: true },
      { text: "Ignorar, pois não é responsabilidade do meu departamento.", correct: false },
      { text: "Encaminhar para o supervisor decidir.", correct: false },
      { text: "Verificar apenas o remetente do e-mail.", correct: false },
    ],
    points: 25,
    timeLimit: 15,
    explanation:
      "Sempre verifique a legitimidade de solicitações que envolvem dados sensíveis através de um canal alternativo antes de tomar qualquer ação.",
  },
  {
    id: 2,
    text: "Ao notar um pen-drive desconhecido conectado a um computador interno, qual procedimento está correto?",
    options: [
      { text: "Retirar o pen-drive, armazená-lo em local seguro e reportar imediatamente.", correct: true },
      { text: "Explorar o conteúdo para identificar o dono.", correct: false },
      { text: "Formatar o pen-drive antes de devolvê-lo.", correct: false },
      { text: "Deixar conectado e avisar por e-mail.", correct: false },
    ],
    points: 25,
    timeLimit: 12,
    explanation:
      "Dispositivos desconhecidos podem conter malware. O procedimento correto é isolá-los e reportar o incidente sem explorar seu conteúdo.",
  },
  {
    id: 3,
    text: "Um colega comenta no grupo de WhatsApp sobre um vazamento envolvendo dados de clientes. Qual é a melhor atitude?",
    options: [
      { text: "Compartilhar mais detalhes para esclarecer a história.", correct: false },
      { text: "Alertar o Comitê de Privacidade e usar o canal oficial para reportar o incidente.", correct: true },
      { text: "Ignorar mensagens de rumores até que a mídia confirme.", correct: false },
      { text: "Perguntar mais detalhes no grupo.", correct: false },
      { text: "Sair do grupo para evitar problemas.", correct: false },
    ],
    points: 25,
    timeLimit: 18,
    explanation:
      "Incidentes de segurança devem ser reportados pelos canais oficiais para garantir uma resposta adequada e evitar o compartilhamento indevido de informações sensíveis.",
  },
  {
    id: 4,
    text: "Durante uma reunião online, um colega pede que você compartilhe sua tela mostrando a base de dados de clientes. O que fazer?",
    options: [
      { text: "Compartilhar apenas se for um colega de confiança.", correct: false },
      { text: "Verificar se ele tem autorização para acessar esses dados antes de compartilhar.", correct: true },
      { text: "Compartilhar a tela, mas ocultar as colunas com CPF e e-mail.", correct: false },
      { text: "Compartilhar sem restrições, é uma reunião interna.", correct: false },
    ],
    points: 25,
    timeLimit: 14,
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
      { text: "Usar os dados apenas em emergências.", correct: false },
      { text: "Compartilhar com colegas que precisam.", correct: false },
    ],
    points: 25,
    timeLimit: 16,
    explanation:
      "O princípio do privilégio mínimo determina que cada pessoa deve ter acesso apenas aos dados necessários para sua função, reduzindo riscos de vazamentos.",
  },
  {
    id: 6,
    text: "Qual é a melhor prática para criar senhas seguras?",
    options: [
      { text: "Usar o nome da empresa + ano atual.", correct: false },
      { text: "Combinar letras maiúsculas, minúsculas, números e símbolos.", correct: true },
      { text: "Usar a mesma senha para todos os sistemas.", correct: false },
      { text: "Usar apenas números da data de nascimento.", correct: false },
    ],
    points: 25,
    timeLimit: 10,
    explanation: "Senhas seguras devem combinar diferentes tipos de caracteres e ser únicas para cada sistema.",
  },
  {
    id: 7,
    text: "Como você deve proceder ao receber um link suspeito por e-mail?",
    options: [
      { text: "Clicar para verificar se é seguro.", correct: false },
      { text: "Não clicar e verificar a legitimidade do remetente.", correct: true },
      { text: "Encaminhar para colegas opinarem.", correct: false },
      { text: "Clicar apenas se conhecer o remetente.", correct: false },
      { text: "Salvar o link para verificar depois.", correct: false },
    ],
    points: 25,
    timeLimit: 13,
    explanation: "Links suspeitos nunca devem ser clicados. Sempre verifique a legitimidade através de canais seguros.",
  },
  {
    id: 8,
    text: "Qual é o procedimento correto para descarte de documentos com dados pessoais?",
    options: [
      { text: "Jogar no lixo comum.", correct: false },
      { text: "Fragmentar ou destruir completamente antes do descarte.", correct: true },
      { text: "Riscar os dados principais apenas.", correct: false },
      { text: "Guardar em arquivo morto.", correct: false },
    ],
    points: 25,
    timeLimit: 11,
    explanation: "Documentos com dados pessoais devem ser completamente destruídos para evitar recuperação indevida.",
  },
]

const getAchievementByPerformance = (correctAnswers: number, totalQuestions: number) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100)

  if (percentage >= achievementLevels.ciber_embaixador_flamboyant_badge.minPercentage) {
    return { ...achievementLevels.ciber_embaixador_flamboyant_badge, percentage }
  } else if (percentage >= achievementLevels.ciber_guardiao_badge.minPercentage) {
    return { ...achievementLevels.ciber_guardiao_badge, percentage }
  } else if (percentage >= achievementLevels.ciber_vigilante_badge.minPercentage) {
    return { ...achievementLevels.ciber_vigilante_badge, percentage }
  } else {
    return { ...achievementLevels.ciber_aprendiz_badge, percentage }
  }
}

export default function Game() {
  // Add new state for music theme selection
  const [showIntro, setShowIntro] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")
  const [pointsEarned, setPointsEarned] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [questionTimeLeft, setQuestionTimeLeft] = useState(0)
  const [questionTimer, setQuestionTimer] = useState<NodeJS.Timeout | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [answeredQuestions, setAnsweredQuestions] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [musicEnabled, setMusicEnabled] = useState(true)
  const [hasPlayedWarning, setHasPlayedWarning] = useState(false)

  // Audio refs
  const correctSoundRef = useRef<HTMLAudioElement | null>(null)
  const incorrectSoundRef = useRef<HTMLAudioElement | null>(null)
  const timeWarningSoundRef = useRef<HTMLAudioElement | null>(null)
  const timeUpSoundRef = useRef<HTMLAudioElement | null>(null)
  const tickSoundRef = useRef<HTMLAudioElement | null>(null)

  // Background music refs
  const audioContextRef = useRef<AudioContext | null>(null)
  const backgroundMusicRef = useRef<{
    oscillators: OscillatorNode[]
    gainNodes: GainNode[]
    stop: () => void
  } | null>(null)

  // Initialize audio elements and background music
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Create audio context
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()

      // Create audio elements with data URLs for simple sounds
      correctSoundRef.current = new Audio()
      incorrectSoundRef.current = new Audio()
      timeWarningSoundRef.current = new Audio()
      timeUpSoundRef.current = new Audio()
      tickSoundRef.current = new Audio()

      const audioContext = audioContextRef.current

      const createBeep = (frequency: number, duration: number, type: OscillatorType = "sine") => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = frequency
        oscillator.type = type

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration)
      }

      // Assign sound functions
      correctSoundRef.current.play = () => {
        if (soundEnabled) {
          createBeep(800, 0.2)
          setTimeout(() => createBeep(1000, 0.2), 100)
        }
      }

      incorrectSoundRef.current.play = () => {
        if (soundEnabled) {
          createBeep(300, 0.5, "sawtooth")
        }
      }

      timeWarningSoundRef.current.play = () => {
        if (soundEnabled) {
          createBeep(600, 0.1)
        }
      }

      timeUpSoundRef.current.play = () => {
        if (soundEnabled) {
          createBeep(200, 1, "square")
        }
      }

      tickSoundRef.current.play = () => {
        if (soundEnabled) {
          createBeep(400, 0.05)
        }
      }
    }

    return () => {
      // Cleanup audio context on unmount
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.stop()
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [soundEnabled])

  // Background music creation function with different themes
  const createBackgroundMusic = () => {
    if (!audioContextRef.current || !musicEnabled) return

    const audioContext = audioContextRef.current

    // Clear any existing music
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.stop()
    }

    const oscillators: OscillatorNode[] = []
    const gainNodes: GainNode[] = []

    // Professional, clean corporate ambience
    // Based on major chord progressions and warm tones

    // Root note - C (261.63 Hz)
    const rootOsc = audioContext.createOscillator()
    const rootGain = audioContext.createGain()
    rootOsc.connect(rootGain)
    rootGain.connect(audioContext.destination)
    rootOsc.frequency.setValueAtTime(130.81, audioContext.currentTime) // C3
    rootOsc.type = "sine"
    rootGain.gain.setValueAtTime(0.025, audioContext.currentTime)

    // Fifth - G (392 Hz)
    const fifthOsc = audioContext.createOscillator()
    const fifthGain = audioContext.createGain()
    fifthOsc.connect(fifthGain)
    fifthGain.connect(audioContext.destination)
    fifthOsc.frequency.setValueAtTime(196, audioContext.currentTime) // G3
    fifthOsc.type = "sine"
    fifthGain.gain.setValueAtTime(0.018, audioContext.currentTime)

    // Octave for richness
    const octaveOsc = audioContext.createOscillator()
    const octaveGain = audioContext.createGain()
    octaveOsc.connect(octaveGain)
    octaveGain.connect(audioContext.destination)
    octaveOsc.frequency.setValueAtTime(261.63, audioContext.currentTime) // C4
    octaveOsc.type = "triangle"
    octaveGain.gain.setValueAtTime(0.012, audioContext.currentTime)

    // Gentle LFO for breathing effect
    const lfo = audioContext.createOscillator()
    const lfoGain = audioContext.createGain()
    lfo.connect(lfoGain)
    lfoGain.connect(rootGain.gain)
    lfo.frequency.setValueAtTime(0.08, audioContext.currentTime)
    lfo.type = "sine"
    lfoGain.gain.setValueAtTime(0.008, audioContext.currentTime)

    oscillators.push(rootOsc, fifthOsc, octaveOsc, lfo)
    gainNodes.push(rootGain, fifthGain, octaveGain, lfoGain)

    // Start all oscillators
    oscillators.forEach((osc) => osc.start(audioContext.currentTime))

    // Store reference for cleanup
    backgroundMusicRef.current = {
      oscillators,
      gainNodes,
      stop: () => {
        oscillators.forEach((osc) => {
          try {
            osc.stop()
          } catch (e) {
            // Oscillator might already be stopped
          }
        })
      },
    }
  }

  // Start background music when game starts
  const startBackgroundMusic = () => {
    if (musicEnabled && !backgroundMusicRef.current) {
      // Small delay to ensure user interaction has occurred
      setTimeout(() => {
        createBackgroundMusic()
      }, 100)
    }
  }

  // Stop background music
  const stopBackgroundMusic = () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.stop()
      backgroundMusicRef.current = null
    }
  }

  // Extract user ID from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userIdParam = params.get("user_id")
    if (userIdParam) {
      setUserId(userIdParam)
    }
  }, [])

  const playSound = (soundRef: React.MutableRefObject<HTMLAudioElement | null>) => {
    if (soundEnabled && soundRef.current) {
      try {
        soundRef.current.play()
      } catch (error) {
        console.log("Audio play failed:", error)
      }
    }
  }

  const startQuestionTimer = () => {
    const timeLimit = questions[currentQuestion].timeLimit
    setQuestionTimeLeft(timeLimit)
    setHasPlayedWarning(false)

    const timer = setInterval(() => {
      setQuestionTimeLeft((prev) => {
        // Play warning sound at 5 seconds
        if (prev === 5 && !hasPlayedWarning) {
          playSound(timeWarningSoundRef)
          setHasPlayedWarning(true)
        }

        // Play tick sound for last 3 seconds
        if (prev <= 3 && prev > 0) {
          playSound(tickSoundRef)
        }

        if (prev <= 1) {
          clearInterval(timer)
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    setQuestionTimer(timer)
  }

  const clearQuestionTimer = () => {
    if (questionTimer) {
      clearInterval(questionTimer)
      setQuestionTimer(null)
    }
  }

  const handleStartGame = () => {
    setShowIntro(false)
    startBackgroundMusic()
    startQuestionTimer()
  }

  const handleOptionClick = (isCorrect: boolean, points: number) => {
    clearQuestionTimer()

    if (isCorrect) {
      playSound(correctSoundRef)
      setTotalPoints(totalPoints + points)
      setCorrectAnswers(correctAnswers + 1)
      setPointsEarned(points)
      setIsCorrect(true)
      setFeedbackText(questions[currentQuestion].explanation)
    } else {
      playSound(incorrectSoundRef)
      setIsCorrect(false)
      setPointsEarned(0)
      setFeedbackText("Resposta incorreta, mas você pode continuar! " + questions[currentQuestion].explanation)
    }
    setAnsweredQuestions(answeredQuestions + 1)
    setShowFeedback(true)
  }

  const handleTimeUp = () => {
    clearQuestionTimer()
    playSound(timeUpSoundRef)
    setIsCorrect(false)
    setPointsEarned(0)
    setFeedbackText("Tempo esgotado! " + questions[currentQuestion].explanation)
    setAnsweredQuestions(answeredQuestions + 1)
    setShowFeedback(true)
  }

  const handleContinue = () => {
    setShowFeedback(false)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      startQuestionTimer()
    } else {
      stopBackgroundMusic()
      setIsGameComplete(true)
    }
  }

  const handleRedeemPoints = () => {
    const achievement = getAchievementByPerformance(correctAnswers, questions.length)

    // Use the achievement's specific URL
    let redirectUrl = achievement.url

    // Add query parameters
    redirectUrl += (redirectUrl.includes("?") ? "&" : "?") + "completed=true"
    redirectUrl += `&points=${totalPoints}`
    redirectUrl += `&questions_answered=${answeredQuestions}`
    redirectUrl += `&total_questions=${questions.length}`
    redirectUrl += `&correct_answers=${correctAnswers}`
    redirectUrl += `&percentage=${achievement.percentage}`
    redirectUrl += `&achievement_id=${achievement.id}`
    redirectUrl += `&achievement_name=${encodeURIComponent(achievement.name)}`
    redirectUrl += `&gamipress_points=${achievement.points}`

    if (userId) {
      redirectUrl += `&user_id=${userId}`
    }

    // Track completion with GamiPress if enabled
    if (gameConfig.enableGamiPressTracking && gameConfig.gamiPressWebhookUrl) {
      const gamiPressData = {
        event: "escape_room_completed",
        user_id: userId || "anonymous",
        points: totalPoints,
        questions_answered: answeredQuestions,
        total_questions: questions.length,
        correct_answers: correctAnswers,
        percentage: achievement.percentage,
        achievement_id: achievement.id,
        achievement_name: achievement.name,
        gamipress_points: achievement.points,
        timestamp: new Date().toISOString(),
      }

      fetch(gameConfig.gamiPressWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gamiPressData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("GamiPress tracking successful:", data)
          window.location.href = redirectUrl
        })
        .catch((error) => {
          console.error("GamiPress tracking failed:", error)
          // Redirect even if tracking fails
          window.location.href = redirectUrl
        })
    } else {
      window.location.href = redirectUrl
    }
  }

  const handleTryAgain = () => {
    stopBackgroundMusic()
    window.location.reload()
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
  }

  const toggleMusic = () => {
    setMusicEnabled(!musicEnabled)
    if (musicEnabled) {
      stopBackgroundMusic()
    } else if (!showIntro) {
      startBackgroundMusic()
    }
  }

  const getTimerColor = () => {
    if (questionTimeLeft <= 3) return "text-red-400 animate-pulse"
    if (questionTimeLeft <= 7) return "text-yellow-400"
    return "text-green-400"
  }

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / questions.length) * 100
  }

  // Get achievement icon based on performance
  const getAchievementIcon = (achievement: any) => {
    if (achievement.percentage >= 76) return <Crown className="h-8 w-8" style={{ color: achievement.color }} />
    if (achievement.percentage >= 51) return <Trophy className="h-8 w-8" style={{ color: achievement.color }} />
    if (achievement.percentage >= 26) return <Medal className="h-8 w-8" style={{ color: achievement.color }} />
    return <Award className="h-8 w-8" style={{ color: achievement.color }} />
  }

  if (isGameOver) {
    return <GameOver onTryAgain={handleTryAgain} />
  }

  if (isGameComplete) {
    const achievement = getAchievementByPerformance(correctAnswers, questions.length)

    return (
      <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-50 p-4">
        <div className="max-w-lg w-full bg-white rounded-2xl p-8 text-center shadow-2xl border-4 border-red-600">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Image
                src="/images/logo.png"
                alt="Flamboyant Shopping Logo"
                width={120}
                height={120}
                className="drop-shadow-2xl"
              />
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full shadow-2xl overflow-hidden border-4 border-white">
                <Image
                  src={achievement.image || "/placeholder.svg"}
                  alt={achievement.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute inset-0 rounded-full blur-2xl -z-10"
                style={{ backgroundColor: `${achievement.color}33` }}
              ></div>
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-6 text-red-600">🎉 {achievement.name}!</h2>

          <p className="text-gray-800 mb-8 text-lg leading-relaxed">
            <strong className="text-red-600">Parabéns!</strong> Você completou o desafio de segurança da informação do{" "}
            {gameConfig.companyName} com <strong className="text-red-600">{achievement.percentage}% de acerto</strong>!
          </p>

          {/* Achievement Badge */}
          <div className="p-6 rounded-xl border-2 border-red-200 mb-8 bg-red-50">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-red-300">
                <Image
                  src={achievement.image || "/placeholder.svg"}
                  alt={achievement.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-2xl text-red-700">{achievement.name}</h3>
            </div>
            <p className="text-gray-700 text-lg mb-4">{achievement.description}</p>
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{achievement.points}</div>
                <div className="text-sm text-gray-600">Pontos GamiPress</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">{totalPoints}</div>
                <div className="text-sm text-gray-600">Pontos do Jogo</div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200 mb-8 text-left">
            <h3 className="font-bold text-blue-700 mb-4 flex items-center text-xl">📊 Relatório de Performance:</h3>
            <ul className="space-y-3 text-gray-700 text-lg">
              <li className="flex items-center">
                <span className="text-blue-600 mr-3">📝</span>
                Perguntas respondidas:{" "}
                <strong className="text-blue-700 ml-2">
                  {answeredQuestions}/{questions.length}
                </strong>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-3">✅</span>
                Respostas corretas: <strong className="text-green-700 ml-2">{correctAnswers}</strong>
              </li>
              <li className="flex items-center">
                <span className="text-yellow-600 mr-3">🏆</span>
                Taxa de acerto: <strong className="text-yellow-700 ml-2">{achievement.percentage}%</strong>
              </li>
              <li className="flex items-center">
                <span className="text-red-600 mr-3">🎯</span>
                Nível alcançado: <strong className="text-red-700 ml-2">{achievement.name}</strong>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              className="w-full text-white flex items-center justify-center text-xl py-6 font-bold border-2 hover:scale-105 transition-all duration-300 bg-red-600 hover:bg-red-700 border-red-600"
              onClick={handleRedeemPoints}
            >
              🎯 {gameConfig.finishButtonText} <ExternalLink className="ml-2 h-5 w-5" />
            </Button>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3" onClick={handleTryAgain}>
                🔄 Jogar Novamente
              </Button>

              <Link href="/">
                <Button
                  variant="outline"
                  className="border-2 border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold px-6 py-3 bg-white"
                >
                  🏠 Voltar ao Início
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-br from-red-950 via-red-900 to-red-800">
      <div className="w-full max-w-5xl">
        {/* Enhanced Header */}
        <div className="flex justify-between items-center p-6 bg-black/40 backdrop-blur-sm rounded-xl mb-6 shadow-lg border border-red-600/30">
          <Link href="/" className="text-red-200 hover:text-white transition-colors font-semibold flex items-center">
            ← <span className="ml-2 hidden sm:inline">Sair</span>
          </Link>
          <div className="flex items-center">
            <Image src="/images/logo.png" alt="Flamboyant Shopping Logo" width={40} height={40} className="mr-3" />
            <h1 className="text-lg sm:text-xl font-bold text-white drop-shadow-lg">{gameConfig.gameTitle}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMusic}
              className="bg-red-600/20 border-red-600 text-white hover:bg-red-600/40"
              title={musicEnabled ? "Desativar música" : "Ativar música"}
            >
              <Music className={`h-4 w-4 ${musicEnabled ? "text-green-400" : "text-gray-400"}`} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSound}
              className="bg-red-600/20 border-red-600 text-white hover:bg-red-600/40"
              title={soundEnabled ? "Desativar som" : "Ativar som"}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <div className="flex items-center space-x-2 bg-yellow-600/20 px-3 py-2 rounded-lg border border-yellow-600">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-lg text-yellow-300 font-bold">{totalPoints}</span>
            </div>
          </div>
        </div>

        {showIntro ? (
          <Card className="bg-white text-gray-800 shadow-2xl max-w-4xl mx-auto border-4 border-red-600">
            <CardHeader className="text-center pb-4 bg-red-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl flex items-center justify-center font-bold">
                <AlertTriangle className="mr-3 h-8 w-8 text-yellow-300" />
                {"🚨 Desafio de Segurança"}
              </CardTitle>
              <CardDescription className="text-red-100 text-lg font-medium">
                Teste seus conhecimentos sobre segurança da informação no {gameConfig.companyName}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <p className="text-gray-800 text-lg leading-relaxed font-medium text-center">
                Você enfrentará {questions.length} perguntas sobre segurança da informação. Cada pergunta tem um tempo
                limite para ser respondida e vale pontos pela resposta correta.
              </p>

              {/* Achievement Levels Preview */}
              <div className="p-6 bg-red-50 rounded-xl border-2 border-red-200 mt-6">
                <h3 className="font-bold text-red-700 mb-4 text-xl text-center">🏆 Níveis de Conquista:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.values(achievementLevels).map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 rounded-lg border-2 bg-white shadow-sm"
                      style={{
                        borderColor: achievement.color,
                      }}
                    >
                      <div className="mr-3 w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                        <Image
                          src={achievement.image || "/placeholder.svg"}
                          alt={achievement.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-800">{achievement.name}</h4>
                        <p className="text-sm text-gray-600">
                          {achievement.minPercentage}%-{achievement.maxPercentage}% de acerto
                        </p>
                        <p className="text-sm text-red-600 font-semibold">{achievement.points} pontos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-yellow-50 rounded-xl border-2 border-yellow-300 mt-6">
                <h3 className="font-bold text-yellow-800 mb-4 text-xl text-center">🎯 Como Funciona:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-3 text-gray-800 font-medium">
                    <li className="flex items-center">
                      <span className="text-yellow-600 mr-3">⏱️</span>
                      Cada pergunta tem tempo limitado (10-18 segundos)
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-600 mr-3">🏆</span>
                      Respostas corretas valem 25 pontos cada
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-600 mr-3">📈</span>
                      Pontuação máxima: 200 pontos
                    </li>
                  </ul>
                  <ul className="space-y-3 text-gray-800 font-medium">
                    <li className="flex items-center">
                      <span className="text-yellow-600 mr-3">🎵</span>Música ambiente corporativa para concentração
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-600 mr-3">🔊</span>
                      Sons indicam respostas corretas/incorretas
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-600 mr-3">🎁</span>
                      Conquistas baseadas na sua performance
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-8">
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white text-xl py-6 font-bold"
                onClick={handleStartGame}
              >
                🚀 Iniciar Desafio
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-red-600/30">
              <div className="flex justify-between items-center mb-3">
                <span className="text-white font-semibold">Progresso do Desafio</span>
                <span className="text-gray-300 text-sm">
                  {currentQuestion + 1} de {questions.length}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-red-500 to-red-400 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>

            {/* Question Card */}
            <Card className="bg-white text-gray-800 shadow-2xl border-4 border-red-600">
              <CardHeader className="pb-4 bg-red-600 text-white">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white text-red-600 rounded-full p-2 font-bold">
                      <span className="text-lg">{currentQuestion + 1}</span>
                    </div>
                    <CardTitle className="text-2xl font-bold">Pergunta {currentQuestion + 1}</CardTitle>
                  </div>

                  {/* Enhanced Timer */}
                  <div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 ${
                      questionTimeLeft <= 3
                        ? "bg-red-100 border-red-500 text-red-600"
                        : questionTimeLeft <= 7
                          ? "bg-yellow-100 border-yellow-500 text-yellow-600"
                          : "bg-green-100 border-green-500 text-green-600"
                    }`}
                  >
                    <Timer className="h-5 w-5" />
                    <span className="text-2xl font-bold font-mono">{questionTimeLeft}s</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 p-8">
                {/* Question Text */}
                <div className="p-6 bg-red-50 rounded-xl border-l-4 border-red-500 shadow-inner">
                  <p className="text-xl sm:text-2xl text-gray-800 leading-relaxed font-semibold">
                    {questions[currentQuestion].text}
                  </p>
                </div>

                {/* Answer Options */}
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left py-6 px-6 border-2 border-red-300 hover:border-red-500 hover:bg-red-50 text-gray-800 bg-white hover:text-red-700 text-base sm:text-lg leading-relaxed font-medium transition-all duration-200 group"
                      onClick={() => handleOptionClick(option.correct, questions[currentQuestion].points)}
                      disabled={questionTimeLeft === 0}
                    >
                      <div className="flex items-center w-full">
                        <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold text-lg group-hover:bg-red-700 transition-colors">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="font-semibold flex-1">{option.text}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Enhanced Feedback Dialog */}
      <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
        <DialogContent className="bg-white text-gray-800 border-4 border-red-600 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              {isCorrect ? (
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              ) : (
                <XCircle className="h-8 w-8 text-red-600" />
              )}
              <span
                className={`text-2xl font-bold ${
                  isCorrect ? "text-green-600" : questionTimeLeft === 0 ? "text-red-600" : "text-yellow-600"
                }`}
              >
                {isCorrect
                  ? "✅ Resposta Correta!"
                  : questionTimeLeft === 0
                    ? "⏰ Tempo Esgotado!"
                    : "⚠️ Resposta Incorreta"}
              </span>
            </DialogTitle>
            <DialogDescription className="text-gray-700 text-lg">
              {isCorrect && (
                <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg border border-green-300 mt-4">
                  <Star className="mr-3 h-8 w-8 text-yellow-500" />
                  <span className="text-2xl font-bold text-green-700">+{pointsEarned} pontos!</span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 p-6 bg-red-50 rounded-xl border border-red-300">
            <h4 className="text-lg font-bold text-red-700 mb-3">💡 Explicação:</h4>
            <p className="text-gray-700 text-lg leading-relaxed font-medium">{feedbackText}</p>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold flex items-center space-x-2"
              onClick={handleContinue}
            >
              <span>➡️ {currentQuestion < questions.length - 1 ? "Próxima Pergunta" : "Ver Resultado"}</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
