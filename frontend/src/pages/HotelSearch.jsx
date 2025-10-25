import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Calendar, Users, Home, Plus, Minus } from 'lucide-react'
import './HotelSearch.css'

function HotelSearch() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    rooms: [
      {
        adults: 2,
        children: 0,
        childAges: []
      }
    ]
  })

  const [showRoomConfig, setShowRoomConfig] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchParams(prev => ({ ...prev, [name]: value }))
  }

  const addRoom = () => {
    setSearchParams(prev => ({
      ...prev,
      rooms: [...prev.rooms, { adults: 2, children: 0, childAges: [] }]
    }))
  }

  const removeRoom = (index) => {
    setSearchParams(prev => ({
      ...prev,
      rooms: prev.rooms.filter((_, i) => i !== index)
    }))
  }

  const updateRoom = (roomIndex, field, value) => {
    setSearchParams(prev => ({
      ...prev,
      rooms: prev.rooms.map((room, i) => {
        if (i === roomIndex) {
          if (field === 'children') {
            const childCount = parseInt(value) || 0
            const newChildAges = Array(childCount).fill(0).map((_, idx) => 
              room.childAges[idx] || 0
            )
            return { ...room, children: childCount, childAges: newChildAges }
          }
          return { ...room, [field]: parseInt(value) || 0 }
        }
        return room
      })
    }))
  }

  const updateChildAge = (roomIndex, childIndex, age) => {
    setSearchParams(prev => ({
      ...prev,
      rooms: prev.rooms.map((room, i) => {
        if (i === roomIndex) {
          const newChildAges = [...room.childAges]
          newChildAges[childIndex] = parseInt(age) || 0
          return { ...room, childAges: newChildAges }
        }
        return room
      })
    }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    sessionStorage.setItem('hotelSearch', JSON.stringify(searchParams))
    navigate('/hotels/results', { state: searchParams })
  }

  const getTotalGuests = () => {
    return searchParams.rooms.reduce((total, room) => 
      total + room.adults + room.children, 0
    )
  }

  return (
    <div className="hotel-search fade-in">
      <div className="search-header">
        <h1>Search Hotels</h1>
        <p>Find the perfect accommodation for your stay</p>
      </div>

      <form onSubmit={handleSearch} className="search-form card">
        <div className="search-fields">
          <div className="form-group destination-group">
            <label className="form-label">
              <MapPin size={16} />
              Destination
            </label>
            <input
              type="text"
              name="destination"
              className="form-input"
              placeholder="City, hotel name, or area"
              value={searchParams.destination}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="date-fields">
            <div className="form-group">
              <label className="form-label">
                <Calendar size={16} />
                Check-in
              </label>
              <input
                type="date"
                name="checkIn"
                className="form-input"
                value={searchParams.checkIn}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Calendar size={16} />
                Check-out
              </label>
              <input
                type="date"
                name="checkOut"
                className="form-input"
                value={searchParams.checkOut}
                onChange={handleInputChange}
                min={searchParams.checkIn || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <Users size={16} />
              Guests & Rooms
            </label>
            <div
              className="guests-selector"
              onClick={() => setShowRoomConfig(!showRoomConfig)}
            >
              <span>
                {searchParams.rooms.length} Room{searchParams.rooms.length > 1 ? 's' : ''}, {getTotalGuests()} Guest{getTotalGuests() > 1 ? 's' : ''}
              </span>
            </div>

            {showRoomConfig && (
              <div className="room-config-dropdown">
                {searchParams.rooms.map((room, roomIndex) => (
                  <div key={roomIndex} className="room-config-item">
                    <div className="room-header">
                      <h4>Room {roomIndex + 1}</h4>
                      {searchParams.rooms.length > 1 && (
                        <button
                          type="button"
                          className="remove-room-btn"
                          onClick={() => removeRoom(roomIndex)}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="guest-controls">
                      <div className="guest-control-row">
                        <label>Adults (18+)</label>
                        <div className="counter">
                          <button
                            type="button"
                            onClick={() => updateRoom(roomIndex, 'adults', room.adults - 1)}
                            disabled={room.adults <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span>{room.adults}</span>
                          <button
                            type="button"
                            onClick={() => updateRoom(roomIndex, 'adults', room.adults + 1)}
                            disabled={room.adults >= 8}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="guest-control-row">
                        <label>Children (0-17)</label>
                        <div className="counter">
                          <button
                            type="button"
                            onClick={() => updateRoom(roomIndex, 'children', room.children - 1)}
                            disabled={room.children <= 0}
                          >
                            <Minus size={16} />
                          </button>
                          <span>{room.children}</span>
                          <button
                            type="button"
                            onClick={() => updateRoom(roomIndex, 'children', room.children + 1)}
                            disabled={room.children >= 6}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {room.children > 0 && (
                        <div className="child-ages">
                          <label>Ages of children at check-out</label>
                          <div className="child-ages-grid">
                            {room.childAges.map((age, childIndex) => (
                              <select
                                key={childIndex}
                                className="form-select"
                                value={age}
                                onChange={(e) => updateChildAge(roomIndex, childIndex, e.target.value)}
                              >
                                <option value={0}>Under 1</option>
                                {[...Array(17)].map((_, i) => (
                                  <option key={i + 1} value={i + 1}>
                                    {i + 1} year{i + 1 > 1 ? 's' : ''}
                                  </option>
                                ))}
                              </select>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-outline add-room-btn"
                  onClick={addRoom}
                  disabled={searchParams.rooms.length >= 5}
                >
                  <Plus size={16} />
                  Add Another Room
                </button>
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-search">
          <Search size={20} />
          Search Hotels
        </button>
      </form>

      <div className="popular-destinations">
        <h2>Popular Destinations</h2>
        <div className="destinations-grid">
          <div className="destination-card">
            <div className="destination-image" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}></div>
            <h3>New York</h3>
            <p>From $120/night</p>
          </div>
          <div className="destination-card">
            <div className="destination-image" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}></div>
            <h3>Paris</h3>
            <p>From $95/night</p>
          </div>
          <div className="destination-card">
            <div className="destination-image" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}></div>
            <h3>Dubai</h3>
            <p>From $150/night</p>
          </div>
          <div className="destination-card">
            <div className="destination-image" style={{background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}></div>
            <h3>Tokyo</h3>
            <p>From $110/night</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelSearch
