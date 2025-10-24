'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { FlightSearch } from './flight-search'
import { HotelSearch } from './hotel-search'

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
      <div className="container">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Journey Begins Here
          </h1>
          <p className="text-lg text-muted-foreground">
            Search and book flights and hotels at the best prices
          </p>
        </div>

        <Card className="max-w-5xl mx-auto p-6">
          <Tabs defaultValue="flights" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
              <TabsTrigger value="flights">Flights</TabsTrigger>
              <TabsTrigger value="hotels">Hotels</TabsTrigger>
            </TabsList>

            <TabsContent value="flights">
              <FlightSearch />
            </TabsContent>

            <TabsContent value="hotels">
              <HotelSearch />
            </TabsContent>
          </Tabs>
        </Card>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            <span>Best Price Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            <span>Instant Confirmation</span>
          </div>
        </div>
      </div>
    </section>
  )
}
