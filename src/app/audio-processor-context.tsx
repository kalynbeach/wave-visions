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

export function useAudioProcessor() {
  const context = useContext(AudioProcessorContext);
  if (context === undefined) {
    throw new Error("useAudioProcessor must be used within a AudioProcessorProvider");
  }

  const [audioStream] = useAudioStream();
  const [audioProcessor, setAudioProcessor] = context;

  // Create audio processor when audio stream is set
  useEffect(() => {
    async function createAudioProcessor(context: AudioContext, stream: MediaStream) {
      console.log(`[useAudioProcessor createAudioProcessor] called`);
      try {
        const processor = new AudioProcessor(context, stream);
        setAudioProcessor({ ...audioProcessor, processor });
      } catch (error) {
        console.error(`[useAudioProcessor createAudioProcessor] error: ${error}`);
      }
    }

    if (audioStream.context && audioStream.stream) {
      createAudioProcessor(audioStream.context, audioStream.stream);
    }

    return () => {};
  }, [audioStream.context, audioStream.stream]); // eslint-disable-line react-hooks/exhaustive-deps

  // Process audio stream amplitude data
  useEffect(() => {
    const updateVolume = () => {
      if (audioProcessor.processor) {
        const volume = audioProcessor.processor.getVolume();
        setAudioProcessor({ ...audioProcessor, volume });
        requestAnimationFrame(updateVolume);
      }
    }

    updateVolume();

    return () => {};
  }, [audioProcessor]);

  // Process audio stream waveform data

  return [audioProcessor, setAudioProcessor] as const;
}