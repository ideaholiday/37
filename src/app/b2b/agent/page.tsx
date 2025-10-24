'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, DollarSign, Users, Plane, Download } from 'lucide-react'

export default function AgentDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/50">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Agent Portal</h1>
            <p className="text-muted-foreground">
              Manage your bookings, customers, and commissions
            </p>
          </div>

          {/* Agent Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Available Credit</p>
                    <p className="text-2xl font-bold">₹2.5L</p>
                    <p className="text-xs text-muted-foreground">of ₹5L limit</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold">145</p>
                    <p className="text-xs text-muted-foreground">bookings</p>
                  </div>
                  <Plane className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Commission Earned</p>
                    <p className="text-2xl font-bold">₹45.2K</p>
                    <p className="text-xs text-green-600">+12% vs last month</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                    <p className="text-2xl font-bold">87</p>
                    <p className="text-xs text-muted-foreground">active</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Quote Builder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Create custom quotes for your customers with reference IH####
                </p>
                <Button className="w-full">Create New Quote</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  My Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  View and manage all your bookings
                </p>
                <Button variant="outline" className="w-full">View All Bookings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Customer Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage your customer database
                </p>
                <Button variant="outline" className="w-full">View Customers</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Reports & Invoices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Download GST invoices and commission reports
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    GST Invoices
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Commission Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">IH12345678</p>
                    <p className="text-sm text-muted-foreground">DEL → BOM • 2 Adults</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹8,450</p>
                    <p className="text-xs text-green-600">Confirmed</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">IH12345677</p>
                    <p className="text-sm text-muted-foreground">BOM → GOI • 1 Adult, 1 Child</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹6,200</p>
                    <p className="text-xs text-green-600">Confirmed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
