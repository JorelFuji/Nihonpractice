# 🛠️ DevOps Tooling Guide

Complete guide for linting, deployment, cron jobs, health monitoring, and development tools.

---

## 📋 **Table of Contents**

1. [Linting & Formatting](#linting--formatting)
2. [Deployment](#deployment)
3. [Cron Jobs](#cron-jobs)
4. [Health Monitoring](#health-monitoring)
5. [Development Tools](#development-tools)
6. [CI/CD Setup](#cicd-setup)

---

## 🎨 **Linting & Formatting**

### **Available Commands**

```bash
# Run ESLint (check for errors)
npm run lint

# Run ESLint and auto-fix issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check if code is formatted
npm run format:check

# Type check with TypeScript
npm run type-check
```

### **Pre-Commit Setup**

Install pre-commit hooks:
```bash
cd frontend
npx husky install
npx husky add .husky/pre-commit "npm run lint && npm run format:check"
```

### **Configuration Files**

**`.prettierrc.json`** - Code formatting rules
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

**`.eslintrc.js`** - Linting rules (already configured)

---

## 🚀 **Deployment**

### **Quick Deploy Commands**

```bash
cd nihon-quest-fullstack/frontend

# Full deployment (lint + type-check + build + deploy)
npm run deploy

# Deploy hosting only (faster)
npm run deploy:hosting

# Deploy functions only
npm run deploy:functions
```

### **Step-by-Step Deployment**

#### **1. Pre-Deployment Checks**
```bash
# Check for errors
npm run lint
npm run type-check

# Test build locally
npm run build
npm run preview
```

#### **2. Deploy to Firebase**
```bash
# Deploy everything
npm run deploy

# Or deploy specific services
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore:rules
```

#### **3. Post-Deployment Verification**
```bash
# Run health check
npm run health-check

# Check Firebase console
open https://console.firebase.google.com
```

### **Deployment Checklist**

- [ ] Run linting: `npm run lint`
- [ ] Type check: `npm run type-check`
- [ ] Test locally: `npm run dev`
- [ ] Build: `npm run build`
- [ ] Deploy: `npm run deploy`
- [ ] Health check: `npm run health-check`
- [ ] Test production: Visit https://nihonselfpacepractic.web.app
- [ ] Check Firebase console for errors

---

## ⏰ **Cron Jobs**

### **Scheduled Functions**

All cron jobs are defined in `/functions/index.js`:

#### **1. Daily User Stats**
```javascript
// Runs every day at midnight UTC
export const dailyUserStats = onSchedule('0 0 * * *', ...)
```
**Purpose:** Track daily active users and engagement

#### **2. Weekly Progress Report**
```javascript
// Runs every Monday at 9 AM UTC
export const weeklyProgressReport = onSchedule('0 9 * * 1', ...)
```
**Purpose:** Generate weekly learning progress reports

#### **3. Cleanup Old Sessions**
```javascript
// Runs every day at 2 AM UTC
export const cleanupOldSessions = onSchedule('0 2 * * *', ...)
```
**Purpose:** Delete sessions older than 30 days

#### **4. Monitor Performance**
```javascript
// Runs every hour
export const monitorPerformance = onSchedule('0 * * * *', ...)
```
**Purpose:** Track Firestore latency and performance

#### **5. Backup User Progress**
```javascript
// Runs every day at 3 AM UTC
export const backupUserProgress = onSchedule('0 3 * * *', ...)
```
**Purpose:** Daily backup of user progress data

#### **6. Send Daily Reminders**
```javascript
// Runs every day at 10 AM UTC
export const sendDailyReminders = onSchedule('0 10 * * *', ...)
```
**Purpose:** Remind inactive users to study

### **Cron Schedule Format**

```
* * * * *
│ │ │ │ │
│ │ │ │ └─── Day of week (0-7, Sunday = 0 or 7)
│ │ │ └───── Month (1-12)
│ │ └─────── Day of month (1-31)
│ └───────── Hour (0-23)
└─────────── Minute (0-59)
```

**Examples:**
- `0 0 * * *` - Every day at midnight
- `0 9 * * 1` - Every Monday at 9 AM
- `0 * * * *` - Every hour
- `*/15 * * * *` - Every 15 minutes

### **Managing Cron Jobs**

```bash
# Deploy functions
cd functions
npm install
firebase deploy --only functions

# View function logs
firebase functions:log

# Test function locally
firebase emulators:start --only functions
```

---

## 🏥 **Health Monitoring**

### **Health Check Script**

Run health checks:
```bash
cd frontend
npm run health-check
```

**Output:**
```
🏥 Application Health Check
==================================================

📡 Checking Production...
✅ Status: 200
⚡ Response Time: 245ms
📦 Content Length: 1234 bytes

🖥️  Checking Local Development...
✅ Status: 200
⚡ Response Time: 12ms

📊 Performance Metrics
Performance Rating: 🟢 Excellent

==================================================
✅ Health Check Complete
```

### **Health Check Endpoint**

Firebase Function endpoint:
```
GET https://us-central1-nihonselfpacepractic.cloudfunctions.net/healthCheck
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-06-29T21:43:00.000Z",
  "responseTime": "45ms",
  "services": {
    "firestore": "operational",
    "functions": "operational"
  }
}
```

### **Monitoring Dashboard**

View metrics in Firebase Console:
```bash
# Open Firebase Console
open https://console.firebase.google.com/project/nihonselfpacepractic

# Navigate to:
# - Functions → Logs
# - Firestore → Usage
# - Hosting → Performance
```

### **Performance Metrics**

The `monitorPerformance` function tracks:
- Firestore latency
- Response times
- Error rates
- Resource usage

View in Firestore:
```
/performance/{timestamp}
  - firestoreLatency: 45ms
  - status: "good"
  - timestamp: Date
```

---

## 🔧 **Development Tools**

### **Local Development**

```bash
cd frontend

# Start dev server
npm run dev

# Open browser
open http://localhost:5173
```

### **Firebase Emulators**

```bash
# Start all emulators
firebase emulators:start

# Start specific emulators
firebase emulators:start --only functions,firestore

# Access Emulator UI
open http://localhost:4000
```

**Emulator Ports:**
- Functions: http://localhost:5001
- Firestore: http://localhost:8080
- Hosting: http://localhost:5000
- UI: http://localhost:4000

### **Debugging**

```bash
# View Firebase logs
firebase functions:log

# View specific function logs
firebase functions:log --only healthCheck

# Stream logs in real-time
firebase functions:log --follow

# View hosting logs
firebase hosting:channel:list
```

### **Testing**

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

---

## 🔄 **CI/CD Setup**

### **GitHub Actions Workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          cd nihon-quest-fullstack/frontend
          npm ci
          
      - name: Lint
        run: |
          cd nihon-quest-fullstack/frontend
          npm run lint
          
      - name: Type check
        run: |
          cd nihon-quest-fullstack/frontend
          npm run type-check
          
      - name: Build
        run: |
          cd nihon-quest-fullstack/frontend
          npm run build
          
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: nihonselfpacepractic
```

### **Automated Health Checks**

Add to workflow:
```yaml
      - name: Health Check
        run: |
          cd nihon-quest-fullstack/frontend
          npm run health-check
```

---

## 📊 **Monitoring & Analytics**

### **Firebase Console**

**Key Metrics to Monitor:**

1. **Hosting Performance**
   - Page load times
   - Bandwidth usage
   - Request counts

2. **Functions Performance**
   - Execution times
   - Error rates
   - Invocation counts

3. **Firestore Usage**
   - Read/write operations
   - Storage size
   - Query performance

4. **User Analytics**
   - Daily active users
   - Session duration
   - Feature usage

### **Custom Analytics**

View in Firestore collections:
```
/analytics/daily-stats
  - totalUsers: 150
  - activeUsers: 45
  - timestamp: Date

/analytics/weekly-report
  - totalLessonsCompleted: 234
  - totalStudyTime: 12345
  - averageStudyTime: 82.3

/performance/{timestamp}
  - firestoreLatency: 45ms
  - status: "good"
```

---

## 🚨 **Alerts & Notifications**

### **Performance Alerts**

The `monitorPerformance` function logs warnings:
```javascript
if (firestoreLatency > 2000) {
  console.warn('⚠️ High Firestore latency detected:', firestoreLatency, 'ms')
}
```

### **Error Tracking**

View errors in Firebase Console:
```bash
# Open Functions logs
open https://console.firebase.google.com/project/nihonselfpacepractic/functions/logs

# Filter by error severity
# - Error
# - Warning
# - Info
```

---

## 📝 **Quick Reference**

### **Common Commands**

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Build for production
npm run preview            # Preview production build

# Quality Checks
npm run lint               # Check for errors
npm run lint:fix           # Fix errors automatically
npm run format             # Format code
npm run type-check         # TypeScript check

# Deployment
npm run deploy             # Full deployment
npm run deploy:hosting     # Deploy hosting only
npm run deploy:functions   # Deploy functions only

# Monitoring
npm run health-check       # Run health check
firebase functions:log     # View function logs
firebase emulators:start   # Start local emulators
```

### **Firebase Commands**

```bash
# Deployment
firebase deploy                          # Deploy everything
firebase deploy --only hosting           # Hosting only
firebase deploy --only functions         # Functions only
firebase deploy --only firestore:rules   # Firestore rules only

# Monitoring
firebase functions:log                   # View logs
firebase functions:log --follow          # Stream logs
firebase hosting:channel:list            # List hosting channels

# Emulators
firebase emulators:start                 # Start all emulators
firebase emulators:start --only functions # Functions only
```

---

## 🎯 **Best Practices**

### **Before Every Deployment**

1. ✅ Run `npm run lint`
2. ✅ Run `npm run type-check`
3. ✅ Test locally with `npm run dev`
4. ✅ Build with `npm run build`
5. ✅ Preview with `npm run preview`
6. ✅ Deploy with `npm run deploy`
7. ✅ Health check with `npm run health-check`

### **Regular Maintenance**

- **Daily:** Check Firebase Console for errors
- **Weekly:** Review performance metrics
- **Monthly:** Review and optimize cron jobs
- **Quarterly:** Update dependencies

### **Security**

- Never commit Firebase credentials
- Use environment variables for secrets
- Review Firestore security rules regularly
- Monitor for suspicious activity

---

## 🆘 **Troubleshooting**

### **Deployment Fails**

```bash
# Check for build errors
npm run build

# Check for linting errors
npm run lint

# Check Firebase login
firebase login

# Check project
firebase projects:list
```

### **Functions Not Running**

```bash
# Check function logs
firebase functions:log

# Test locally
firebase emulators:start --only functions

# Redeploy
firebase deploy --only functions
```

### **Health Check Fails**

```bash
# Check if site is accessible
curl https://nihonselfpacepractic.web.app

# Check Firebase status
open https://status.firebase.google.com

# Check function endpoint
curl https://us-central1-nihonselfpacepractic.cloudfunctions.net/healthCheck
```

---

## ✅ **Summary**

You now have:

- ✅ **Linting** - ESLint + Prettier configured
- ✅ **Deployment** - One-command deployment
- ✅ **Cron Jobs** - 6 scheduled functions
- ✅ **Health Monitoring** - Automated health checks
- ✅ **Development Tools** - Complete dev environment
- ✅ **CI/CD Ready** - GitHub Actions template

**All tools are ready to use!** 🎉
