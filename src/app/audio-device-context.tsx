"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useMediaDevices } from "@/app/media-devices-context";

const DEFAULT_AUDIO_DEVICE_LABEL = "Music Audio";

type AudioDeviceState = {
  device: MediaDeviceInfo | undefined;
};

const initialState: AudioDeviceState = {
  device: undefined,
};

export const AudioDeviceContext = createContext<
  [AudioDeviceState, React.Dispatch<React.SetStateAction<AudioDeviceState>>] | undefined
>(undefined);

export function AudioDeviceProvider({ children }: { children: React.ReactNode }) {
  const [audioDevice, setAudioDevice] = useState<AudioDeviceState>(initialState);
  return (
    <AudioDeviceContext.Provider value={[audioDevice, setAudioDevice]}>
      {children}
    </AudioDeviceContext.Provider>
  );
}

export function useAudioDevice() {
  const context = useContext(AudioDeviceContext);
  if (context === undefined) {
    throw new Error("useAudioDevice must be used within a AudioDeviceProvider");
  }

  const [mediaDevices] = useMediaDevices();
  const [audioDevice, setAudioDevice] = context;

  useEffect(() => {
    setAudioDevice({
      ...audioDevice,
      device: mediaDevices.devices.find(
        (device) => device.label === DEFAULT_AUDIO_DEVICE_LABEL
      ),
    });
  }, [mediaDevices]);


  return context;
}