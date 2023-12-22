"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const DEFAULT_AUDIO_DEVICE_LABEL = "Music Audio (Virtual)";
const FALLBACK_AUDIO_DEVICE_LABEL = "MacBook Pro Microphone (Built-in)";

type MediaDevicesState = {
  devices: MediaDeviceInfo[] | null;
  audioDevice: MediaDeviceInfo | null;
};

const initialState: MediaDevicesState = {
  devices: [],
  audioDevice: null,
};

const MediaDevicesContext = createContext<
  [MediaDevicesState, React.Dispatch<React.SetStateAction<MediaDevicesState>>] | undefined
>(undefined);

export function useMediaDevices() {
  const context = useContext(MediaDevicesContext);
  if (context === undefined) {
    throw new Error('useMediaDevices must be used within a MediaDevicesProvider');
  }
  return context;
}

export function MediaDevicesProvider({ children }: { children: React.ReactNode }) {
  const [mediaDevices, setMediaDevices] = useState<MediaDevicesState>(initialState);

  // Initialize media devices state
  useEffect(() => {
    async function fetchMediaDevices() {
      try {
        // Get user permission to access media device labels
        await navigator.mediaDevices.getUserMedia({ audio: true });

        // `audio.devices`
        const devices = (await navigator.mediaDevices.enumerateDevices())
          .filter((device) => device.kind === "audioinput");

        // `audio.device`
        const audioDevice = devices.find(
          (device) => device.label === DEFAULT_AUDIO_DEVICE_LABEL
        ) || devices.find(
          (device) => device.label === FALLBACK_AUDIO_DEVICE_LABEL
        ) || devices[0];

        setMediaDevices(prevState => ({ devices, audioDevice }));
      } catch (error) {
        console.error(`[initMediaDevices] ERROR: `, error);
      }
    }

    fetchMediaDevices();

    return () => {
      // cleanup?
    };
  }, []);

  return (
    <MediaDevicesContext.Provider value={[mediaDevices, setMediaDevices]}>
      {children}
    </MediaDevicesContext.Provider>
  );
}