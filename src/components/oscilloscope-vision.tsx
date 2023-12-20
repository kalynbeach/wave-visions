"use client";

import { useAudioProcessor } from "@/app/audio-processor-context";
import { useAudioWaveform } from "@/app/audio-waveform-context";
import Canvas from "@/components/canvas";
import Oscilloscope from "@/components/oscilloscope";

export default function OscilloscopeVision() {
  const [audioProcessor] = useAudioProcessor();
  const [audioWaveform] = useAudioWaveform(audioProcessor);

  return (
    <Canvas>
      {/* <ambientLight /> */}
      {/* <pointLight position={[10, 10, 10]} /> */}
      { audioWaveform && (
        <Oscilloscope
          data={audioWaveform}
        />
      ) }
    </Canvas>
  );
}