"use client";

import { useState } from "react";
import { useVisions } from "@/contexts/visions";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

export default function VisionControls() {
  const [isMinimized, setIsMinimized] = useState(true);
  const [visions, setVisions] = useVisions();

  function toggleMinimize() {
    setIsMinimized(!isMinimized);
  }

  return (
    <div className="vision-controls col-span-3 sm:col-end-7 row-end-7 self-end z-50 h-fit m-2 p-3 sm:p-4 flex flex-col gap-3 bg-background border rounded-sm">
      <div className="w-full flex flex-row items-center justify-between">
        <span className="font-mono font-bold text-sm">Vision Controls</span>
        <Button
          onClick={toggleMinimize}
          size="icon"
          variant="outline"
          className="border border-neutral-900 rounded-sm"
          aria-label="Minimize AudioProcessor Button"
        >
          {isMinimized ? <PlusIcon /> : <MinusIcon />}
        </Button>
      </div>
      <div className={`${isMinimized ? "hidden" : "h-fit w-full flex flex-col justify-between gap-3"}`}>
        <div className="flex flex-row justify-between">
          <span className="text-xs font-mono">agility</span>
          <input
            type="range"
            min="0"
            max="100"
            value={visions.agility}
            onChange={e => setVisions(prevState => ({ ...prevState, agility: parseInt(e.target.value) }))}
            className="accent-[#1AE803]"
          />
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-xs font-mono">intellect</span>
          <input
            type="range"
            min="0"
            max="100"
            value={visions.intellect}
            onChange={e => setVisions(prevState => ({ ...prevState, intellect: parseInt(e.target.value) }))}
            className="accent-[#1AE803]"
          />
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-xs font-mono">strength</span>
          <input
            type="range"
            min="0"
            max="100"
            value={visions.strength}
            onChange={e => setVisions(prevState => ({ ...prevState, strength: parseInt(e.target.value) }))}
            className="accent-[#1AE803]"
          />
        </div>
      </div>
    </div>
  );
}