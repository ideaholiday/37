import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Plane, Clock, Calendar, DollarSign, Filter, ArrowRight, Briefcase, Info } from 'lucide-react'
import './FlightResults.css'

function FlightResults() {
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [flights, setFlights] = useState([])
  const [sortBy, setSortBy] = useState('price')
  const [filters, setFilters] = useState({
    maxPrice: 2000,
    airlines: [],
    stops: 'any'
  })

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockFlights = [
        {
          id: 1,
          airline: 'Air India',
          flightNumber: 'AI 101',
          from: 'New York (JFK)',
          to: 'London (LHR)',
          departTime: '10:30',
          arriveTime: '22:45',
          duration: '7h 15m',
          stops: 'Non-stop',
          price: 650,
          class: 'Economy',
          seats: 12,
          baggage: '2 x 23kg',
          cancellation: 'Refundable'
        },
        {
          id: 2,
          airline: 'British Airways',
          flightNumber: 'BA 202',
          from: 'New York (JFK)',
          to: 'London (LHR)',
          departTime: '14:00',
          arriveTime: '02:30',
          duration: '8h 30m',
          stops: '1 Stop',
          price: 550,
          class: 'Economy',
          seats: 8,
          baggage: '2 x 23kg',
          cancellation: 'Non-refundable'
        },
        {
          id: 3,
          airline: 'Emirates',
          flightNumber: 'EK 303',
          from: 'New York (JFK)',
          to: 'London (LHR)',
          departTime: '20:15',
          arriveTime: '09:00',
          duration: '8h 45m',
          stops: '1 Stop',
          price: 720,
          class: 'Business',
          seats: 5,
          baggage: '3 x 32kg',
          cancellation: 'Refundable'
        },
        {
          id: 4,
          airline: 'United Airlines',
          flightNumber: 'UA 404',
          from: 'New York (JFK)',
          to: 'London (LHR)',
          departTime: '18:30',
          arriveTime: '06:15',
          duration: '7h 45m',
          stops: 'Non-stop',
          price: 680,
          class: 'Economy',
          seats: 15,
          baggage: '2 x 23kg',
          cancellation: 'Refundable'
        }
      ]
      setFlights(mockFlights)
      setLoading(false)
    }, 1500)
  }, [])

  const handleSelectFlight = (flight) => {
    sessionStorage.setItem('selectedFlight', JSON.stringify(flight))
    navigate('/flights/review')
  }

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price
    if (sortBy === 'duration') return parseFloat(a.duration) - parseFloat(b.duration)
    return 0
  })

  if (loading) {
    return (
      <div className="flight-results">
        <div className="spinner"></div>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Searching for best flights...</p>
      </div>
    )
  }

  return (
    <div className="flight-results fade-in">
      <div className="results-header">
        <h1>Available Flights</h1>
        <p>Found {flights.length} flights</p>
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
              <option value="price">Price: Low to High</option>
              <option value="duration">Duration: Shortest</option>
              <option value="departure">Departure Time</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="form-label">Max Price: ${filters.maxPrice}</label>
            <input
              type="range"
              min="0"
              max="2000"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              className="price-slider"
            />
          </div>

          <div className="filter-group">
            <label className="form-label">Stops</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="stops"
                  value="any"
                  checked={filters.stops === 'any'}
                  onChange={(e) => setFilters({ ...filters, stops: e.target.value })}
                />
                <span>Any</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="stops"
                  value="nonstop"
                  checked={filters.stops === 'nonstop'}
                  onChange={(e) => setFilters({ ...filters, stops: e.target.value })}
                />
                <span>Non-stop only</span>
              </label>
            </div>
          </div>
        </aside>

        <div className="flights-list">
          {sortedFlights.map((flight) => (
            <div key={flight.id} className="flight-card card">
              <div className="flight-header">
                <div className="airline-info">
                  <h3>{flight.airline}</h3>
                  <p className="flight-number">{flight.flightNumber}</p>
                </div>
                <div className="flight-price">
                  <span className="price">${flight.price}</span>
                  <span className="per-person">per person</span>
                </div>
              </div>

              <div className="flight-details">
                <div className="route-info">
                  <div className="route-point">
                    <p className="time">{flight.departTime}</p>
                    <p className="location">{flight.from}</p>
                  </div>

                  <div className="route-middle">
                    <div className="duration">
                      <Clock size={16} />
                      <span>{flight.duration}</span>
                    </div>
                    <div className="route-line">
                      <Plane size={16} />
                    </div>
                    <p className="stops">{flight.stops}</p>
                  </div>

                  <div className="route-point">
                    <p className="time">{flight.arriveTime}</p>
                    <p className="location">{flight.to}</p>
                  </div>
                </div>

                <div className="flight-meta">
                  <div className="meta-item">
                    <Briefcase size={16} />
                    <span>{flight.baggage}</span>
                  </div>
                  <div className="meta-item">
                    <Info size={16} />
                    <span>{flight.cancellation}</span>
                  </div>
                  <div className="meta-item">
                    <span className="badge badge-success">{flight.seats} seats left</span>
                  </div>
                </div>
              </div>

              <div className="flight-actions">
                <button
                  className="btn btn-outline"
                  onClick={() => alert('Flight details coming soon')}
                >
                  View Details
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleSelectFlight(flight)}
                >
                  Select Flight
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FlightResults
