import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { handleMouseEnter, handleMouseLeave} from "@/app/page"

export default function Header() {
  return (
    <header className="bg-[#c8c2f0] py-3 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold flex items-center whitespace-nowrap">
          SMARTCART <ShoppingCart className="ml-2 h-6 w-6" />
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <Link href="/" className="enlargeable text-black hover:text-gray-700 whitespace-nowrap px-2">
          Home
        </Link>
        <Link href="/ai" className="enlargeable text-black hover:text-gray-700 whitespace-nowrap px-2">
          AI
        </Link>
        <Link href="/about" className="enlargeable text-black hover:text-gray-700 whitespace-nowrap px-2">
          About Us
        </Link>
        <Link href="/mission" className="enlargeable text-black hover:text-gray-700 whitespace-nowrap px-2">
          Mission
        </Link>
        <Link href="/help" className="enlargeable text-black hover:text-gray-700 whitespace-nowrap px-2">
          Help
        </Link>
        <Link href="/checkout" className="enlargeable text-black hover:text-gray-700 whitespace-nowrap px-2">
          Checkout
        </Link>
      </nav>

      <div className="flex items-center gap-6">
        <Link href="/login" className="enlargeable text-black hover:text-gray-700 whitespace-nowrap px-2">
          Log In
        </Link>
        <Button className="enlargeable bg-[#5c5a7c] hover:bg-[#4a4865] whitespace-nowrap px-4">
          SIGN UP
        </Button>
      </div>
    </header>
  )
}
