#!/bin/bash

# Thumbnail Generation Script for Portfolio Images
# Creates low-resolution thumbnails for fast loading

echo "=================================="
echo "Portfolio Thumbnail Generator"
echo "=================================="
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Install with: brew install imagemagick"
    exit 1
fi

echo "✅ ImageMagick found"
echo ""

# Create thumbnails directory structure
create_directories() {
    echo "Creating thumbnail directories..."
    
    mkdir -p "thumbnails/photos"
    mkdir -p "thumbnails/color work"
    mkdir -p "thumbnails/Commissioned Color Work"
    mkdir -p "thumbnails/graphic-design"
    mkdir -p "thumbnails/images"
    
    echo "✅ Thumbnail directories created"
    echo ""
}

# Generate thumbnails for a directory
generate_thumbnails() {
    SOURCE_DIR=$1
    THUMB_DIR=$2
    SIZE=${3:-300}
    QUALITY=${4:-60}
    
    if [ ! -d "$SOURCE_DIR" ]; then
        echo "⚠️  Directory $SOURCE_DIR not found, skipping..."
        return
    fi
    
    echo "Generating thumbnails for: $SOURCE_DIR"
    echo "  Target size: ${SIZE}x${SIZE}px"
    echo "  Quality: $QUALITY%"
    
    # Count files
    COUNT=$(find "$SOURCE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.JPG" -o -iname "*.JPEG" -o -iname "*.png" -o -iname "*.PNG" \) | wc -l)
    echo "  Found $COUNT images"
    
    if [ $COUNT -eq 0 ]; then
        echo "  No images found"
        return
    fi
    
    PROCESSED=0
    TOTAL_BEFORE=0
    TOTAL_AFTER=0
    
    # Process each image
    find "$SOURCE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.JPG" -o -iname "*.JPEG" -o -iname "*.png" -o -iname "*.PNG" \) | while read img; do
        PROCESSED=$((PROCESSED + 1))
        
        # Get relative path
        REL_PATH="${img#$SOURCE_DIR/}"
        THUMB_PATH="$THUMB_DIR/$REL_PATH"
        
        # Create directory structure for thumbnail
        THUMB_DIR_PATH=$(dirname "$THUMB_PATH")
        mkdir -p "$THUMB_DIR_PATH"
        
        # Get original size
        BEFORE=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        
        # Generate thumbnail
        convert "$img" \
                -resize "${SIZE}x${SIZE}^" \
                -gravity center \
                -extent "${SIZE}x${SIZE}" \
                -quality $QUALITY \
                -strip \
                -interlace Plane \
                "$THUMB_PATH" 2>/dev/null
        
        if [ $? -eq 0 ]; then
            # Get new size
            AFTER=$(stat -f%z "$THUMB_PATH" 2>/dev/null || stat -c%s "$THUMB_PATH" 2>/dev/null)
            
            SAVED=$((BEFORE - AFTER))
            PERCENT=$((100 * SAVED / BEFORE))
            
            echo "  ✓ $(basename "$img"): $(numfmt --to=iec-i --suffix=B $BEFORE) → $(numfmt --to=iec-i --suffix=B $AFTER) (saved ${PERCENT}%)"
        else
            echo "  ✗ Failed to create thumbnail: $(basename "$img")"
        fi
    done
    
    echo "  ✅ Completed $SOURCE_DIR"
    echo ""
}

# Show usage statistics
show_stats() {
    echo "=================================="
    echo "Thumbnail Generation Complete!"
    echo "=================================="
    echo ""
    
    if [ -d "thumbnails" ]; then
        echo "Thumbnail directory sizes:"
        find thumbnails -type d -mindepth 1 | while read dir; do
            SIZE=$(du -sh "$dir" 2>/dev/null | cut -f1)
            echo "  $(basename "$dir"): $SIZE"
        done
        
        TOTAL_THUMB_SIZE=$(du -sh thumbnails 2>/dev/null | cut -f1)
        echo ""
        echo "Total thumbnail size: $TOTAL_THUMB_SIZE"
        echo ""
        
        echo "Original vs Thumbnail comparison:"
        find . -maxdepth 1 -type d -name "photos" -o -name "color work" -o -name "Commissioned Color Work" -o -name "graphic-design" -o -name "images" | while read dir; do
            if [ -d "$dir" ] && [ -d "thumbnails/$(basename "$dir")" ]; then
                ORIG_SIZE=$(du -sh "$dir" 2>/dev/null | cut -f1)
                THUMB_SIZE=$(du -sh "thumbnails/$(basename "$dir")" 2>/dev/null | cut -f1)
                echo "  $(basename "$dir"): $ORIG_SIZE → $THUMB_SIZE"
            fi
        done
    fi
    
    echo ""
    echo "Next steps:"
    echo "  1. Test thumbnail loading"
    echo "  2. Upload thumbnails folder to your server"
    echo "  3. Update image.js to use thumbnails"
    echo ""
}

# Main execution
main() {
    create_directories
    
    # Generate thumbnails for each directory
    generate_thumbnails "photos" "thumbnails/photos" 300 60
    generate_thumbnails "color work" "thumbnails/color work" 300 60
    generate_thumbnails "Commissioned Color Work" "thumbnails/Commissioned Color Work" 300 60
    generate_thumbnails "graphic-design" "thumbnails/graphic-design" 300 60
    generate_thumbnails "images" "thumbnails/images" 300 60
    
    show_stats
}

# Run the script
main
