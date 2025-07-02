let slideIndex = 0;
const slidesContainer = document.querySelector('.slides');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slideshowContainer = document.querySelector('.slideshow-container');
const closeButton = document.querySelector('.close-button');
const slideCounter = document.querySelector('.slide-counter');

// Dynamically add 10 videos to the slideshow
for (let i = 1; i <= 10; i++) {
    const video = document.createElement('video');
    video.src = `videos/video${i}.mp4`;
    video.alt = `Video ${i}`;
    video.controls = true;
    slidesContainer.appendChild(video);
}

const slides = document.querySelectorAll('.slides video');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = 'none';
        slide.pause(); // Pause all videos
    });
    slides[index].style.display = 'block';
    slideCounter.textContent = `${index + 1} / ${slides.length}`;
}

function prevSlide(e) {
    if (e) e.stopPropagation();
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
}

function nextSlide(e) {
    if (e) e.stopPropagation();
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
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

slideshowContainer.addEventListener('click', toggleFullscreen);
closeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (slideshowContainer.classList.contains('fullscreen')) {
        toggleFullscreen();
    }
});

// Keyboard navigation for fullscreen mode
// Left/Right arrows to navigate, Escape to exit fullscreen

document.addEventListener('keydown', (e) => {
    if (slideshowContainer.classList.contains('fullscreen')) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'Escape') toggleFullscreen();
    }
});

// Show the first slide on load
showSlide(slideIndex);