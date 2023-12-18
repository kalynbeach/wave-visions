import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { MediaDevicesProvider } from "./media-devices-context";
import { AudioDeviceProvider } from "./audio-device-context";
import { AudioStreamProvider } from "./audio-stream-context";
import { AudioProcessorProvider } from "./audio-processor-context";
import { VisionsProvider } from "./visions-context";
import Header from "@/components/header";
import AudioProcessor from "@/components/audio-processor";

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
          <AudioDeviceProvider>
            <AudioStreamProvider>
              <AudioProcessorProvider>
                <VisionsProvider>
                  <body className={`${inter.className} dark w-screen h-screen p-2`}>
                    <div className="w-full h-full flex flex-col gap-2 justify-between">
                      <Header />
                      <AudioProcessor />
                      {children}
                    </div>
                  </body>
                </VisionsProvider>
              </AudioProcessorProvider>
            </AudioStreamProvider>
          </AudioDeviceProvider>
        </MediaDevicesProvider>
    </html>
  );
}
