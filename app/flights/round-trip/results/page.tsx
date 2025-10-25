import InboundFlightSelector from '@/components/flights/InboundFlightSelector';
import type { FlightSegment } from '@/types/flight';

// This is a Server Component by default
async function fetchRoundTripSegments(): Promise<{ outbound: FlightSegment[]; inbound: FlightSegment[] }> {
  // In production, call your API or TBO service here and split results into outbound/inbound.
  // For now, return mock data that respects pairing rules (origin/destination swapped and inbound after outbound).
  const now = new Date();
  const addMins = (mins: number) => new Date(now.getTime() + mins * 60000).toISOString();
  const addHours = (h: number) => new Date(now.getTime() + h * 3600000).toISOString();

  const outbound: FlightSegment[] = [
    {
      id: 'O1',
      airlineCode: 'AI',
      airlineName: 'Air India',
      origin: 'JFK',
      destination: 'LHR',
      departureTime: addHours(24), // +24h
      arrivalTime: addHours(31),
      durationMinutes: 420,
      stops: 0,
      price: 450,
      cabinClass: 'Economy',
    },
    {
      id: 'O2',
      airlineCode: 'BA',
      airlineName: 'British Airways',
      origin: 'JFK',
      destination: 'LHR',
      departureTime: addHours(26),
      arrivalTime: addHours(34),
      durationMinutes: 480,
      stops: 1,
      price: 410,
      cabinClass: 'Economy',
    },
  ];

  const inbound: FlightSegment[] = [
    {
      id: 'I1',
      airlineCode: 'AI',
      airlineName: 'Air India',
      origin: 'LHR',
      destination: 'JFK',
      departureTime: addHours(48), // after O1 arrival
      arrivalTime: addHours(55),
      durationMinutes: 420,
      stops: 0,
      price: 470,
      cabinClass: 'Economy',
    },
    {
      id: 'I2',
      airlineCode: 'BA',
      airlineName: 'British Airways',
      origin: 'LHR',
      destination: 'JFK',
      departureTime: addHours(50),
      arrivalTime: addHours(58),
      durationMinutes: 480,
      stops: 1,
      price: 390,
      cabinClass: 'Economy',
    },
  ];

  return { outbound, inbound };
}

export default async function Page() {
  const { outbound, inbound } = await fetchRoundTripSegments();

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Round-Trip Results</h1>
      <InboundFlightSelector outboundOptions={outbound} inboundOptions={inbound} currency="USD" />
    </main>
  );
}
