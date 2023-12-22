"use client";

import { createContext, useContext, useCallback, useEffect, useRef, useState } from "react";
import { useAudioStream } from "@/contexts/audio-stream";
import { AudioProcessor } from "@/lib/audio-processor";

type AudioProcessorState = {
  processor: AudioProcessor | null;
  volume: number;
};

const initialState: AudioProcessorState = {
  processor: null,
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
  useEffect(() => {
    function initAudioProcessor(audioStream: MediaStream) {
      const processor = new AudioProcessor(audioStream);
      setAudioProcessor(prevState => ({ processor, volume: 0 }));
    };

    if (audioStream) {
      initAudioProcessor(audioStream);
    }

    return () => {};
  }, [audioStream]); // eslint-disable-line react-hooks/exhaustive-deps

  // Process audio stream volume
  useEffect(() => {
    function processVolume(processor: AudioProcessor) {
      let animationFrameId: number;
      const updateVolume = () => {
        const volume = audioProcessor.processor?.getVolume() || 0;
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
    }

    if (audioProcessor.processor) {
      processVolume(audioProcessor.processor);
    }
  }, [audioProcessor.processor, audioProcessor.volume]);

  return (
    <AudioProcessorContext.Provider value={[audioProcessor, setAudioProcessor]}>
      {children}
    </AudioProcessorContext.Provider>
  );
}