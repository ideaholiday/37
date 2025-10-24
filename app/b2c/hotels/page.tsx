'use client';

import { useState } from 'react';
import { Hotel } from 'lucide-react';
import { Button, Input, Card } from '@/components/shared/UI';

export default function HotelsPage() {
  const [searchParams, setSearchParams] = useState({
    city: '',
    cityId: '',
    checkIn: '',
    checkOut: '',
    rooms: 1,
    adults: 2,
    children: 0,
  });

  const [isSearching, setIsSearching] = useState(false);
  const [hotels, setHotels] = useState<any[]>([]);

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const response = await fetch('/api/tbo/hotels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchParams),
      });

      const result = await response.json();
      if (result.success) {
        setHotels(result.data?.HotelResult || []);
      } else {
        alert('Failed to search hotels: ' + result.error);
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Failed to search hotels');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Hotel className="h-8 w-8 text-blue-600" />
            Search Hotels
          </h1>
          <p className="text-gray-600 mt-2">
            Find the perfect hotel for your stay
          </p>
        </div>

        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="City"
              placeholder="e.g., Delhi, Mumbai, Bangalore"
              value={searchParams.city}
              onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
            />

            <Input
              label="City ID (TBO)"
              placeholder="e.g., 130443"
              value={searchParams.cityId}
              onChange={(e) => setSearchParams({ ...searchParams, cityId: e.target.value })}
            />

            <Input
              type="date"
              label="Check-in Date"
              value={searchParams.checkIn}
              onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
            />

            <Input
              type="date"
              label="Check-out Date"
              value={searchParams.checkOut}
              onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
            />

            <Input
              type="number"
              label="Rooms"
              min="1"
              max="10"
              value={searchParams.rooms}
              onChange={(e) => setSearchParams({ ...searchParams, rooms: parseInt(e.target.value) })}
            />

            <Input
              type="number"
              label="Adults per Room"
              min="1"
              max="9"
              value={searchParams.adults}
              onChange={(e) => setSearchParams({ ...searchParams, adults: parseInt(e.target.value) })}
            />

            <Input
              type="number"
              label="Children per Room"
              min="0"
              max="9"
              value={searchParams.children}
              onChange={(e) => setSearchParams({ ...searchParams, children: parseInt(e.target.value) })}
            />
          </div>

          <div className="mt-6">
            <Button
              onClick={handleSearch}
              isLoading={isSearching}
              className="w-full md:w-auto"
              disabled={!searchParams.cityId || !searchParams.checkIn || !searchParams.checkOut}
            >
              Search Hotels
            </Button>
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
            <strong>Note:</strong> City ID is required for TBO API. You can find city IDs in the TBO documentation or by using the city search API.
          </div>
        </Card>

        {/* Results Section */}
        {hotels.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Hotels ({hotels.length})
            </h2>
            {hotels.slice(0, 10).map((hotel: any, index: number) => (
              <Card key={index}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-lg">
                      {hotel.HotelName || 'Hotel Name'}
                    </div>
                    <div className="text-gray-600">
                      {hotel.HotelAddress || 'Address'}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        ⭐ {hotel.StarRating || 'N/A'} Star
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      ₹{hotel.Price?.PublishedPrice?.toLocaleString('en-IN') || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-500">per night</div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Select Hotel
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
            <p className="mt-4 text-gray-600">Searching for hotels...</p>
          </div>
        )}

        {!isSearching && hotels.length === 0 && searchParams.cityId && (
          <div className="text-center py-12">
            <p className="text-gray-600">No hotels found. Please try different search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
