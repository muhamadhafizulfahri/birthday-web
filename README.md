# 🌸 Website Ulang Tahun Romantis & Interaktif (Spesial untuk Perempuan)

Website perayaan ulang tahun modern, manis, dan sangat interaktif yang dirancang khusus untuk memberikan pengalaman magis dan tak terlupakan bagi perempuan (pacar, gebetan, sahabat, atau istri).

---

## ✨ Fitur Unggulan

1. **💌 Amplop Kejutan 3D (Opening Scene)**
   - Animasi amplop mewah dengan *wax seal* (stempel lilin merah) yang berdenyut lembut.
   - Saat disentuh/diklik, amplop terbuka dengan transisi 3D, melontarkan taburan konfeti, dan memutar melodi musik latar secara otomatis.

2. **🌸 Efek Kelopak Bunga Sakura & Kursor Hati Berhamburan**
   - Latar belakang dihiasi kelopak bunga sakura dan mawar yang melayang perlahan dengan fisika natural.
   - Setiap sentuhan layar atau gerakan kursor memancarkan partikel cinta (`💖`, `✨`, `🌸`) dan efek suara petikan harpa lembut.

3. **🎂 Kue Ulang Tahun 3D Interaktif (Bisa Ditiup!)**
   - Kue bertingkat dengan krim leleh, stroberi manis, taburan mutiara, dan 3 lilin menyala dengan api yang berkedip realistis.
   - **2 Metode Tiup Lilin:**
     - **Tiup dengan Suara / Mikrofon (🎤):** Cukup tiup ke arah layar/mic HP atau laptop seperti meniup lilin sungguhan!
     - **Tombol Tiup Lilin (🌬️):** Alternatif praktis tanpa perlu izin mic.
   - Saat lilin padam, muncul efek asap mengepul, diikuti dentuman pesta konfeti heboh dan kartu ucapan doa terkabul.
   - Tombol *Nyalakan Lilin Lagi* jika ingin mengulang keseruannya.

4. **⏱️ Miracle & Age Counter Real-Time**
   - Menghitung secara langsung total hari, jam, menit, dan detik sejak dia lahir ke dunia untuk mengingatkannya betapa berharganya kehadirannya.

5. **📸 Galeri Foto Polaroid Kenangan**
   - Bingkai foto gaya polaroid dengan efek selotip washi tape pastel dan tulisan tangan (*handwritten font*).
   - Efek miring (*tilt*) yang dinamis dan fitur **Lightbox** (klik foto untuk memperbesar dengan tampilan layar penuh).

6. **✨ 6 Hal Mengapa Kamu Begitu Istimewa**
   - Kartu-kartu *glassmorphism* elegan dengan sentuhan warna pastel yang memuat alasan-alasan manis tentang kebaikan dan pesonanya.

7. **💌 Surat Cinta & Harapan yang Menyentuh Hati**
   - Desain kertas perkamen (*parchment*) dengan tipografi klasik yang anggun, berisi pesan mendalam dan doa terbaik.

8. **🎁 Kupon Hadiah Cinta Virtual**
   - Kartu kupon lucu (Kupon Traktir Makan, Kupon Peluk & Curhat 24 Jam, Kupon Jalan-Jalan & Hunting Foto, Kupon Permintaan Bebas).
   - Tombol **Klaim Hadiah** yang akan memberikan stempel merah *TERKLAIM ❤️* dengan suara letupan konfeti.

9. **🎈 Terbangkan Balon Harapan ke Langit Bintang**
   - Kanvas malam berbintang yang gemerlap lengkap dengan bintang jatuh (*shooting stars/meteors*).
   - Si dia dapat mengetikkan impian atau doanya sendiri, lalu menerbangkan balon pastel pembawa doa ke angkasa.
   - Seluruh doa tersimpan rapi pada daftar riwayat doa.

10. **🎵 Romantic Audio Engine (Web Audio API)**
    - Tanpa ketergantungan file MP3 eksternal yang rawan rusak/hilang; melodi *music box Happy Birthday* disintesis langsung secara otomatis di peramban.
    - Dilengkapi efek suara tiupan angin, suara konfeti, suara buka amplop, dan petikan nada hati.
    - Bisa juga memasukkan URL lagu MP3 favorit jika ingin memutar lagu romantis tertentu.

11. **⚙️ Customizer Langsung di Browser (Live Settings Modal)**
    - Klik ikon gerigi (⚙️) di pojok kanan atas untuk mengubah:
      - Nama lengkap & panggilan
      - Tanggal lahir
      - Tema warna (*Rose Gold*, *Sweet Lavender*, *Peach Sunset*, *Midnight Starlight*)
      - Upload foto-foto galeri langsung dari galeri HP/laptop (tersimpan otomatis di browser)
      - Kalimat ucapan dan isi surat cinta

---

## 🚀 Cara Menjalankan Website

### Cara 1: Buka Langsung (Paling Mudah)
Cukup klik dua kali (double click) file `index.html` pada browser apa pun (Google Chrome, Microsoft Edge, Safari, Firefox).

### Cara 2: Menggunakan Local Server (Python / Node.js)
Jika ingin menguji fitur mikrofon secara penuh di browser ponsel via jaringan lokal:

```bash
# Menggunakan Python:
python -m http.server 3000

# Atau menggunakan npx serve (Node.js):
npx serve .
```
Lalu buka `http://localhost:3000` di browser.

---

## 🎨 Cara Menyesuaikan Data (Personalisasi)

Ada 2 cara mudah untuk mengganti nama, foto, dan ucapan:

### Metode A: Lewat Tombol Pengaturan di Website (Tanpa Koding)
1. Buka `index.html` di browser.
2. Buka amplop, lalu klik ikon **⚙️ (Pengaturan)** di pojok kanan atas.
3. Masukkan nama perempuan tersayang, tanggal lahirnya, pilih foto dari galeri Anda, dan edit teks suratnya.
4. **Agar tombol gerigi tidak muncul di layarnya:** Centang opsi *"Sembunyikan tombol gerigi ini untuk dia (Mode Penerima)"*.
5. Klik tombol **📥 Unduh config.js** (opsional tapi disarankan) lalu timpa file `js/config.js` agar data paten saat diunggah ke internet.
6. Klik **Simpan & Terapkan ✨**.

> 🔒 **Bagaimana cara kamu membuka pengaturannya lagi jika tombol gerigi disembunyikan?**
> Ada 2 cara rahasia:
> 1. Buka link dengan menambahkan `?edit=true` di akhir URL (contoh: `https://link-kamu.netlify.app?edit=true` atau `index.html?edit=true`).
> 2. Atau **ketuk 3 kali ikon ❤️** di teks paling bawah halaman (*"Dibuat dengan segenap cinta untuk..."*). Pengaturan akan otomatis terbuka kembali!

### Metode B: Lewat File `js/config.js` (Untuk Pengembang / Hosting)
Buka file `js/config.js` dengan teks editor apa pun (VS Code / Notepad). Anda dapat langsung mengganti:
- `recipientName`: Nama lengkapnya (misal: "Clarissa Aurelia")
- `nickname`: Nama panggilan kesayangan (misal: "Bidadariku", "Sayang")
- `birthDate`: Tanggal lahir format `YYYY-MM-DD` (misal: "2003-10-15")
- `theme`: Pilihan tema (`rose-gold`, `lavender`, `peach`, `midnight`)
- `memories`: Daftar URL foto dan keterangan foto kenangan
- `letter`: Isi surat cinta dan doa

---

## 🌐 Cara Mengirimkan Link Website ke Dia (Deploy Gratis)

Agar website ini bisa dibuka oleh si penerima lewat link WhatsApp/Instagram dari ponselnya, Anda bisa mengunggahnya secara gratis ke:

### 1. Vercel / Netlify Drop (Paling Cepat - 1 Menit Selesai)
1. Buka [app.netlify.com/drop](https://app.netlify.com/drop).
2. Tarik (*drag & drop*) seluruh folder proyek ini ke halaman tersebut.
3. Netlify akan langsung memberikan URL aktif (misal: `https://ultah-adinda.netlify.app`).
4. Bagikan link tersebut ke si dia!

### 2. GitHub Pages
1. Buat repositori baru di GitHub.
2. Unggah file-file proyek ini (`index.html`, folder `css`, `js`, `assets`).
3. Masuk ke **Settings** > **Pages** > pilih branch `main` > Save.
4. Website aktif di `https://username.github.io/nama-repo/`.

---

❤️ *Semoga website ini membawa senyuman paling manis dan kebahagiaan di hari ulang tahunnya!*
