import Link from 'next/link'

export default function VisionSelector() {
  return (
    <div className='p-4 basis-1/2 flex flex-col justify-between gap-2 border rounded border-neutral-900'>
      <span className='text-xs font-mono font-bold'>Vision Selector</span>
      <Link href='/visions/boxes' className='transition hover:text-kb-green'>
        <span className='text-sm font-mono'>
          Boxes
        </span>
      </Link>
    </div>
  )
}