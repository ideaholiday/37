'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FlightCard } from '@/components/features/flight-card'
import { FlightFilters } from '@/components/features/flight-filters'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useFlightSearchStore } from '@/store/flight-store'
import { flightService } from '@/services/flight-service'
import { Loader2 } from 'lucide-react'

export default function FlightResultsPage() {
  const { searchParams, setSearchResults, searchResults } = useFlightSearchStore()
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price')

  const { data, isLoading, error } = useQuery({
    queryKey: ['flights', searchParams],
    queryFn: async () => {
      if (!searchParams) throw new Error('No search parameters')
      return flightService.searchFlights(searchParams)
    },
    enabled: !!searchParams,
  })

  useEffect(() => {
    if (data) {
      setSearchResults(data.flights, data.traceId)
    }
  }, [data, setSearchResults])

  if (!searchParams) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No search parameters found. Please search for flights first.</p>
            <Button className="mt-4" onClick={() => window.location.href = '/'}>
              Go to Home
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  const sortedFlights = searchResults ? [...searchResults].sort((a, b) => {
    if (sortBy === 'price') {
      return a.fareBreakup.total - b.fareBreakup.total
    }
    if (sortBy === 'duration') {
      return a.segments[0].duration - b.segments[0].duration
    }
    return 0
  }) : []

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/50">
        <div className="container py-6">
          {/* Search Summary */}
          <Card className="p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="font-semibold">
                  {searchParams.segments[0].origin} → {searchParams.segments[0].destination}
                </span>
                <span className="text-muted-foreground ml-4">
                  {searchParams.adults} Adult{searchParams.adults > 1 ? 's' : ''}
                  {searchParams.children > 0 && `, ${searchParams.children} Child${searchParams.children > 1 ? 'ren' : ''}`}
                  {searchParams.infants > 0 && `, ${searchParams.infants} Infant${searchParams.infants > 1 ? 's' : ''}`}
                </span>
                <span className="text-muted-foreground ml-4">
                  {searchParams.cabinClass}
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
              <FlightFilters />
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {/* Sort Options */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  {isLoading ? 'Searching...' : `${sortedFlights.length} flights found`}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant={sortBy === 'price' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('price')}
                  >
                    Best Price
                  </Button>
                  <Button
                    variant={sortBy === 'duration' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('duration')}
                  >
                    Shortest
                  </Button>
                  <Button
                    variant={sortBy === 'departure' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('departure')}
                  >
                    Departure
                  </Button>
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <Card className="p-12 text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Searching for the best flights...</p>
                </Card>
              )}

              {/* Error State */}
              {error && (
                <Card className="p-8 text-center">
                  <p className="text-destructive mb-2">Failed to search flights</p>
                  <p className="text-sm text-muted-foreground">{(error as Error).message}</p>
                  <Button className="mt-4" onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </Card>
              )}

              {/* Results */}
              {!isLoading && !error && (
                <div className="space-y-4">
                  {sortedFlights.length === 0 ? (
                    <Card className="p-8 text-center">
                      <p className="text-muted-foreground">No flights found for your search criteria.</p>
                      <Button className="mt-4" onClick={() => window.location.href = '/'}>
                        Try Different Search
                      </Button>
                    </Card>
                  ) : (
                    sortedFlights.map((flight) => (
                      <FlightCard key={flight.id} flight={flight} />
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
