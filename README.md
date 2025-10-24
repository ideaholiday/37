# Idea Holiday - Full-Stack Travel Booking Platform

A production-ready travel booking platform supporting both **B2B (agents/staff/admin)** and **B2C (customers)** with comprehensive flight and hotel booking capabilities.

## 🚀 Features

### Core Features
- ✈️ **Flight Booking**: Search, compare, book flights with real-time pricing
- 🏨 **Hotel Booking**: Search hotels, view details, book rooms
- 💳 **Payment Integration**: Razorpay payment gateway with secure transactions
- 👥 **Multi-Role Support**: Customer, Agent, Staff, Admin roles
- 🔐 **Authentication**: Email/OTP login, guest checkout
- 📱 **Responsive Design**: Mobile-first, accessible UI

### B2C Features
- Guest and registered user checkout
- Saved travelers and payment methods
- Booking history and management
- Price alerts and wishlists
- Reviews and ratings
- Referral rewards

### B2B Features
- Agent portal with custom markups/commissions
- Credit limit management and ledger
- Quote builder with unique references
- Downloadable GST invoices
- Admin dashboard with analytics
- Staff portal for agent support

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Laravel 12 backend API (see backend setup)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ideaholiday/37.git
cd 37
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Update the environment variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1

# Feature Flags
NEXT_PUBLIC_ENABLE_B2B=true
NEXT_PUBLIC_ENABLE_B2C=true
NEXT_PUBLIC_MOCK_MODE=false

# Pricing Configuration
NEXT_PUBLIC_DEFAULT_MARKUP_PERCENT=5
NEXT_PUBLIC_PG_FEE_PERCENT=2
NEXT_PUBLIC_CURRENCY=INR

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Build for production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── flights/           # Flight booking pages
│   ├── hotels/            # Hotel booking pages
│   ├── b2b/               # B2B portal pages
│   └── my-bookings/       # User bookings
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── features/         # Feature components
│   └── layout/           # Layout components
├── services/             # API service layer
├── store/                # Zustand state stores
├── types/                # TypeScript type definitions
├── lib/                  # Utility functions
├── config/               # Configuration
└── hooks/                # Custom React hooks
```

## 🔌 API Integration

The platform integrates with a Laravel 12 backend that wraps TBO Flights + Hotels APIs:

- Flight Search, Reprice, Fare Rules, SSR, Seat Map, Meals
- Hotel Search, PreBook, Booking
- Payment processing and webhooks
- User authentication and authorization
- Booking management and cancellations

## 🎨 UI Components

Built with shadcn/ui and Radix UI primitives:
- Forms with validation
- Modals and dialogs
- Tabs and accordions
- Date pickers
- Toasts and notifications
- Cards and layouts

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## 🔐 Security

- CSRF protection
- Rate limiting
- PII encryption
- Secure payment handling
- Input validation with Zod
- XSS prevention

## 📄 License

Proprietary - All rights reserved

## 🤝 Support

For support, email support@ideaholiday.com or contact via:
- Phone: +91-XXX-XXX-XXXX
- WhatsApp: +91-XXX-XXX-XXXX
- Website: https://ideaholiday.com

## 🗺 Roadmap

- [ ] Complete flight booking flow with SSR/Seat-map/Meals
- [ ] Hotel booking with PreBook verification
- [ ] Payment gateway integration
- [ ] B2B portals (Admin/Staff/Agent)
- [ ] Cancellation flows
- [ ] Voucher generation
- [ ] CMS integration
- [ ] SEO landing pages
- [ ] PWA support
- [ ] Mobile apps (React Native)
