"use client";

import { create, type StateCreator } from 'zustand';
import type { FlightSegment } from '@/types/flight';

type SelectionState = {
  selectedOutbound?: FlightSegment;
  selectedInbound?: FlightSegment;
  hoverInbound?: FlightSegment;
  currency: string;
  setOutbound: (seg?: FlightSegment) => void;
  setInbound: (seg?: FlightSegment) => void;
  setHoverInbound: (seg?: FlightSegment) => void;
  reset: () => void;
  totalPrice: () => number;
  hoverTotalPrice: () => number;
};

const creator: StateCreator<SelectionState, [], [], SelectionState> = (set, get) => ({
  selectedOutbound: undefined,
  selectedInbound: undefined,
  hoverInbound: undefined,
  currency: 'USD',
  setOutbound: (seg?: FlightSegment) => set({ selectedOutbound: seg, selectedInbound: undefined, hoverInbound: undefined }),
  setInbound: (seg?: FlightSegment) => set({ selectedInbound: seg }),
  setHoverInbound: (seg?: FlightSegment) => set({ hoverInbound: seg || undefined }),
  reset: () => set({ selectedOutbound: undefined, selectedInbound: undefined, hoverInbound: undefined }),
  totalPrice: () => {
    const { selectedOutbound, selectedInbound } = get();
    return (selectedOutbound?.price || 0) + (selectedInbound?.price || 0);
  },
  hoverTotalPrice: () => {
    const { selectedOutbound, hoverInbound, selectedInbound } = get();
    const inbound = hoverInbound || selectedInbound;
    return (selectedOutbound?.price || 0) + (inbound?.price || 0);
  },
});

export const useFlightSelectionStore = create<SelectionState>(creator);
