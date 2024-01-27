"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { type Vision } from "@/lib/definitions";

function initVisions(): Vision[] {
  // temp process
  const visions: Vision[] = [
    {
      name: "Sphere",
      description: "Sphere", // temp
      componentName: "Sphere", // temp
      modifiers: {
        agility: 0,
        intellect: 0,
        strength: 0,
      }
    }
  ];
  return visions;
}

type WaveVisionsState = {
  visions: Vision[];
  activeVision: string;
  showAudioInfo: boolean;
  showVisionControls: boolean;
};

const initialState: WaveVisionsState = {
  visions: initVisions(),
  activeVision: "Sphere",
  showAudioInfo: true,
  showVisionControls: true,
};

const WaveVisionsContext = createContext<
  [WaveVisionsState, React.Dispatch<React.SetStateAction<WaveVisionsState>>] | undefined
>(undefined);

export function useWaveVisions() {
  const context = useContext(WaveVisionsContext);
  if (context === undefined) {
    throw new Error("useWaveVisions must be used within a WaveVisionsProvider");
  }
  return context;
}

export function WaveVisionsProvider({ children }: { children: React.ReactNode }) {
  const [waveVisions, setWaveVisions] = useState<WaveVisionsState>(initialState);
  return (
    <WaveVisionsContext.Provider value={[waveVisions, setWaveVisions]}>
      {children}
    </WaveVisionsContext.Provider>
  );
}