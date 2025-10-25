import { Link } from 'react-router-dom'
import { Plane, Hotel, Star, TrendingUp, Shield, Clock } from 'lucide-react'
import './Home.css'

function Home() {
  return (
    <div className="home fade-in">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Next Adventure</h1>
          <p className="hero-subtitle">Book flights and hotels at the best prices. Your journey begins here.</p>
          <div className="hero-buttons">
            <Link to="/flights" className="btn btn-primary btn-large">
              <Plane size={24} />
              Book Flights
            </Link>
            <Link to="/hotels" className="btn btn-secondary btn-large">
              <Hotel size={24} />
              Book Hotels
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Star size={32} />
            </div>
            <h3>Best Prices</h3>
            <p>Guaranteed lowest prices on flights and hotels</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Shield size={32} />
            </div>
            <h3>Secure Booking</h3>
            <p>100% secure payment and data protection</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Clock size={32} />
            </div>
            <h3>24/7 Support</h3>
            <p>Round-the-clock customer support</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <TrendingUp size={32} />
            </div>
            <h3>Easy Booking</h3>
            <p>Simple and quick booking process</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join millions of travelers who trust us for their bookings</p>
          <Link to="/flights" className="btn btn-primary btn-large">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
