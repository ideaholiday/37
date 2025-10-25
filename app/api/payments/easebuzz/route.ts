import { NextRequest, NextResponse } from 'next/server';
import EasebuzzService from '@/lib/api/easebuzz';
import connectDB from '@/lib/db/mongodb';
import Booking from '@/models/Booking';
import { BookingStatus } from '@/types';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { bookingRef, amount, productinfo, firstname, email, phone, surl, furl } = body;

    // Validation
    if (!bookingRef || !amount || !email || !phone || !firstname) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initiate Easebuzz payment
    const payment = await EasebuzzService.initiatePayment({
      txnid: bookingRef,
      amount,
      productinfo: productinfo || 'Booking',
      firstname,
      email,
      phone,
      surl: surl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
      furl: furl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/failure`,
    });

    if (!payment.success) {
      return NextResponse.json(
        { success: false, error: payment.error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: payment },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Easebuzz Payment Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to initiate payment' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const responseData = body;

    // Verify payment
    const isValid = EasebuzzService.verifyPayment(responseData);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Payment verification failed' },
        { status: 400 }
      );
    }

    // Update booking
    const booking = await Booking.findOneAndUpdate(
      { bookingRef: responseData.txnid },
      {
        status: BookingStatus.CONFIRMED,
        paymentId: responseData.easepayid,
        paymentMethod: 'easebuzz',
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
    console.error('Easebuzz Verify Error:', error);
    return NextResponse.json(
      { success: false, error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
