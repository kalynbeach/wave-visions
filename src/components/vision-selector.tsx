'use client'

import { useVisions } from '../app/visions-context'

type VisionSelectorButtonProps = {
  name: string
  isSelected: boolean
  onClick: () => void
}

function VisionSelectorButton({ name, isSelected, onClick }: VisionSelectorButtonProps) {
  return (
    <div 
      className={`p-2 text-sm font-mono cursor-pointer transition hover:text-kb-green border rounded ${isSelected ? 'text-kb-green bg-neutral-900 border-neutral-800' : 'border-neutral-900'}`}
      onClick={onClick}  
    >
      { name }
    </div>
  )
}

export default function VisionSelector() {
  const [visionsState, setVisionsState] = useVisions()

  const setSelectedVision = (name: string) => {
    setVisionsState({ ...visionsState, selected: name })
  }

  return (
    <div className='p-4 basis-1/2 flex flex-col gap-4 justify-between border rounded border-neutral-900'>
      <section className='flex flex-row justify-between items-center'>
        <span className='font-mono font-bold'>VisionCanvas</span>
      </section>
      <section className='flex flex-row gap-4'>
        <VisionSelectorButton name='Boxes' isSelected={visionsState.selected === 'Boxes'} onClick={() => setSelectedVision('Boxes')} />
        <VisionSelectorButton name='Spheres' isSelected={visionsState.selected === 'Spheres'} onClick={() => setSelectedVision('Spheres')} />
      </section>
    </div>
  )
}