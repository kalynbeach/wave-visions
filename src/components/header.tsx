import Link from 'next/link'
import HeaderMenubar from './header-menubar'
import AudioDeviceSelector from './audio-device-selector'

export default function Header() {
  return (
    <header className='w-full p-4 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 md:items-center justify-between border dark:border-neutral-800/80 rounded-sm'>
      <div className='flex flex-row gap-4 md:gap-8 items-center justify-between'>
        <Link href='/' className='font-mono font-semibold transition hover:text-kb-green'>
          <code>wave-visions</code>
        </Link>
        <HeaderMenubar />
      </div>
      <div>
        <AudioDeviceSelector />
      </div>
    </header>
  )
}