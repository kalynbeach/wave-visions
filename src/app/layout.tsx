import "@/styles/globals.css";
import { Inter } from "next/font/google";
// import { AudioContextProvider } from "@/contexts/audio-context";
import { MediaDevicesProvider } from "@/contexts/media-devices";
import { AudioStreamProvider } from "@/contexts/audio-stream";
import { AudioProcessorProvider } from "@/contexts/audio-processor";
// import { WaveVisionsAudioProvider } from "./wave-visions-audio-context";
// import { MediaDevicesProvider } from "./media-devices-context";
// import { AudioStreamProvider } from "./audio-stream-context";
// import { AudioProcessorProvider } from "./audio-processor-context";
import { AudioVolumeProvider } from "./audio-volume-context";
import { AudioFrequenciesProvider } from "./audio-frequencies-context";
import { AudioWaveformProvider } from "./audio-waveform-context";
import { VisionsProvider } from "./visions-context";
import Header from "@/components/header";
import AudioInfo from "@/components/audio-info";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "wave-visions",
  description: "Audio visualization experiments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <MediaDevicesProvider>
        <AudioStreamProvider>
          <AudioProcessorProvider>
            <AudioVolumeProvider>
              <AudioFrequenciesProvider>
                <AudioWaveformProvider>
                  <VisionsProvider>
                    <body className={`${inter.className} dark w-screen h-screen p-2`}>
                      <div className="relative w-full h-full flex flex-col">
                        <Header />
                        <AudioInfo />
                        <main className="absolute w-full h-full">
                          {children}
                        </main>
                      </div>
                    </body>
                  </VisionsProvider>
                </AudioWaveformProvider>
              </AudioFrequenciesProvider>
            </AudioVolumeProvider>
          </AudioProcessorProvider>
        </AudioStreamProvider>
      </MediaDevicesProvider>
    </html>
  );
}
