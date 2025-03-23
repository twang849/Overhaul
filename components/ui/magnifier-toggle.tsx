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
      id="magnify"
      variant="outline"
      size="lg"
      onClick={toggleMagnifier}
      className="magnifier-toggle-button h-8 px-2 text-xs flex items-center gap-1 bg-yellow-400 border-yellow-500 hover:bg-yellow-500 text-black"
    >
      <div style={{fontSize: '16px'}}>Magnifying<br/>Glass</div>
      {magnifierActive ? <Search className="h-5 w-5" /> : <X className="h-5 w-5" />}
    </Button>
  )
}