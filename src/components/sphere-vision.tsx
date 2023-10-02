"use client";

import { useAudioStream } from "@/app/audio-stream-context";
import Canvas from "@/components/canvas";
import Sphere from "@/components/sphere";

export default function SphereVision() {
  const [audioStream] = useAudioStream();

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Sphere position={[0, 0, 0]} volume={audioStream.volume} />
    </Canvas>
  );
}