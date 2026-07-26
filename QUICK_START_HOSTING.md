# ⚡ Quick Start: Host Your Wedding Invitation in 5 Minutes

## 🎯 What You'll Get
- **Frontend URL**: https://vikas-wedding.vercel.app (guests can see this)
- **Guest Pages**: https://vikas-wedding.vercel.app/john-doe (personalized invitations)
- **Admin Dashboard**: https://vikas-wedding.vercel.app/admin (view RSVPs & accommodations)

## ✅ Prerequisites
- GitHub account (free)
- Vercel account (free at vercel.com)
- This project on GitHub

## 📋 Step-by-Step (5 Minutes)

### 1️⃣ Push to GitHub (2 min)
```bash
cd wedding-invite
git init
git add .
git commit -m "Wedding invitation app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vikas-wedding-invite.git
git push -u origin main
```

### 2️⃣ Deploy Frontend to Vercel (2 min)
1. Go to **https://vercel.com**
2. Click **"New Project"**
3. **Import from GitHub** → select `vikas-wedding-invite`
4. In project settings, set **Project Name**: `vikas-wedding`
5. Click **Deploy** ✨

**Your app is now LIVE at https://vikas-wedding.vercel.app!** 🎉

### 3️⃣ Configure Backend (1 min)

#### Option A: Use Existing Backend (https://sajan.life)
- Skip this step, app already configured

#### Option B: Deploy Your Own Backend

**On Railway (recommended - free tier)**
1. Go to **https://railway.app**
2. Create new project
3. Deploy from GitHub (select `vikas-wedding-invite` backend folder)
4. Get deployment URL
5. Update Vercel:
   - Go to Vercel → Project Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL=https://your-railway-url.up.railway.app`
   - Redeploy

## 🔗 Share With Guests

Send them links like:
```
https://vikas-wedding.vercel.app/john-doe
https://vikas-wedding.vercel.app/jane-smith
https://vikas-wedding.vercel.app/family-friends
```

Replace the name with guest names and it will show personalized invitation!

## 📊 Monitor Responses

**View all RSVPs & Accommodations:**
- Go to: `https://vikas-wedding.vercel.app/admin`
- API Key: `wedding-admin-2025-secure-ag_srujana` (see AdminDashboard.js)

## ✨ Features Available

- ✅ Personalized guest pages
- ✅ RSVP submission
- ✅ Accommodation requests
- ✅ Contact form for questions
- ✅ Admin dashboard to view all responses
- ✅ Google Maps integration
- ✅ Countdown timer
- ✅ Beautiful animations
- ✅ Mobile responsive

## 🆘 Troubleshooting

**API calls failing?**
- Check backend is running
- Verify `NEXT_PUBLIC_API_URL` in Vercel environment variables
- Redeploy after changing environment variables

**Checkboxes not working?**
- Clear browser cache (Ctrl+Shift+Delete)
- Try different browser
- Check backend CORS configuration

**Maps links not opening?**
- Verify maps URLs in event configuration
- Check browser console for errors

## 📞 Need Help?

1. Check DEPLOYMENT.md for detailed setup
2. Review logs in Vercel dashboard
3. Check backend logs in Railway/Heroku
4. Verify all environment variables are set

## 🎊 You're Done!

Your wedding invitation is now live at **https://vikas-wedding.vercel.app** and guests can:
1. View event details (Haldi, Sangeet, Wedding, Reception)
2. See venue locations on Google Maps
3. RSVP their attendance
4. Request accommodations
5. Send special messages

**Share the link with your guests!** 🎉

---

**Example URLs to send to guests:**
- https://vikas-wedding.vercel.app/john-doe
- https://vikas-wedding.vercel.app/jane-smith
- https://vikas-wedding.vercel.app/smith-family
- https://vikas-wedding.vercel.app/aunt-uncle
