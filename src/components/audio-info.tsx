"use client";

import { useState } from "react";
import { useWaveVisions } from "@/contexts/wave-visions";
import { useAudioProcessor } from "@/contexts/audio-processor";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

export default function AudioInfo() {
  const [waveVisions] = useWaveVisions();
  const [isMinimized, setIsMinimized] = useState(false);
  const [processor] = useAudioProcessor();

  function toggleMinimize() {
    setIsMinimized(!isMinimized);
  }

  if (!waveVisions.showAudioInfo) return null;

  return (
    <div className="col-span-2 md:col-span-1 row-start-5 sm:row-end-7 sm:self-end z-50 md:w-64 h-fit m-2 p-3 sm:p-4 flex flex-col gap-4 bg-background border rounded-sm">
      <div className="w-full flex flex-row items-center justify-between">
        <span className="font-mono font-bold text-sm">Audio Info</span>
        <Button
          onClick={toggleMinimize}
          size="icon"
          variant="outline"
          className="border border-neutral-900 rounded-sm"
          aria-label="Minimize Audio Info Button"
        >
          {isMinimized ? <PlusIcon /> : <MinusIcon />}
        </Button>
      </div>
      <div className={`${isMinimized ? "hidden" : "h-fit w-full flex flex-col justify-between gap-3"}`}>
        <div className="flex flex-row justify-between">
          <p className="text-xs font-mono font-medium">volume</p>
          <p className="text-sm font-mono">{processor.volume}</p>
        </div>
        <div className="flex flex-col divide-y divide-neutral-900">
          {processor.frequencies && Object.entries(processor.frequencies).map((frequency, index) => (
            <div key={index} className="py-1 flex flex-row justify-between items-center">
              <span className="text-xs font-mono font-medium">{frequency[0]}</span>
              <span className="text-sm font-mono">{frequency[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}