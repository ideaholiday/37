'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export function FlightFilters() {
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [stops, setStops] = useState<string[]>([])
  const [airlines, setAirlines] = useState<string[]>([])
  const [refundableOnly, setRefundableOnly] = useState(false)

  return (
    <Card className="p-4 sticky top-20">
      <h3 className="font-semibold mb-4">Filters</h3>
      
      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <Label className="mb-2 block">Price Range</Label>
          <div className="space-y-2">
            <Input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              Up to ₹{priceRange[1].toLocaleString()}
            </p>
          </div>
        </div>

        {/* Stops */}
        <div>
          <Label className="mb-2 block">Stops</Label>
          <div className="space-y-2">
            {['Non-stop', '1 Stop', '2+ Stops'].map((stop) => (
              <div key={stop} className="flex items-center gap-2">
                <Checkbox
                  id={stop}
                  checked={stops.includes(stop)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setStops([...stops, stop])
                    } else {
                      setStops(stops.filter((s) => s !== stop))
                    }
                  }}
                />
                <label
                  htmlFor={stop}
                  className="text-sm cursor-pointer"
                >
                  {stop}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Refundable */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="refundable"
            checked={refundableOnly}
            onCheckedChange={(checked) => setRefundableOnly(checked as boolean)}
          />
          <label htmlFor="refundable" className="text-sm cursor-pointer">
            Refundable Only
          </label>
        </div>

        {/* Clear Filters */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setPriceRange([0, 100000])
            setStops([])
            setAirlines([])
            setRefundableOnly(false)
          }}
        >
          Clear All Filters
        </Button>
      </div>
    </Card>
  )
}
