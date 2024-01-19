"use client";

import { useWaveVisions } from "@/contexts/wave-visions";
import { Button } from "@/components/ui/button";
import { InfoCircledIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";

export default function WaveVisionsControls() {
  const [waveVisions, setWaveVisions] = useWaveVisions();

  return (
    <div className="flex-1 flex flex-row items-center justify-end gap-2">
      <Button
        onClick={() => setWaveVisions(prevState => ({ ...prevState, showAudioInfo: !prevState.showAudioInfo }))}
        className={`border-neutral-800 rounded-sm ${waveVisions.showAudioInfo ? "border-neutral-700" : ""}`}
        size="icon"
        variant="outline"
        aria-label="Toggle Audio Info Button"
      >
        <InfoCircledIcon
          className={`${waveVisions.showAudioInfo ? "text-[#1AE803]" : ""}`}
        />
      </Button>
      <Button
        onClick={() => setWaveVisions(prevState => ({ ...prevState, showVisionControls: !prevState.showVisionControls }))}
        className={`border-neutral-800 rounded-sm ${waveVisions.showVisionControls ? "border-neutral-700" : ""}`}
        size="icon"
        variant="outline"
        aria-label="Toggle Vision Controls Button"
      >
        <MixerHorizontalIcon
          className={`${waveVisions.showVisionControls ? "text-[#1AE803]" : ""}`}
        />
      </Button>
    </div>
  );
}