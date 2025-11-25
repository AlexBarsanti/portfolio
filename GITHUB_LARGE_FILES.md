# Handling Large Files on GitHub

## The Problem
GitHub has a **25MB file size limit**. Your video files are likely larger than this.

## Solutions

### Option 1: Use Git LFS (Recommended)

Git LFS (Large File Storage) allows you to upload large files to GitHub.

1. **Install Git LFS** (if not already installed):
   ```bash
   brew install git-lfs
   ```

2. **Initialize Git LFS in your repository**:
   ```bash
   cd /Users/alexbarsanti/Downloads/myportfolio
   git lfs install
   ```

3. **Track video files**:
   ```bash
   git lfs track "*.mp4"
   git lfs track "*.MOV"
   git lfs track "*.mov"
   ```

4. **Add and commit**:
   ```bash
   git add .gitattributes
   git add .
   git commit -m "Add large files with Git LFS"
   git push
   ```

### Option 2: Skip Large Videos for Now (Quick Fix)

For deployment, you can:
1. Upload all files EXCEPT the large videos
2. Deploy to Netlify
3. Add videos later via Git LFS or host them elsewhere

### Option 3: Host Videos Externally

Upload videos to:
- **Vimeo** or **YouTube** (unlisted)
- **Cloudinary** or **Cloudflare Stream**
- **AWS S3** or **Google Cloud Storage**

Then update your HTML to reference the external URLs.

---

## For Netlify Deployment

**Good news:** Netlify doesn't have the 25MB limit, so even if videos fail on GitHub, you can:
1. Upload the rest of your files to GitHub
2. Connect to Netlify
3. Manually upload large files to Netlify or use Git LFS

---

## Quick Command Reference

```bash
# Check file sizes
find . -type f -size +25M

# Install Git LFS
brew install git-lfs

# Setup LFS for videos
git lfs install
git lfs track "*.mp4"
git lfs track "*.MOV"
git add .gitattributes
git add .
git commit -m "Add files with LFS"
git push
```

