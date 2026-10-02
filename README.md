# Rizal Portfolio — Modul 05

## Optimasi SEO, Metadata, Open Graph, Sitemap, Robots, dan Performa

Project ini telah dilengkapi fitur Modul Pertemuan 05:

- Static Metadata pada `app/layout.tsx`
- Dynamic Metadata menggunakan `generateMetadata()` pada `/proyek/[id]`
- Automatic Open Graph Image menggunakan `app/opengraph-image.tsx`
- `robots.txt` menggunakan `app/robots.ts`
- Dynamic `sitemap.xml` menggunakan `app/sitemap.ts`
- Sitemap membaca data proyek dari tabel Supabase `proyek`
- Optimasi gambar menggunakan `next/image`
- Atribut `alt` deskriptif pada gambar
- Halaman `/admin` dan `/api` tidak diizinkan pada robots
- Struktur siap diaudit menggunakan Lighthouse

## Environment

Tambahkan ke `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://rizal-portofolios.vercel.app
```

Untuk local development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## URL yang perlu dicek

Setelah deployment:

- `/`
- `/robots.txt`
- `/sitemap.xml`
- `/opengraph-image`
- `/proyek/[id]`

## Lighthouse

Buka website production di Chrome:

1. Tekan `F12`
2. Pilih `Lighthouse`
3. Pilih Performance, Accessibility, dan SEO
4. Jalankan audit
5. Simpan screenshot skor SEBELUM
6. Setelah perubahan di-deploy, jalankan audit lagi
7. Simpan screenshot skor SESUDAH

## Git

```bash
git add .
git commit -m "Optimasi SEO, Open Graph, robots.txt, sitemap, dan gambar"
git push origin main
```
