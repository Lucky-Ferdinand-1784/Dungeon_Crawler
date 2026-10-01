// Web Audio API Retro 8-Bit Chiptune Synthesizer
class RetroAudio {
  private ctx: AudioContext | null = null;
  public muted: boolean = false;
  public bgmMuted: boolean = false;
  private bgmInterval: number | null = null;
  private bgmNoteIndex: number = 0;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(val: boolean) {
    this.muted = val;
    if (val && this.bgmInterval) {
      this.stopBGM();
    }
  }

  // --- Sound Effects ---

  public playStep() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Audio error safe guard
    }
  }

  public playCoin() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, this.ctx.currentTime); // B5
      osc.frequency.setValueAtTime(1318.51, this.ctx.currentTime + 0.08); // E6
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.22);
    } catch {
      // safe
    }
  }

  public playHeal() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [440, 554, 659, 880];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = this.ctx.currentTime + idx * 0.05;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.09, start);
        gain.gain.linearRampToValueAtTime(0, start + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.12);
      });
    } catch {
      // safe
    }
  }

  public playHit() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.16, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch {
      // safe
    }
  }

  public playCrit() {
    if (this.muted || !this.ctx) return;
    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'square';

      osc1.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.25);

      osc2.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.25);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(this.ctx.currentTime + 0.25);
      osc2.stop(this.ctx.currentTime + 0.25);
    } catch {
      // safe
    }
  }

  public playChest() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [392, 523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        const start = this.ctx.currentTime + idx * 0.07;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.08, start);
        gain.gain.linearRampToValueAtTime(0, start + 0.14);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.14);
      });
    } catch {
      // safe
    }
  }

  public playLevelUp() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [261.63, 329.63, 392, 523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const start = this.ctx.currentTime + idx * 0.08;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.linearRampToValueAtTime(0, start + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.25);
      });
    } catch {
      // safe
    }
  }

  public playEquip() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.09);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // safe
    }
  }

  public playStairs() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const start = this.ctx.currentTime + idx * 0.08;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.1, start);
        gain.gain.linearRampToValueAtTime(0, start + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.12);
      });
    } catch {
      // safe
    }
  }

  public playGameOver() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [320, 290, 240, 180, 120];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        const start = this.ctx.currentTime + idx * 0.15;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.linearRampToValueAtTime(0, start + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.18);
      });
    } catch {
      // safe
    }
  }

  public playBomb() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(90, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(20, this.ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch {
      // safe
    }
  }

  // --- Background Chiptune Music Generator ---
  public toggleBGM(): boolean {
    if (this.bgmInterval) {
      this.stopBGM();
      this.bgmMuted = true;
      return false;
    } else {
      this.init();
      this.bgmMuted = false;
      this.startBGM();
      return true;
    }
  }

  public startBGM() {
    if (this.bgmMuted || this.muted || !this.ctx) return;
    if (this.bgmInterval) return;

    // Atmospheric dungeon chord progression in D-minor: D3, F3, A3, C4
    const sequence = [
      146.83, 174.61, 220.00, 261.63, // D minor
      130.81, 164.81, 196.00, 261.63, // C major
      116.54, 146.83, 174.61, 233.08, // Bb major
      110.00, 138.59, 164.81, 220.00  // A minor
    ];

    this.bgmInterval = window.setInterval(() => {
      if (!this.ctx || this.muted || this.bgmMuted) return;
      try {
        const freq = sequence[this.bgmNoteIndex % sequence.length];
        this.bgmNoteIndex++;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.22);
      } catch {
        // safe
      }
    }, 240);
  }

  public stopBGM() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const sfx = new RetroAudio();
