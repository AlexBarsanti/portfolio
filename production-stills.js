class ProductionStillsSlideshow {
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
        
        // Add all images to grid layout
        images.forEach((imagePath, index) => {
            const img = document.createElement('img');
            
            // Create thumbnail path
            const thumbnailPath = this.getThumbnailPath(imagePath);
            
            // Always load thumbnail immediately
            img.src = thumbnailPath;
            img.dataset.fullSrc = imagePath; // Store full resolution path
            img.alt = `Production Still ${index + 1}`;
            img.loading = 'lazy';
            
            // Add blur effect for loading state
            img.style.filter = 'blur(5px)';
            img.style.transition = 'filter 0.3s ease';
            
            // Remove blur when thumbnail loads
            img.onload = () => {
                img.style.filter = 'none';
                this.loadedImages.add(index);
            };
            
            // Handle click to open fullscreen
            img.addEventListener('click', () => {
                this.openFullscreen(index);
            });
            
            // Show all images in grid
            img.style.display = 'block';
            
            this.slidesContainer.appendChild(img);
        });
        
        this.setupEventListeners();
        this.updateSlideCounter();
    }
    
    getThumbnailPath(imagePath) {
        // For now, use the same image path
        // In production, you might want to create actual thumbnails
        return imagePath;
    }
    
    setupEventListeners() {
        this.prevButton.addEventListener('click', () => {
            this.previousSlide();
        });
        
        this.nextButton.addEventListener('click', () => {
            this.nextSlide();
        });
        
        this.closeButton.addEventListener('click', () => {
            this.closeFullscreen();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.container.classList.contains('fullscreen')) {
                switch(e.key) {
                    case 'ArrowLeft':
                        this.previousSlide();
                        break;
                    case 'ArrowRight':
                        this.nextSlide();
                        break;
                    case 'Escape':
                        this.closeFullscreen();
                        break;
                }
            }
        });
        
        // Touch/swipe support for mobile
        let startX = 0;
        let startY = 0;
        
        this.slidesContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        this.slidesContainer.addEventListener('touchend', (e) => {
            if (!this.container.classList.contains('fullscreen')) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only trigger if horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        });
    }
    
    openFullscreen(index) {
        this.slideIndex = index;
        this.container.classList.add('fullscreen');
        document.body.style.overflow = 'hidden';
        
        // Load full resolution image if not already loaded
        this.loadFullResolution(index);
        
        this.updateSlideDisplay();
        this.updateSlideCounter();
    }
    
    closeFullscreen() {
        this.container.classList.remove('fullscreen');
        document.body.style.overflow = 'auto';
        
        // Reset all image styles to their original state
        Array.from(this.slidesContainer.children).forEach(img => {
            img.style.display = '';
            img.style.margin = '';
        });
    }
    
    nextSlide() {
        this.slideIndex = (this.slideIndex + 1) % this.images.length;
        this.loadFullResolution(this.slideIndex);
        this.updateSlideDisplay();
        this.updateSlideCounter();
    }
    
    previousSlide() {
        this.slideIndex = (this.slideIndex - 1 + this.images.length) % this.images.length;
        this.loadFullResolution(this.slideIndex);
        this.updateSlideDisplay();
        this.updateSlideCounter();
    }
    
    loadFullResolution(index) {
        if (this.loadedFullRes.has(index)) return;
        
        const img = this.slidesContainer.children[index];
        if (img && img.dataset.fullSrc) {
            const fullImg = new Image();
            fullImg.onload = () => {
                img.src = img.dataset.fullSrc;
                this.loadedFullRes.add(index);
            };
            fullImg.src = img.dataset.fullSrc;
        }
    }
    
    updateSlideDisplay() {
        // In grid mode, all images are always visible
        // Only hide/show images when in fullscreen mode
        if (this.container.classList.contains('fullscreen')) {
            // Hide all images
            Array.from(this.slidesContainer.children).forEach(img => {
                img.style.display = 'none';
            });
            
            // Show current image
            if (this.slidesContainer.children[this.slideIndex]) {
                this.slidesContainer.children[this.slideIndex].style.display = 'block';
            }
        } else {
            // In grid mode, ensure all images are visible
            Array.from(this.slidesContainer.children).forEach(img => {
                img.style.display = 'block';
            });
        }
    }
    
    updateSlideCounter() {
        if (this.slideCounter) {
            this.slideCounter.textContent = `${this.slideIndex + 1} / ${this.images.length}`;
        }
    }
}

// Initialize the slideshow when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Production stills images from behind-the-scenes photography
    const productionStillsImages = [
        'production-stills-web/478D16D2-E0D2-47E7-AF97-0B85A2A3CEC2.jpg',
        'production-stills-web/ALPACINO_SBP08952.jpg',
        'production-stills-web/IMG_0012.jpg',
        'production-stills-web/IMG_0173.jpg',
        'production-stills-web/IMG_0174.jpg',
        'production-stills-web/IMG_0345.jpg',
        'production-stills-web/IMG_0346.jpg',
        'production-stills-web/IMG_0972.jpg',
        'production-stills-web/IMG_1022.jpg',
        'production-stills-web/IMG_1024.jpg',
        'production-stills-web/IMG_1189.jpg',
        'production-stills-web/IMG_1418.jpg',
        'production-stills-web/IMG_1557.jpg',
        'production-stills-web/IMG_1574.jpg',
        'production-stills-web/IMG_2632.jpg',
        'production-stills-web/IMG_3718.jpg',
        'production-stills-web/IMG_3840.jpg',
        'production-stills-web/IMG_3851.jpg',
        'production-stills-web/IMG_3868.jpg',
        'production-stills-web/IMG_3927.jpg',
        'production-stills-web/IMG_3964.jpg',
        'production-stills-web/IMG_4006.jpg',
        'production-stills-web/IMG_5796.jpg',
        'production-stills-web/IMG_6862.jpg',
        'production-stills-web/IMG_7012.jpg',
        'production-stills-web/IMG_7235.jpg',
        'production-stills-web/IMG_7782.jpg',
        'production-stills-web/IMG_7870.jpg',
        'production-stills-web/IMG_8073.jpg',
        'production-stills-web/IMG_8436.jpg',
        'production-stills-web/IMG_8615.jpg',
        'production-stills-web/IMG_8621.jpg',
        'production-stills-web/IMG_8622.jpg',
        'production-stills-web/IMG_8730.jpg',
        'production-stills-web/IMG_8765.jpg',
        'production-stills-web/IMG_8779.jpg',
        'production-stills-web/IMG_9087.jpg',
        'production-stills-web/IMG_9123.jpg',
        'production-stills-web/IMG_9129.jpg',
        'production-stills-web/IMG_9488.jpg',
        'production-stills-web/IMG_9572.jpg',
        'production-stills-web/IMG_9606.jpg',
        'production-stills-web/IMG_9612.jpg',
        'production-stills-web/IMG_9613.jpg',
        'production-stills-web/IMG_9615.jpg',
        'production-stills-web/IMG_9674.jpg',
        'production-stills-web/IMG_9734.jpg',
        'production-stills-web/IMG_9852.jpg'
    ];
    
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        new ProductionStillsSlideshow(slideshowContainer, productionStillsImages);
    }
});
