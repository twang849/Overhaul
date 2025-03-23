// app/detect/page.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Camera, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function Detect() {
  const [isScanning, setIsScanning] = useState(false)
  const [detectedItem, setDetectedItem] = useState<{ id: number; name: string; price: number; quantity: number } | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([])

  // Initialize camera when scanning starts
  useEffect(() => {
    if (isScanning && videoRef.current) {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [isScanning])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setIsScanning(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
  }

  // Simulate item detection - in a real app, this would connect to a computer vision API
  const detectItem = () => {
    setIsScanning(false)
    
    // Simulate AI detection - would be replaced with actual AI model
    const items = [
      { id: 1, name: "Banana Bundle", price: 2.99, quantity: 1 },
      { id: 2, name: "Organic Apples", price: 4.99, quantity: 1 },
      { id: 3, name: "Apple Juice", price: 3.49, quantity: 1 },
    ]
    
    const randomItem = items[Math.floor(Math.random() * items.length)]
    setDetectedItem(randomItem)
    
    // Add delay to simulate processing
    setTimeout(() => {
      setCart(prevCart => {
        // Check if item is already in cart
        const existingItem = prevCart.find(item => item.id === randomItem.id)
        if (existingItem) {
          return prevCart.map(item => 
            item.id === randomItem.id 
              ? {...item, quantity: item.quantity + 1} 
              : item
          )
        } else {
          return [...prevCart, randomItem]
        }
      })
      setDetectedItem(null)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Scan &amp; Shop</h1>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="relative aspect-[4/3] bg-gray-900">
          {isScanning ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              {detectedItem ? (
                <div className="text-center p-4">
                  <div className="animate-pulse text-green-400 mb-2">
                    <CheckCircle className="h-16 w-16 mx-auto" />
                  </div>
                  <p className="text-white text-xl">Detected: {detectedItem.name}</p>
                  <p className="text-green-400">${detectedItem.price}</p>
                  <p className="text-gray-400 text-sm mt-2">Adding to cart...</p>
                </div>
              ) : (
                <Camera className="h-16 w-16 text-gray-500" />
              )}
            </div>
          )}
        </div>
        
        <div className="p-4">
          {isScanning ? (
            <div className="space-y-4">
              <p className="text-center text-gray-600">Position camera at the item</p>
              <div className="flex space-x-2">
                <Button 
                  className="flex-1" 
                  variant="outline" 
                  onClick={() => setIsScanning(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700" 
                  onClick={detectItem}
                >
                  Capture
                </Button>
              </div>
            </div>
          ) : (
            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 py-6" 
              onClick={() => setIsScanning(true)}
            >
              <Camera className="mr-2 h-5 w-5" />
              Scan Item
            </Button>
          )}
        </div>
      </div>
      
      {/* Shopping Cart */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <ShoppingBag className="mr-2 h-5 w-5" />
          Your Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)
        </h2>
        
        {cart.length > 0 ? (
          <>
            <ul className="divide-y">
              {cart.map(item => (
                <li key={item.id} className="py-3 flex justify-between">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500 ml-2">x{item.quantity}</span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>
                  ${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                </span>
              </div>
              
              <Link href="/checkout">
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 py-6">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center py-6">Your cart is empty. Scan items to add them!</p>
        )}
      </div>
    </div>
  )
}