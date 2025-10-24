import express from 'express'
const router = express.Router()

// Mock hotel data
const mockHotels = [
  {
    id: 1,
    name: 'Grand Plaza Hotel',
    location: 'Downtown, New York',
    rating: 4.5,
    reviews: 342,
    price: 180,
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Gym'],
    cancellation: 'Free cancellation'
  }
]

// Search hotels
router.post('/search', (req, res) => {
  const { destination, checkIn, checkOut, rooms } = req.body
  
  // In production, this would query a real hotel API
  setTimeout(() => {
    res.json({
      success: true,
      hotels: mockHotels,
      searchParams: { destination, checkIn, checkOut, rooms }
    })
  }, 1000)
})

// Get hotel details
router.get('/:id', (req, res) => {
  const hotel = mockHotels.find(h => h.id === parseInt(req.params.id))
  if (hotel) {
    res.json({ success: true, hotel })
  } else {
    res.status(404).json({ success: false, message: 'Hotel not found' })
  }
})

// Create booking
router.post('/book', (req, res) => {
  const { hotelId, guestInfo, paymentInfo } = req.body
  
  // In production, this would process payment and create booking
  const bookingId = 'HT' + Math.random().toString(36).substr(2, 9).toUpperCase()
  
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
