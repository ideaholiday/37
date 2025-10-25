"use client";

import Image from 'next/image';
import { formatDuration, formatTimeRange, type FlightSegment } from '@/types/flight';

type Props = {
  outbound: FlightSegment;
  inbound: FlightSegment;
  totalPrice: number;
  currency?: string;
  onSelect?: (outbound: FlightSegment, inbound: FlightSegment) => void;
  className?: string;
};

// Small helper since we may not have a utils.cn yet
function clsx(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(' ');
}

export default function RoundTripFlightCard({ outbound, inbound, totalPrice, currency = 'USD', onSelect, className }: Props) {
  const outTimes = formatTimeRange(outbound.departureTime, outbound.arrivalTime);
  const inTimes = formatTimeRange(inbound.departureTime, inbound.arrivalTime);

  return (
    <div className={clsx(
      'relative rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden',
      'flex flex-col md:flex-row',
      className,
    )}>
      {/* subtle shared background to visually connect */}
      <div className="absolute inset-y-0 left-1/2 w-px bg-gray-200 hidden md:block" aria-hidden />

      {/* Outbound */}
      <section className="flex-1 p-4 md:p-5">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Outbound</h3>
        <div className="flex items-center gap-3">
          {outbound.airlineLogoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={outbound.airlineLogoUrl} alt={outbound.airlineName} className="h-6 w-6 rounded" />
          ) : (
            <div className="h-6 w-6 rounded bg-gray-100" />
          )}
          <div className="text-sm text-gray-800">{outbound.airlineName}</div>
        </div>
        <div className="mt-3 grid grid-cols-3 items-center gap-3">
          <div>
            <div className="text-xl font-semibold">{outTimes.dep}</div>
            <div className="text-xs text-gray-500">{outbound.origin}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">{formatDuration(outbound.durationMinutes)}</div>
            <div className="mx-auto my-1 h-px w-16 bg-gray-300" />
            <div className="text-xs text-gray-500">{outbound.stops === 0 ? 'Non-stop' : `${outbound.stops} stop${outbound.stops > 1 ? 's' : ''}`}</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-semibold">{outTimes.arr}</div>
            <div className="text-xs text-gray-500">{outbound.destination}</div>
          </div>
        </div>
      </section>

      {/* Center price column */}
      <aside className="md:w-48 border-t md:border-t-0 md:border-l border-gray-200 flex items-center justify-center p-4 bg-gray-50">
        <div className="text-center">
          <div className="text-xs uppercase tracking-wide text-gray-500">Total Price</div>
          <div className="text-2xl font-bold text-gray-900">
            {currency} {totalPrice.toLocaleString()}
          </div>
        </div>
      </aside>

      {/* Inbound */}
      <section className="flex-1 p-4 md:p-5 border-t md:border-t-0 md:border-l border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Inbound</h3>
        <div className="flex items-center gap-3">
          {inbound.airlineLogoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={inbound.airlineLogoUrl} alt={inbound.airlineName} className="h-6 w-6 rounded" />
          ) : (
            <div className="h-6 w-6 rounded bg-gray-100" />
          )}
          <div className="text-sm text-gray-800">{inbound.airlineName}</div>
        </div>
        <div className="mt-3 grid grid-cols-3 items-center gap-3">
          <div>
            <div className="text-xl font-semibold">{inTimes.dep}</div>
            <div className="text-xs text-gray-500">{inbound.origin}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">{formatDuration(inbound.durationMinutes)}</div>
            <div className="mx-auto my-1 h-px w-16 bg-gray-300" />
            <div className="text-xs text-gray-500">{inbound.stops === 0 ? 'Non-stop' : `${inbound.stops} stop${inbound.stops > 1 ? 's' : ''}`}</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-semibold">{inTimes.arr}</div>
            <div className="text-xs text-gray-500">{inbound.destination}</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="w-full border-t border-gray-200 p-4">
        <button
          type="button"
          onClick={() => onSelect?.(outbound, inbound)}
          className="w-full rounded-md bg-blue-600 text-white py-2.5 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Select Trip
        </button>
      </div>
    </div>
  );
}
