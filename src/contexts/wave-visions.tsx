"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { type Vision, VisionRegistry } from "@/lib/definitions";

function initVisions(): Vision[] {
  // temp process
  const visionNames = Object.values(VisionRegistry);
  return visionNames.map(visionName => ({
    name: visionName,
    description: visionName, // temp
    componentName: visionName, // temp
  }));
}

type WaveVisionsState = {
  visions: Vision[];
  activeVision: string;
  showAudioInfo: boolean;
  showVisionControls: boolean;
};

const initialState: WaveVisionsState = {
  visions: initVisions(),
  activeVision: VisionRegistry.Sphere,
  showAudioInfo: false,
  showVisionControls: false,
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