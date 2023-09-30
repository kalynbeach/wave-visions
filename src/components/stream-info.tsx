"use client";

import { useAudioStream } from "@/app/audio-stream-context";

export default function StreamInfo() {
  const [audioStream] = useAudioStream();
  const roundedVolume = Math.round(audioStream.volume);
  return (
    <div className="p-4 basis-1/2 flex flex-col gap-2 justify-center border rounded-sm border-neutral-900">
      <section className="flex flex-row justify-between items-center">
        <span className="font-mono font-bold">StreamInfo</span>
      </section>
      <section className="flex flex-row justify-between items-center">  
        <span className="">Volume:</span>
        <span className="text-xl font-bold">{roundedVolume}</span>
      </section>
    </div>
  );
}