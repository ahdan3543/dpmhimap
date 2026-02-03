
# 🚀 Panduan Pengelolaan Website DPM HIMA PKO

Halaman ini berisi instruksi cepat untuk pengurus dalam memperbarui konten website.

## 📸 Cara Mengubah Foto Anggota

### Cara 1: Menggunakan Link Internet (Paling Mudah)
1. Cari foto di internet atau upload ke hosting gambar (Imgur, Cloudinary, dsb).
2. Klik kanan foto dan pilih **"Copy Image Address"** (Pastikan link berakhiran .jpg, .png, atau .webp).
3. Buka file `data/dummy.ts`.
4. Ganti isi `photo` dengan link tersebut:
   ```typescript
   { id: 'bph1', name: 'Nama...', role: 'Ketua', photo: 'https://link-foto.com/gambar.jpg' },
   ```

### Cara 2: Menggunakan File Lokal
1. Simpan foto di folder `public/pengurus/`.
2. Beri nama file yang rapi (contoh: `adam.jpg`).
3. Buka file `data/dummy.ts`.
4. Ubah path `photo`:
   ```typescript
   { id: 'bph1', name: 'Nama...', role: 'Ketua', photo: '/pengurus/adam.jpg' },
   ```

## 📰 Cara Menambah Berita
1. Buka file `data/dummy.ts`.
2. Tambahkan objek baru ke dalam array `DUMMY_NEWS`.
3. Gunakan link Unsplash atau foto lokal di `public/berita/`.

---
**Tips:** Jika kamu menggunakan link dari **Google Drive**, pastikan aksesnya sudah diatur ke *"Anyone with the link"* (Siapa saja yang memiliki link).
