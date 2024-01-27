import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { AudioProcessor } from "./audio-processor";
import type {
  WaveVisions,
  WaveVisionsControls,
  WaveVisionsMediaStreams,
  Vision,
  VisionName,
  VisionModifiers,
  AudioFrequencies,
} from "./definitions";


//
// WaveVisions atoms
//

// WaveVisions (app) atom
export const waveVisionsAtom = atom<WaveVisions>((get) => ({
  visions: get(visionsAtom),
  activeVision: get(activeVisionAtom),
  controls: get(waveVisionsControlsAtom),
}));

// Vision atoms

// TEMP helper function
function initVisions(): Vision[] {
  const visionNames: VisionName[] = ["Sphere", "Boxes", "Oscilloscope"]
  const visions: Vision[] = visionNames.map(visionName => ({
    name: visionName,
    description: visionName, // TEMP
    componentName: `${visionName}Vision`, // TEMP
    modifiers: {
      agility: 0,
      intellect: 0,
      strength: 0,
    },
  }));
  return visions;
}

const initialVisions = initVisions();

export const visionsAtom = atom<Vision[]>(initialVisions);

export const activeVisionAtom = atom<Vision>(initialVisions[0]);

export const visionModifiersAtom = atom(
  (get) => get(activeVisionAtom).modifiers,
  (_get, set, update: Partial<VisionModifiers>) => {
    update.agility && set(visionAgilityModifierAtom, update.agility);
    update.intellect && set(visionIntellectModifierAtom, update.intellect);
    update.strength && set(visionStrengthModifierAtom, update.strength);
  }
);

export const visionAgilityModifierAtom = atom<number>(initialVisions[0].modifiers.agility);
export const visionIntellectModifierAtom = atom<number>(initialVisions[0].modifiers.intellect);
export const visionStrengthModifierAtom = atom<number>(initialVisions[0].modifiers.strength);

// WaveVisionsControls atoms

export const waveVisionsControlsAtom = atom(
  (get) => ({
    showAudioInfo: get(showAudioInfoAtom),
    showVisionControls: get(showVisionControlsAtom),
  } as WaveVisionsControls),
  (_get, set, update: Partial<WaveVisionsControls>) => {
    update.showAudioInfo !== undefined && set(showAudioInfoAtom, update.showAudioInfo);
    update.showVisionControls !== undefined && set(showVisionControlsAtom, update.showVisionControls);
  }
);

export const showAudioInfoAtom = atom<boolean>(false);
export const showVisionControlsAtom = atom<boolean>(false);


//
// MediaDevice atoms
//

export const mediaDevicesAtom = atom<MediaDeviceInfo[]>([]);

export const audioDevicesAtom = atom<MediaDeviceInfo[]>(
  (get) => get(mediaDevicesAtom).filter((device) => device.kind === "audioinput")
);

export const activeAudioDeviceAtom = atom<MediaDeviceInfo | null>(null);


//
// MediaStream atoms
//

async function getAudioStream(audioDevice: MediaDeviceInfo) {
  return await navigator.mediaDevices.getUserMedia({
    audio: {
      deviceId: audioDevice.deviceId,
    },
  });
}

export const mediaStreamsAtom = atom(
  async (get) => {
    const activeAudioDevice = get(activeAudioDeviceAtom);
    if (!activeAudioDevice) return null
    const audioStream = await getAudioStream(activeAudioDevice);
    const streams: WaveVisionsMediaStreams = {
      audio: audioStream,
    };
    return streams;
  },
  (_get, set, update: Partial<WaveVisionsMediaStreams>) => {
    update.audio && set(audioStreamAtom, update.audio);
  }
);

export const audioStreamAtom = atom<MediaStream | null>(null);


//
// AudioProcessor atoms
//

export const audioProcessorAtom = atom<AudioProcessor | null>(null);

export const audioFrequenciesAtom = atom<AudioFrequencies | null>(null);

export const audioVolumeAtom = atom<number>(0);