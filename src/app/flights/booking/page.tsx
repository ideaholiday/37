'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFlightSearchStore } from '@/store/flight-store'
import { formatCurrency, formatTime } from '@/lib/utils'
import { Plane, User, Mail, Phone, Loader2 } from 'lucide-react'
import type { Passenger, PassengerType } from '@/types/flight'

export default function FlightBookingPage() {
  const router = useRouter()
  const { selectedFlight, searchParams } = useFlightSearchStore()
  const [loading, setLoading] = useState(false)
  const [passengers, setPassengers] = useState<Passenger[]>([])

  if (!selectedFlight || !searchParams) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No flight selected. Please search and select a flight first.</p>
            <Button className="mt-4" onClick={() => router.push('/')}>
              Go to Home
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  const handleBooking = async () => {
    setLoading(true)
    // Booking logic will be implemented here
    setTimeout(() => {
      setLoading(false)
      router.push('/flights/booking/success')
    }, 2000)
  }

  const segment = selectedFlight.segments[0]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/50">
        <div className="container py-6">
          <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Booking Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Flight Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="h-5 w-5" />
                    Flight Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Route</span>
                      <span className="font-medium">{segment.origin} → {segment.destination}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Departure</span>
                      <span className="font-medium">{formatTime(segment.departure)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Airline</span>
                      <span className="font-medium">{segment.airline.name} {segment.flightNumber}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Passenger Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Passenger Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Array.from({ length: searchParams.adults }).map((_, i) => (
                      <div key={`adult-${i}`} className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-semibold">Adult {i + 1}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>First Name</Label>
                            <Input placeholder="First Name" required />
                          </div>
                          <div className="space-y-2">
                            <Label>Last Name</Label>
                            <Input placeholder="Last Name" required />
                          </div>
                          <div className="space-y-2">
                            <Label>Date of Birth</Label>
                            <Input type="date" required />
                          </div>
                          <div className="space-y-2">
                            <Label>Gender</Label>
                            <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                              <option value="M">Male</option>
                              <option value="F">Female</option>
                              <option value="O">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Price Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base Fare</span>
                      <span>{formatCurrency(selectedFlight.fareBreakup.base)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxes & Fees</span>
                      <span>{formatCurrency(selectedFlight.fareBreakup.fees)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">PG Charges</span>
                      <span>{formatCurrency(selectedFlight.fareBreakup.pgCharge)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatCurrency(selectedFlight.fareBreakup.total)}</span>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full mt-6"
                    size="lg"
                    onClick={handleBooking}
                    disabled={loading}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Proceed to Payment
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By proceeding, you agree to our Terms of Service and Privacy Policy
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
