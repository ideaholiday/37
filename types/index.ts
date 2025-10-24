// User Types
export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  AGENT = 'AGENT',
  CUSTOMER = 'CUSTOMER'
}

export interface User {
  _id?: string;
  email: string;
  password?: string;
  name: string;
  role: UserRole;
  phone?: string;
  company?: string;
  agentId?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Booking Types
export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED'
}

export enum BookingType {
  FLIGHT = 'FLIGHT',
  HOTEL = 'HOTEL'
}

export interface Booking {
  _id?: string;
  bookingRef: string;
  userId: string;
  type: BookingType;
  status: BookingStatus;
  passengerDetails: any;
  bookingDetails: any;
  amount: number;
  currency: string;
  paymentId?: string;
  paymentMethod?: string;
  tboReference?: string;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Flight Types
export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  class: 'Economy' | 'Business' | 'First';
  tripType: 'OneWay' | 'Return' | 'MultiCity';
}

export interface FlightSegment {
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  cabin: string;
}

export interface Flight {
  id: string;
  segments: FlightSegment[];
  price: number;
  currency: string;
  availableSeats: number;
  fareType: string;
  baggage: string;
}

// Hotel Types
export interface HotelSearchParams {
  city: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  children?: number;
}

export interface Hotel {
  id: string;
  name: string;
  address: string;
  city: string;
  rating: number;
  price: number;
  currency: string;
  amenities: string[];
  images: string[];
  description: string;
}

// Payment Types
export interface PaymentRequest {
  amount: number;
  currency: string;
  bookingRef: string;
  customerEmail: string;
  customerPhone: string;
  gateway: 'razorpay' | 'easebuzz';
}

export interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  error?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// TBO API Types
export interface TBOAuthResponse {
  Status: number;
  TokenId: string;
  Error?: {
    ErrorCode: number;
    ErrorMessage: string;
  };
}

export interface TBOFlightSearchRequest {
  EndUserIp: string;
  TokenId: string;
  AdultCount: number;
  ChildCount: number;
  InfantCount: number;
  DirectFlight: boolean;
  OneStopFlight: boolean;
  JourneyType: number; // 1: OneWay, 2: Return
  PreferredAirlines: string;
  Segments: Array<{
    Origin: string;
    Destination: string;
    FlightCabinClass: number; // 1: All, 2: Economy, 3: Business, 4: First
    PreferredDepartureTime: string;
    PreferredArrivalTime: string;
  }>;
  Sources: string;
}
