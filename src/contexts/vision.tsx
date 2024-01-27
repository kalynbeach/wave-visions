"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
// import { type Vision, VisionRegistry } from "@/lib/definitions";

type VisionState = {
  name: string;
  agility: number;
  intellect: number;
  strength: number;
};

const initialState: VisionState = {
  name: "Sphere",
  agility: 0,
  intellect: 0,
  strength: 0,
};

const VisionContext = createContext<
  [VisionState, React.Dispatch<React.SetStateAction<VisionState>>] | undefined
>(undefined);

export function useVision() {
  const context = useContext(VisionContext);
  if (context === undefined) {
    throw new Error("useVisions must be used within a VisionsProvider");
  }
  return context;
}

export function VisionProvider({ children }: { children: React.ReactNode }) {
  const [vision, setVision] = useState<VisionState>(initialState);
  return (
    <VisionContext.Provider value={[vision, setVision]}>
      {children}
    </VisionContext.Provider>
  );
}
