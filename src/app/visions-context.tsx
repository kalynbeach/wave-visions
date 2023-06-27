'use client'

import { createContext, useContext, useState } from 'react'

type VisionsState = {
  selected: string
}

const initialState: VisionsState = {
  selected: 'Boxes'
}

export const VisionsContext = createContext<
  [VisionsState, React.Dispatch<React.SetStateAction<VisionsState>>] | undefined
>(undefined)

export function VisionsProvider({ children }: { children: React.ReactNode }) {
  const [visionsState, setVisionsState] = useState<VisionsState>(initialState)
  return (
    <VisionsContext.Provider value={[visionsState, setVisionsState]}>
      {children}
    </VisionsContext.Provider>
  )
}

export function useVisions() {
  const context = useContext(VisionsContext)
  if (context === undefined) {
    throw new Error('useVisions must be used within a VisionsProvider')
  }
  return context
}