# ⚡ RAFI.DEV // FULL-STACK ARCHITECT

![Project Banner](https://img.shields.io/badge/Status-Deployed-success?style=for-the-badge) ![Theme](https://img.shields.io/badge/Theme-Cyberpunk-blueviolet?style=for-the-badge)

> *"Coding is my cardio. Bugs are my breakfast."*

Website portofolio personal dengan nuansa **Cyberpunk / Hacker aesthetic**. Dibangun dengan fokus pada performa, animasi interaktif, dan integrasi data dinamis tanpa backend server tradisional.

🔗 **Live Demo:** [https://kak-pawpaw.github.io/CV-](https://kak-pawpaw.github.io/CV-) 

---

## 🛠️ Tech Stack

Project ini dibangun menggunakan teknologi modern yang ringan namun powerful:

* **Core:** HTML5, Modern JavaScript (ES6+)
* **Styling:** ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) (Utility-First Framework)
* **Animations:** ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat&logo=greensock&logoColor=white) (ScrollTrigger, TextPlugin, Timeline)
* **Backend (Serverless):** Google Apps Script & Google Sheets API
* **Icons:** FontAwesome 6

---

## 🚀 Key Features

### 1. 🎨 Cyberpunk UI/UX
Desain futuristik dengan efek *glow*, *neon borders*, dan tipografi *monospace* (JetBrains Mono). Responsif 100% untuk Mobile dan Desktop.

### 2. ✨ Advanced Animations (GSAP)
* **Intro Loader:** Efek *typing* dan *reveal* saat website dimuat.
* **Scroll Trigger:** Elemen muncul secara halus saat di-scroll.
* **Logo Glitch:** Efek *decoding/hacker* saat kursor diarahkan ke logo.
* **Infinite Marquee:** Running text testimonial yang berjalan mulus tanpa putus (Seamless Loop).

### 3. 💬 Dynamic Review System (Google Sheets)
Fitur unggulan! Testimoni pelanggan diambil secara **Real-time** dari Google Spreadsheet.
* **Hybrid Mode:** Menampilkan review (dari data klien) secara real-time.
* **Privacy Protection:** Nama klien otomatis disensor oleh algoritma JavaScript (contoh: `Rafi` -> `Raf_User88`).
* **Auto Styling:** Warna kartu review diacak otomatis agar variatif.

---

## 📂 Project Structure

Menggunakan struktur folder yang rapi (MVC-like) untuk kemudahan maintenance:

```text
rafi-portfolio/
├── assets/
│   ├── css/
│   │   └── style.css       # Custom Styling & Tailwind Utilities
│   ├── js/
│   │   └── main.js         # Logic, GSAP Animation, API Fetch
│   └── images/             # Profile picture & Certificates
├── index.html              # Main View
└── README.md               # Documentation
