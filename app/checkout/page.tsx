"use client"
import { Switch } from "@/components/ui/switch";
import Image from "next/image"
import { Bot } from "lucide-react"
import FontSizeButton from "../../components/ui/font-size-button"
import { ContrastToggle } from "@/components/ui/contrast-toggle";
import "@/styles/contrast-styles.css";
import { useState, useCallback, useRef, useEffect } from "react";

export default function Checkout() {
  const useTTS = () => {
    const [isTTSEnabled, setIsTTSEnabled] = useState(false)
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
  
  useEffect(() => {
      const savedContrast = localStorage.getItem("highContrast");
      if (savedContrast === "true") {
        document.documentElement.classList.add("high-contrast");
      }
    }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="bg-[#5c5a7c] p-6 relative purple-bg">
          <div className="absolute top-4 left-8 bg-white/20 px-4 py-1 rounded-full text-white">Scanner</div>
          <div className="h-[500px] w-full relative rounded-lg overflow-hidden">
            <Image
              src="/bananas.png?height=500&width=400"
              alt="Banana bundle scan"
              width={400}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="p-8">
          <ContrastToggle/>
          <FontSizeButton/>
          <h1 className="enlargeable text-4xl font-bold mb-8">Checkout</h1>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4">
              <span className="enlargeable text-xl">Honeycrisp Apple: 3</span>
              <span className="enlargeable text-xl">$0.99</span>
            </div>
            
            <div className="flex justify-between border-b pb-4">
              <span className="enlargeable text-xl">Banana Bundle - Large: 1</span>
              <span className="enlargeable text-xl">$0.99</span>
            </div>

            <div className="enlargeable flex justify-between pt-4 text-2xl font-bold">
              <span>Total:</span>
              <span>$1.98</span>
            </div>
          </div>
          
          <div className="mt-16">
            <div className="flex items-start gap-4">
              <div className="bg-white p-2 rounded-full border">
                <Bot className="h-10 w-10" />
              </div>
              <div className="bg-gray-200 p-4 rounded-lg max-w-md">
                <p className="enlargeable text-lg">Hi! How can I help you today?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

