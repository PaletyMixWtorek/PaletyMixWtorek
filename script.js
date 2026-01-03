async function fetchJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(`Błąd ładowania ${url}:`, error);
        return null;
    }
}

async function loadHeroBanners() {
    const data = await fetchJSON('content/hero.json');
    if (!data || !data.images) return;

    const images = data.images.map(img => img.url);

    const bgA = document.querySelector('.hero-bg--a');
    const bgB = document.querySelector('.hero-bg--b');

    let i = 0;
    let showA = true;

    function setInitial() {
        bgA.style.backgroundImage = `url('${images[0]}')`;
        bgA.style.opacity = 1;
    }

    function nextSlide() {
        i = (i + 1) % images.length;

        const show = showA ? bgB : bgA;
        const hide = showA ? bgA : bgB;

        show.style.backgroundImage = `url('${images[i]}')`;
        show.style.opacity = 1;
        hide.style.opacity = 0;

        showA = !showA;
    }

    setInitial();
    setInterval(nextSlide, 7000);
}

async function loadOffer() {
    const palety = await fetchJSON('content/palety.json');
    const boxy = await fetchJSON('content/boxy.json');
    const wielosztuki = await fetchJSON('content/wielosztuki.json');

    if (palety) {
        const paletyH2 = document.querySelector('.offer_box:nth-child(1) h2');
        const paletyP = document.querySelector('.offer_box:nth-child(1) p');
        if (paletyH2) paletyH2.textContent = palety.title;
        if (paletyP) paletyP.textContent = palety.description;
    }

    if (boxy) {
        const boxyH2 = document.querySelector('.offer_box:nth-child(2) h2');
        const boxyP = document.querySelector('.offer_box:nth-child(2) p');
        if (boxyH2) boxyH2.textContent = boxy.title;
        if (boxyP) boxyP.textContent = boxy.description;
    }

    if (wielosztuki) {
        const wieloH2 = document.querySelector('.offer_box:nth-child(3) h2');
        const wieloP = document.querySelector('.offer_box:nth-child(3) p');
        if (wieloH2) wieloH2.innerHTML = `${wielosztuki.title}<br>${wielosztuki.subtitle}`;
        if (wieloP) wieloP.textContent = wielosztuki.description;
    }
}

async function loadAbout() {
    const data = await fetchJSON('content/about.json');
    if (!data) return;

    const aboutDiv = document.getElementById('about');
    if (aboutDiv) {
        const h2 = aboutDiv.querySelector('h2');
        const p = aboutDiv.querySelector('p');

        if (h2) h2.textContent = data.title;
        if (p) {
            p.innerHTML = data.content.replace(/\n/g, '<br>');
        }
    }
}

async function loadGallery() {
    const data = await fetchJSON('content/gallery.json');
    if (!data) return;

    const descDiv = document.getElementById('galery_desc');
    if (descDiv && data.description) {
        const h2 = descDiv.querySelector('h2');
        const textContent = descDiv.querySelector('b');

        if (h2) h2.textContent = data.title;
        if (textContent) {
            let html = data.description
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, ' ');
            textContent.innerHTML = html;
        }
    }

    const galeryDiv = document.getElementById('galery');
    if (galeryDiv && data.images) {
        galeryDiv.innerHTML = '';

        data.images.forEach(image => {
            const img = document.createElement('img');
            img.src = image.url;
            img.alt = image.alt || '';
            galeryDiv.appendChild(img);
        });
    }
}

let galleryIndex = 0;

function initMainGallery() {
    galleryIndex = 0;
    showGallerySlides();
}

function moveGallerySlides(n) {
    let galleryItems = document.querySelectorAll('#gallery .gallery-item');
    let totalItems = galleryItems.length;

    if (totalItems <= 3) return;

    galleryIndex += n;

    if (galleryIndex > totalItems - 3) {
        galleryIndex = 0;
    }
    if (galleryIndex < 0) {
        galleryIndex = totalItems - 3;
    }

    showGallerySlides();
}

function showGallerySlides() {
    let galleryItems = document.querySelectorAll('#gallery .gallery-item');
    let startIndex = galleryIndex;

    galleryItems.forEach(item => {
        item.classList.remove('active');
    });

    for (let i = 0; i < 3 && (startIndex + i) < galleryItems.length; i++) {
        galleryItems[startIndex + i].classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadHeroBanners();
    loadOffer();
    loadAbout();
    loadGallery();
    initMainGallery();
});
