"use client";

import { useAudioProcessor } from "@/app/audio-processor-context";
import type { FrequencyBand } from "@/lib/definitions";

export default function AudioProcessor() {
  const [audioProcessor] = useAudioProcessor();

  return (
    <div className="audio-processor p-4 flex flex-col gap-4 border rounded-sm">
      <span className="font-semibold">Audio Processor</span>
      <div className="w-96 flex flex-col justify-between gap-4">
        <div className="flex flex-row justify-between gap-2">
          <p className="font-mono text-xs">Volume</p>
          <p className="font-mono text-sm">{audioProcessor.volume}</p>
        </div>
        <div className="flex flex-col">
          {audioProcessor.frequencies && Object.entries(audioProcessor.frequencies).map((frequency, index) => (
            <div key={index} className="flex flex-row justify-between gap-2">
              <span className="font-mono text-xs">{frequency[0]}</span>
              <span className="font-mono text-sm">{frequency[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}