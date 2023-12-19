"use client";

import { createContext, useContext, useCallback, useEffect, useState } from "react";
import { useAudioProcessor } from "./audio-processor-context";
import type { AudioProcessor } from "@/lib/audio";
import type { AudioFrequencies } from "@/lib/definitions";

type AudioFrequenciesState = AudioFrequencies | null;

const initialState: AudioFrequenciesState = null;

export const AudioFrequenciesContext = createContext<
  [AudioFrequenciesState, React.Dispatch<React.SetStateAction<AudioFrequenciesState>>] | undefined
>(undefined);

export function AudioFrequenciesProvider({ children }: { children: React.ReactNode }) {
  const [audioFrequencies, setAudioFrequencies] = useState<AudioFrequenciesState>(initialState);
  return (
    <AudioFrequenciesContext.Provider value={[audioFrequencies, setAudioFrequencies]}>
      {children}
    </AudioFrequenciesContext.Provider>
  );
}

export function useAudioFrequencies() {
  const context = useContext(AudioFrequenciesContext);

  if (context === undefined) {
    throw new Error("useAudioFrequencies must be used within a AudioFrequenciesProvider");
  }

  const [audioProcessor] = useAudioProcessor();
  const [audioFrequencies, setAudioFrequencies] = context;

  // Process audio stream frequency data
  useEffect(() => {
    let animationFrameId: number;

    function processFrequencies(processor: AudioProcessor) {
      const updateFrequencies = () => {
        const frequencies = processor.getFrequencies();
        setAudioFrequencies(prevState => frequencies);
        animationFrameId = requestAnimationFrame(updateFrequencies);
      }
      updateFrequencies();
    }

    if (audioProcessor) {
      processFrequencies(audioProcessor);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [audioProcessor]); // eslint-disable-line react-hooks/exhaustive-deps

  return [audioFrequencies, setAudioFrequencies] as const;
}