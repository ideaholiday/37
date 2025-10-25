import { Mail, Phone, MapPin } from 'lucide-react'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Your trusted partner for flight and hotel bookings worldwide. We offer the best deals and seamless booking experience.</p>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <div className="footer-contact">
            <div className="footer-contact-item">
              <Phone size={18} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={18} />
              <span>support@travelbooking.com</span>
            </div>
            <div className="footer-contact-item">
              <MapPin size={18} />
              <span>123 Travel Street, City</span>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/flights">Book Flights</a></li>
            <li><a href="/hotels">Book Hotels</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} TravelBooking. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
