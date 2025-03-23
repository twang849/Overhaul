import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">
            Overhaul
          </Link>
        </div>
        
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/detect" className="hover:text-gray-300">
            Object Detection
          </Link>
          {/* Add more navigation links as needed */}
        </div>
      </div>
    </nav>
  );
}