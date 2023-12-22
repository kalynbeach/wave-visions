"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useMediaDevices } from "@/contexts/media-devices";

type AudioStreamState = MediaStream | null;

const initialState: AudioStreamState = null;

const AudioStreamContext = createContext<
  [AudioStreamState, React.Dispatch<React.SetStateAction<AudioStreamState>>] | undefined
>(undefined);

export function useAudioStream() {
  const context = useContext(AudioStreamContext);
  if (context === undefined) {
    throw new Error("useAudioStream must be used within a AudioStreamProvider");
  }
  return context;
}

export function AudioStreamProvider({ children }: { children: React.ReactNode }) {
  const [mediaDevices] = useMediaDevices();
  const [audioStream, setAudioStream] = useState<AudioStreamState>(initialState);

  useEffect(() => {
    async function fetchAudioStream(audioDevice: MediaDeviceInfo) {
      console.log(`[fetchAudioStream] audioDevice: `, audioDevice);
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: audioDevice.deviceId,
          },
        });
        console.log(`[fetchAudioStream] audioStream: `, audioStream);
        setAudioStream(prevState => audioStream);
        // setAudioStream(audioStream);
      } catch (error) {
        console.error(`[fetchAudioStream] ERROR: `, error);
      }
    }

    if (mediaDevices.audioDevice) {
      fetchAudioStream(mediaDevices.audioDevice);
    }

    return () => {
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaDevices.devices, mediaDevices.audioDevice]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AudioStreamContext.Provider value={[audioStream, setAudioStream]}>
      {children}
    </AudioStreamContext.Provider>
  );
}