# 🚀 Quick Start Guide

Get up and running in 5 minutes!

---

## ⚡ **Super Quick Start**

```bash
# 1. Run setup script
cd nihon-quest-fullstack
chmod +x scripts/setup.sh
./scripts/setup.sh

# 2. Start development
make dev

# 3. Open browser
open http://localhost:5173
```

---

## 📋 **Essential Commands**

### **Development**
```bash
make dev          # Start dev server
make build        # Build for production
make preview      # Preview production build
```

### **Quality Checks**
```bash
make lint         # Check code quality
make lint-fix     # Fix issues automatically
make format       # Format code
make type-check   # TypeScript validation
```

### **Deployment**
```bash
make deploy       # Full deployment (recommended)
make deploy-fast  # Quick deploy (hosting only)
make health       # Check app health
```

### **Monitoring**
```bash
make logs         # View Firebase logs
make status       # Check deployment status
make health       # Run health check
```

---

## 🛠️ **Available Tools**

### **1. Linting & Formatting**
- ✅ ESLint configured
- ✅ Prettier configured
- ✅ Auto-fix available
- ✅ Pre-commit hooks ready

### **2. Deployment**
- ✅ One-command deployment
- ✅ Automatic quality checks
- ✅ Firebase hosting
- ✅ Cloud functions

### **3. Cron Jobs** (6 scheduled tasks)
- ✅ Daily user stats (midnight UTC)
- ✅ Weekly reports (Monday 9 AM)
- ✅ Session cleanup (2 AM daily)
- ✅ Performance monitoring (hourly)
- ✅ Daily backups (3 AM)
- ✅ User reminders (10 AM)

### **4. Health Monitoring**
- ✅ Automated health checks
- ✅ Performance tracking
- ✅ Error logging
- ✅ Real-time alerts

### **5. CI/CD**
- ✅ GitHub Actions workflows
- ✅ Automated testing
- ✅ Automatic deployment
- ✅ Health check on deploy

---

## 📚 **Documentation**

- **`DEVOPS_TOOLING.md`** - Complete tooling guide
- **`Makefile`** - All available commands
- **`scripts/setup.sh`** - Automated setup
- **`scripts/health-check.js`** - Health monitoring

---

## 🎯 **Common Workflows**

### **Starting Development**
```bash
make dev
```

### **Before Committing**
```bash
make check        # Runs lint + type-check
```

### **Deploying to Production**
```bash
make full-deploy  # Runs all checks + deploy + health check
```

### **Checking App Health**
```bash
make health
```

### **Viewing Logs**
```bash
make logs         # View recent logs
make logs-follow  # Stream logs in real-time
```

---

## 🔧 **Setup Requirements**

- **Node.js** 18+
- **npm** 8+
- **Firebase CLI**
- **Git**

Run `./scripts/setup.sh` to check and install everything!

---

## 🌐 **URLs**

- **Production:** https://nihonselfpacepractic.web.app
- **Local Dev:** http://localhost:5173
- **Firebase Console:** https://console.firebase.google.com/project/nihonselfpacepractic
- **Health Check API:** https://us-central1-nihonselfpacepractic.cloudfunctions.net/healthCheck

---

## 🆘 **Need Help?**

```bash
make help         # Show all commands
```

Or check **`DEVOPS_TOOLING.md`** for detailed documentation.

---

## ✅ **You're Ready!**

Everything is set up and ready to use. Start developing with:

```bash
make dev
```

Happy coding! 🎌✨
