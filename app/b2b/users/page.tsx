'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Users, ArrowLeft, Filter } from 'lucide-react';
import { Card, Select, Button } from '@/components/shared/UI';

export default function B2BUsersPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    role: '',
    isActive: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'ADMIN' && parsedUser.role !== 'STAFF') {
      router.push('/b2b/dashboard');
      return;
    }

    setCurrentUser(parsedUser);
    fetchUsers(token);
  }, [router]);

  useEffect(() => {
    // Apply filters
    let filtered = [...users];

    if (filters.role) {
      filtered = filtered.filter((u) => u.role === filters.role);
    }

    if (filters.isActive !== '') {
      filtered = filtered.filter((u) => u.isActive.toString() === filters.isActive);
    }

    setFilteredUsers(filtered);
  }, [filters, users]);

  const fetchUsers = async (token: string) => {
    try {
      const response = await fetch('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setUsers(result.data);
          setFilteredUsers(result.data);
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error);
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
                <Users className="h-6 w-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, {currentUser?.name}</span>
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
              label="Role"
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              options={[
                { value: '', label: 'All Roles' },
                { value: 'ADMIN', label: 'Admin' },
                { value: 'STAFF', label: 'Staff' },
                { value: 'AGENT', label: 'Agent' },
                { value: 'CUSTOMER', label: 'Customer' },
              ]}
            />
            <Select
              label="Status"
              value={filters.isActive}
              onChange={(e) => setFilters({ ...filters, isActive: e.target.value })}
              options={[
                { value: '', label: 'All Statuses' },
                { value: 'true', label: 'Active' },
                { value: 'false', label: 'Inactive' },
              ]}
            />
            <div className="flex items-end">
              <Button
                variant="secondary"
                onClick={() => setFilters({ role: '', isActive: '' })}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <div className="text-sm text-gray-600">Total Users</div>
            <div className="text-2xl font-bold text-gray-900">{users.length}</div>
          </Card>
          <Card>
            <div className="text-sm text-gray-600">Customers</div>
            <div className="text-2xl font-bold text-blue-600">
              {users.filter((u) => u.role === 'CUSTOMER').length}
            </div>
          </Card>
          <Card>
            <div className="text-sm text-gray-600">Agents</div>
            <div className="text-2xl font-bold text-green-600">
              {users.filter((u) => u.role === 'AGENT').length}
            </div>
          </Card>
          <Card>
            <div className="text-sm text-gray-600">Staff/Admin</div>
            <div className="text-2xl font-bold text-purple-600">
              {users.filter((u) => u.role === 'ADMIN' || u.role === 'STAFF').length}
            </div>
          </Card>
        </div>

        {/* Users List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            Users ({filteredUsers.length})
          </h2>
          {filteredUsers.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-600">Try adjusting your filters</p>
              </div>
            </Card>
          ) : (
            filteredUsers.map((user: any) => (
              <Card key={user._id}>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Name</div>
                    <div className="font-semibold">{user.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="text-sm">{user.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Role</div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                          user.role === 'ADMIN'
                            ? 'bg-purple-100 text-purple-800'
                            : user.role === 'STAFF'
                            ? 'bg-blue-100 text-blue-800'
                            : user.role === 'AGENT'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Status</div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                          user.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Registered</div>
                    <div className="text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  {user.phone && (
                    <div>
                      <div className="text-sm text-gray-600">Phone</div>
                      <div className="text-sm">{user.phone}</div>
                    </div>
                  )}
                  {user.company && (
                    <div>
                      <div className="text-sm text-gray-600">Company</div>
                      <div className="text-sm">{user.company}</div>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
