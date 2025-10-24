'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Users, DollarSign, Plane, BarChart, Settings } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/50">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your platform, users, and view analytics
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">₹45.2L</p>
                    <p className="text-xs text-green-600">+12.5% from last month</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                    <p className="text-2xl font-bold">2,456</p>
                    <p className="text-xs text-green-600">+8.2% from last month</p>
                  </div>
                  <Plane className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Agents</p>
                    <p className="text-2xl font-bold">127</p>
                    <p className="text-xs text-green-600">+15 new this month</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                    <p className="text-2xl font-bold">97.8%</p>
                    <p className="text-xs text-green-600">+0.5% improvement</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Management Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Agent Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage agent accounts, credit limits, and commissions
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    View All Agents
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Add New Agent
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Commission Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Reports & Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  View detailed reports and analytics
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Sales Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Agent Performance
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Revenue Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  System Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure platform settings and preferences
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Markup Configuration
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Payment Gateway
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Email Templates
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage payments, refunds, and reconciliation
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Payment Reconciliation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Refund Management
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    GST Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
