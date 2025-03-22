"use client"

import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useCallback } from "react"
import { Switch } from "@/components/ui/switch"

// Custom hook for TTS functionality
const useTTS = () => {
  const [isTTSEnabled, setIsTTSEnabled] = useState(false)

  // Initialize speech synthesis
  const speak = useCallback((text: string) => {
    if (!isTTSEnabled) return

    // Check browser compatibility
    if (!('speechSynthesis' in window)) {
      console.warn('Text-to-speech not supported in this browser')
      return
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    // Create and configure utterance
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.0
    utterance.pitch = 1.0
    utterance.volume = 1.0

    // Speak the text
    window.speechSynthesis.speak(utterance)
  }, [isTTSEnabled])

  // Function to stop speech
  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }, [])

  return {
    isTTSEnabled,
    setIsTTSEnabled,
    speak,
    stopSpeaking
  }
}

export default function Home() {
  // Initialize TTS hook
  const { isTTSEnabled, setIsTTSEnabled, speak, stopSpeaking } = useTTS()

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#c8c2f0] via-[#8a82c5] to-[#5c5a7c]">
        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* TTS Toggle Switch */}
          <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-sm text-white">Text-to-Speech</span>
            <Switch
              checked={isTTSEnabled}
              onCheckedChange={setIsTTSEnabled}
              aria-label="Toggle text-to-speech"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 
                className="text-6xl font-bold tracking-tight"
                onMouseEnter={() => speak("SmartCart")}
                onMouseLeave={stopSpeaking}
              >
                SmartCart
              </h1>
              <h2 
                className="text-3xl font-medium"
                onMouseEnter={() => speak("Shop Smarter, Checkout Faster!")}
                onMouseLeave={stopSpeaking}
              >
                Shop Smarter, Checkout Faster!
              </h2>
              <p 
                className="text-lg max-w-md"
                onMouseEnter={() => speak("SmartCart revolutionizes grocery shopping with AI-powered, accessible, and seamless checkout solutions — making every trip faster, easier, and smarter for all.")}
                onMouseLeave={stopSpeaking}
              >
                SmartCart revolutionizes grocery shopping with AI-powered, accessible, and seamless checkout solutions —
                making every trip faster, easier, and smarter for all.
              </p>
              <Button 
                className="bg-[#5c5a7c] hover:bg-[#4a4865] text-white px-8 py-6 text-lg"
                onMouseEnter={() => speak("Download SmartCart")}
                onMouseLeave={stopSpeaking}
              >
                Download
              </Button>
              <Link href="/checkout" className="inline-block mt-4">
                <Button 
                  variant="outline" 
                  className="border-[#5c5a7c] text-[#5c5a7c]"
                  onMouseEnter={() => speak("Go to Checkout")}
                  onMouseLeave={stopSpeaking}
                >
                  Go to Checkout
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="relative mx-auto max-w-[300px]">
                <div className="relative z-10 overflow-hidden rounded-[40px] border-[12px] border-black bg-black shadow-2xl ring-1 ring-gray-900/10">
                  <div className="relative pt-6 bg-black rounded-t-[24px]">
                    <div className="absolute top-0 inset-x-0">
                      <div className="h-6 w-40 mx-auto bg-black rounded-b-3xl flex items-center justify-center">
                        <div className="h-1 w-16 bg-gray-800 rounded-full"></div>
                      </div>
                    </div>
                    <div className="absolute right-5 top-2 flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-gray-600"></div>
                      <div className="h-2 w-2 rounded-full bg-gray-700"></div>
                    </div>
                  </div>
                  <div className="aspect-[9/19] overflow-hidden bg-gradient-to-b from-gray-50 to-white">
                    <div className="p-4 flex flex-col h-full">
                      <div 
                        className="bg-gradient-to-r from-[#c8c2f0] to-[#a599e9] rounded-lg p-3 mb-3 text-center text-white shadow-md transition-transform hover:scale-[1.02]"
                        onMouseEnter={() => speak("View Cart")}
                        onMouseLeave={stopSpeaking}
                      >
                        View Cart <ShoppingCart className="inline-block ml-1 h-4 w-4" />
                      </div>
                      <div 
                        className="flex items-center mb-3 bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-white/90 cursor-pointer"
                        onMouseEnter={() => speak("Banana Bundle - Large Detected")}
                        onMouseLeave={stopSpeaking}
                      >
                        <div className="flex-1 text-gray-800 font-medium">Banana Bundle - Large Detected</div>
                        <div className="h-6 w-6 bg-gradient-to-br from-[#e0f7e0] to-[#c8ecc8] rounded-full flex items-center justify-center shadow-sm transition-transform duration-300 hover:scale-110">
                          <span className="text-green-700">✓</span>
                        </div>
                      </div>
                      <div className="flex-1 relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1 group">
                        <Image
                          src="/20175355001_front_a06_@2.png"
                          alt="Fresh yellow bananas bundled together, perfect for a healthy snack or smoothie. Each banana is uniformly ripe with a bright yellow peel."
                          title="Fresh yellow bananas bundled together, perfect for a healthy snack or smoothie"
                          width={300}
                          height={400}
                          className="object-cover rounded-lg transform transition-transform duration-300 hover:brightness-105"
                          onMouseEnter={() => speak("Yellow bananas bundled together. Each banana is uniformly ripe with a bright yellow peel.")}
                          onMouseLeave={stopSpeaking}
                        />
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
                          scanning...
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-black/75 flex items-center justify-center p-4 rounded-lg">
                          <p className="text-white text-center text-sm">
                            Yellow bananas bundled together. Each banana is uniformly ripe with a bright yellow peel.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-1 inset-x-0 flex justify-center">
                    <div className="h-1 w-16 bg-gray-800 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute -inset-x-2 -inset-y-6 z-0">
                  <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-gray-800 opacity-20 blur-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
