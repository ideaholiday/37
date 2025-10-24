# TBO API Integration Documentation

## Overview
This document describes the TBO (Travel Boutique Online) API integration for the Idea Holiday travel booking platform.

## Credentials

```env
NEXT_PUBLIC_TBO_CLIENT_ID=tboprod
NEXT_PUBLIC_TBO_USERNAME=LKOM258
NEXT_PUBLIC_TBO_PASSWORD=New@api/LKO$582
TBO_ENDUSER_IP=157.245.100.148
```

## API Endpoints

### Flight API (REST)

| Service | Endpoint |
|---------|----------|
| Authentication | `https://api.travelboutiqueonline.com/SharedAPI/SharedData.svc/rest/Authenticate` |
| Search | `https://tboapi.travelboutiqueonline.com/AirAPI_V10/AirService.svc/rest/Search` |
| Fare Quote | `https://tboapi.travelboutiqueonline.com/AirAPI_V10/AirService.svc/rest/FareQuote` |
| Fare Rule | `https://tboapi.travelboutiqueonline.com/AirAPI_V10/AirService.svc/rest/FareRule` |
| SSR | `https://tboapi.travelboutiqueonline.com/AirAPI_V10/AirService.svc/rest/SSR` |
| Book | `https://booking.travelboutiqueonline.com/AirAPI_V10/AirService.svc/rest/Book` |
| Ticket | `https://booking.travelboutiqueonline.com/AirAPI_V10/AirService.svc/rest/Ticket` |
| Booking Details | `https://booking.travelboutiqueonline.com/AirAPI_V10/AirService.svc/rest/GetBookingDetails` |

### Hotel API (REST)

| Service | Endpoint |
|---------|----------|
| Authentication | `http://Sharedapi.tektravels.com/SharedData.svc/rest/Authenticate` |
| Search | `https://affiliate.tektravels.com/HotelAPI/Search` |
| PreBook | `https://affiliate.tektravels.com/HotelAPI/PreBook` |
| Book | `https://HotelBE.tektravels.com/hotelservice.svc/rest/book/` |
| Booking Details | `https://HotelBE.tektravels.com/hotelservice.svc/rest/Getbookingdetail` |
| Cancel | `https://hotelbooking.travelboutiqueonline.com/HotelAPI_V10/HotelService.svc/rest/CancelBooking` |

## Implementation

### Service Class Location
`/lib/api/tbo.ts`

### Features Implemented

#### Flight Services
- ✅ Authentication with token caching (25-minute validity)
- ✅ Flight Search (one-way and round-trip)
- ✅ Fare Quote (price verification before booking)
- ✅ Fare Rule (cancellation/change policies)
- ✅ Flight Booking
- ✅ Flight Ticketing
- ✅ Booking Details Retrieval

#### Hotel Services
- ✅ Authentication
- ✅ Hotel Search with filters
- ✅ PreBook (price and policy verification)
- ✅ Hotel Booking
- ✅ Booking Details Retrieval
- ✅ Cancellation

## Configuration

### Environment Variables

Add to `.env`:

```bash
# TBO API Configuration (Production)
NEXT_PUBLIC_TBO_CLIENT_ID=tboprod
NEXT_PUBLIC_TBO_USERNAME=LKOM258
NEXT_PUBLIC_TBO_PASSWORD=New@api/LKO$582
TBO_ENDUSER_IP=157.245.100.148

# TBO API URLs
TBO_AIR_API=https://tboapi.travelboutiqueonline.com/AirAPI_V10/AirService.svc
TBO_AIR_BOOK=https://booking.travelboutiqueonline.com/AirAPI_V10/AirService.svc
TBO_HOTEL_SEARCH=https://api.travelboutiqueonline.com/HotelAPI_V10/HotelService.svc
TBO_HOTEL_BOOK=https://hotelbooking.travelboutiqueonline.com/HotelAPI_V10/HotelService.svc

# TBO Settings
USE_TBO_HOTEL=true
USE_TBO_FLIGHT=true
USE_MOCK=false
TBO_FLIGHT_MODE=rest

# Markup Percentages
IH_MARKUP_FLIGHT_PCT=3
IH_MARKUP_HOTEL_PCT=5
```

## API Routes

### Flight Search
**POST** `/api/tbo/flights`

Request:
```json
{
  "origin": "BOM",
  "destination": "LKO",
  "departureDate": "2025-12-15",
  "returnDate": "2025-12-22",
  "adults": 1,
  "children": 0,
  "infants": 0,
  "class": "Economy",
  "tripType": "Return"
}
```

### Hotel Search
**POST** `/api/tbo/hotels`

Request:
```json
{
  "cityId": "DXB",
  "cityName": "Dubai",
  "checkIn": "2025-12-20",
  "checkOut": "2025-12-25",
  "adults": 2,
  "children": 0,
  "rooms": 1
}
```

## Usage Example

### Frontend Implementation

```typescript
import TBOService from '@/lib/api/tbo';

// Search flights
const searchFlights = async () => {
  try {
    const results = await TBOService.searchFlights({
      origin: 'BOM',
      destination: 'LKO',
      departureDate: '2025-12-15',
      adults: 1,
      tripType: 'OneWay',
      class: 'Economy'
    });
    console.log('Flight results:', results);
  } catch (error) {
    console.error('Search failed:', error);
  }
};

// Get fare quote
const getFareQuote = async (resultIndex: string, traceId: string) => {
  try {
    const quote = await TBOService.fareQuote(resultIndex, traceId);
    console.log('Fare quote:', quote);
  } catch (error) {
    console.error('Fare quote failed:', error);
  }
};

// Book flight
const bookFlight = async (bookingData: any) => {
  try {
    const booking = await TBOService.bookFlight(bookingData);
    console.log('Booking confirmed:', booking);
  } catch (error) {
    console.error('Booking failed:', error);
  }
};
```

## Error Handling

The TBO service includes comprehensive error handling:
- Network timeouts (30 seconds)
- Authentication failures
- Invalid requests
- API errors

All errors are logged and throw descriptive error messages.

## Testing

### Test Flight Search

```bash
curl -X POST http://localhost:3000/api/tbo/flights \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "BOM",
    "destination": "LKO",
    "departureDate": "2025-12-15",
    "adults": 1,
    "tripType": "OneWay",
    "class": "Economy"
  }'
```

### Test Hotel Search

```bash
curl -X POST http://localhost:3000/api/tbo/hotels \
  -H "Content-Type: application/json" \
  -d '{
    "cityId": "DXB",
    "cityName": "Dubai",
    "checkIn": "2025-12-20",
    "checkOut": "2025-12-25",
    "adults": 2,
    "rooms": 1
  }'
```

## Best Practices

1. **Token Caching**: Tokens are cached for 25 minutes to reduce authentication calls
2. **Error Logging**: All API calls are logged for debugging
3. **Timeout Handling**: 30-second timeout on all requests
4. **Input Validation**: Validate all parameters before API calls
5. **Markup Application**: Apply configurable markup percentages (3% flights, 5% hotels)

## Support

For TBO API issues:
- **TBO Support**: support@travelboutiqueonline.com
- **Documentation**: https://www.travelboutiqueonline.com/

For platform issues:
- Check logs in browser console
- Review error messages in API responses
- Verify environment variables are set correctly

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Oct 24, 2025 | Initial TBO integration with REST API endpoints |

---

**Last Updated:** October 24, 2025
**Status:** Production Ready
