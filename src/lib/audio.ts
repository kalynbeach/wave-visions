import { type AudioFrequencies, AUDIBLE_SPECTRUM } from '@/lib/definitions';

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
  volume: number;
  frequencies: AudioFrequencies;

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
    this.volume = amplitudeData.reduce((acc, cur) => acc + cur, 0) / amplitudeData.length;
    console.log(`[AudioProcessor getVolume] ${this.volume}`);
    return this.volume;
  }

  getWaveformData(): Float32Array {
    this.waveformDataArray = new Float32Array(this.waveformAnalyser.frequencyBinCount);
    this.waveformAnalyser.getFloatTimeDomainData(this.waveformDataArray);
    return this.waveformDataArray;
  }

  getFrequencies(): AudioFrequencies {
    const waveformData = this.getWaveformData();

    // TODO: Get frequency band number values from waveformData

    this.frequencies = {
      subBass: 0,
      bass: 0,
      lowMidrange: 0,
      midrange: 0,
      upperMidrange: 0,
      presence: 0,
      brilliance: 0,
    };

    return this.frequencies;
  }
}
