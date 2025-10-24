# Quick Start Guide - Idea Holiday Platform

## ✅ Prerequisites Installed

All required software is installed and running:

- ✅ **Node.js**: v22.17.1
- ✅ **npm**: v11.5.2
- ✅ **Git**: v2.50.1
- ✅ **MongoDB**: v8.0.15 (Running as service)

## ✅ TBO API Credentials Configured

Production TBO credentials are configured:

```env
NEXT_PUBLIC_TBO_CLIENT_ID=tboprod
NEXT_PUBLIC_TBO_USERNAME=LKOM258
NEXT_PUBLIC_TBO_PASSWORD=New@api/LKO$582
TBO_ENDUSER_IP=157.245.100.148
```

## ✅ Project Setup Complete

- Branch: `copilot/build-travel-booking-platform`
- Dependencies: Installed (507 packages)
- Database: MongoDB running on localhost:27017
- Environment: Configured with TBO credentials

## 🚀 Start Development Server

```bash
cd /Users/jitendramaury/73/37
npm run dev
```

The application will be available at: **http://localhost:3000**

## 📁 Project Structure

```
37/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── tbo/                  # TBO API Endpoints
│   │   │   ├── flights/          # Flight search/booking
│   │   │   └── hotels/           # Hotel search/booking
│   │   ├── auth/                 # Authentication
│   │   ├── bookings/             # Booking management
│   │   └── payments/             # Payment gateways
│   ├── b2b/                      # B2B Portal (Agents/Admin)
│   ├── b2c/                      # B2C Portal (Customers)
│   └── auth/                     # Login/Register pages
├── lib/                          # Utilities & Services
│   ├── api/                      # API clients
│   │   ├── tbo.ts               # TBO Service (Updated!)
│   │   ├── razorpay.ts          # Razorpay Integration
│   │   └── easebuzz.ts          # Easebuzz Integration
│   ├── db/                       # Database
│   │   └── mongodb.ts           # MongoDB connection
│   └── utils/                    # Helper functions
├── models/                       # Mongoose Models
│   ├── User.ts                  # User model
│   └── Booking.ts               # Booking model
├── components/                   # React Components
│   └── shared/                  # Shared UI components
├── types/                        # TypeScript types
└── docs/                         # Documentation
    ├── TBO_INTEGRATION.md       # TBO API Guide (New!)
    └── SETUP.md                 # Setup instructions
```

## 🔧 Key Features Implemented

### Flight API Integration (TBO)
- ✅ Flight Search (one-way & round-trip)
- ✅ Fare Quote (price verification)
- ✅ Fare Rules (policies)
- ✅ Flight Booking
- ✅ Flight Ticketing
- ✅ Booking Details

### Hotel API Integration (TBO)
- ✅ Hotel Search
- ✅ PreBook (verification)
- ✅ Hotel Booking
- ✅ Booking Details
- ✅ Cancellation

### Payment Gateways
- ✅ Razorpay Integration
- ✅ Easebuzz Integration

### Portals
- ✅ B2C Portal (Customer bookings)
- ✅ B2B Portal (Agent/Admin dashboard)

## 🧪 Testing TBO API

### Test Flight Search

```bash
curl -X POST http://localhost:3000/api/tbo/flights \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "BOM",
    "destination": "LKO",
    "departureDate": "2025-12-15",
    "adults": 1,
    "tripType": "OneWay",
    "class": "Economy"
  }'
```

### Test Hotel Search

```bash
curl -X POST http://localhost:3000/api/tbo/hotels \
  -H "Content-Type: application/json" \
  -d '{
    "cityId": "DXB",
    "cityName": "Dubai",
    "checkIn": "2025-12-20",
    "checkOut": "2025-12-25",
    "adults": 2,
    "rooms": 1
  }'
```

## 📊 Database

MongoDB is running and ready:
- **Database**: `ideaholiday`
- **Connection**: `mongodb://localhost:27017/ideaholiday`
- **Status**: ✅ Connected

### Manage MongoDB

```bash
# Check service status
brew services list | grep mongodb

# Stop MongoDB
brew services stop mongodb/brew/mongodb-community@8.0

# Start MongoDB
brew services start mongodb/brew/mongodb-community@8.0

# Connect to database
mongosh ideaholiday

# View collections
mongosh ideaholiday --eval "show collections"
```

## 🔑 Environment Variables

All environment variables are configured in `.env`:

```bash
# View current configuration
cat .env

# Edit configuration
nano .env
```

### Key Variables:
- `DATABASE_URL` - MongoDB connection string
- `NEXT_PUBLIC_TBO_CLIENT_ID` - TBO client ID
- `NEXT_PUBLIC_TBO_USERNAME` - TBO username
- `NEXT_PUBLIC_TBO_PASSWORD` - TBO password
- `TBO_ENDUSER_IP` - End user IP for TBO
- `IH_MARKUP_FLIGHT_PCT` - Flight markup (3%)
- `IH_MARKUP_HOTEL_PCT` - Hotel markup (5%)

## 📖 Documentation

- **TBO Integration**: `/docs/TBO_INTEGRATION.md`
- **Setup Guide**: `/SETUP.md`
- **Project Summary**: `/PROJECT_SUMMARY.md`

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## 🌐 Access Points

Once server is running:

- **Homepage**: http://localhost:3000
- **B2C Portal**: http://localhost:3000/b2c
- **B2B Portal**: http://localhost:3000/b2b
- **Login**: http://localhost:3000/auth/login
- **Register**: http://localhost:3000/auth/register

## ⚠️ Important Notes

1. **MongoDB must be running** before starting the application
2. **TBO credentials are production credentials** - use responsibly
3. **API calls to TBO are real** - they may incur costs
4. **Token caching** - TBO tokens are cached for 25 minutes
5. **Markup applied** - 3% on flights, 5% on hotels

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Restart MongoDB
brew services restart mongodb/brew/mongodb-community@8.0
```

### Port 3000 Already in Use
```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>
```

### TBO API Errors
- Check credentials in `.env`
- Verify internet connection
- Check TBO API status
- Review console logs

## 📞 Support

- **TBO API**: support@travelboutiqueonline.com
- **GitHub Issues**: https://github.com/ideaholiday/37/issues

---

**Status**: ✅ Ready for Development
**Last Updated**: October 24, 2025
**Version**: 1.0.0
