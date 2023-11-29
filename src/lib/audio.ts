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

/**
 * Web Audio API `MediaStreamAudioSourceNode` audio processor
 */
export class AudioProcessor {
  stream: MediaStream;
  private audioContext: AudioContext;
  private amplitudeAnalyser: AnalyserNode;
  private waveformAnalyser: AnalyserNode;
  private amplitudeDataArray: Uint8Array | null = null;
  private waveformDataArray: Float32Array | null = null;

  constructor(context: AudioContext, stream: MediaStream) {
    this.stream = stream;
    // Set up AudioContext
    this.audioContext = context
    // Set up AnalyserNodes
    this.amplitudeAnalyser = this.audioContext.createAnalyser();
    this.waveformAnalyser = this.audioContext.createAnalyser();
    this.amplitudeAnalyser.fftSize = 32;
    this.waveformAnalyser.fftSize = 2048;
    // const source = this.audioContext.createMediaStreamSource(stream);
    // source.connect(this.waveformAnalyser);
    console.log(`[AudioProcessor] initialized`);
  }

  getAmplitudeData(): Uint8Array {
    console.log(`[AudioProcessor getAmplitudeData] called`);
    const source = this.audioContext.createMediaStreamSource(this.stream);
    source.connect(this.amplitudeAnalyser);
    const bufferLength = this.amplitudeAnalyser.frequencyBinCount;
    this.amplitudeDataArray = new Uint8Array(bufferLength);
    this.amplitudeAnalyser.getByteFrequencyData(this.amplitudeDataArray);
    return this.amplitudeDataArray;
  }

  getVolume(): number {
    const amplitudeData = this.getAmplitudeData();
    const volume = amplitudeData.reduce((acc, cur) => acc + cur, 0) / amplitudeData.length;
    return volume;
  }

  getWaveformData(): Float32Array {
    console.log(`[AudioProcessor getWaveformData] called`);
    const source = this.audioContext.createMediaStreamSource(this.stream);
    source.connect(this.waveformAnalyser);
    this.waveformDataArray = new Float32Array(this.waveformAnalyser.frequencyBinCount);
    this.waveformAnalyser.getFloatTimeDomainData(this.waveformDataArray);
    return this.waveformDataArray;
  }
}
