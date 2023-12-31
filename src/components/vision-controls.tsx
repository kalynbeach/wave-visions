"use client";

import { useState } from "react";
import { useWaveVisions } from "@/contexts/wave-visions";
import { useVision } from "@/contexts/vision";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

export default function VisionControls() {
  const [waveVisions] = useWaveVisions();
  const [vision, setVision] = useVision();
  const [isMinimized, setIsMinimized] = useState(false);

  function toggleMinimize() {
    setIsMinimized(!isMinimized);
  }

  if (!waveVisions.showVisionControls) return null;

  return (
    <div className="vision-controls col-span-3 sm:col-span-2 sm:col-end-7 row-end-7 self-end z-50 h-fit m-2 p-3 sm:p-4 flex flex-col gap-3 bg-background border rounded-sm">
      <div className="w-full flex flex-row items-center justify-between">
        <span className="text-lg font-bold">VisionControls</span>
        <Button
          onClick={toggleMinimize}
          size="icon"
          variant="outline"
          className="h-7 w-7 border rounded-sm"
          aria-label="Minimize Volume Controls Button"
        >
          {isMinimized ? <PlusIcon /> : <MinusIcon />}
        </Button>
      </div>
      <div className={`${isMinimized ? "hidden" : "h-fit w-full flex flex-col justify-between gap-3"}`}>
        <div className="flex flex-row justify-between">
          <span className="basis-1/4 text-sm font-mono font-medium">agility</span>
          <input
            type="range"
            min="0"
            max="100"
            value={vision.agility}
            onChange={e => setVision(prevState => ({ ...prevState, agility: parseInt(e.target.value) }))}
            className="flex-1 accent-[#1AE803]"
          />
        </div>
        <div className="flex flex-row justify-between">
          <span className="basis-1/4 text-sm font-mono font-medium">intellect</span>
          <input
            type="range"
            min="0"
            max="100"
            value={vision.intellect}
            onChange={e => setVision(prevState => ({ ...prevState, intellect: parseInt(e.target.value) }))}
            className="flex-1 accent-[#1AE803]"
          />
        </div>
        <div className="flex flex-row justify-between">
          <span className="basis-1/4 text-sm font-mono font-medium">strength</span>
          <input
            type="range"
            min="0"
            max="100"
            value={vision.strength}
            onChange={e => setVision(prevState => ({ ...prevState, strength: parseInt(e.target.value) }))}
            className="flex-1 accent-[#1AE803]"
          />
        </div>
      </div>
    </div>
  );
}