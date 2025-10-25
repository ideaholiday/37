"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { canPair, type FlightSegment } from '@/types/flight';
import { useFlightSelectionStore } from '@/lib/store/flightSelection';
import SelectRoundTripModal from './SelectRoundTripModal';

type Props = {
  outboundOptions: FlightSegment[];
  inboundOptions: FlightSegment[];
  currency?: string;
};

export default function InboundFlightSelector({ outboundOptions, inboundOptions, currency = 'USD' }: Props) {
  const { selectedOutbound, selectedInbound, setOutbound, setInbound, totalPrice } = useFlightSelectionStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [compatibleInbound, setCompatibleInbound] = useState<FlightSegment[]>([]);
  const router = useRouter();
  const params = useSearchParams();

  // Filter inbound options when outbound changes
  useEffect(() => {
    if (selectedOutbound) {
      const filtered = inboundOptions.filter((inb) => canPair(selectedOutbound, inb));
      setCompatibleInbound(filtered);
    } else {
      setCompatibleInbound([]);
    }
  }, [selectedOutbound, inboundOptions]);

  // Sync state -> URL
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedOutbound) url.searchParams.set('outboundId', selectedOutbound.id);
    else url.searchParams.delete('outboundId');
    if (selectedInbound) url.searchParams.set('inboundId', selectedInbound.id);
    else url.searchParams.delete('inboundId');
    window.history.replaceState({}, '', url.toString());
  }, [selectedOutbound, selectedInbound]);

  // On mount: URL -> state
  useEffect(() => {
    const outboundId = params.get('outboundId');
    const inboundId = params.get('inboundId');
    if (outboundId && !selectedOutbound) {
      const o = outboundOptions.find((x) => x.id === outboundId);
      if (o) setOutbound(o);
    }
    if (inboundId && !selectedInbound) {
      const i = inboundOptions.find((x) => x.id === inboundId);
      if (i) setInbound(i);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Outbound list */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Outbound Flights</h2>
        <div className="space-y-3">
          {outboundOptions.map((o) => (
            <button
              key={o.id}
              onClick={() => setOutbound(o)}
              className={`w-full text-left p-4 rounded-lg border ${selectedOutbound?.id === o.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{o.airlineName}</div>
                  <div className="text-sm text-gray-600">{o.origin} → {o.destination}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{currency} {o.price.toLocaleString()}</div>
                </div>
              </div>
              <div className="mt-1 text-xs text-gray-500">Dep {new Date(o.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · Arr {new Date(o.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {o.stops ? `${o.stops} stop${o.stops>1?'s':''}` : 'Non-stop'}</div>
              <div className="mt-3">
                <button type="button" className="text-sm text-blue-600 hover:underline" onClick={(e) => { e.stopPropagation(); setOutbound(o); setModalOpen(true); }}>
                  Select Outbound
                </button>
              </div>
            </button>
          ))}
          {outboundOptions.length === 0 && <div className="text-sm text-gray-500">No outbound flights found.</div>}
        </div>
      </div>

      {/* Inbound list shown after selecting outbound */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Inbound Flights</h2>
        {!selectedOutbound ? (
          <div className="text-sm text-gray-500">Select an outbound flight to see compatible inbound options.</div>
        ) : (
          <div className="space-y-3">
            {compatibleInbound.map((i) => (
              <button
                key={i.id}
                onClick={() => setInbound(i)}
                className={`w-full text-left p-4 rounded-lg border ${selectedInbound?.id === i.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{i.airlineName}</div>
                    <div className="text-sm text-gray-600">{i.origin} → {i.destination}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">+ {currency} {i.price.toLocaleString()}</div>
                  </div>
                </div>
              </button>
            ))}
            {compatibleInbound.length === 0 && <div className="text-sm text-gray-500">No compatible inbound flights for the selected outbound.</div>}
          </div>
        )}

        {selectedOutbound && (
          <div className="mt-4 p-4 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500">Total Trip Price</div>
              <div className="text-lg font-bold">{currency} {totalPrice().toLocaleString()}</div>
            </div>
            <button
              type="button"
              disabled={!selectedInbound}
              className={!selectedInbound ? 'opacity-60 cursor-not-allowed rounded-md bg-blue-600 text-white px-4 py-2' : 'rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700'}
            >
              Continue
            </button>
          </div>
        )}
      </div>

      {/* Modal flow */}
      {selectedOutbound && (
        <SelectRoundTripModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          outbound={selectedOutbound}
          inboundOptions={compatibleInbound}
          currency={currency}
          onConfirm={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
