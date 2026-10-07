// Interactive Birthday Cake Logic
// Supports both Tap/Click to blow and Microphone Blow detection!

class BirthdayCakeController {
  constructor() {
    this.isBlown = false;
    this.isListeningMic = false;
    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.animationFrame = null;
  }

  init() {
    const blowBtn = document.getElementById('blow-candle-btn');
    const micBtn = document.getElementById('mic-blow-btn');
    const resetBtn = document.getElementById('relight-candle-btn');

    if (blowBtn) {
      blowBtn.addEventListener('click', () => this.blowCandles());
    }

    if (micBtn) {
      micBtn.addEventListener('click', () => this.toggleMicrophoneDetection());
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.relightCandles());
    }

    // Juga bisa tiup jika klik langsung di lilin/api
    const cakeContainer = document.getElementById('cake-interactive-area');
    if (cakeContainer) {
      cakeContainer.addEventListener('click', () => {
        if (!this.isBlown) {
          this.blowCandles();
        }
      });
    }
  }

  blowCandles() {
    if (this.isBlown) return;
    this.isBlown = true;
    this.stopMicDetection();

    // Mainkan efek suara tiup lilin
    if (window.birthdayAudio) {
      window.birthdayAudio.playCandleBlow();
    }

    // Padamkan api dan munculkan asap
    const flames = document.querySelectorAll('.candle-flame');
    const smokes = document.querySelectorAll('.candle-smoke');

    flames.forEach(flame => {
      flame.classList.add('extinguished');
    });

    smokes.forEach(smoke => {
      smoke.classList.add('active');
    });

    // Perbarui teks instruksi
    const statusText = document.getElementById('cake-status-text');
    const blowBtn = document.getElementById('blow-candle-btn');
    const micBtn = document.getElementById('mic-blow-btn');
    const relightBtn = document.getElementById('relight-candle-btn');
    const wishResultCard = document.getElementById('wish-success-card');

    if (statusText) {
      statusText.innerHTML = `
        <span class="text-rose-500 font-semibold animate-pulse">
          ✨ Lilin telah ditiup! Harapanmu sedang terbang menuju bintang-bintang... ✨
        </span>
      `;
    }

    if (blowBtn) blowBtn.style.display = 'none';
    if (micBtn) micBtn.style.display = 'none';
    if (relightBtn) relightBtn.style.display = 'inline-flex';

    // Delay sedikit lalu luncurkan pesta konfeti heboh & kembang api
    setTimeout(() => {
      if (window.birthdayAudio) {
        window.birthdayAudio.playConfettiPop();
      }
      this.launchMassiveCelebration();

      if (wishResultCard) {
        wishResultCard.classList.remove('hidden');
        wishResultCard.classList.add('animate-bounce-in');
      }
    }, 600);
  }

  relightCandles() {
    this.isBlown = false;
    const flames = document.querySelectorAll('.candle-flame');
    const smokes = document.querySelectorAll('.candle-smoke');

    flames.forEach(flame => {
      flame.classList.remove('extinguished');
    });

    smokes.forEach(smoke => {
      smoke.classList.remove('active');
    });

    const statusText = document.getElementById('cake-status-text');
    const blowBtn = document.getElementById('blow-candle-btn');
    const micBtn = document.getElementById('mic-blow-btn');
    const relightBtn = document.getElementById('relight-candle-btn');
    const wishResultCard = document.getElementById('wish-success-card');

    if (statusText) {
      statusText.innerHTML = `
        <span>Pejamkan mata, panjatkan doamu, lalu tiup lilinnya! 🎂</span>
      `;
    }

    if (blowBtn) blowBtn.style.display = 'inline-flex';
    if (micBtn) micBtn.style.display = 'inline-flex';
    if (relightBtn) relightBtn.style.display = 'none';
    if (wishResultCard) wishResultCard.classList.add('hidden');
  }

  // Deteksi Tiupan dengan Mikrofon
  async toggleMicrophoneDetection() {
    if (this.isListeningMic) {
      this.stopMicDetection();
      return;
    }

    const micBtn = document.getElementById('mic-blow-btn');
    const statusText = document.getElementById('cake-status-text');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      this.analyser = this.audioContext.createAnalyser();
      this.microphone = this.audioContext.createMediaStreamSource(stream);
      this.microphone.connect(this.analyser);
      this.analyser.fftSize = 256;

      this.isListeningMic = true;
      if (micBtn) {
        micBtn.classList.add('listening');
        micBtn.innerHTML = `
          <span class="relative flex h-3 w-3 mr-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          Mendengarkan Tiupan... (Tiup Layarmu!)
        `;
      }
      if (statusText) {
        statusText.innerHTML = `<span class="text-rose-500 font-medium">Dekatkan mulut ke mic & tiup perlahan... 🌬️</span>`;
      }

      this.checkAudioInput();
    } catch (err) {
      console.warn("Mikrofon tidak diizinkan atau tidak didukung:", err);
      alert("Akses mikrofon tidak diaktifkan. Jangan khawatir, kamu tetap bisa memencet tombol 'Tiup Lilin Sekarang'!");
    }
  }

  checkAudioInput() {
    if (!this.isListeningMic || this.isBlown) return;

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    let averageVolume = sum / bufferLength;

    // Nilai ambang tiupan nafas (biasanya menciptakan suara desiran stabil pada mic)
    if (averageVolume > 48) {
      this.blowCandles();
      return;
    }

    this.animationFrame = requestAnimationFrame(() => this.checkAudioInput());
  }

  stopMicDetection() {
    this.isListeningMic = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    if (this.microphone && this.microphone.mediaStream) {
      this.microphone.mediaStream.getTracks().forEach(track => track.stop());
    }
    const micBtn = document.getElementById('mic-blow-btn');
    if (micBtn) {
      micBtn.classList.remove('listening');
      micBtn.innerHTML = `
        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
        </svg>
        Tiup Pakai Mic 🎤
      `;
    }
  }

  // Animasi Pesta Konfeti & Kembang Api
  launchMassiveCelebration() {
    if (typeof confetti === 'function') {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        colors: ['#f43f5e', '#ec4899', '#f59e0b', '#fbbf24', '#a855f7', '#60a5fa', '#34d399']
      };

      function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio)
        }));
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }
  }
}

window.birthdayCake = new BirthdayCakeController();
