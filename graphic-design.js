let slideIndex = 0;
const slidesContainer = document.querySelector('.slides');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slideshowContainer = document.querySelector('.slideshow-container');
const closeButton = document.querySelector('.close-button');
const slideCounter = document.querySelector('.slide-counter');

// Add images to the slideshow
const gdImages = [
    'graphic-design/gd1.JPEG',
    'graphic-design/gd2.PNG',
    'graphic-design/gd3.JPG',
    'graphic-design/gd4.JPG',
    'graphic-design/gd5.JPG',
    'graphic-design/gd6.JPG',
    'graphic-design/gd7.jpg'
];
gdImages.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Graphic Design ${i + 1}`;
    slidesContainer.appendChild(img);
});

const slides = document.querySelectorAll('.slides img');

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    slides[index].classList.add('active');
    slideCounter.textContent = `${index + 1} / ${slides.length}`;
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}

function toggleFullscreen() {
    slideshowContainer.classList.toggle('fullscreen');
    if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = '';
    } else {
        document.body.style.overflow = 'hidden';
    }
}

// Event listeners
prevButton.addEventListener('click', (e) => {
    e.stopPropagation();
    prevSlide();
});

nextButton.addEventListener('click', (e) => {
    e.stopPropagation();
    nextSlide();
});

slideshowContainer.addEventListener('click', toggleFullscreen);
closeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (slideshowContainer.classList.contains('fullscreen')) {
        toggleFullscreen();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (slideshowContainer.classList.contains('fullscreen')) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'Escape') toggleFullscreen();
    }
});

// Show the first slide on load
showSlide(slideIndex);