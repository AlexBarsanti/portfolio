// Video Grid Management
const videoGrid = document.getElementById('videoGrid');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close-modal');

// Video data with titles and descriptions
const videoData = [
    {
        src: 'videos/video1.mp4',
        title: "COLOR GRADING REEL",
        description: "This reel is a compilation of my work as a color grader on DaVinci Resolve, from student films to music videos."
    },
    {
        src: 'videos/video2.mp4',
        title: "VFX/COMPOSITING REEL",
        description: "This reel is a compilation of my work as a visual effects artist. 3D motion graphics were done on Blender and AutodeskMaya, and compositing was done on Adobe After Effects. I learned the importance of industry-standard quality at both CalArts and USC."
    },
    {
        src: 'videos/video3.mp4',
        title: "CalArts First Year Film",
        description: "Monke was my first year film in the Experimental Animation program at CalArts. Learning 3D visual effects in the building that laid the foundations for Pixar, and many other animation giants, was an extremely informative experience."
    },
    {
        src: 'videos/video4.mp4',
        title: "Spotify Canvas",
        description: "CalArts Experimental Animation"
    },
    {
        src: 'videos/video5.mp4',
        title: "CalArts Project",
        description: "CalArts Experimental Animation"
    },
    {
        src: 'videos/video6.MP4',
        title: "CalArts Project",
        description: "The first 3 weeks at CalArts were dedicated to building our skills in analog animation. This was my first experience with traditional, hand-drawn, frames."
    },
    {
        src: 'videos/video7.mp4',
        title: "CalArts Project",
        description: "The first 3 weeks at CalArts were dedicated to building our skills in analog animation. This was my first experience with traditional, hand-drawn, frames."
    },
    {
        src: 'videos/video8.mp4',
        title: "CalArts Project",
        description: "CalArts Experimental Animation"
    },
    {
        src: 'videos/video9.mp4',
        title: "CalArts Project",
        description: "CalArts Experimental Animation"
    },
    {
        src: 'videos/video10.MP4',
        title: "Pet Store Motion Graphics",
        description: "CalArts Experimental Animation"
    },
    {
        src: 'videos/video11.mp4',
        title: "Falling Apart Motion Graphics",
        description: "Tiitlecard created for USC production student Fletcher Simon in July 2025."
    }
];

// Create video grid
function createVideoGrid() {
    videoData.forEach((video, index) => {
        const videoSquare = document.createElement('div');
        videoSquare.className = 'video-square';
        videoSquare.dataset.videoIndex = index;

        // Create video element for thumbnail
        const videoElement = document.createElement('video');
        videoElement.src = video.src;
        videoElement.muted = true;
        videoElement.preload = 'metadata';
        videoElement.addEventListener('loadedmetadata', () => {
            // Seek to a specific time for thumbnail (e.g., 2 seconds)
            videoElement.currentTime = Math.min(2, videoElement.duration * 0.1);
        });

        // Video title
        const videoTitle = document.createElement('div');
        videoTitle.className = 'video-title';
        videoTitle.textContent = video.title;

        // Play button
        const playButton = document.createElement('button');
        playButton.className = 'play-button';
        playButton.innerHTML = '';

        // Assemble the square
        videoSquare.appendChild(videoElement);
        videoSquare.appendChild(videoTitle);
        videoSquare.appendChild(playButton);

        // Add click event
        videoSquare.addEventListener('click', () => openVideoModal(index));

        videoGrid.appendChild(videoSquare);
    });
}

// Open video modal
function openVideoModal(videoIndex) {
    const video = videoData[videoIndex];
    
    modalVideo.src = video.src;
    modalDescription.textContent = video.description;
    
    videoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Play video when modal opens
    modalVideo.play().catch(e => {
        console.log('Autoplay prevented:', e);
    });
}

// Close video modal
function closeVideoModal() {
    videoModal.style.display = 'none';
        document.body.style.overflow = '';
    modalVideo.pause();
    modalVideo.currentTime = 0;
}

// Event listeners
closeModal.addEventListener('click', closeVideoModal);

// Close modal when clicking outside video
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeVideoModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.style.display === 'block') {
        closeVideoModal();
    }
});

// Pause video when modal is closed
modalVideo.addEventListener('ended', () => {
    // Optional: Auto-close modal when video ends
    // closeVideoModal();
});

// Initialize the grid when page loads
document.addEventListener('DOMContentLoaded', createVideoGrid);

// Handle window resize
window.addEventListener('resize', () => {
    // Grid will automatically adjust due to CSS
});
