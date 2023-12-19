"use client";

import { createContext, useContext, useCallback, useEffect, useState } from "react";
import { useAudioProcessor } from "./audio-processor-context";
import type { AudioProcessor } from "@/lib/audio";

type AudioWaveformState = Float32Array | null;

const initialState: AudioWaveformState = null;

export const AudioWaveformContext = createContext<
  [AudioWaveformState, React.Dispatch<React.SetStateAction<AudioWaveformState>>] | undefined
>(undefined);

export function AudioWaveformProvider({ children }: { children: React.ReactNode }) {
  const [audioWaveform, setAudioWaveform] = useState<AudioWaveformState>(initialState);
  return (
    <AudioWaveformContext.Provider value={[audioWaveform, setAudioWaveform]}>
      {children}
    </AudioWaveformContext.Provider>
  );
}

export function useAudioWaveform() {
  const context = useContext(AudioWaveformContext);

  if (context === undefined) {
    throw new Error("useAudioWaveform must be used within a AudioWaveformProvider");
  }

  const [audioProcessor] = useAudioProcessor();
  const [audioWaveform, setAudioWaveform] = context;

  // Process audio stream waveform data
  const processWaveform = useCallback((processor: AudioProcessor) => {
    let animationFrameId: number;

    const updateWaveform = () => {
      const waveform = processor.getWaveformData();
      setAudioWaveform(prevState => waveform);
      animationFrameId = requestAnimationFrame(updateWaveform);
    }

    updateWaveform();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (audioProcessor) {
      return processWaveform(audioProcessor);
    }
  }, [audioProcessor, processWaveform]); // eslint-disable-line react-hooks/exhaustive-deps

  return [audioWaveform] as const;
}