'use client'

import { createContext, useContext } from 'react'

type StreamState = {
  volume: number
}

const initialState: StreamState = {
  volume: 0
}

export const StreamContext = createContext<StreamState | undefined>(undefined)

export function StreamProvider({ children }: { children: React.ReactNode }) {
  return (
    <StreamContext.Provider value={initialState}>
      {children}
    </StreamContext.Provider>
  )
}

export function useStream() {
  const context = useContext(StreamContext)
  if (context === undefined) {
    throw new Error('useStream must be used within a StreamProvider')
  }
  return context
}