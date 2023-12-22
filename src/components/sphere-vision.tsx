"use client";

import { useAudioProcessor } from "@/contexts/audio-processor";
import Canvas from "@/components/canvas";
import Sphere from "@/components/sphere";

export default function SphereVision() {
  const [processor] = useAudioProcessor();

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Sphere position={[0, 0, 0]} volume={processor.volume} />
    </Canvas>
  );
}