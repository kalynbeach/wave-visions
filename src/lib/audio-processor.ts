import {
  type AudioFrequencies,
  type FrequencyBand,
  AUDIBLE_SPECTRUM
} from '@/lib/definitions';

/**
 * Web Audio API `MediaStreamAudioSourceNode` audio processor
 */
export class AudioProcessor {
  audioContext: AudioContext;
  stream: MediaStream;
  source: MediaStreamAudioSourceNode;
  volume: number;
  frequencies: AudioFrequencies;
  private amplitudeAnalyser: AnalyserNode;
  private waveformAnalyser: AnalyserNode;
  private amplitudeDataArray: Uint8Array | null = null;
  private waveformDataArray: Float32Array | null = null;

  constructor(stream: MediaStream) {
    this.audioContext = new AudioContext();
    this.stream = stream;
    this.source = this.audioContext.createMediaStreamSource(stream);
    this.amplitudeAnalyser = this.audioContext.createAnalyser();
    this.waveformAnalyser = this.audioContext.createAnalyser();
    this.amplitudeAnalyser.fftSize = 32;
    this.waveformAnalyser.fftSize = 2048;
    this.source.connect(this.amplitudeAnalyser);
    this.source.connect(this.waveformAnalyser);
    this.volume = 0;
    this.frequencies = {
      subBass: 0,
      bass: 0,
      lowMidrange: 0,
      midrange: 0,
      upperMidrange: 0,
      presence: 0,
      brilliance: 0,
    };
    console.log(`[AudioProcessor] initialized`);
  }

  getAmplitudeData(): Uint8Array {
    this.amplitudeDataArray = new Uint8Array(this.amplitudeAnalyser.frequencyBinCount);
    this.amplitudeAnalyser.getByteFrequencyData(this.amplitudeDataArray);
    return this.amplitudeDataArray;
  }

  getVolume(): number {
    const amplitudeData = this.getAmplitudeData();
    this.volume = Math.round(amplitudeData.reduce((acc, cur) => acc + cur, 0) / amplitudeData.length);
    return this.volume;
  }

  getWaveformData(): Float32Array {
    this.waveformDataArray = new Float32Array(this.waveformAnalyser.frequencyBinCount);
    this.waveformAnalyser.getFloatTimeDomainData(this.waveformDataArray);
    return this.waveformDataArray;
  }

  getFrequencies(): AudioFrequencies {
    const frequencyDataArray = new Uint8Array(this.waveformAnalyser.frequencyBinCount);
    this.waveformAnalyser.getByteFrequencyData(frequencyDataArray);
    this.frequencies = {
      subBass: this.calculateLevel(AUDIBLE_SPECTRUM.subBass, frequencyDataArray),
      bass: this.calculateLevel(AUDIBLE_SPECTRUM.bass, frequencyDataArray),
      lowMidrange: this.calculateLevel(AUDIBLE_SPECTRUM.lowMidrange, frequencyDataArray),
      midrange: this.calculateLevel(AUDIBLE_SPECTRUM.midrange, frequencyDataArray),
      upperMidrange: this.calculateLevel(AUDIBLE_SPECTRUM.upperMidrange, frequencyDataArray),
      presence: this.calculateLevel(AUDIBLE_SPECTRUM.presence, frequencyDataArray),
      brilliance: this.calculateLevel(AUDIBLE_SPECTRUM.brilliance, frequencyDataArray),
    };
    return this.frequencies;
  }

  private calculateLevel(frequencyBand: FrequencyBand, frequencyDataArray: Uint8Array): number {
    // Convert frequency band bounds from Hz to indices in the frequency data array
    const lowerIndex = Math.round(frequencyBand.lower * this.waveformAnalyser.frequencyBinCount / this.audioContext.sampleRate);
    const upperIndex = Math.round(frequencyBand.upper * this.waveformAnalyser.frequencyBinCount / this.audioContext.sampleRate);
    // Calculate the average of the frequency data within the frequency band
    let sum = 0;
    for (let i = lowerIndex; i <= upperIndex; i++) {
      sum += frequencyDataArray[i];
    }
    const average = Math.round(sum / (upperIndex - lowerIndex + 1));
    return average;
  }
}
