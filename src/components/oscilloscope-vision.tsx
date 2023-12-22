"use client";

import { useAudioProcessor } from "@/contexts/audio-processor";
import Canvas from "@/components/canvas";
import Oscilloscope from "@/components/oscilloscope";

export default function OscilloscopeVision() {
  const [processor] = useAudioProcessor();

  return (
    <Canvas>
      {/* <ambientLight /> */}
      {/* <pointLight position={[10, 10, 10]} /> */}
      { processor.waveform && (
        <Oscilloscope
          data={processor.waveform}
        />
      ) }
    </Canvas>
  );
}