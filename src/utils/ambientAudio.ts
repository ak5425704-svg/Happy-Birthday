// Web Audio API ambient soulful sound generator when no custom audio file is uploaded

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private intervalId: number | null = null;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    this.init();
    if (!this.ctx || this.isRunning) return;
    this.isRunning = true;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 3);
    this.masterGain.connect(this.ctx.destination);

    // D-minor soulful acoustic meditative drone (Teri Deewani key: D minor / D Aeolian)
    const rootFreq = 146.83; // D3
    const fifthFreq = 220.0;  // A3
    const octaveFreq = 293.66; // D4

    const createDroneOsc = (freq: number, type: OscillatorType, detune: number = 0) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      osc.detune.value = detune;

      gain.gain.value = 0.12;
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      return osc;
    };

    createDroneOsc(rootFreq, 'sawtooth', -3);
    createDroneOsc(rootFreq, 'sine', 3);
    createDroneOsc(fifthFreq, 'sine', 0);
    createDroneOsc(octaveFreq, 'triangle', 2);

    // Warm soulful acoustic chime arpeggios
    const notes = [
      293.66, // D4
      329.63, // E4
      349.23, // F4
      440.00, // A4
      523.25, // C5
      587.33, // D5
      440.00, // A4
    ];
    let noteIdx = 0;

    const playSoulfulChime = () => {
      if (!this.ctx || !this.isRunning || !this.masterGain) return;
      const freq = notes[noteIdx % notes.length];
      noteIdx++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 4.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 4.6);
    };

    playSoulfulChime();
    this.intervalId = window.setInterval(playSoulfulChime, 2400);
  }

  public stop() {
    if (!this.ctx || !this.isRunning) return;
    if (this.masterGain) {
      this.masterGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    setTimeout(() => {
      this.isRunning = false;
    }, 1200);
  }

  public getPlayingStatus() {
    return this.isRunning;
  }
}

export const ambientSound = new AmbientSoundEngine();
