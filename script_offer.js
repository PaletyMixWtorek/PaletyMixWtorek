let galleryIndices = {};

function initGallery(galleryId) {
    galleryIndices[galleryId] = 0;
    showSlides(galleryId);
}

function moveSlides(n, galleryId) {
    let gallery = document.getElementById(galleryId);
    let slides = gallery.querySelectorAll('.offer_image_section_picture');
    let totalSlides = slides.length;

    if (totalSlides <= 3) return;

    galleryIndices[galleryId] += n;

    if (galleryIndices[galleryId] > totalSlides - 3) {
        galleryIndices[galleryId] = 0;
    }
    if (galleryIndices[galleryId] < 0) {
        galleryIndices[galleryId] = totalSlides - 3;
    }

    showSlides(galleryId);
}

function showSlides(galleryId) {
    let gallery = document.getElementById(galleryId);
    let slides = gallery.querySelectorAll('.offer_image_section_picture');
    let startIndex = galleryIndices[galleryId];

    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    for (let i = 0; i < 3 && (startIndex + i) < slides.length; i++) {
        slides[startIndex + i].classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initGallery('palety-gallery');
    initGallery('boxy-gallery');
    initGallery('wielosztuki-gallery');
});
