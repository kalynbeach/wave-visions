'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { useAudioDevice } from './audio-device-context';


const DEFAULT_AUDIO_DEVICE_LABEL = "Music Audio";
const BACKUP_AUDIO_DEVICE_LABEL = "MacBook Pro Microphone";


export type MediaDevicesState = {
  devices: MediaDeviceInfo[];
}


const initialState: MediaDevicesState = {
  devices: [],
};


export const MediaDevicesContext = createContext<
  [MediaDevicesState, React.Dispatch<React.SetStateAction<MediaDevicesState>>] | undefined
>(undefined);


export function MediaDevicesProvider({ children }: { children: React.ReactNode }) {
  const [mediaDevices, setMediaDevices] = useState<MediaDevicesState>(initialState);
  return (
    <MediaDevicesContext.Provider value={[mediaDevices, setMediaDevices]}>
      {children}
    </MediaDevicesContext.Provider>
  );
}


export function useMediaDevices() {
  const context = useContext(MediaDevicesContext);
  if (context === undefined) {
    throw new Error('useMediaDevices must be used within a MediaDevicesProvider');
  }

  const [mediaDevices, setMediaDevices] = context;
  const [audioDevice, setAudioDevice] = useAudioDevice();

  useEffect(() => {
    async function fetchMediaDevices() {
      try {
        // Get user permission to access media device labels
        await navigator.mediaDevices.getUserMedia({ audio: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        setMediaDevices({ ...mediaDevices, devices });  
      } catch (error) {
        console.error(`[fetchMediaDevices] ERROR: `, error);
      }
    }

    fetchMediaDevices();
    console.log(`[useMediaDevices] mediaDevices: `, mediaDevices);
    return () => {};
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const defaultDevice = mediaDevices.devices.find(
      (device) => device.label === DEFAULT_AUDIO_DEVICE_LABEL
    ) || mediaDevices.devices.find(
      (device) => device.label === BACKUP_AUDIO_DEVICE_LABEL
    ) || mediaDevices.devices[0];
    setAudioDevice({ ...audioDevice, device: defaultDevice });
    console.log(`[useMediaDevices] audioDevice: `, audioDevice);
    return () => {};
  }, [mediaDevices.devices]); // eslint-disable-line react-hooks/exhaustive-deps

  return context;
}