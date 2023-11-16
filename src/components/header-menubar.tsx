"use client";

import { useMediaDevices } from "@/app/media-devices-context";
import { useAudioDevice } from "@/app/audio-device-context";
import { VisionSelection, useVisions } from "@/app/visions-context";
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
  const [mediaDevices] = useMediaDevices();
  const [audioDevice, setAudioDevice] = useAudioDevice();
  const [visionsState, setVisionsState] = useVisions();

  const handleDeviceChange = (value: string) => {
    setAudioDevice({
      ...audioDevice,
      device: mediaDevices.devices.find(
        (device) => device.label === value
      ),
    });
  };

  const handleVisionChange = (value: string) => {
    setVisionsState({ ...visionsState, selected: value as VisionSelection });
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
          <MenubarRadioGroup value={audioDevice.device?.label} onValueChange={handleDeviceChange}>
            {mediaDevices.devices.filter((device) => device.kind === "audioinput").map(device => (
              <MenubarRadioItem key={device.label} value={device.label}>
                {device.label || 'Unknown Device'}
              </MenubarRadioItem>
            ))}
          </MenubarRadioGroup>
          {/* <MenubarCheckboxItem checked>Microphone</MenubarCheckboxItem> */}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Visions</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={visionsState.selected} onValueChange={handleVisionChange}>
            {Object.keys(VisionSelection).map((vision) => (
              <MenubarRadioItem key={vision} value={vision}>
                {vision}
              </MenubarRadioItem>
            ))}
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}