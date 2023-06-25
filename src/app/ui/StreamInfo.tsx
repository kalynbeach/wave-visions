'use client'

import useUserMedia from '@/app/devices/useUserMedia'

type Props = {}

export default function StreamInfo() {
  const volume = useUserMedia()

  return (
    <div className='p-4 basis-1/2 flex flex-row justify-between items-center border rounded border-neutral-900'>
      <span className=''>Volume:</span>
      <span className='text-xl font-bold'>{Math.round(volume)}</span>
    </div>
  )
}