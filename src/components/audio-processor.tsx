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
    <div className="audio-processor z-50 md:w-96 m-2 mt-auto p-4 flex flex-col gap-4 bg-background border rounded-sm">
      <span className="font-mono font-semibold">AudioProcessor</span>
      <div className="w-full flex flex-col justify-between gap-3">
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