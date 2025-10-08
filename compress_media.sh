#!/bin/bash

# Media Compression Script for Portfolio Website
# This script compresses images and videos to optimize website loading speed

echo "=================================="
echo "Portfolio Media Compression Script"
echo "=================================="
echo ""

# Check if required tools are installed
check_dependencies() {
    echo "Checking dependencies..."
    
    if ! command -v convert &> /dev/null; then
        echo "⚠️  ImageMagick not found. Install with: brew install imagemagick"
        MISSING_DEPS=1
    else
        echo "✓ ImageMagick installed"
    fi
    
    if ! command -v ffmpeg &> /dev/null; then
        echo "⚠️  FFmpeg not found. Install with: brew install ffmpeg"
        MISSING_DEPS=1
    else
        echo "✓ FFmpeg installed"
    fi
    
    if [ "$MISSING_DEPS" = "1" ]; then
        echo ""
        echo "Please install missing dependencies and run again."
        exit 1
    fi
    
    echo ""
}

# Create backup directory
create_backup() {
    BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
    echo "Creating backup in: $BACKUP_DIR"
    mkdir -p "$BACKUP_DIR"
    echo ""
}

# Compress images in a directory
compress_images() {
    DIR=$1
    QUALITY=${2:-85}
    
    if [ ! -d "$DIR" ]; then
        echo "Directory $DIR not found, skipping..."
        return
    fi
    
    echo "Compressing images in: $DIR (Quality: $QUALITY)"
    
    # Count files
    COUNT=$(find "$DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.JPG" -o -iname "*.JPEG" -o -iname "*.png" -o -iname "*.PNG" \) | wc -l)
    echo "Found $COUNT images to compress"
    
    if [ $COUNT -eq 0 ]; then
        echo "No images found in $DIR"
        return
    fi
    
    # Create backup
    echo "Backing up original files..."
    cp -r "$DIR" "$BACKUP_DIR/"
    
    PROCESSED=0
    TOTAL_BEFORE=0
    TOTAL_AFTER=0
    
    # Process each image
    find "$DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.JPG" -o -iname "*.JPEG" -o -iname "*.png" -o -iname "*.PNG" \) | while read img; do
        PROCESSED=$((PROCESSED + 1))
        
        # Get original size
        BEFORE=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        
        # Create temp file
        TEMP="${img}.tmp"
        
        # Compress
        convert "$img" -quality $QUALITY -strip "$TEMP" 2>/dev/null
        
        if [ $? -eq 0 ]; then
            # Get new size
            AFTER=$(stat -f%z "$TEMP" 2>/dev/null || stat -c%s "$TEMP" 2>/dev/null)
            
            # Only replace if smaller
            if [ $AFTER -lt $BEFORE ]; then
                mv "$TEMP" "$img"
                SAVED=$((BEFORE - AFTER))
                PERCENT=$((100 * SAVED / BEFORE))
                echo "  ✓ $(basename "$img"): $(numfmt --to=iec-i --suffix=B $BEFORE) → $(numfmt --to=iec-i --suffix=B $AFTER) (saved ${PERCENT}%)"
            else
                rm "$TEMP"
                echo "  → $(basename "$img"): Already optimized"
            fi
        else
            rm -f "$TEMP"
            echo "  ✗ Failed to compress: $(basename "$img")"
        fi
    done
    
    echo ""
}

# Compress videos
compress_videos() {
    if [ ! -d "videos" ]; then
        echo "Videos directory not found, skipping..."
        return
    fi
    
    echo "Compressing videos in: videos/"
    
    COUNT=$(find videos -type f \( -iname "*.mp4" -o -iname "*.MP4" \) | wc -l)
    echo "Found $COUNT videos to compress"
    
    if [ $COUNT -eq 0 ]; then
        echo "No videos found"
        return
    fi
    
    # Create backup
    echo "Backing up original videos..."
    cp -r "videos" "$BACKUP_DIR/"
    
    find videos -type f \( -iname "*.mp4" -o -iname "*.MP4" \) | while read video; do
        echo ""
        echo "Processing: $(basename "$video")"
        
        # Get original size
        BEFORE=$(stat -f%z "$video" 2>/dev/null || stat -c%s "$video" 2>/dev/null)
        echo "  Original size: $(numfmt --to=iec-i --suffix=B $BEFORE)"
        
        # Create temp file
        TEMP="${video}.tmp.mp4"
        
        # Compress with H.264, optimized for web
        ffmpeg -i "$video" \
               -c:v libx264 \
               -preset slow \
               -crf 23 \
               -c:a aac \
               -b:a 128k \
               -movflags +faststart \
               -y "$TEMP" \
               -hide_banner -loglevel error
        
        if [ $? -eq 0 ]; then
            # Get new size
            AFTER=$(stat -f%z "$TEMP" 2>/dev/null || stat -c%s "$TEMP" 2>/dev/null)
            
            if [ $AFTER -lt $BEFORE ]; then
                mv "$TEMP" "$video"
                SAVED=$((BEFORE - AFTER))
                PERCENT=$((100 * SAVED / BEFORE))
                echo "  ✓ Compressed: $(numfmt --to=iec-i --suffix=B $AFTER) (saved ${PERCENT}%)"
            else
                rm "$TEMP"
                echo "  → Already optimized (kept original)"
            fi
        else
            rm -f "$TEMP"
            echo "  ✗ Failed to compress"
        fi
    done
    
    echo ""
}

# Show summary
show_summary() {
    echo "=================================="
    echo "Compression Complete!"
    echo "=================================="
    echo ""
    echo "Backups saved in: $BACKUP_DIR"
    echo ""
    echo "Current directory sizes:"
    echo "  Videos:      $(du -sh videos 2>/dev/null | cut -f1)"
    echo "  Photos:      $(du -sh photos 2>/dev/null | cut -f1)"
    echo "  Color Work:  $(du -sh 'color work' 2>/dev/null | cut -f1)"
    echo "  Commissioned: $(du -sh 'Commissioned Color Work' 2>/dev/null | cut -f1)"
    echo ""
    echo "Next steps:"
    echo "  1. Test your website locally"
    echo "  2. If everything works, upload the compressed files"
    echo "  3. Delete backup folder when you're confident"
    echo ""
}

# Main menu
show_menu() {
    echo "What would you like to compress?"
    echo ""
    echo "1) Everything (recommended)"
    echo "2) Only images"
    echo "3) Only videos"
    echo "4) Specific folder"
    echo "5) Exit"
    echo ""
    read -p "Choose option (1-5): " choice
    
    case $choice in
        1)
            create_backup
            compress_videos
            compress_images "photos" 85
            compress_images "color work" 85
            compress_images "Commissioned Color Work" 85
            compress_images "graphic-design" 85
            compress_images "images" 85
            show_summary
            ;;
        2)
            create_backup
            compress_images "photos" 85
            compress_images "color work" 85
            compress_images "Commissioned Color Work" 85
            compress_images "graphic-design" 85
            compress_images "images" 85
            show_summary
            ;;
        3)
            create_backup
            compress_videos
            show_summary
            ;;
        4)
            read -p "Enter folder name: " folder
            create_backup
            compress_images "$folder" 85
            show_summary
            ;;
        5)
            echo "Exiting..."
            exit 0
            ;;
        *)
            echo "Invalid option"
            exit 1
            ;;
    esac
}

# Run the script
check_dependencies
show_menu
