'use client'

import { VisionSelection, useVisions } from '@/app/visions-context'
import BoxesVision from './boxes-vision'
import SphereVision from './sphere-vision'
import OscilloscopeVision from './oscilloscope-vision'

type Props = {}

export default function VisionCanvas({}: Props) {
  const [visionsState] = useVisions()

  return (
    <div className='vision-canvas w-full h-full border dark:border-neutral-900 rounded-sm'>
      { visionsState.selected === VisionSelection.Boxes && <BoxesVision /> }
      { visionsState.selected === VisionSelection.Sphere && <SphereVision /> }
      { visionsState.selected === VisionSelection.Oscilloscope && <OscilloscopeVision /> }
      {/* TODO: Add other Visions */}
    </div>
  )
}