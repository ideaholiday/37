'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Plus, Minus, Search } from 'lucide-react'
import type { HotelSearchParams } from '@/types/hotel'

export function HotelSearch() {
  const router = useRouter()
  
  const [cityCode, setCityCode] = useState('')
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [rooms, setRooms] = useState(1)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)

  const handleSearch = () => {
    const params: HotelSearchParams = {
      cityCode,
      checkInDate,
      checkOutDate,
      rooms: Array(rooms).fill({ adults, children }),
      nationality: 'IN',
    }
    
    // Store params and navigate
    router.push('/hotels/results')
  }

  return (
    <div className="space-y-6">
      {/* City */}
      <div className="space-y-2">
        <Label htmlFor="city">City or Hotel</Label>
        <Input
          id="city"
          placeholder="Enter city name or hotel"
          value={cityCode}
          onChange={(e) => setCityCode(e.target.value)}
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="checkIn">Check-in</Label>
          <Input
            id="checkIn"
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="checkOut">Check-out</Label>
          <Input
            id="checkOut"
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            min={checkInDate || new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      {/* Rooms & Guests */}
      <Card className="p-4">
        <Label className="mb-3 block">Rooms & Guests</Label>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Rooms</span>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setRooms(Math.max(1, rooms - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{rooms}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setRooms(rooms + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Adults</span>
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
            <span className="text-sm">Children</span>
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
        </div>
      </Card>

      {/* Search Button */}
      <Button onClick={handleSearch} size="lg" className="w-full">
        <Search className="mr-2 h-5 w-5" />
        Search Hotels
      </Button>
    </div>
  )
}
