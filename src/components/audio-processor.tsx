"use client";

import { useAudioVolume } from "@/app/audio-volume-context";
import { useAudioFrequencies } from "@/app/audio-frequencies-context";
import type { FrequencyBand } from "@/lib/definitions";

export default function AudioProcessor() {
  const [audioVolume] = useAudioVolume();
  const [audioFrequencies] = useAudioFrequencies();

  if (!audioVolume || !audioFrequencies) {
    return null;
  }

  return (
    <div className="audio-processor p-4 flex flex-col gap-4 border rounded-sm">
      <span className="font-semibold">Audio Processor</span>
      <div className="w-96 flex flex-col justify-between gap-4">
        <div className="flex flex-row justify-between gap-2">
          <p className="font-mono text-xs">Volume</p>
          <p className="font-mono text-sm">{audioVolume}</p>
        </div>
        <div className="flex flex-col">
          {Object.entries(audioFrequencies).map((frequency, index) => (
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