import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, CreditCard, Lock, CheckCircle } from 'lucide-react'
import './HotelBooking.css'

function HotelBooking() {
  const navigate = useNavigate()
  const [bookingData, setBookingData] = useState(null)
  const [loading, setLoading] = useState(false)

  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

  useEffect(() => {
    const data = sessionStorage.getItem('hotelBookingData')
    if (data) {
      setBookingData(JSON.parse(data))
    } else {
      navigate('/hotels')
    }
  }, [navigate])

  const handleGuestChange = (e) => {
    const { name, value } = e.target
    setGuestInfo(prev => ({ ...prev, [name]: value }))
  }

  const handlePaymentChange = (e) => {
    const { name, value } = e.target
    setPaymentInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      const bookingId = 'HT' + Math.random().toString(36).substr(2, 9).toUpperCase()
      sessionStorage.setItem('hotelBookingId', bookingId)
      sessionStorage.setItem('guestInfo', JSON.stringify(guestInfo))
      navigate(`/voucher/hotel/${bookingId}`)
    }, 2000)
  }

  if (!bookingData) {
    return <div className="spinner"></div>
  }

  return (
    <div className="hotel-booking fade-in">
      <h1>Complete Hotel Booking</h1>

      <div className="booking-container">
        <form onSubmit={handleSubmit} className="booking-form card">
          <section className="form-section">
            <h2>
              <User size={24} />
              Guest Information
            </h2>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-input"
                  value={guestInfo.firstName}
                  onChange={handleGuestChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-input"
                  value={guestInfo.lastName}
                  onChange={handleGuestChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Mail size={16} />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={guestInfo.email}
                  onChange={handleGuestChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Phone size={16} />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  value={guestInfo.phone}
                  onChange={handleGuestChange}
                  required
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>
              <CreditCard size={24} />
              Payment Information
            </h2>

            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label">Card Number *</label>
                <input
                  type="text"
                  name="cardNumber"
                  className="form-input"
                  placeholder="1234 5678 9012 3456"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label">Cardholder Name *</label>
                <input
                  type="text"
                  name="cardName"
                  className="form-input"
                  value={paymentInfo.cardName}
                  onChange={handlePaymentChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Expiry Date *</label>
                <input
                  type="text"
                  name="expiryDate"
                  className="form-input"
                  placeholder="MM/YY"
                  value={paymentInfo.expiryDate}
                  onChange={handlePaymentChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Lock size={16} />
                  CVV *
                </label>
                <input
                  type="password"
                  name="cvv"
                  className="form-input"
                  placeholder="123"
                  value={paymentInfo.cvv}
                  onChange={handlePaymentChange}
                  required
                />
              </div>
            </div>

            <div className="secure-payment">
              <Lock size={20} />
              <span>Your payment is secured with 256-bit SSL encryption</span>
            </div>
          </section>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? (
              <>
                <div className="spinner" style={{ width: '20px', height: '20px', margin: '0 8px' }}></div>
                Processing Payment...
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                Complete Booking
              </>
            )}
          </button>
        </form>

        <aside className="booking-summary card">
          <h2>Booking Summary</h2>

          <div className="summary-section">
            <h3>{bookingData.hotel.name}</h3>
            <p className="location">{bookingData.hotel.location}</p>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total Amount</span>
            <span className="amount">${(bookingData.total * 1.18).toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default HotelBooking
