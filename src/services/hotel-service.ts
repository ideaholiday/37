import { apiClient } from './api-client'
import type {
  HotelSearchParams,
  HotelSearchResult,
  HotelBookingRequest,
  HotelBooking,
  Hotel,
} from '@/types/hotel'

export const hotelService = {
  // Search hotels
  async searchHotels(params: HotelSearchParams): Promise<{ results: HotelSearchResult[]; traceId: string }> {
    return apiClient.post('/hotels/search', params)
  },

  // Get hotel details
  async getHotelDetails(hotelCode: string, traceId: string): Promise<Hotel> {
    return apiClient.get(`/hotels/${hotelCode}`, { params: { traceId } })
  },

  // PreBook - verify availability and price
  async preBook(hotelCode: string, roomId: string, traceId: string): Promise<HotelSearchResult> {
    return apiClient.post('/hotels/prebook', { hotelCode, roomId, traceId })
  },

  // Create booking
  async createBooking(request: HotelBookingRequest): Promise<HotelBooking> {
    return apiClient.post('/hotels/book', request, { requiresAuth: true })
  },

  // Get booking details
  async getBooking(bookingId: string): Promise<HotelBooking> {
    return apiClient.get(`/hotels/bookings/${bookingId}`, { requiresAuth: true })
  },

  // Cancel booking
  async cancelBooking(bookingId: string, reason?: string): Promise<{ success: boolean; refundAmount: number }> {
    return apiClient.post(`/hotels/bookings/${bookingId}/cancel`, { reason }, { requiresAuth: true })
  },

  // Get cancellation charges
  async getCancellationCharges(bookingId: string): Promise<{ charges: number; refund: number }> {
    return apiClient.get(`/hotels/bookings/${bookingId}/cancel-charges`, { requiresAuth: true })
  },

  // Get cities for autosuggest
  async searchCities(query: string): Promise<Array<{ code: string; name: string; countryCode: string }>> {
    return apiClient.get('/hotels/cities', { params: { q: query } })
  },
}
