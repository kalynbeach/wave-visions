"use client";

import { useMediaDevices } from "@/contexts/media-devices";
import { useWaveVisions } from "@/contexts/wave-visions";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

export default function HeaderMenubar() {
  const [mediaDevices, setMediaDevices] = useMediaDevices();
  const [waveVisions, setWaveVisions] = useWaveVisions();

  const handleDeviceChange = (value: string) => {
    if (!mediaDevices.devices) return;
    const device = mediaDevices.devices.find((device) => device.label === value);
    if (device) {
      setMediaDevices(prevState => ({ ...prevState, audioDevice: device }));
    }
  };

  const handleVisionChange = (value: string) => {
    setWaveVisions(prevState => ({ ...prevState, activeVision: value }));
  };

  return ( 
    <Menubar className="w-fit rounded-sm">
      <MenubarMenu>
        <MenubarTrigger className="rounded-sm">Info</MenubarTrigger>
        <MenubarContent className="rounded-sm">
          <MenubarItem className="rounded-sm">
            Audio {`->`} Data {`->`} Visions
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="flex flex-row gap-1 rounded-sm">
            Built by <a className="text-[#1AE803]" href="https://github.com/kalynbeach" target="_blank">@kalynbeach</a>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="rounded-sm">Devices</MenubarTrigger>
        <MenubarContent className="rounded-sm" collisionPadding={{ left: 24, right: 24 }}>
          <MenubarItem disabled className="font-semibold rounded-sm">
            Audio Devices
          </MenubarItem>
          <MenubarSeparator />
          {mediaDevices.devices && mediaDevices.audioDevice && (
            <MenubarRadioGroup value={mediaDevices.audioDevice.label} onValueChange={handleDeviceChange}>
              {mediaDevices.devices.map(device => (
                <MenubarRadioItem key={device.label} value={device.label} className="rounded-sm">
                  {device.label || 'Unknown Device'}
                </MenubarRadioItem>
              ))}
            </MenubarRadioGroup>
          )}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="rounded-sm">Visions</MenubarTrigger>
        <MenubarContent className="rounded-sm">
          <MenubarRadioGroup value={waveVisions.activeVision ?? undefined} onValueChange={handleVisionChange}>
            {waveVisions.visions && waveVisions.visions.map(vision => (
              <MenubarRadioItem key={vision.name} value={vision.name} className="rounded-sm">
                {vision.name}
              </MenubarRadioItem>
            ))}
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}