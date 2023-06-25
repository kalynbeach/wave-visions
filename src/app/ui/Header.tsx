import Link from 'next/link'

export default function Header() {
  return (
    <header className='w-full h-24 p-8 flex flex-row justify-between items-center border-b border-b-neutral-900'>
      <Link href='/' className='font-bold transition hover:text-kb-green'>
        <code>wave-visions</code>
      </Link>
      <nav className='flex flex-row gap-8 flex-shrink'>
        <Link href='/devices' className='transition hover:text-kb-green'>
          <span className='text-sm font-mono'>
            🎛️ devices
          </span>
        </Link>
        <Link href='/visions' className='transition hover:text-kb-green'>
          <span className='text-sm font-mono'>
            🌌 visions
          </span>
        </Link>
        {/* <Link href='/streams' className='transition hover:text-kb-green'>
          <span className='text-sm font-mono'>
            streams 🔊
          </span>
        </Link> */}
      </nav>
    </header>
  )
}