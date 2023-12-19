import Link from "next/link";
import HeaderMenubar from "./header-menubar";
// import AudioDeviceSelector from "./audio-device-selector";

export default function Header() {
  return (
    <header className="z-50 h-24 m-2 p-4 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center md:justify-between bg-background border dark:border-neutral-800/80 rounded-sm">
      <div className="flex flex-row gap-4 md:gap-8 items-center justify-between">
        <Link href="/" className="font-mono font-semibold transition hover:text-kb-green">
          <code>wave-visions</code>
        </Link>
        <HeaderMenubar />
      </div>
    </header>
  );
}