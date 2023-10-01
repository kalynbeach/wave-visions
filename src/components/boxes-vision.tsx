"use client";

import { useAudioStream } from "@/app/audio-stream-context";
import Canvas from "@/components/canvas";
import Box from "@/components/box";

export default function BoxesVision() {
  const [audioStream] = useAudioStream();

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} volume={audioStream.volume} />
    </Canvas>
  );
}