"use client";

import { useState, useEffect } from "react";
import { useWaveVisions } from "@/contexts/wave-visions";
import { useVision } from "@/contexts/vision";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Badge } from "./ui/badge";

export default function VisionControls() {
  const [waveVisions] = useWaveVisions();
  const [vision, setVision] = useVision();
  const [isMinimized, setIsMinimized] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState<{ name: string, value: string } | null>(null);
  const [inputValue, setInputValue] = useState<{ name: string, value: string } | null>(null);

  function toggleMinimize() {
    setIsMinimized(!isMinimized);
  }

  function handleRangeInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue({name: e.target.name, value: e.target.value});
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 250);
    return () => {
      clearTimeout(timerId);
    };
  }, [inputValue]);

  useEffect(() => {
    if (debouncedValue !== null) {
      setVision(prevState => ({...prevState, [debouncedValue.name]: parseInt(debouncedValue.value) }));
    }
  }, [debouncedValue]); // eslint-disable-line react-hooks/exhaustive-deps

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
          <RangeVisionControl
            name="agility"
            value={vision.agility}
            handler={handleRangeInputChange}
          />
        </div>
        <div className="flex flex-row justify-between">
          <RangeVisionControl
            name="intellect"
            value={vision.intellect}
            handler={handleRangeInputChange}
          />
        </div>
        <div className="flex flex-row justify-between">
          <RangeVisionControl
            name="strength"
            value={vision.strength}
            handler={handleRangeInputChange}
          />
        </div>
      </div>
    </div>
  );
}

function RangeVisionControl({
  name,
  value,
  handler,
}: {
  name: string,
  value: number,
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void,
}) {
  return (
    <div className="w-full flex flex-row justify-between items-center gap-4">
      <p className="basis-1/6 flex flex-row text-sm font-mono rounded-sm">{name}</p>
      <div className="flex-shrink">
        <Badge variant="default" className="w-8 justify-center text-xs font-mono rounded-sm">{value}</Badge>
      </div>
      <div className="flex-grow">
        <input
          name={name}
          type="range"
          min="0"
          max="100"
          // value={value}
          defaultValue={value}
          onChange={e => handler(e)}
          className="w-full flex-1 accent-[#1AE803]"
        />
      </div>
    </div>
  );
};