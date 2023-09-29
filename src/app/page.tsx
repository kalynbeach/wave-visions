import MediaDevices from '@/components/media-devices'
import StreamInfo from '@/components/stream-info'
import VisionSelector from '@/components/vision-selector'
import VisionCanvas from '@/components/vision-canvas'

export default function Home() {
  return (
    <main className='flex-grow'>
      <VisionCanvas />
    </main>
  )
}
