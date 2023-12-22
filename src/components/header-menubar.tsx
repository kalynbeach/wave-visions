"use client";

import { useMediaDevices } from "@/contexts/media-devices";
import { useVisions } from "@/contexts/visions";
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
  const [visions, setVisions] = useVisions();

  const handleDeviceChange = (value: string) => {
    console.log(`[HeaderMenubar handleDeviceChange] mediaDevices: `, mediaDevices);
    if (!mediaDevices.devices) return;
    const device = mediaDevices.devices.find((device) => device.label === value);
    if (device) {
      console.log(`[HeaderMenubar handleDeviceChange] changing device: `, device);
      setMediaDevices(prevState => ({ ...prevState, audioDevice: device }));
    }
  };

  const handleVisionChange = (value: string) => {
    // setVisionsState({ ...visionsState, selected: value as VisionSelection });
    setVisions(prevState => ({ ...prevState, selected: value }));
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Info</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Audio {`->`} Processing {`->`} Visuals</MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>
            Made by @kalynbeach
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Devices</MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled className="font-medium">
            Audio Devices
          </MenubarItem>
          {/* <MenubarSeparator /> */}
          {mediaDevices.devices && mediaDevices.audioDevice && (
            <MenubarRadioGroup value={mediaDevices.audioDevice.label} onValueChange={handleDeviceChange}>
              {mediaDevices.devices.map(device => (
                <MenubarRadioItem key={device.label} value={device.label}>
                  {device.label || 'Unknown Device'}
                </MenubarRadioItem>
              ))}
            </MenubarRadioGroup>
          )}
          {/* <MenubarCheckboxItem checked>Microphone</MenubarCheckboxItem> */}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Visions</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={visions.activeVision ?? undefined} onValueChange={handleVisionChange}>
            {visions.visions && visions.visions.map(vision => (
              <MenubarRadioItem key={vision.name} value={vision.name}>
                {vision.name}
              </MenubarRadioItem>
            ))}
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}