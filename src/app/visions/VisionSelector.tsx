'use client'

import Link from 'next/link'
import { useVisions } from '../visions-context'

export default function VisionSelector() {
  const visions = useVisions()

  return (
    <div className='p-4 basis-1/2 flex flex-col justify-between gap-2 border rounded border-neutral-900'>
      <section className='flex flex-row justify-between items-center font-mono'>
        <span className='text-sm font-mono font-bold'>Vision Selector</span>
        <code className='p-2 border border-neutral-900 rounded text-sm text-kb-green'>{ visions.selected }</code>
      </section>
      <section className='flex flex-col p-2 border border-neutral-900 rounded'>
        <Link href='/visions/boxes' className='transition hover:text-kb-green'>
          <span className='text-sm font-mono'>
            Boxes
          </span>
        </Link>
      </section>
    </div>
  )
}