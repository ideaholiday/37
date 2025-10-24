import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Calendar, Users, ArrowLeftRight } from 'lucide-react'
import './FlightSearch.css'

function FlightSearch() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useState({
    tripType: 'roundtrip',
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    infants: 0,
    class: 'economy'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchParams(prev => ({ ...prev, [name]: value }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Store search params and navigate to results
    sessionStorage.setItem('flightSearch', JSON.stringify(searchParams))
    navigate('/flights/results', { state: searchParams })
  }

  const swapLocations = () => {
    setSearchParams(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }))
  }

  return (
    <div className="flight-search fade-in">
      <div className="search-header">
        <h1>Search Flights</h1>
        <p>Find the best deals on flights worldwide</p>
      </div>

      <form onSubmit={handleSearch} className="search-form card">
        <div className="trip-type-selector">
          <label className="radio-label">
            <input
              type="radio"
              name="tripType"
              value="oneway"
              checked={searchParams.tripType === 'oneway'}
              onChange={handleInputChange}
            />
            <span>One Way</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="tripType"
              value="roundtrip"
              checked={searchParams.tripType === 'roundtrip'}
              onChange={handleInputChange}
            />
            <span>Round Trip</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="tripType"
              value="multicity"
              checked={searchParams.tripType === 'multicity'}
              onChange={handleInputChange}
            />
            <span>Multi City</span>
          </label>
        </div>

        <div className="search-fields">
          <div className="location-fields">
            <div className="form-group location-group">
              <label className="form-label">
                <MapPin size={16} />
                From
              </label>
              <input
                type="text"
                name="from"
                className="form-input"
                placeholder="City or Airport"
                value={searchParams.from}
                onChange={handleInputChange}
                required
              />
            </div>

            <button
              type="button"
              className="swap-btn"
              onClick={swapLocations}
              aria-label="Swap locations"
            >
              <ArrowLeftRight size={20} />
            </button>

            <div className="form-group location-group">
              <label className="form-label">
                <MapPin size={16} />
                To
              </label>
              <input
                type="text"
                name="to"
                className="form-input"
                placeholder="City or Airport"
                value={searchParams.to}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="date-fields">
            <div className="form-group">
              <label className="form-label">
                <Calendar size={16} />
                Departure Date
              </label>
              <input
                type="date"
                name="departDate"
                className="form-input"
                value={searchParams.departDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            {searchParams.tripType === 'roundtrip' && (
              <div className="form-group">
                <label className="form-label">
                  <Calendar size={16} />
                  Return Date
                </label>
                <input
                  type="date"
                  name="returnDate"
                  className="form-input"
                  value={searchParams.returnDate}
                  onChange={handleInputChange}
                  min={searchParams.departDate || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            )}
          </div>

          <div className="passengers-class">
            <div className="form-group">
              <label className="form-label">
                <Users size={16} />
                Adults (12+)
              </label>
              <input
                type="number"
                name="adults"
                className="form-input"
                value={searchParams.adults}
                onChange={handleInputChange}
                min="1"
                max="9"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Users size={16} />
                Children (2-11)
              </label>
              <input
                type="number"
                name="children"
                className="form-input"
                value={searchParams.children}
                onChange={handleInputChange}
                min="0"
                max="8"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Users size={16} />
                Infants (0-2)
              </label>
              <input
                type="number"
                name="infants"
                className="form-input"
                value={searchParams.infants}
                onChange={handleInputChange}
                min="0"
                max={searchParams.adults}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Class</label>
              <select
                name="class"
                className="form-select"
                value={searchParams.class}
                onChange={handleInputChange}
              >
                <option value="economy">Economy</option>
                <option value="premium">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-search">
          <Search size={20} />
          Search Flights
        </button>
      </form>

      <div className="popular-routes">
        <h2>Popular Routes</h2>
        <div className="routes-grid">
          <div className="route-card">
            <h3>New York → London</h3>
            <p>From $450</p>
          </div>
          <div className="route-card">
            <h3>Los Angeles → Tokyo</h3>
            <p>From $650</p>
          </div>
          <div className="route-card">
            <h3>Dubai → Mumbai</h3>
            <p>From $320</p>
          </div>
          <div className="route-card">
            <h3>Paris → Rome</h3>
            <p>From $180</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightSearch
