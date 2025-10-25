import { useEffect, useMemo, useState } from 'react'
import { canPair } from '../../types/flight'
import { useFlightSelectionStore } from '../../store/flightSelection'
import SelectRoundTripModal from './SelectRoundTripModal'
import './roundtrip.css'

export default function InboundFlightSelector({ outboundOptions, inboundOptions, currency = 'USD' }){
  const { selectedOutbound, selectedInbound, setOutbound, setInbound, totalPrice } = useFlightSelectionStore()
  const [isModalOpen, setModalOpen] = useState(false)
  const [compatibleInbound, setCompatibleInbound] = useState([])

  useEffect(() => {
    if (selectedOutbound) {
      setCompatibleInbound(inboundOptions.filter(i => canPair(selectedOutbound, i)))
    } else {
      setCompatibleInbound([])
    }
  }, [selectedOutbound, inboundOptions])

  // URL sync
  useEffect(() => {
    const url = new URL(window.location.href)
    if (selectedOutbound) url.searchParams.set('outboundId', selectedOutbound.id)
    else url.searchParams.delete('outboundId')
    if (selectedInbound) url.searchParams.set('inboundId', selectedInbound.id)
    else url.searchParams.delete('inboundId')
    window.history.replaceState({}, '', url.toString())
  }, [selectedOutbound, selectedInbound])

  // URL -> state on mount
  useEffect(() => {
    const url = new URL(window.location.href)
    const outboundId = url.searchParams.get('outboundId')
    const inboundId = url.searchParams.get('inboundId')
    if (outboundId && !selectedOutbound) {
      const o = outboundOptions.find(x => x.id === outboundId)
      if (o) setOutbound(o)
    }
    if (inboundId && !selectedInbound) {
      const i = inboundOptions.find(x => x.id === inboundId)
      if (i) setInbound(i)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="rt-grid-2">
      <div>
        <h2 className="rt-h2">Outbound Flights</h2>
        <div className="rt-stack">
          {outboundOptions.map((o) => (
            <button key={o.id} onClick={() => setOutbound(o)} className={`rt-item ${selectedOutbound?.id === o.id ? 'rt-item--active' : ''}`}>
              <div className="rt-row">
                <div>
                  <div className="rt-bold">{o.airlineName}</div>
                  <div className="rt-dim rt-sm">{o.origin} → {o.destination}</div>
                </div>
                <div className="rt-right rt-bold">{currency} {o.price.toLocaleString()}</div>
              </div>
              <div className="rt-dim rt-xs">Dep {new Date(o.departureTime).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})} · Arr {new Date(o.arrivalTime).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})} · {o.stops ? `${o.stops} stop${o.stops>1?'s':''}` : 'Non-stop'}</div>
              <div className="rt-actions">
                <button type="button" className="rt-link" onClick={(e)=>{e.stopPropagation(); setOutbound(o); setModalOpen(true)}}>Select Outbound</button>
              </div>
            </button>
          ))}
          {outboundOptions.length === 0 && <div className="rt-dim rt-sm">No outbound flights found.</div>}
        </div>
      </div>

      <div>
        <h2 className="rt-h2">Inbound Flights</h2>
        {!selectedOutbound ? (
          <div className="rt-dim rt-sm">Select an outbound flight to see compatible inbound options.</div>
        ) : (
          <div className="rt-stack">
            {compatibleInbound.map((i) => (
              <button key={i.id} onClick={() => setInbound(i)} className={`rt-item ${selectedInbound?.id === i.id ? 'rt-item--active' : ''}`}>
                <div className="rt-row">
                  <div>
                    <div className="rt-bold">{i.airlineName}</div>
                    <div className="rt-dim rt-sm">{i.origin} → {i.destination}</div>
                  </div>
                  <div className="rt-right rt-bold">+ {currency} {i.price.toLocaleString()}</div>
                </div>
              </button>
            ))}
            {compatibleInbound.length === 0 && <div className="rt-dim rt-sm">No compatible inbound flights for the selected outbound.</div>}
          </div>
        )}

        {selectedOutbound && (
          <div className="rt-total">
            <div>
              <div className="rt-footer-label">Total Trip Price</div>
              <div className="rt-footer-total">{currency} {totalPrice().toLocaleString()}</div>
            </div>
            <button type="button" className={!selectedInbound ? 'rt-btn rt-btn--disabled' : 'rt-btn'} disabled={!selectedInbound}>Continue</button>
          </div>
        )}
      </div>

      {selectedOutbound && (
        <SelectRoundTripModal isOpen={isModalOpen} onClose={()=>setModalOpen(false)} outbound={selectedOutbound} inboundOptions={compatibleInbound} currency={currency} onConfirm={()=>setModalOpen(false)} />
      )}
    </div>
  )
}
