"use client";

import { useAudioProcessor } from "@/app/audio-processor-context";
import Canvas from "@/components/canvas";
import Oscilloscope from "@/components/oscilloscope";

export default function OscilloscopeVision() {
  const [audioProcessor] = useAudioProcessor();

  return (
    <Canvas>
      {/* <ambientLight /> */}
      {/* <pointLight position={[10, 10, 10]} /> */}
      { audioProcessor.waveform && (
        <Oscilloscope
          data={audioProcessor.waveform}
        />
      ) }
    </Canvas>
  );
}