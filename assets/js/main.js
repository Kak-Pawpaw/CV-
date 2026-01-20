        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

        // --- 0. MOBILE MENU TOGGLE ---
// --- 0. MOBILE MENU TOGGLE (ANIMATED HAMBURGER) ---
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const closeBtnInner = document.getElementById('close-menu-btn'); // Opsional jika masih ada

// Ambil 3 garis di dalam tombol
const lines = mobileBtn.querySelectorAll('span');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen; // Balik status (Open <-> Close)

    if (isMenuOpen) {
        // --- ANIMASI BUKA (JADI SILANG X) ---
        mobileMenu.classList.add('open'); // Munculkan overlay
        
        // Garis 1 (Atas): Turun dan Miring Kanan
        gsap.to(lines[0], { y: 10, rotation: 45, duration: 0.3, ease: "power2.inOut" });
        // Garis 2 (Tengah): Hilang
        gsap.to(lines[1], { opacity: 0, duration: 0.3 });
        // Garis 3 (Bawah): Naik dan Miring Kiri
        gsap.to(lines[2], { y: -10, rotation: -45, duration: 0.3, ease: "power2.inOut" });

    } else {
        // --- ANIMASI TUTUP (BALIK JADI GARIS) ---
        mobileMenu.classList.remove('open'); // Sembunyikan overlay
        
        // Kembalikan semua ke posisi semula
        gsap.to(lines[0], { y: 0, rotation: 0, duration: 0.3, ease: "power2.inOut" });
        gsap.to(lines[1], { opacity: 1, duration: 0.3 });
        gsap.to(lines[2], { y: 0, rotation: 0, duration: 0.3, ease: "power2.inOut" });
    }
}

// Event Listeners
mobileBtn.addEventListener('click', toggleMenu);

// Jika link diklik, tutup menu & kembalikan animasi tombol
mobileLinks.forEach(link => link.addEventListener('click', () => {
    if(isMenuOpen) toggleMenu(); 
}));

// (Opsional) Jika tombol X di dalam menu masih ada dan diklik
if(closeBtnInner) {
    closeBtnInner.addEventListener('click', () => {
        if(isMenuOpen) toggleMenu();
    });
}


        // --- 1. SETUP DYNAMIC BACKGROUND ---
        const canvas = document.getElementById('cyber-canvas');
        const icons = [
            'fa-brands fa-react', 'fa-brands fa-js', 'fa-brands fa-python', 'fa-solid fa-code', 
            'fa-solid fa-terminal', 'fa-solid fa-database', 'fa-solid fa-bug', 'fa-brands fa-git-alt', 
            'fa-solid fa-network-wired', 'fa-solid fa-microchip', '</>', '{ }', '01'
        ];

        // Kurangi jumlah elemen di mobile agar tidak berat (20 di mobile, 40 di desktop)
        const particleCount = window.innerWidth < 768 ? 20 : 40;

        for (let i = 0; i < particleCount; i++) {
            const floater = document.createElement('div');
            const layerClass = Math.random() < 0.6 ? 'back' : 'front'; 
            floater.className = `floater ${layerClass}`;
            
            const randomContent = icons[Math.floor(Math.random() * icons.length)];
            if (randomContent.includes('fa-')) {
                floater.innerHTML = `<i class="${randomContent}"></i>`;
                floater.style.fontSize = gsap.utils.random(20, window.innerWidth < 768 ? 30 : 60) + 'px';
            } else {
                floater.innerText = randomContent;
                floater.style.fontSize = gsap.utils.random(16, window.innerWidth < 768 ? 20 : 30) + 'px';
                floater.style.fontFamily = 'JetBrains Mono, monospace';
            }

            gsap.set(floater, {
                x: gsap.utils.random(0, window.innerWidth),
                y: gsap.utils.random(0, window.innerHeight),
                rotation: gsap.utils.random(0, 360)
            });
            canvas.appendChild(floater);

            gsap.to(floater, {
                x: `+=${gsap.utils.random(-100, 100)}`,
                y: `+=${gsap.utils.random(-100, 100)}`,
                rotation: `+=${gsap.utils.random(-180, 180)}`,
                duration: gsap.utils.random(10, 25),
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
        }


        // --- 2. INTRO LOADER ---
        const introTl = gsap.timeline();
        introTl
            .to("#typewriter-text", { text: "INITIALIZING PORTOFOLIO...", duration: 2, ease: "none" })
            .to({}, { duration: 0.5 }) 
            .to("#intro-loader", { yPercent: -100, duration: 1.2, ease: "expo.inOut" })
            .to("#main-content", { opacity: 1, duration: 0.5 }, "-=0.8")
            .from(".hero-text-container h1", { y: 100, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.5")
            .from("[data-gsap='reveal']", { y: 50, opacity: 0, stagger: 0.2, duration: 0.8 }, "-=0.8");


        // --- 3. PROFILE REVEAL ---
        const profileTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#profile-trigger",
                start: "top center", 
                end: "+=500",
                scrub: 1, 
            }
        });
        
        profileTl
            .from("#photo-container", { x: -100, opacity: 0, rotationY: -30, duration: 2 })
            .from("#bio-container", { x: 100, opacity: 0, duration: 2 }, "<");


        // --- 4. SKILLS ANIMATION (FIXED) ---
        // Menggunakan fromTo untuk memaksa opacity berubah
        gsap.utils.toArray("#skill-grid .tech-panel").forEach((panel, i) => {
            gsap.fromTo(panel, 
                { y: 50, opacity: 0, scale: 0.9 }, // Awal
                { 
                    y: 0, opacity: 1, scale: 1, // Akhir
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: "#skills",
                        start: "top 80%",
                    },
                    delay: i * 0.1
                }
            );
        });


        // --- 5. HORIZONTAL SCROLL CERTIFICATES (MOBILE RESPONSIVE FIX) ---
        // Refresh ScrollTrigger saat layar di-resize
        ScrollTrigger.addEventListener("refreshInit", () => gsap.set("#cert-move-wrap", {x: 0}));

        const moveWrap = document.querySelector("#cert-move-wrap");
        
        // Fungsi kalkulasi dinamis
        function getScrollAmount() {
            let race = moveWrap.scrollWidth - window.innerWidth;
            return -(race);
        }

        const tween = gsap.to(moveWrap, {
            x: getScrollAmount,
            ease: "none",
        });

        ScrollTrigger.create({
            trigger: "#cert-pin-wrap",
            start: "center center",
            end: () => `+=${moveWrap.scrollWidth - window.innerWidth + 200}`, 
            pin: true,
            animation: tween,
            scrub: 1,
            invalidateOnRefresh: true, // Penting untuk mobile resize
        });

// --- 6. CONTACT MODAL LOGIC ---
const contactModal = document.getElementById('contact-modal');
const modalBox = document.getElementById('modal-box');
const sessionId = document.getElementById('session-id');

function openContactModal() {
    // Tampilkan container modal
    contactModal.classList.remove('hidden');
    contactModal.classList.add('flex');
    
    // Generate Random Session ID biar keren
    sessionId.innerText = 'USR-' + Math.floor(Math.random() * 1000000);

    // Animasi Pop Up (Menggunakan GSAP yang sudah ada)
    gsap.fromTo(modalBox, 
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
    );
}

function closeContactModal() {
    // Animasi Close
    gsap.to(modalBox, {
        scale: 0.8, 
        opacity: 0, 
        y: 50, 
        duration: 0.3, 
        ease: "power2.in",
        onComplete: () => {
            contactModal.classList.add('hidden');
            contactModal.classList.remove('flex');
        }
    });
}

// --- 7. INFINITE MARQUEE (TESTIMONIALS) ---
// Kita menduplikasi konten agar scrollingnya tidak putus (seamless loop)
const marqueeTrack = document.querySelector('.marquee-track');
const marqueeClone = marqueeTrack.cloneNode(true);
document.querySelector('.marquee-container').appendChild(marqueeClone);

// Animasi gerak terus menerus ke kiri
gsap.to('.marquee-track', {
    xPercent: -100, // Geser ke kiri sejauh 100% lebarnya
    repeat: -1,     // Ulangi selamanya
    duration: 20,   // Kecepatan (makin besar makin pelan)
    ease: "linear"  // Gerakan konstan (tidak ada akselerasi/deselerasi)
});

// --- 8. LOGO GLITCH EFFECT ---
// --- 8. LOGO GLITCH EFFECT (VARIATIF & RANDOM) ---
const logoContainer = document.getElementById('logo-container');
const logoText = document.getElementById('logo-text');

// Daftar kata-kata glitch yang akan muncul secara acak
// Anda bisa tambah/kurangi sesuka hati!
const glitchWords = [
    "01010101", 
    "SYS_ERR!", 
    "UNKNOWN_", 
    "404_NULL", 
    "HACK_MOD", 
    "<BINARY>", 
    "X_X_X_X",
    "Loading.",
    "Bang-Jago",
    "C0D3R_",
    "R_A_F_I_" 
];

// Saat Mouse Masuk (Hover)
logoContainer.addEventListener('mouseenter', () => {
    // 1. Hentikan animasi sebelumnya (biar gak tabrakan kalau mouse gerak cepet)
    gsap.killTweensOf(logoText);
    
    // 2. Ubah warna jadi Cyan
    gsap.to(logoText, { color: "#00f3ff", duration: 0.2 });

    // 3. Buat Timeline untuk urutan ganti teks
    const tl = gsap.timeline();

    // Pilih kata acak ke-1
    const randomWord1 = glitchWords[Math.floor(Math.random() * glitchWords.length)];
    // Pilih kata acak ke-2 (biar efeknya makin chaotic)
    const randomWord2 = glitchWords[Math.floor(Math.random() * glitchWords.length)];

    // Tahap A: Tampilkan Glitch 1
    tl.to(logoText, { 
        duration: 0.1,      // Sangat cepat
        text: randomWord1, 
        ease: "none"
    });

    // Tahap B: Tampilkan Glitch 2
    tl.to(logoText, { 
        duration: 0.1,      // Sangat cepat
        text: randomWord2, 
        ease: "none"
    });

    // Tahap C: Balik ke Nama Asli
    tl.to(logoText, { 
        duration: 0.4, 
        text: "RAFI.DEV", 
        ease: "none",
        delay: 0.05
    });
});

// Saat Mouse Keluar
logoContainer.addEventListener('mouseleave', () => {
    // Kembalikan warna ke putih
    gsap.to(logoText, { color: "#ffffff", duration: 0.3 });
});

// Saat Mouse Keluar
logoContainer.addEventListener('mouseleave', () => {
    gsap.to(logoText, { color: "#ffffff", duration: 0.3 });
});

// --- 9. HYBRID REVIEWS (STATIC + DYNAMIC) ---

// GANTI URL INI DENGAN URL GOOGLE SCRIPT ANDA
const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbz69xCSAORiSx9PRplFhCLNg56M3ApWYIbS1QbwEGhHVHHDaKkbZWf_DYwSmoKJyjaE7Q/exec'; 

async function loadReviews() {
    const track = document.getElementById('review-track');
    
    // 1. Cek dulu apakah track ada (untuk safety)
    if (!track) return;

try {
        console.log("Mencoba mengambil data dari:", SHEET_API_URL); // Cek URL di console
        
        const response = await fetch(SHEET_API_URL);
        
        // Cek status respon
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const reviews = await response.json();
        console.log("Data berhasil didapat:", reviews);
        
        // 3. Opsi Styling Acak (Agar variatif)
        const styles = [
            { border: 'border-neonCyan', bg: 'from-neonCyan to-blue-600', text: 'text-neonCyan' },
            { border: 'border-neonPurple', bg: 'from-neonPurple to-pink-600', text: 'text-neonPurple' },
            { border: 'border-neonGreen', bg: 'from-neonGreen to-emerald-600', text: 'text-neonGreen' },
            { border: 'border-red-500', bg: 'from-red-500 to-orange-600', text: 'text-red-500' }
        ];

        // 4. Loop data baru & Masukkan ke HTML
        reviews.forEach(item => {
            // --- LOGIKA PRIVASI NAMA ---
            let safeName;
            if (item.nama && item.nama.length > 3) {
                // Ambil 3 huruf depan + angka acak (Misal: Budi -> Bud_882)
                safeName = item.nama.substring(0, 3) + "_" + Math.floor(Math.random() * 999); 
            } else {
                safeName = "Client_" + Math.floor(Math.random() * 1000);
            }

            // Pilih gaya acak
            const style = styles[Math.floor(Math.random() * styles.length)];

            // Buat bintang rating
            let starsHtml = '';
            // Pastikan rating minimal 1, maksimal 5
            const rating = Math.min(Math.max(parseInt(item.rating) || 5, 1), 5); 
            for(let i=0; i<rating; i++) starsHtml += '<i class="fa-solid fa-star"></i>';

            // Buat Element Kartu Baru
            const card = document.createElement('div');
            // Class harus SAMA PERSIS dengan yang statis agar ukurannya rapi
            card.className = `review-card tech-panel p-6 rounded-lg w-[300px] flex-shrink-0 border-l-2 ${style.border}`;
            
            // Isi HTML Kartu
            card.innerHTML = `
                <div class="flex items-center gap-3 mb-3">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br ${style.bg}"></div>
                    <div>
                        <h4 class="font-mono text-xs font-bold text-white">${safeName}</h4>
                        <p class="text-[10px] text-codeGray">Project: ${item.project || 'Custom Joki'}</p>
                    </div>
                </div>
                <p class="font-sans text-sm text-gray-300 italic">"${item.review}"</p>
                <div class="mt-3 flex ${style.text} text-xs">
                    ${starsHtml}
                </div>
            `;

            // PENTING: appendChild = Menambah di belakang (TIDAK MENGHAPUS YANG LAMA)
            track.appendChild(card);
        });

    } catch (error) {
        // Ini akan mencetak error detail di Console (F12)
        console.error('DETAIL ERROR:', error); 
        console.log('Gagal memuat review dinamis, menampilkan review statis saja.');
    } finally {
        // 5. Jalankan Animasi SETELAH semua data (Statis + Dinamis) tergabung
        startMarquee();
    }
}

function startMarquee() {
    const marqueeContainer = document.querySelector('.marquee-container');
    const track = document.getElementById('review-track');
    
    // Pastikan track ada dan punya isi
    if(track && track.children.length > 0) {
        
        // 1. KLONING GANDA (SAFETY NET)
        // Kita clone 2 kali agar kalau layar lebar, tidak ada ruang kosong hitam
        const clone1 = track.cloneNode(true);
        const clone2 = track.cloneNode(true);
        
        // Atribut aksesibilitas agar tidak dibaca screen reader berulang
        clone1.setAttribute('aria-hidden', 'true'); 
        clone2.setAttribute('aria-hidden', 'true'); 
        
        marqueeContainer.appendChild(clone1);
        marqueeContainer.appendChild(clone2);

        // 2. TUNGGU FONT LOAD (Agar perhitungan lebar akurat)
        document.fonts.ready.then(() => {
            
            // 3. ANIMASI GSAP (SMOOTH & ANTI PUTUS)
            // Kita gerakkan semua track ke kiri sejauh -100% dari lebar track aslinya
            // ease: "linear" wajib agar tidak ada perlambatan di awal/akhir
            
            gsap.to('.marquee-track', {
                xPercent: -100, 
                repeat: -1, 
                duration: 40, // Atur kecepatan (makin besar = makin pelan)
                ease: "linear",
                modifiers: {
                    // Fitur Modifiers GSAP (Opsional, tapi bagus untuk presisi)
                    // Memastikan xPercent selalu presisi saat looping
                    xPercent: gsap.utils.unitize(x => parseFloat(x) % 100) 
                }
            });
        });
    }
}

// Panggil fungsi utama
loadReviews();