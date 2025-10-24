import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FlightSearchParams, Flight } from '@/types/flight'

interface FlightSearchStore {
  searchParams: FlightSearchParams | null
  searchResults: Flight[]
  traceId: string | null
  selectedFlight: Flight | null
  setSearchParams: (params: FlightSearchParams) => void
  setSearchResults: (results: Flight[], traceId: string) => void
  setSelectedFlight: (flight: Flight | null) => void
  clearSearch: () => void
}

export const useFlightSearchStore = create<FlightSearchStore>()(
  persist(
    (set) => ({
      searchParams: null,
      searchResults: [],
      traceId: null,
      selectedFlight: null,

      setSearchParams: (params) => set({ searchParams: params }),
      
      setSearchResults: (results, traceId) =>
        set({ searchResults: results, traceId }),
      
      setSelectedFlight: (flight) => set({ selectedFlight: flight }),
      
      clearSearch: () =>
        set({
          searchParams: null,
          searchResults: [],
          traceId: null,
          selectedFlight: null,
        }),
    }),
    {
      name: 'flight-search-storage',
    }
  )
)
