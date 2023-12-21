"use client";

import { createContext, useContext, useCallback, useEffect, useState } from "react";
import type { AudioProcessor } from "@/lib/audio-processor";
import type { AudioFrequencies } from "@/lib/definitions";

type AudioFrequenciesState = AudioFrequencies;

const initialState: AudioFrequenciesState = {
  subBass: 0,
  bass: 0,
  lowMidrange: 0,
  midrange: 0,
  upperMidrange: 0,
  presence: 0,
  brilliance: 0,
};

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

export function useAudioFrequencies(audioProcessor: AudioProcessor | null) {
  const context = useContext(AudioFrequenciesContext);

  if (context === undefined) {
    throw new Error("useAudioFrequencies must be used within a AudioFrequenciesProvider");
  }

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