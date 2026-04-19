/* ==============================================
   NAIROBI STAYS — script.js
   Premium redesign | 2026
============================================== */

// ─── DATABASE ───────────────────────────────
const listings = [
    {
        id: 1,
        title: "Golden Mango Heights",
        location: "Kilimani, Nairobi",
        category: "kilimani",
        price: "KES 6,500",
        guests: "4 Guests",
        beds: "2 Beds",
        videoSrc: "assets/video.mp4",
        whatsapp: "254115915556"
    },
    {
        id: 2,
        title: "Skynest Westlands View",
        location: "Westlands, Nairobi",
        category: "westlands",
        price: "KES 7,500",
        guests: "2 Guests",
        beds: "1 Bed",
        videoSrc: "assets/video.mp4",
        whatsapp: "254700000000"
    },
    {
        id: 3,
        title: "Kilimani Budget Studio",
        location: "Kilimani, Nairobi",
        category: "budget",
        price: "KES 3,500",
        guests: "1 Guest",
        beds: "Studio",
        videoSrc: "assets/video.mp4",
        whatsapp: "254700000000"
    },
    {
        id: 4,
        title: "The Edge VIP Penthouse",
        location: "Westlands, Nairobi",
        category: "westlands",
        price: "KES 14,000",
        guests: "4 Guests",
        beds: "2 Beds",
        videoSrc: "assets/video.mp4",
        whatsapp: "254700000000"
    },
    {
        id: 5,
        title: "Arboretum Nature Stay",
        location: "Kileleshwa, Nairobi",
        category: "kileleshwa",
        price: "KES 5,500",
        guests: "2 Guests",
        beds: "1 Bed",
        videoSrc: "assets/video.mp4",
        whatsapp: "254700000000"
    },
    {
        id: 6,
        title: "Yaya Center Cozy 1BR",
        location: "Kilimani, Nairobi",
        category: "kilimani",
        price: "KES 4,500",
        guests: "2 Guests",
        beds: "1 Bed",
        videoSrc: "assets/video.mp4",
        whatsapp: "254700000000"
    },
    {
        id: 7,
        title: "Economy Traveller Pad",
        location: "Ngong Road, Nairobi",
        category: "budget",
        price: "KES 2,800",
        guests: "1 Guest",
        beds: "Studio",
        videoSrc: "assets/video.mp4",
        whatsapp: "254700000000"
    },
    {
        id: 8,
        title: "Executive Business Loft",
        location: "Westlands, Nairobi",
        category: "westlands",
        price: "KES 9,000",
        guests: "2 Guests",
        beds: "1 Bed",
        videoSrc: "assets/video.mp4",
        whatsapp: "254700000000"
    }
];

// ─── CATEGORY LABELS ─────────────────────
const categoryLabels = {
    kilimani:   'Kilimani',
    westlands:  'Westlands',
    kileleshwa: 'Kileleshwa',
    budget:     '🔥 Budget Deal'
};

// ─── SAVED STAYS (in-memory) ──────────────
const savedIds = new Set();

// ─── RENDER ────────────────────────────────
const container = document.getElementById('listings');

function createCard(stay) {
    const card = document.createElement('div');
    card.className = `card filter-item ${stay.category}`;
    card.style.animationDelay = `${Math.random() * 0.3}s`;

    const waMsg = encodeURIComponent(`Hi! I'm interested in booking *${stay.title}* (${stay.location}). Is it available?`);

    card.innerHTML = `
        <div class="card-media">
            <video
                src="${stay.videoSrc}"
                autoplay
                muted
                loop
                playsinline
                class="local-video"
                loading="lazy">
            </video>
            <div class="card-badge">${categoryLabels[stay.category] || stay.category}</div>
            <button class="card-save" data-id="${stay.id}" aria-label="Save listing">
                <i class="fa-regular fa-heart"></i>
            </button>
            <div class="card-price-chip">${stay.price} <span>/ night</span></div>
        </div>
        <div class="card-details">
            <h3 class="card-title">${stay.title}</h3>
            <div class="card-loc">
                <i class="fa-solid fa-location-dot"></i>
                ${stay.location}
            </div>
            <div class="card-amenities">
                <div class="amenity">
                    <i class="fa-solid fa-user"></i>
                    ${stay.guests}
                </div>
                <div class="amenity">
                    <i class="fa-solid fa-bed"></i>
                    ${stay.beds}
                </div>
            </div>
            <div class="card-footer">
                <div class="price">
                    <div class="price-amount">${stay.price}</div>
                    <div class="price-label">per night</div>
                </div>
                <a href="https://wa.me/${stay.whatsapp}?text=${waMsg}"
                   target="_blank"
                   rel="noopener"
                   class="book-btn">
                    <i class="fa-brands fa-whatsapp"></i>
                    Book Now
                </a>
            </div>
        </div>
    `;

    // Track "Book Now" click → GA4 + local storage
    const bookBtn = card.querySelector('.book-btn');
    bookBtn.addEventListener('click', () => {
        Analytics.trackBookingClick(stay.id, stay.title, stay.category, stay.price);
    });

    // Save / Unsave toggle
    const saveBtn = card.querySelector('.card-save');
    saveBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(saveBtn.dataset.id);
        const icon = saveBtn.querySelector('i');
        if (savedIds.has(id)) {
            savedIds.delete(id);
            icon.className = 'fa-regular fa-heart';
            saveBtn.classList.remove('saved');
        } else {
            savedIds.add(id);
            icon.className = 'fa-solid fa-heart';
            saveBtn.classList.add('saved');
        }
    });

    return card;
}

function init() {
    container.innerHTML = '';
    listings.forEach(stay => {
        container.appendChild(createCard(stay));
    });
}

// ─── FILTER LOGIC ─────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const val = btn.getAttribute('data-filter');
        Analytics.trackFilter(val); // → GA4 event: filter_used
        const cards = document.querySelectorAll('.filter-item');

        cards.forEach(card => {
            const show = val === 'all' || card.classList.contains(val);
            card.style.display = show ? 'flex' : 'none';
        });
    });
});

// ─── NAVBAR SCROLL ────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ─── MOBILE MENU ──────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ─── LAZY VIDEO PLAY ON VIEWPORT ─────────
function observeVideos() {
    if (!('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.25 });

    document.querySelectorAll('.local-video').forEach(v => io.observe(v));
}

// ─── ANALYTICS ───────────────────────────
// Dual-layer tracking:
//   1. Google Analytics 4 — sends real events to GA dashboard
//   2. Persistent storage  — powers the local /analytics.html dashboard
//
// ⚠️  SETUP: Replace G-XXXXXXXXXX in index.html with your real GA4 Measurement ID
//    Get it at: analytics.google.com → Admin → Data Streams → Web Stream → Measurement ID

const Analytics = (() => {

    // ── GA4 helper ──────────────────────────
    // Safely wraps gtag() so the app never crashes if GA hasn't loaded yet
    function ga(eventName, params = {}) {
        try {
            if (typeof window._gtag === 'function') {
                window._gtag('event', eventName, params);
            }
        } catch (e) {
            console.warn('[GA4] event failed:', eventName, e);
        }
    }

    // ── Persistent storage helpers ───────────
    async function safeGet(key) {
        try {
            const r = await window.storage.get(key, true);
            return r ? JSON.parse(r.value) : null;
        } catch { return null; }
    }
    async function safeSet(key, val) {
        try { await window.storage.set(key, JSON.stringify(val), true); }
        catch (e) { console.warn('[Storage] write failed:', e); }
    }

    // ── Page visit ───────────────────────────
    // GA4 fires page_view automatically (configured in index.html)
    // We supplement with our own daily visit counter for the local dashboard
    async function trackVisit() {
        const today = new Date().toISOString().slice(0, 10);
        const key   = `visits:${today}`;
        const rec   = await safeGet(key) || { date: today, count: 0 };
        rec.count++;
        await safeSet(key, rec);

        const totals = await safeGet('stats:totals') || { visits: 0, bookingClicks: 0 };
        totals.visits++;
        await safeSet('stats:totals', totals);
    }

    // ── "Book Now" button click ───────────────
    // GA4 event: "book_now_click" with listing details
    // Local storage: per-listing click counter
    async function trackBookingClick(listingId, listingTitle, category, price) {

        // 1️⃣  Send to Google Analytics 4
        ga('book_now_click', {
            event_category:    'Engagement',
            event_label:       listingTitle,
            listing_id:        listingId,
            listing_title:     listingTitle,
            listing_category:  category,
            listing_price:     price,
            // GA4 standard ecommerce param — shows up in Monetisation reports
            currency:          'KES',
            value:             parseFloat((price || '0').replace(/[^0-9.]/g, '')) || 0
        });

        // Also fire GA4 standard "select_item" for ecommerce funnels
        ga('select_item', {
            item_list_name: 'Nairobi Stays Listings',
            items: [{
                item_id:       String(listingId),
                item_name:     listingTitle,
                item_category: category,
                price:         parseFloat((price || '0').replace(/[^0-9.]/g, '')) || 0,
                currency:      'KES',
                quantity:      1
            }]
        });

        // 2️⃣  Persist to local dashboard storage
        const key = `bookings:${listingId}`;
        const rec = await safeGet(key) || { id: listingId, title: listingTitle, category, price, clicks: 0, lastClick: null };
        rec.clicks++;
        rec.lastClick = new Date().toISOString();
        await safeSet(key, rec);

        const totals = await safeGet('stats:totals') || { visits: 0, bookingClicks: 0 };
        totals.bookingClicks++;
        await safeSet('stats:totals', totals);

        const today = new Date().toISOString().slice(0, 10);
        const dkey  = `daily-bookings:${today}`;
        const day   = await safeGet(dkey) || { date: today, count: 0 };
        day.count++;
        await safeSet(dkey, day);
    }

    // ── Filter usage ─────────────────────────
    // Track which neighbourhood filter is most used
    function trackFilter(filterValue) {
        ga('filter_used', {
            event_category: 'Navigation',
            event_label:    filterValue,
            filter_name:    filterValue
        });
    }

    // ── WhatsApp CTA (nav / hero) ─────────────
    function trackWhatsAppCTA(source) {
        ga('whatsapp_cta_click', {
            event_category: 'Engagement',
            event_label:    source,
            cta_source:     source
        });
    }

    return { trackVisit, trackBookingClick, trackFilter, trackWhatsAppCTA };
})();

// ── Fire page visit on load ───────────────
Analytics.trackVisit();

// ─── BOOT ─────────────────────────────────
init();
observeVideos();