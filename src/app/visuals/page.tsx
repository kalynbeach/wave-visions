import StreamVisualizer from '../streams/StreamVisualizer'

export default function Visuals() {
  return (
    <main className='min-h-screen p-8 flex-grow flex flex-col'>
      <h1 className='mb-8 text-5xl font-bold leading-tight tracking-tight'>
        Visuals
      </h1>
      <StreamVisualizer />
    </main>
  )
}