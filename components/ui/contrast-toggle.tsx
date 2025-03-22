"use client"

import { Button } from "./button"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export function ContrastToggle() {
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    const savedContrast = localStorage.getItem("highContrast")
    if (savedContrast) {
      setHighContrast(JSON.parse(savedContrast))
      if (JSON.parse(savedContrast)) {
        document.documentElement.classList.add("high-contrast")
      }
    }
  }, [])

  const toggleContrast = () => {
    const newValue = !highContrast
    setHighContrast(newValue)
    localStorage.setItem("highContrast", JSON.stringify(newValue))

    if (newValue) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleContrast}
      aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
      className="contrast-toggle-button relative flex items-center gap-2"
    >
      {highContrast ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span>High Contrast</span>
    </Button>
  )
}