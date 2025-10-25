'use client';

import { useState } from 'react';
import { Plane } from 'lucide-react';
import { Button, Input, Select, Card } from '@/components/shared/UI';

export default function B2CFlightsPage() {
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    infants: 0,
    class: 'Economy',
    tripType: 'OneWay',
  });

  const [isSearching, setIsSearching] = useState(false);
  const [flights, setFlights] = useState<any[]>([]);

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const response = await fetch('/api/tbo/flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchParams),
      });

      const result = await response.json();
      if (result.success) {
        setFlights(result.data?.Response?.Results?.[0] || []);
      } else {
        alert('Failed to search flights: ' + result.error);
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Failed to search flights');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Plane className="h-8 w-8 text-blue-600" />
            Search Flights
          </h1>
          <p className="text-gray-600 mt-2">
            Find the best flight deals for your journey
          </p>
        </div>

        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Trip Type"
              value={searchParams.tripType}
              onChange={(e) => setSearchParams({ ...searchParams, tripType: e.target.value })}
              options={[
                { value: 'OneWay', label: 'One Way' },
                { value: 'Return', label: 'Return' },
              ]}
            />

            <Input
              label="From (Origin)"
              placeholder="e.g., DEL, BOM, BLR"
              value={searchParams.origin}
              onChange={(e) => setSearchParams({ ...searchParams, origin: e.target.value.toUpperCase() })}
            />

            <Input
              label="To (Destination)"
              placeholder="e.g., DEL, BOM, BLR"
              value={searchParams.destination}
              onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value.toUpperCase() })}
            />

            <Input
              type="date"
              label="Departure Date"
              value={searchParams.departureDate}
              onChange={(e) => setSearchParams({ ...searchParams, departureDate: e.target.value })}
            />

            {searchParams.tripType === 'Return' && (
              <Input
                type="date"
                label="Return Date"
                value={searchParams.returnDate}
                onChange={(e) => setSearchParams({ ...searchParams, returnDate: e.target.value })}
              />
            )}

            <Select
              label="Class"
              value={searchParams.class}
              onChange={(e) => setSearchParams({ ...searchParams, class: e.target.value })}
              options={[
                { value: 'Economy', label: 'Economy' },
                { value: 'Business', label: 'Business' },
                { value: 'First', label: 'First Class' },
              ]}
            />

            <Input
              type="number"
              label="Adults"
              min="1"
              max="9"
              value={searchParams.adults}
              onChange={(e) => setSearchParams({ ...searchParams, adults: parseInt(e.target.value) })}
            />

            <Input
              type="number"
              label="Children"
              min="0"
              max="9"
              value={searchParams.children}
              onChange={(e) => setSearchParams({ ...searchParams, children: parseInt(e.target.value) })}
            />

            <Input
              type="number"
              label="Infants"
              min="0"
              max="9"
              value={searchParams.infants}
              onChange={(e) => setSearchParams({ ...searchParams, infants: parseInt(e.target.value) })}
            />
          </div>

          <div className="mt-6">
            <Button
              onClick={handleSearch}
              isLoading={isSearching}
              className="w-full md:w-auto"
              disabled={!searchParams.origin || !searchParams.destination || !searchParams.departureDate}
            >
              Search Flights
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {flights.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Flights ({flights.length})
            </h2>
            {flights.slice(0, 10).map((flight: any, index: number) => (
              <Card key={index}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-lg">
                      {flight.Segments?.[0]?.[0]?.Airline?.AirlineName || 'Airline'}
                    </div>
                    <div className="text-gray-600">
                      {flight.Segments?.[0]?.[0]?.Origin?.Airport?.CityName} →{' '}
                      {flight.Segments?.[0]?.[0]?.Destination?.Airport?.CityName}
                    </div>
                    <div className="text-sm text-gray-500">
                      Flight: {flight.Segments?.[0]?.[0]?.Airline?.FlightNumber}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      ₹{flight.Fare?.PublishedFare?.toLocaleString('en-IN') || 'N/A'}
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Select Flight
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {isSearching && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching for flights...</p>
          </div>
        )}

        {!isSearching && flights.length === 0 && searchParams.origin && (
          <div className="text-center py-12">
            <p className="text-gray-600">No flights found. Please try different search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
