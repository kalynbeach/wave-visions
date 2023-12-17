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
  audioContext: AudioContext;
  stream: MediaStream;
  source: MediaStreamAudioSourceNode;
  private amplitudeAnalyser: AnalyserNode;
  private waveformAnalyser: AnalyserNode;
  private amplitudeDataArray: Uint8Array | null = null;
  private waveformDataArray: Float32Array | null = null;

  constructor(context: AudioContext, stream: MediaStream) {
    this.audioContext = context;
    this.stream = stream;
    this.source = this.audioContext.createMediaStreamSource(stream);
    this.amplitudeAnalyser = this.audioContext.createAnalyser();
    this.waveformAnalyser = this.audioContext.createAnalyser();
    this.amplitudeAnalyser.fftSize = 32;
    this.waveformAnalyser.fftSize = 2048;
    this.source.connect(this.amplitudeAnalyser);
    this.source.connect(this.waveformAnalyser);
    console.log(`[AudioProcessor] initialized`);
  }

  getVolume(): number {
    const amplitudeData = this.getAmplitudeData();
    const volume = amplitudeData.reduce((acc, cur) => acc + cur, 0) / amplitudeData.length;
    return volume;
  }

  getAmplitudeData(): Uint8Array {
    console.log(`[AudioProcessor getAmplitudeData] called`);
    this.amplitudeDataArray = new Uint8Array(this.amplitudeAnalyser.frequencyBinCount);
    this.amplitudeAnalyser.getByteFrequencyData(this.amplitudeDataArray);
    return this.amplitudeDataArray;
  }

  getWaveformData(): Float32Array {
    console.log(`[AudioProcessor getWaveformData] called`);
    this.waveformDataArray = new Float32Array(this.waveformAnalyser.frequencyBinCount);
    this.waveformAnalyser.getFloatTimeDomainData(this.waveformDataArray);
    return this.waveformDataArray;
  }
}
