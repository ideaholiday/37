import { formatDuration, formatTimeRange } from '../../types/flight'
import './roundtrip.css'

export default function RoundTripFlightCard({ outbound, inbound, totalPrice, currency = 'USD', onSelect }) {
  const outTimes = formatTimeRange(outbound.departureTime, outbound.arrivalTime)
  const inTimes = formatTimeRange(inbound.departureTime, inbound.arrivalTime)

  return (
    <div className="rt-card">
      <section className="rt-pane">
        <h3 className="rt-title">Outbound</h3>
        <div className="rt-airline">
          {outbound.airlineLogoUrl ? (
            <img src={outbound.airlineLogoUrl} alt={outbound.airlineName} className="rt-logo" />
          ) : <div className="rt-logo rt-logo--placeholder" />}
          <div className="rt-airline-name">{outbound.airlineName}</div>
        </div>
        <div className="rt-grid">
          <div>
            <div className="rt-time">{outTimes.dep}</div>
            <div className="rt-airport">{outbound.origin}</div>
          </div>
          <div className="rt-mid">
            <div className="rt-duration">{formatDuration(outbound.durationMinutes)}</div>
            <div className="rt-line" />
            <div className="rt-stops">{outbound.stops ? `${outbound.stops} stop${outbound.stops>1?'s':''}` : 'Non-stop'}</div>
          </div>
          <div className="rt-right">
            <div className="rt-time">{outTimes.arr}</div>
            <div className="rt-airport">{outbound.destination}</div>
          </div>
        </div>
      </section>

      <aside className="rt-price">
        <div className="rt-price-label">Total Price</div>
        <div className="rt-price-value">{currency} {Number(totalPrice).toLocaleString()}</div>
      </aside>

      <section className="rt-pane rt-pane--bordered">
        <h3 className="rt-title">Inbound</h3>
        <div className="rt-airline">
          {inbound.airlineLogoUrl ? (
            <img src={inbound.airlineLogoUrl} alt={inbound.airlineName} className="rt-logo" />
          ) : <div className="rt-logo rt-logo--placeholder" />}
          <div className="rt-airline-name">{inbound.airlineName}</div>
        </div>
        <div className="rt-grid">
          <div>
            <div className="rt-time">{inTimes.dep}</div>
            <div className="rt-airport">{inbound.origin}</div>
          </div>
          <div className="rt-mid">
            <div className="rt-duration">{formatDuration(inbound.durationMinutes)}</div>
            <div className="rt-line" />
            <div className="rt-stops">{inbound.stops ? `${inbound.stops} stop${inbound.stops>1?'s':''}` : 'Non-stop'}</div>
          </div>
          <div className="rt-right">
            <div className="rt-time">{inTimes.arr}</div>
            <div className="rt-airport">{inbound.destination}</div>
          </div>
        </div>
      </section>

      <div className="rt-cta">
        <button className="rt-btn" onClick={() => onSelect?.(outbound, inbound)}>Select Trip</button>
      </div>
    </div>
  )
}
