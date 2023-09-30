"use client";

import { useMediaDevices } from "@/app/media-devices-context";
import { useAudioDevice } from "@/app/audio-device-context";
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
  const [mediaDevices] = useMediaDevices();
  const [audioDevice, setAudioDevice] = useAudioDevice();

  const handleDeviceChange = (value: string) => {
    setAudioDevice({
      ...audioDevice,
      device: mediaDevices.devices.find(
        (device) => device.label === value
      ),
    });
  };
  
  // console.log(`[AudioDeviceSelector] mediaDevices: `, mediaDevices);
  // console.log(`[AudioDeviceSelector] audioDevice: `, audioDevice);
  // console.log(`[AudioDeviceSelector] audioDevice.device.label: `, audioDevice.device?.label);

  return (
    <Select onValueChange={handleDeviceChange} value={audioDevice.device?.label}>
      <SelectTrigger className="w-[320px]">
        <SelectValue placeholder="Select an audio device" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Audio Devices</SelectLabel>
          {mediaDevices.devices.filter((device) => device.kind === "audioinput").map(device => (
            <SelectItem key={device.label} value={device.label}>
              {device.label || 'Unknown Device'}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}