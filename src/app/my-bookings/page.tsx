'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plane, Hotel, Calendar, User, Download, X } from 'lucide-react'
import { formatCurrency, formatDate, formatTime } from '@/lib/utils'

export default function MyBookingsPage() {
  // Mock bookings data
  const flightBookings = [
    {
      id: 'FL001',
      bookingReference: 'IH12345678',
      pnr: 'ABC123',
      route: 'DEL → BOM',
      departure: new Date('2024-12-25T10:30:00'),
      arrival: new Date('2024-12-25T12:45:00'),
      airline: 'Air India',
      flightNumber: 'AI 860',
      passengers: 2,
      amount: 12450,
      status: 'CONFIRMED',
      bookedAt: new Date('2024-12-01'),
    },
    {
      id: 'FL002',
      bookingReference: 'IH12345679',
      pnr: 'XYZ456',
      route: 'BOM → GOI',
      departure: new Date('2024-12-28T14:00:00'),
      arrival: new Date('2024-12-28T15:15:00'),
      airline: 'IndiGo',
      flightNumber: '6E 345',
      passengers: 1,
      amount: 4200,
      status: 'PENDING',
      bookedAt: new Date('2024-12-02'),
    },
  ]

  const hotelBookings = [
    {
      id: 'HT001',
      bookingReference: 'IH12345680',
      hotelName: 'The Grand Palace Hotel',
      location: 'Mumbai',
      checkIn: new Date('2024-12-25'),
      checkOut: new Date('2024-12-27'),
      rooms: 1,
      guests: 2,
      amount: 17000,
      status: 'CONFIRMED',
      bookedAt: new Date('2024-12-01'),
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/50">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

          <Tabs defaultValue="flights" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
              <TabsTrigger value="flights">
                <Plane className="h-4 w-4 mr-2" />
                Flights
              </TabsTrigger>
              <TabsTrigger value="hotels">
                <Hotel className="h-4 w-4 mr-2" />
                Hotels
              </TabsTrigger>
            </TabsList>

            <TabsContent value="flights" className="space-y-4">
              {flightBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <div className="md:col-span-8">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-lg">{booking.route}</h3>
                              <Badge
                                variant={
                                  booking.status === 'CONFIRMED'
                                    ? 'default'
                                    : booking.status === 'PENDING'
                                    ? 'secondary'
                                    : 'destructive'
                                }
                              >
                                {booking.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Booking Ref: {booking.bookingReference} • PNR: {booking.pnr}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-4 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(booking.departure)}</span>
                            <span className="text-muted-foreground">
                              {formatTime(booking.departure)} - {formatTime(booking.arrival)}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <Plane className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {booking.airline} {booking.flightNumber}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.passengers} Passenger{booking.passengers > 1 ? 's' : ''}</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <p className="text-xs text-muted-foreground">
                            Booked on {formatDate(booking.bookedAt)}
                          </p>
                        </div>
                      </div>

                      <div className="md:col-span-4 flex flex-col justify-between items-end">
                        <div className="text-right mb-4">
                          <p className="text-2xl font-bold">{formatCurrency(booking.amount)}</p>
                        </div>

                        <div className="space-y-2 w-full">
                          <Button variant="outline" className="w-full" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download Ticket
                          </Button>
                          <Button variant="outline" className="w-full" size="sm">
                            View Details
                          </Button>
                          {booking.status === 'CONFIRMED' && (
                            <Button variant="outline" className="w-full text-destructive" size="sm">
                              <X className="h-4 w-4 mr-2" />
                              Cancel Booking
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {flightBookings.length === 0 && (
                <Card className="p-12 text-center">
                  <Plane className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">No flight bookings yet</p>
                  <Button onClick={() => (window.location.href = '/')}>
                    Search Flights
                  </Button>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="hotels" className="space-y-4">
              {hotelBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <div className="md:col-span-8">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-lg">{booking.hotelName}</h3>
                              <Badge
                                variant={
                                  booking.status === 'CONFIRMED' ? 'default' : 'secondary'
                                }
                              >
                                {booking.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Booking Ref: {booking.bookingReference}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-4 text-sm">
                            <Hotel className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              Check-in: {formatDate(booking.checkIn)} • Check-out:{' '}
                              {formatDate(booking.checkOut)}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {booking.rooms} Room • {booking.guests} Guest{booking.guests > 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <p className="text-xs text-muted-foreground">
                            Booked on {formatDate(booking.bookedAt)}
                          </p>
                        </div>
                      </div>

                      <div className="md:col-span-4 flex flex-col justify-between items-end">
                        <div className="text-right mb-4">
                          <p className="text-2xl font-bold">{formatCurrency(booking.amount)}</p>
                        </div>

                        <div className="space-y-2 w-full">
                          <Button variant="outline" className="w-full" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download Voucher
                          </Button>
                          <Button variant="outline" className="w-full" size="sm">
                            View Details
                          </Button>
                          {booking.status === 'CONFIRMED' && (
                            <Button variant="outline" className="w-full text-destructive" size="sm">
                              <X className="h-4 w-4 mr-2" />
                              Cancel Booking
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {hotelBookings.length === 0 && (
                <Card className="p-12 text-center">
                  <Hotel className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">No hotel bookings yet</p>
                  <Button onClick={() => (window.location.href = '/')}>
                    Search Hotels
                  </Button>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
