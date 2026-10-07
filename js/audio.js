// Sound Effects & Background Music Engine using Web Audio API
// Ringan, tanpa perlu file eksternal, bekerja offline & responsive!

class BirthdayAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.currentSongTimeout = null;
    this.melodyIndex = 0;
    this.customAudio = null;
    this.volumeNode = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      this.ctx = new AudioContext();
      this.volumeNode = this.ctx.createGain();
      this.volumeNode.gain.value = 0.25; // Gentle pleasant volume
      this.volumeNode.connect(this.ctx.destination);
      this.isInitialized = true;
    }
  }

  resumeContext() {
    if (!this.isInitialized) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Nada Notasi Frekuensi (Hz)
  getFreq(note) {
    const notes = {
      'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
      'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
      'C6': 1046.50
    };
    return notes[note] || 440.0;
  }

  // Memainkan nada lembut seperti Music Box / Glockenspiel / Rhodes Piano
  playTone(freq, duration = 0.6, type = 'sine', timeOffset = 0, gainLevel = 0.4) {
    if (!this.ctx || this.isMuted) return;
    const startTime = this.ctx.currentTime + timeOffset;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Harmonics untuk suara music box yang hangat dan berkilau
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(gainLevel, startTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.volumeNode);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  // Melodi Lofi/Music Box "Selamat Ulang Tahun" yang Menenangkan
  startBGM() {
    this.resumeContext();
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.cancelScheduledValues(this.ctx.currentTime);
      this.volumeNode.gain.setValueAtTime(0.25, this.ctx.currentTime);
    }
    const customUrl = window.birthdayConfig && window.birthdayConfig.customAudioUrl;

    if (customUrl) {
      if (!this.customAudio) {
        this.customAudio = new Audio(customUrl);
        this.customAudio.loop = true;
      }
      this.customAudio.play().catch(e => console.log("Audio autoplay dicegah browser:", e));
      this.isPlaying = true;
      this.updateUI();
      return;
    }

    if (this.isPlaying) return;
    this.isPlaying = true;
    this.updateUI();
    this.playBackgroundMelodyLoop();
  }

  pauseBGM() {
    this.isPlaying = false;
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.cancelScheduledValues(this.ctx.currentTime);
      this.volumeNode.gain.setValueAtTime(0, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.currentSongTimeout) {
      clearTimeout(this.currentSongTimeout);
      this.currentSongTimeout = null;
    }
    this.updateUI();
  }

  toggleBGM() {
    if (this.isPlaying) {
      this.pauseBGM();
    } else {
      this.startBGM();
    }
  }

  playBackgroundMelodyLoop() {
    if (!this.isPlaying || this.isMuted) return;

    // Sequence Melodi Sweet Happy Birthday Music Box
    // Format: [Note, duration, delay]
    const melody = [
      ['C4', 0.5, 0.0], ['C4', 0.3, 0.4], ['D4', 0.8, 0.8], ['C4', 0.8, 1.4], ['F4', 0.8, 2.0], ['E4', 1.4, 2.6],
      ['C4', 0.5, 4.0], ['C4', 0.3, 4.4], ['D4', 0.8, 4.8], ['C4', 0.8, 5.4], ['G4', 0.8, 6.0], ['F4', 1.4, 6.6],
      ['C4', 0.5, 8.0], ['C4', 0.3, 8.4], ['C5', 0.9, 8.8], ['A4', 0.9, 9.4], ['F4', 0.9, 10.0], ['E4', 0.8, 10.6], ['D4', 1.2, 11.2],
      ['A#4', 0.5, 12.6], ['A#4', 0.3, 13.0], ['A4', 0.9, 13.4], ['F4', 0.9, 14.0], ['G4', 0.9, 14.6], ['F4', 1.8, 15.2],
      
      // Chords pengiring lembut (arpeggio lofi)
      ['A3', 1.2, 0.1], ['C4', 1.2, 0.3], ['F4', 1.5, 2.0],
      ['A3', 1.2, 4.1], ['C4', 1.2, 4.3], ['G4', 1.5, 6.0],
      ['A3', 1.2, 8.1], ['C4', 1.2, 8.3], ['F4', 1.5, 10.0],
      ['A#3', 1.2, 12.7], ['D4', 1.2, 13.1], ['F4', 2.0, 15.2]
    ];

    melody.forEach(([note, dur, del]) => {
      if (this.isPlaying) {
        this.playTone(this.getFreq(note), dur, 'sine', del, 0.22);
        // Tambahkan overtone chime halus
        this.playTone(this.getFreq(note) * 2, dur * 0.7, 'triangle', del + 0.01, 0.08);
      }
    });

    const loopTime = 18000; // Loop setiap 18 detik
    this.currentSongTimeout = setTimeout(() => {
      if (this.isPlaying) {
        this.playBackgroundMelodyLoop();
      }
    }, loopTime);
  }

  // Efek Suara: Tiup Lilin (Desiran Angin Halus)
  playCandleBlow() {
    this.resumeContext();
    if (!this.ctx) return;

    try {
      const bufferSize = this.ctx.sampleRate * 0.8;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1; // White noise
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      // Filter agar berbunyi seperti desiran napas / angin "fhuuuu"
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.8);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      noise.stop(this.ctx.currentTime + 0.8);
    } catch (e) {
      console.log("Audio effect error:", e);
    }
  }

  // Efek Suara: Letupan Konfeti / Bintang Berkilau
  playConfettiPop() {
    this.resumeContext();
    if (!this.ctx) return;

    // Pop sound
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);

    // Sparkling Chimes arpeggio
    const sparkles = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    sparkles.forEach((f, idx) => {
      this.playTone(f, 0.4, 'sine', 0.08 + idx * 0.05, 0.2);
    });
  }

  // Efek Suara: Buka Amplop / Surat
  playEnvelopeOpen() {
    this.resumeContext();
    const chimeNotes = [440.00, 554.37, 659.25, 880.00];
    chimeNotes.forEach((f, i) => {
      this.playTone(f, 0.5, 'sine', i * 0.07, 0.25);
    });
  }

  // Efek Suara: Klik Love / Partikel Hati
  playHeartPop() {
    this.resumeContext();
    const randomFreq = 587.33 + Math.random() * 300;
    this.playTone(randomFreq, 0.25, 'sine', 0, 0.15);
  }

  // Efek Suara: Kembang Api / Balon Meluncur
  playBalloonWhoosh() {
    this.resumeContext();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(250, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.5);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  }

  updateUI() {
    const musicBtn = document.getElementById('music-toggle-btn');
    const vinylDisk = document.getElementById('vinyl-disk');
    const musicIcon = document.getElementById('music-icon');
    const musicStatus = document.getElementById('music-status-text');

    if (musicBtn && musicIcon) {
      if (this.isPlaying) {
        musicBtn.classList.add('playing');
        musicIcon.innerHTML = `
          <svg class="w-5 h-5 text-rose-500 animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
          </svg>
        `;
        if (musicStatus) musicStatus.textContent = "Musik: Aktif 🎵";
        if (vinylDisk) vinylDisk.classList.add('spinning');
      } else {
        musicBtn.classList.remove('playing');
        musicIcon.innerHTML = `
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
          </svg>
        `;
        if (musicStatus) musicStatus.textContent = "Musik: Mati 🔇";
        if (vinylDisk) vinylDisk.classList.remove('spinning');
      }
    }
  }
}

window.birthdayAudio = new BirthdayAudioEngine();
