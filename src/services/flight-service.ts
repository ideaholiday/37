import { apiClient } from './api-client'
import type {
  FlightSearchParams,
  Flight,
  BookingRequest,
  Booking,
  SeatMap,
  Meal,
  FareRule,
} from '@/types/flight'

export const flightService = {
  // Search flights
  async searchFlights(params: FlightSearchParams): Promise<{ flights: Flight[]; traceId: string }> {
    return apiClient.post('/flights/search', params)
  },

  // Reprice/Fare Quote
  async repriceFlight(flightId: string, traceId: string): Promise<Flight> {
    return apiClient.post('/flights/reprice', { flightId, traceId })
  },

  // Get fare rules
  async getFareRules(flightId: string): Promise<FareRule[]> {
    return apiClient.get(`/flights/${flightId}/fare-rules`)
  },

  // Get seat map
  async getSeatMap(flightId: string, segmentId: string): Promise<SeatMap> {
    return apiClient.get(`/flights/${flightId}/segments/${segmentId}/seat-map`)
  },

  // Get meals
  async getMeals(flightId: string, segmentId: string): Promise<Meal[]> {
    return apiClient.get(`/flights/${flightId}/segments/${segmentId}/meals`)
  },

  // Get calendar fares
  async getCalendarFares(
    origin: string,
    destination: string,
    departDate: string
  ): Promise<Record<string, number>> {
    return apiClient.get('/flights/calendar-fares', {
      params: { origin, destination, departDate },
    })
  },

  // Create booking
  async createBooking(request: BookingRequest): Promise<Booking> {
    return apiClient.post('/flights/book', request, { requiresAuth: true })
  },

  // Get booking details
  async getBooking(bookingId: string): Promise<Booking> {
    return apiClient.get(`/flights/bookings/${bookingId}`, { requiresAuth: true })
  },

  // Cancel booking
  async cancelBooking(bookingId: string, reason?: string): Promise<{ success: boolean; refundAmount: number }> {
    return apiClient.post(`/flights/bookings/${bookingId}/cancel`, { reason }, { requiresAuth: true })
  },

  // Get cancellation charges
  async getCancellationCharges(bookingId: string): Promise<{ charges: number; refund: number }> {
    return apiClient.get(`/flights/bookings/${bookingId}/cancel-charges`, { requiresAuth: true })
  },
}
