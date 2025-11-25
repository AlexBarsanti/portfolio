#!/bin/bash

# Git LFS Installation Script
# Run this with: bash install-git-lfs.sh

echo "Installing Git LFS..."

# Create a temporary directory
mkdir -p /tmp/git-lfs-install
cd /tmp/git-lfs-install

# Download Git LFS (using the GitHub API to get the latest release)
echo "Downloading Git LFS..."
curl -L -o git-lfs.tar.gz "https://github.com/git-lfs/git-lfs/releases/download/v3.7.1/git-lfs-darwin-amd64-v3.7.1.tar.gz"

# Check if download succeeded
if [ ! -f git-lfs.tar.gz ] || [ ! -s git-lfs.tar.gz ]; then
    echo "Download failed. Trying alternative method..."
    # Try alternative download URL
    curl -L -o git-lfs.tar.gz "https://github.com/git-lfs/git-lfs/releases/download/v3.7.1/git-lfs-v3.7.1-darwin-amd64.tar.gz"
fi

# Extract
echo "Extracting..."
tar -xzf git-lfs.tar.gz 2>/dev/null || tar -xzf *.tar.gz 2>/dev/null

# Find the git-lfs binary
if [ -f git-lfs/git-lfs ]; then
    LFS_BINARY=git-lfs/git-lfs
elif [ -f git-lfs ]; then
    LFS_BINARY=git-lfs
else
    echo "Could not find git-lfs binary in archive"
    exit 1
fi

# Install to /usr/local/bin (requires sudo)
echo "Installing to /usr/local/bin (you may be prompted for your password)..."
sudo cp "$LFS_BINARY" /usr/local/bin/git-lfs
sudo chmod +x /usr/local/bin/git-lfs

# Verify installation
echo "Verifying installation..."
if /usr/local/bin/git-lfs version > /dev/null 2>&1; then
    echo "✅ Git LFS installed successfully!"
    /usr/local/bin/git-lfs version
    
    # Initialize Git LFS
    echo ""
    echo "Initializing Git LFS..."
    /usr/local/bin/git-lfs install
else
    echo "❌ Installation verification failed"
    exit 1
fi

# Clean up
cd /Users/alexbarsanti/Downloads/myportfolio
rm -rf /tmp/git-lfs-install

echo ""
echo "Git LFS is ready to use!"

