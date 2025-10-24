'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Filter, ArrowLeft } from 'lucide-react';
import { Card, Select, Button } from '@/components/shared/UI';

export default function B2BBookingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    type: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role === 'CUSTOMER') {
      router.push('/b2c/bookings');
      return;
    }

    setUser(parsedUser);
    fetchBookings(token);
  }, [router]);

  useEffect(() => {
    // Apply filters
    let filtered = [...bookings];

    if (filters.status) {
      filtered = filtered.filter((b) => b.status === filters.status);
    }

    if (filters.type) {
      filtered = filtered.filter((b) => b.type === filters.type);
    }

    setFilteredBookings(filtered);
  }, [filters, bookings]);

  const fetchBookings = async (token: string) => {
    try {
      const response = await fetch('/api/admin/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setBookings(result.data.bookings);
          setFilteredBookings(result.data.bookings);
        }
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
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
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/b2b/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Manage Bookings</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Status"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              options={[
                { value: '', label: 'All Statuses' },
                { value: 'PENDING', label: 'Pending' },
                { value: 'CONFIRMED', label: 'Confirmed' },
                { value: 'CANCELLED', label: 'Cancelled' },
                { value: 'FAILED', label: 'Failed' },
              ]}
            />
            <Select
              label="Type"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              options={[
                { value: '', label: 'All Types' },
                { value: 'FLIGHT', label: 'Flights' },
                { value: 'HOTEL', label: 'Hotels' },
              ]}
            />
            <div className="flex items-end">
              <Button
                variant="secondary"
                onClick={() => setFilters({ status: '', type: '' })}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <div className="text-sm text-gray-600">Total Bookings</div>
            <div className="text-2xl font-bold text-gray-900">{bookings.length}</div>
          </Card>
          <Card>
            <div className="text-sm text-gray-600">Confirmed</div>
            <div className="text-2xl font-bold text-green-600">
              {bookings.filter((b) => b.status === 'CONFIRMED').length}
            </div>
          </Card>
          <Card>
            <div className="text-sm text-gray-600">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">
              {bookings.filter((b) => b.status === 'PENDING').length}
            </div>
          </Card>
          <Card>
            <div className="text-sm text-gray-600">Total Revenue</div>
            <div className="text-2xl font-bold text-blue-600">
              ₹{bookings
                .filter((b) => b.status === 'CONFIRMED')
                .reduce((sum, b) => sum + b.amount, 0)
                .toLocaleString('en-IN')}
            </div>
          </Card>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            Bookings ({filteredBookings.length})
          </h2>
          {filteredBookings.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-600">Try adjusting your filters</p>
              </div>
            </Card>
          ) : (
            filteredBookings.map((booking: any) => (
              <Card key={booking._id}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Booking Ref</div>
                    <div className="font-semibold">{booking.bookingRef}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Type</div>
                    <div className="font-semibold">
                      {booking.type === 'FLIGHT' ? '✈️ Flight' : '🏨 Hotel'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Status</div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                          booking.status === 'CONFIRMED'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : booking.status === 'CANCELLED'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Amount</div>
                    <div className="text-xl font-bold text-blue-600">
                      ₹{booking.amount.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Created</div>
                    <div className="text-sm">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Payment Method</div>
                    <div className="text-sm">
                      {booking.paymentMethod?.toUpperCase() || 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">User ID</div>
                    <div className="text-sm font-mono">{booking.userId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Created By</div>
                    <div className="text-sm">{booking.createdBy || 'N/A'}</div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
