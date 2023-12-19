"use client";

import { useAudioVolume } from "@/app/audio-volume-context";
import Canvas from "@/components/canvas";
import Sphere from "@/components/sphere";

export default function SphereVision() {
  const [audioVolume] = useAudioVolume();

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Sphere position={[0, 0, 0]} volume={audioVolume} />
    </Canvas>
  );
}