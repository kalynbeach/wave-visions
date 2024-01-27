"use client";

import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { waveVisionsControlsAtom, visionModifiersAtom } from "@/lib/store";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function VisionControls() {
  const [waveVisions] = useAtom(waveVisionsControlsAtom);
  const [visionModifiers, setVisionModifiers] = useAtom(visionModifiersAtom);
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
    }, 100);
    return () => {
      clearTimeout(timerId);
    };
  }, [inputValue]);

  useEffect(() => {
    if (debouncedValue !== null) {
      setVisionModifiers({ [debouncedValue.name]: parseInt(debouncedValue.value) });
    }
  }, [debouncedValue]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!waveVisions.showVisionControls) return null;

  return (
    <div className="vision-controls col-span-4 sm:col-span-5 md:col-span-4 lg:col-span-3 sm:col-end-9 md:col-end-9 lg:col-end-9 row-end-9 self-end z-50 md:min-w-64 h-fit m-2 p-3 sm:p-4 flex flex-col gap-3 bg-background border rounded-sm">
      <div className="w-full flex flex-row items-center justify-between">
        <span className="font-extrabold">VisionControls</span>
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
            value={visionModifiers.agility}
            handler={handleRangeInputChange}
          />
        </div>
        <div className="flex flex-row justify-between">
          <RangeVisionControl
            name="intellect"
            value={visionModifiers.intellect}
            handler={handleRangeInputChange}
          />
        </div>
        <div className="flex flex-row justify-between">
          <RangeVisionControl
            name="strength"
            value={visionModifiers.strength}
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
    <div className="w-full flex flex-row justify-between items-center gap-3">
      <p className="basis-[24%] sm:basis-1/4 md:basis-24 flex flex-row text-sm md:text-sm font-mono font-semibold rounded-sm">
        {name}
      </p>
      <Badge variant="default" className="flex-shrink w-8 justify-center text-xs font-mono rounded-sm">
        {value}
      </Badge>
      <input
        name={name}
        type="range"
        min="0"
        max="100"
        defaultValue={value}
        onChange={e => handler(e)}
        className="flex-grow w-full flex-1 accent-[#1AE803]"
      />
    </div>
  );
};