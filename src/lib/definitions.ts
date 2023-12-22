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

export type Vision = {
  name: string;
  description: string;
  componentName: string;
};
