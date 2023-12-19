"use client";

import { useState } from "react";
import { useAudioVolume } from "@/app/audio-volume-context";
import { useAudioFrequencies } from "@/app/audio-frequencies-context";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export default function AudioProcessor() {
  const [audioVolume] = useAudioVolume();
  const [audioFrequencies] = useAudioFrequencies();
  const [isMinimized, setIsMinimized] = useState(false);

  if (!audioVolume || !audioFrequencies) {
    return null;
  }

  function toggleMinimize() {
    setIsMinimized(!isMinimized);
  }

  return (
    <div className="audio-processor z-50 md:w-96 m-2 mt-auto p-4 flex flex-col gap-4 bg-background border rounded-sm">
      <div className="w-full flex flex-row items-center justify-between">
        <span className="font-mono font-semibold">AudioProcessor</span>
        <Button onClick={toggleMinimize} className="rounded-sm" variant="ghost" size="icon" aria-label="Minimize AudioProcessor Button">
          {isMinimized ? <PlusIcon /> : <MinusIcon />}
        </Button>
      </div>
      { !isMinimized && (
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
      )}
    </div>
  );
}