'use client'

import Link from 'next/link'
import { Plane, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { config } from '@/config'
import { useAuthStore } from '@/store/auth-store'

export function Header() {
  const { isAuthenticated, user, logout } = useAuthStore()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Plane className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">{config.brand.name}</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/flights" className="text-sm font-medium hover:text-primary transition-colors">
            Flights
          </Link>
          <Link href="/hotels" className="text-sm font-medium hover:text-primary transition-colors">
            Hotels
          </Link>
          <Link href="/my-bookings" className="text-sm font-medium hover:text-primary transition-colors">
            My Bookings
          </Link>
          {config.features.enableB2B && (
            <Link href="/b2b" className="text-sm font-medium hover:text-primary transition-colors">
              B2B Portal
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm">Welcome, {user?.name}</span>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/register">Sign Up</Link>
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
