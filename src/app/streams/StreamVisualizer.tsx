'use client'

import useUserMedia from '../devices/useUserMedia'
import Canvas from '../Canvas'
import Box from '../Box'

export default function StreamVisualizer() {
  const volume = useUserMedia()

  return (
    <div className='w-full flex-grow flex flex-col gap-4'>
      {/* Stream Info */}
      <section className='p-4 flex flex-row justify-between items-center border rounded border-neutral-900'>
        <span className=''>Volume:</span>
        <span className='text-xl font-bold'>{Math.round(volume)}</span>
      </section>
      {/* Stream Canvas */}
      <section className='p-4 flex-grow flex flex-row justify-between items-center border rounded border-neutral-900'>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[0, 0, 0]} volume={volume}/>
        </Canvas>
      </section>
    </div>
  )
}