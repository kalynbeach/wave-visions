# `wave-visions` Notes

## State

- **WaveVisions** (app)
  - allVisions: `Vision[]`
  - activeVision: `Vision`
  - controls: `WaveVisionsControls`
    - showVisionControls: `boolean`  
    - showAudioInfo: `boolean`
    - *showVideoInfo: `boolean`*
    - *showVisionInfo: `boolean`*
- **MediaDevices**
  - allDevices: `MediaDevice[]`
  - activeAudioDevice: `MediaDevice | null`
  - *activeVideoDevice: `MediaDevice | null`*
- **MediaStreams**
  - allStreams: `MediaStream[]`
  - audioStream : `MediaStream | null`
  - *videoStream: `MediaStream | null`*
- **AudioProcessor**
  - processor: `AudioProcessor | null` (probably should refactor use of `AudioProcessor` instance)
  - frequencies: `AudioFrequencies | null`
  - volume: `number`
  - *waveform: `Float32Array | null`*
- **Vision** (activeVision)
  - name: `string`
  - modifiers: `VisionModifiers`
    - agility: `number`
    - intellect: `number`
    - strength: `number`
