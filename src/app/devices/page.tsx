import MediaDevices from '@/components/media-devices'

export default function Devices() {
  return (
    <main className='min-h-screen p-8 flex-grow flex flex-col'>
      <h1 className='mb-8 text-5xl font-bold leading-tight tracking-tight'>
        Devices
      </h1>
      <MediaDevices />
    </main>
  )
}