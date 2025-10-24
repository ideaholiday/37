# Idea Holiday - B2B + B2C Travel Booking Platform

A comprehensive Next.js travel booking platform supporting both B2B (agents/staff/admin) and B2C (customers) operations with TBO API integration and multiple payment gateways.

## 🚀 Features

### Core Features
- ✈️ **Flight Booking** - Search and book domestic/international flights using TBO API
- 🏨 **Hotel Booking** - Find and reserve hotels worldwide
- 💳 **Multiple Payment Gateways** - Razorpay and Easebuzz integration
- 👥 **Multi-Role Support** - Admin, Staff, Agent, and Customer roles
- 🔐 **Secure Authentication** - JWT-based authentication system
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

### B2C Features (Customer Portal)
- Flight and hotel search
- Real-time availability
- Booking management
- Payment processing
- Booking history

### B2B Features (Admin/Agent/Staff Portal)
- Centralized dashboard with analytics
- Manage all bookings
- User management (Admin/Staff)
- Revenue tracking
- Role-based access control

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Styling:** Tailwind CSS
- **Authentication:** JWT
- **Payment Gateways:** Razorpay, Easebuzz
- **Travel API:** TBO (Tektravels)
- **Icons:** Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB database
- TBO API credentials
- Razorpay account
- Easebuzz account

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd 37
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mongodb://localhost:27017/ideaholiday"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# TBO API Configuration
TBO_API_URL="https://api.tektravels.com"
TBO_API_USERNAME="your-tbo-username"
TBO_API_PASSWORD="your-tbo-password"
TBO_API_TOKEN="your-tbo-token"

# Razorpay Configuration
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"

# Easebuzz Configuration
EASEBUZZ_MERCHANT_KEY="your-easebuzz-merchant-key"
EASEBUZZ_SALT="your-easebuzz-salt"
EASEBUZZ_ENV="test"

# Application Settings
NEXT_PUBLIC_APP_NAME="Idea Holiday"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production
```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── bookings/       # Booking management
│   │   ├── payments/       # Payment gateway integration
│   │   ├── tbo/            # TBO API integration
│   │   └── admin/          # Admin endpoints
│   ├── auth/               # Auth pages (login/register)
│   ├── b2c/                # Customer portal pages
│   ├── b2b/                # B2B portal pages
│   └── page.tsx            # Home page
├── components/              # React components
│   ├── shared/             # Shared components
│   ├── b2c/                # B2C components
│   └── b2b/                # B2B components
├── lib/                     # Utility libraries
│   ├── api/                # API integrations (TBO, payment gateways)
│   ├── db/                 # Database connection
│   └── utils/              # Helper functions
├── models/                  # Mongoose models
├── types/                   # TypeScript type definitions
└── .env.example            # Environment variables template
```

## 🔑 User Roles

1. **CUSTOMER** - B2C users who can book flights and hotels
2. **AGENT** - Travel agents who can make bookings for customers
3. **STAFF** - Staff members with access to B2B dashboard
4. **ADMIN** - Full access to all features and user management

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking

### TBO API
- `POST /api/tbo/flights` - Search flights
- `POST /api/tbo/hotels` - Search hotels

### Payment Gateways
- `POST /api/payments/razorpay` - Create Razorpay order
- `PUT /api/payments/razorpay` - Verify Razorpay payment
- `POST /api/payments/easebuzz` - Initiate Easebuzz payment
- `PUT /api/payments/easebuzz` - Verify Easebuzz payment

### Admin (Protected)
- `GET /api/admin/users` - Get all users (Admin/Staff only)
- `GET /api/admin/bookings` - Get all bookings with stats (Admin/Staff/Agent)

## 💳 Payment Integration

### Razorpay
- Create order before payment
- Verify payment signature after completion
- Support for refunds

### Easebuzz
- Generate payment hash
- Initiate payment with redirect
- Verify payment response
- Support for refunds

## 🌐 TBO API Integration

The platform integrates with TBO (Tektravels) API for:
- Flight search and booking
- Hotel search and booking
- Real-time availability
- Fare management

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Payment signature verification
- Input validation
- Secure API endpoints

## 📱 Pages

### Public Pages
- `/` - Home page
- `/auth/login` - Login page
- `/auth/register` - Registration page

### B2C Pages (Customer)
- `/b2c` - Flight search
- `/b2c/hotels` - Hotel search
- `/b2c/bookings` - Booking history

### B2B Pages (Admin/Agent/Staff)
- `/b2b/dashboard` - Analytics dashboard
- `/b2b/bookings` - Booking management
- `/b2b/users` - User management (Admin/Staff)

## 🎨 UI Components

Reusable components in `components/shared/UI.tsx`:
- Button
- Input
- Select
- Card

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t ideaholiday .
docker run -p 3000:3000 ideaholiday
```

### Manual Deployment
1. Build the application: `npm run build`
2. Start the server: `npm start`
3. Configure reverse proxy (nginx/apache)
4. Set up SSL certificate

## 🔧 Development

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

## 📝 License

This project is proprietary software. All rights reserved.

## 🤝 Support

For support, email support@ideaholiday.com

## 🎯 Future Enhancements

- [ ] Train booking integration
- [ ] Bus booking integration
- [ ] Multi-language support
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Advanced analytics
- [ ] Commission management for agents
- [ ] White-label customization
- [ ] Mobile app (React Native)
- [ ] Invoice generation
- [ ] Advanced reporting

## 👥 Credits

Built with ❤️ by the Idea Holiday team
