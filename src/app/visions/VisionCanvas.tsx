'use client'

import useUserMedia from '@/app/devices/useUserMedia'
import Canvas from '@/app/ui/Canvas'
import Box from '@/app/mesh/Box'

type Props = {}

export default function VisionCanvas() {
  const volume = useUserMedia()

  return (
    <div className='p-4 w-full h-screen border rounded border-neutral-900'>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[0, 0, 0]} volume={volume} />
      </Canvas>
    </div>
  )
}