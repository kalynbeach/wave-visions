"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAudioDevice } from "./audio-device-context";


type AudioStreamState = {
  device: MediaDeviceInfo | undefined;
  stream: MediaStream | undefined;
  volume: number;
};


const initialState: AudioStreamState = {
  device: undefined,
  stream: undefined,
  volume: 0,
};


export const AudioStreamContext = createContext<
  [AudioStreamState, React.Dispatch<React.SetStateAction<AudioStreamState>>] | undefined
>(undefined);


export function AudioStreamProvider({ children }: { children: React.ReactNode }) {
  const [audioStream, setAudioStream] = useState<AudioStreamState>(initialState);
  return (
    <AudioStreamContext.Provider value={[audioStream, setAudioStream]}>
      {children}
    </AudioStreamContext.Provider>
  );
}


export function useAudioStream() {
  const context = useContext(AudioStreamContext);
  if (context === undefined) {
    throw new Error("useAudioStream must be used within a AudioStreamProvider");
  }

  const [audioDevice] = useAudioDevice();
  const [audioStream, setAudioStream] = context;

  useEffect(() => {
    async function fetchAudioStream(audioDevice: MediaDeviceInfo) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: audioDevice.deviceId,
          },
        });
        processAudioStream(stream, audioDevice);
      } catch (error) {
        console.error(`[useAudioStream fetchAudioStream] ERROR: `, error);
      }
    }

    function processAudioStream(stream: MediaStream, audioDevice: MediaDeviceInfo) {
      // Initialize AudioContext nodes
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 32;
      source.connect(analyser);
      // Set audio data
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      // Update audioStream.volume with computed volume
      const updateVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        const avgVolume = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
        setAudioStream({ ...audioStream, device: audioDevice, stream, volume: avgVolume});
        requestAnimationFrame(updateVolume);
      };
      updateVolume();
    }

    if (audioDevice.device) {
      fetchAudioStream(audioDevice.device);
    }

    return () => {};
  }, [audioDevice.device]); // eslint-disable-line react-hooks/exhaustive-deps

  return context;
}