"use client";

import { useAudioProcessor } from "@/app/audio-processor-context";
import Canvas from "@/components/canvas";
import Sphere from "@/components/sphere";

export default function SphereVision() {
  const [audioProcessor] = useAudioProcessor();

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Sphere position={[0, 0, 0]} volume={audioProcessor.volume} />
    </Canvas>
  );
}