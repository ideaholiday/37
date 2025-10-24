import Link from 'next/link';
import { Plane, Hotel, Shield, CreditCard, Users, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to Idea Holiday
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your Complete Travel Booking Platform for B2B & B2C
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/b2c"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Book Your Trip
              </Link>
              <Link
                href="/b2b"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors border-2 border-white"
              >
                B2B Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <Plane className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">Flight Booking</h3>
              <p className="text-gray-600">
                Book domestic and international flights with the best deals using TBO API integration.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <Hotel className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">Hotel Booking</h3>
              <p className="text-gray-600">
                Find and book hotels worldwide with competitive rates and instant confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Secure Payments</h3>
              <p className="text-gray-600">
                Multiple payment gateways: Razorpay & Easebuzz
              </p>
            </div>
            <div className="text-center">
              <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Best Prices</h3>
              <p className="text-gray-600">
                Competitive rates with exclusive deals
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">B2B Support</h3>
              <p className="text-gray-600">
                Dedicated portal for agents and staff
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock customer assistance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of travelers who trust Idea Holiday
          </p>
          <Link
            href="/auth/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            Register Now
          </Link>
        </div>
      </section>
    </div>
  );
}
