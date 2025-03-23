// app/layout.js
import Link from 'next/link'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between">
            <Link href="/" className="text-xl font-bold">
              Overhaul
            </Link>
            <div className="space-x-4">
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
              <Link href="/detect" className="hover:text-gray-300">
                Object Detection
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}