"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  visionsAtom,
  activeVisionAtom,
  mediaDevicesAtom,
  audioDevicesAtom,
  activeAudioDeviceAtom,
} from "@/lib/store";
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
  const [visions] = useAtom(visionsAtom);
  const [activeVision, setActiveVision] = useAtom(activeVisionAtom);
  const [mediaDevices, setMediaDevices] = useAtom(mediaDevicesAtom);
  const [audioDevices] = useAtom(audioDevicesAtom);
  const [activeAudioDevice, setActiveAudioDevice] = useAtom(activeAudioDeviceAtom);

  const handleDeviceChange = (value: string) => {
    if (!mediaDevices) return;
    const device = mediaDevices.find((device) => device.label === value);
    if (device) {
      setActiveAudioDevice(device);
    }
  };

  const handleVisionChange = (value: string) => {
    const selectedVision = visions.find((vision) => vision.name === value);
    selectedVision && setActiveVision(selectedVision);
  };

  // Initialize media devices
  useEffect(() => {
    async function getMediaDevices() {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const devices = await navigator.mediaDevices.enumerateDevices();
      setMediaDevices(devices);
    }
    getMediaDevices();
    return () => {};
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setActiveAudioDevice(audioDevices[0]);
  }, [audioDevices]); // eslint-disable-line react-hooks/exhaustive-deps

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
          {audioDevices.length > 0 && activeAudioDevice && (
            <MenubarRadioGroup value={activeAudioDevice.label} onValueChange={handleDeviceChange}>
              {audioDevices.map(device => (
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
          <MenubarRadioGroup value={activeVision?.name ?? undefined} onValueChange={handleVisionChange}>
            {visions && visions.map(vision => (
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