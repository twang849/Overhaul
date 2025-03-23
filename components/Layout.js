// components/Layout.js
import { default as NextLink } from 'next/link'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <NextLink href="/" className="text-xl font-bold">
            SmartCart
          </NextLink>
          <nav className="space-x-4">
            <NextLink href="/" className="hover:text-gray-300">
              Home
            </NextLink>
            <NextLink href="/detect" className="hover:text-gray-300">
              Scan Items
            </NextLink>
            <NextLink href="/checkout" className="hover:text-gray-300">
              Checkout
            </NextLink>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-gray-100 p-4">
        <div className="container mx-auto text-center text-gray-600">
          &copy; {new Date().getFullYear()} SmartCart. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Layout