'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, Calendar, TrendingUp, Plane, Hotel } from 'lucide-react';
import { Card } from '@/components/shared/UI';

export default function B2BDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role === 'CUSTOMER') {
      router.push('/b2c');
      return;
    }

    setUser(parsedUser);
    fetchStats(token);
  }, [router]);

  const fetchStats = async (token: string) => {
    try {
      const response = await fetch('/api/admin/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          const bookings = result.data.bookings;
          setStats({
            totalBookings: bookings.length,
            totalRevenue: result.data.stats.totalRevenue,
            pendingBookings: bookings.filter((b: any) => b.status === 'PENDING').length,
            confirmedBookings: bookings.filter((b: any) => b.status === 'CONFIRMED').length,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
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
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">B2B Dashboard</h1>
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalBookings}</p>
              </div>
              <Calendar className="h-10 w-10 text-blue-600" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ₹{stats.totalRevenue.toLocaleString('en-IN')}
                </p>
              </div>
              <TrendingUp className="h-10 w-10 text-green-600" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.pendingBookings}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-yellow-600 font-bold">{stats.pendingBookings}</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.confirmedBookings}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold">{stats.confirmedBookings}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/b2c">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <Plane className="h-10 w-10 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Book Flights</h3>
                    <p className="text-sm text-gray-600">Search and book flights</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/b2c/hotels">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <Hotel className="h-10 w-10 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Book Hotels</h3>
                    <p className="text-sm text-gray-600">Search and book hotels</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/b2b/bookings">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <Calendar className="h-10 w-10 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">View Bookings</h3>
                    <p className="text-sm text-gray-600">Manage all bookings</p>
                  </div>
                </div>
              </Card>
            </Link>

            {(user?.role === 'ADMIN' || user?.role === 'STAFF') && (
              <Link href="/b2b/users">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <Users className="h-10 w-10 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Manage Users</h3>
                      <p className="text-sm text-gray-600">View and manage users</p>
                    </div>
                  </div>
                </Card>
              </Link>
            )}
          </div>
        </div>

        {/* Role Badge */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Your Role</h3>
              <p className="text-gray-600 mt-1">{user?.role}</p>
            </div>
            <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium">
              {user?.role === 'ADMIN' && 'Administrator'}
              {user?.role === 'STAFF' && 'Staff Member'}
              {user?.role === 'AGENT' && 'Travel Agent'}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
