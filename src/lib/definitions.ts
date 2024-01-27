export type FrequencyBand = {
  lower: number;
  upper: number;
};

export type AudibleSpectrum = {
  subBass: FrequencyBand;
  bass: FrequencyBand;
  lowMidrange: FrequencyBand;
  midrange: FrequencyBand;
  upperMidrange: FrequencyBand;
  presence: FrequencyBand;
  brilliance: FrequencyBand;
};

export type AudioFrequencies = {
  subBass: number;
  bass: number;
  lowMidrange: number;
  midrange: number;
  upperMidrange: number;
  presence: number;
  brilliance: number;
};

export const AUDIBLE_SPECTRUM: AudibleSpectrum = {
  subBass: { lower: 20, upper: 60 },
  bass: { lower: 60, upper: 250 },
  lowMidrange: { lower: 250, upper: 500 },
  midrange: { lower: 500, upper: 2000 },
  upperMidrange: { lower: 2000, upper: 4000 },
  presence: { lower: 4000, upper: 6000 },
  brilliance: { lower: 6000, upper: 20000 },
};

export type WaveVisions = {
  visions: Vision[];
  activeVision: Vision | null;
  controls: WaveVisionsControls;
};

export type WaveVisionsControls = {
  showVisionControls: boolean;
  showAudioInfo: boolean;
};

export type WaveVisionsMediaStreams = {
  audio: MediaStream | null;
};

export type Vision = {
  name: VisionName;
  description: string;
  componentName: string;
  modifiers: VisionModifiers;
};

export type VisionModifiers = {
  agility: number;
  intellect: number;
  strength: number;
};

export type VisionName = "Sphere" | "Boxes" | "Oscilloscope";
