"use client"

import { Button } from "./button"
import { Search, X } from "lucide-react"
import { useEffect, useState } from "react"
import { enableMagnifier, disableMagnifier } from "./magnifier"

export function MagnifierToggle() {
  const [magnifierActive, setMagnifierActive] = useState(true)

  useEffect(() => {
    // Check if user has previously set magnifier preference
    const savedMagnifier = localStorage.getItem("magnifierActive")
    if (savedMagnifier) {
      const isActive = JSON.parse(savedMagnifier)
      setMagnifierActive(isActive)
      if (isActive) {
        enableMagnifier(); // Enable magnifier if previously active
      }
    }
  }, [])

  const toggleMagnifier = () => {
    if (magnifierActive) {
      disableMagnifier(); // Disable magnifier if it's currently active
    } else {
      enableMagnifier(); // Enable magnifier if it's currently inactive
    }
    setMagnifierActive(!magnifierActive); // Toggle state after action
    localStorage.setItem("magnifierActive", JSON.stringify(!magnifierActive)); // Save updated state
  }

  return (
    <Button
      id="magnify"
      variant="outline"
      size="sm"
      onClick={toggleMagnifier}
      className="magnifier-toggle-button h-8 px-2 text-xs flex items-center gap-1 bg-yellow-400 border-yellow-500 hover:bg-yellow-500 text-black"
    >
      {magnifierActive ? <Search className="h-3 w-3" /> : <X className="h-3 w-3" />}
      <span className="text-xs">Magnifier</span>
    </Button>
  )
}