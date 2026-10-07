// Main Application Logic for Birthday Website

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  const cfg = window.birthdayConfig || getBirthdayConfig();

  // 1. Terapkan Tema Warna
  applyTheme(cfg.theme || 'rose-gold');

  // 2. Render Data Awal dari Config
  populateContent(cfg);

  // 3. Inisialisasi Hitungan Waktu Hidup (Age & Days Counter)
  startLifeCounter(cfg.birthDate);

  // 4. Inisialisasi Amplop Pembuka
  initEnvelopeOpener();

  // 5. Inisialisasi Lilin Kue & Langit Bintang
  if (window.birthdayCake) window.birthdayCake.init();
  if (window.wishSky) window.wishSky.init();
  if (window.petalsEngine) window.petalsEngine.init();

  // 6. Inisialisasi Floating Hearts & Efek Kursor
  initInteractiveSparkles();

  // 7. Inisialisasi Lightbox Polaroid
  initPolaroidLightbox();

  // 8. Inisialisasi Kotak Surat Buka Saat...
  initOpenWhenLetters();

  // 9. Inisialisasi Modal Pengaturan / Customizer
  initSettingsModal();
  checkSettingsVisibility();
  initSecretAdminTrigger();

  // 10. Floating Music Player Controller
  initMusicController();
  
  // Fitur Baru
  renderSongDedication(cfg.songDedication);
  startNextBirthdayCounter(cfg.birthDate);
  initMoodBooster(cfg.moodBoosters);
  initScratchCards(cfg.scratchCards);
}

// ==========================================
// TEMA WARNA
// ==========================================
function applyTheme(themeName) {
  document.body.classList.remove('theme-rose-gold', 'theme-lavender', 'theme-peach', 'theme-midnight');
  document.body.classList.add(`theme-${themeName}`);
}

// ==========================================
// POPULATE KONTEN
// ==========================================
function populateContent(cfg) {
  // Nama & Panggilan
  const nameEls = document.querySelectorAll('.dynamic-recipient-name');
  nameEls.forEach(el => el.textContent = cfg.recipientName);

  const nickEls = document.querySelectorAll('.dynamic-recipient-nickname');
  nickEls.forEach(el => el.textContent = cfg.nickname);

  const senderEls = document.querySelectorAll('.dynamic-sender-name');
  senderEls.forEach(el => el.textContent = cfg.senderName);

  // Amplop
  const envTag = document.getElementById('envelope-tag-text');
  if (envTag) envTag.textContent = cfg.envelopeTag;

  const envTitle = document.getElementById('envelope-title-text');
  if (envTitle) envTitle.textContent = cfg.envelopeTitle;

  // Hero Subtitle
  const heroSub = document.getElementById('hero-subtitle-text');
  if (heroSub) heroSub.textContent = cfg.heroSubtitle;

  // Galeri Polaroid
  renderPolaroidGallery(cfg.memories);

  // Alasan Mengapa Kamu Istimewa
  renderReasons(cfg.reasons);

  // Surat Romantis
  renderLetter(cfg.letter);

  // Kotak Surat Buka Saat...
  renderOpenWhenLetters(cfg.openWhenLetters);
}

// ==========================================
// HITUNGAN HARI HIDUP & USIA
// ==========================================
function startLifeCounter(birthDateString) {
  const birthDate = new Date(birthDateString);
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minsEl = document.getElementById('count-mins');
  const secsEl = document.getElementById('count-secs');
  const ageNumberEl = document.getElementById('dynamic-age-number');

  function update() {
    const now = new Date();
    const diff = now - birthDate;

    if (diff < 0) {
      if (daysEl) daysEl.textContent = "0";
      return;
    }

    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const totalMinutes = Math.floor((diff / 1000 / 60) % 60);
    const totalSeconds = Math.floor((diff / 1000) % 60);

    if (daysEl) daysEl.textContent = totalDays.toLocaleString('id-ID');
    if (hoursEl) hoursEl.textContent = totalHours;
    if (minsEl) minsEl.textContent = totalMinutes;
    if (secsEl) secsEl.textContent = totalSeconds;

    // Perkiraan usia tahun
    // Perhitungan usia tahun (Pasti Akurat)
    let years = now.getFullYear() - birthDate.getFullYear();
    const m = now.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
      years--;
    }
    if (ageNumberEl) ageNumberEl.textContent = years;
  }

  update();
  setInterval(update, 1000);
}

// ==========================================
// PEMBUKA AMPLOP
// ==========================================
function initEnvelopeOpener() {
  const envelopeModal = document.getElementById('welcome-envelope-overlay');
  const openBtn = document.getElementById('open-envelope-btn');
  const envelopeCard = document.getElementById('envelope-interactive-card');
  const waxSeal = document.getElementById('envelope-wax-seal');

  function triggerOpen() {
    if (envelopeModal.classList.contains('opening')) return;
    envelopeModal.classList.add('opening');

    if (window.birthdayAudio) {
      window.birthdayAudio.playEnvelopeOpen();
      // Otomatis mulai mainkan melodi musik latar
      window.birthdayAudio.startBGM();
    }

    // Ledakan konfeti saat amplop dibuka
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // Animasi transisi menghilang halus
    setTimeout(() => {
      envelopeModal.classList.add('fade-out');
      document.body.classList.remove('overflow-hidden');
      setTimeout(() => {
        envelopeModal.style.display = 'none';
      }, 800);
    }, 1200);
  }

  if (openBtn) openBtn.addEventListener('click', triggerOpen);
  if (envelopeCard) envelopeCard.addEventListener('click', triggerOpen);
  if (waxSeal) waxSeal.addEventListener('click', triggerOpen);
}

// ==========================================
// RENDER GALERI POLAROID
// ==========================================
function renderPolaroidGallery(memories) {
  const container = document.getElementById('polaroid-grid-container');
  if (!container || !memories) return;

  const rotations = [-3, 2, -2, 3, -1.5, 2.5];

  container.innerHTML = memories.map((item, index) => {
    const rot = rotations[index % rotations.length];
    return `
      <div class="polaroid-card group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20 hover:shadow-2xl" 
           style="--rot: ${rot}deg;"
           data-index="${index}"
           data-img="${item.image}"
           data-caption="${escapeHtml(item.caption)}"
           data-tag="${escapeHtml(item.tag || 'Momen Indah')}">
        <div class="washi-tape"></div>
        <div class="polaroid-photo-wrapper bg-rose-50 overflow-hidden rounded">
          <img src="${item.image}" alt="Kenangan Manis" class="w-full h-64 md:h-72 object-cover object-center transition-transform duration-500 group-hover:scale-105" loading="lazy">
        </div>
        <div class="polaroid-caption pt-3 pb-1 text-center font-handwritten">
          <span class="inline-block text-xs uppercase tracking-wider font-sans font-semibold text-rose-400 bg-rose-50 px-2 py-0.5 rounded-full mb-1">
            ${escapeHtml(item.tag || 'Momen Indah')}
          </span>
          <p class="text-gray-700 text-sm md:text-base leading-snug line-clamp-2 px-1">
            "${escapeHtml(item.caption)}"
          </p>
        </div>
      </div>
    `;
  }).join('');
}

// Lightbox Polaroid
function initPolaroidLightbox() {
  const container = document.getElementById('polaroid-grid-container');
  const lightbox = document.getElementById('polaroid-lightbox-modal');
  const lbImg = document.getElementById('lightbox-image');
  const lbCaption = document.getElementById('lightbox-caption');
  const lbTag = document.getElementById('lightbox-tag');
  const closeBtn = document.getElementById('lightbox-close-btn');

  if (!container || !lightbox) return;

  container.addEventListener('click', (e) => {
    const card = e.target.closest('.polaroid-card');
    if (!card) return;

    const imgUrl = card.getAttribute('data-img');
    const caption = card.getAttribute('data-caption');
    const tag = card.getAttribute('data-tag');

    lbImg.src = imgUrl;
    lbCaption.textContent = `"${caption}"`;
    lbTag.textContent = tag;

    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');

    if (window.birthdayAudio) {
      window.birthdayAudio.playHeartPop();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
    });
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
    }
  });
}

// ==========================================
// RENDER ALASAN ISTIMEWA
// ==========================================
function renderReasons(reasons) {
  const container = document.getElementById('reasons-grid-container');
  if (!container || !reasons) return;

  container.innerHTML = reasons.map((r, i) => `
    <div class="reason-card relative p-6 rounded-3xl bg-white/70 backdrop-blur-md border border-white/60 shadow-lg shadow-pink-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center text-3xl shadow-inner mb-4 group-hover:scale-110 transition-transform">
        ${r.icon}
      </div>
      <div class="text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">
        Alasan #${i + 1}
      </div>
      <h3 class="text-lg font-bold text-gray-800 mb-2 font-serif">
        ${escapeHtml(r.title)}
      </h3>
      <p class="text-sm text-gray-600 leading-relaxed">
        ${escapeHtml(r.description)}
      </p>
      <div class="absolute top-4 right-4 text-pink-200 group-hover:text-rose-400 transition-colors">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
    </div>
  `).join('');
}

// ==========================================
// RENDER SURAT ROMANTIS
// ==========================================
function renderLetter(letter) {
  if (!letter) return;
  const badge = document.getElementById('letter-badge-text');
  const salutation = document.getElementById('letter-salutation-text');
  const body = document.getElementById('letter-body-paragraphs');
  const closing = document.getElementById('letter-closing-text');
  const signature = document.getElementById('letter-signature-text');

  if (badge) badge.textContent = letter.badge;
  if (salutation) salutation.textContent = letter.salutation;
  if (closing) closing.textContent = letter.closing;
  if (signature) signature.textContent = letter.signature;

  if (body && letter.paragraphs) {
    body.innerHTML = letter.paragraphs.map(p => `
      <p class="mb-4 leading-relaxed indent-4 md:indent-6 text-gray-700 font-serif text-base md:text-lg">
        ${escapeHtml(p)}
      </p>
    `).join('');
  }
}

// ==========================================
// RENDER KOTAK SURAT "BUKA SAAT..."
// ==========================================
function renderOpenWhenLetters(letters) {
  const container = document.getElementById('open-when-grid-container');
  if (!container || !letters) return;

  container.innerHTML = letters.map((l, i) => `
    <div class="open-when-card relative bg-white/75 backdrop-blur-md border border-white/80 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex items-center gap-4" data-index="${i}">
      <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 border border-rose-200/50 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform shadow-inner">
        ${l.icon}
      </div>
      <div class="flex-1 min-w-0">
        <span class="text-[10px] font-bold uppercase tracking-wider text-rose-500 bg-rose-50 px-2.5 py-0.5 rounded-full inline-block mb-1">
          ${escapeHtml(l.badge || 'Pesan Penenang')}
        </span>
        <h4 class="font-bold text-gray-800 text-sm sm:text-base leading-snug group-hover:text-rose-600 transition-colors">
          ${escapeHtml(l.title)}
        </h4>
        <span class="text-xs text-gray-400 mt-1 block group-hover:text-rose-400 transition-colors">Ketuk untuk membuka surat 💌</span>
      </div>
      <div class="shrink-0 text-rose-300 group-hover:text-rose-500 group-hover:translate-x-1 transition-all">
        <div class="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  `).join('');
}

function initOpenWhenLetters() {
  const container = document.getElementById('open-when-grid-container');
  const modal = document.getElementById('open-when-modal');
  const closeBtn = document.getElementById('close-open-when-modal-btn');
  const mIcon = document.getElementById('ow-modal-icon');
  const mBadge = document.getElementById('ow-modal-badge');
  const mTitle = document.getElementById('ow-modal-title');
  const mBody = document.getElementById('ow-modal-body');

  if (!container || !modal) return;

  container.addEventListener('click', (e) => {
    const card = e.target.closest('.open-when-card');
    if (!card) return;

    const idx = parseInt(card.getAttribute('data-index'), 10);
    const cfg = window.birthdayConfig || getBirthdayConfig();
    const letters = cfg.openWhenLetters || [];
    const item = letters[idx];
    if (!item) return;

    if (mIcon) mIcon.textContent = item.icon;
    if (mBadge) mBadge.textContent = item.badge || 'Pesan Penenang';
    if (mTitle) mTitle.textContent = item.title;
    if (mBody) mBody.textContent = item.message;

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    if (window.birthdayAudio) {
      window.birthdayAudio.playEnvelopeOpen();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });
}

// ==========================================
// FLOATING HEARTS & KURSOR SPARKLE
// ==========================================
function initInteractiveSparkles() {
  let lastSparkleTime = 0;

  function spawnSparkle(x, y) {
    const now = Date.now();
    if (now - lastSparkleTime < 80) return; // batasi performa
    lastSparkleTime = now;

    const sparkles = ['💖', '✨', '🌸', '💫', '🌷', '🎀'];
    const s = sparkles[Math.floor(Math.random() * sparkles.length)];

    const el = document.createElement('span');
    el.className = 'cursor-sparkle-particle';
    el.textContent = s;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.fontSize = `${Math.random() * 14 + 14}px`;

    document.body.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, 1200);
  }

  window.addEventListener('mousemove', (e) => {
    spawnSparkle(e.clientX, e.clientY);
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      spawnSparkle(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  // Klik di sembarang tempat munculkan efek love berhamburan
  window.addEventListener('click', (e) => {
    // Abaikan jika klik tombol atau form input
    if (e.target.closest('button, input, textarea, a, select, .polaroid-card')) return;

    if (window.birthdayAudio) {
      window.birthdayAudio.playHeartPop();
    }

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const offsetRange = 30;
        const randX = e.clientX + (Math.random() * offsetRange * 2 - offsetRange);
        const randY = e.clientY + (Math.random() * offsetRange * 2 - offsetRange);
        spawnSparkle(randX, randY);
      }, i * 40);
    }
  });
}

// ==========================================
// FLOATING MUSIC CONTROLLER
// ==========================================
function initMusicController() {
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  if (musicToggleBtn && window.birthdayAudio) {
    musicToggleBtn.addEventListener('click', () => {
      window.birthdayAudio.toggleBGM();
    });
  }
}

// ==========================================
// MODAL PENGATURAN / CUSTOMIZER
// ==========================================
function initSettingsModal() {
  const settingsModal = document.getElementById('settings-editor-modal');
  const openSettingsBtn = document.getElementById('open-settings-modal-btn');
  const closeSettingsBtn = document.getElementById('close-settings-modal-btn');
  const settingsForm = document.getElementById('settings-config-form');
  const resetConfigBtn = document.getElementById('reset-config-btn');
  const photoUploadInput = document.getElementById('photo-uploader-input');

  if (!settingsModal) return;

  function loadFormData() {
    const cfg = window.birthdayConfig;
    document.getElementById('input-recipient-name').value = cfg.recipientName || '';
    document.getElementById('input-recipient-nickname').value = cfg.nickname || '';
    document.getElementById('input-birth-date').value = cfg.birthDate || '2003-10-01';
    document.getElementById('input-sender-name').value = cfg.senderName || '';
    document.getElementById('input-theme-select').value = cfg.theme || 'rose-gold';
    document.getElementById('input-custom-audio').value = cfg.customAudioUrl || '';
    
    // Surat
    document.getElementById('input-letter-salutation').value = (cfg.letter && cfg.letter.salutation) || '';
    document.getElementById('input-letter-body').value = (cfg.letter && cfg.letter.paragraphs) ? cfg.letter.paragraphs.join('\n\n') : '';
    document.getElementById('input-letter-closing').value = (cfg.letter && cfg.letter.closing) || '';

    // Checkbox Sembunyikan untuk Penerima
    const isHidden = localStorage.getItem('birthday_hide_settings') === 'true';
    const hideCheckbox = document.getElementById('checkbox-hide-settings');
    if (hideCheckbox) hideCheckbox.checked = isHidden;
  }

  if (openSettingsBtn) {
    openSettingsBtn.addEventListener('click', () => {
      loadFormData();
      settingsModal.classList.remove('hidden');
      settingsModal.classList.add('flex');
    });
  }

  if (closeSettingsBtn) {
    closeSettingsBtn.addEventListener('click', () => {
      settingsModal.classList.add('hidden');
      settingsModal.classList.remove('flex');
    });
  }

  // Upload Foto Langsung dari Galeri HP/Laptop
  if (photoUploadInput) {
    photoUploadInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;

      const previewContainer = document.getElementById('uploaded-photos-preview');
      previewContainer.innerHTML = '<p class="text-xs text-rose-500">Memproses foto...</p>';

      const promises = files.slice(0, 6).map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve(ev.target.result);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises).then(base64Images => {
        previewContainer.innerHTML = '';
        window.tempUploadedPhotos = base64Images;

        base64Images.forEach((src, idx) => {
          const imgThumb = document.createElement('img');
          imgThumb.src = src;
          imgThumb.className = 'w-12 h-12 object-cover rounded-lg border border-pink-300';
          previewContainer.appendChild(imgThumb);
        });
      });
    });
  }

  // Tombol Unduh config.js
  const downloadBtn = document.getElementById('download-config-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const cfg = window.birthdayConfig || getBirthdayConfig();
      downloadConfigFile(cfg);
    });
  }

  // Simpan Form Pengaturan
  if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const updatedCfg = { ...window.birthdayConfig };
      updatedCfg.recipientName = document.getElementById('input-recipient-name').value.trim() || "Adinda Putri";
      updatedCfg.nickname = document.getElementById('input-recipient-nickname').value.trim() || "Sayangku";
      updatedCfg.birthDate = document.getElementById('input-birth-date').value || "2003-10-01";
      updatedCfg.senderName = document.getElementById('input-sender-name').value.trim() || "Dari Seseorang yang Selalu Menyayangimu ❤️";
      updatedCfg.theme = document.getElementById('input-theme-select').value || "rose-gold";
      updatedCfg.customAudioUrl = document.getElementById('input-custom-audio').value.trim();

      // Update Surat
      const paragraphsRaw = document.getElementById('input-letter-body').value.trim();
      updatedCfg.letter = {
        badge: "Surat Khusus Dari Lubuk Hati 💌",
        salutation: document.getElementById('input-letter-salutation').value.trim() || "Hai Sayangku,",
        paragraphs: paragraphsRaw ? paragraphsRaw.split('\n\n').filter(p => p.trim() !== '') : updatedCfg.letter.paragraphs,
        closing: document.getElementById('input-letter-closing').value.trim() || "Selamat ulang tahun, cintaku.",
        signature: "Dengan segenap cintaku yang tak terhingga,"
      };

      // Foto baru jika diupload
      if (window.tempUploadedPhotos && window.tempUploadedPhotos.length > 0) {
        updatedCfg.memories = window.tempUploadedPhotos.map((imgBase64, idx) => ({
          image: imgBase64,
          caption: (updatedCfg.memories[idx] && updatedCfg.memories[idx].caption) || "Momen paling berharga bersamamu ❤️",
          tag: (updatedCfg.memories[idx] && updatedCfg.memories[idx].tag) || `Kenangan #${idx + 1}`
        }));
      }

      // Simpan Pengaturan Privasi Tampilan Tombol Gerigi
      const hideCheckbox = document.getElementById('checkbox-hide-settings');
      const hideForGuest = hideCheckbox ? hideCheckbox.checked : false;
      localStorage.setItem('birthday_hide_settings', hideForGuest ? 'true' : 'false');
      checkSettingsVisibility();

      // Simpan ke LocalStorage & Variabel Global
      saveBirthdayConfig(updatedCfg);
      window.birthdayConfig = updatedCfg;

      // Update Tampilan Langsung
      applyTheme(updatedCfg.theme);
      populateContent(updatedCfg);
      startLifeCounter(updatedCfg.birthDate);

      // Tutup Modal & Munculkan Notifikasi Sukses
      settingsModal.classList.add('hidden');
      settingsModal.classList.remove('flex');

      if (typeof confetti === 'function') {
        confetti({ particleCount: 60, spread: 70 });
      }

      const msg = hideForGuest 
        ? "✨ Pengaturan berhasil disimpan!\n\n🔒 Mode Penerima Aktif: Tombol gerigi telah disembunyikan. Untuk membukanya lagi kapan pun, ketuk 3x lambang ❤️ di paling bawah halaman, atau buka dengan akhiran URL '?edit=true'!"
        : "✨ Pengaturan berhasil disimpan! Website telah diperbarui dengan data barumu.";
      alert(msg);
    });
  }

  // Reset ke Pengaturan Awal
  if (resetConfigBtn) {
    resetConfigBtn.addEventListener('click', () => {
      if (confirm("Apakah kamu yakin ingin mengembalikan semua teks dan foto ke setelan awal bawaan?")) {
        localStorage.removeItem("birthday_website_config");
        localStorage.removeItem("birthday_claimed_coupons");
        localStorage.removeItem("birthday_user_wishes");
        localStorage.removeItem("birthday_hide_settings");
        window.location.reload();
      }
    });
  }
}

// ==========================================
// KONTROL VISIBILITAS TOMBOL PENGATURAN (PRIVASI)
// ==========================================
function checkSettingsVisibility() {
  const openSettingsBtn = document.getElementById('open-settings-modal-btn');
  if (!openSettingsBtn) return;

  const urlParams = new URLSearchParams(window.location.search);
  const isEditMode = urlParams.get('edit') === 'true' || urlParams.get('admin') === 'true';

  // SETTINGAN BARU: Selalu sembunyikan tombol secara default saat pertama kali dibuka!
  if (isEditMode) {
    openSettingsBtn.style.display = 'inline-flex'; // Muncul kalau pakai link rahasia
  } else {
    openSettingsBtn.style.display = 'none'; // Sembunyi total untuk penerima (pacarmu)
  }
}

// Ketuk 3x rahasia pada lambang hati di footer untuk membuka pengaturan
function initSecretAdminTrigger() {
  const secretTrigger = document.getElementById('secret-admin-trigger');
  const settingsModal = document.getElementById('settings-editor-modal');
  let clickCount = 0;
  let clickTimer = null;

  if (secretTrigger && settingsModal) {
    secretTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      clickCount++;
      clearTimeout(clickTimer);

      if (clickCount >= 3) {
        clickCount = 0;
        const openSettingsBtn = document.getElementById('open-settings-modal-btn');
        if (openSettingsBtn) openSettingsBtn.style.display = 'inline-flex';
        localStorage.setItem('birthday_hide_settings', 'false');

        // Refresh isian modal
        const cfg = window.birthdayConfig || getBirthdayConfig();
        document.getElementById('input-recipient-name').value = cfg.recipientName || '';
        document.getElementById('input-recipient-nickname').value = cfg.nickname || '';
        document.getElementById('input-birth-date').value = cfg.birthDate || '2003-10-01';
        document.getElementById('input-sender-name').value = cfg.senderName || '';
        document.getElementById('input-theme-select').value = cfg.theme || 'rose-gold';
        document.getElementById('input-custom-audio').value = cfg.customAudioUrl || '';
        document.getElementById('input-letter-salutation').value = (cfg.letter && cfg.letter.salutation) || '';
        document.getElementById('input-letter-body').value = (cfg.letter && cfg.letter.paragraphs) ? cfg.letter.paragraphs.join('\n\n') : '';
        document.getElementById('input-letter-closing').value = (cfg.letter && cfg.letter.closing) || '';
        
        const hideCheckbox = document.getElementById('checkbox-hide-settings');
        if (hideCheckbox) hideCheckbox.checked = false;

        settingsModal.classList.remove('hidden');
        settingsModal.classList.add('flex');

        if (window.birthdayAudio) window.birthdayAudio.playEnvelopeOpen();
        if (typeof confetti === 'function') {
          confetti({ particleCount: 50, spread: 60 });
        }
      } else {
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, 800);
      }
    });
  }
}

// Download file config.js baru
function downloadConfigFile(cfg) {
  const fileContent = `// Konfigurasi Utama Website Ulang Tahun
// File ini dibuat otomatis dari Customizer Website

const DEFAULT_CONFIG = ${JSON.stringify(cfg, null, 2)};

// Fungsi memuat config dari LocalStorage atau default
function getBirthdayConfig() {
  const saved = localStorage.getItem("birthday_website_config");
  if (saved) {
    try {
      return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    } catch (e) {
      console.error("Gagal membaca config tersimpan:", e);
    }
  }
  return DEFAULT_CONFIG;
}

// Fungsi menyimpan config
function saveBirthdayConfig(newConfig) {
  localStorage.setItem("birthday_website_config", JSON.stringify(newConfig));
}

// Variabel aktif global
window.birthdayConfig = getBirthdayConfig();
`;

  const blob = new Blob([fileContent], { type: 'application/javascript;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'config.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


// ==========================================
// FITUR BARU: COUNTDOWN ULTAH BERIKUTNYA
// ==========================================
function startNextBirthdayCounter(birthDateString) {
  const bdate = new Date(birthDateString);
  const nextBdayEl = document.getElementById('next-bday-countdown');
  if (!nextBdayEl) return;

  function update() {
    const now = new Date();
    // Set ultah tahun ini
    let nextBday = new Date(now.getFullYear(), bdate.getMonth(), bdate.getDate());
    
    // Jika ultah tahun ini sudah lewat, targetkan tahun depan
    if (now > nextBday) {
      nextBday.setFullYear(now.getFullYear() + 1);
    }

    const diff = nextBday - now;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    nextBdayEl.innerHTML = `${d} Hari : ${h} Jam : ${m} Menit : ${s} Detik`;
  }
  update();
  setInterval(update, 1000);
}

// ==========================================
// FITUR BARU: DEDIKASI LAGU (ANTI-GAGAL UNTUK FILE LOKAL)
// ==========================================
function renderSongDedication(songData) {
  if (!songData) return;
  document.getElementById('song-dedication-title').textContent = songData.title || "Lagu Spesial";
  document.getElementById('song-lyric-quote').textContent = `"${songData.lyricQuote}"`;
  document.getElementById('song-artist-info').textContent = `${songData.songTitle} — ${songData.artist}`;
  document.getElementById('song-message').textContent = songData.message;

  if (songData.spotifyEmbed) {
    const embedContainer = document.getElementById('song-embed-container');
    
    // Masukkan Iframe lagu DAN tombol bantuan untuk menyalakan musik lagi
    embedContainer.innerHTML = songData.spotifyEmbed + `
      <div id="resume-bgm-helper" class="mt-4 hidden animate-bounce-in text-center">
        <button id="btn-resume-bgm" class="px-5 py-2.5 bg-rose-100 text-rose-600 border border-rose-200 rounded-full text-xs font-bold hover:bg-rose-200 hover:scale-105 transition-all shadow-sm">
          🎵 Putar Kembali Musik Latar
        </button>
        <p class="text-[10px] text-gray-400 mt-1">Klik jika lagunya sudah selesai</p>
      </div>
    `;
    embedContainer.classList.remove('hidden');

    // Trik Deteksi Klik: Matikan backsound saat iframe video diklik
    window.addEventListener('blur', () => {
      setTimeout(() => {
        if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
          // Pause lagu latar
          if (window.birthdayAudio) {
            window.birthdayAudio.pauseBGM();
          }
          // Munculkan tombol "Putar Kembali"
          const helperBtn = document.getElementById('resume-bgm-helper');
          if (helperBtn) helperBtn.classList.remove('hidden');
        }
      }, 100);
    });

    // Logika tombol "Putar Kembali Musik Latar"
    const btnResume = document.getElementById('btn-resume-bgm');
    if (btnResume) {
      btnResume.addEventListener('click', () => {
        if (window.birthdayAudio) {
          window.birthdayAudio.startBGM();
        }
        // Sembunyikan tombolnya lagi setelah diklik
        document.getElementById('resume-bgm-helper').classList.add('hidden');
      });
    }
  }
}

// ==========================================
// FITUR BARU: PEMBANGKIT MOOD (MOOD BOOSTER)
// ==========================================
function initMoodBooster(messages) {
  const btn = document.getElementById('mood-booster-btn');
  const container = document.getElementById('mood-message-container');
  const textEl = document.getElementById('mood-message-text');
  
  if (!btn || !container || !messages || messages.length === 0) return;

  let lastIndex = -1;

  btn.addEventListener('click', () => {
    // Mainkan sound efek klik jika ada
    if (window.birthdayAudio) window.birthdayAudio.playHeartPop();
    
    // Munculkan konfeti kecil
    if (typeof confetti === 'function') {
      confetti({ particleCount: 20, spread: 50, origin: { y: 0.7 }, colors: ['#f43f5e', '#fbcfe8'] });
    }

    // Pilih pesan acak, pastikan tidak sama dengan pesan sebelumnya
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * messages.length);
    } while (randomIndex === lastIndex && messages.length > 1);
    lastIndex = randomIndex;

    // Animasi transisi teks muncul
    container.classList.remove('hidden');
    container.classList.remove('scale-100', 'opacity-100');
    container.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
      textEl.innerHTML = escapeHtml(messages[randomIndex]);
      container.classList.remove('scale-95', 'opacity-0');
      container.classList.add('scale-100', 'opacity-100');
    }, 150);
  });
}

// ==========================================
// FITUR BARU: KARTU GOSOK (SCRATCH CARDS) - SUPER SMOOTH
// ==========================================
function initScratchCards(cardsData) {
  const container = document.getElementById('scratch-cards-container');
  if (!container || !cardsData) return;

  container.innerHTML = cardsData.map((card, idx) => `
    <div class="scratch-card-wrapper">
      <div class="text-4xl mb-2">${card.emoji}</div>
      <p class="text-sm font-bold text-rose-600 px-2">${card.revealed}</p>
      <canvas id="scratch-canvas-${idx}" class="scratch-canvas"></canvas>
    </div>
  `).join('');

  cardsData.forEach((_, idx) => {
    const canvas = document.getElementById(`scratch-canvas-${idx}`);
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Sesuaikan ukuran canvas dengan pembungkusnya
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Lapisan perak abu-abu
    ctx.fillStyle = '#cbd5e1'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Teks instruksi di atas lapisan perak
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 14px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Gosok Aku!', canvas.width / 2, canvas.height / 2 + 5);

    // Fungsi mendapatkan koordinat kursor/jari
    function getCoords(e) {
      const bRect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - bRect.left,
        y: clientY - bRect.top
      };
    }

    function startScratch(e) {
      isDrawing = true;
      const coords = getCoords(e);
      lastX = coords.x;
      lastY = coords.y;
      scratch(e); // Mulai gosokan pertama
    }

    function scratch(e) {
      if (!isDrawing) return;
      e.preventDefault();
      
      const coords = getCoords(e);
      const x = coords.x;
      const y = coords.y;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      // UKURAN KUAS GOSOK (Semakin besar = semakin gampang terhapus)
      ctx.lineWidth = 45; 
      
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();

      lastX = x;
      lastY = y;
    }

    function stopScratch() {
      isDrawing = false;
    }

    // Mouse Events (Laptop/PC)
    canvas.addEventListener('mousedown', startScratch);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', stopScratch);
    canvas.addEventListener('mouseleave', stopScratch);

    // Touch Events (HP) - passive: false agar layar tidak ikut scroll saat menggosok
    canvas.addEventListener('touchstart', startScratch, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });
    canvas.addEventListener('touchend', stopScratch);
  });
}

// Utility: Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}