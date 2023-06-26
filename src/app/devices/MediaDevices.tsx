'use client'

import useMediaDevices from './useMediaDevices'

export default function MediaDevices() {
  const mediaDevices = useMediaDevices()

  return (
    <div className='media-devices flex flex-col gap-4'>
      <details open className='w-96 p-4 flex flex-row justify-between items-center border rounded border-neutral-900 cursor-pointer transition hover:border-neutral-800'>
        <summary className='inline-block'>
          <div className='min-h-[32px] flex flex-row justify-between items-center'>
            <span>Media Devices:</span>
            <span className='text-lg font-bold'>{mediaDevices?.length}</span>
          </div>
        </summary>
        <div className='mt-4 flex flex-col gap-2 border rounded border-neutral-900'>
          <ul className='px-4 py-2'>
            {
              mediaDevices?.map((device, index) => (
                <li key={index} className='py-3 flex flex-row justify-between border-b border-neutral-950 last:border-b-0'>
                  <span className='text-sm font-mono'>{device.label}</span>
                  { 
                    device.kind.includes('input') && (
                      <span className='text-xs font-mono'>I</span>
                    )
                  }
                </li>
              ))
            }
          </ul>
        </div>
      </details>
    </div>
  )
}