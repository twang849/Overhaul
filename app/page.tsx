// app/page.tsx
"use client"

import { ShoppingCart, Camera, CreditCard, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useState, useCallback, useRef, useEffect } from "react"
import { ContrastToggle } from "@/components/ui/contrast-toggle"
import { MagnifierToggle } from "@/components/ui/magnifier-toggle"
import FontSizeSlider from "@/components/ui/font-size-button"
import "@/styles/magnifier.css"
import "@/styles/contrast-styles.css"

export default function Home() {
  const [isTTSEnabled, setIsTTSEnabled] = useState(false)
  
  const speak = useCallback((text: string | undefined) => {
    if (!isTTSEnabled || !('speechSynthesis' in window)) return
    
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utterance)
  }, [isTTSEnabled])
  
  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }, [])

  const handleTTSToggle = useCallback((checked: boolean) => {
    setIsTTSEnabled(checked)
    // Announce the new state
    if ('speechSynthesis' in window) {
      const message = checked ? "Text to speech enabled" : "Text to speech disabled"
      const utterance = new SpeechSynthesisUtterance(message)
      window.speechSynthesis.speak(utterance)
    }
  }, [])

  // Popup for kids mode
  const openPopup = useCallback(() => {
    const popup = window.open(
      '/for-kids.html',
      'for-kids',
      'width=600,height=400,scrollbars=yes,resizable=yes'
    )
  
    if (!popup) {
      console.error('Popup blocked by the browser')
    }
  }, [])

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#c8c2f0] via-[#8a82c5] to-[#5c5a7c]">
        {/* Accessibility Controls */}
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          <div 
            className="flex items-center space-x-2"
            onMouseEnter={() => speak("Toggle High Contrast Mode")}
            onMouseLeave={stopSpeaking}
          >
            <ContrastToggle />
            <MagnifierToggle />
          </div>
          <div 
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
            onMouseEnter={() => speak(isTTSEnabled ? "Text-to-Speech is enabled. Click to disable" : "Text-to-Speech is disabled. Click to enable")}
            onMouseLeave={stopSpeaking}
          >
            <span className="enlargeable text-sm text-white">Text-to-Speech</span>
            <Switch
              checked={isTTSEnabled}
              onCheckedChange={handleTTSToggle}
              aria-label={`Text-to-speech is ${isTTSEnabled ? 'enabled' : 'disabled'}`}
              aria-pressed={isTTSEnabled}
            />
          </div>
          <div 
            onMouseEnter={() => speak("Adjust Font Size")}
            onMouseLeave={stopSpeaking}
          >
            <FontSizeSlider />  
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 
                className="enlargeable text-6xl font-bold tracking-tight text-white"
                onMouseEnter={() => speak("SmartCart")}
                onMouseLeave={stopSpeaking}
              >
                SmartCart
              </h1>
              <h2 
                className="enlargeable text-3xl font-medium text-white/90"
                onMouseEnter={() => speak("Shop Smarter, Checkout Faster!")}
                onMouseLeave={stopSpeaking}
              >
                Shop Smarter, Checkout Faster!
              </h2>
              <p 
                className="enlargeable text-lg max-w-md text-white/80"
                onMouseEnter={() => speak("SmartCart revolutionizes grocery shopping with AI-powered, accessible, and seamless checkout solutions — making every trip faster, easier, and smarter for all.")}
                onMouseLeave={stopSpeaking}
              >
                SmartCart revolutionizes grocery shopping with AI-powered, accessible, and seamless checkout solutions —
                making every trip faster, easier, and smarter for all.
              </p>
              
              <div className="space-y-4">
                <Link href="/detect">
                  <Button
                    className="enlargeable w-full md:w-auto bg-white text-[#5c5a7c] hover:bg-white/90 px-8 py-6 text-lg flex items-center"
                    onMouseEnter={() => speak("Start Scanning")}
                    onMouseLeave={stopSpeaking}
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Start Scanning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <div className="flex space-x-4">
                  <Button
                    className="enlargeable flex-1 bg-[#5c5a7c] hover:bg-[#4a4865] text-white px-6 py-4"
                    onMouseEnter={() => speak("Download App")}
                    onMouseLeave={stopSpeaking}
                  >
                    Download App
                  </Button>
                  
                  <Button
                    className="enlargeable flex-1 bg-gradient-to-r from-yellow-400 to-red-500 text-white px-6 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    onMouseEnter={() => speak("Let's Play with Me!")}
                    onMouseLeave={stopSpeaking}
                    onClick={openPopup}
                    aria-label="Play with Me Button"
                  >
                    Play with Me!
                  </Button>
                </div>
              </div>
              
              <div className="pt-6">
                <h3 className="text-xl font-medium text-white/90 mb-3">How it works:</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mr-3">
                      <Camera className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-white/80">Scan items with your phone camera as you shop</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mr-3">
                      <ShoppingCart className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-white/80">AI automatically identifies products and adds them to your cart</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mr-3">
                      <CreditCard className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-white/80">Pay through the app and skip the checkout line entirely</p>
                  </div>
                </div>
              </div>
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
                  <div className="aspect-[9/19] overflow-hidden bg-gradient-to-b from-gray-50 to-white phone-bg">
                    <div className="p-4 flex flex-col h-full">
                      <div 
                        className="enlargeable bg-gradient-to-r from-[#c8c2f0] to-[#a599e9] rounded-lg p-3 mb-3 text-center text-white shadow-md transition-transform hover:scale-[1.02]"
                        onMouseEnter={() => speak("View Cart")}
                        onMouseLeave={stopSpeaking}
                      >
                        View Cart <ShoppingCart className="inline-block ml-1 h-4 w-4" />
                      </div>
                      <div 
                        className="enlargeable flex items-center mb-3 bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-white/90 cursor-pointer"
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
                          src="./bananas.png"
                          alt="Fresh yellow bananas bundled together, perfect for a healthy snack or smoothie. Each banana is uniformly ripe with a bright yellow peel."
                          title="Fresh yellow bananas bundled together, perfect for a healthy snack or smoothie"
                          width={300}
                          height={400}
                          className="enlargeable object-cover rounded-lg transform transition-transform duration-300 hover:brightness-105"
                          onMouseEnter={() => speak("Yellow bananas bundled together. Each banana is uniformly ripe with a bright yellow peel.")}
                          onMouseLeave={stopSpeaking}
                        />
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
                          scanning...
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-black/75 flex items-center justify-center p-4 rounded-lg">
                          <p className="enlargeable text-white text-center text-sm">
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