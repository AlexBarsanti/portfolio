let slideIndex = 0;
const slidesContainer = document.querySelector('.slides');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slideshowContainer = document.querySelector('.slideshow-container');
const closeButton = document.querySelector('.close-button');
const slideCounter = document.querySelector('.slide-counter');
const descriptionBox = document.querySelector('.video-description');

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

    // Show description for the first, second, and third videos
    if (index === 0) {
        descriptionBox.textContent = "This reel is a compilation of my work as a color grader on DaVinci Resolve, from student films to music videos.";
        descriptionBox.style.display = 'block';
    } else if (index === 1) {
        descriptionBox.textContent = "This reel is a compilation of my work as a visual effects artist. 3D motion graphics were done on Blender and AutodeskMaya, and compositing was done on Adobe After Effects. I learned the importance of industry-standard quality at both CalArts and USC.";
        descriptionBox.style.display = 'block';
    } else if (index === 2) {
        descriptionBox.textContent = "Monke was my first year film in the Experimental Animation program at CalArts. Learning 3D visual effects in the building that laid the foundations for Pixar, and many other animation giants, was an extremely informative experience.";
        descriptionBox.style.display = 'block';
    } else if (index === 3 || index === 4) {
        descriptionBox.textContent = "CalArts Experimental Animation";
        descriptionBox.style.display = 'block';
    } else if (index === 5 || index === 6) {
        descriptionBox.textContent = "The first 3 weeks at CalArts were dedicated to building our skills in analog animation. This was my first experience with traditional, hand-drawn, frames.";
        descriptionBox.style.display = 'block';
    } else if (index === 7 || index === 8 || index === 9) {
        descriptionBox.textContent = "CalArts Experimental Animation";
        descriptionBox.style.display = 'block';
    } else {
        descriptionBox.style.display = 'none';
    }
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