export type AirportCode = string; // IATA code like 'JFK', 'LHR'

export interface FlightSegment {
  id: string;
  airlineCode: string;
  airlineName: string;
  airlineLogoUrl?: string;
  origin: AirportCode;
  destination: AirportCode;
  departureTime: string; // ISO datetime
  arrivalTime: string; // ISO datetime
  durationMinutes: number;
  stops: number; // 0 for non-stop
  price: number; // price for this segment in selected currency
  cabinClass?: 'Economy' | 'PremiumEconomy' | 'Business' | 'First';
}

export interface RoundTripItinerary {
  outbound: FlightSegment;
  inbound: FlightSegment;
  totalPrice: number;
}

export interface CurrencyAmount {
  amount: number;
  currency: string; // e.g., 'USD', 'INR'
}

export function formatTimeRange(departureISO: string, arrivalISO: string): { dep: string; arr: string } {
  const dep = new Date(departureISO);
  const arr = new Date(arrivalISO);
  const pad = (n: number) => n.toString().padStart(2, '0');
  const depStr = `${pad(dep.getHours())}:${pad(dep.getMinutes())}`;
  const arrStr = `${pad(arr.getHours())}:${pad(arr.getMinutes())}`;
  return { dep: depStr, arr: arrStr };
}

export function formatDuration(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}m`;
}

export function canPair(outbound: FlightSegment, inbound: FlightSegment) {
  // Basic compatibility: inbound origin must be outbound destination and vice versa,
  // and inbound must depart after outbound arrives.
  const locOkay = outbound.destination === inbound.origin && outbound.origin === inbound.destination;
  const timeOkay = new Date(inbound.departureTime).getTime() > new Date(outbound.arrivalTime).getTime();
  return locOkay && timeOkay;
}
