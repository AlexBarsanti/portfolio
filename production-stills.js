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
        
        // Add images with progressive loading (thumbnails first)
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
        // Hide all images
        Array.from(this.slidesContainer.children).forEach(img => {
            img.style.display = 'none';
        });
        
        // Show current image
        if (this.slidesContainer.children[this.slideIndex]) {
            this.slidesContainer.children[this.slideIndex].style.display = 'block';
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
    // Define your production stills images here
    // You can add more images to this array
    const productionStillsImages = [
        'photos/photo1.jpg',
        'photos/photo2.jpg',
        'photos/photo3.jpg',
        'photos/photo4.jpg',
        'photos/photo5.jpg',
        'photos/photo6.jpg',
        'photos/photo7.jpg',
        'photos/photo8.jpg',
        'photos/photo9.jpg',
        'photos/photo10.jpg',
        'photos/photo11.jpg',
        'photos/photo12.jpg',
        'photos/photo13.jpg',
        'photos/photo14.jpg',
        'photos/photo15.jpg',
        'photos/photo16.jpg',
        'photos/photo17.jpg',
        'photos/photo18.jpg',
        'photos/photo19.jpg',
        'photos/photo20.jpg'
    ];
    
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        new ProductionStillsSlideshow(slideshowContainer, productionStillsImages);
    }
});
