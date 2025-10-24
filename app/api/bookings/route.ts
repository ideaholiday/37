import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Booking from '@/models/Booking';
import { verifyToken, generateBookingRef } from '@/lib/utils/helpers';
import { BookingType, BookingStatus } from '@/types';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Get token from header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, passengerDetails, bookingDetails, amount, currency = 'INR', paymentMethod } = body;

    // Validation
    if (!type || !passengerDetails || !bookingDetails || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate booking reference
    const bookingRef = generateBookingRef();

    // Create booking
    const booking = await Booking.create({
      bookingRef,
      userId: decoded.userId,
      type,
      status: BookingStatus.PENDING,
      passengerDetails,
      bookingDetails,
      amount,
      currency,
      paymentMethod,
      createdBy: decoded.email,
    });

    return NextResponse.json(
      { success: true, data: booking, message: 'Booking created successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Booking Creation Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get token from header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');

    // Build query
    const query: any = { userId: decoded.userId };
    if (status) query.status = status;
    if (type) query.type = type;

    // Get bookings
    const bookings = await Booking.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: bookings },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get Bookings Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get bookings' },
      { status: 500 }
    );
  }
}
