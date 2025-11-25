# Manual Git LFS Installation Steps

## Step 1: Download Git LFS

**Option A:** Download via browser:
1. Open this URL in your browser: https://github.com/git-lfs/git-lfs/releases/download/v3.7.1/git-lfs-darwin-amd64-v3.7.1.tar.gz
2. It should download to your Downloads folder as `git-lfs-darwin-amd64-v3.7.1.tar.gz`

**Option B:** Try download with wget or curl (paste into terminal):
```bash
cd ~/Downloads
wget https://github.com/git-lfs/git-lfs/releases/download/v3.7.1/git-lfs-darwin-amd64-v3.7.1.tar.gz
```

## Step 2: Extract and Install

After downloading (whichever method you used), run these commands:

```bash
# Navigate to Downloads
cd ~/Downloads

# Extract the archive
tar -xzf git-lfs-darwin-amd64-v3.7.1.tar.gz

# Enter the extracted folder
cd git-lfs-darwin-amd64-v3.7.1

# Copy git-lfs to /usr/local/bin (you'll need to enter your password)
sudo cp git-lfs /usr/local/bin/

# Make it executable
sudo chmod +x /usr/local/bin/git-lfs

# Verify it works
/usr/local/bin/git-lfs version

# Initialize Git LFS
/usr/local/bin/git-lfs install
```

## Step 3: Set Up Your Portfolio Repository

After Git LFS is installed, run these commands:

```bash
# Go to your portfolio folder
cd /Users/alexbarsanti/Downloads/myportfolio

# Tell Git LFS to track video files
git lfs track "*.mp4"
git lfs track "*.MOV"
git lfs track "*.mov"

# Add the .gitattributes file
git add .gitattributes

# Add all other files
git add .

# Commit everything
git commit -m "Add portfolio files with Git LFS for large videos"

# Push to GitHub (make sure you've created the repo and set the remote first)
git push -u origin main
```

That's it! Your large video files will be uploaded via Git LFS automatically.

