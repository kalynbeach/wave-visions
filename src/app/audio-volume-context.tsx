"use client";

import { createContext, useContext, useCallback, useEffect, useState } from "react";
import { useAudioProcessor } from "./audio-processor-context";
import type { AudioProcessor } from "@/lib/audio";

type AudioVolumeState = number;

const initialState: AudioVolumeState = 0;

export const AudioVolumeContext = createContext<
  [AudioVolumeState, React.Dispatch<React.SetStateAction<AudioVolumeState>>] | undefined
>(undefined);

export function AudioVolumeProvider({ children }: { children: React.ReactNode }) {
  const [audioVolume, setAudioVolume] = useState<AudioVolumeState>(initialState);
  return (
    <AudioVolumeContext.Provider value={[audioVolume, setAudioVolume]}>
      {children}
    </AudioVolumeContext.Provider>
  );
}

export function useAudioVolume() {
  const context = useContext(AudioVolumeContext);

  if (context === undefined) {
    throw new Error("useAudioVolume must be used within a AudioVolumeProvider");
  }

  const [audioProcessor] = useAudioProcessor();
  const [audioVolume, setAudioVolume] = context;

  // Memoized function to process current volume
  const processVolume = useCallback((processor: AudioProcessor) => {
    let animationFrameId: number;

    const updateVolume = () => {
      const volume = processor.getVolume();
      if (audioVolume !== volume) {
        setAudioVolume(prevState => volume);
      }
      animationFrameId = requestAnimationFrame(updateVolume);
    }

    updateVolume();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [audioVolume]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (audioProcessor) {
      return processVolume(audioProcessor);
    }
  }, [audioProcessor, processVolume]); // eslint-disable-line react-hooks/exhaustive-deps

  return [audioVolume, setAudioVolume] as const;
}