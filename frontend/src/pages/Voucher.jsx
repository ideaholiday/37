import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle, Download, Printer, Mail, Plane, Hotel, Calendar, User, MapPin } from 'lucide-react'
import './Voucher.css'

function Voucher() {
  const { type, id } = useParams()
  const navigate = useNavigate()
  const [bookingDetails, setBookingDetails] = useState(null)

  useEffect(() => {
    if (type === 'flight') {
      const flight = JSON.parse(sessionStorage.getItem('selectedFlight') || '{}')
      const passenger = JSON.parse(sessionStorage.getItem('passengerInfo') || '{}')
      const bookingData = JSON.parse(sessionStorage.getItem('bookingData') || '{}')
      setBookingDetails({
        type: 'flight',
        id,
        flight,
        passenger,
        bookingData,
        bookingDate: new Date().toLocaleDateString()
      })
    } else if (type === 'hotel') {
      const hotel = JSON.parse(sessionStorage.getItem('selectedHotel') || '{}')
      const guest = JSON.parse(sessionStorage.getItem('guestInfo') || '{}')
      const hotelBooking = JSON.parse(sessionStorage.getItem('hotelBookingData') || '{}')
      setBookingDetails({
        type: 'hotel',
        id,
        hotel,
        guest,
        hotelBooking,
        bookingDate: new Date().toLocaleDateString()
      })
    }
  }, [type, id])

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    alert('Downloading voucher as PDF...')
  }

  const handleEmail = () => {
    alert('Voucher sent to your email!')
  }

  if (!bookingDetails) {
    return <div className="spinner"></div>
  }

  return (
    <div className="voucher-page fade-in">
      <div className="success-message">
        <CheckCircle size={64} className="success-icon" />
        <h1>Booking Confirmed!</h1>
        <p>Your booking has been successfully confirmed</p>
        <p className="booking-id">Booking ID: <strong>{bookingDetails.id}</strong></p>
      </div>

      <div className="voucher-actions">
        <button className="btn btn-outline" onClick={handlePrint}>
          <Printer size={20} />
          Print
        </button>
        <button className="btn btn-outline" onClick={handleDownload}>
          <Download size={20} />
          Download PDF
        </button>
        <button className="btn btn-primary" onClick={handleEmail}>
          <Mail size={20} />
          Email Voucher
        </button>
      </div>

      <div className="voucher-content card">
        <div className="voucher-header">
          <div className="company-info">
            <h2>TravelBooking</h2>
            <p>Your Trusted Travel Partner</p>
          </div>
          <div className="voucher-type">
            {bookingDetails.type === 'flight' ? (
              <Plane size={48} />
            ) : (
              <Hotel size={48} />
            )}
          </div>
        </div>

        <div className="voucher-divider"></div>

        {bookingDetails.type === 'flight' ? (
          <>
            <section className="voucher-section">
              <h3>Flight Details</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="label">Airline</span>
                  <span className="value">{bookingDetails.flight.airline}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Flight Number</span>
                  <span className="value">{bookingDetails.flight.flightNumber}</span>
                </div>
                <div className="detail-item">
                  <span className="label">From</span>
                  <span className="value">{bookingDetails.flight.from}</span>
                </div>
                <div className="detail-item">
                  <span className="label">To</span>
                  <span className="value">{bookingDetails.flight.to}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Departure</span>
                  <span className="value">{bookingDetails.flight.departTime}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Arrival</span>
                  <span className="value">{bookingDetails.flight.arriveTime}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Class</span>
                  <span className="value">{bookingDetails.flight.class}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Baggage</span>
                  <span className="value">{bookingDetails.flight.baggage}</span>
                </div>
              </div>
            </section>

            <section className="voucher-section">
              <h3>Passenger Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="label">Name</span>
                  <span className="value">
                    {bookingDetails.passenger.firstName} {bookingDetails.passenger.lastName}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="label">Email</span>
                  <span className="value">{bookingDetails.passenger.email}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Phone</span>
                  <span className="value">{bookingDetails.passenger.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Passport</span>
                  <span className="value">{bookingDetails.passenger.passportNumber}</span>
                </div>
              </div>

              {bookingDetails.bookingData.selectedSeats && Object.keys(bookingDetails.bookingData.selectedSeats).length > 0 && (
                <div className="additional-info">
                  <p><strong>Selected Seats:</strong> {Object.values(bookingDetails.bookingData.selectedSeats).join(', ')}</p>
                </div>
              )}

              {bookingDetails.bookingData.selectedMeals && Object.keys(bookingDetails.bookingData.selectedMeals).length > 0 && (
                <div className="additional-info">
                  <p><strong>Meals:</strong> {Object.values(bookingDetails.bookingData.selectedMeals).map(m => m.name).join(', ')}</p>
                </div>
              )}
            </section>
          </>
        ) : (
          <>
            <section className="voucher-section">
              <h3>Hotel Details</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="label">Hotel Name</span>
                  <span className="value">{bookingDetails.hotel.name}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Location</span>
                  <span className="value">{bookingDetails.hotel.location}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Rating</span>
                  <span className="value">⭐ {bookingDetails.hotel.rating}</span>
                </div>
                <div className="detail-item full-width">
                  <span className="label">Amenities</span>
                  <span className="value">{bookingDetails.hotel.amenities.join(', ')}</span>
                </div>
              </div>
            </section>

            <section className="voucher-section">
              <h3>Guest Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="label">Name</span>
                  <span className="value">
                    {bookingDetails.guest.firstName} {bookingDetails.guest.lastName}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="label">Email</span>
                  <span className="value">{bookingDetails.guest.email}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Phone</span>
                  <span className="value">{bookingDetails.guest.phone}</span>
                </div>
              </div>
            </section>
          </>
        )}

        <section className="voucher-section">
          <h3>Payment Details</h3>
          <div className="payment-summary">
            <div className="payment-row">
              <span>Total Amount Paid</span>
              <span className="amount">
                ${bookingDetails.type === 'flight' 
                  ? bookingDetails.bookingData.total?.toFixed(2) 
                  : (bookingDetails.hotel.price * 1.18).toFixed(2)
                }
              </span>
            </div>
            <div className="payment-row">
              <span>Payment Method</span>
              <span>Credit/Debit Card</span>
            </div>
            <div className="payment-row">
              <span>Booking Date</span>
              <span>{bookingDetails.bookingDate}</span>
            </div>
          </div>
        </section>

        <div className="voucher-footer">
          <p className="important-note">
            <strong>Important:</strong> Please carry a valid photo ID and this voucher (digital or printed) 
            at the time of check-in.
          </p>
          <p className="thank-you">Thank you for choosing TravelBooking!</p>
        </div>
      </div>

      <div className="return-home">
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Return to Home
        </button>
      </div>
    </div>
  )
}

export default Voucher
