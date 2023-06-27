'use client'

import useUserMedia from '@/app/devices/useUserMedia'
import Canvas from '@/app/ui/Canvas'
import Box from '@/app/mesh/Box'

export default function BoxesVision() {
  const streamState = useUserMedia()

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} volume={streamState.volume} />
    </Canvas>
  )
}