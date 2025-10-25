// Helpers and lightweight types for flight segments in the Vite app

/** @typedef {string} AirportCode */

/**
 * @typedef {Object} FlightSegment
 * @property {string} id
 * @property {string} airlineCode
 * @property {string} airlineName
 * @property {string=} airlineLogoUrl
 * @property {AirportCode} origin
 * @property {AirportCode} destination
 * @property {string} departureTime // ISO datetime
 * @property {string} arrivalTime   // ISO datetime
 * @property {number} durationMinutes
 * @property {number} stops
 * @property {number} price
 * @property {('Economy'|'PremiumEconomy'|'Business'|'First')=} cabinClass
 */

export function formatTimeRange(departureISO, arrivalISO) {
  const dep = new Date(departureISO)
  const arr = new Date(arrivalISO)
  const pad = (n) => String(n).padStart(2, '0')
  return { dep: `${pad(dep.getHours())}:${pad(dep.getMinutes())}`, arr: `${pad(arr.getHours())}:${pad(arr.getMinutes())}` }
}

export function formatDuration(mins) {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${h}h ${m}m`
}

/** @param {FlightSegment} outbound @param {FlightSegment} inbound */
export function canPair(outbound, inbound) {
  const locOkay = outbound.destination === inbound.origin && outbound.origin === inbound.destination
  const timeOkay = new Date(inbound.departureTime).getTime() > new Date(outbound.arrivalTime).getTime()
  return locOkay && timeOkay
}
