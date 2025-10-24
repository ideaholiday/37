import { NextRequest, NextResponse } from 'next/server';
import TBOService from '@/lib/api/tbo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { city, cityId, checkIn, checkOut, rooms, adults, children } = body;

    // Validation
    if (!checkIn || !checkOut || (!city && !cityId)) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const searchParams = {
      city,
      cityId,
      checkIn,
      checkOut,
      rooms: rooms || 1,
      adults: adults || 2,
      children: children || 0,
    };

    const results = await TBOService.searchHotels(searchParams);

    return NextResponse.json(
      { success: true, data: results },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Hotel Search Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Hotel search failed' },
      { status: 500 }
    );
  }
}
