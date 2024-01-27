"use client";

import { useEffect, useMemo, useRef } from "react";
import { useAtom } from "jotai";
import {
  activeVisionAtom,
  activeAudioDeviceAtom,
  audioStreamAtom,
  audioProcessorAtom,
  audioVolumeAtom,
} from "@/lib/store";
import { AudioProcessor } from "@/lib/audio-processor";
import { AudioFrequencies, VisionName } from "@/lib/definitions";
import BoxesVision from "./boxes-vision";
import SphereVision from "./sphere-vision";
import OscilloscopeVision from "./oscilloscope-vision";

type Props = {};

export default function VisionCanvas({}: Props) {
  const [activeVision] = useAtom(activeVisionAtom);
  const [audioDevice] = useAtom(activeAudioDeviceAtom);
  const [audioStream, setAudioStream] = useAtom(audioStreamAtom);
  const [audioProcessor, setAudioProcessor] = useAtom(audioProcessorAtom);
  const [audioVolume, setAudioVolume] = useAtom(audioVolumeAtom);

  // TODO: Refactor this thing
  const VisionComponentMap: { [K in VisionName]: JSX.Element } = {
    "Sphere": <SphereVision />,
    "Boxes": <BoxesVision />,
    "Oscilloscope": <OscilloscopeVision />,
  };

  const frequenciesRef = useRef<AudioFrequencies | null>(null);
  const volumeRef = useRef<number>(0);

  // Initialize audio stream from active audio device
  useEffect(() => {
    async function getAudioStream(device: MediaDeviceInfo) {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: device.deviceId,
        },
      });
      setAudioStream(stream);
    }

    if (audioDevice) {
      getAudioStream(audioDevice);
    }

    return () => {};
  }, [audioDevice]); // eslint-disable-line react-hooks/exhaustive-deps

  // Initialize audio processor from audio stream
  useEffect(() => {
    if (audioStream) {
      const processor = new AudioProcessor(audioStream);
      setAudioProcessor(processor);
    }

    return () => {};
  }, [audioStream]); // eslint-disable-line react-hooks/exhaustive-deps

  // Process audio volume data
  useEffect(() => {
    let animationFrameId: number;
  
    const processVolume = (processor: AudioProcessor) => {
      const updateVolume = () => {
        const volume = processor.getVolume() || 0;
        // Only update if volume changes significantly
        if (Math.abs(volume - volumeRef.current) > 0.01) {
          setAudioVolume(volume)
          volumeRef.current = volume;
        }
        animationFrameId = requestAnimationFrame(updateVolume);
      }
      updateVolume();
    }
  
    if (audioProcessor) {
      processVolume(audioProcessor);
    }
  
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [audioProcessor]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="vision-canvas w-full h-full">
      {VisionComponentMap[activeVision.name]}
    </div>
  );
}