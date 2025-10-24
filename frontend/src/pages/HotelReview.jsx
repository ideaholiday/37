import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, DollarSign, Star, MapPin, Calendar } from 'lucide-react'
import './HotelReview.css'

function HotelReview() {
  const navigate = useNavigate()
  const [hotel, setHotel] = useState(null)

  useEffect(() => {
    const selectedHotel = sessionStorage.getItem('selectedHotel')
    if (selectedHotel) {
      setHotel(JSON.parse(selectedHotel))
    } else {
      navigate('/hotels')
    }
  }, [navigate])

  const handleProceedToBooking = () => {
    const bookingData = {
      hotel,
      total: hotel.price
    }
    sessionStorage.setItem('hotelBookingData', JSON.stringify(bookingData))
    navigate('/hotels/booking')
  }

  if (!hotel) {
    return <div className="spinner"></div>
  }

  const taxes = hotel.price * 0.18
  const total = hotel.price + taxes

  return (
    <div className="hotel-review fade-in">
      <h1>Review Your Hotel Booking</h1>

      <div className="review-container">
        <div className="review-main">
          <section className="review-section card">
            <div className="hotel-preview" style={{ background: hotel.image }}>
              <div className="rating-badge">
                <Star size={16} fill="white" />
                {hotel.rating}
              </div>
            </div>

            <div className="hotel-details-section">
              <h2>{hotel.name}</h2>
              <p className="location">
                <MapPin size={18} />
                {hotel.location}
              </p>

              <div className="amenities-list">
                <h3>Amenities</h3>
                <div className="amenities-grid">
                  {hotel.amenities.map((amenity, idx) => (
                    <div key={idx} className="amenity-item">
                      ✓ {amenity}
                    </div>
                  ))}
                </div>
              </div>

              <div className="policies">
                <h3>Cancellation Policy</h3>
                <p>{hotel.cancellation}</p>
                {hotel.cancellation === 'Free cancellation' && (
                  <ul>
                    <li>Free cancellation up to 24 hours before check-in</li>
                    <li>50% refund within 24 hours</li>
                  </ul>
                )}
              </div>
            </div>
          </section>
        </div>

        <aside className="price-sidebar card">
          <h2>
            <DollarSign size={24} />
            Price Breakup
          </h2>

          <div className="price-details">
            <div className="price-row">
              <span>Room Rate</span>
              <span>${hotel.price.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Taxes & Fees (18%)</span>
              <span>${taxes.toFixed(2)}</span>
            </div>

            <div className="price-divider"></div>

            <div className="price-row total">
              <span>Total Amount</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="btn btn-primary btn-block"
            onClick={handleProceedToBooking}
          >
            Proceed to Booking
            <ArrowRight size={20} />
          </button>
        </aside>
      </div>
    </div>
  )
}

export default HotelReview
