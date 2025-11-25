#!/bin/bash
# Commands to track all files larger than 24MB with Git LFS

cd /Users/alexbarsanti/Downloads/myportfolio

# Track individual large files
git lfs track "reel.mp4"
git lfs track "finalreel.mp4"
git lfs track "production-stills-web/IMG_9826.MOV"
git lfs track "production-stills-web/IMG_8300.MOV"
git lfs track "production-stills-web/IMG_2572.MOV"
git lfs track "videos/vfx/animation/video7.mp4"
git lfs track "videos/vfx/animation/video3.mp4"
git lfs track "videos/vfx/Motion Graphics/snowsponsors.mp4"
git lfs track "videos/editing/AlexFrisbeeFilm.mp4"
git lfs track "videos/editing/CinematicCoverage.mp4"
git lfs track "videos/editing/snowsponsors.mp4"
git lfs track "videos/editing/IMAX Edit HD.mp4"
git lfs track "videos/youtube_njSXFd-QP6E_1920x1080_h264.mp4"
git lfs track "snowsponsors.mp4"
git lfs track "IMAX Edit HD.mp4"
git lfs track "snowsponsors (1).mp4"
git lfs track "production stills /IMG_9826.MOV"
git lfs track "production stills /IMG_8300.MOV"
git lfs track "production stills /IMG_2572.MOV"

echo "All large files are now tracked with Git LFS!"

