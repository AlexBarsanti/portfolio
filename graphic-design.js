let slideIndex = 0;
const slidesContainer = document.querySelector('.slides');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slideshowContainer = document.querySelector('.slideshow-container');
const closeButton = document.querySelector('.close-button');
const slideCounter = document.querySelector('.slide-counter');

// Add images to the slideshow
for (let i = 1; i <= 4; i++) {
    const img = document.createElement('img');
    img.src = `graphic-design/gd${i}.jpg`;  // Updated path to images
    img.alt = `Graphic Design ${i}`;
    slidesContainer.appendChild(img);
}

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