"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAudioDevice } from "./audio-device-context";
import { AudioProcessor } from "@/lib/audio";


type AudioStreamState = {
  context: AudioContext | undefined;
  device: MediaDeviceInfo | undefined;
  stream: MediaStream | undefined;
};


const initialState: AudioStreamState = {
  context: undefined,
  device: undefined,
  stream: undefined,
};


export const AudioStreamContext = createContext<
  [AudioStreamState, React.Dispatch<React.SetStateAction<AudioStreamState>>] | undefined
>(undefined);


export function AudioStreamProvider({ children }: { children: React.ReactNode }) {
  const [audioStream, setAudioStream] = useState<AudioStreamState>(initialState);
  return (
    <AudioStreamContext.Provider value={[audioStream, setAudioStream]}>
      {children}
    </AudioStreamContext.Provider>
  );
}


export function useAudioStream() {
  const context = useContext(AudioStreamContext);
  if (context === undefined) {
    throw new Error("useAudioStream must be used within a AudioStreamProvider");
  }

  const [audioDevice] = useAudioDevice();
  const [audioStream, setAudioStream] = context;
  // TODO: Figure out if this is more performant as state
  // const [audioProcessor, setAudioProcessor] = useState<AudioProcessor | null>(null);

  // Fetch audio stream when audio device is set
  useEffect(() => {
    async function fetchAudioStream(device: MediaDeviceInfo) {
      console.log(`[useAudioStream fetchAudioStream] called`);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: device.deviceId,
          },
        });
        const context = new AudioContext();
        setAudioStream({ ...audioStream, context, device, stream });
        // processAudioStream(stream, audioDevice);
        // process(stream, audioDevice);
      } catch (error) {
        console.error(`[useAudioStream fetchAudioStream] ERROR: `, error);
      }
    }

    // function process(stream: MediaStream, device: MediaDeviceInfo) {
    //   console.log(`[useAudioStream process] called`);
    //   const processor = new AudioProcessor();
    //   const update = () => {
    //     console.log(`[useAudioStream update] called`);
    //     const amplitudeData = processor.getAmplitudeData(stream);
    //     const waveformData = processor.getWaveformData(stream);
    //     const volume = amplitudeData.reduce((sum, value) => sum + value, 0) / amplitudeData.length;
    //     const waveform = waveformData;
    //     setAudioStream({ ...audioStream, device, volume, waveform });
    //     requestAnimationFrame(update);
    //   };
    //   update();
    // }

    // function processAudioStream(stream: MediaStream, audioDevice: MediaDeviceInfo) {
    //   // Initialize AudioContext nodes
    //   const audioContext = new AudioContext();
    //   const source = audioContext.createMediaStreamSource(stream);
    //   const analyser = audioContext.createAnalyser();
    //   analyser.fftSize = 32;
    //   source.connect(analyser);
    //   // Set audio data
    //   const bufferLength = analyser.frequencyBinCount;
    //   const dataArray = new Uint8Array(bufferLength);
    //   // Update audioStream.volume with computed volume
    //   const updateVolume = () => {
    //     analyser.getByteFrequencyData(dataArray);
    //     const avgVolume = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
    //     setAudioStream({ ...audioStream, device: audioDevice, stream, volume: avgVolume});
    //     requestAnimationFrame(updateVolume);
    //   };
    //   updateVolume();
    // }

    if (audioDevice.device) {
      fetchAudioStream(audioDevice.device);
    }

    return () => {};
  }, [audioDevice.device]); // eslint-disable-line react-hooks/exhaustive-deps

  return context;
}