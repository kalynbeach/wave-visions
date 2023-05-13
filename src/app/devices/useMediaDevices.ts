'use client'

import { useState, useEffect } from 'react'

export default function useMediaDevices() {
  const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfo[]>()

  useEffect(() => {
    async function fetchMediaDevices() {
      const devices = await navigator.mediaDevices.enumerateDevices()
      setMediaDevices(devices)
    }
    fetchMediaDevices()
    return () => {}
  }, [])

  return mediaDevices
}