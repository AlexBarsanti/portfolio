# Deploying to Netlify - Step by Step

## Method 1: Drag and Drop (Fastest - No account needed initially)

1. **Prepare your folder**
   - Make sure you're in the `myportfolio` folder
   - All your files should be here (HTML, CSS, JS, images, videos)

2. **Go to Netlify**
   - Visit: https://app.netlify.com/drop
   - OR go to https://app.netlify.com and click "Add new site" > "Deploy manually"

3. **Upload**
   - Drag your entire `myportfolio` folder into the upload area
   - Wait for upload to complete (may take a few minutes with large video files)

4. **Your site is live!**
   - Netlify will give you a URL like `random-name-12345.netlify.app`
   - You can customize this in site settings

## Method 2: Git Integration (Recommended for updates)

1. **Create a GitHub repository**
   - Go to github.com and create a new repository
   - Upload your `myportfolio` folder to the repository

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "Add new site" > "Import an existing project"
   - Connect your GitHub account
   - Select your repository
   - Click "Deploy site"

3. **Automatic deployments**
   - Every time you push to GitHub, Netlify will automatically redeploy
   - Your site will always be up to date

## Customizing Your Site

### Change Site Name
1. Go to Site settings > General > Site details
2. Click "Change site name"
3. Choose a custom name (e.g., `alexbarsanti-portfolio`)
4. Your new URL will be: `yourname.netlify.app`

### Custom Domain (Optional)
1. Go to Site settings > Domain management
2. Click "Add custom domain"
3. Enter your domain name
4. Follow the DNS configuration instructions

## Important Notes

- ⚠️ Large video files may take time to upload and can affect loading speeds
- ✅ Netlify offers 100GB bandwidth per month on free tier
- ✅ All your current file paths should work correctly
- ✅ The site will automatically handle HTTPS

## Testing After Deployment

1. Visit your Netlify URL
2. Test all pages:
   - Home page (index.html)
   - About page
   - Editing page
   - Color Grading page
   - VFX page
   - IMAX Workshop page
   - Production Stills page
   - Contact modal

## Need Help?

- Netlify Docs: https://docs.netlify.com
- Netlify Support: https://www.netlify.com/support

