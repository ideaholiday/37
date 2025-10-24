'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, Wifi, Coffee, Utensils } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function HotelResultsPage() {
  // Mock hotel data
  const hotels = [
    {
      id: '1',
      name: 'The Grand Palace Hotel',
      starRating: 5,
      address: 'Marine Drive, Mumbai',
      image: '/placeholder-hotel.jpg',
      amenities: ['Wifi', 'Pool', 'Restaurant', 'Spa'],
      reviewScore: 4.7,
      reviewCount: 1234,
      pricePerNight: 8500,
      totalPrice: 17000,
      nights: 2,
      refundable: true,
      breakfast: true,
    },
    {
      id: '2',
      name: 'Seaside Resort & Spa',
      starRating: 4,
      address: 'Bandra West, Mumbai',
      image: '/placeholder-hotel.jpg',
      amenities: ['Wifi', 'Pool', 'Gym'],
      reviewScore: 4.5,
      reviewCount: 892,
      pricePerNight: 6200,
      totalPrice: 12400,
      nights: 2,
      refundable: false,
      breakfast: true,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/50">
        <div className="container py-6">
          {/* Search Summary */}
          <Card className="p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="font-semibold">Mumbai</span>
                <span className="text-muted-foreground ml-4">
                  Check-in: Dec 25 • Check-out: Dec 27 • 2 Nights • 1 Room • 2 Adults
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>
                Modify Search
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters */}
            <div className="lg:col-span-1">
              <Card className="p-4 sticky top-20">
                <h3 className="font-semibold mb-4">Filters</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Star Rating</h4>
                    <div className="space-y-2">
                      {[5, 4, 3].map((stars) => (
                        <label key={stars} className="flex items-center gap-2 text-sm">
                          <input type="checkbox" />
                          <div className="flex">
                            {Array.from({ length: stars }).map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Amenities</h4>
                    <div className="space-y-2">
                      {['Pool', 'Wifi', 'Breakfast', 'Gym', 'Spa'].map((amenity) => (
                        <label key={amenity} className="flex items-center gap-2 text-sm">
                          <input type="checkbox" />
                          {amenity}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-3 space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                {hotels.length} hotels found
              </p>

              {hotels.map((hotel) => (
                <Card key={hotel.id} className="hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
                    {/* Hotel Image */}
                    <div className="md:col-span-3">
                      <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>

                    {/* Hotel Details */}
                    <div className="md:col-span-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg">{hotel.name}</h3>
                          <div className="flex items-center gap-1 mb-1">
                            {Array.from({ length: hotel.starRating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {hotel.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {hotel.amenities.map((amenity) => (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            {amenity === 'Wifi' && <Wifi className="h-3 w-3 mr-1" />}
                            {amenity === 'Restaurant' && <Utensils className="h-3 w-3 mr-1" />}
                            {amenity === 'Pool' && <Coffee className="h-3 w-3 mr-1" />}
                            {amenity}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{hotel.reviewScore}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({hotel.reviewCount} reviews)
                        </span>
                        {hotel.breakfast && (
                          <Badge variant="outline" className="text-xs">
                            Breakfast Included
                          </Badge>
                        )}
                        {hotel.refundable && (
                          <Badge variant="outline" className="text-xs text-green-600">
                            Free Cancellation
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Price & Book */}
                    <div className="md:col-span-3 flex flex-col justify-between items-end">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground line-through">
                          {formatCurrency(hotel.pricePerNight * 1.2)}
                        </p>
                        <p className="text-2xl font-bold">{formatCurrency(hotel.pricePerNight)}</p>
                        <p className="text-xs text-muted-foreground">per night</p>
                        <p className="text-sm font-medium mt-1">
                          Total: {formatCurrency(hotel.totalPrice)}
                        </p>
                        <p className="text-xs text-muted-foreground">for {hotel.nights} nights</p>
                      </div>
                      <Button className="mt-4">View Details</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
