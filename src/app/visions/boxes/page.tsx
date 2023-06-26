'use client'

import useUserMedia from '@/app/devices/useUserMedia'
import Canvas from '@/app/ui/Canvas'
import Box from '@/app/mesh/Box'

export default function BoxesVision() {
  const volume = useUserMedia()

  return (
    <main className='min-h-screen p-8 flex-grow flex flex-col'>
      <h1 className='text-xl font-bold'>
        <code>Boxes</code>
      </h1>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[0, 0, 0]} volume={volume} />
      </Canvas>
    </main>
  )
}