"use client";

import { createContext, useContext, useCallback, useEffect, useState } from "react";
import { useAudioStream } from "./audio-stream-context";
import { AudioProcessor } from "@/lib/audio";
import type { AudioFrequencies } from "@/lib/definitions";

type AudioProcessorState = {
  processor: AudioProcessor | null;
  frequencies: AudioFrequencies | null;
  volume: number;
  waveform: Float32Array | null;
  // amplitude: Uint8Array | null;
};

const initialState: AudioProcessorState = {
  processor: null,
  frequencies: null,
  volume: 0,
  waveform: null,
};

export const AudioProcessorContext = createContext<
  [AudioProcessorState, React.Dispatch<React.SetStateAction<AudioProcessorState>>] | undefined
>(undefined);

export function AudioProcessorProvider({ children }: { children: React.ReactNode }) {
  const [audioProcessor, setAudioProcessor] = useState<AudioProcessorState>(initialState);
  return (
    <AudioProcessorContext.Provider value={[audioProcessor, setAudioProcessor]}>
      {children}
    </AudioProcessorContext.Provider>
  );
}

/**
 * `AudioProcessor` Hook
 */
export function useAudioProcessor() {
  const context = useContext(AudioProcessorContext);

  if (context === undefined) {
    throw new Error("useAudioProcessor must be used within a AudioProcessorProvider");
  }

  const [audioStream] = useAudioStream();
  const [audioProcessor, setAudioProcessor] = context;

  // Create audio processor when audio stream is set
  useEffect(() => {
    let isMounted = true;

    async function createAudioProcessor(context: AudioContext, stream: MediaStream) {
      console.log(`[useAudioProcessor createAudioProcessor] called`);
      try {
        if (isMounted) {
          const processor = new AudioProcessor(context, stream);
          setAudioProcessor(prevState => ({ ...prevState, processor }));
        }
      } catch (error) {
        console.error(`[useAudioProcessor createAudioProcessor] error: ${error}`);
      }
    }

    if (audioStream.context && audioStream.stream) {
      createAudioProcessor(audioStream.context, audioStream.stream);
    }

    return () => {
      isMounted = false;
    };
  }, [audioStream.context, audioStream.stream]); // eslint-disable-line react-hooks/exhaustive-deps

  // Process audio stream frequency data
  useEffect(() => {
    let animationFrameId: number;

    function processFrequencies(processor: AudioProcessor) {
      const updateFrequencies = () => {
        const frequencies = processor.getFrequencies();
        setAudioProcessor(prevState => ({ ...prevState, frequencies }));
        animationFrameId = requestAnimationFrame(updateFrequencies);
      }
      updateFrequencies();
    }

    if (audioProcessor.processor) {
      processFrequencies(audioProcessor.processor);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [audioProcessor.processor]); // eslint-disable-line react-hooks/exhaustive-deps

  // Process audio stream volume data
  const processVolume = useCallback((processor: AudioProcessor) => {
    let animationFrameId: number;
    const updateVolume = () => {
      const volume = processor.getVolume();
      if (audioProcessor.volume !== volume) {
        setAudioProcessor(prevState => ({ ...prevState, volume }));
      }
      animationFrameId = requestAnimationFrame(updateVolume);
    }
    updateVolume();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [audioProcessor.volume]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (audioProcessor.processor) {
      return processVolume(audioProcessor.processor);
    }
  }, [audioProcessor.processor, processVolume]); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Process audio stream waveform data
  const processWaveform = useCallback((processor: AudioProcessor) => {
    let animationFrameId: number;
    const updateWaveform = () => {
      const waveform = processor.getWaveformData();
      setAudioProcessor(prevState => ({ ...prevState, waveform }));
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
    if (audioProcessor.processor) {
      return processWaveform(audioProcessor.processor);
    }
  }, [audioProcessor.processor, processWaveform]); // eslint-disable-line react-hooks/exhaustive-deps

  return [audioProcessor, setAudioProcessor] as const;
}