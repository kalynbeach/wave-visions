'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type MediaDevicesState = {
  devices: MediaDeviceInfo[]
  activeDevice: MediaDeviceInfo | null
}

const initialState: MediaDevicesState = {
  devices: [],
  activeDevice: null
}

export const MediaDevicesContext = createContext<
  [MediaDevicesState, React.Dispatch<React.SetStateAction<MediaDevicesState>>] | undefined
>(undefined)

export function MediaDevicesProvider({ children }: { children: React.ReactNode }) {
  const [mediaDevices, setMediaDevices] = useState<MediaDevicesState>(initialState)
  return (
    <MediaDevicesContext.Provider value={[mediaDevices, setMediaDevices]}>
      {children}
    </MediaDevicesContext.Provider>
  )
}

export function useMediaDevices() {
  const context = useContext(MediaDevicesContext)
  if (context === undefined) {
    throw new Error('useMediaDevices must be used within a MediaDevicesProvider')
  }

  const [mediaDevices, setMediaDevices] = context

  useEffect(() => {
    async function fetchMediaDevices() {
      // Get user permission to access media device labels
      await navigator.mediaDevices.getUserMedia({ audio: true })
      const devices = await navigator.mediaDevices.enumerateDevices()
      setMediaDevices({ ...mediaDevices, devices })
    }
    fetchMediaDevices()
    return () => {}
  }, [])

  return context
}