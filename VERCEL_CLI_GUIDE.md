# 🚀 VERCEL CLI - COMPLETE GUIDE

**Status:** ✅ Vercel CLI already installed and authenticated!  
**Current:** You're at the deployment prompt - continue below

---

## ✅ YOU'RE READY! ANSWER THESE PROMPTS

**Your terminal is asking questions. Answer like this:**

### **Question 1: Which Git remote should be used?**
```
? Which Git remote should be used?
→ Use arrow keys to select: github
→ Press Enter
```

### **Question 2: Link to existing project?**
```
? Link to existing project?
→ Type: N
→ Press Enter
```

### **Question 3: What's your project's name?**
```
? What's your project's name?
→ Type: nihon-quest
→ Press Enter
```

### **Question 4: In which directory is your code located?**
```
? In which directory is your code located?
→ Type: ./
→ Press Enter
```

### **Question 5: Want to override the settings?**
```
? Want to override the settings?
→ Type: N
→ Press Enter
```

---

## 🎉 WHAT HAPPENS NEXT

Vercel will automatically:

```
✔ Uploading...
✔ Installing dependencies...
✔ Building...
✔ Deploying...

🎉 Production: https://nihon-quest.vercel.app
```

**Your app will be LIVE in 2-3 minutes!**

---

## 🔄 IF YOU WANT TO START OVER

### **Exit current deployment:**
```bash
# Press Ctrl+C to cancel
```

### **Deploy again:**
```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon-quest-fullstack/frontend
vercel --prod
```

---

## 📋 VERCEL CLI COMMANDS

### **Deploy to production:**
```bash
cd nihon-quest-fullstack/frontend
vercel --prod
```

### **Deploy to preview:**
```bash
vercel
```

### **View deployments:**
```bash
vercel ls
```

### **View logs:**
```bash
vercel logs
```

### **Check who's logged in:**
```bash
vercel whoami
```

### **Logout:**
```bash
vercel logout
```

### **Login again:**
```bash
vercel login
```

---

## 🔐 ADD ENVIRONMENT VARIABLES AFTER DEPLOY

### **Via CLI:**
```bash
# Navigate to project
cd nihon-quest-fullstack/frontend

# Add variables
vercel env add VITE_FIREBASE_API_KEY production
# Paste your API key when prompted

vercel env add VITE_FIREBASE_AUTH_DOMAIN production
# Paste your auth domain

vercel env add VITE_FIREBASE_PROJECT_ID production
# Paste your project ID

vercel env add VITE_FIREBASE_STORAGE_BUCKET production
# Paste your storage bucket

vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID production
# Paste your sender ID

vercel env add VITE_FIREBASE_APP_ID production
# Paste your app ID

# Redeploy to apply
vercel --prod
```

### **Or via Dashboard (Easier):**
```bash
# Open your project
open https://vercel.com/dashboard

# Go to: Settings → Environment Variables
# Add all 6 Firebase variables
# Redeploy
```

---

## 🎯 COMPLETE WORKFLOW

### **First Time Deploy:**
```bash
# 1. Navigate to project
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon-quest-fullstack/frontend

# 2. Deploy
vercel --prod

# 3. Answer prompts (see above)

# 4. Wait for deployment (2-3 min)

# 5. Get your URL
# https://nihon-quest.vercel.app
```

### **Update Existing Deployment:**
```bash
# Just run this in your project directory
vercel --prod

# That's it! Auto-deploys latest code
```

---

## 🚀 QUICK COMMANDS REFERENCE

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# View all deployments
vercel ls

# View recent logs
vercel logs

# Check current user
vercel whoami

# Pull environment variables
vercel env pull

# Add environment variable
vercel env add VAR_NAME production

# List environment variables
vercel env ls

# Remove deployment
vercel rm [deployment-url]

# Link to existing project
vercel link

# Get project info
vercel inspect

# Open in browser
vercel open
```

---

## 🔥 COMMON WORKFLOWS

### **Deploy with Environment Variables:**
```bash
# 1. Deploy first
vercel --prod

# 2. Add env vars via dashboard
open https://vercel.com/dashboard
# Settings → Environment Variables

# 3. Redeploy to apply
vercel --prod
```

### **Deploy from Different Branch:**
```bash
# Switch branch
git checkout feature-branch

# Deploy
vercel --prod
```

### **Deploy with Build Logs:**
```bash
# Deploy with verbose output
vercel --prod --debug
```

---

## 🎨 PROJECT STRUCTURE

```
Your setup:
/Users/m1876041/Documents/Github/NihonSelfPace/
├── nihon-quest-fullstack/
│   └── frontend/              ← You are here!
│       ├── vercel.json        ✅ Config ready
│       ├── package.json
│       ├── vite.config.ts
│       └── dist/              (build output)
```

---

## 📊 DEPLOYMENT STATUS

### **Check deployment status:**
```bash
# List all deployments
vercel ls

# Get specific deployment info
vercel inspect [deployment-url]

# View build logs
vercel logs [deployment-url]
```

### **Expected output:**
```
Name          URL                              Status
nihon-quest   nihon-quest.vercel.app          Ready
              nihon-quest-abc123.vercel.app   Ready
```

---

## 🚨 TROUBLESHOOTING

### **Build Failed?**
```bash
# Test build locally first
npm run build

# If it works locally, check env vars in Vercel
vercel env ls

# View error logs
vercel logs
```

### **404 Errors?**
Already fixed! `vercel.json` has SPA routing configured.

### **Port Already in Use?**
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Then deploy
vercel --prod
```

### **Authentication Expired?**
```bash
# Logout and login again
vercel logout
vercel login
```

---

## 🎉 SUCCESS!

After answering the prompts, you'll see:

```bash
✔ Uploading [====================] 100%
✔ Deploying...
✔ Build completed
✔ Deployment Ready!

🎉 Production: https://nihon-quest.vercel.app

Deployment complete!
```

**Your app is now LIVE! 🚀**

---

## 🔄 CONTINUOUS DEPLOYMENT

### **Setup automatic deployments:**

1. **Connect Git repository in Vercel Dashboard**
2. **Every push to main = auto-deploy**
3. **Every PR = preview URL**

```bash
# In Vercel Dashboard:
# Project → Settings → Git
# Connect your GitHub repository
```

Now:
- Push to `main` → Production deploy
- Open PR → Preview URL
- Merge PR → Production deploy

---

## ✨ YOU'RE ALMOST LIVE!

**Just answer the 5 prompts in your terminal and you're done!**

Your app will be live at: `https://nihon-quest.vercel.app`

**がんばって！Deploy now! 🚀**
