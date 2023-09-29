'use client'

// import useMediaDevices from './useMediaDevices'
import { useMediaDevices } from '../app/MediaDevicesContext'
// import { useStream } from '../StreamContext'

export default function MediaDevices() {
  // const mediaDevices = useMediaDevices()
  const [mediaDevices, setMediaDevices] = useMediaDevices()
  // const [streamState, setStreamState] = useStream()

  const setSelectedMediaDevice = (device: MediaDeviceInfo) => {
    // setStreamState({ ...streamState, mediaDevice: device })
    setMediaDevices({ ...mediaDevices, activeDevice: device })
  }

  return (
    <div className='flex flex-col gap-4'>
      <details open className='w-96 p-4 flex flex-row justify-between items-center border rounded border-neutral-900 cursor-pointer transition hover:border-neutral-800 open:border-neutral-800'>
        <summary className='inline-block'>
          <div className='min-h-[32px] flex flex-row justify-between items-center'>
            <span className='text-sm font-mono font-bold'>
              { mediaDevices.activeDevice ? mediaDevices.activeDevice.label : 'No device selected' }
            </span>
            <div className='w-10 h-10 p-2 flex flex-row justify-center items-center bg-neutral-900 border border-neutral-800 rounded'>
              <span className='text-lg font-bold'>{mediaDevices.devices ?.length}</span>
            </div>
          </div>
        </summary>
        <div className='mt-4'>
          <ul className='max-h-64 pr-4 flex flex-col gap-3 overflow-y-auto scroll-smooth'>
            {
              mediaDevices.devices?.map((device, index) => (
                <li 
                  key={index}
                  onClick={() => setSelectedMediaDevice(device)}
                  className={`p-4 flex flex-row justify-between border rounded cursor-pointer transition hover:border-neutral-800 ${device.deviceId === mediaDevices.activeDevice?.deviceId ? 'bg-neutral-900 border-neutral-800' : 'border-neutral-900'}`}
                >
                  <span className={`text-sm font-mono transition ${device.deviceId === mediaDevices.activeDevice?.deviceId ? 'text-kb-green' : ''}`}>
                    {device.label}
                  </span>
                  <div className='flex flex-row justify-between items-center gap-3 text-xs font-mono font-bold'>
                    { device.kind.includes('audio') && <span>A</span> }
                    { device.kind.includes('video') && <span>V</span> }
                    { device.kind.includes('input') && <span>I</span> }
                    { device.kind.includes('output') && <span>O</span> }
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </details>
    </div>
  )
}