import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='min-h-screen p-4 flex flex-col justify-between'>

      <div className='mb-32 grid lg:mb-0 lg:grid-cols-4 lg:text-left'>
        <Link
          href='/devices'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Devices{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            🎧 Media devices
          </p>
        </Link>
        
        <Link
          href='/visions'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Visions{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            🌌 Visions
          </p>
        </Link>

      </div>
    </main>
  )
}
