"use client";

import { VisionRegistry } from "@/lib/definitions";
import { useWaveVisions } from "@/contexts/wave-visions";
import BoxesVision from "./boxes-vision";
import SphereVision from "./sphere-vision";
import OscilloscopeVision from "./oscilloscope-vision";

type Props = {};

export default function VisionCanvas({}: Props) {
  const [waveVisions] = useWaveVisions();

  return (
    <div className="vision-canvas w-full h-full">
      { waveVisions.activeVision === VisionRegistry.Boxes && <BoxesVision /> }
      { waveVisions.activeVision === VisionRegistry.Sphere && <SphereVision /> }
      { waveVisions.activeVision === VisionRegistry.Oscilloscope && <OscilloscopeVision /> }
    </div>
  );
}