"use client";

import { useAudioProcessor } from "@/app/audio-processor-context";
import Canvas from "@/components/canvas";
import Box from "@/components/box";

export default function BoxesVision() {
  const [audioProcessor] = useAudioProcessor();

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-3, 0, -3]} volume={audioProcessor.volume} />
      <Box position={[0, 0, 0]} volume={audioProcessor.volume} />
      <Box position={[3, 0, -3]} volume={audioProcessor.volume} />
    </Canvas>
  );
}