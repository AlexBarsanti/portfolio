// Video Background Management
const videoElement = document.getElementById('backgroundVideo');
const videoBackground = document.getElementById('videoBackground');

// List of videos to cycle through
const videoList = [
    'videos/imax clip.MOV',
    'videos/video1.mp4',
    'videos/video2.mp4',
    'videos/video3.mp4',
    'videos/video4.mp4',
    'videos/video5.mp4',
    'videos/video6.MP4',
    'videos/video7.mp4',
    'videos/video8.mp4',
    'videos/video9.mp4',
    'videos/video10.MP4',
    'videos/video11.mp4'
];

let currentVideoIndex = 0;
let isTransitioning = false;
let videoTimer = null;

// Function to load and play next video
function loadNextVideo() {
    if (isTransitioning) return;
    
    isTransitioning = true;
    currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
    
    // Clear any existing timer
    if (videoTimer) {
        clearTimeout(videoTimer);
        videoTimer = null;
    }
    
    // Pause video to freeze it in place
    videoElement.pause();
    
    // Wait a moment, then fade to black
    setTimeout(() => {
        videoElement.style.opacity = '0';
        
        // After fade completes, switch video
        setTimeout(() => {
            videoElement.src = videoList[currentVideoIndex];
            videoElement.muted = true; // Ensure muted
            videoElement.volume = 0; // Set volume to 0
            videoElement.load();
        
        videoElement.addEventListener('loadeddata', () => {
            videoElement.play().then(() => {
                videoElement.style.opacity = '1';
                isTransitioning = false;
                
                // Apply special effect to IMAX clip
                if (videoList[currentVideoIndex].includes('imax clip')) {
                    videoElement.style.filter = 'blur(0.3px) brightness(1.03)';
                } else {
                    videoElement.style.filter = 'none';
                }
                
                // Set timer for next video based on video length
                const videoDuration = videoElement.duration;
                if (videoDuration && videoDuration > 28) {
                    // If video is longer than 28 seconds, play for 28 seconds
                    videoTimer = setTimeout(() => {
                        loadNextVideo();
                    }, 28000);
                } else if (videoDuration) {
                    // If video is shorter than 30 seconds, play full video
                    videoTimer = setTimeout(() => {
                        loadNextVideo();
                    }, videoDuration * 1000);
                } else {
                    // Fallback: 28 seconds if duration can't be determined
                    videoTimer = setTimeout(() => {
                        loadNextVideo();
                    }, 28000);
                }
            }).catch(e => {
                console.log('Play failed:', e);
                isTransitioning = false;
            });
        }, { once: true });
        
        videoElement.addEventListener('error', () => {
            console.log(`Error loading video: ${videoList[currentVideoIndex]}`);
            // Skip to next video if current one fails
            setTimeout(() => {
                isTransitioning = false;
                loadNextVideo();
            }, 1000);
        }, { once: true });
        }, 250);
    }, 200);
}

// Function to preload next video for smoother transitions
function preloadNextVideo() {
    const nextIndex = (currentVideoIndex + 1) % videoList.length;
    const nextVideo = document.createElement('video');
    nextVideo.src = videoList[nextIndex];
    nextVideo.preload = 'metadata';
}

// Initialize video background
function initVideoBackground() {
    // Set initial video with minimal preloading
    videoElement.src = videoList[currentVideoIndex];
    videoElement.muted = true; // Ensure muted
    videoElement.volume = 0; // Set volume to 0
    videoElement.preload = 'auto'; // Only preload first video
    videoElement.load();
    
    // Start playing when video is ready
    videoElement.addEventListener('loadeddata', () => {
        videoElement.play().then(() => {
            // Apply special effect to IMAX clip
            if (videoList[currentVideoIndex].includes('imax clip')) {
                videoElement.style.filter = 'brightness(1.03)';
            } else {
                videoElement.style.filter = 'none';
            }
            
            // Set timer for first video based on its length
            const videoDuration = videoElement.duration;
            if (videoDuration && videoDuration > 28) {
                videoTimer = setTimeout(() => {
                    loadNextVideo();
                }, 28000);
            } else if (videoDuration) {
                videoTimer = setTimeout(() => {
                    loadNextVideo();
                }, videoDuration * 1000);
            } else {
                videoTimer = setTimeout(() => {
                    loadNextVideo();
                }, 28000);
            }
        }).catch(e => {
            console.log('Autoplay prevented:', e);
            // If autoplay fails, try again after user interaction
            document.addEventListener('click', () => {
                videoElement.play().then(() => {
                    // Apply special effect to IMAX clip
                    if (videoList[currentVideoIndex].includes('imax clip')) {
                        videoElement.style.filter = 'brightness(1.03)';
                    } else {
                        videoElement.style.filter = 'none';
                    }
                    
                    const videoDuration = videoElement.duration;
                    if (videoDuration && videoDuration > 28) {
                        videoTimer = setTimeout(() => {
                            loadNextVideo();
                        }, 28000);
                    } else if (videoDuration) {
                        videoTimer = setTimeout(() => {
                            loadNextVideo();
                        }, videoDuration * 1000);
                    } else {
                        videoTimer = setTimeout(() => {
                            loadNextVideo();
                        }, 28000);
                    }
                });
            }, { once: true });
        });
    }, { once: true });
    
    // Handle video end - cycle to next video
    videoElement.addEventListener('ended', () => {
        loadNextVideo();
    });
    
    // Preload next video
    preloadNextVideo();
    
    // Handle video errors
    videoElement.addEventListener('error', () => {
        console.log(`Error with video: ${videoList[currentVideoIndex]}`);
        loadNextVideo();
    });
}

// Pause video when page is not visible (saves battery)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        videoElement.pause();
        if (videoTimer) {
            clearTimeout(videoTimer);
        }
    } else {
        videoElement.play().catch(e => console.log('Resume play failed:', e));
        // Restart timer when page becomes visible again
        const videoDuration = videoElement.duration;
        if (videoDuration && videoDuration > 28) {
            videoTimer = setTimeout(() => {
                loadNextVideo();
            }, 28000);
        } else if (videoDuration) {
            videoTimer = setTimeout(() => {
                loadNextVideo();
            }, videoDuration * 1000);
        } else {
            videoTimer = setTimeout(() => {
                loadNextVideo();
            }, 28000);
        }
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Video will automatically adjust due to CSS
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initVideoBackground();
});

// Fallback: if video fails to load, show a static background
setTimeout(() => {
    if (videoElement && videoElement.readyState === 0) {
        console.log('Video failed to load, applying fallback background');
        if (videoBackground) {
            videoBackground.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
        }
    }
}, 5000);

// Slideshow functionality for bottom boxes - disabled for infinite scroll animation
// The animation is now handled by CSS

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuBackdrop = document.getElementById('menuBackdrop');
    
    if (hamburgerMenu && menuOverlay && menuBackdrop) {
        const toggleMenu = () => {
            menuOverlay.classList.toggle('active');
            menuBackdrop.classList.toggle('active');
        };
        
        hamburgerMenu.addEventListener('click', toggleMenu);
        
        // Close menu when clicking on backdrop
        menuBackdrop.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
            menuBackdrop.classList.remove('active');
        });
        
        // Close menu when clicking on a menu link
        const menuLinks = menuOverlay.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuOverlay.classList.remove('active');
                menuBackdrop.classList.remove('active');
            });
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
                menuOverlay.classList.remove('active');
                menuBackdrop.classList.remove('active');
            }
        });
    }
});

// Fullscreen Video Feature
document.addEventListener('DOMContentLoaded', () => {
    const featureVideo = document.getElementById('featureVideo');
    const fullscreenModal = document.getElementById('fullscreenModal');
    const fullscreenVideo = document.getElementById('fullscreenVideo');
    const closeFullscreen = document.getElementById('closeFullscreen');
    const thumbnailVideo = featureVideo ? featureVideo.querySelector('video') : null;
    
    if (featureVideo && fullscreenModal && fullscreenVideo && thumbnailVideo) {
        // Open fullscreen on click
        featureVideo.addEventListener('click', () => {
            fullscreenVideo.src = thumbnailVideo.src;
            fullscreenVideo.muted = false;
            fullscreenModal.classList.add('active');
            fullscreenVideo.play().catch(e => {
                console.log('Fullscreen video play failed:', e);
            });
        });
        
        // Close fullscreen
        const closeModal = () => {
            fullscreenModal.classList.remove('active');
            fullscreenVideo.pause();
            fullscreenVideo.currentTime = 0;
        };
        
        closeFullscreen.addEventListener('click', closeModal);
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && fullscreenModal.classList.contains('active')) {
                closeModal();
            }
        });
        
        // Close when clicking outside video (on modal backdrop)
        fullscreenModal.addEventListener('click', (e) => {
            if (e.target === fullscreenModal) {
                closeModal();
            }
        });
    }
});

// Contact Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Create contact modal if it doesn't exist
    let contactModal = document.getElementById('contactModal');
    if (!contactModal) {
        contactModal = document.createElement('div');
        contactModal.id = 'contactModal';
        contactModal.className = 'contact-modal';
        contactModal.innerHTML = `
            <div class="contact-menu-bar">
                <button class="contact-close" aria-label="Close contact modal">×</button>
                <p class="contact-info">Freelance & inquiries: <a href="mailto:alexbarsanti5@gmail.com">alexbarsanti5@gmail.com</a></p>
            </div>
        `;
        document.body.appendChild(contactModal);
    }

    const contactLinks = document.querySelectorAll('a[href="contact.html"]');
    const closeButton = contactModal.querySelector('.contact-close');

    const openContactModal = (e) => {
        e.preventDefault();
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeContactModal = () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Add click listeners to all contact links
    contactLinks.forEach(link => {
        link.addEventListener('click', openContactModal);
    });

    // Close button
    if (closeButton) {
        closeButton.addEventListener('click', closeContactModal);
    }

    // Close on backdrop click
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal.classList.contains('active')) {
            closeContactModal();
        }
    });
});
