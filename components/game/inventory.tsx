"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useGame } from "./game-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { X } from "lucide-react"

export default function Inventory() {
  const { gameState, useItem, examineItem } = useGame()
  const [selectedItem, setSelectedItem] = useState(null)
  const [showItemDialog, setShowItemDialog] = useState(false)
  const [itemAction, setItemAction] = useState(null) // 'use' or 'examine'

  const handleItemClick = (item) => {
    setSelectedItem(item)
    setShowItemDialog(true)
  }

  const handleUseItem = () => {
    setItemAction("use")
  }

  const handleExamineItem = () => {
    setItemAction("examine")
  }

  // useEffect to handle item actions after selection
  useEffect(() => {
    if (selectedItem && itemAction) {
      if (itemAction === "use") {
        useItem(selectedItem.id)
      } else if (itemAction === "examine") {
        examineItem(selectedItem.id)
      }
      setShowItemDialog(false)
      setItemAction(null) // Reset itemAction
    }
  }, [selectedItem, itemAction, useItem, examineItem])

  return (
    <div className="w-full">
      <h2 className="text-white text-sm mb-2 flex items-center">
        <span className="bg-red-600 px-2 py-1 rounded-md mr-2">Inventory</span>
        <span className="text-gray-400">{gameState.inventory.length} items</span>
      </h2>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {gameState.inventory.length === 0 ? (
          <div className="text-gray-500 text-sm italic">Your inventory is empty.</div>
        ) : (
          gameState.inventory.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 p-2 rounded-md cursor-pointer hover:bg-gray-700 transition-colors min-w-[80px] flex flex-col items-center"
              onClick={() => handleItemClick(item)}
            >
              <div className="relative w-12 h-12 mb-1">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <span className="text-white text-xs text-center">{item.name}</span>
            </div>
          ))
        )}
      </div>

      {/* Item dialog */}
      <Dialog open={showItemDialog} onOpenChange={setShowItemDialog}>
        <DialogContent className="bg-gray-900 text-white border-red-600">
          <DialogHeader>
            <DialogTitle className="text-red-400 flex items-center">
              {selectedItem?.name}
              <button className="ml-auto text-gray-400 hover:text-white" onClick={() => setShowItemDialog(false)}>
                <X className="h-4 w-4" />
              </button>
            </DialogTitle>
            <DialogDescription className="text-gray-300">{selectedItem?.description}</DialogDescription>
          </DialogHeader>

          <div className="flex justify-center my-4">
            <div className="relative w-24 h-24">
              {selectedItem && (
                <Image
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.name}
                  fill
                  className="object-cover rounded-md"
                />
              )}
            </div>
          </div>

          <div className="flex space-x-2 justify-center">
            <button
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white text-sm"
              onClick={handleUseItem}
            >
              Use Item
            </button>
            <button
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white text-sm"
              onClick={handleExamineItem}
            >
              Examine
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
