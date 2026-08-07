# 📋 Rencana Pengembangan Portofolio - Tahap Lanjutan

> Dokumen ini berisi rencana teknis untuk pengembangan versi 2.0 portofolio, terutama terkait pengelolaan aset media (gambar & video) agar tidak membebani repository GitHub.

---

## 🎯 Tujuan Utama
- Menampilkan portofolio karya yang **banyak** (gambar & video) tanpa membuat repository GitHub menjadi besar (berat).
- Menjaga kecepatan loading website tetap optimal.
- Memisahkan antara **aset inti** (foto profil, logo, favicon) dengan **aset portofolio** (karya klien).

---

## 📂 Strategi Penyimpanan Aset (Hybrid)

### 1. Aset Inti (Disimpan di GitHub)
Aset yang **wajib** ada di repository (karena ukurannya kecil dan bersifat statis):
- Foto profil (`perfil.png`)
- Foto about (`about.png`)
- Logo / Favicon
- File CSS, JS, dan HTML

> *Alasan:* File-file ini penting dan ringan, sehingga aman disimpan langsung di GitHub.

### 2. Aset Portofolio (Disimpan di Cloud / CDN)
Aset karya (gambar hasil kerja, video demo) akan disimpan di layanan cloud agar tidak membebani GitHub:

| Jenis Media | Platform Target | Cara Implementasi |
|-------------|-----------------|-------------------|
| **Gambar** | Imgur / Cloudinary / Postimages | Menggunakan **Direct URL (Hotlink)** di dalam tag `<img src="...">` |
| **Video** | YouTube (Unlisted) / Vimeo | Menggunakan tag `<iframe>` di dalam **Lightbox / Modal Popup** |
| **Dokumen PDF** | Google Drive | Menggunakan **Embedded Viewer** (iframe) |

---

## 🛠️ Rencana Implementasi Teknis (Untuk Dikerjakan Nanti)

### A. Migrasi Gambar Portofolio ke Imgur / Cloudinary
1. Upload semua gambar karya (work1.jpg, work2.jpg, dst.) ke Imgur.
2. Ambil **Direct Link** dari Imgur.
3. Ganti semua atribut `src="assets/img/workX.jpg"` di `index.html` menjadi:
   ```html
   <img src="https://i.imgur.com/ID_GAMBAR.jpg" alt="Keterangan">
