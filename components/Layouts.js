// components/Layout.js
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © {new Date().getFullYear()} Overhaul
      </footer>
    </div>
  );
}