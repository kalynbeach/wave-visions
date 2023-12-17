"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAudioStream } from "./audio-stream-context";
import { AudioProcessor } from "@/lib/audio";

type AudioProcessorState = {
  processor: AudioProcessor | null;
  volume: number;
  amplitude: Uint8Array | null;
  waveform: Float32Array | null;
};

const initialState: AudioProcessorState = {
  processor: null,
  volume: 0,
  amplitude: null,
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
          setAudioProcessor({ ...audioProcessor, processor });
        }
      } catch (error) {
        console.error(`[useAudioProcessor createAudioProcessor] error: ${error}`);
      }
    }

    if (audioStream.context && audioStream.stream) {
      createAudioProcessor(audioStream.context, audioStream.stream);
    }

    // Cleanup function to handle component unmounting
    return () => {
      isMounted = false;
    };
  }, [audioStream.context, audioStream.stream]); // eslint-disable-line react-hooks/exhaustive-deps

  // Process audio stream amplitude data
  useEffect(() => {
    let animationFrameId: number;
  
    function processVolume(processor: AudioProcessor) {
      const updateVolume = () => {
        const volume = processor.getVolume();
        setAudioProcessor({ ...audioProcessor, volume });
        animationFrameId = requestAnimationFrame(updateVolume);
      }
      updateVolume();
    }

    if (audioProcessor.processor) {
      processVolume(audioProcessor.processor);
    }

    // Cleanup function to cancel the animation frame loop
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [audioProcessor.processor]); // eslint-disable-line react-hooks/exhaustive-deps

  // TODO: Process audio stream waveform data

  return [audioProcessor, setAudioProcessor] as const;
}