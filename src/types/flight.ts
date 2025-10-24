// Common Types
export type TripType = 'ONE_WAY' | 'ROUND_TRIP' | 'MULTI_CITY'
export type CabinClass = 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST'
export type PassengerType = 'ADULT' | 'CHILD' | 'INFANT'

// Search Types
export interface AirportCity {
  code: string
  name: string
  cityCode: string
  cityName: string
  countryCode: string
  countryName: string
}

export interface FlightSearchParams {
  tripType: TripType
  segments: FlightSegment[]
  adults: number
  children: number
  infants: number
  cabinClass: CabinClass
  directOnly?: boolean
  flexibleDates?: boolean
}

export interface FlightSegment {
  origin: string
  destination: string
  departDate: string
  returnDate?: string
}

// Flight Types
export interface Flight {
  id: string
  segments: FlightLeg[]
  fareBreakup: FareBreakup
  refundable: boolean
  baggage: BaggageInfo
  fareRules?: FareRule[]
  traceId: string
}

export interface FlightLeg {
  origin: string
  destination: string
  departure: string
  arrival: string
  airline: Airline
  flightNumber: string
  aircraft: string
  duration: number
  stops: number
  layovers?: Layover[]
  terminal?: {
    departure?: string
    arrival?: string
  }
}

export interface Airline {
  code: string
  name: string
  logo?: string
}

export interface Layover {
  airport: string
  duration: number
}

export interface BaggageInfo {
  checkIn: string
  cabin: string
}

export interface FareBreakup {
  base: number
  taxes: TaxBreakup[]
  fees: number
  pgCharge: number
  markup: number
  discount: number
  total: number
  currency: string
}

export interface TaxBreakup {
  code: string
  amount: number
}

export interface FareRule {
  category: 'CANCELLATION' | 'CHANGE' | 'NO_SHOW'
  details: string
  penalty?: number
}

// Booking Types
export interface Passenger {
  type: PassengerType
  title: string
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: 'M' | 'F' | 'O'
  email?: string
  phone?: string
  passport?: PassportDetails
  frequentFlyerNumber?: string
}

export interface PassportDetails {
  number: string
  issueDate: string
  expiryDate: string
  nationality: string
  issuingCountry: string
}

export interface GSTDetails {
  number: string
  companyName: string
  email: string
  phone: string
  address: string
}

export interface BookingRequest {
  flightId: string
  passengers: Passenger[]
  contact: ContactDetails
  gst?: GSTDetails
  ancillaries?: Ancillaries
}

export interface ContactDetails {
  email: string
  phone: string
  countryCode: string
}

export interface Ancillaries {
  seats?: SeatSelection[]
  meals?: MealSelection[]
  baggage?: BaggageSelection[]
}

export interface SeatSelection {
  segmentId: string
  passengerId: string
  seatNumber: string
  price: number
}

export interface MealSelection {
  segmentId: string
  passengerId: string
  mealCode: string
  description: string
  price: number
}

export interface BaggageSelection {
  segmentId: string
  passengerId: string
  weight: number
  price: number
}

export interface Booking {
  id: string
  bookingReference: string
  pnr?: string
  ticketNumber?: string
  status: BookingStatus
  flight: Flight
  passengers: Passenger[]
  fareBreakup: FareBreakup
  payment: PaymentInfo
  createdAt: string
  updatedAt: string
}

export type BookingStatus = 
  | 'PENDING'
  | 'CONFIRMED'
  | 'TICKETED'
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

// Seat Map Types
export interface SeatMap {
  segmentId: string
  cabin: CabinLayout[]
}

export interface CabinLayout {
  type: CabinClass
  rows: SeatRow[]
}

export interface SeatRow {
  number: number
  seats: Seat[]
}

export interface Seat {
  number: string
  available: boolean
  type: SeatType
  price: number
  position: 'WINDOW' | 'MIDDLE' | 'AISLE'
}

export type SeatType = 
  | 'STANDARD'
  | 'EXTRA_LEGROOM'
  | 'PREFERRED'
  | 'PREMIUM'
  | 'EXIT_ROW'

// Meal Types
export interface Meal {
  code: string
  description: string
  type: 'VEG' | 'NON_VEG' | 'VEGAN' | 'SPECIAL'
  price: number
  available: boolean
}

// Hotel Types will be added in next iteration
