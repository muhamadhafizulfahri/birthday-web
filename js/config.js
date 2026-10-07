// Konfigurasi Utama Website Ulang Tahun
// Semua data di sini bisa diubah langsung melalui tombol Pengaturan (⚙️) di pojok kanan bawah website,
// atau langsung diedit pada file ini.

const DEFAULT_CONFIG = {
  // Data Diri Penerima
  recipientName: "Ririn Amelia",
  nickname: "Sayangku",
  birthDate: "2007-10-08T00:00:00", // Format: YYYY-MM-DD
  senderName: "Dari Seseorang yang Selalu Menyayangimu ❤️",

  // Tema Warna: 'rose-gold', 'lavender', 'peach', 'midnight'
  theme: "rose-gold",

  // Pesan Pembuka Amplop
  envelopeTag: "Pesan Khusus Untukmu 💌",
  envelopeTitle: "Sebuah Kejutan di Hari Istimewa",
  envelopeInstruction: "Ketuk amplop dengan lembut untuk membukanya...",

  // Headline & Subtitle Hero
  heroGreeting: "Selamat Ulang Tahun ke-",
  heroSubtitle: "Hari ini adalah hari di mana dunia menjadi tempat yang jauh lebih indah dan hangat karena kehadiranmu.",

  // Lagu Latar Belakang (Synthesizer otomatis aktif, atau bisa masukkan URL lagu mp3 favoritnya)
  bgmTitle: "Melodi Manis Untuk Hari Bahagiamu",
  customAudioUrl: "assets/lagubacksound.mp3", // Kosongkan untuk melodi synthesizer bawaan, atau isi URL audio mp3,

  // Dedikasi Lagu Spesial
  songDedication: {
    title: "Lagu yang Mengingatkanku Padamu",
    songTitle: "Perfect",
    artist: "Ed Sheeran",
    lyricQuote: "Cause we were just kids when we fell in love, not knowing what it was...",
    message: "Setiap kali lagu ini terputar, aku selalu teringat sama kamu. Liriknya seolah menceritakan kisah kita berdua.",
    // Masukkan kode pemutar Spotify di dalam tanda backtick (`) di bawah ini
    spotifyEmbed: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/0tgVpDi06FyKpA1z0VMD4v?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
  },

  // Pesan Interaktif Tiup Lilin Kue
  cakeWishPrompt: "Tutup matamu, pejamkan sejenak, panjatkan doa dan impian terindahmu...",
  cakeBlownMessage: "🎉 Lilin telah padam! Semoga setiap doa baikmu didengar dan dikabulkan oleh semesta. Aamiin!",

  // Galeri Kenangan Polaroid (Foto Asli)
  memories: [
    {
      image: "assets/foto-kita.jpg",
      caption: "Momen berharga kita berdua, terima kasih sudah selalu ada dan membawa kehangatan di setiap hariku. ✨❤️",
      tag: "Kita Berdua"
    },
    {
      image: "assets/foto-senyum.jpg",
      caption: "Senyuman manismu yang selalu berhasil menyejukkan hati dan bikin hariku jauh lebih cerah. 🌸",
      tag: "Senyum Terindah"
    },
    {
      image: "assets/foto-gemas.jpg",
      caption: "Ekspresi lucu dan binar matamu yang selalu sukses bikin jatuh hati berulang kali! 🥺💖",
      tag: "Tatapan Manis"
    },
    {
      image: "assets/foto-kampus.jpg",
      caption: "Sesederhana apa pun penampilanmu, selalu ada sisi manis darimu yang berhasil membuatmu terlihat istimewa. 🌷🤍",
      tag: "Manis Sederhana"
    },
    {
      image: "assets/foto-cantik.jpg",
      caption: "Terima kasih sudah selalu jadi tempat pulang paling nyaman di dunia ini. 🌷",
      tag: "Tempat Pulang"
    },
    {
      image: "assets/foto-berdua.jpeg",
      caption: "Dua orang, satu cerita, dan banyak momen kecil yang akan selalu jadi bagian indah dari perjalanan kita. 🥰✨",
      tag: "Cerita Kita"
    }
  ],

  // 6 Alasan Mengapa Kamu Begitu Istimewa
  reasons: [
    {
      icon: "✨",
      title: "Ketulusan Hatimu",
      description: "Cara kamu memperlakukan orang-orang di sekitarmu dengan tulus dan penuh kehangatan selalu membuatku kagum."
    },
    {
      icon: "🌸",
      title: "Senyum yang Menenangkan",
      description: "Hanya dengan melihat senyummu, semua rasa cemas dan lelah di dunia seketika luntur begitu saja."
    },
    {
      icon: "🌷",
      title: "Kebaikan Tanpa Syarat",
      description: "Kamu punya hati yang begitu lembut dan pemaaf. Dunia beruntung sekali memilikimu."
    },
    {
      icon: "💫",
      title: "Pribadimu yang Kuat",
      description: "Meskipun kadang lelah, kamu selalu bangkit dengan anggun dan senyuman yang pantang menyerah."
    },
    {
      icon: "🎀",
      title: "Humor & Tawamu",
      description: "Hal-hal kecil yang kita tertawakan bersama selalu jadi kenangan paling mahal yang pernah ada."
    },
    {
      icon: "💖",
      title: "Kamu Adalah Kamu",
      description: "Tidak perlu jadi orang lain. Apa adanya dirimu adalah hal terindah yang pernah kutemukan."
    }
  ],

  // Isi Surat Cinta / Surat Harapan Panjang
  letter: {
    badge: "Surat Khusus Dari Lubuk Hati 💌",
    salutation: "Hai Sayangku yang Paling Cantik,",
    paragraphs: [
      "Di hari yang sangat istimewa ini, aku cuma ingin meluangkan waktu sejenak untuk mengingatkanmu betapa berharganya kamu bagiku dan bagi dunia ini.",
      "Mungkin kamu sering merasa lelah, merasa harimu berat, atau bahkan meragukan betapa hebatnya dirimu. Tapi ketahuilah, dari mataku, kamu adalah wanita paling luar biasa, paling kuat, dan paling pantas mendapatkan semua kebahagiaan di alam semesta ini.",
      "Terima kasih sudah lahir ke dunia. Terima kasih sudah tumbuh menjadi sosok yang begitu manis, pengertian, dan selalu membawa kehangatan di mana pun kamu berada.",
      "Di usiamu yang baru ini, doaku sederhana namun mendalam: semoga hatimu selalu dilapangkan, langkahmu selalu dipermudah, impian-impianmu satu per satu menjadi kenyataan, dan air matamu hanya menetes untuk tangis haru kebahagiaan.",
      "Ingat ya, apa pun yang terjadi nanti, kamu tidak pernah sendirian. Aku akan selalu ada di sini, menjadi pendukung setiamu, tempatmu bercerita, dan orang yang paling bangga melihatmu bersinar."
    ],
    closing: "Selamat ulang tahun, cintaku. Semoga semesta selalu memelukmu dengan cinta.",
    signature: "Dengan segenap cintaku yang tak terhingga,"
  },

  // Kotak Surat "Buka Saat..." (Open When Letters)
  openWhenLetters: [
    {
      id: "kangen",
      icon: "🥺",
      badge: "Saat Kamu Rindu",
      title: "Buka saat kamu lagi kangen...",
      message: "Kalau kamu lagi kangen dan aku belum sempat ada di sampingmu saat ini, ingatlah kalau hatiku selalu ada bersamamu ke mana pun kamu melangkah.\n\nPejamkan matamu sebentar, tarik napas dalam-dalam, dan rasakan kalau kamu selalu dicintai dengan sepenuh hati. Jarak atau kesibukan tak pernah bisa mengurangi sedikit pun rasa sayangku padamu. Sabar ya, kita pasti segera bertemu dan mengobrol panjang lagi! ❤️"
    },
    {
      id: "lelah",
      icon: "🌧️",
      badge: "Saat Hari Terasa Berat",
      title: "Buka saat kamu lagi capek atau lelah...",
      message: "Sayangku, istirahatlah sejenak. Kamu sudah berjuang sangat luar biasa hari ini, dan aku sangat bangga padamu.\n\nTidak semua hal harus kamu selesaikan hari ini juga. Tidak apa-apa untuk merasa lelah, tidak apa-apa untuk melambat sejenak. Cuci mukamu dengan air hangat, rebahkan badanmu yang lelah itu, dan biarkan semua beban lepas. Ingat, kamu selalu punya tempat pulang ternyaman di sini."
    },
    {
      id: "insecure",
      icon: "🌸",
      badge: "Saat Ragu Pada Diri Sendiri",
      title: "Buka saat kamu merasa kurang percaya diri...",
      message: "Hei bidadari cantiknya aku, berhentilah membandingkan dirimu dengan orang lain di luar sana.\n\nDari mataku, kamu adalah wanita paling anggun, penuh ketulusan, dan paling berharga. Hal-hal kecil yang mungkin kamu anggap kekurangan, justru membuatmu begitu unik dan menawan. Kamu sudah lebih dari cukup, dan dunia beruntung sekali memilikimu. Tersenyumlah, kamu luar biasa!"
    },
    {
      id: "insomnia",
      icon: "🌙",
      badge: "Saat Malam Terasa Sunyi",
      title: "Buka saat kamu susah tidur di malam hari...",
      message: "Malam sudah larut, taruh ponselmu perlahan, dan biarkan matamu terpejam.\n\nBayangkan kita sedang duduk berdua di bawah langit malam yang tenang, ditemani angin sepoi-sepoi tanpa ada rasa cemas sedikit pun. Biarkan pikiran yang berisik itu beristirahat. Semoga mimpi terindah memeluk tidurmu malam ini. Selamat malam dan mimpi indah, cintaku. 💫"
    }
  ],

  // Scratch Cards (Kartu Gosok) – pesan manis tersembunyi
  scratchCards: [
    { emoji: "💖", revealed: "Kamu adalah alasan terindah dari setiap senyumku" },
    { emoji: "🌟", revealed: "Dunia jadi lebih berwarna sejak ada kamu" },
    { emoji: "🎀", revealed: "Cantiknya kamu itu ga cuma di wajah, tapi juga di hati" },
    { emoji: "🌷", revealed: "Aku bersyukur setiap hari karena kamu ada" },
    { emoji: "✨", revealed: "Kamu tuh spesial, ga ada duanya di dunia ini" },
    { emoji: "💫", revealed: "Setiap momen bersamamu selalu jadi yang paling berharga" }
  ],

  // Pembangkit Mood (Random Sweet Messages)
  moodBoosters: [
    "Makasii ya udah jadi salah satu alasan terbaik buat aku selalu semangat setiap hari. ☀️",
    "Apapun yang terjadi ke depannya, ingat ya kalau aku bakal terus ada di samping kamu. 👫",
    "Hari ini kamu cantik banget, eh ralat, setiap hari ding! 😍",
    "Jangan lupa minum air putih, aku ga mau kamu sakit. 💧",
    "Dunia ini beruntung banget punya senyum semanis kamu. ✨",
    "Kalau kamu lagi capek, ingat ada aku yang selalu bangga sama kamu. ❤️",
    "Seberat apa pun harimu, pulangnya tetep ke aku ya. 🏠",
    "Aku sayang kamu, lebih dari yang kamu tau. 💖",
    "Coba senyum dikit dong... Nah gitu kan makin manis! 🥰",
    "Makasii ya udaa bertahan dan berjuang sampai hari ini. Kamu hebat! 🌸",
    "Jangan insecure ya cantiknya aku, di mataku kamu udah yang paling sempurna. 🌷",
    "I love you kemarin, hari ini, besok, dan selamanya! 💫"
  ],

  // Doa awal di Balon Harapan (Bisa dihapus/diedit sesuai keinginan)
  initialWishes: [
    {
      text: "Semoga di usiamu yang baru ini, setiap langkahmu selalu dipeluk keberkahan, kesehatan, dan senyum yang tak pernah redup. Aamiin! 🌸",
      time: "Tepat di hari bahagiamu"
    }
  ]
};

// Fungsi memuat config dari LocalStorage atau default
function getBirthdayConfig() {

  const saved = localStorage.getItem("birthday_website_config");

  if (saved) {

    try {

      const parsed = JSON.parse(saved);

      // Jika jumlah foto di LocalStorage masih kurang dari foto terbaru,
      // gunakan daftar memories terbaru dari DEFAULT_CONFIG
      if (
        !parsed.memories ||
        parsed.memories.length < DEFAULT_CONFIG.memories.length
      ) {
        parsed.memories = DEFAULT_CONFIG.memories;

        saveBirthdayConfig({
          ...DEFAULT_CONFIG,
          ...parsed
        });
      }

      return { ...DEFAULT_CONFIG, ...parsed };

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
