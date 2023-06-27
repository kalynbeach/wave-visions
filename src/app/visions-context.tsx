'use client'

import { createContext, useContext } from 'react'

type VisionsState = {
  selected: string
}

const initialState: VisionsState = {
  selected: 'Boxes'
}

export const VisionsContext = createContext<VisionsState | undefined>(undefined)

export function VisionsProvider({ children }: { children: React.ReactNode }) {
  // const [state, setState] = useState<VisionsState>(initialState)
  return (
    <VisionsContext.Provider value={initialState}>
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