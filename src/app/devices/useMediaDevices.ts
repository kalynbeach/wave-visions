'use client'

import { useState, useEffect } from 'react'
import { useStream } from '../StreamContext'

export default function useMediaDevices() {
  const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfo[]>()
  const [streamState, setStreamState] = useStream()

  useEffect(() => {
    async function fetchMediaDevices() {
      // Get user permission to access media device labels
      await navigator.mediaDevices.getUserMedia({ audio: true })
      const devices = await navigator.mediaDevices.enumerateDevices()
      setMediaDevices(devices)
      // setStreamState({ ...streamState, devices })
    }
    fetchMediaDevices()
    return () => {}
  }, [])

  return mediaDevices
}