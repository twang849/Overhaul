"use client"
import { ShoppingCart, Camera, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "@/styles/magnifier.css"; 
import { useState, useCallback, useRef, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { ContrastToggle } from "@/components/ui/contrast-toggle";
import "@/styles/contrast-styles.css";
import FontSizeSlider from "@/components/ui/font-size-button";
import { MagnifierToggle } from "@/components/ui/magnifier-toggle";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const welcomeStyles = `
  @keyframes fadeInScale {
    0% { 
      opacity: 0;
      transform: scale(0.9);
    }
    100% { 
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeOutScale {
    0% { 
      opacity: 1;
      transform: scale(1);
    }
    100% { 
      opacity: 0;
      transform: scale(1.1);
    }
  }

  .welcome-enter {
    animation: fadeInScale 1s ease-out forwards;
  }

  .welcome-exit {
    animation: fadeOutScale 1s ease-in forwards;
  }
`;

const slideOutKeyframes = `
  @keyframes slideOut {
    0% { transform: translateY(0); opacity: 1; }
    80% { transform: translateY(-100%); opacity: 1; }
    100% { transform: translateY(-100%); opacity: 0; display: none; }
  }
  @keyframes fadeIn {
    0% { opacity: 0; transform: scale(0.9); }
    100% { opacity: 1; transform: scale(1); }
  }
`;

export default function Home() {

  const [showWelcome, setShowWelcome] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Add the animation styles
    const style = document.createElement('style');
    style.innerHTML = welcomeStyles;
    document.head.appendChild(style);

    // Start exit animation after 2 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      // Remove component after exit animation completes
      setTimeout(() => {
        setShowWelcome(false);
      }, 1000);
    }, 2000);

    return () => {
      document.head.removeChild(style);
      clearTimeout(exitTimer);
    };
  }, []);

  const openPopup = useCallback(() => {
    const popup = window.open(
      '/for-kids.html', 
      'for-kids', 
      'width=600,height=400,scrollbars=yes,resizable=yes'
    );
  
    if (!popup) {
      console.error('Popup blocked by the browser');
    }
  }, []);
    
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
    // Add animation styles to head
    const styleSheet = document.createElement("style");
    styleSheet.innerText = slideOutKeyframes;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = './magnifier.js'; // Adjust the path as needed
    script.async = true;
    document.body.appendChild(script);
  
    const savedContrast = localStorage.getItem("highContrast");
    if (savedContrast === "true") {
      document.documentElement.classList.add("high-contrast");
    }
  
    return () => {
      // Cleanup the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  useEffect (() => {
    if (typeof window != undefined) {
  const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;
  const SpeechRecognitionEvent =
    window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    const commands = [
      "go to home",
      "go to checkout"
    ];
    const grammar = `#JSGF V1.0; grammar colors; public <command> = ${commands.join(
      " | ",
    )};`;    

  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();  
  
  speechRecognitionList.addFromString(grammar);

  recognition.grammars = speechRecognitionList;
  recognition.continuous= true;

  document.body.onclick = () => {
    try {
      recognition.start();
    } catch (Exception) {
      console.log("Recognition already started.")
    }
    console.log("Ready to receive a command.");
  };

  recognition.onresult = (event: any) => {
    let result: String = event.results[0][0].transcript;
    console.log(result);

    switch (result) {
      case "go to check out":
        window.location.href = 'http://localhost:3000/checkout';
        break;
    }
  }

  recognition.onnomatch = (event: any) => {
    console.log("Unrecognized command.")
  }
}
}, []);

  return (
    <div className="min-h-screen">
      {showWelcome && (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#c8c2f0] via-[#8a82c5] to-[#5c5a7c] z-[9999]">
          <div className={`text-5xl font-bold text-white ${isExiting ? 'welcome-exit' : 'welcome-enter'}`}>
            Welcome to SMARTCART 🛒
          </div>
        </div>
      )}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#c8c2f0] via-[#8a82c5] to-[#5c5a7c]">
        <div className="absolute top-4 right-4 z-50">
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Accessibility Controls */}
          <div className={`absolute top-4 right-4 transition-opacity duration-500 ${showWelcome ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
                  onMouseEnter={() => handleMouseEnter("Accessibility Options")}
                  onMouseLeave={handleMouseLeave}
                >
                  <Settings className="h-5 w-5 mr-2" />
                  <span className="font-bold text-white">Accessibility Options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuItem className="flex items-center justify-between p-2"
                  onMouseEnter={() => handleMouseEnter("Toggle High Contrast Mode")}
                  onMouseLeave={handleMouseLeave}
                >
                  <span>High Contrast Mode</span>
                  <ContrastToggle />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center justify-between p-2"
                  onMouseEnter={() => handleMouseEnter("Toggle Magnifying Glass")}
                  onMouseLeave={handleMouseLeave}
                >
                  <span>Magnifying Glass</span>
                  <MagnifierToggle />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center justify-between p-2"
                  onMouseEnter={() => handleMouseEnter("Toggle Text-to-Speech")}
                  onMouseLeave={handleMouseLeave}
                >
                  <span>Text-to-Speech</span>
                  <Switch
                    checked={isTTSEnabled}
                    onCheckedChange={() => setIsTTSEnabled(!isTTSEnabled)}
                    aria-label="Toggle text-to-speech"
                  />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center justify-between p-2"
                  onMouseEnter={() => handleMouseEnter("Adjust Font Size")}
                  onMouseLeave={handleMouseLeave}
                >
                  <span>Font Size</span>
                  <FontSizeSlider />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 
                className="enlargeable text-6xl font-bold tracking-tight"
                onMouseEnter={() => handleMouseEnter("SmartCart")}
                onMouseLeave={handleMouseLeave}
                style = {{fontSize: '30px'}}
              >
                SmartCart
              </h1>
              <h2 
                className="enlargeable text-3xl font-medium"
                onMouseEnter={() => handleMouseEnter("Shop Smarter, Checkout Faster!")}
                onMouseLeave={handleMouseLeave}
              >
                Shop Smarter, Checkout Faster!
              </h2>
              <p 
                className="enlargeable text-lg max-w-md"
                onMouseEnter={() => handleMouseEnter("SmartCart revolutionizes grocery shopping with AI-powered, accessible, and seamless checkout solutions — making every trip faster, easier, and smarter for all.")}
                onMouseLeave={handleMouseLeave}
              >
                SmartCart revolutionizes grocery shopping with AI-powered, accessible, and seamless checkout solutions —
                making every trip faster, easier, and smarter for all.
              </p>
              <Button
                className="enlargeable bg-[#5c5a7c] hover:bg-[#4a4865] text-white px-8 m-4 py-6 text-lg"
                onMouseEnter={() => handleMouseEnter("Download SmartCart")}
                onMouseLeave={handleMouseLeave}
              >
                Download
              </Button>
              <Link href="/checkout" className="inline-block mt-4">
                <Button 
                  variant="outline" 
                  className="enlargeable border-[#5c5a7c] text-[#5c5a7c] m-4"
                  onMouseEnter={() => handleMouseEnter("Go to Checkout")}
                  onMouseLeave={handleMouseLeave}
                >
                  Go to Checkout
                </Button>
              </Link>

              <Button
      className="enlargeable bg-gradient-to-r from-white-400 to-purple-500 text-white px-12 py-4 text-xl rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      onMouseEnter={() => speak("Play a Game!")}
      onMouseLeave={stopSpeaking}
      onClick={openPopup}
      aria-label="Play a Game Button"
    >
      Play a Game!
    </Button>


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
                  <div className="aspect-[9/19] overflow-hidden bg-gradient-to-b from-gray-50 to-white phone-bg ">
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
                        onMouseEnter={() => handleMouseEnter("Banana Bundle - Large Detected")}
                        onMouseLeave={handleMouseLeave}
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
  );
}
