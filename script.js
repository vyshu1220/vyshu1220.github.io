document.addEventListener('DOMContentLoaded', () => {

    // Typing effect
    const phrases = [
        'AI & Data Science Student',
        'Python Programmer',
        'Creative UI Designer',
        'Problem Solver',
        'AI Innovator',
        'Turning Ideas into Code',
    ];
    let pIdx = 0, cIdx = 0, deleting = false;
    const typedEl = document.getElementById('typed-text');
    function typeLoop() {
        const phrase = phrases[pIdx];
        if (!deleting) {
            typedEl.textContent = phrase.slice(0, ++cIdx);
            if (cIdx === phrase.length) { deleting = true; setTimeout(typeLoop, 1500); return; }
        } else {
            typedEl.textContent = phrase.slice(0, --cIdx);
            if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
        }
        setTimeout(typeLoop, deleting ? 45 : 80);
    }
    typeLoop();

    // Live Clock
    function updateClock() {
        const now = new Date();
        document.getElementById('live-clock').textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        document.getElementById('live-date').textContent = now.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const html = document.documentElement;
        const isDark = html.getAttribute('data-theme') === 'dark';
        html.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeBtn.textContent = isDark ? '🌙' : '☀';
    });

    // Wallpaper changer
    const wallpapers = [
        'none',
        'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80',
        'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80',
        'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80',
        'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=80',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
        'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80',
        'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1920&q=80',
    ];
    let wallIndex = 0;
    document.getElementById('wallpaper-btn').addEventListener('click', () => {
        wallIndex = (wallIndex + 1) % wallpapers.length;
        const blobs = document.querySelector('.bg-blobs');
        if (wallpapers[wallIndex] === 'none') {
            document.body.style.backgroundImage = 'none';
            blobs.style.opacity = '0';
            setTimeout(() => { blobs.style.display = 'block'; setTimeout(() => { blobs.style.opacity = '1'; }, 50); }, 300);
        } else {
            blobs.style.opacity = '0';
            setTimeout(() => { blobs.style.display = 'none'; }, 300);
            setTimeout(() => {
                document.body.style.backgroundImage = `url('${wallpapers[wallIndex]}')`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundPosition = 'center';
                document.body.style.backgroundAttachment = 'fixed';
            }, 100);
        }
    });

    // Command Palette
    const cmdBtn = document.getElementById('cmd-btn');
    const cmdOverlay = document.getElementById('cmd-overlay');
    const cmdInput = document.getElementById('cmd-input');
    if (cmdBtn) cmdBtn.addEventListener('click', () => { cmdOverlay.classList.add('open'); cmdInput.focus(); });
    if (cmdOverlay) cmdOverlay.addEventListener('click', (e) => { if (e.target === cmdOverlay) cmdOverlay.classList.remove('open'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && cmdOverlay) cmdOverlay.classList.remove('open'); });
    document.querySelectorAll('.cmd-item[data-target]').forEach(item => {
        item.addEventListener('click', () => {
            const target = document.getElementById(item.dataset.target);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
            cmdOverlay.classList.remove('open');
        });
    });
    const cmdTheme = document.getElementById('cmd-theme');
    if (cmdTheme) cmdTheme.addEventListener('click', () => { document.getElementById('theme-toggle').click(); cmdOverlay.classList.remove('open'); });

    // Slideshow
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('slide-dots');
    const caption = document.getElementById('slide-caption');
    const captions = ['Gateway of India — Mumbai', 'Golden Hour — Juhu Beach', 'Wild Eyes — Cat Portrait', 'Divine Grace — Ganesha', 'Marine Drive — Mumbai', 'The Watcher — Langur Portrait', 'Valley View — Sunset Landscape', 'Rocky Shore — Coastal Waves'];
    let currentSlide = 0;
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('slide-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });
    // Set individual photo positions
    slides.forEach(slide => {
        const pos = slide.getAttribute('data-position');
        if (pos) slide.style.objectPosition = pos;
    });
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        document.querySelectorAll('.slide-dot')[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        document.querySelectorAll('.slide-dot')[currentSlide].classList.add('active');
        caption.textContent = captions[currentSlide] || 'Photography';
    }
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

}
);
const cmdWallpaper = document.getElementById('cmd-wallpaper');
if (cmdWallpaper) cmdWallpaper.addEventListener('click', () => {
    document.getElementById('wallpaper-btn').click();
    cmdOverlay.classList.remove('open');
});

// Loader
const statuses = [
    'Initializing system...',
    'Loading portfolio...',
    'Fetching projects...',
    'Almost ready...',
    'Welcome!',
];

let sIdx = 0;
const statusEl = document.querySelector('.loader-status');

const statusInterval = setInterval(() => {
    sIdx = (sIdx + 1) % statuses.length;
    statusEl.textContent = statuses[sIdx];
}, 400);

setTimeout(() => {
    clearInterval(statusInterval);
    document.getElementById('loader').classList.add('hidden');
    setTimeout(() => document.getElementById('loader').remove(), 600);
}, 2200);