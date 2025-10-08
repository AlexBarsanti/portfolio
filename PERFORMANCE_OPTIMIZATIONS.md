# Portfolio Website Performance Optimizations

## ✅ Implemented Optimizations

### 1. **Homepage (index.html) - Video Loading**
**Problem:** All 11 background videos were being preloaded, causing slow initial page load.

**Solution:**
- Only the first video now loads with `preload="auto"`
- Subsequent videos are loaded on-demand as they're needed
- Added video preloading logic for smoother transitions

**Expected Impact:** ~70-80% faster initial page load

---

### 2. **Image Gallery (image.html) - Lazy Loading**
**Problem:** ALL 156 images (115 photos + 20 commissioned + 14 color + 7 graphic design) were loading immediately.

**Solution:**
- Implemented smart lazy loading - only first 3 images per gallery load initially
- Images load progressively as users navigate through slideshows
- Added native `loading="lazy"` attribute for browser-level optimization
- Preloads current, next, and previous images for smooth navigation

**Expected Impact:** ~90-95% faster page load (from loading 156 images to just 12)

---

### 3. **Post-Production Page (postproduction.html) - Video Thumbnails**
**Problem:** All 11 video thumbnails were loading metadata simultaneously.

**Solution:**
- Implemented Intersection Observer API for lazy loading
- Videos only load when they come into viewport (with 50px buffer)
- Changed from `preload="metadata"` to `preload="none"` until needed

**Expected Impact:** ~85% faster page load, reduced bandwidth usage

---

### 4. **Resource Hints & Preloading**
**Added to all HTML pages:**
- `dns-prefetch` for external domains (TypeKit, LinkedIn)
- `preconnect` for critical external resources
- `preload` directives for critical CSS/JS files

**Expected Impact:** 200-500ms faster initial render

---

## 🎯 Additional Recommendations

### A. **Image Optimization** (CRITICAL - Biggest Impact)

Your images are likely unoptimized. You should compress them:

#### **Recommended Tools:**
1. **Online:**
   - [TinyPNG](https://tinypng.com/) - Easy drag & drop, excellent compression
   - [Squoosh](https://squoosh.app/) - Google's tool with fine-grained control
   
2. **Command Line (Best for bulk processing):**
   ```bash
   # Install ImageMagick
   brew install imagemagick
   
   # Compress all photos (in photos directory)
   cd photos/
   for img in *.jpg *.JPG *.jpeg; do
     convert "$img" -quality 85 -strip "optimized_$img"
   done
   
   # Or use mozjpeg for better compression
   brew install mozjpeg
   cjpeg -quality 85 -optimize input.jpg > output.jpg
   ```

#### **Target File Sizes:**
- Portfolio images: **150-300 KB each** (currently likely 1-5 MB)
- Thumbnails: **50-100 KB**
- Hero/background images: **300-500 KB**

**Expected Impact:** 80-90% reduction in file sizes = Much faster loading

---

### B. **Video Optimization** (CRITICAL)

Your video files are likely very large. Optimize them:

#### **Recommended Tools:**
```bash
# Install FFmpeg
brew install ffmpeg

# Compress videos with H.264 (web-optimized)
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 23 \
       -c:a aac -b:a 128k -movflags +faststart output.mp4
```

#### **Parameters Explained:**
- `-crf 23`: Quality (18-28, lower=better quality, 23 is good balance)
- `-preset slow`: Better compression (slower encoding, smaller file)
- `-movflags +faststart`: Enables streaming (video starts playing before fully downloaded)

#### **Target File Sizes:**
- Background videos: **2-5 MB** (currently likely 10-50 MB each)
- Portfolio videos: **5-15 MB** depending on length

**Expected Impact:** 70-85% reduction in video sizes

---

### C. **Convert Images to Modern Formats**

Consider using WebP or AVIF formats for better compression:

```bash
# Install cwebp
brew install webp

# Convert to WebP (better compression than JPEG)
cwebp -q 85 input.jpg -o output.webp
```

Then update your HTML to support multiple formats:
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description">
</picture>
```

**Expected Impact:** Additional 25-35% file size reduction over JPEG

---

### D. **Server-Side Optimizations**

If you have access to your hosting provider's settings:

#### **1. Enable Gzip/Brotli Compression**
Add to `.htaccess` (if using Apache):
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

#### **2. Enable Browser Caching**
Add to `.htaccess`:
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType video/mp4 "access plus 1 year"
</IfModule>
```

#### **3. Use a CDN**
Consider using:
- **Cloudflare** (Free plan available) - Easy setup, instant CDN
- **Netlify** or **Vercel** - Free hosting with built-in CDN

**Expected Impact:** 40-60% faster load times for repeat visitors

---

### E. **Quick Script to Check File Sizes**

Run this in your terminal to see current file sizes:

```bash
cd /Users/alexbarsanti/Downloads/myportfolio

echo "=== VIDEO SIZES ==="
ls -lh videos/*.mp4 | awk '{print $9, $5}'

echo -e "\n=== PHOTO SIZES (first 10) ==="
ls -lh photos/*.jpg | head -10 | awk '{print $9, $5}'

echo -e "\n=== TOTAL SIZES ==="
echo "Videos: $(du -sh videos)"
echo "Photos: $(du -sh photos)"
echo "Color Work: $(du -sh 'color work')"
echo "Commissioned: $(du -sh 'Commissioned Color Work')"
```

---

## 📊 Expected Overall Performance Improvement

| Metric | Before | After |
|--------|--------|-------|
| **Homepage Initial Load** | 5-10 seconds | 1-2 seconds |
| **Image Gallery Load** | 10-30 seconds | 2-4 seconds |
| **Video Page Load** | 8-15 seconds | 2-3 seconds |
| **Total Bandwidth (first visit)** | 200-500 MB | 10-20 MB |

*Note: These are estimates. Actual improvement depends on current file sizes and user's internet speed.*

---

## 🚀 Priority Action Items

### **Immediate (Do Now):**
1. ✅ Code optimizations (already done!)
2. Upload the updated files to your server

### **High Priority (This Week):**
1. Compress all videos using FFmpeg
2. Compress all images using TinyPNG or ImageMagick
3. Re-upload compressed media files

### **Medium Priority (This Month):**
1. Convert images to WebP format
2. Set up Cloudflare CDN (free)
3. Enable server-side caching

---

## 🧪 Testing Your Improvements

After implementing these changes, test your site:

1. **Google PageSpeed Insights:** https://pagespeed.web.dev/
   - Test your site URL
   - Aim for 90+ score on mobile and desktop

2. **GTmetrix:** https://gtmetrix.com/
   - Shows detailed loading waterfall
   - Provides specific recommendations

3. **WebPageTest:** https://www.webpagetest.org/
   - Advanced testing with video recording
   - Shows exactly when content loads

---

## 📝 Monitoring

Keep track of your site's performance:
- Run PageSpeed Insights monthly
- Monitor load times from different locations
- Check mobile performance (slower connections)

---

## ❓ Questions?

If you need help with any of these optimizations, feel free to ask!

**Most Critical:** Video and image compression will give you the biggest improvement (80-90% of the gains).
