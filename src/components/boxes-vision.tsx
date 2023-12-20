"use client";

import { useAudioProcessor } from "@/app/audio-processor-context";
import { useAudioVolume } from "@/app/audio-volume-context";
import Canvas from "@/components/canvas";
import Box from "@/components/box";

export default function BoxesVision() {
  const [audioProcessor] = useAudioProcessor();
  const [audioVolume] = useAudioVolume(audioProcessor);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-3, 0, -3]} volume={audioVolume} />
      <Box position={[0, 0, 0]} volume={audioVolume} />
      <Box position={[3, 0, -3]} volume={audioVolume} />
    </Canvas>
  );
}