'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card } from '@/components/shared/UI';

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    fetchBookings(token);
  }, [router]);

  const fetchBookings = async (token: string) => {
    try {
      const response = await fetch('/api/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setBookings(result.data);
        }
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'CANCELLED':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'PENDING':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="h-8 w-8 text-blue-600" />
            My Bookings
          </h1>
          <p className="text-gray-600 mt-2">
            View and manage your travel bookings
          </p>
        </div>

        {bookings.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600">Start planning your next trip!</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking: any) => (
              <Card key={booking._id}>
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-lg">
                        {booking.type === 'FLIGHT' ? '✈️ Flight' : '🏨 Hotel'} Booking
                      </span>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(booking.status)}
                        <span className={`text-sm px-2 py-1 rounded ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-gray-600 mb-2">
                      <strong>Booking Ref:</strong> {booking.bookingRef}
                    </div>
                    
                    <div className="text-gray-600 mb-2">
                      <strong>Date:</strong> {new Date(booking.createdAt).toLocaleDateString()}
                    </div>

                    {booking.passengerDetails && (
                      <div className="text-gray-600 mb-2">
                        <strong>Passengers:</strong> {booking.passengerDetails.length || 1}
                      </div>
                    )}

                    {booking.paymentMethod && (
                      <div className="text-gray-600">
                        <strong>Payment:</strong> {booking.paymentMethod.toUpperCase()}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      ₹{booking.amount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-sm text-gray-500">{booking.currency}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
