# 🚀 Deployment Guide - Lavanya & Vikas Sai Wedding Invitation

## Frontend Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (free at vercel.com)

### Step 1: Push to GitHub
```bash
cd wedding-invite
git init
git add .
git commit -m "Initial commit: Wedding invitation app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wedding-invite.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework: Next.js (auto-detected)
   - Root Directory: ./
   - Environment Variables: Add `NEXT_PUBLIC_API_URL` (see step 4)

### Step 3: Deploy Backend (Choose One)

#### Option A: Heroku (Easiest)
```bash
# Install Heroku CLI and login
heroku login
cd wedding-backend
heroku create your-app-name
git push heroku main
```

#### Option B: Railway
1. Go to railway.app
2. Create new project
3. Deploy from GitHub repo
4. Set environment variable: `DB_PATH=postgresql://...`

#### Option C: Render
1. Go to render.com
2. Create new Web Service
3. Connect GitHub repo
4. Set start command: `npm run dev`

### Step 4: Update Frontend API URL
After backend is deployed, update Vercel environment variables:
- Go to Vercel Project Settings → Environment Variables
- Add: `NEXT_PUBLIC_API_URL=https://your-backend-url.herokuapp.com`
- Redeploy

### Step 5: Share the Link
Your wedding invitation will be available at:
```
https://your-project.vercel.app
https://your-project.vercel.app/guest-name
```

## Database Setup (Production)

### Switch from SQLite to PostgreSQL

1. **Create PostgreSQL Database** (Railway, Heroku, AWS RDS)

2. **Update Backend** - Modify `wedding-backend/server.js`:
```javascript
const DB_PATH = process.env.DATABASE_URL;
```

3. **Create migration** for PostgreSQL tables (Same schema as SQLite)

4. **Deploy** with environment variable:
```
DATABASE_URL=postgresql://user:password@host:port/dbname
```

## Custom Domain Setup

1. In Vercel Project Settings → Domains
2. Add your custom domain
3. Update DNS records as shown
4. Wait for SSL certificate (automatic)

## Monitoring & Maintenance

- View logs: Vercel Dashboard → Deployments
- Monitor API: Backend provider dashboard
- Set up error tracking: Sentry.io (optional)
- Automatic backups for database

## Security Checklist

- ✅ Update CORS in backend for production domain
- ✅ Use HTTPS (automatic on Vercel)
- ✅ Set strong database passwords
- ✅ Enable rate limiting (already configured)
- ✅ Use environment variables for secrets
- ✅ Regular database backups

## Testing Before Going Live

1. Test on mobile devices
2. Test form submissions
3. Test with different browsers
4. Verify maps links work
5. Test countdown timer
6. Verify RSVP emails (if configured)

## Support URLs After Deployment

- Frontend: `https://your-domain.vercel.app`
- Guest Page: `https://your-domain.vercel.app/john-doe`
- Admin: `https://your-domain.vercel.app/admin`
- API Health: `https://your-backend-url/health`
- API Docs: `https://your-backend-url/api`

---

Need help? Check deployment status and logs in your provider's dashboard.
