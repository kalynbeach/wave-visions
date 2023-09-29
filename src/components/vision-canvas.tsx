'use client'

import { useVisions } from '@/app/VisionsContext'
import BoxesVision from './boxes-vision'

type Props = {}

export default function VisionCanvas({}: Props) {
  const [visionsState] = useVisions()

  return (
    <div className='vision-canvas w-full h-full border dark:border-neutral-900 rounded-sm'>
      { visionsState.selected === 'Boxes' && <BoxesVision /> }
      {/* TODO: Add other Visions */}
    </div>
  )
}