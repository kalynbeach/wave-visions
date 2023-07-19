'use client'

import { useEffect } from 'react'
import { useStream } from '../StreamContext'

export default function useUserMedia() {
  const [streamState, setStreamState] = useStream()

  useEffect(() => {
    async function getAudioStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        console.log(`[getAudioStream] stream: `, stream)
        processAudioStream(stream)
      } catch (err) {
        console.error('[MediaDevices] Error getting audio stream: ', err)
      }
    }
  
    function processAudioStream(stream: MediaStream) {
      const audioContext = new AudioContext()
      const source = audioContext.createMediaStreamSource(stream)
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 32
  
      source.connect(analyser)
  
      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
  
      const updateVolume = () => {
        analyser.getByteFrequencyData(dataArray)
        const avgVolume = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength
        setStreamState({ ...streamState, volume: avgVolume})
        requestAnimationFrame(updateVolume)
      }

      updateVolume()
    }

    getAudioStream()
    return () => {}
  }, [])

  return streamState
}