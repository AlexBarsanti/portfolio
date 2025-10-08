// Use the optimized Slideshow class from image.js
class Slideshow {
    constructor(container, images) {
        this.slideIndex = 0;
        this.container = container;
        this.slidesContainer = container.querySelector('.slides');
        this.prevButton = container.querySelector('.prev');
        this.nextButton = container.querySelector('.next');
        this.closeButton = container.querySelector('.close-button');
        this.slideCounter = container.querySelector('.slide-counter');
        this.images = images;
        this.loadedImages = new Set();
        this.loadedFullRes = new Set();
        
        // Add images with progressive loading (thumbnails first)
        images.forEach((imagePath, index) => {
            const img = document.createElement('img');
            
            // Create thumbnail path
            const thumbnailPath = this.getThumbnailPath(imagePath);
            
            // Always load thumbnail immediately
            img.src = thumbnailPath;
            img.dataset.fullSrc = imagePath; // Store full resolution path
            img.alt = `Graphic Design ${index + 1}`;
            img.loading = 'lazy';
            
            // Add blur effect for loading state
            img.style.filter = 'blur(5px)';
            img.style.transition = 'filter 0.3s ease';
            
            this.slidesContainer.appendChild(img);
            this.loadedImages.add(index);
        });
        
        this.slides = this.slidesContainer.querySelectorAll('img');
        this.setupEventListeners();
        this.showSlide(0);
        
        // Preload first few full-resolution images
        this.preloadFullResImages();
    }
    
    getThumbnailPath(imagePath) {
        // Convert image path to thumbnail path
        // e.g., "graphic-design/gd1.JPEG" → "thumbnails/graphic-design/gd1.JPEG"
        return imagePath.replace(/^([^\/]+)/, 'thumbnails/$1');
    }
    
    preloadFullResImages() {
        // Preload first 3 full-resolution images
        for (let i = 0; i < Math.min(3, this.images.length); i++) {
            this.loadFullResImage(i);
        }
    }
    
    loadFullResImage(index) {
        if (this.loadedFullRes.has(index)) return;
        
        const img = this.slides[index];
        const fullSrc = img.dataset.fullSrc;
        
        if (!fullSrc) return;
        
        // Create a new image element to preload
        const preloadImg = new Image();
        preloadImg.onload = () => {
            // Once loaded, replace the thumbnail with full resolution
            img.src = fullSrc;
            img.style.filter = 'blur(0px)';
            this.loadedFullRes.add(index);
        };
        preloadImg.onerror = () => {
            console.warn(`Failed to load full resolution: ${fullSrc}`);
        };
        preloadImg.src = fullSrc;
    }

    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.slides[index].classList.add('active');
        this.slideCounter.textContent = `${index + 1} / ${this.slides.length}`;
        
        // Load full resolution for current, next, and previous images
        this.loadFullResImage(index);
        this.loadFullResImage((index + 1) % this.slides.length); // Next
        this.loadFullResImage((index - 1 + this.slides.length) % this.slides.length); // Previous
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
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.container.classList.contains('fullscreen')) {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
                if (e.key === 'Escape') this.toggleFullscreen();
            }
        });
    }
}

// Initialize the graphic design slideshow
const gdImages = [
    'graphic-design/gd1.JPEG',
    'graphic-design/gd2.PNG',
    'graphic-design/gd3.JPG',
    'graphic-design/gd4.JPG',
    'graphic-design/gd5.JPG',
    'graphic-design/gd6.JPG',
    'graphic-design/gd7.jpg'
];

// Create the slideshow
const slideshowContainer = document.querySelector('.slideshow-container');
const graphicDesignSlideshow = new Slideshow(slideshowContainer, gdImages);