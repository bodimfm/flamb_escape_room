"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface TimerProps {
  initialTime: number
  onTimeUp: () => void
  setTimeRemaining?: (time: number) => void
}

export default function Timer({ initialTime, onTimeUp, setTimeRemaining }: TimerProps) {
  const [localTime, setLocalTime] = useState(initialTime)

  useEffect(() => {
    const id = setInterval(() => {
      setLocalTime((prev) => Math.max(prev - 1, 0))
    }, 1_000)

    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (setTimeRemaining) setTimeRemaining(localTime)

    if (localTime === 0) onTimeUp()
  }, [localTime, onTimeUp, setTimeRemaining])

  const format = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`

  const getTimerStyle = () => {
    if (localTime < 60) return "text-red-400 animate-pulse font-bold"
    if (localTime < 180) return "text-yellow-400 font-semibold"
    return "text-white font-medium"
  }

  return (
    <div className={`flex items-center ${getTimerStyle()} game-text-shadow`}>
      <Clock className="h-5 w-5 mr-2" />
      <span className="font-mono text-lg">{format(localTime)}</span>
    </div>
  )
}
