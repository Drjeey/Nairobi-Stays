// 🔥 DATABASE: 8 Listings Total
// Note: I'm using your working video ID for all of them so they display now.
// You just need to swap the 'tiktokId' when you have real videos.

const listings = [
    // --- EXISTING LISTINGS ---
    {
        id: 1,
        title: "The Marquis Luxury Suite",
        location: "Kileleshwa, Nairobi",
        category: "kileleshwa", 
        price: "KES 8,500",
        guests: "2 Guests",
        beds: "1 Bed",
        username: "elevation.mindset", 
        tiktokId: "7604621517946670344", 
        whatsapp: "254700000000"
    },
    {
        id: 2,
        title: "Skynest Westlands View",
        location: "Westlands, Nairobi",
        category: "westlands",
        price: "KES 7,500",
        guests: "2 Guests",
        beds: "1 Bed",
        username: "elevation.mindset", 
        tiktokId: "7604621517946670344", 
        whatsapp: "254700000000"
    },
    {
        id: 3,
        title: "Kilimani Budget Studio",
        location: "Kilimani, Nairobi",
        category: "budget",
        price: "KES 3,500",
        guests: "1 Guest",
        beds: "1 Bed",
        username: "elevation.mindset",
        tiktokId: "7604621517946670344", 
        whatsapp: "254700000000"
    },

    // --- 5 NEW LISTINGS ---
    {
        id: 4,
        title: "The Edge VIP Penthouse",
        location: "Westlands, Nairobi",
        category: "westlands",
        price: "KES 14,000",
        guests: "4 Guests",
        beds: "2 Beds",
        username: "elevation.mindset",
        tiktokId: "7604621517946670344", // ⚠️ Replace with real ID later
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
        username: "elevation.mindset",
        tiktokId: "7604621517946670344", 
        whatsapp: "254700000000"
    },
    {
        id: 6,
        title: "Yaya Center cozy 1BR",
        location: "Kilimani, Nairobi",
        category: "kilimani",
        price: "KES 4,500",
        guests: "2 Guests",
        beds: "1 Bed",
        username: "elevation.mindset",
        tiktokId: "7604621517946670344", 
        whatsapp: "254700000000"
    },
    {
        id: 7,
        title: "Economy Traveller Pad",
        location: "Ngong Rd, Nairobi",
        category: "budget",
        price: "KES 2,800",
        guests: "1 Guest",
        beds: "1 Bed",
        username: "elevation.mindset",
        tiktokId: "7604621517946670344", 
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
        username: "elevation.mindset",
        tiktokId: "7604621517946670344", 
        whatsapp: "254700000000"
    }
];

// ⚙️ RENDER ENGINE
const container = document.getElementById('listings');

function init() {
    container.innerHTML = ''; 
    
    listings.forEach(stay => {
        const card = document.createElement('div');
        card.className = `card filter-item ${stay.category}`;
        
        const tiktokUrl = `https://www.tiktok.com/@${stay.username}/video/${stay.tiktokId}`;
        
        card.innerHTML = `
            <div class="card-media">
               <blockquote class="tiktok-embed" 
                   cite="${tiktokUrl}" 
                   data-video-id="${stay.tiktokId}" 
                   style="max-width: 100%; min-width: 100%;"> 
                   <section> 
                       <a target="_blank" href="${tiktokUrl}">View on TikTok</a> 
                   </section> 
               </blockquote> 
            </div>
            
            <div class="card-details">
                <div class="card-tag">${stay.category}</div>
                <h3 class="card-title">${stay.title}</h3>
                <div class="card-loc"><i class="fa-solid fa-location-dot"></i> ${stay.location}</div>
                
                <div class="card-amenities">
                    <span><i class="fa-solid fa-user"></i> ${stay.guests}</span>
                    <span><i class="fa-solid fa-bed"></i> ${stay.beds}</span>
                </div>

                <div class="card-footer">
                    <div class="price">${stay.price} <span>/ night</span></div>
                    <a href="https://wa.me/${stay.whatsapp}?text=I'm%20interested%20in%20${stay.title}" 
                       target="_blank" 
                       class="book-btn"
                       onclick="gtag('event', 'click_booking', { 'listing_name': '${stay.title}', 'price': '${stay.price}' })">
                        Book Now
                    </a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    
    // Force reload TikToks
    const script = document.createElement('script');
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
}

// ⚙️ FILTER LOGIC
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        const allCards = document.querySelectorAll('.filter-item');

        allCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'flex';
            } else {
                card.style.display = card.classList.contains(filterValue) ? 'flex' : 'none';
            }
        });
    });
});

init();