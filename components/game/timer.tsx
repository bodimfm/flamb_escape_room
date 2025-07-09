"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface TimerProps {
  initialTime: number
  onTimeUp: () => void
  setTimeRemaining?: (time: number) => void
}

export default function Timer({ initialTime, onTimeUp, setTimeRemaining }: TimerProps) {
  const [timeRemaining, setTimeRemainingLocal] = useState(initialTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemainingLocal((prev) => {
        const newTime = prev - 1
        if (setTimeRemaining) {
          setTimeRemaining(newTime)
        }

        if (newTime <= 0) {
          clearInterval(timer)
          onTimeUp()
          return 0
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onTimeUp, setTimeRemaining])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Determine color based on time remaining
  const getTimerColor = () => {
    if (timeRemaining < 60) return "text-red-500" // Less than 1 minute
    if (timeRemaining < 180) return "text-yellow-500" // Less than 3 minutes
    return "text-white"
  }

  return (
    <div className={`flex items-center ${getTimerColor()}`}>
      <Clock className="h-4 w-4 mr-2" />
      <span className="font-mono">{formatTime(timeRemaining)}</span>
    </div>
  )
}
