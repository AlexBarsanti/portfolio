# Upload Large Files to GitHub Using Terminal + Git LFS

## Step 1: Install Git LFS

```bash
# Install Git LFS using Homebrew
brew install git-lfs
```

If you don't have Homebrew, install it first:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Step 2: Navigate to Your Portfolio Folder

```bash
cd /Users/alexbarsanti/Downloads/myportfolio
```

## Step 3: Initialize Git LFS

```bash
# Initialize Git LFS globally (only need to do this once on your computer)
git lfs install
```

## Step 4: Tell Git LFS Which Files to Track

```bash
# Track all video files
git lfs track "*.mp4"
git lfs track "*.MOV"
git lfs track "*.mov"

# You can also track specific large files if needed
# git lfs track "videos/large-video.mp4"
```

## Step 5: Add the .gitattributes File

```bash
# Add the .gitattributes file that Git LFS created
git add .gitattributes
```

## Step 6: Check Your Git Remote

Make sure your GitHub repository is connected:

```bash
# Check if remote is set
git remote -v
```

You should see something like:
```
origin  https://github.com/AlexBarsanti/portfolio.git (fetch)
origin  https://github.com/AlexBarsanti/portfolio.git (push)
```

If you don't see this, add your remote:
```bash
git remote add origin https://github.com/AlexBarsanti/portfolio.git
```

## Step 7: Stage All Files

```bash
# Add all files (including large ones tracked by LFS)
git add .
```

## Step 8: Commit

```bash
# Commit all files
git commit -m "Add portfolio files with Git LFS for large videos"
```

## Step 9: Push to GitHub

```bash
# Push to GitHub (Git LFS will handle large files automatically)
git push -u origin main
```

Or if your branch is called `master`:
```bash
git push -u origin master
```

## Step 10: Wait for Upload

Large files will take time to upload. Git LFS will show progress:
- First, it uploads metadata
- Then it uploads the actual large files to LFS storage
- You'll see progress indicators

## Verify It Worked

After pushing, go to your GitHub repository and check:
1. All files should be visible
2. Large files should show "Stored with Git LFS" badge
3. Files should be accessible

## Troubleshooting

### If you get "git: command not found"
Install Git first:
```bash
# On macOS, Git might not be installed
xcode-select --install
```

### If you get "git lfs: command not found"
Install Git LFS:
```bash
brew install git-lfs
git lfs install
```

### If you get "remote origin already exists"
Check if it's pointing to the right URL:
```bash
git remote set-url origin https://github.com/AlexBarsanti/portfolio.git
```

### If push fails partway through
```bash
# Try pushing again - Git LFS will resume
git push
```

### Check what files are tracked by LFS
```bash
git lfs ls-files
```

### See file sizes
```bash
# List files larger than 25MB
find . -type f -size +25M -exec ls -lh {} \;
```

---

## Complete Command Sequence (Copy & Paste)

Here's everything in one go:

```bash
# 1. Navigate to folder
cd /Users/alexbarsanti/Downloads/myportfolio

# 2. Install Git LFS (if not already installed)
brew install git-lfs

# 3. Initialize Git LFS
git lfs install

# 4. Track large file types
git lfs track "*.mp4"
git lfs track "*.MOV"
git lfs track "*.mov"

# 5. Add .gitattributes
git add .gitattributes

# 6. Add all other files
git add .

# 7. Commit
git commit -m "Add portfolio files with Git LFS"

# 8. Push to GitHub
git push -u origin main
```

That's it! Your large files will upload automatically via Git LFS.

