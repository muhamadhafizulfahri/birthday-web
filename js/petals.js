// Falling Cherry Blossom / Rose Petals Canvas Effect
// Creates a dreamy, fairytale aesthetic atmosphere

class PetalsEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.petals = [];
    this.animId = null;
    this.numPetals = 28;
  }

  init() {
    this.canvas = document.getElementById('petals-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Inisialisasi kelopak bunga
    for (let i = 0; i < this.numPetals; i++) {
      this.petals.push(this.createPetal(true));
    }

    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createPetal(randomY = false) {
    const w = this.canvas ? this.canvas.width : window.innerWidth;
    const h = this.canvas ? this.canvas.height : window.innerHeight;

    return {
      x: Math.random() * w,
      y: randomY ? Math.random() * h : -20,
      size: Math.random() * 12 + 10,
      speedX: Math.random() * 1.5 - 0.75,
      speedY: Math.random() * 1.2 + 0.8,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      swing: Math.random() * 2,
      swingSpeed: Math.random() * 0.02 + 0.01,
      opacity: Math.random() * 0.5 + 0.35,
      color: ['#fbcfe8', '#fda4af', '#fecdd3', '#ffe4e6', '#f472b6'][Math.floor(Math.random() * 5)]
    };
  }

  drawPetal(p) {
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate((p.rotation * Math.PI) / 180);
    this.ctx.globalAlpha = p.opacity;

    // Gambar bentuk kelopak bunga organik (sakura petal shape)
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, -p.size / 4, p.size, 0);
    this.ctx.bezierCurveTo(p.size, p.size / 2, p.size / 2, p.size, 0, p.size);
    this.ctx.bezierCurveTo(-p.size / 2, p.size / 2, -p.size / 4, 0, 0, 0);

    const grad = this.ctx.createRadialGradient(0, 0, 1, 0, 0, p.size);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.4, p.color);
    grad.addColorStop(1, '#fb7185');

    this.ctx.fillStyle = grad;
    this.ctx.shadowBlur = 6;
    this.ctx.shadowColor = 'rgba(251, 113, 133, 0.3)';
    this.ctx.fill();
    this.ctx.restore();
  }

  animate() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];
      p.swing += p.swingSpeed;
      p.x += p.speedX + Math.sin(p.swing) * 0.8;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      this.drawPetal(p);

      // Reset bila lewat batas bawah atau samping layar
      if (p.y > this.canvas.height + 30 || p.x < -30 || p.x > this.canvas.width + 30) {
        this.petals[i] = this.createPetal(false);
      }
    }

    this.animId = requestAnimationFrame(() => this.animate());
  }
}

window.petalsEngine = new PetalsEngine();
