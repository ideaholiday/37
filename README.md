# Flight & Hotel Booking System

A modern, full-stack B2C flight and hotel booking platform with beautiful UI/UX, comprehensive booking flow, and seamless user experience.

## Features

### Flight Booking
- ✈️ **Comprehensive Search**: One-way, round-trip, and multi-city options
- 🎫 **Detailed Results**: Flight information with filters and sorting
- 🍽️ **Meal Selection**: Pre-book meals with various options
- 💺 **Live Seat Selection**: Interactive seat map with premium and regular seats
- 📋 **Price Breakup**: Transparent pricing with detailed breakdown
- 🎟️ **E-Ticket Generation**: Digital vouchers with all booking details
- 🔄 **Cancellation Policy**: Clear refund terms

### Hotel Booking
- 🏨 **Flexible Search**: Multiple rooms, adults, children (0-17 years) with age specification
- ⭐ **Detailed Listings**: Hotel ratings, reviews, and amenities
- 🛏️ **Room Details**: Comprehensive room information
- 💰 **Transparent Pricing**: Clear price breakdown with taxes
- 📜 **Voucher Generation**: Digital booking confirmation
- ✅ **Cancellation Policy**: Flexible booking options

### Modern UI/UX
- 🎨 **Beautiful Design**: Clean, modern interface with smooth animations
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Performance**: Optimized loading and transitions
- 🎯 **Intuitive Navigation**: Easy-to-use booking flow
- 🌈 **Professional Styling**: Consistent design system with gradients and shadows

## Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library
- **CSS3** - Custom styling with CSS variables

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## Project Structure

```
37/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable components (Header, Footer)
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── FlightSearch.jsx
│   │   │   ├── FlightResults.jsx
│   │   │   ├── FlightReview.jsx
│   │   │   ├── FlightBooking.jsx
│   │   │   ├── HotelSearch.jsx
│   │   │   ├── HotelResults.jsx
│   │   │   ├── HotelReview.jsx
│   │   │   ├── HotelBooking.jsx
│   │   │   └── Voucher.jsx
│   │   ├── styles/          # Global styles
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/                  # Express backend API
│   ├── src/
│   │   ├── routes/          # API routes
│   │   │   ├── flightRoutes.js
│   │   │   └── hotelRoutes.js
│   │   └── index.js         # Server entry point
│   ├── .env.example
│   └── package.json
├── .gitignore
├── package.json             # Root package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd 37
```

### 2. Install dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 3. Configure environment

Create a `.env` file in the backend directory:
```bash
cd backend
cp .env.example .env
```

### 4. Run the application

#### Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

#### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:3000

### 5. Access the application
Open your browser and navigate to `http://localhost:3000`

## Usage

### Flight Booking Flow
1. **Search**: Enter origin, destination, dates, and passenger details
2. **Select**: Browse results, filter and sort, select a flight
3. **Review**: Add meals and seats, review price breakdown
4. **Book**: Enter passenger information and payment details
5. **Confirm**: Receive e-ticket voucher

### Hotel Booking Flow
1. **Search**: Enter destination, dates, rooms, and guest details
2. **Select**: Browse hotels with ratings and amenities
3. **Review**: Check hotel details and pricing
4. **Book**: Enter guest information and payment details
5. **Confirm**: Receive booking voucher

## API Endpoints

### Flights
- `POST /api/flights/search` - Search for flights
- `GET /api/flights/:id` - Get flight details
- `POST /api/flights/book` - Create flight booking

### Hotels
- `POST /api/hotels/search` - Search for hotels
- `GET /api/hotels/:id` - Get hotel details
- `POST /api/hotels/book` - Create hotel booking

## Features Checklist

### Flight Module
- [x] Search with multiple trip types (one-way, round-trip, multi-city)
- [x] Passenger selection (adults, children, infants)
- [x] Class selection (economy, premium, business, first)
- [x] Results display with filters
- [x] Sorting options
- [x] Baggage information
- [x] Cancellation policy display
- [x] Meal selection with UI
- [x] Live seat map with seat selection
- [x] Seat charges (regular/premium)
- [x] User information form
- [x] Price breakup
- [x] Payment integration
- [x] E-ticket/voucher generation

### Hotel Module
- [x] Search with destination
- [x] Date selection (check-in/check-out)
- [x] Multiple rooms support
- [x] Adults and children selection
- [x] Child age specification (0-17)
- [x] Results with ratings and reviews
- [x] Amenities display
- [x] Details view
- [x] Price display
- [x] Guest information form
- [x] Payment integration
- [x] Voucher generation

### UI/UX
- [x] Modern, beautiful design
- [x] Responsive layout
- [x] Smooth animations
- [x] Intuitive navigation
- [x] Professional color scheme
- [x] Icon integration
- [x] Loading states
- [x] Error handling

## Future Enhancements

- [ ] Integration with real flight APIs (TBO, Amadeus, Sabre)
- [ ] Integration with hotel APIs (Expedia, Booking.com)
- [ ] User authentication and profiles
- [ ] Booking history
- [ ] Multi-language support
- [ ] Multi-currency support
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Loyalty programs
- [ ] Discount codes
- [ ] Advanced filters
- [ ] Map integration
- [ ] Reviews and ratings system

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support and queries, please contact support@travelbooking.com
