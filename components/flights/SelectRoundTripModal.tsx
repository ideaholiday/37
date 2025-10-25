"use client";

import { useEffect, useMemo, useState } from 'react';
import { formatDuration, formatTimeRange, type FlightSegment } from '@/types/flight';
import { useFlightSelectionStore } from '@/lib/store/flightSelection';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  outbound: FlightSegment;
  inboundOptions: FlightSegment[];
  currency?: string;
  onConfirm?: (outbound: FlightSegment, inbound: FlightSegment) => void;
};

export default function SelectRoundTripModal({ isOpen, onClose, outbound, inboundOptions, currency = 'USD', onConfirm }: Props) {
  const { setHoverInbound, setInbound, selectedInbound, hoverTotalPrice, totalPrice } = useFlightSelectionStore();
  const [localSelected, setLocalSelected] = useState<FlightSegment | undefined>(selectedInbound);

  useEffect(() => {
    if (!isOpen) {
      setHoverInbound(undefined);
    }
  }, [isOpen, setHoverInbound]);

  if (!isOpen) return null;

  const outTimes = formatTimeRange(outbound.departureTime, outbound.arrivalTime);
  const outPrice = outbound.price;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-3xl max-h-[85vh] rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Select Inbound Flight</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>
          <div className="mt-3">
            <div className="text-sm text-gray-600">Outbound</div>
            <div className="mt-1 flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium">{outbound.airlineName}</span>
                <span className="text-gray-500"> · {outbound.origin} → {outbound.destination}</span>
                <span className="text-gray-500"> · {outTimes.dep}–{outTimes.arr}</span>
              </div>
              <div className="text-sm font-semibold">{currency} {outPrice.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[55vh] divide-y divide-gray-100">
          {inboundOptions.map((inb) => {
            const times = formatTimeRange(inb.departureTime, inb.arrivalTime);
            const additional = inb.price;
            return (
              <button
                key={inb.id}
                className="w-full text-left py-3 hover:bg-gray-50 rounded-md px-2"
                onMouseEnter={() => setHoverInbound(inb)}
                onMouseLeave={() => setHoverInbound(undefined)}
                onClick={() => setLocalSelected(inb)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm">
                      <span className="font-medium">{inb.airlineName}</span>
                      <span className="text-gray-500"> · {inb.origin} → {inb.destination}</span>
                      <span className="text-gray-500"> · {times.dep}–{times.arr}</span>
                    </div>
                    <div className="text-xs text-gray-500">{formatDuration(inb.durationMinutes)} · {inb.stops ? `${inb.stops} stop${inb.stops>1?'s':''}` : 'Non-stop'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">+ {currency} {additional.toLocaleString()}</div>
                  </div>
                </div>
              </button>
            );
          })}
          {inboundOptions.length === 0 && (
            <div className="text-sm text-gray-500">No inbound flights available for this selection.</div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-wide text-gray-500">Total Trip Price</div>
            <div className="text-lg font-bold">{currency} {hoverTotalPrice().toLocaleString()}</div>
          </div>
          <button
            type="button"
            disabled={!localSelected}
            onClick={() => {
              if (!localSelected) return;
              setInbound(localSelected);
              onConfirm?.(outbound, localSelected);
              onClose();
            }}
            className={
              !localSelected
                ? 'opacity-60 cursor-not-allowed rounded-md bg-blue-600 text-white px-4 py-2'
                : 'rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700'
            }
          >
            Confirm Trip
          </button>
        </div>
      </div>
    </div>
  );
}
