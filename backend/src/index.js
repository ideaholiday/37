import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import flightRoutes from './routes/flightRoutes.js'
import hotelRoutes from './routes/hotelRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Flight & Hotel Booking API' })
})

app.use('/api/flights', flightRoutes)
app.use('/api/hotels', hotelRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
