// Wish Balloon Release & Canvas Night Sky Animation

class WishSkyEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.stars = [];
    this.shootingStars = [];
    this.animId = null;
    this.wishes = [];
  }

  init() {
    this.canvas = document.getElementById('sky-stars-canvas');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
      this.initStars();
      this.animate();
    }

    const wishForm = document.getElementById('wish-balloon-form');
    if (wishForm) {
      wishForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitWish();
      });
    }

    // Tombol hapus doa individual
    const list = document.getElementById('sent-wishes-list');
    if (list) {
      list.addEventListener('click', (e) => {
        const delBtn = e.target.closest('.delete-wish-btn');
        if (delBtn) {
          const idx = parseInt(delBtn.getAttribute('data-index'), 10);
          this.deleteWish(idx);
        }
      });
    }

    // Tombol bersihkan semua doa
    const clearBtn = document.getElementById('clear-all-wishes-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (this.wishes.length === 0) return;
        if (confirm("Hapus semua riwayat doa yang tersimpan di browser ini?")) {
          this.clearAllWishes();
        }
      });
    }

    // Load saved wishes
    this.loadWishes();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    this.canvas.width = parent ? parent.clientWidth : window.innerWidth;
    this.canvas.height = parent ? (parent.clientHeight || 480) : 480;
  }

  initStars() {
    this.stars = [];
    const count = Math.floor((this.canvas.width * this.canvas.height) / 3000);
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        color: ['#ffffff', '#fed7aa', '#fbcfe8', '#e9d5ff'][Math.floor(Math.random() * 4)]
      });
    }
  }

  addShootingStar() {
    if (Math.random() < 0.015 && this.shootingStars.length < 3) {
      this.shootingStars.push({
        x: Math.random() * this.canvas.width * 0.8,
        y: Math.random() * (this.canvas.height * 0.4),
        length: Math.random() * 80 + 40,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 4,
        alpha: 1
      });
    }
  }

  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Gambar bintang gemerlap
    this.stars.forEach(star => {
      star.alpha += star.twinkleSpeed;
      if (star.alpha > 1 || star.alpha < 0.2) {
        star.twinkleSpeed = -star.twinkleSpeed;
      }
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = star.color;
      this.ctx.globalAlpha = Math.max(0, Math.min(1, star.alpha));
      this.ctx.shadowBlur = 4;
      this.ctx.shadowColor = star.color;
      this.ctx.fill();
    });

    // Shooting stars
    this.addShootingStar();
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const s = this.shootingStars[i];
      const endX = s.x + Math.cos(s.angle) * s.length;
      const endY = s.y + Math.sin(s.angle) * s.length;

      const grad = this.ctx.createLinearGradient(s.x, s.y, endX, endY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${s.alpha})`);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      this.ctx.beginPath();
      this.ctx.moveTo(s.x, s.y);
      this.ctx.lineTo(endX, endY);
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.alpha -= 0.02;

      if (s.alpha <= 0 || s.x > this.canvas.width || s.y > this.canvas.height) {
        this.shootingStars.splice(i, 1);
      }
    }

    this.ctx.globalAlpha = 1;
    this.ctx.shadowBlur = 0;
    this.animId = requestAnimationFrame(() => this.animate());
  }

  submitWish() {
    const input = document.getElementById('wish-balloon-input');
    if (!input || !input.value.trim()) return;

    const wishText = input.value.trim();
    input.value = '';

    // Efek audio
    if (window.birthdayAudio) {
      window.birthdayAudio.playBalloonWhoosh();
    }

    // Buat animasi balon terbang
    this.spawnFloatingBalloon(wishText);

    // Simpan ke daftar harapan
    this.wishes.unshift({
      text: wishText,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    });
    this.saveWishes();
    this.renderWishes();

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  }

  spawnFloatingBalloon(text) {
    const container = document.getElementById('floating-balloons-container');
    if (!container) return;

    const balloonEl = document.createElement('div');
    balloonEl.className = 'wish-flying-balloon';

    const colors = [
      'linear-gradient(135deg, #f472b6, #ec4899)',
      'linear-gradient(135deg, #fb7185, #f43f5e)',
      'linear-gradient(135deg, #c084fc, #a855f7)',
      'linear-gradient(135deg, #fbbf24, #f59e0b)',
      'linear-gradient(135deg, #38bdf8, #0284c7)'
    ];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];
    const startX = Math.random() * 60 + 20; // 20% - 80%

    balloonEl.style.left = `${startX}%`;
    balloonEl.innerHTML = `
      <div class="balloon-body" style="background: ${chosenColor};">
        <span class="balloon-shine"></span>
      </div>
      <div class="balloon-knot"></div>
      <div class="balloon-string"></div>
      <div class="balloon-wish-note">"${this.escapeHtml(text)}"</div>
    `;

    container.appendChild(balloonEl);

    // Hapus setelah selesai terbang ke atas
    setTimeout(() => {
      balloonEl.remove();
    }, 7000);
  }

  deleteWish(idx) {
    if (idx >= 0 && idx < this.wishes.length) {
      this.wishes.splice(idx, 1);
      this.saveWishes();
      this.renderWishes();
    }
  }

  clearAllWishes() {
    this.wishes = [];
    this.saveWishes();
    this.renderWishes();
  }

  renderWishes() {
    const list = document.getElementById('sent-wishes-list');
    const clearBtn = document.getElementById('clear-all-wishes-btn');
    if (!list) return;

    if (clearBtn) {
      clearBtn.style.display = this.wishes.length > 0 ? 'inline-block' : 'none';
    }

    if (this.wishes.length === 0) {
      list.innerHTML = `<p class="text-sm text-pink-300/80 italic text-center py-4">Belum ada doa yang diterbangkan. Jadilah yang pertama mengirimkan doa! 🎈</p>`;
      return;
    }

    list.innerHTML = this.wishes.map((w, idx) => {
      // LOGIKA PINTAR: Cek apakah w.time mengandung angka (jam seperti 17.15 atau 17:15)
      let timeText = w.time;
      if (w.time && w.time.match(/[0-9]/)) {
        timeText = 'Diterbangkan pukul ' + w.time;
      }

      return `
      <div class="wish-item p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm flex items-start gap-3 transition-all hover:bg-white/20 group">
        <span class="text-xl">✨</span>
        <div class="flex-1">
          <p class="text-sm font-medium leading-relaxed">"${this.escapeHtml(w.text)}"</p>
          <span class="text-xs text-pink-200 mt-1 block italic">${timeText}</span>
        </div>
        <button class="delete-wish-btn opacity-60 hover:opacity-100 text-pink-200 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/10 transition-all text-xs" data-index="${idx}" title="Hapus doa ini">
          🗑️
        </button>
      </div>
      `;
    }).join('');
  }

  saveWishes() {
    try {
      localStorage.setItem('birthday_user_wishes', JSON.stringify(this.wishes));
    } catch (e) {
      console.warn(e);
    }
  }

  loadWishes() {
    try {
      const saved = localStorage.getItem('birthday_user_wishes');
      if (saved !== null) {
        this.wishes = JSON.parse(saved);
      } else {
        // Jika baru pertama kali dibuka di browser baru (misal HP dia), tampilkan initialWishes dari config
        const initial = (window.birthdayConfig && window.birthdayConfig.initialWishes) || [];
        this.wishes = [...initial];
      }
      this.renderWishes();
    } catch (e) {
      this.wishes = [];
    }
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

window.wishSky = new WishSkyEngine();
