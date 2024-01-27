"use client";

import { useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import {
  activeVisionAtom,
  activeAudioDeviceAtom,
  audioStreamAtom,
  audioProcessorAtom,
} from "@/lib/store";
import { AudioProcessor } from "@/lib/audio-processor";
import { VisionName } from "@/lib/definitions";
import BoxesVision from "./boxes-vision";
import SphereVision from "./sphere-vision";
import OscilloscopeVision from "./oscilloscope-vision";

type Props = {};

export default function VisionCanvas({}: Props) {
  const [activeVision] = useAtom(activeVisionAtom);
  const [audioDevice] = useAtom(activeAudioDeviceAtom);
  const [audioStream, setAudioStream] = useAtom(audioStreamAtom);
  const [audioProcessor, setAudioProcessor] = useAtom(audioProcessorAtom);

  const VisionComponentMap: { [K in VisionName]: JSX.Element } = {
    "Sphere": <SphereVision />,
    "Boxes": <BoxesVision />,
    "Oscilloscope": <OscilloscopeVision />,
  };

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

  return (
    <div className="vision-canvas w-full h-full">
      {VisionComponentMap[activeVision.name]}
    </div>
  );
}