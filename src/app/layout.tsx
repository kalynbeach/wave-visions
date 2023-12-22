import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { MediaDevicesProvider } from "@/contexts/media-devices";
import { AudioStreamProvider } from "@/contexts/audio-stream";
import { AudioProcessorProvider } from "@/contexts/audio-processor";
import { VisionsProvider } from "@/contexts/visions";
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
          </AudioProcessorProvider>
        </AudioStreamProvider>
      </MediaDevicesProvider>
    </html>
  );
}
