"use client";

import { useAtom } from "jotai";
import { waveVisionsControlsAtom } from "@/lib/store";
import type { WaveVisionsControls } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { InfoCircledIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function WaveVisionsControls() {
  const [controls, setControls] = useAtom(waveVisionsControlsAtom);
  return (
    <div className="flex-1 flex flex-row items-center justify-end gap-2">
      {/* AudioInfo Toggle */}
      <WaveVisionsControlToggleButton
        controlName="showAudioInfo"
        controlLabel="Toggle Audio Info Button"
        controlIsVisible={controls.showAudioInfo}
        handler={() => setControls({ showAudioInfo: !controls.showAudioInfo })}
      ></WaveVisionsControlToggleButton>

      {/* VisionControls Toggle */}
      <WaveVisionsControlToggleButton
        controlName="showVisionControls"
        controlLabel="Toggle Vision Controls Button"
        controlIsVisible={controls.showVisionControls}
        handler={() => setControls({ showVisionControls: !controls.showVisionControls })}
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
  handler: (update: Partial<WaveVisionsControls>) => void;
}) {
  return (
    <Button
      onClick={() => handler({[controlName]: !controlIsVisible})}
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

