import Link from 'next/link';
import { Plane, Hotel, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Idea Holiday</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/b2c" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <Plane className="h-5 w-5" />
              <span>Flights</span>
            </Link>
            <Link href="/b2c/hotels" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <Hotel className="h-5 w-5" />
              <span>Hotels</span>
            </Link>
            <Link href="/b2c/bookings" className="text-gray-700 hover:text-blue-600">
              My Bookings
            </Link>
            <Link href="/b2b" className="text-gray-700 hover:text-blue-600">
              B2B Portal
            </Link>
            <Link href="/auth/login" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <User className="h-5 w-5" />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/b2c" className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md">
              Flights
            </Link>
            <Link href="/b2c/hotels" className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md">
              Hotels
            </Link>
            <Link href="/b2c/bookings" className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md">
              My Bookings
            </Link>
            <Link href="/b2b" className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md">
              B2B Portal
            </Link>
            <Link href="/auth/login" className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
