'use client'

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useCallback, useRef, useEffect } from "react";


export default function Header() {
  const useTTS = () => {
    const [isTTSEnabled, setIsTTSEnabled] = useState(true)
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  
    // Initialize speech synthesis
    const speak = useCallback((text: string) => {
      if (!isTTSEnabled) return
  
      // Check browser compatibility
      if (!('speechSynthesis' in window)) {
        console.warn('Text-to-speech not supported in this browser')
        return
      }
  
      // Cancel any ongoing speech
      stopSpeaking()
  
      // Create and configure utterance
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.0
      utterance.pitch = 1.0
      utterance.volume = 1.0
  
      // Store reference to current utterance
      utteranceRef.current = utterance
  
      // Speak the text
      window.speechSynthesis.speak(utterance)
    }, [isTTSEnabled])
  
    // Function to stop speech
    const stopSpeaking = useCallback(() => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        utteranceRef.current = null
      }
    }, [])
  
    // Cleanup function to stop speech when component unmounts
    // or when TTS is disabled
    useEffect(() => {
      return () => {
        if (!isTTSEnabled) {
          stopSpeaking()
        }
      }
    }, [isTTSEnabled, stopSpeaking])
  
    return {
      isTTSEnabled,
      setIsTTSEnabled,
      speak,
      stopSpeaking
    }
  }
    
    // Initialize TTS hook
    const { isTTSEnabled, setIsTTSEnabled, speak, stopSpeaking } = useTTS()
  
    // Memoized hover handlers for better performance
    const handleMouseEnter = useCallback((text: string) => {
      speak(text)
    }, [speak])
  
    const handleMouseLeave = useCallback(() => {
      stopSpeaking()
    }, [stopSpeaking])
  
  return (
    <header className="bg-[#c8c2f0] py-3 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link
          onMouseEnter={() => handleMouseEnter("Smartcart!")}
          onMouseLeave={handleMouseLeave}
          href="/" className="text-2xl font-bold flex items-center whitespace-nowrap">
          SMARTCART <ShoppingCart className="ml-2 h-6 w-6" />
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <Link 
          onMouseEnter={() => handleMouseEnter("Home")}
          onMouseLeave={handleMouseLeave}
          href="/" className="enlargeable text-black hover:text-gray-700 whitespace-nowrap px-2"
        >
          Home
        </Link>
        <Link 
          onMouseEnter={() => handleMouseEnter("Artificial Intelligence")}
          onMouseLeave={handleMouseLeave}
          href="/detect" className="enlargeable text-black hover:text-gray-700 whitespace-nowrap px-2"
        >
          AI
        </Link>
        <Link 
          onMouseEnter={() => handleMouseEnter("About Us")}
          onMouseLeave={handleMouseLeave}
          href="/about" className="enlargeable text-black hover:text-gray-700 whitespace-nowrap px-2"
        >
          About Us
        </Link>
        <Link 
          onMouseEnter={() => handleMouseEnter("Mission")}
          onMouseLeave={handleMouseLeave}
          href="/mission" className="enlargeable text-black hover:text-gray-700 whitespace-nowrap px-2"
        >
          Mission
        </Link>
        <Link 
          onMouseEnter={() => handleMouseEnter("Help")}
          onMouseLeave={handleMouseLeave}
          href="/help" className="enlargeable text-black hover:text-gray-700 whitespace-nowrap px-2"
        >
          Help
        </Link>
        <Link 
          onMouseEnter={() => handleMouseEnter("Checkout")}
          onMouseLeave={handleMouseLeave}
          href="/checkout" className="enlargeable text-black hover:text-gray-700 whitespace-nowrap px-2"
        >
          Checkout
        </Link>
      </nav>

      <div className="flex items-center gap-6">
        <Link 
          onMouseEnter={() => handleMouseEnter("Log In")}
          onMouseLeave={handleMouseLeave}
          href="/login" className="enlargeable text-black hover:text-gray-700 whitespace-nowrap px-2">
          Log In
        </Link>
        <Button 
          onMouseEnter={() => handleMouseEnter("SIGN UP")}
          onMouseLeave={handleMouseLeave}
          className="enlargeable bg-[#5c5a7c] hover:bg-[#4a4865] whitespace-nowrap px-4">
          SIGN UP
        </Button>
      </div>
    </header>
  )
}
