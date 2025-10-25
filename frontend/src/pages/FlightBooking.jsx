import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, CreditCard, Calendar, Lock, CheckCircle } from 'lucide-react'
import './FlightBooking.css'

function FlightBooking() {
  const navigate = useNavigate()
  const [bookingData, setBookingData] = useState(null)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [passengerInfo, setPassengerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    passportNumber: '',
    nationality: ''
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

  useEffect(() => {
    const data = sessionStorage.getItem('bookingData')
    if (data) {
      setBookingData(JSON.parse(data))
    } else {
      navigate('/flights')
    }
  }, [navigate])

  const handlePassengerChange = (e) => {
    const { name, value } = e.target
    setPassengerInfo(prev => ({ ...prev, [name]: value }))
  }

  const handlePaymentChange = (e) => {
    const { name, value } = e.target
    setPaymentInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleContinue = (e) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      handlePayment()
    }
  }

  const handlePayment = () => {
    setLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      const bookingId = 'FL' + Math.random().toString(36).substr(2, 9).toUpperCase()
      sessionStorage.setItem('bookingId', bookingId)
      sessionStorage.setItem('passengerInfo', JSON.stringify(passengerInfo))
      navigate(`/voucher/flight/${bookingId}`)
    }, 2000)
  }

  if (!bookingData) {
    return <div className="spinner"></div>
  }

  return (
    <div className="flight-booking fade-in">
      <h1>Complete Your Booking</h1>

      <div className="booking-progress">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <span>Passenger Info</span>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <span>Payment</span>
        </div>
        <div className="progress-line"></div>
        <div className="progress-step">
          <div className="step-number">3</div>
          <span>Confirmation</span>
        </div>
      </div>

      <div className="booking-container">
        <div className="booking-main">
          {step === 1 ? (
            <form onSubmit={handleContinue} className="booking-form card">
              <h2>
                <User size={24} />
                Passenger Information
              </h2>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-input"
                    value={passengerInfo.firstName}
                    onChange={handlePassengerChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-input"
                    value={passengerInfo.lastName}
                    onChange={handlePassengerChange}
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
                    value={passengerInfo.email}
                    onChange={handlePassengerChange}
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
                    value={passengerInfo.phone}
                    onChange={handlePassengerChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Calendar size={16} />
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="form-input"
                    value={passengerInfo.dateOfBirth}
                    onChange={handlePassengerChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Passport Number *</label>
                  <input
                    type="text"
                    name="passportNumber"
                    className="form-input"
                    value={passengerInfo.passportNumber}
                    onChange={handlePassengerChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Nationality *</label>
                  <select
                    name="nationality"
                    className="form-select"
                    value={passengerInfo.nationality}
                    onChange={handlePassengerChange}
                    required
                  >
                    <option value="">Select Nationality</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="IN">India</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Continue to Payment
              </button>
            </form>
          ) : (
            <form onSubmit={handleContinue} className="booking-form card">
              <h2>
                <CreditCard size={24} />
                Payment Information
              </h2>

              <div className="payment-methods">
                <label className="payment-method active">
                  <input type="radio" name="paymentMethod" value="card" defaultChecked />
                  <CreditCard size={20} />
                  <span>Credit/Debit Card</span>
                </label>
              </div>

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
                    maxLength="19"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Cardholder Name *</label>
                  <input
                    type="text"
                    name="cardName"
                    className="form-input"
                    placeholder="Name on card"
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
                    maxLength="5"
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
                    maxLength="3"
                    required
                  />
                </div>
              </div>

              <div className="secure-payment">
                <Lock size={20} />
                <span>Your payment is secured with 256-bit SSL encryption</span>
              </div>

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

              <button
                type="button"
                className="btn btn-outline btn-block"
                onClick={() => setStep(1)}
                disabled={loading}
              >
                Back to Passenger Info
              </button>
            </form>
          )}
        </div>

        {/* Booking Summary */}
        <aside className="booking-summary card">
          <h2>Booking Summary</h2>

          <div className="summary-section">
            <h3>Flight Details</h3>
            <p className="airline">{bookingData.flight.airline}</p>
            <p>{bookingData.flight.from} → {bookingData.flight.to}</p>
            <p className="datetime">{bookingData.flight.departTime} - {bookingData.flight.arriveTime}</p>
          </div>

          {Object.keys(bookingData.selectedMeals).length > 0 && (
            <div className="summary-section">
              <h3>Selected Meals</h3>
              {Object.values(bookingData.selectedMeals).map((meal, idx) => (
                <p key={idx}>{meal.name} - ${meal.price}</p>
              ))}
            </div>
          )}

          {Object.keys(bookingData.selectedSeats).length > 0 && (
            <div className="summary-section">
              <h3>Selected Seats</h3>
              {Object.values(bookingData.selectedSeats).map((seat, idx) => (
                <p key={idx}>Seat {seat}</p>
              ))}
            </div>
          )}

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total Amount</span>
            <span className="amount">${bookingData.total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default FlightBooking
