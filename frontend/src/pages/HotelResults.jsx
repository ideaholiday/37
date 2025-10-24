import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, MapPin, Wifi, Coffee, Utensils, ArrowRight, Filter } from 'lucide-react'
import './HotelResults.css'

function HotelResults() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [hotels, setHotels] = useState([])
  const [sortBy, setSortBy] = useState('recommended')

  useEffect(() => {
    setTimeout(() => {
      const mockHotels = [
        {
          id: 1,
          name: 'Grand Plaza Hotel',
          location: 'Downtown, New York',
          rating: 4.5,
          reviews: 342,
          price: 180,
          image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Gym'],
          cancellation: 'Free cancellation'
        },
        {
          id: 2,
          name: 'Luxury Suites & Spa',
          location: 'Midtown, New York',
          rating: 4.8,
          reviews: 567,
          price: 250,
          image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          amenities: ['Free WiFi', 'Spa', 'Restaurant', 'Bar'],
          cancellation: 'Free cancellation'
        },
        {
          id: 3,
          name: 'Budget Inn Express',
          location: 'Airport Area, New York',
          rating: 4.0,
          reviews: 198,
          price: 95,
          image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          amenities: ['Free WiFi', 'Parking', 'Breakfast'],
          cancellation: 'Non-refundable'
        }
      ]
      setHotels(mockHotels)
      setLoading(false)
    }, 1500)
  }, [])

  const handleSelectHotel = (hotel) => {
    sessionStorage.setItem('selectedHotel', JSON.stringify(hotel))
    navigate('/hotels/review')
  }

  if (loading) {
    return (
      <div className="hotel-results">
        <div className="spinner"></div>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Searching for hotels...</p>
      </div>
    )
  }

  return (
    <div className="hotel-results fade-in">
      <div className="results-header">
        <h1>Available Hotels</h1>
        <p>Found {hotels.length} hotels</p>
      </div>

      <div className="results-container">
        <aside className="filters-sidebar card">
          <h3>
            <Filter size={20} />
            Filters
          </h3>

          <div className="filter-group">
            <label className="form-label">Sort By</label>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Guest Rating</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="form-label">Star Rating</label>
            <div className="radio-group">
              {[5, 4, 3].map(stars => (
                <label key={stars} className="radio-label">
                  <input type="checkbox" />
                  <span>{stars} Stars</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div className="hotels-list">
          {hotels.map(hotel => (
            <div key={hotel.id} className="hotel-card card">
              <div className="hotel-image" style={{ background: hotel.image }}>
                <span className="badge badge-success">{hotel.cancellation}</span>
              </div>

              <div className="hotel-info">
                <div className="hotel-header">
                  <div>
                    <h3>{hotel.name}</h3>
                    <p className="hotel-location">
                      <MapPin size={16} />
                      {hotel.location}
                    </p>
                  </div>

                  <div className="hotel-rating">
                    <div className="rating-box">
                      <Star size={16} fill="currentColor" />
                      <span>{hotel.rating}</span>
                    </div>
                    <p className="reviews">{hotel.reviews} reviews</p>
                  </div>
                </div>

                <div className="hotel-amenities">
                  {hotel.amenities.map((amenity, idx) => (
                    <span key={idx} className="amenity-badge">
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="hotel-footer">
                  <div className="hotel-price">
                    <span className="from">From</span>
                    <span className="price">${hotel.price}</span>
                    <span className="per-night">/night</span>
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={() => handleSelectHotel(hotel)}
                  >
                    View Details
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HotelResults
