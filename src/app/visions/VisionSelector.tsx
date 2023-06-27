'use client'

import { useVisions } from '../visions-context'

export default function VisionSelector() {
  const [visionsState, setVisionsState] = useVisions()

  const setSelectedVision = (name: string) => {
    setVisionsState({ ...visionsState, selected: name })
  }

  return (
    <div className='p-4 basis-1/2 flex flex-col justify-between gap-4 border rounded border-neutral-900'>
      <section className='flex flex-row justify-between items-center'>
        <span className='text-sm font-bold'>
          Selector
        </span>
        <code className='p-2 border border-neutral-900 rounded text-sm text-kb-green'>
          { visionsState.selected }
        </code>
      </section>
      <section className='p-4 flex flex-col gap-4 border border-neutral-900 rounded'>
        <span className='text-sm font-mono cursor-pointer transition hover:text-kb-green' onClick={() => setSelectedVision('Boxes')}>
          Boxes
        </span>
        <span className='text-sm font-mono cursor-pointer transition hover:text-kb-green' onClick={() => setSelectedVision('Spheres')}>
          Spheres
        </span>
      </section>
    </div>
  )
}