// Hotel Types
export interface HotelSearchParams {
  cityCode: string
  checkInDate: string
  checkOutDate: string
  rooms: RoomOccupancy[]
  nationality: string
  filters?: HotelFilters
}

export interface RoomOccupancy {
  adults: number
  children: number
  childAges?: number[]
}

export interface HotelFilters {
  priceRange?: [number, number]
  starRating?: number[]
  amenities?: string[]
  mealPlans?: string[]
  refundable?: boolean
  freeCancellation?: boolean
  neighborhoods?: string[]
}

export interface Hotel {
  code: string
  name: string
  address: string
  cityCode: string
  cityName: string
  countryCode: string
  starRating: number
  images: HotelImage[]
  location: Location
  amenities: Amenity[]
  description: string
  reviewScore?: number
  reviewCount?: number
}

export interface HotelImage {
  url: string
  caption?: string
  type: 'EXTERIOR' | 'INTERIOR' | 'ROOM' | 'AMENITY' | 'OTHER'
}

export interface Location {
  latitude: number
  longitude: number
  address: string
  landmark?: string
}

export interface Amenity {
  code: string
  name: string
  category: string
}

export interface HotelSearchResult {
  hotel: Hotel
  rooms: Room[]
  traceId: string
}

export interface Room {
  id: string
  name: string
  description: string
  images: string[]
  boardBasis: BoardBasis
  bedType: string
  maxOccupancy: number
  roomSize?: number
  amenities: string[]
  price: RoomPrice
  cancellationPolicy: CancellationPolicy
  available: boolean
}

export type BoardBasis = 
  | 'RO'  // Room Only
  | 'BB'  // Bed & Breakfast
  | 'HB'  // Half Board
  | 'FB'  // Full Board
  | 'AI'  // All Inclusive

export interface RoomPrice {
  base: number
  taxes: number
  fees: number
  total: number
  currency: string
  perNight: number
  totalNights: number
}

export interface CancellationPolicy {
  refundable: boolean
  deadlines: CancellationDeadline[]
  description: string
}

export interface CancellationDeadline {
  fromDate: string
  charge: number
  chargeType: 'FIXED' | 'PERCENTAGE'
}

export interface HotelBookingRequest {
  hotelCode: string
  roomId: string
  checkInDate: string
  checkOutDate: string
  rooms: RoomGuest[]
  contact: ContactDetails
  specialRequests?: string
  gst?: GSTDetails
}

export interface RoomGuest {
  roomNumber: number
  adults: Guest[]
  children: Guest[]
}

export interface Guest {
  title: string
  firstName: string
  lastName: string
  age?: number
}

export interface ContactDetails {
  email: string
  phone: string
  countryCode: string
}

export interface GSTDetails {
  number: string
  companyName: string
  email: string
  phone: string
  address: string
}

export interface HotelBooking {
  id: string
  bookingReference: string
  hotelReference?: string
  status: HotelBookingStatus
  hotel: Hotel
  room: Room
  checkInDate: string
  checkOutDate: string
  guests: RoomGuest[]
  price: RoomPrice
  payment: PaymentInfo
  voucher?: string
  createdAt: string
  updatedAt: string
}

export type HotelBookingStatus = 
  | 'PENDING'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'CHECKED_OUT'
  | 'CANCELLED'
  | 'FAILED'

export interface PaymentInfo {
  id: string
  amount: number
  currency: string
  status: 'PENDING' | 'SUCCESS' | 'FAILED'
  method: string
  transactionId?: string
  timestamp: string
}
