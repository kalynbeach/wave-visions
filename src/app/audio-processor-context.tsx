"use client";

import { createContext, useContext, useCallback, useEffect, useState } from "react";
import { useAudioStream } from "./audio-stream-context";
import { AudioProcessor } from "@/lib/audio";

type AudioProcessorState = AudioProcessor | null;

const initialState: AudioProcessorState = null;

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
          setAudioProcessor(prevState => processor);
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

  return [audioProcessor, setAudioProcessor] as const;
}