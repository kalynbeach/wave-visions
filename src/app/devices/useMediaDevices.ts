'use client'

import { useState, useEffect } from 'react'

export default function useMediaDevices() {
  const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfo[]>()

  useEffect(() => {
    async function fetchMediaDevices() {
      // Get user permission to access media device labels
      await navigator.mediaDevices.getUserMedia({ audio: true })
      const devices = await navigator.mediaDevices.enumerateDevices()
      console.log('[MediaDevices] devices: ', devices)
      setMediaDevices(devices)
    }
    fetchMediaDevices()
    return () => {}
  }, [])

  return mediaDevices
}