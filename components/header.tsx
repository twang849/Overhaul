import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-[#c8c2f0] py-3 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          SMARTCART <ShoppingCart className="ml-2 h-6 w-6" />
        </Link>
      </div>

      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/" className="text-black hover:text-gray-700">
          Home
        </Link>
        <Link href="/ai" className="text-black hover:text-gray-700">
          AI
        </Link>
        <Link href="/about" className="text-black hover:text-gray-700">
          About Us
        </Link>
        <Link href="/mission" className="text-black hover:text-gray-700">
          Mission
        </Link>
        <Link href="/help" className="text-black hover:text-gray-700">
          Help
        </Link>
        <Link href="/checkout" className="text-black hover:text-gray-700">
          Checkout
        </Link>
      </nav>

      <div className="flex items-center space-x-4">
        <Link href="/login" className="text-black hover:text-gray-700">
          Log In
        </Link>
        <Button className="bg-[#5c5a7c] hover:bg-[#4a4865]">SIGN UP</Button>
      </div>
    </header>
  )
}

