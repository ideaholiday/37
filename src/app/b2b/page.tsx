'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Plane, Building2, TrendingUp, DollarSign, Settings } from 'lucide-react'
import Link from 'next/link'

export default function B2BPortalPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/50">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">B2B Portal</h1>
            <p className="text-muted-foreground">
              Access agent tools, admin dashboards, and staff management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Admin Portal */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-6 w-6 text-primary" />
                  Admin Portal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage users, agents, system settings, reports, and analytics
                </p>
                <ul className="text-sm space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Sales & Analytics Dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    User & Agent Management
                  </li>
                  <li className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Commission & Markup Control
                  </li>
                </ul>
                <Link href="/b2b/admin">
                  <Button className="w-full">Access Admin Portal</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Agent Portal */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-6 w-6 text-primary" />
                  Agent Portal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Create quotes, manage bookings, track commissions, and view ledger
                </p>
                <ul className="text-sm space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    Quote Builder
                  </li>
                  <li className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Commission Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Customer Management
                  </li>
                </ul>
                <Link href="/b2b/agent">
                  <Button className="w-full">Access Agent Portal</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Staff Portal */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Staff Portal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Support agents, manage tasks, handle PNR modifications
                </p>
                <ul className="text-sm space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Agent Support
                  </li>
                  <li className="flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    PNR Management
                  </li>
                  <li className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Refund Processing
                  </li>
                </ul>
                <Link href="/b2b/staff">
                  <Button className="w-full">Access Staff Portal</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">Total Bookings</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">₹12.5L</div>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">Active Agents</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">98%</div>
                <p className="text-xs text-muted-foreground">Success Rate</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
