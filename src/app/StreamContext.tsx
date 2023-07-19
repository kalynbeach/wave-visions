'use client'

import { createContext, useContext, useState } from 'react'

type StreamState = {
  mediaDevice: MediaDeviceInfo | null
  volume: number
}

const initialState: StreamState = {
  mediaDevice: null,
  volume: 0
}

export const StreamContext = createContext<
  [StreamState, React.Dispatch<React.SetStateAction<StreamState>>] | undefined
>(undefined)

export function StreamProvider({ children }: { children: React.ReactNode }) {
  const [streamState, setStreamState] = useState<StreamState>(initialState)
  return (
    <StreamContext.Provider value={[streamState, setStreamState]}>
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