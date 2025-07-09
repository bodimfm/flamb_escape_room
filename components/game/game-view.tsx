"use client"

import { useState } from "react"
import Image from "next/image"
import { useGame } from "./game-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ArrowUp, ArrowRight, ArrowDown, ArrowLeft } from "lucide-react"

export default function GameView({ onWin }) {
  const { gameState, moveToRoom, pickupItem, examineItem, useItem, solvePuzzle } = useGame()
  const [selectedItem, setSelectedItem] = useState(null)
  const [showPuzzleDialog, setShowPuzzleDialog] = useState(false)
  const [puzzleInput, setPuzzleInput] = useState("")
  const [currentPuzzle, setCurrentPuzzle] = useState(null)
  const [attemptedSafe, setAttemptedSafe] = useState(false)

  const currentRoom = gameState.rooms[gameState.currentRoom]

  // Check if player has won
  if (gameState.hasKey && gameState.currentRoom === "entrance") {
    onWin()
  }

  const handleItemClick = (item) => {
    if (item.canPickup) {
      pickupItem(item.id)
    } else {
      examineItem(item.id)

      // Special case for interactive items
      if (item.id === "keypad") {
        setCurrentPuzzle("keypad")
        setShowPuzzleDialog(true)
      }

      if (item.id === "safe" && !gameState.puzzles.safe.isSolved) {
        setAttemptedSafe(true)
      }
    }
  }

  // Always call useItem, even if it's a no-op
  if (attemptedSafe && !gameState.puzzles.safe.isSolved) {
    const hasStoreKey = gameState.inventory.some((invItem) => invItem.id === "storeKey")
    if (hasStoreKey) {
      useItem("storeKey", "safe")
      setAttemptedSafe(false) // Reset after attempting to use the item
    }
  }

  const handlePuzzleSubmit = (e) => {
    e.preventDefault()
    const solved = solvePuzzle(currentPuzzle, puzzleInput)
    if (solved) {
      setShowPuzzleDialog(false)
      setPuzzleInput("")
    } else {
      setPuzzleInput("")
    }
  }

  const renderNavigation = () => {
    return (
      <div className="absolute bottom-4 right-4 flex flex-col items-center">
        <Button
          variant="outline"
          size="icon"
          className="bg-red-600 text-white hover:bg-red-700 mb-2"
          onClick={() => currentRoom.exits.north && moveToRoom(currentRoom.exits.north)}
          disabled={!currentRoom.exits.north}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={() => currentRoom.exits.west && moveToRoom(currentRoom.exits.west)}
            disabled={!currentRoom.exits.west}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={() => currentRoom.exits.south && moveToRoom(currentRoom.exits.south)}
            disabled={!currentRoom.exits.south}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={() => currentRoom.exits.east && moveToRoom(currentRoom.exits.east)}
            disabled={!currentRoom.exits.east}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      {/* Room background */}
      <div className="relative w-full h-full">
        <Image src={currentRoom.image || "/placeholder.svg"} alt={currentRoom.name} fill className="object-cover" />

        {/* Room info overlay */}
        <div className="absolute top-0 left-0 p-4 bg-black/70 text-white max-w-md">
          <h2 className="text-xl font-bold text-red-400">{currentRoom.name}</h2>
          <p className="text-sm">{currentRoom.description}</p>
        </div>

        {/* Items in room */}
        <div className="absolute bottom-20 left-4 flex flex-wrap gap-2 max-w-[70%]">
          {currentRoom.items
            .filter((item) => item.canPickup || !item.isUsed)
            .map((item) => (
              <div
                key={item.id}
                className="bg-black/50 p-2 rounded-md cursor-pointer hover:bg-red-900/50 transition-colors flex items-center"
                onClick={() => handleItemClick(item)}
              >
                <div className="relative w-10 h-10 mr-2">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <span className="text-white text-sm">{item.name}</span>
                {item.canPickup ? (
                  <span className="ml-2 text-xs text-green-400">(Pick up)</span>
                ) : (
                  <span className="ml-2 text-xs text-yellow-400">(Examine)</span>
                )}
              </div>
            ))}
        </div>

        {/* Navigation controls */}
        {renderNavigation()}

        {/* Game messages */}
        <div className="absolute top-20 right-4 max-w-xs bg-black/70 p-3 rounded-md text-white max-h-60 overflow-y-auto">
          <h3 className="text-sm font-bold mb-2 text-red-400">Messages:</h3>
          <ul className="space-y-2 text-xs">
            {gameState.messages.slice(-5).map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Puzzle dialog */}
      <Dialog open={showPuzzleDialog} onOpenChange={setShowPuzzleDialog}>
        <DialogContent className="bg-gray-900 text-white border-red-600">
          <DialogHeader>
            <DialogTitle className="text-red-400">
              {currentPuzzle === "keypad" ? "Security Keypad" : "Puzzle"}
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              {currentPuzzle === "keypad"
                ? "Enter the 4-digit security code to unlock the door."
                : "Solve the puzzle to proceed."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePuzzleSubmit}>
            <Input
              type={currentPuzzle === "keypad" ? "number" : "text"}
              placeholder={currentPuzzle === "keypad" ? "0000" : "Enter solution"}
              value={puzzleInput}
              onChange={(e) => setPuzzleInput(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />

            <DialogFooter className="mt-4">
              <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
