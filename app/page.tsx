import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import EnlargeButton from "@/components/ui/enlarge-button"
import ReduceButton from "@/components/ui/reduce-button"

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#c8c2f0] via-[#8a82c5] to-[#5c5a7c]">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <EnlargeButton/> 
          <br/><ReduceButton/>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="enlargeable text-6xl font-bold tracking-tight">SmartCart</h1>
              <h2 className="enlargeable text-3xl font-medium">Shop Smarter, Checkout Faster!</h2>
              <p className="enlargeable text-lg max-w-md">
                SmartCart revolutionizes grocery shopping with AI-powered, accessible, and seamless checkout solutions —
                making every trip faster, easier, and smarter for all.
              </p>
              <Button className="bg-[#5c5a7c] hover:bg-[#4a4865] text-white px-8 py-6 text-lg">Download</Button>
              <Link href="/checkout" className="inline-block mt-4">
                <Button variant="outline" className="border-[#5c5a7c] text-[#5c5a7c]">
                  Go to Checkout
                </Button>
              </Link>
            </div>
    
            <div className="relative">
              <div className="relative mx-auto max-w-[300px]">
                <div className="relative z-10 overflow-hidden rounded-[40px] border-8 border-black bg-black shadow-xl">
                  <div className="relative pt-6 bg-black rounded-t-[24px]">
                    <div className="absolute top-0 inset-x-0">
                      <div className="h-6 w-40 mx-auto bg-black rounded-b-3xl"></div>
                    </div>
                    <div className="absolute right-5 top-2">
                      <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                    </div>
                  </div>
                  <div className="aspect-[9/19] overflow-hidden bg-white">
                    <div className="p-4 flex flex-col h-full">
                      <div className="bg-[#c8c2f0] rounded-lg p-2 mb-2 text-center">
                        View Cart <ShoppingCart className="inline-block ml-1 h-4 w-4" />
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="flex-1">Banana Bundle - Large Detected</div>
                        <div className="h-6 w-6 bg-[#e0f7e0] rounded-full flex items-center justify-center">✓</div>
                      </div>
                      <div className="flex-1 relative">
                        <Image
                          src="/placeholder.svg?height=400&width=300"
                          alt="Banana bundle"
                          width={300}
                          height={400}
                          className="object-cover rounded-lg"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                          scanning...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

