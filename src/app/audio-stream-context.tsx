"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAudioDevice } from "./audio-device-context";
import { AudioProcessor } from "@/lib/audio";


type AudioStreamState = {
  context: AudioContext | undefined;
  device: MediaDeviceInfo | undefined;
  stream: MediaStream | undefined;
};


const initialState: AudioStreamState = {
  context: undefined,
  device: undefined,
  stream: undefined,
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
  // TODO: Figure out if this is more performant as state
  // const [audioProcessor, setAudioProcessor] = useState<AudioProcessor | null>(null);

  // Fetch audio stream when audio device is set
  useEffect(() => {
    async function fetchAudioStream(device: MediaDeviceInfo) {
      console.log(`[useAudioStream fetchAudioStream] called`);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: device.deviceId,
          },
        });
        const context = new AudioContext();
        setAudioStream(prevState => ({ ...prevState, context, device, stream }));
      } catch (error) {
        console.error(`[useAudioStream fetchAudioStream] ERROR: `, error);
      }
    }

    if (audioDevice.device) {
      fetchAudioStream(audioDevice.device);
    }

    return () => {};
  }, [audioDevice.device]); // eslint-disable-line react-hooks/exhaustive-deps

  return context;
}