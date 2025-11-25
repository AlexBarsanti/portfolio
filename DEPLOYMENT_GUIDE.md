# Deployment Guide for Alexander Barsanti Portfolio

This is a static website that can be deployed to various hosting platforms. Here are your options:

## Quick Deployment Options

### Option 1: Netlify (Recommended - Easiest)
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Drag and drop your entire `myportfolio` folder onto the Netlify dashboard
3. Your site will be live in seconds!
4. Optionally connect to a Git repository for continuous deployments

### Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. In your project folder, run: `vercel`
3. Follow the prompts
4. Your site will be deployed automatically

### Option 3: GitHub Pages
1. Create a GitHub repository
2. Push your code to GitHub
3. Go to Settings > Pages
4. Select your branch and save
5. Your site will be available at `username.github.io/repository-name`

### Option 4: Traditional Web Hosting
Upload all files via FTP/SFTP to your hosting provider's `public_html` or `www` folder.

## Important Notes

- All files in the `myportfolio` folder need to be uploaded (HTML, CSS, JS, images, videos, etc.)
- Large video files may need optimization or hosting on a CDN
- Make sure all relative paths in your HTML/CSS are correct
- Test the site locally before deploying

## File Structure
Your site includes:
- HTML files (index.html, about.html, editing.html, etc.)
- CSS files (style.css, vfx.css, etc.)
- JavaScript files (script.js, etc.)
- Image folders (Imax Photos/, production-stills-web/, etc.)
- Video folders (videos/)

All these need to be uploaded together.

## Testing Locally
Before deploying, test locally by opening `index.html` in a browser, or better yet, use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

Then visit `http://localhost:8000` in your browser.

