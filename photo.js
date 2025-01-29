class Slideshow {
    constructor(container, images) {
        this.slideIndex = 0;
        this.container = container;
        this.slidesContainer = container.querySelector('.slides');
        this.prevButton = container.querySelector('.prev');
        this.nextButton = container.querySelector('.next');
        this.closeButton = container.querySelector('.close-button');
        this.slideCounter = container.querySelector('.slide-counter');
        
        // Add images
        images.forEach(imagePath => {
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `Photo ${imagePath}`;
            this.slidesContainer.appendChild(img);
        });
        
        this.slides = this.slidesContainer.querySelectorAll('img');
        this.setupEventListeners();
        this.showSlide(0);
    }
  
    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.slides[index].classList.add('active');
        this.slideCounter.textContent = `${index + 1} / ${this.slides.length}`;
    }
  
    prevSlide() {
        this.slideIndex = (this.slideIndex - 1 + this.slides.length) % this.slides.length;
        this.showSlide(this.slideIndex);
    }
  
    nextSlide() {
        this.slideIndex = (this.slideIndex + 1) % this.slides.length;
        this.showSlide(this.slideIndex);
    }
  
    toggleFullscreen() {
        this.container.classList.toggle('fullscreen');
        document.body.style.overflow = this.container.classList.contains('fullscreen') ? 'hidden' : '';
    }
  
    setupEventListeners() {
        this.prevButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.prevSlide();
        });
  
        this.nextButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.nextSlide();
        });
  
        this.container.addEventListener('click', () => this.toggleFullscreen());
        
        this.closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.container.classList.contains('fullscreen')) {
                this.toggleFullscreen();
            }
        });
    }
}
  
// Generate image paths
const photographyImages = Array.from({length: 115}, (_, i) => `photos/photo${i + 1}.jpg`);
const colorizationImages = Array.from({length: 20}, (_, i) => `commissioned color work/Jay${i + 1}.jpg`);
const otherColorImages = Array.from({length: 14}, (_, i) => `color work/Color${i + 1}.jpg`);

// Initialize slideshows
const slideshowContainers = document.querySelectorAll('.slideshow-container');
new Slideshow(slideshowContainers[0], photographyImages);
new Slideshow(slideshowContainers[1], colorizationImages);
new Slideshow(slideshowContainers[2], otherColorImages);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const fullscreenSlideshow = Array.from(slideshowContainers).find(container => 
        container.classList.contains('fullscreen')
    );
    
    if (fullscreenSlideshow) {
        const slideshow = fullscreenSlideshow.__slideshow;
        if (e.key === 'ArrowLeft') slideshow.prevSlide();
        if (e.key === 'ArrowRight') slideshow.nextSlide();
        if (e.key === 'Escape') slideshow.toggleFullscreen();
    }
});