'use client'

import { useVisions } from '../VisionsContext'
import BoxesVision from './BoxesVision'

type Props = {}

export default function VisionCanvas({}: Props) {
  const [visionsState] = useVisions()

  return (
    <div className='p-4 w-full h-screen border rounded border-neutral-900'>
      { visionsState.selected === 'Boxes' && <BoxesVision /> }
      {/* TODO: Add other Visions */}
    </div>
  )
}