import { useEffect, useState } from 'react'
import { formatDuration, formatTimeRange } from '../../types/flight'
import { useFlightSelectionStore } from '../../store/flightSelection'
import './roundtrip.css'

export default function SelectRoundTripModal({ isOpen, onClose, outbound, inboundOptions, currency = 'USD', onConfirm }){
  const { setHoverInbound, setInbound, hoverTotalPrice } = useFlightSelectionStore()
  const [localSelected, setLocalSelected] = useState()

  useEffect(() => { if (!isOpen) setHoverInbound(undefined) }, [isOpen, setHoverInbound])
  if (!isOpen) return null

  const outTimes = formatTimeRange(outbound.departureTime, outbound.arrivalTime)

  return (
    <div className="rt-modal-root">
      <div className="rt-modal-backdrop" onClick={onClose} />
      <div className="rt-modal">
        <div className="rt-modal-header">
          <div className="rt-modal-title">Select Inbound Flight</div>
          <button className="rt-modal-close" onClick={onClose}>✕</button>
          <div className="rt-modal-sub">
            <div className="rt-subline">
              <span className="rt-bold">{outbound.airlineName}</span>
              <span className="rt-dim"> · {outbound.origin} → {outbound.destination} · {outTimes.dep}–{outTimes.arr}</span>
            </div>
            <div className="rt-bold">{currency} {outbound.price.toLocaleString()}</div>
          </div>
        </div>
        <div className="rt-modal-body">
          {inboundOptions.map((inb) => {
            const times = formatTimeRange(inb.departureTime, inb.arrivalTime)
            return (
              <button key={inb.id} className="rt-option" onMouseEnter={() => setHoverInbound(inb)} onMouseLeave={() => setHoverInbound(undefined)} onClick={() => setLocalSelected(inb)}>
                <div className="rt-option-left">
                  <div className="rt-bold">{inb.airlineName}</div>
                  <div className="rt-dim">{inb.origin} → {inb.destination} · {times.dep}–{times.arr}</div>
                  <div className="rt-dim rt-xs">{formatDuration(inb.durationMinutes)} · {inb.stops ? `${inb.stops} stop${inb.stops>1?'s':''}` : 'Non-stop'}</div>
                </div>
                <div className="rt-option-right">+ {currency} {inb.price.toLocaleString()}</div>
              </button>
            )
          })}
          {inboundOptions.length === 0 && (
            <div className="rt-dim rt-sm">No inbound flights available for this selection.</div>
          )}
        </div>
        <div className="rt-modal-footer">
          <div>
            <div className="rt-footer-label">Total Trip Price</div>
            <div className="rt-footer-total">{currency} {hoverTotalPrice().toLocaleString()}</div>
          </div>
          <button
            className={"rt-btn" + (!localSelected ? ' rt-btn--disabled' : '')}
            disabled={!localSelected}
            onClick={() => { if (!localSelected) return; setInbound(localSelected); onConfirm?.(outbound, localSelected); onClose(); }}
          >Confirm Trip</button>
        </div>
      </div>
    </div>
  )
}
