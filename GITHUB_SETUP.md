# GitHub Deployment Setup Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name it (e.g., `portfolio` or `alexbarsanti-portfolio`)
4. Make it **Public** or **Private** (your choice)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Upload Files to GitHub

### Option A: Using GitHub Website (Easiest)

1. On your new repository page, click "uploading an existing file"
2. Drag and drop your entire `myportfolio` folder contents
3. In the commit message, type "Initial portfolio upload"
4. Click "Commit changes"

### Option B: Using Git Command Line (Recommended)

```bash
# Navigate to your portfolio folder
cd /Users/alexbarsanti/Downloads/myportfolio

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit files
git commit -m "Initial portfolio upload"

# Add your GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Connect GitHub to Netlify

1. Go to https://app.netlify.com
2. Sign up or log in (you can use your GitHub account)
3. Click **"Add new site"** → **"Import an existing project"**
4. Click **"Deploy with GitHub"**
5. Authorize Netlify to access your GitHub account
6. Select your repository from the list
7. Configure build settings:
   - **Build command:** Leave empty (or use: `echo 'No build needed'`)
   - **Publish directory:** `.` (a single dot - means root directory)
8. Click **"Deploy site"**

## Step 4: Automatic Deployments

Once connected:
- ✅ Every time you push to GitHub, Netlify automatically deploys
- ✅ You'll see deployment status in Netlify dashboard
- ✅ Netlify provides a free HTTPS URL
- ✅ You can set up custom domain later

## Step 5: Customize Your Site Name

1. In Netlify, go to **Site settings** → **General** → **Site details**
2. Click **"Change site name"**
3. Enter a name like: `alexbarsanti-portfolio`
4. Your site will be available at: `alexbarsanti-portfolio.netlify.app`

## Future Updates

Whenever you make changes:

```bash
# Make your changes to files
# Then commit and push:

git add .
git commit -m "Description of changes"
git push
```

Netlify will automatically detect the push and redeploy your site!

## Troubleshooting

### If deployment fails:
- Check that `netlify.toml` is in the root of your repository
- Make sure all file paths are relative (not absolute)
- Check Netlify build logs for specific errors

### If site looks broken:
- Clear browser cache
- Check that all folders and files uploaded correctly
- Verify file paths in HTML/CSS are correct

## Custom Domain (Optional Later)

1. In Netlify: **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain name
4. Follow DNS configuration instructions

---

**Your site is now live and will automatically update from GitHub! 🚀**

