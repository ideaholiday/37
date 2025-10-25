import { NextRequest, NextResponse } from 'next/server';
import RazorpayService from '@/lib/api/razorpay';
import connectDB from '@/lib/db/mongodb';
import Booking from '@/models/Booking';
import { BookingStatus } from '@/types';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { bookingRef, amount, currency = 'INR' } = body;

    // Validation
    if (!bookingRef || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create Razorpay order
    const order = await RazorpayService.createOrder(amount, currency, bookingRef);

    if (!order.success) {
      return NextResponse.json(
        { success: false, error: order.error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: order },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Razorpay Order Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { orderId, paymentId, signature, bookingRef } = body;

    // Validation
    if (!orderId || !paymentId || !signature || !bookingRef) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify payment
    const isValid = RazorpayService.verifyPayment(orderId, paymentId, signature);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Payment verification failed' },
        { status: 400 }
      );
    }

    // Update booking
    const booking = await Booking.findOneAndUpdate(
      { bookingRef },
      {
        status: BookingStatus.CONFIRMED,
        paymentId,
        paymentMethod: 'razorpay',
      },
      { new: true }
    );

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: booking, message: 'Payment verified successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Razorpay Verify Error:', error);
    return NextResponse.json(
      { success: false, error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
