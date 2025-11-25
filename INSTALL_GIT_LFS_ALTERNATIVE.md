# Alternative Git LFS Installation (When Homebrew Fails)

The Homebrew installation is failing. Here's an alternative way to install Git LFS.

## Option 1: Download Git LFS Binary Directly (Recommended)

### Step 1: Download Git LFS

```bash
cd /Users/alexbarsanti/Downloads/myportfolio

# Download Git LFS binary for macOS
curl -L https://github.com/git-lfs/git-lfs/releases/download/v3.7.1/git-lfs-darwin-amd64-v3.7.1.tar.gz -o git-lfs.tar.gz

# Extract it
tar -xzf git-lfs.tar.gz

# Move it to a location in your PATH
sudo mv git-lfs /usr/local/bin/

# Make it executable
sudo chmod +x /usr/local/bin/git-lfs

# Clean up
rm -rf git-lfs.tar.gz git-lfs
```

### Step 2: Initialize Git LFS

```bash
git lfs install
```

### Step 3: Verify Installation

```bash
git lfs version
```

You should see something like: `git-lfs/3.7.1`

---

## Option 2: Use Git LFS Installer Script

```bash
cd /Users/alexbarsanti/Downloads/myportfolio

# Download and run the installer
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash

# Actually, for macOS, use this:
brew install --cask git-lfs
```

---

## Option 3: Skip Git LFS (Alternative Approach)

If you continue having issues, you can upload large files using GitHub's web interface with a different approach, or use a different hosting method for videos.

---

## After Installing Git LFS

Once Git LFS is installed, continue with these commands:

```bash
# Navigate to your folder
cd /Users/alexbarsanti/Downloads/myportfolio

# Initialize Git LFS
git lfs install

# Track video files
git lfs track "*.mp4"
git lfs track "*.MOV"
git lfs track "*.mov"

# Add the .gitattributes file
git add .gitattributes

# Add all files
git add .

# Commit
git commit -m "Add portfolio files with Git LFS"

# Push (make sure your GitHub remote is set first)
git push -u origin main
```

---

## Troubleshooting

### If you get "Permission denied" errors:

```bash
# Check if /usr/local/bin exists and is writable
ls -la /usr/local/bin

# If not, create it
sudo mkdir -p /usr/local/bin
```

### If you get "command not found" after installation:

```bash
# Check your PATH
echo $PATH

# Add /usr/local/bin to your PATH if it's not there
export PATH="/usr/local/bin:$PATH"

# Add to ~/.zshrc to make it permanent
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Check disk space:

```bash
df -h
```

If your disk is full, you may need to free up space before continuing.

