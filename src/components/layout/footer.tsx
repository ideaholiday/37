import Link from 'next/link'
import { Mail, Phone, MessageCircle } from 'lucide-react'
import { config } from '@/config'

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4">{config.brand.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {config.brand.tagline}
            </p>
            <div className="flex space-x-4">
              <a href={`tel:${config.brand.phone}`} className="text-muted-foreground hover:text-primary">
                <Phone className="h-5 w-5" />
              </a>
              <a href={`https://wa.me/${config.brand.whatsapp}`} className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href={`mailto:${config.brand.email}`} className="text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/flights" className="text-muted-foreground hover:text-primary">Flights</Link></li>
              <li><Link href="/hotels" className="text-muted-foreground hover:text-primary">Hotels</Link></li>
              <li><Link href="/my-bookings" className="text-muted-foreground hover:text-primary">My Bookings</Link></li>
              <li><Link href="/deals" className="text-muted-foreground hover:text-primary">Deals</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="text-muted-foreground hover:text-primary">Help Center</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="/cancellation-policy" className="text-muted-foreground hover:text-primary">Cancellation Policy</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {config.brand.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
