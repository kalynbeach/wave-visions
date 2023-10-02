'use client'

import { useVisions } from '@/app/visions-context'
import BoxesVision from './boxes-vision'
import SphereVision from './sphere-vision'

type Props = {}

export default function VisionCanvas({}: Props) {
  const [visionsState] = useVisions()

  return (
    <div className='vision-canvas w-full h-full border dark:border-neutral-900 rounded-sm'>
      {/* { visionsState.selected === 'Boxes' && <BoxesVision /> } */}
      <SphereVision />
      {/* TODO: Add other Visions */}
    </div>
  )
}