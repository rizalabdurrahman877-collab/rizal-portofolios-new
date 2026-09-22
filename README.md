# 💻 Portfolio — Rizal Abdurrakhman Wakhid

Website portfolio pribadi yang dibuat untuk menampilkan profil, kemampuan, pengalaman belajar, dan berbagai project yang telah saya kerjakan selama mempelajari **Web Development, UI/UX Design, dan Software Engineering**.

🌐 **Live Website:** https://rizal-portofolios.vercel.app/

---

## 👨‍💻 Tentang Project

Website ini merupakan portfolio pribadi **Rizal Abdurrakhman Wakhid**, siswa Rekayasa Perangkat Lunak yang memiliki ketertarikan pada pengembangan website, UI/UX, database, dan teknologi web modern.

Portfolio dibuat dengan konsep **modern, responsif, dan user-friendly**, sehingga dapat digunakan dengan nyaman melalui perangkat desktop maupun smartphone.

Website ini digunakan untuk memperkenalkan:

* Profil pribadi
* Keahlian dan teknologi yang dikuasai
* Project yang pernah dibuat
* Pengalaman belajar dan pengembangan aplikasi
* Kemampuan UI/UX Design
* Informasi kontak

---

## Database Yang Digunakan

## Tabel Supabase

Project ini menggunakan tiga tabel utama:

### 1. proyek

| Kolom | Tipe Data |
|---|---|
| id | bigint |
| created_at | timestamp with time zone |
| judul | text |
| kategori | text |
| deskripsi | text |
| teknologi | text |
| gambar | text |
| link | text |
| featured | boolean |

### 2. skills

| Kolom | Tipe Data |
|---|---|
| id | bigint |
| nama | text |
| kategori | text |
| level | integer |
| created_at | timestamp with time zone |

### 3. pesan_kontak

| Kolom | Tipe Data |
|---|---|
| id | bigint |
| nama | text |
| email | text |
| pesan | text |
| created_at | timestamp with time zone |

## Fitur Tambahan

- Form kontak dengan insert data ke Supabase.
- Halaman Skills mengambil data dari tabel `skills`.
- Penanganan kondisi data kosong pada halaman proyek.
- Supabase Row Level Security (RLS).

Project menggunakan Supabase sebagai database.

### Nama Tabel

`proyek`

### Struktur Tabel

| Kolom | Tipe Data | Keterangan 
---------
 1.id  bigint  ID project 
 2.created_at  timestamp with time zone  Waktu data dibuat 
 3.judul  text  Judul project 
 4.kategori  text  Kategori project 
 5.deskripsi  text  Deskripsi project 
 6.teknologi  text  Teknologi yang digunakan 
 7.gambar  text  URL gambar project 
 8.link  text  Link live demo 
 9.featured  boolean  Status project unggulan 

## Supabase

Data project pada halaman `/proyek`
diambil langsung dari tabel `proyek` di Supabase.

Website tidak lagi menggunakan data statis
dari `data/proyek.ts`.

## Keamanan

File `.env.local` tidak dimasukkan ke repository
GitHub dan sudah ditambahkan ke `.gitignore`.

---

## ✨ Fitur Website

### 🏠 1. Hero Section

Bagian utama website yang menampilkan identitas dan fokus sebagai seorang **Creative Web Developer**.

Fitur yang tersedia:

* Nama dan profesi
* Deskripsi singkat
* Status ketersediaan project
* Informasi pendidikan
* Tombol menuju kontak
* Tombol melihat project
* Daftar teknologi yang digunakan

---

### 👤 2. About Me

Menampilkan informasi singkat mengenai profil dan kemampuan dalam bidang teknologi.

Bagian ini menjelaskan fokus pada:

* Web Development
* UI/UX Design
* Fullstack Development
* Database Development
* Pengembangan aplikasi modern

Terdapat juga beberapa kemampuan utama:

**Clean Code**

> Membuat kode yang terstruktur dan mudah dikembangkan.

**Fullstack Apps**

> Mengembangkan aplikasi mulai dari tampilan hingga database.

**Performance**

> Fokus pada website yang cepat, responsif, dan nyaman digunakan.

---

### 🛠️ 3. Skills

Website menampilkan berbagai teknologi dan tools yang dipelajari dan digunakan dalam project.

#### Web Development

* HTML
* CSS
* JavaScript
* TypeScript
* React
* Next.js
* Tailwind CSS

#### Database

* MySQL
* Supabase
* XAMPP

#### Design

* Figma

---

### 📁 4. Projects

Bagian Projects digunakan untuk menampilkan berbagai project yang pernah dibuat.

Tersedia fitur:

* Daftar project
* Gambar project
* Deskripsi project
* Teknologi yang digunakan
* Kategori project
* Status Featured <- [Fitur Terbaru yang Ditambahkan Pada modul 1 Kemarin]
* Pencarian project <- [Fitur Terbaru yang Ditambahkan Pada modul 2 Kemarin]
* Filter berdasarkan kategori <- [Fitur Terbaru yang Ditambahkan Pada modul 2 Kemarin]
* Fitur Tambah Projek dan Bisa otomatis muncul di slide Project yang akan di simpan di Supabase


Kategori project:

* All
* Featured
* Web Application
* Management System
* IoT

#### Project yang Ditampilkan

**MyApp**

Aplikasi web modern yang dibuat dengan fokus pada pengalaman pengguna yang cepat, sederhana, dan responsif.

Teknologi:

* Next.js
* TypeScript
* Tailwind CSS
* Supabase

---

**Rental Barang**

Sistem management rental barang untuk membantu mengelola data barang secara lebih terstruktur dan mudah digunakan.

Teknologi:

* Next.js
* React
* TypeScript
* Tailwind CSS

---

**Manajemen-Siswa**

Sistem management siswa yang digunakan untuk mengelola data siswa secara lebih terstruktur.

Teknologi:

* Next.js
* React
* TypeScript
* Tailwind CSS

---

**Pendeteksi Banjir**

Project berbasis IoT yang dibuat sebagai salah satu project pengembangan sistem monitoring.

Kategori:

* IoT

---

### 🎓 5. Experience

Bagian Experience menampilkan perjalanan pembelajaran dan pengembangan kemampuan dalam bidang programming.

#### Software Engineering Student

**SMKN 1 PASURUAN**

Mempelajari dasar pemrograman, pengembangan website, database, dan pembuatan aplikasi.

Teknologi yang dipelajari:

* HTML
* CSS
* JavaScript
* MySQL

---

#### Web Development

Mengembangkan berbagai website sebagai bagian dari pembelajaran dan pengembangan kemampuan web development.

Teknologi:

* Next.js
* React
* TypeScript
* Tailwind CSS

---

#### UI/UX Design Exploration

Mengeksplorasi desain interface modern, responsive layout, dan pengalaman pengguna menggunakan Figma.

---

#### Database Development

Mempelajari pengelolaan database dan integrasi database dengan aplikasi web.

Materi yang dipelajari:

* CRUD
* Relasi database
* MySQL
* Supabase
* XAMPP

---

### 📩 6. Contact

Bagian Contact digunakan agar pengunjung dapat menghubungi saya untuk pertanyaan, diskusi, atau project.

Form contact memiliki beberapa input:

* Nama
* Email
* Pesan

Website juga menampilkan informasi lokasi dan alamat email untuk komunikasi.

---

## 🎨 Desain & UI/UX

Website menggunakan konsep desain modern dengan fokus pada:

* Clean interface
* Responsive design
* Modern typography
* Minimalist layout
* User-friendly navigation
* Konsistensi komponen
* Tampilan yang nyaman di desktop dan mobile

---

## 📱 Responsive Design

Website dirancang agar dapat digunakan pada berbagai ukuran layar:

* 💻 Desktop
* 💻 Laptop
* 📱 Smartphone
* 📟 Tablet

Layout dan komponen akan menyesuaikan ukuran layar sehingga tetap nyaman digunakan.

---

## ⚙️ Teknologi yang Digunakan

| Teknologi    | Kegunaan                      |
| ------------ | ----------------------------- |
| Next.js      | Framework utama website       |
| React        | Membangun komponen UI         |
| TypeScript   | Menambahkan type safety       |
| Tailwind CSS | Styling dan responsive design |
| JavaScript   | Logika aplikasi               |
| Supabase     | Database dan backend          |
| MySQL        | Pengelolaan database          |
| Figma        | Perancangan UI/UX             |
| Vercel       | Deployment website            |

---

## 🚀 Menjalankan Project Secara Lokal

Clone repository terlebih dahulu:

```bash
git clone https://github.com/USERNAME/REPOSITORY.git
```

Masuk ke folder project:

```bash
cd nama-project
```

Install dependencies:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Kemudian buka:

```text
http://localhost:3000
```

---

## 🔐 Environment Variables

Jika project menggunakan Supabase atau layanan eksternal lainnya, buat file:

```text
.env.local
```

Contoh:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> ⚠️ Jangan memasukkan file `.env.local` ke repository GitHub karena dapat berisi informasi konfigurasi yang bersifat pribadi.

Tambahkan `.env.local` ke `.gitignore`:

```gitignore
.env.local
.env
```

---

## 📦 Build untuk Production

Untuk membuat build production:

```bash
npm run build
```

Kemudian jalankan:

```bash
npm start
```

---

## ☁️ Deployment

Project dapat di-deploy menggunakan **Vercel**.

Alur deployment:

```text
GitHub Repository
        ↓
     Vercel
        ↓
Production Build
        ↓
Portfolio Website
```

Website portfolio saat ini tersedia secara online melalui:

**https://rizal-portofolios.vercel.app/**

---

## 📂 Struktur Project

Contoh struktur project:

```text
portfolio/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   └── portfolio-page.tsx
│
├── public/
│   ├── images/
│   └── ...
│
├── lib/
│   └── ...
│
├── .env.local
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## 🎯 Tujuan Project

Portfolio ini dibuat dengan beberapa tujuan:

1. Memperkenalkan diri sebagai Web Developer.
2. Menampilkan kemampuan dalam pengembangan website.
3. Mendokumentasikan project yang telah dibuat.
4. Menampilkan pengalaman belajar di bidang Software Engineering.
5. Menjadi media untuk memperkenalkan kemampuan UI/UX dan database.
6. Menjadi portfolio yang dapat dikembangkan seiring bertambahnya pengalaman.

---

## 📈 Pengembangan Selanjutnya

Beberapa fitur yang dapat dikembangkan pada versi berikutnya:

* [ ] Dark/Light Mode
* [ ] Animasi yang lebih interaktif
* [ ] Detail halaman setiap project
* [ ] Blog atau artikel teknologi
* [ ] CMS untuk mengelola project
* [ ] Integrasi database Supabase
* [ ] Sistem contact form yang terhubung ke email
* [ ] Dashboard untuk mengelola portfolio
* [ ] SEO yang lebih optimal
* [ ] Peningkatan performa dan accessibility

---

## 👨‍🎓 Developer

**Rizal Abdurrakhman Wakhid**

Software Engineering Student
SMKN 1 PASURUAN

### Skills

`HTML` `CSS` `JavaScript` `TypeScript` `React` `Next.js` `Tailwind CSS` `MySQL` `Supabase` `Figma`

---

## 📄 Lisensi

Project ini merupakan portfolio pribadi dan dibuat untuk kebutuhan pembelajaran, dokumentasi project, serta pengembangan kemampuan di bidang teknologi.

© 2026 Rizal Abdurrakhman Wakhid. All Rights Reserved.
