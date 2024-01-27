"use client";

import { useAtom } from "jotai";
import { audioDevicesAtom, activeAudioDeviceAtom } from "@/lib/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AudioDeviceSelector() {
  const [audioDevices] = useAtom(audioDevicesAtom);
  const [activeAudioDevice, setActiveAudioDevice] = useAtom(activeAudioDeviceAtom);

  const handleDeviceChange = (value: string) => {
    if (audioDevices.length === 0) return;
    const device = audioDevices.find((device) => device.label === value);
    if (device) {
      console.log(`[AudioDeviceSelector handleDeviceChange] changing device: `, device);
      // setMediaDevices(prevState => ({ ...prevState, audioDevice: device }));
      setActiveAudioDevice(device);
    }
  };

  return (
    <Select onValueChange={handleDeviceChange} value={activeAudioDevice?.label}>
      <SelectTrigger className="md:min-w-[256px] ml-auto">
        <SelectValue placeholder="Select an audio device" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Audio Devices</SelectLabel>
          {audioDevices.map(device => (
            <SelectItem key={device.label} value={device.label}>
              {device.label || 'Unknown Device'}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}