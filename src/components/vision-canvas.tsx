"use client";

import { useVisions, VisionRegistry } from "@/contexts/visions";
import BoxesVision from "./boxes-vision";
import SphereVision from "./sphere-vision";
import OscilloscopeVision from "./oscilloscope-vision";

type Props = {};

export default function VisionCanvas({}: Props) {
  const [visions, setVisions] = useVisions();

  return (
    <div className="vision-canvas w-full h-full">
      { visions.activeVision === VisionRegistry.Boxes && <BoxesVision /> }
      { visions.activeVision === VisionRegistry.Sphere && <SphereVision /> }
      { visions.activeVision === VisionRegistry.Oscilloscope && <OscilloscopeVision /> }
      {/* TODO: Add other Visions */}
    </div>
  );
}