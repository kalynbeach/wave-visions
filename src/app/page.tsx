import MediaDevices from '@/components/media-devices'
import StreamInfo from '@/components/stream-info'
import VisionSelector from '@/components/vision-selector'
import VisionCanvas from '@/components/vision-canvas'

export default function Home() {
  return (
    <main className='min-h-screen p-8 flex flex-col gap-4 justify-between'>

      <h1 className='my-3 text-3xl font-mono font-bold'>wave-visions</h1>

      <section className=''>
        <div className='flex flex-row justify-between gap-4'>
          <section className='w-1/2'>
            <div className='my-4 font-mono font-bold'>StreamInfo</div>
            <StreamInfo />
          </section>
          <section className='w-1/2'>
            <div className='my-4 font-mono font-bold'>VisionCanvas</div>
            <VisionSelector />
          </section>
        </div>
        <div className='my-4 font-mono font-bold'>VisionCanvas</div>
        <VisionCanvas />
      </section>

      {/* <section className=''>
        <div className='my-4 font-mono font-bold'>MediaDevices</div>
        <MediaDevices />
      </section> */}

    </main>
  )
}
