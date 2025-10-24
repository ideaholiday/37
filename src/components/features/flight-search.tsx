'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Minus, Search } from 'lucide-react'
import type { TripType, CabinClass, FlightSearchParams } from '@/types/flight'
import { useFlightSearchStore } from '@/store/flight-store'

export function FlightSearch() {
  const router = useRouter()
  const { setSearchParams } = useFlightSearchStore()
  
  const [tripType, setTripType] = useState<TripType>('ROUND_TRIP')
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [departDate, setDepartDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [cabinClass, setCabinClass] = useState<CabinClass>('ECONOMY')

  const handleSearch = () => {
    const params: FlightSearchParams = {
      tripType,
      segments: [
        {
          origin,
          destination,
          departDate,
          ...(tripType === 'ROUND_TRIP' ? { returnDate } : {}),
        },
      ],
      adults,
      children,
      infants,
      cabinClass,
    }
    
    setSearchParams(params)
    router.push('/flights/results')
  }

  return (
    <div className="space-y-6">
      {/* Trip Type */}
      <Tabs value={tripType} onValueChange={(v) => setTripType(v as TripType)}>
        <TabsList>
          <TabsTrigger value="ONE_WAY">One Way</TabsTrigger>
          <TabsTrigger value="ROUND_TRIP">Round Trip</TabsTrigger>
          <TabsTrigger value="MULTI_CITY">Multi City</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Origin & Destination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="origin">From</Label>
          <Input
            id="origin"
            placeholder="Delhi (DEL)"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="destination">To</Label>
          <Input
            id="destination"
            placeholder="Mumbai (BOM)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departDate">Departure</Label>
          <Input
            id="departDate"
            type="date"
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        {tripType === 'ROUND_TRIP' && (
          <div className="space-y-2">
            <Label htmlFor="returnDate">Return</Label>
            <Input
              id="returnDate"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={departDate || new Date().toISOString().split('T')[0]}
            />
          </div>
        )}
      </div>

      {/* Passengers & Class */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <Label className="mb-3 block">Passengers</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Adults (12+)</span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{adults}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setAdults(adults + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Children (2-12)</span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{children}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setChildren(children + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Infants (&lt;2)</span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setInfants(Math.max(0, infants - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{infants}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setInfants(Math.min(adults, infants + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <Label className="mb-3 block">Cabin Class</Label>
          <select
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value as CabinClass)}
            className="w-full h-10 px-3 rounded-md border border-input bg-background"
          >
            <option value="ECONOMY">Economy</option>
            <option value="PREMIUM_ECONOMY">Premium Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST">First Class</option>
          </select>
        </Card>
      </div>

      {/* Search Button */}
      <Button onClick={handleSearch} size="lg" className="w-full">
        <Search className="mr-2 h-5 w-5" />
        Search Flights
      </Button>
    </div>
  )
}
