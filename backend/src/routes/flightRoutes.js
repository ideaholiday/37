import express from 'express'
const router = express.Router()

// Mock flight data
const mockFlights = [
  {
    id: 1,
    airline: 'Air India',
    flightNumber: 'AI 101',
    from: 'New York (JFK)',
    to: 'London (LHR)',
    departTime: '10:30',
    arriveTime: '22:45',
    duration: '7h 15m',
    stops: 'Non-stop',
    price: 650,
    class: 'Economy',
    seats: 12,
    baggage: '2 x 23kg',
    cancellation: 'Refundable'
  }
]

// Search flights
router.post('/search', (req, res) => {
  const { from, to, departDate, returnDate, adults, children, class: flightClass } = req.body
  
  // In production, this would query a real flight API (like TBO, Amadeus, etc.)
  setTimeout(() => {
    res.json({
      success: true,
      flights: mockFlights,
      searchParams: { from, to, departDate, returnDate, adults, children, flightClass }
    })
  }, 1000)
})

// Get flight details
router.get('/:id', (req, res) => {
  const flight = mockFlights.find(f => f.id === parseInt(req.params.id))
  if (flight) {
    res.json({ success: true, flight })
  } else {
    res.status(404).json({ success: false, message: 'Flight not found' })
  }
})

// Create booking
router.post('/book', (req, res) => {
  const { flightId, passengerInfo, paymentInfo } = req.body
  
  // In production, this would process payment and create booking
  const bookingId = 'FL' + Math.random().toString(36).substr(2, 9).toUpperCase()
  
  res.json({
    success: true,
    bookingId,
    message: 'Booking confirmed',
    confirmation: {
      bookingId,
      status: 'confirmed',
      timestamp: new Date().toISOString()
    }
  })
})

export default router
