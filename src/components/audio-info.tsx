"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import {
  showAudioInfoAtom,
  audioFrequenciesAtom,
  audioVolumeAtom,
} from "@/lib/store";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

export default function AudioInfo() {
  const [showAudioInfo] = useAtom(showAudioInfoAtom);
  const [isMinimized, setIsMinimized] = useState(false);
  const [frequencies] = useAtom(audioFrequenciesAtom);
  const [volume] = useAtom(audioVolumeAtom);

  function toggleMinimize() {
    setIsMinimized(!isMinimized);
  }

  if (!showAudioInfo) return null;

  return (
    <div className="col-span-2 sm:col-span-3 md:col-span-1 row-start-2 sm:row-end-9 sm:self-end z-50 min-w-52 md:w-64 h-fit m-2 p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 bg-background border rounded-sm">
      <div className="w-full flex flex-row items-center justify-between">
        <span className="font-extrabold">AudioInfo</span>
        <Button
          onClick={toggleMinimize}
          size="icon"
          variant="outline"
          className="h-7 w-7 border rounded-sm"
          aria-label="Minimize Audio Info Button"
        >
          {isMinimized ? <PlusIcon /> : <MinusIcon />}
        </Button>
      </div>
      <div className={`${isMinimized ? "hidden" : "h-fit w-full flex flex-col justify-between gap-3"}`}>
        <div className="flex flex-row justify-between">
          <p className="text-xs md:text-sm font-mono font-semibold">volume</p>
          <p className="text-sm font-mono">{volume}</p>
        </div>
        <div className="flex flex-col divide-y divide-neutral-900">
          {frequencies && Object.entries(frequencies).map((frequency, index) => (
            <div key={index} className="py-1 sm:py-2 flex flex-row justify-between items-center">
              <span className="text-xs md:text-sm font-mono font-semibold">{frequency[0]}</span>
              <span className="text-sm font-mono">{frequency[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}