import Image from 'next/image'
import Link from 'next/link'
import MediaDevices from './devices/MediaDevices'
import StreamInfo from './ui/StreamInfo'
import VisionSelector from './visions/VisionSelector'
import VisionCanvas from './visions/VisionCanvas'

export default function Home() {
  return (
    <main className='min-h-screen p-8 flex flex-col gap-4 justify-between'>

      <h1 className='my-6 text-3xl font-mono font-bold'>wave-visions</h1>

      <section className=''>
        <div className='flex flex-row justify-between gap-4'>
          <StreamInfo />
          <VisionSelector />
        </div>
        <div className='my-4 text-lg font-mono font-bold'>VisionCanvas</div>
        <VisionCanvas />
      </section>

      <section className=''>
        <div className='my-4 text-lg font-mono font-bold'>MediaDevices</div>
        <MediaDevices />
      </section>

    </main>
  )
}
