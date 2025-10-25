import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import FlightSearch from './pages/FlightSearch'
import FlightResults from './pages/FlightResults'
import FlightReview from './pages/FlightReview'
import FlightBooking from './pages/FlightBooking'
import RoundTripResults from './pages/RoundTripResults'
import HotelSearch from './pages/HotelSearch'
import HotelResults from './pages/HotelResults'
import HotelReview from './pages/HotelReview'
import HotelBooking from './pages/HotelBooking'
import Voucher from './pages/Voucher'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<FlightSearch />} />
            <Route path="/flights/results" element={<FlightResults />} />
            <Route path="/flights/round-trip/results" element={<RoundTripResults />} />
            <Route path="/flights/review" element={<FlightReview />} />
            <Route path="/flights/booking" element={<FlightBooking />} />
            <Route path="/hotels" element={<HotelSearch />} />
            <Route path="/hotels/results" element={<HotelResults />} />
            <Route path="/hotels/review" element={<HotelReview />} />
            <Route path="/hotels/booking" element={<HotelBooking />} />
            <Route path="/voucher/:type/:id" element={<Voucher />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
