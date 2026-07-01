# 🔥 Firebase Deployment Guide

Complete guide for deploying and monitoring your Nihon Quest application in Firebase.

---

## 📍 **Your Project Location**
```
/Users/jarrel/Documents/Github/boeung/Nihonpractice
```

---

## 🚀 **Quick Deploy (Recommended)**

### **Option 1: Using Makefile (Easiest)**

```bash
# Navigate to project
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack

# Deploy everything (with checks)
make deploy

# Or quick deploy (hosting only)
make deploy-fast

# Or deploy functions only
make deploy-func
```

### **Option 2: Using npm Scripts**

```bash
# Navigate to frontend
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack/frontend

# Full deploy (lint + build + deploy)
npm run deploy

# Quick deploy (hosting only)
npm run deploy:hosting

# Deploy functions only
npm run deploy:functions
```

### **Option 3: Manual Deploy**

```bash
# Navigate to frontend
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack/frontend

# 1. Build the app
npm run build

# 2. Deploy to Firebase
firebase deploy --only hosting

# 3. Deploy functions (optional)
firebase deploy --only functions

# 4. Deploy everything
firebase deploy
```

---

## 🔍 **Check Deployment Status**

### **1. View in Browser**

```bash
# Open production URL
open https://nihonselfpacepractic.web.app

# Or alternative URL
open https://nihonselfpacepractic.firebaseapp.com
```

### **2. Firebase Console**

```bash
# Open Firebase Console
open https://console.firebase.google.com/project/nihonselfpacepractic/overview

# Specific sections:
# Hosting
open https://console.firebase.google.com/project/nihonselfpacepractic/hosting

# Functions
open https://console.firebase.google.com/project/nihonselfpacepractic/functions

# Analytics
open https://console.firebase.google.com/project/nihonselfpacepractic/analytics

# Firestore
open https://console.firebase.google.com/project/nihonselfpacepractic/firestore
```

### **3. Run Health Check**

```bash
# From frontend directory
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack/frontend

# Run health check
npm run health-check

# Or using Makefile
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack
make health
```

### **4. View Firebase Logs**

```bash
# View hosting logs
firebase hosting:channel:list

# View function logs
firebase functions:log

# Or using Makefile
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack
make logs
```

---

## 📊 **Firebase Console - What to Check**

### **1. Hosting Dashboard**
- ✅ Deployment status
- ✅ Traffic metrics
- ✅ Bandwidth usage
- ✅ Request count
- ✅ Error rate

**URL:** https://console.firebase.google.com/project/nihonselfpacepractic/hosting

### **2. Functions Dashboard**
- ✅ Function invocations
- ✅ Execution time
- ✅ Error rate
- ✅ Memory usage
- ✅ Cron job status

**URL:** https://console.firebase.google.com/project/nihonselfpacepractic/functions

### **3. Analytics Dashboard**
- ✅ Active users
- ✅ User engagement
- ✅ Page views
- ✅ User retention
- ✅ Events

**URL:** https://console.firebase.google.com/project/nihonselfpacepractic/analytics

### **4. Firestore Dashboard**
- ✅ Database collections
- ✅ Document count
- ✅ Read/write operations
- ✅ Storage usage

**URL:** https://console.firebase.google.com/project/nihonselfpacepractic/firestore

---

## 🔄 **Complete Deployment Workflow**

### **Step-by-Step Process**

```bash
# 1. Navigate to project
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice

# 2. Pull latest changes (if working with team)
git pull origin main

# 3. Navigate to frontend
cd nihon-quest-fullstack/frontend

# 4. Install dependencies (if needed)
npm install

# 5. Run linting
npm run lint

# 6. Run type check
npm run type-check

# 7. Build application
npm run build

# 8. Deploy to Firebase
firebase deploy --only hosting

# 9. Check deployment
npm run health-check

# 10. Open in browser
open https://nihonselfpacepractic.web.app
```

---

## 🎯 **Deployment Commands Reference**

### **From Project Root**
```bash
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack
```

| Command | Description |
|---------|-------------|
| `make deploy` | Full deployment with checks |
| `make deploy-fast` | Quick hosting deploy |
| `make deploy-func` | Deploy functions only |
| `make health` | Run health check |
| `make logs` | View Firebase logs |
| `make status` | Check deployment status |

### **From Frontend Directory**
```bash
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack/frontend
```

| Command | Description |
|---------|-------------|
| `npm run deploy` | Full deployment |
| `npm run deploy:hosting` | Deploy hosting only |
| `npm run deploy:functions` | Deploy functions only |
| `npm run health-check` | Run health check |
| `npm run build` | Build application |
| `npm run lint` | Run linter |

---

## 🔧 **Troubleshooting**

### **Issue: "Firebase command not found"**

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Verify installation
firebase --version
```

### **Issue: "Permission denied"**

```bash
# Login again
firebase login

# Check current project
firebase use

# Set correct project
firebase use nihonselfpacepractic
```

### **Issue: "Build failed"**

```bash
# Clear cache and reinstall
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack/frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### **Issue: "Deploy failed"**

```bash
# Check Firebase status
firebase projects:list

# Check current project
firebase use

# Try deploying with debug
firebase deploy --only hosting --debug
```

---

## 📱 **Testing Deployment**

### **1. Desktop Testing**

```bash
# Open in default browser
open https://nihonselfpacepractic.web.app

# Open in specific browsers
open -a "Google Chrome" https://nihonselfpacepractic.web.app
open -a "Safari" https://nihonselfpacepractic.web.app
open -a "Firefox" https://nihonselfpacepractic.web.app
```

### **2. Mobile Testing**

- Use Chrome DevTools mobile emulator
- Test on actual mobile devices
- Check responsive design
- Test scrolling behavior

### **3. Performance Testing**

```bash
# Run Lighthouse audit
npx lighthouse https://nihonselfpacepractic.web.app --view

# Or use Chrome DevTools Lighthouse tab
```

---

## 📈 **Monitoring After Deployment**

### **1. Real-time Monitoring**

```bash
# Watch function logs in real-time
firebase functions:log --only healthCheck

# Monitor hosting
firebase hosting:channel:list
```

### **2. Health Check Endpoint**

```bash
# Check health endpoint
curl https://us-central1-nihonselfpacepractic.cloudfunctions.net/healthCheck

# Or in browser
open https://us-central1-nihonselfpacepractic.cloudfunctions.net/healthCheck
```

### **3. Automated Monitoring**

The GitHub Actions workflow runs health checks automatically:
- After every deployment
- Every hour (scheduled)
- Creates issues if health check fails

---

## 🔐 **Security Checklist**

Before deploying:

- [ ] Check Firebase security rules
- [ ] Verify environment variables
- [ ] Review API keys
- [ ] Check authentication settings
- [ ] Verify CORS settings
- [ ] Review function permissions

---

## 📝 **Deployment Checklist**

- [ ] Code is tested locally
- [ ] Linting passes
- [ ] Type checking passes
- [ ] Build succeeds
- [ ] Firebase project is correct
- [ ] Deploy to Firebase
- [ ] Health check passes
- [ ] Test in browser
- [ ] Check Firebase Console
- [ ] Monitor for errors

---

## 🚨 **Rollback Procedure**

If deployment has issues:

```bash
# View deployment history
firebase hosting:channel:list

# Rollback to previous version (in Firebase Console)
# Go to: Hosting → Release history → Rollback

# Or redeploy previous version
git checkout <previous-commit>
cd nihon-quest-fullstack/frontend
npm run build
firebase deploy --only hosting
```

---

## 📊 **Key URLs**

### **Production URLs**
- **Main:** https://nihonselfpacepractic.web.app
- **Alt:** https://nihonselfpacepractic.firebaseapp.com

### **Firebase Console**
- **Overview:** https://console.firebase.google.com/project/nihonselfpacepractic/overview
- **Hosting:** https://console.firebase.google.com/project/nihonselfpacepractic/hosting
- **Functions:** https://console.firebase.google.com/project/nihonselfpacepractic/functions
- **Analytics:** https://console.firebase.google.com/project/nihonselfpacepractic/analytics
- **Firestore:** https://console.firebase.google.com/project/nihonselfpacepractic/firestore

### **Health Check**
- **Endpoint:** https://us-central1-nihonselfpacepractic.cloudfunctions.net/healthCheck

---

## 💡 **Pro Tips**

### **1. Quick Deploy Alias**

Add to your `~/.zshrc`:

```bash
alias nihon-deploy="cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack && make deploy-fast"
alias nihon-health="cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack && make health"
alias nihon-logs="cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack && make logs"
```

Then use:
```bash
nihon-deploy  # Deploy from anywhere
nihon-health  # Check health from anywhere
nihon-logs    # View logs from anywhere
```

### **2. Watch Mode for Development**

```bash
# Run dev server (auto-reload)
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack/frontend
npm run dev
```

### **3. Preview Before Deploy**

```bash
# Build and preview locally
npm run build
npm run preview

# Then deploy if looks good
firebase deploy --only hosting
```

---

## ✅ **Summary**

### **Fastest Deploy**
```bash
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack
make deploy-fast
```

### **Check Deployment**
```bash
open https://nihonselfpacepractic.web.app
open https://console.firebase.google.com/project/nihonselfpacepractic
```

### **Monitor Health**
```bash
make health
```

**You're all set!** 🚀🔥
