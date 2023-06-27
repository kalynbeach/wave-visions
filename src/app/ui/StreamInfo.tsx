'use client'

import useUserMedia from '@/app/devices/useUserMedia'

type Props = {}

export default function StreamInfo() {
  const volume = useUserMedia()

  return (
    <div className='p-4 basis-1/2 flex flex-col justify-between border rounded border-neutral-900'>
      <section className='flex flex-row justify-between items-center'>
        <span className='text-sm font-bold'>Stream Info</span>
      </section>
      <section className='flex flex-row justify-between items-center'>  
        <span className=''>Volume:</span>
        <span className='text-xl font-bold'>{Math.round(volume)}</span>
      </section>
    </div>
  )
}