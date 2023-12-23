import Link from "next/link";
import HeaderMenubar from "./header-menubar";

export default function Header() {
  return (
    <header className="col-span-full row-span-1 self-start z-50 h-fit m-2 p-3 sm:p-5 flex flex-col sm:flex-row sm:items-center md:justify-start gap-3 sm:gap-5 bg-background border rounded-sm">
      <Link href="/" className="font-mono font-bold transition hover:text-kb-green">
        <code>wave-visions</code>
      </Link>
      <HeaderMenubar />
    </header>
  );
}