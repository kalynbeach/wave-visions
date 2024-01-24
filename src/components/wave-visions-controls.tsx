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
      <WaveVisionsControlToggleButton
        controlName="showAudioInfo"
        controlLabel="Toggle Audio Info Button"
        controlIsVisible={waveVisions.showAudioInfo}
        handler={(controlIsVisible) => setWaveVisions(prevState => ({ ...prevState, showAudioInfo: !controlIsVisible}))}
      ></WaveVisionsControlToggleButton>

      {/* VisionControls Toggle */}
      <WaveVisionsControlToggleButton
        controlName="showVisionControls"
        controlLabel="Toggle Vision Controls Button"
        controlIsVisible={waveVisions.showVisionControls}
        handler={(controlIsVisible) => setWaveVisions(prevState => ({ ...prevState, showVisionControls: !controlIsVisible}))}
      ></WaveVisionsControlToggleButton>
    </div>
  );
}

function WaveVisionsControlToggleButton({
  controlName,
  controlLabel,
  controlIsVisible,
  handler,
}: {
  controlName: string;
  controlLabel: string;
  controlIsVisible: boolean;
  handler: (controlIsVisible: boolean) => void;
}) {
  return (
    <Button
      onClick={() => handler(controlIsVisible)}
      className={cn(
        "group border rounded-sm transition border-neutral-800/70 hover:bg-neutral-900/30 hover:border-neutral-800",
        controlIsVisible && "bg-neutral-900/50 border-neutral-800",
      )}
      size="icon"
      variant="outline"
      aria-label={controlLabel}
    >
      {controlName === "showAudioInfo" && (
        <InfoCircledIcon
          className={cn("transition", controlIsVisible && "text-[#1AE803]")}
        />
      )}
      {controlName === "showVisionControls" && (
        <MixerHorizontalIcon
          className={cn("transition", controlIsVisible && "text-[#1AE803]")}
        />
      )}
    </Button>
  );
}

