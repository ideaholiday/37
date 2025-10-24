# API Integration Guide

## Overview

The Idea Holiday frontend integrates with a Laravel 12 backend that wraps TBO Flights and Hotels APIs. All API requests are typed and handled through service layers.

## Base Configuration

```typescript
// src/config/index.ts
export const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1',
  // ... other config
}
```

## API Client

The base API client handles authentication, error handling, and request/response formatting:

```typescript
// src/services/api-client.ts
import { apiClient } from './api-client'

// Set auth token
apiClient.setToken('your-jwt-token')

// Make requests
const data = await apiClient.get('/flights/search')
```

## Flight APIs

### Search Flights

**Endpoint:** `POST /flights/search`

```typescript
import { flightService } from '@/services/flight-service'

const results = await flightService.searchFlights({
  tripType: 'ROUND_TRIP',
  segments: [{
    origin: 'DEL',
    destination: 'BOM',
    departDate: '2024-12-25',
    returnDate: '2024-12-27'
  }],
  adults: 2,
  children: 0,
  infants: 0,
  cabinClass: 'ECONOMY'
})
```

**Response:**
```json
{
  "flights": [
    {
      "id": "flight-123",
      "segments": [...],
      "fareBreakup": {
        "base": 8000,
        "taxes": [...],
        "fees": 500,
        "pgCharge": 180,
        "markup": 400,
        "discount": 0,
        "total": 9080,
        "currency": "INR"
      },
      "refundable": true,
      "baggage": {
        "checkIn": "15 KG",
        "cabin": "7 KG"
      },
      "traceId": "trace-abc-123"
    }
  ],
  "traceId": "trace-abc-123"
}
```

### Reprice/Fare Quote

**Endpoint:** `POST /flights/reprice`

```typescript
const repriced = await flightService.repriceFlight(
  'flight-123',
  'trace-abc-123'
)
```

### Get Fare Rules

**Endpoint:** `GET /flights/:id/fare-rules`

```typescript
const fareRules = await flightService.getFareRules('flight-123')
```

### Get Seat Map

**Endpoint:** `GET /flights/:id/segments/:segmentId/seat-map`

```typescript
const seatMap = await flightService.getSeatMap('flight-123', 'segment-1')
```

**Response:**
```json
{
  "segmentId": "segment-1",
  "cabin": [
    {
      "type": "ECONOMY",
      "rows": [
        {
          "number": 1,
          "seats": [
            {
              "number": "1A",
              "available": true,
              "type": "WINDOW",
              "price": 500,
              "position": "WINDOW"
            }
          ]
        }
      ]
    }
  ]
}
```

### Get Meals

**Endpoint:** `GET /flights/:id/segments/:segmentId/meals`

```typescript
const meals = await flightService.getMeals('flight-123', 'segment-1')
```

### Create Booking

**Endpoint:** `POST /flights/book`

```typescript
const booking = await flightService.createBooking({
  flightId: 'flight-123',
  passengers: [{
    type: 'ADULT',
    title: 'Mr',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    gender: 'M',
    email: 'john@example.com',
    phone: '+919876543210'
  }],
  contact: {
    email: 'john@example.com',
    phone: '+919876543210',
    countryCode: '+91'
  },
  ancillaries: {
    seats: [{
      segmentId: 'segment-1',
      passengerId: '1',
      seatNumber: '1A',
      price: 500
    }],
    meals: [{
      segmentId: 'segment-1',
      passengerId: '1',
      mealCode: 'VEG',
      description: 'Vegetarian Meal',
      price: 300
    }]
  }
})
```

### Cancel Booking

**Endpoint:** `POST /flights/bookings/:id/cancel`

```typescript
const result = await flightService.cancelBooking('booking-123', 'Customer request')
```

## Hotel APIs

### Search Hotels

**Endpoint:** `POST /hotels/search`

```typescript
import { hotelService } from '@/services/hotel-service'

const results = await hotelService.searchHotels({
  cityCode: 'BOM',
  checkInDate: '2024-12-25',
  checkOutDate: '2024-12-27',
  rooms: [{
    adults: 2,
    children: 0
  }],
  nationality: 'IN'
})
```

### PreBook Hotel

**Endpoint:** `POST /hotels/prebook`

```typescript
const prebookResult = await hotelService.preBook(
  'hotel-123',
  'room-456',
  'trace-xyz'
)
```

### Book Hotel

**Endpoint:** `POST /hotels/book`

```typescript
const booking = await hotelService.createBooking({
  hotelCode: 'hotel-123',
  roomId: 'room-456',
  checkInDate: '2024-12-25',
  checkOutDate: '2024-12-27',
  rooms: [{
    roomNumber: 1,
    adults: [{
      title: 'Mr',
      firstName: 'John',
      lastName: 'Doe'
    }],
    children: []
  }],
  contact: {
    email: 'john@example.com',
    phone: '+919876543210',
    countryCode: '+91'
  }
})
```

## Authentication APIs

### Login

**Endpoint:** `POST /auth/login`

```typescript
const response = await apiClient.post('/auth/login', {
  email: 'user@example.com',
  password: 'password123'
})

// Store token
apiClient.setToken(response.token)
```

### Login with OTP

**Endpoint:** `POST /auth/login-otp`

```typescript
const response = await apiClient.post('/auth/login-otp', {
  phone: '+919876543210',
  otp: '123456'
})
```

## Error Handling

All API errors are wrapped in `ApiError` class:

```typescript
try {
  const data = await flightService.searchFlights(params)
} catch (error) {
  if (error instanceof ApiError) {
    console.error('API Error:', error.status, error.message)
    console.error('Trace ID:', error.traceId)
    console.error('Validation errors:', error.errors)
  }
}
```

## Rate Limiting

The API implements rate limiting:
- 100 requests per minute for search endpoints
- 50 requests per minute for booking endpoints
- 10 requests per minute for cancellation endpoints

## Webhook Integration

### Payment Webhooks (Razorpay)

**Endpoint:** `POST /webhooks/razorpay`

Handle webhook events:
- `payment.captured`
- `payment.failed`
- `refund.processed`

### Booking Status Updates

**Endpoint:** `POST /webhooks/booking-status`

Receive booking status updates from TBO.

## Testing

### Mock Mode

Enable mock mode for development:

```env
NEXT_PUBLIC_MOCK_MODE=true
```

This returns mock data without hitting the actual API.

### Test Credentials

Use test Razorpay credentials:
```env
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=test_secret_key
```

## Best Practices

1. **Always handle errors** - Wrap API calls in try-catch
2. **Use trace IDs** - Include trace IDs for debugging
3. **Implement retry logic** - For transient failures
4. **Cache responses** - Use TanStack Query for caching
5. **Validate inputs** - Use Zod schemas before API calls
6. **Log requests** - In development mode
7. **Rate limit client-side** - Debounce search inputs

## Support

For API issues:
- Check backend logs
- Include trace ID in support requests
- Review error responses
- Consult API documentation
