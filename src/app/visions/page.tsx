import StreamInfo from '@/components/StreamInfo'
import VisionSelector from '@/components/VisionSelector'
import VisionCanvas from '@/components/VisionCanvas'

export default function Visions() {
  return (
    <main className='min-h-screen p-8 flex-grow flex flex-col gap-4'>
      <h1 className='mb-8 text-5xl font-bold leading-tight tracking-tight'>
        Visions
      </h1>

      <section className='flex flex-row justify-between gap-4'>
        <StreamInfo />
        <VisionSelector />
      </section>

      <section className='flex-grow'>
        <VisionCanvas />
      </section>
    </main>
  )
}