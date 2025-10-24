'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plane, Clock, Briefcase } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useFlightSearchStore } from '@/store/flight-store'
import { formatCurrency, formatTime } from '@/lib/utils'
import type { Flight } from '@/types/flight'

interface FlightCardProps {
  flight: Flight
}

export function FlightCard({ flight }: FlightCardProps) {
  const router = useRouter()
  const { setSelectedFlight } = useFlightSearchStore()
  
  const segment = flight.segments[0]
  const duration = Math.floor(segment.duration / 60)
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60

  const handleSelect = () => {
    setSelectedFlight(flight)
    router.push('/flights/booking')
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Airline */}
        <div className="md:col-span-2 flex items-center gap-3">
          <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
            <Plane className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-sm">{segment.airline.name}</p>
            <p className="text-xs text-muted-foreground">{segment.flightNumber}</p>
          </div>
        </div>

        {/* Flight Times */}
        <div className="md:col-span-6">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-2xl font-bold">{formatTime(segment.departure)}</p>
              <p className="text-sm text-muted-foreground">{segment.origin}</p>
            </div>

            <div className="flex-1 px-4">
              <div className="relative">
                <div className="h-px bg-border"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {hours}h {minutes}m
                  </div>
                </div>
              </div>
              <div className="text-center mt-1">
                {segment.stops === 0 ? (
                  <span className="text-xs text-green-600 font-medium">Non-stop</span>
                ) : (
                  <span className="text-xs text-muted-foreground">{segment.stops} stop{segment.stops > 1 ? 's' : ''}</span>
                )}
              </div>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold">{formatTime(segment.arrival)}</p>
              <p className="text-sm text-muted-foreground">{segment.destination}</p>
            </div>
          </div>
        </div>

        {/* Price & Details */}
        <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-4">
          <div className="text-right">
            <p className="text-2xl font-bold">{formatCurrency(flight.fareBreakup.total)}</p>
            <p className="text-xs text-muted-foreground">per person</p>
            <div className="flex gap-2 mt-2 justify-end">
              {flight.refundable && (
                <Badge variant="secondary" className="text-xs">Refundable</Badge>
              )}
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                {flight.baggage.checkIn}
              </Badge>
            </div>
          </div>
          <Button onClick={handleSelect}>
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  )
}
