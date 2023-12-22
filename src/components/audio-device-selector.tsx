"use client";

import { useMediaDevices } from "@/contexts/media-devices";
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
  const [mediaDevices, setMediaDevices] = useMediaDevices();

  const handleDeviceChange = (value: string) => {
    if (!mediaDevices.devices) return;
    const device = mediaDevices.devices.find((device) => device.label === value);
    if (device) {
      console.log(`[AudioDeviceSelector handleDeviceChange] changing device: `, device);
      setMediaDevices(prevState => ({ ...prevState, audioDevice: device }));
    }
  };

  return (
    <Select onValueChange={handleDeviceChange} value={mediaDevices.audioDevice?.label}>
      <SelectTrigger className="md:min-w-[256px] ml-auto">
        <SelectValue placeholder="Select an audio device" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Audio Devices</SelectLabel>
          {mediaDevices.devices && mediaDevices.devices.filter((device) => device.kind === "audioinput").map(device => (
            <SelectItem key={device.label} value={device.label}>
              {device.label || 'Unknown Device'}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}