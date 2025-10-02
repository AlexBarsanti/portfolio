// Video Background Management
const videoElement = document.getElementById('backgroundVideo');
const videoBackground = document.getElementById('videoBackground');

// List of videos to cycle through
const videoList = [
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
    
    // Create fade out effect
    videoElement.style.opacity = '0';
    
    setTimeout(() => {
        videoElement.src = videoList[currentVideoIndex];
        videoElement.muted = true; // Ensure muted
        videoElement.volume = 0; // Set volume to 0
        videoElement.load();
        
        videoElement.addEventListener('loadeddata', () => {
            videoElement.play().then(() => {
                videoElement.style.opacity = '1';
                isTransitioning = false;
                
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
    }, 500);
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
    // Set initial video
    videoElement.src = videoList[currentVideoIndex];
    videoElement.muted = true; // Ensure muted
    videoElement.volume = 0; // Set volume to 0
    videoElement.load();
    
    // Start playing when video is ready
    videoElement.addEventListener('loadeddata', () => {
        videoElement.play().then(() => {
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
document.addEventListener('DOMContentLoaded', initVideoBackground);

// Fallback: if video fails to load, show a static background
setTimeout(() => {
    if (videoElement.readyState === 0) {
        console.log('Video failed to load, applying fallback background');
        videoBackground.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
    }
}, 5000);
