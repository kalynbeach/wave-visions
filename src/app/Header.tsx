import Link from 'next/link'

export default function Header() {
  return (
    <header className='w-full h-24 p-8 flex flex-row justify-between items-center border-b border-b-neutral-900'>
      <Link href='/' className='font-bold transition hover:text-green-500'>
        <code>wave-visions</code>
      </Link>
      <nav className='flex flex-row gap-8 flex-shrink'>
        <Link href='/devices' className='transition hover:text-green-500'>
          <span className='text-sm font-mono'>
            devices 🎛️
          </span>
        </Link>
        <Link href='/visuals' className='transition hover:text-green-500'>
          <span className='text-sm font-mono'>
            visuals 🌌
          </span>
        </Link>
        {/* <Link href='/streams' className='transition hover:text-green-500'>
          <span className='text-sm font-mono'>
            streams 🔊
          </span>
        </Link> */}
      </nav>
    </header>
  )
}