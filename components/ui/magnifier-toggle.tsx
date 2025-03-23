"use client"

import { Button } from "./button"
import { Search, X } from "lucide-react"
import { useEffect, useState } from "react"
import { enableMagnifier, disableMagnifier } from "./magnifier"

export function MagnifierToggle() {
  const [magnifierActive, setMagnifierActive] = useState(false)

  useEffect(() => {
    // Always start with magnifier disabled
    disableMagnifier();
    setMagnifierActive(false);
    // Clear any saved preference
    localStorage.removeItem("magnifierActive");
  }, [])

  const toggleMagnifier = () => {
    if (magnifierActive) {
      disableMagnifier();
    } else {
      enableMagnifier();
    }
    setMagnifierActive(!magnifierActive);
    localStorage.setItem("magnifierActive", JSON.stringify(!magnifierActive));
  }

  return (
    <Button
      // id="magnify"
      variant="outline"
      size="sm"
      onClick={toggleMagnifier}
      className="magnifier-toggle-button flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
    >
      {magnifierActive ? <Search className="h-5 w-5" /> : <X className="h-5 w-5" />}
    </Button>
  )
}