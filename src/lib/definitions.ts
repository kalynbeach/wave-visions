export type FrequencyBand = {
  lower: number;
  upper: number;
}

export type AudioSpectrum = {
  subBass: FrequencyBand;
  bass: FrequencyBand;
  lowMidrange: FrequencyBand;
  midrange: FrequencyBand;
  upperMidrange: FrequencyBand;
  presence: FrequencyBand;
  brilliance: FrequencyBand;
}
