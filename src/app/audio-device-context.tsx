"use client";

import { createContext, useContext, useEffect, useState } from "react";


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

  return context;
}