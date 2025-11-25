# Step-by-Step: What to Do on GitHub

## Step 1: Create a New Repository

1. Go to **https://github.com** and sign in (or create an account if you don't have one)

2. Click the **"+" icon** in the top right corner → select **"New repository"**

3. Fill in the repository details:
   - **Repository name:** Choose a name like:
     - `portfolio`
     - `alexbarsanti-portfolio`
     - `my-portfolio`
   - **Description (optional):** "My professional portfolio website"
   - **Visibility:** Choose **Public** or **Private** (your choice)
   - ⚠️ **IMPORTANT:** Do NOT check any of these boxes:
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
   - (We already have these files)

4. Click the green **"Create repository"** button

## Step 2: Upload Your Files

After creating the repository, you'll see a page with setup instructions. You have two options:

### Option A: Upload via GitHub Website (Easiest)

1. On your new repository page, look for the message: **"uploading an existing file"**
   - Click that link (it's usually near the bottom of the page)

2. Or manually:
   - Click the **"Add file"** button (top right)
   - Select **"Upload files"**

3. Drag and drop your entire `myportfolio` folder contents:
   - All HTML files
   - All CSS files
   - All JS files
   - All folders (videos/, images/, etc.)
   - Everything!

4. Scroll down to the **"Commit changes"** section:
   - In the commit message box, type: `Initial portfolio upload`
   - Leave "Commit directly to the main branch" selected
   - Click the green **"Commit changes"** button

5. Wait for all files to upload (this may take a few minutes if you have large video files)

### Option B: Use Git Command Line (If you have Git installed)

Open Terminal and run:

```bash
cd /Users/alexbarsanti/Downloads/myportfolio

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial portfolio upload"

# Add GitHub repository (replace YOUR_USERNAME and REPO_NAME with yours)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Verify Files Are Uploaded

After uploading, you should see all your files in the GitHub repository:
- ✅ index.html
- ✅ about.html
- ✅ style.css
- ✅ script.js
- ✅ All your folders (videos/, images/, etc.)

## Step 4: Copy Your Repository URL

1. On your repository page, click the green **"Code"** button
2. Copy the HTTPS URL (it looks like: `https://github.com/YOUR_USERNAME/REPO_NAME.git`)
3. Keep this handy for the next step (connecting to Netlify)

---

## What's Next?

After your files are on GitHub:

1. **Go to Netlify** (https://app.netlify.com)
2. **Connect your GitHub repository** (see GITHUB_SETUP.md for Netlify steps)
3. Your site will deploy automatically!

---

## Troubleshooting

**If upload fails:**
- Make sure you're uploading the folder CONTENTS, not the folder itself
- Check that you're uploading all files and folders
- Large files (>100MB) may need Git LFS (usually not needed for portfolios)

**If you don't see "uploading an existing file":**
- Look for "Add file" button instead
- Or use the command line method (Option B)

**If you get errors:**
- Make sure you didn't check any of the initialization boxes
- Try creating a new repository and starting over

---

That's it! Once your files are on GitHub, you're ready to connect to Netlify.

