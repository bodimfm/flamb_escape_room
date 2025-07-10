"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define the types for our game state
type Item = {
  id: string
  name: string
  image: string
  description: string
  canPickup: boolean
  isUsed: boolean
}

type Room = {
  id: string
  name: string
  description: string
  image: string
  items: Item[]
  exits: {
    north?: string
    east?: string
    south?: string
    west?: string
  }
}

type Puzzle = {
  id: string
  isSolved: boolean
  requiredItems: string[]
  solution: string
}

type GameState = {
  currentRoom: string
  inventory: Item[]
  rooms: Record<string, Room>
  puzzles: Record<string, Puzzle>
  messages: string[]
  hasKey: boolean
}

type GameContextType = {
  gameState: GameState
  moveToRoom: (roomId: string) => void
  pickupItem: (itemId: string) => void
  useItem: (itemId: string, targetId?: string) => void
  examineItem: (itemId: string) => void
  solvePuzzle: (puzzleId: string, answer: string) => boolean
  addMessage: (message: string) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

// Initial game state
const initialGameState: GameState = {
  currentRoom: "entrance",
  inventory: [],
  hasKey: false,
  messages: ["You find yourself locked in the shopping mall. Find a way to escape!"],
  rooms: {
    entrance: {
      id: "entrance",
      name: "Mall Entrance",
      description: "The main entrance of the mall. The doors are locked.",
      image: "/crimson-gateway.png",
      items: [
        {
          id: "notice",
          name: "Security Notice",
          image: "/cyber-security-shield.png",
          description: 'A notice that says: "Security rounds at 12:00 AM. Remember code: RED-STAR-7"',
          canPickup: false,
          isUsed: false,
        },
        {
          id: "flashlight",
          name: "Flashlight",
          image: "/beam-of-light.png",
          description: "A small flashlight. Might be useful in dark areas.",
          canPickup: true,
          isUsed: false,
        },
      ],
      exits: {
        north: "atrium",
        east: "foodCourt",
      },
    },
    atrium: {
      id: "atrium",
      name: "Central Atrium",
      description: "A large open area with a fountain in the center.",
      image: "/mall-red-atrium.png",
      items: [
        {
          id: "coin",
          name: "Shiny Coin",
          image: "/gleaming-currency.png",
          description: "A commemorative Flamboyant Shopping coin.",
          canPickup: true,
          isUsed: false,
        },
      ],
      exits: {
        north: "securityOffice",
        east: "clothingStore",
        south: "entrance",
        west: "electronicsStore",
      },
    },
    foodCourt: {
      id: "foodCourt",
      name: "Food Court",
      description: "The mall's food court. All shops are closed.",
      image: "/placeholder.svg?height=400&width=600&query=empty food court with red chairs",
      items: [
        {
          id: "receipt",
          name: "Receipt",
          image: "/placeholder.svg?height=100&width=100&query=receipt",
          description: 'A receipt with a strange sequence: "5-8-3-7"',
          canPickup: true,
          isUsed: false,
        },
      ],
      exits: {
        west: "entrance",
        north: "clothingStore",
      },
    },
    clothingStore: {
      id: "clothingStore",
      name: "Clothing Store",
      description: "A high-end clothing store with red star branding.",
      image: "/placeholder.svg?height=400&width=600&query=clothing store with red star logo",
      items: [
        {
          id: "mannequin",
          name: "Mannequin",
          image: "/placeholder.svg?height=100&width=100&query=mannequin",
          description: "A mannequin wearing a red star t-shirt. There's something in the pocket.",
          canPickup: false,
          isUsed: false,
        },
        {
          id: "storeKey",
          name: "Store Key",
          image: "/placeholder.svg?height=100&width=100&query=small key",
          description: "A small key with a clothing tag.",
          canPickup: false, // Hidden until mannequin is examined
          isUsed: false,
        },
      ],
      exits: {
        south: "foodCourt",
        west: "atrium",
      },
    },
    electronicsStore: {
      id: "electronicsStore",
      name: "Electronics Store",
      description: "An electronics store with various gadgets.",
      image: "/placeholder.svg?height=400&width=600&query=dark electronics store",
      items: [
        {
          id: "tablet",
          name: "Tablet",
          image: "/placeholder.svg?height=100&width=100&query=tablet device",
          description: "A tablet with a dead battery.",
          canPickup: true,
          isUsed: false,
        },
        {
          id: "charger",
          name: "Charger",
          image: "/placeholder.svg?height=100&width=100&query=charger cable",
          description: "A charging cable that might work with the tablet.",
          canPickup: true,
          isUsed: false,
        },
      ],
      exits: {
        east: "atrium",
      },
    },
    securityOffice: {
      id: "securityOffice",
      name: "Security Office",
      description: "The mall security office. The door is locked.",
      image: "/placeholder.svg?height=400&width=600&query=security office door with keypad",
      items: [
        {
          id: "keypad",
          name: "Security Keypad",
          image: "/placeholder.svg?height=100&width=100&query=security keypad",
          description: "A keypad that requires a 4-digit code.",
          canPickup: false,
          isUsed: false,
        },
      ],
      exits: {
        south: "atrium",
      },
    },
    securityRoom: {
      id: "securityRoom",
      name: "Security Room",
      description: "Inside the security office. There's a safe on the wall.",
      image: "/placeholder.svg?height=400&width=600&query=security room with monitors and safe",
      items: [
        {
          id: "safe",
          name: "Wall Safe",
          image: "/placeholder.svg?height=100&width=100&query=wall safe",
          description: "A safe that requires a special key.",
          canPickup: false,
          isUsed: false,
        },
        {
          id: "exitKey",
          name: "Exit Key",
          image: "/placeholder.svg?height=100&width=100&query=master key with red tag",
          description: "The master key to exit the mall!",
          canPickup: false, // Hidden until safe is opened
          isUsed: false,
        },
      ],
      exits: {
        south: "atrium",
      },
    },
  },
  puzzles: {
    mannequin: {
      id: "mannequin",
      isSolved: false,
      requiredItems: [],
      solution: "examine",
    },
    tablet: {
      id: "tablet",
      isSolved: false,
      requiredItems: ["charger"],
      solution: "charge",
    },
    keypad: {
      id: "keypad",
      isSolved: false,
      requiredItems: [],
      solution: "5837",
    },
    fountain: {
      id: "fountain",
      isSolved: false,
      requiredItems: ["coin"],
      solution: "wish",
    },
    safe: {
      id: "safe",
      isSolved: false,
      requiredItems: ["storeKey"],
      solution: "unlock",
    },
    exitDoor: {
      id: "exitDoor",
      isSolved: false,
      requiredItems: ["exitKey"],
      solution: "escape",
    },
  },
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState)

  const moveToRoom = (roomId: string) => {
    setGameState((prevState) => ({
      ...prevState,
      currentRoom: roomId,
      messages: [...prevState.messages, `You moved to the ${prevState.rooms[roomId].name}.`],
    }))
  }

  const pickupItem = (itemId: string) => {
    setGameState((prevState) => {
      const currentRoom = prevState.rooms[prevState.currentRoom]
      const itemIndex = currentRoom.items.findIndex((item) => item.id === itemId)

      if (itemIndex === -1 || !currentRoom.items[itemIndex].canPickup) {
        return prevState
      }

      const item = currentRoom.items[itemIndex]
      const updatedItems = [...currentRoom.items]
      updatedItems.splice(itemIndex, 1)

      const updatedRooms = {
        ...prevState.rooms,
        [prevState.currentRoom]: {
          ...currentRoom,
          items: updatedItems,
        },
      }

      return {
        ...prevState,
        inventory: [...prevState.inventory, item],
        rooms: updatedRooms,
        messages: [...prevState.messages, `You picked up the ${item.name}.`],
      }
    })
  }

  const useItem = (itemId: string, targetId?: string) => {
    setGameState((prevState) => {
      // Find the item in inventory
      const itemIndex = prevState.inventory.findIndex((item) => item.id === itemId)
      if (itemIndex === -1) return prevState

      const item = prevState.inventory[itemIndex]

      // Handle special item interactions
      if (itemId === "flashlight" && prevState.currentRoom === "electronicsStore") {
        // Using flashlight in electronics store reveals hidden items
        return {
          ...prevState,
          messages: [...prevState.messages, `You used the ${item.name} to look around the dark store.`],
        }
      }

      if (itemId === "charger" && targetId === "tablet") {
        // Solve the tablet puzzle
        const updatedPuzzles = {
          ...prevState.puzzles,
          tablet: {
            ...prevState.puzzles.tablet,
            isSolved: true,
          },
        }

        return {
          ...prevState,
          puzzles: updatedPuzzles,
          messages: [...prevState.messages, `You charged the tablet. It shows a message: "Security code: 5-8-3-7"`],
        }
      }

      if (itemId === "coin" && prevState.currentRoom === "atrium") {
        // Using coin in the fountain
        const updatedPuzzles = {
          ...prevState.puzzles,
          fountain: {
            ...prevState.puzzles.fountain,
            isSolved: true,
          },
        }

        return {
          ...prevState,
          puzzles: updatedPuzzles,
          messages: [...prevState.messages, `You tossed the coin into the fountain. Something glimmers at the bottom.`],
        }
      }

      if (itemId === "storeKey" && targetId === "safe") {
        // Using store key on the safe
        const updatedPuzzles = {
          ...prevState.puzzles,
          safe: {
            ...prevState.puzzles.safe,
            isSolved: true,
          },
        }

        // Make exit key available
        const securityRoom = prevState.rooms.securityRoom
        const updatedItems = securityRoom.items.map((item) =>
          item.id === "exitKey" ? { ...item, canPickup: true } : item,
        )

        const updatedRooms = {
          ...prevState.rooms,
          securityRoom: {
            ...securityRoom,
            items: updatedItems,
          },
        }

        return {
          ...prevState,
          puzzles: updatedPuzzles,
          rooms: updatedRooms,
          messages: [...prevState.messages, `You unlocked the safe! Inside is the exit key.`],
        }
      }

      if (itemId === "exitKey" && prevState.currentRoom === "entrance") {
        // Using exit key at the entrance
        return {
          ...prevState,
          hasKey: true,
          messages: [...prevState.messages, `You used the exit key on the main doors. You can now escape!`],
        }
      }

      // Default message if no special interaction
      return {
        ...prevState,
        messages: [...prevState.messages, `You tried to use the ${item.name}, but nothing happened.`],
      }
    })
  }

  const examineItem = (itemId: string) => {
    setGameState((prevState) => {
      // Check if item is in current room
      const currentRoom = prevState.rooms[prevState.currentRoom]
      const roomItem = currentRoom.items.find((item) => item.id === itemId)

      if (roomItem) {
        // Special case for mannequin
        if (itemId === "mannequin" && !prevState.puzzles.mannequin.isSolved) {
          const updatedPuzzles = {
            ...prevState.puzzles,
            mannequin: {
              ...prevState.puzzles.mannequin,
              isSolved: true,
            },
          }

          // Make store key available
          const clothingStore = prevState.rooms.clothingStore
          const updatedItems = clothingStore.items.map((item) =>
            item.id === "storeKey" ? { ...item, canPickup: true } : item,
          )

          const updatedRooms = {
            ...prevState.rooms,
            clothingStore: {
              ...clothingStore,
              items: updatedItems,
            },
          }

          return {
            ...prevState,
            puzzles: updatedPuzzles,
            rooms: updatedRooms,
            messages: [...prevState.messages, `You examined the mannequin and found a store key in the pocket!`],
          }
        }

        return {
          ...prevState,
          messages: [...prevState.messages, `You examined the ${roomItem.name}: ${roomItem.description}`],
        }
      }

      // Check if item is in inventory
      const inventoryItem = prevState.inventory.find((item) => item.id === itemId)
      if (inventoryItem) {
        return {
          ...prevState,
          messages: [...prevState.messages, `You examined the ${inventoryItem.name}: ${inventoryItem.description}`],
        }
      }

      return prevState
    })
  }

  const solvePuzzle = (puzzleId: string, answer: string) => {
    let solved = false

    setGameState((prevState) => {
      const puzzle = prevState.puzzles[puzzleId]
      if (!puzzle) return prevState

      // Check if the answer is correct
      if (puzzle.solution.toLowerCase() === answer.toLowerCase()) {
        solved = true

        // Special handling for keypad puzzle
        if (puzzleId === "keypad" && prevState.currentRoom === "securityOffice") {
          return {
            ...prevState,
            currentRoom: "securityRoom",
            puzzles: {
              ...prevState.puzzles,
              keypad: {
                ...puzzle,
                isSolved: true,
              },
            },
            messages: [...prevState.messages, `You entered the correct code! The security office door opens.`],
          }
        }

        return {
          ...prevState,
          puzzles: {
            ...prevState.puzzles,
            [puzzleId]: {
              ...puzzle,
              isSolved: true,
            },
          },
          messages: [...prevState.messages, `You solved the puzzle!`],
        }
      }

      return {
        ...prevState,
        messages: [...prevState.messages, `That doesn't seem to work...`],
      }
    })

    return solved
  }

  const addMessage = (message: string) => {
    setGameState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }))
  }

  return (
    <GameContext.Provider
      value={{
        gameState,
        moveToRoom,
        pickupItem,
        useItem,
        examineItem,
        solvePuzzle,
        addMessage,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}
