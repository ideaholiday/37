import { NextRequest, NextResponse } from 'next/server';
import TBOService from '@/lib/api/tbo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { origin, destination, departureDate, returnDate, adults, children, infants, class: cabinClass, tripType } = body;

    // Validation
    if (!origin || !destination || !departureDate || !adults) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const searchParams = {
      origin,
      destination,
      departureDate,
      returnDate,
      adults,
      children: children || 0,
      infants: infants || 0,
      class: cabinClass || 'Economy',
      tripType: tripType || 'OneWay',
    };

    const results = await TBOService.searchFlights(searchParams);

    return NextResponse.json(
      { success: true, data: results },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Flight Search Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Flight search failed' },
      { status: 500 }
    );
  }
}
