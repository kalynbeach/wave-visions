import type { AudioSpectrum } from '@/lib/definitions';


export const audioSpectrum: AudioSpectrum = {
  subBass: {lower: 20, upper: 60 },
  bass: { lower: 60, upper: 250 },
  lowMidrange: { lower: 250, upper: 500 },
  midrange: { lower: 500, upper: 2000 },
  upperMidrange: { lower: 2000, upper: 4000 },
  presence: { lower: 4000, upper: 6000 },
  brilliance: { lower: 6000, upper: 20000 },
};


export class AudioProcessor {
  private audioContext: AudioContext;
  private amplitudeAnalyser: AnalyserNode;
  private waveformAnalyser: AnalyserNode;
  private amplitudeDataArray: Uint8Array | null = null;
  private waveformDataArray: Float32Array | null = null;

  constructor() {
    // Set up AudioContext
    this.audioContext = new AudioContext();
    // Set up AnalyserNodes
    this.amplitudeAnalyser = this.audioContext.createAnalyser();
    this.waveformAnalyser = this.audioContext.createAnalyser();
    this.amplitudeAnalyser.fftSize = 32;
    this.waveformAnalyser.fftSize = 2048;
    // const source = this.audioContext.createMediaStreamSource(stream);
    // source.connect(this.waveformAnalyser);
  }

  getAmplitudeData(stream: MediaStream): Uint8Array {
    const source = this.audioContext.createMediaStreamSource(stream);
    source.connect(this.amplitudeAnalyser);
    const bufferLength = this.amplitudeAnalyser.frequencyBinCount;
    this.amplitudeDataArray = new Uint8Array(bufferLength);
    this.amplitudeAnalyser.getByteFrequencyData(this.amplitudeDataArray);
    return this.amplitudeDataArray;
  }

  getWaveformData(stream: MediaStream): Float32Array {
    const source = this.audioContext.createMediaStreamSource(stream);
    source.connect(this.waveformAnalyser);
    this.waveformDataArray = new Float32Array(this.waveformAnalyser.frequencyBinCount);
    this.waveformAnalyser.getFloatTimeDomainData(this.waveformDataArray);
    return this.waveformDataArray;
  }
}
