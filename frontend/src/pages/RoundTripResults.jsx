import InboundFlightSelector from '../components/flights/InboundFlightSelector'

function mockSegments(){
  const now = new Date()
  const addHours = (h)=> new Date(now.getTime()+h*3600000).toISOString()
  const outbound = [
    { id:'O1', airlineCode:'AI', airlineName:'Air India', origin:'JFK', destination:'LHR', departureTime:addHours(24), arrivalTime:addHours(31), durationMinutes:420, stops:0, price:450, cabinClass:'Economy' },
    { id:'O2', airlineCode:'BA', airlineName:'British Airways', origin:'JFK', destination:'LHR', departureTime:addHours(26), arrivalTime:addHours(34), durationMinutes:480, stops:1, price:410, cabinClass:'Economy' },
  ]
  const inbound = [
    { id:'I1', airlineCode:'AI', airlineName:'Air India', origin:'LHR', destination:'JFK', departureTime:addHours(48), arrivalTime:addHours(55), durationMinutes:420, stops:0, price:470, cabinClass:'Economy' },
    { id:'I2', airlineCode:'BA', airlineName:'British Airways', origin:'LHR', destination:'JFK', departureTime:addHours(50), arrivalTime:addHours(58), durationMinutes:480, stops:1, price:390, cabinClass:'Economy' },
  ]
  return { outbound, inbound }
}

export default function RoundTripResults(){
  const { outbound, inbound } = mockSegments()
  return (
    <div className="page-container">
      <h1 className="page-title">Round-Trip Results</h1>
      <InboundFlightSelector outboundOptions={outbound} inboundOptions={inbound} currency="USD" />
    </div>
  )
}
