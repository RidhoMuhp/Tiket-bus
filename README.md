# Bustara — Demo Pemesanan Tiket Bus

Demo full-stack pemesanan tiket bus dengan React, Tailwind CSS, Express, dan SQLite. Desainnya minimalis dengan alur pemesanan empat langkah: pencarian perjalanan, kursi, data penumpang, dan e-tiket.

## Menjalankan

```bash
npm install
```

Jalankan terpisah memakai dua terminal:

```bash
# Terminal 1: API Express, SQLite/MySQL, dan WhatsApp admin
npm run dev:api

# Terminal 2: frontend React + Vite
npm run dev:web
```

Web tersedia di `http://localhost:5173`; API berjalan di `http://localhost:3002`. File SQLite `bustara.db` dibuat otomatis saat API pertama berjalan. Gunakan `npm run dev` bila ingin menjalankan keduanya sekaligus.

## Notifikasi WhatsApp admin

Sesudah booking tersimpan, backend menghasilkan URL WhatsApp dengan data tiket yang sudah terisi. Pada layar sukses, tombol **Kirim detail ke WhatsApp admin** akan membuka chat admin dengan pesan siap-kirim.

Atur nomor admin lewat environment variable (format internasional tanpa `+`):

```powershell
$env:WHATSAPP_ADMIN_NUMBER="6281234567890"
npm run server
```

Contoh nilai tersedia di `.env.example`. Mekanisme ini tidak membutuhkan token atau layanan berbayar. Untuk pengiriman otomatis sepenuhnya tanpa membuka WhatsApp, integrasikan WhatsApp Business Cloud API pada `server/utils/whatsapp.js`.

## Struktur

- `src/App.jsx` — pengelola state dan alur aplikasi
- `src/pages/` — halaman pencarian, kursi, penumpang, dan sukses
- `src/components/` — komponen reusable (`TripCard`, `SeatPicker`, `BookingSummary`, `PassengerForm`, layout)
- `src/services/api.js` — satu-satunya lapisan pemanggilan API dari frontend
- `src/styles.css` — utilitas/komponen visual Tailwind dan style pendukung
- `server/routes/` — endpoint API terpisah per domain
- `server/database.js` — persistence SQLite
- `server/utils/whatsapp.js` — pembentukan notifikasi WhatsApp admin

## Menggunakan MySQL

Konfigurasi database berada di `.env`. Untuk memakai MySQL, ubah dan isi nilainya:

```env
DB_CLIENT=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=password_anda
MYSQL_DATABASE=bustara
```

Server akan membuat tabel `bookings` secara otomatis. Untuk kembali ke demo lokal, gunakan `DB_CLIENT=sqlite`.
