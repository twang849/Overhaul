import Image from "next/image"
import { Bot } from "lucide-react"

export default function Checkout() {
  return (
    <div className="min-h-screen bg-white">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="bg-[#5c5a7c] p-6 relative">
          <div className="absolute top-4 left-8 bg-white/20 px-4 py-1 rounded-full text-white">Scanner</div>
          <div className="h-[500px] w-full relative rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=500&width=400"
              alt="Banana bundle scan"
              width={400}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4">
              <span className="text-xl">Honeycrisp Apple: 3</span>
              <span className="text-xl">$0.99</span>
            </div>

            <div className="flex justify-between border-b pb-4">
              <span className="text-xl">Banana Bundle - Large: 1</span>
              <span className="text-xl">$0.99</span>
            </div>

            <div className="flex justify-between pt-4 text-2xl font-bold">
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
                <p className="text-lg">Hi! How can I help you today?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

