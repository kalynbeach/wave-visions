"use client";

import { createContext, useContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAudioStream } from "@/contexts/audio-stream";
import { AudioProcessor } from "@/lib/audio-processor";
import type { AudioFrequencies } from "@/lib/definitions";

type AudioProcessorState = {
  processor: AudioProcessor | null;
  frequencies: AudioFrequencies | null;
  waveform: Float32Array | null;
  volume: number;
};

const initialState: AudioProcessorState = {
  processor: null,
  frequencies: null,
  waveform: null,
  volume: 0,
};

const AudioProcessorContext = createContext<
  [AudioProcessorState, React.Dispatch<React.SetStateAction<AudioProcessorState>>] | undefined
>(undefined);

export function useAudioProcessor() {
  const context = useContext(AudioProcessorContext);
  if (context === undefined) {
    throw new Error("useAudioProcessor must be used within a AudioProcessorProvider");
  }
  return context;
}

export function AudioProcessorProvider({ children }: { children: React.ReactNode }) {
  const [audioStream] = useAudioStream();
  const [audioProcessor, setAudioProcessor] = useState<AudioProcessorState>(initialState);

  // Initialize AudioProcessor with a given audio stream
  const processor = useMemo(() => audioStream ? new AudioProcessor(audioStream) : null, [audioStream]);

  const frequenciesRef = useRef<AudioFrequencies | null>(null);
  const volumeRef = useRef<number>(0);

  // Process audio frequency data
  useEffect(() => {
    let animationFrameId: number;

    const processFrequencies = (processor: AudioProcessor) => {
      const updateFrequencies = () => {
        const frequencies = processor.getFrequencies();
        setAudioProcessor(prevState => ({ ...prevState, frequencies }));
        frequenciesRef.current = frequencies;
        animationFrameId = requestAnimationFrame(updateFrequencies);
      }
      updateFrequencies();
    }

    if (processor) {
      processFrequencies(processor);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [processor]);

  // Process audio volume data
  useEffect(() => {
    let animationFrameId: number;
  
    const processVolume = (processor: AudioProcessor) => {
      const updateVolume = () => {
        const volume = processor.getVolume() || 0;
        // Only update if volume changes significantly
        if (Math.abs(volume - volumeRef.current) > 0.01) {
          setAudioProcessor(prevState => ({ ...prevState, volume }));
          volumeRef.current = volume;
        }
        animationFrameId = requestAnimationFrame(updateVolume);
      }
      updateVolume();
    }
  
    if (processor) {
      processVolume(processor);
    }
  
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [processor]);

  return (
    <AudioProcessorContext.Provider value={[audioProcessor, setAudioProcessor]}>
      {children}
    </AudioProcessorContext.Provider>
  );
}