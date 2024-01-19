import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { MediaDevicesProvider } from "@/contexts/media-devices";
import { AudioStreamProvider } from "@/contexts/audio-stream";
import { AudioProcessorProvider } from "@/contexts/audio-processor";
import { WaveVisionsProvider } from "@/contexts/wave-visions";
import { VisionProvider } from "@/contexts/vision";
import Header from "@/components/header";
import AudioInfo from "@/components/audio-info";
import VisionControls from "@/components/vision-controls";

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
      <WaveVisionsProvider>
        <MediaDevicesProvider>
          <AudioStreamProvider>
            <AudioProcessorProvider>
              <VisionProvider>
                <body className={`dark w-screen h-screen p-2 font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
                  <div className="relative w-full h-full grid grid-cols-4 sm:grid-cols-8 grid-rows-8">
                    <Header />
                    <AudioInfo />
                    <VisionControls />
                    <main className="absolute inset-0 z-0 col-span-full row-span-full w-full h-full place-self-center border dark:border-neutral-900 rounded-sm">
                      {children}
                    </main>
                  </div>
                </body>
              </VisionProvider>
            </AudioProcessorProvider>
          </AudioStreamProvider>
        </MediaDevicesProvider>
      </WaveVisionsProvider>
    </html>
  );
}
