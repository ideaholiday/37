import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, User, Utensils, ChevronDown, ChevronUp, DollarSign } from 'lucide-react'
import './FlightReview.css'

function FlightReview() {
  const navigate = useNavigate()
  const [flight, setFlight] = useState(null)
  const [selectedMeals, setSelectedMeals] = useState({})
  const [selectedSeats, setSelectedSeats] = useState({})
  const [showMealOptions, setShowMealOptions] = useState(false)
  const [showSeatMap, setShowSeatMap] = useState(false)

  const meals = [
    { id: 1, name: 'Vegetarian Meal', price: 15, description: 'Fresh vegetarian option' },
    { id: 2, name: 'Non-Vegetarian Meal', price: 18, description: 'Chicken or fish option' },
    { id: 3, name: 'Vegan Meal', price: 16, description: 'Plant-based meal' },
    { id: 4, name: 'Special Diabetic Meal', price: 17, description: 'Low sugar option' },
    { id: 5, name: 'Kids Meal', price: 12, description: 'Child-friendly meal' }
  ]

  const seatMap = {
    rows: 20,
    seatsPerRow: 6,
    available: ['1A', '1B', '2C', '2D', '3E', '3F', '4A', '5B', '6C', '7D'],
    occupied: ['1C', '1D', '1E', '1F', '2A', '2B'],
    premium: ['1A', '1B', '1C', '1D', '1E', '1F', '2A', '2B', '2C', '2D', '2E', '2F'],
    prices: {
      regular: 25,
      premium: 50
    }
  }

  useEffect(() => {
    const selectedFlight = sessionStorage.getItem('selectedFlight')
    if (selectedFlight) {
      setFlight(JSON.parse(selectedFlight))
    } else {
      navigate('/flights')
    }
  }, [navigate])

  const handleSelectMeal = (passengerId, meal) => {
    setSelectedMeals(prev => ({
      ...prev,
      [passengerId]: meal
    }))
  }

  const handleSelectSeat = (passengerId, seat) => {
    setSelectedSeats(prev => ({
      ...prev,
      [passengerId]: seat
    }))
  }

  const calculateTotal = () => {
    if (!flight) return 0
    let total = flight.price

    // Add meal prices
    Object.values(selectedMeals).forEach(meal => {
      total += meal.price
    })

    // Add seat prices
    Object.values(selectedSeats).forEach(seat => {
      const isPremium = seatMap.premium.includes(seat)
      total += isPremium ? seatMap.prices.premium : seatMap.prices.regular
    })

    return total
  }

  const handleProceedToBooking = () => {
    const bookingData = {
      flight,
      selectedMeals,
      selectedSeats,
      total: calculateTotal()
    }
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData))
    navigate('/flights/booking')
  }

  if (!flight) {
    return <div className="spinner"></div>
  }

  const baseFare = flight.price * 0.85
  const taxes = flight.price * 0.15
  const mealTotal = Object.values(selectedMeals).reduce((sum, meal) => sum + meal.price, 0)
  const seatTotal = Object.values(selectedSeats).reduce((sum, seat) => {
    const isPremium = seatMap.premium.includes(seat)
    return sum + (isPremium ? seatMap.prices.premium : seatMap.prices.regular)
  }, 0)

  return (
    <div className="flight-review fade-in">
      <h1>Review Your Booking</h1>

      <div className="review-container">
        <div className="review-main">
          {/* Flight Details */}
          <section className="review-section card">
            <h2>Flight Details</h2>
            <div className="flight-summary">
              <div className="summary-row">
                <span className="label">Airline:</span>
                <span className="value">{flight.airline} ({flight.flightNumber})</span>
              </div>
              <div className="summary-row">
                <span className="label">Route:</span>
                <span className="value">{flight.from} → {flight.to}</span>
              </div>
              <div className="summary-row">
                <span className="label">Departure:</span>
                <span className="value">{flight.departTime}</span>
              </div>
              <div className="summary-row">
                <span className="label">Arrival:</span>
                <span className="value">{flight.arriveTime}</span>
              </div>
              <div className="summary-row">
                <span className="label">Duration:</span>
                <span className="value">{flight.duration}</span>
              </div>
              <div className="summary-row">
                <span className="label">Baggage:</span>
                <span className="value">{flight.baggage}</span>
              </div>
            </div>
          </section>

          {/* Meal Selection */}
          <section className="review-section card">
            <div 
              className="section-header clickable"
              onClick={() => setShowMealOptions(!showMealOptions)}
            >
              <h2>
                <Utensils size={24} />
                Add Meals (Optional)
              </h2>
              {showMealOptions ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>

            {showMealOptions && (
              <div className="meal-options">
                <p className="section-description">
                  Pre-book your meals and save time during your flight
                </p>
                <div className="meals-grid">
                  {meals.map(meal => (
                    <div key={meal.id} className="meal-card">
                      <h3>{meal.name}</h3>
                      <p className="meal-description">{meal.description}</p>
                      <p className="meal-price">${meal.price}</p>
                      <button
                        className={`btn ${selectedMeals['passenger1']?.id === meal.id ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => handleSelectMeal('passenger1', meal)}
                      >
                        {selectedMeals['passenger1']?.id === meal.id ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Seat Selection */}
          <section className="review-section card">
            <div 
              className="section-header clickable"
              onClick={() => setShowSeatMap(!showSeatMap)}
            >
              <h2>
                <User size={24} />
                Select Seats (Optional)
              </h2>
              {showSeatMap ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>

            {showSeatMap && (
              <div className="seat-selection">
                <p className="section-description">
                  Choose your preferred seat. Premium seats offer extra legroom.
                </p>
                <div className="seat-legend">
                  <div className="legend-item">
                    <div className="seat-icon available"></div>
                    <span>Available (${seatMap.prices.regular})</span>
                  </div>
                  <div className="legend-item">
                    <div className="seat-icon premium"></div>
                    <span>Premium (${seatMap.prices.premium})</span>
                  </div>
                  <div className="legend-item">
                    <div className="seat-icon occupied"></div>
                    <span>Occupied</span>
                  </div>
                  <div className="legend-item">
                    <div className="seat-icon selected"></div>
                    <span>Your Selection</span>
                  </div>
                </div>

                <div className="seat-map">
                  <div className="seat-map-header">
                    <span>A</span><span>B</span><span>C</span>
                    <span className="aisle"></span>
                    <span>D</span><span>E</span><span>F</span>
                  </div>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(row => (
                    <div key={row} className="seat-row">
                      <span className="row-number">{row}</span>
                      {['A', 'B', 'C'].map(col => {
                        const seatId = `${row}${col}`
                        const isOccupied = seatMap.occupied.includes(seatId)
                        const isPremium = seatMap.premium.includes(seatId)
                        const isSelected = selectedSeats['passenger1'] === seatId
                        return (
                          <button
                            key={seatId}
                            className={`seat ${isOccupied ? 'occupied' : ''} ${isPremium && !isOccupied ? 'premium' : ''} ${isSelected ? 'selected' : ''}`}
                            disabled={isOccupied}
                            onClick={() => handleSelectSeat('passenger1', seatId)}
                          >
                            {seatId}
                          </button>
                        )
                      })}
                      <span className="aisle"></span>
                      {['D', 'E', 'F'].map(col => {
                        const seatId = `${row}${col}`
                        const isOccupied = seatMap.occupied.includes(seatId)
                        const isPremium = seatMap.premium.includes(seatId)
                        const isSelected = selectedSeats['passenger1'] === seatId
                        return (
                          <button
                            key={seatId}
                            className={`seat ${isOccupied ? 'occupied' : ''} ${isPremium && !isOccupied ? 'premium' : ''} ${isSelected ? 'selected' : ''}`}
                            disabled={isOccupied}
                            onClick={() => handleSelectSeat('passenger1', seatId)}
                          >
                            {seatId}
                          </button>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Price Breakup Sidebar */}
        <aside className="price-sidebar card">
          <h2>
            <DollarSign size={24} />
            Price Breakup
          </h2>

          <div className="price-details">
            <div className="price-row">
              <span>Base Fare</span>
              <span>${baseFare.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Taxes & Fees</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
            
            {mealTotal > 0 && (
              <div className="price-row highlight">
                <span>Meals</span>
                <span>${mealTotal.toFixed(2)}</span>
              </div>
            )}

            {seatTotal > 0 && (
              <div className="price-row highlight">
                <span>Seat Selection</span>
                <span>${seatTotal.toFixed(2)}</span>
              </div>
            )}

            <div className="price-divider"></div>

            <div className="price-row total">
              <span>Total Amount</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <button
            className="btn btn-primary btn-block"
            onClick={handleProceedToBooking}
          >
            Proceed to Booking
            <ArrowRight size={20} />
          </button>

          <div className="cancellation-policy">
            <h3>Cancellation Policy</h3>
            <p>{flight.cancellation}</p>
            {flight.cancellation === 'Refundable' && (
              <ul>
                <li>Free cancellation up to 24 hours before departure</li>
                <li>50% refund between 24-12 hours</li>
                <li>25% refund within 12 hours</li>
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default FlightReview
