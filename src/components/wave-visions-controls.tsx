"use client";

import { useWaveVisions } from "@/contexts/wave-visions";
import { Button } from "@/components/ui/button";
import { InfoCircledIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export default function WaveVisionsControls() {
  const [waveVisions, setWaveVisions] = useWaveVisions();

  return (
    <div className="flex-1 flex flex-row items-center justify-end gap-2">

      {/* AudioInfo Toggle */}
      <Button
        onClick={() => setWaveVisions(prevState => ({
          ...prevState,
          showAudioInfo: !prevState.showAudioInfo
        }))}
        className={cn(
          "border rounded-sm hover:bg-neutral-800/30",
          waveVisions.showAudioInfo ?
            "bg-neutral-800/30 border-neutral-700 hover:border-neutral-700" :
            "hover:border-[#1AE803]/50"
        )}
        size="icon"
        variant="outline"
        aria-label="Toggle Audio Info Button"
      >
        <InfoCircledIcon
          className={`${waveVisions.showAudioInfo ? "text-[#1AE803]" : ""}`}
        />
      </Button>

      {/* VisionControls Toggle */}
      <Button
        onClick={() => setWaveVisions(prevState => ({
          ...prevState,
          showVisionControls: !prevState.showVisionControls
        }))}
        className={cn(
          "border rounded-sm hover:bg-neutral-800/30",
          waveVisions.showVisionControls ?
            "bg-neutral-800/30 border-neutral-700 hover:border-neutral-700" :
            "hover:border-[#1AE803]/50"
        )}
        size="icon"
        variant="outline"
        aria-label="Toggle Vision Controls Button"
      >
        <MixerHorizontalIcon
          className={`${waveVisions.showVisionControls ? "text-[#1AE803] transition" : ""}`}
        />
      </Button>
    </div>
  );
}
