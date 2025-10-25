import { create } from 'zustand'

export const useFlightSelectionStore = create((set, get) => ({
  selectedOutbound: undefined,
  selectedInbound: undefined,
  hoverInbound: undefined,
  currency: 'USD',
  setOutbound: (seg) => set({ selectedOutbound: seg, selectedInbound: undefined, hoverInbound: undefined }),
  setInbound: (seg) => set({ selectedInbound: seg }),
  setHoverInbound: (seg) => set({ hoverInbound: seg || undefined }),
  reset: () => set({ selectedOutbound: undefined, selectedInbound: undefined, hoverInbound: undefined }),
  totalPrice: () => {
    const { selectedOutbound, selectedInbound } = get()
    return (selectedOutbound?.price || 0) + (selectedInbound?.price || 0)
  },
  hoverTotalPrice: () => {
    const { selectedOutbound, hoverInbound, selectedInbound } = get()
    const inbound = hoverInbound || selectedInbound
    return (selectedOutbound?.price || 0) + (inbound?.price || 0)
  },
}))
