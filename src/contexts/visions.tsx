"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Vision } from "@/lib/definitions";

export enum VisionRegistry {
  Boxes = 'Boxes',
  Sphere = 'Sphere',
  Oscilloscope = 'Oscilloscope',
}

function initVisions(): Vision[] {
  // temp process
  const visionNames = Object.values(VisionRegistry);
  return visionNames.map(visionName => ({
    name: visionName,
    description: visionName, // temp
    componentName: visionName, // temp
  }));
}

type VisionsState = {
  visions: Vision[];
  activeVision: string;
};

const initialState: VisionsState = {
  visions: initVisions(),
  activeVision: VisionRegistry.Sphere,
};

const VisionsContext = createContext<
  [VisionsState, React.Dispatch<React.SetStateAction<VisionsState>>] | undefined
>(undefined);

export function useVisions() {
  const context = useContext(VisionsContext);
  if (context === undefined) {
    throw new Error("useVisions must be used within a VisionsProvider");
  }
  return context;
}

export function VisionsProvider({ children }: { children: React.ReactNode }) {
  const [visions, setVisions] = useState<VisionsState>(initialState);

  // Initialize visions state
  // useEffect(() => {
  //   async function fetchVisions() {
  //     try {
  //       const res = await fetch("/api/visions");
  //       const visions = await res.json();
  //       setVisions(prevState => ({ ...prevState, visions }));
  //     } catch (error) {
  //       console.error(`[initVisions] ERROR: `, error);
  //     }
  //   }
  //   fetchVisions();
  //   return () => {
  //     // cleanup?
  //   };
  // }, []);

  return (
    <VisionsContext.Provider value={[visions, setVisions]}>
      {children}
    </VisionsContext.Provider>
  );
}
