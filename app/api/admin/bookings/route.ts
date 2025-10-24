import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Booking from '@/models/Booking';
import { verifyToken } from '@/lib/utils/helpers';
import { UserRole } from '@/types';

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
    if (!decoded || (decoded.role !== UserRole.ADMIN && decoded.role !== UserRole.STAFF && decoded.role !== UserRole.AGENT)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const userId = searchParams.get('userId');

    // Build query
    const query: any = {};
    if (status) query.status = status;
    if (type) query.type = type;
    if (userId) query.userId = userId;

    // Get bookings
    const bookings = await Booking.find(query).sort({ createdAt: -1 });

    // Calculate stats
    const totalBookings = bookings.length;
    const totalRevenue = bookings
      .filter((b) => b.status === 'CONFIRMED')
      .reduce((sum, b) => sum + b.amount, 0);

    return NextResponse.json(
      {
        success: true,
        data: {
          bookings,
          stats: {
            totalBookings,
            totalRevenue,
          },
        },
      },
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
