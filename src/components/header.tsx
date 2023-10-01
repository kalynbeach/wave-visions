import Link from 'next/link'
import HeaderMenubar from './header-menubar'
import AudioDeviceSelector from './audio-device-selector'

export default function Header() {
  return (
    <header className='w-full p-8 flex flex-row gap-8 items-center justify-start border dark:border-neutral-800/80 rounded-sm'>
      <Link href='/' className='font-mono font-semibold transition hover:text-kb-green'>
        <code>wave-visions</code>
      </Link>
      <HeaderMenubar />
      <AudioDeviceSelector />
    </header>
  )
}