# 🔥 FIREBASE ENVIRONMENT VARIABLES FOR VERCEL

**Project:** Nihon Quest - Japanese Learning App  
**Status:** ✅ Ready to add to Vercel

---

## 📋 ENVIRONMENT VARIABLES TO ADD

Copy these **exact values** into Vercel Dashboard:

### **1. VITE_FIREBASE_API_KEY**
```
AIzaSyAEZ-4sPafZkPUseFK4hRN1q4-Vv-eEq_I
```

### **2. VITE_FIREBASE_AUTH_DOMAIN**
```
nihonselfpacepractic.firebaseapp.com
```

### **3. VITE_FIREBASE_PROJECT_ID**
```
nihonselfpacepractic
```

### **4. VITE_FIREBASE_STORAGE_BUCKET**
```
nihonselfpacepractic.firebasestorage.app
```

### **5. VITE_FIREBASE_MESSAGING_SENDER_ID**
```
319096782095
```

### **6. VITE_FIREBASE_APP_ID**
```
1:319096782095:web:4eb19452c95a823eab527a
```

---

## 🚀 HOW TO ADD TO VERCEL

### **Method 1: Via Vercel Dashboard (Easiest)**

```bash
# 1. Open Vercel Dashboard
open https://vercel.com/dashboard

# 2. Select your project (nihon-quest-fullstack or similar)

# 3. Go to: Settings → Environment Variables

# 4. For EACH variable above:
#    - Click "Add New"
#    - Name: VITE_FIREBASE_API_KEY (copy exact name)
#    - Value: AIzaSyAEZ-4sPafZkPUseFK4hRN1q4-Vv-eEq_I (copy exact value)
#    - Environments: Select "Production" and "Preview"
#    - Click "Save"

# 5. Repeat for all 6 variables

# 6. Redeploy:
#    - Go to Deployments tab
#    - Click "..." on latest deployment
#    - Click "Redeploy"
```

---

### **Method 2: Via Vercel CLI**

```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon-quest-fullstack/frontend

# Add each variable
vercel env add VITE_FIREBASE_API_KEY production
# Paste: AIzaSyAEZ-4sPafZkPUseFK4hRN1q4-Vv-eEq_I

vercel env add VITE_FIREBASE_AUTH_DOMAIN production
# Paste: nihonselfpacepractic.firebaseapp.com

vercel env add VITE_FIREBASE_PROJECT_ID production
# Paste: nihonselfpacepractic

vercel env add VITE_FIREBASE_STORAGE_BUCKET production
# Paste: nihonselfpacepractic.firebasestorage.app

vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID production
# Paste: 319096782095

vercel env add VITE_FIREBASE_APP_ID production
# Paste: 1:319096782095:web:4eb19452c95a823eab527a

# Redeploy
vercel --prod
```

---

## ✅ VERIFICATION CHECKLIST

After adding environment variables:

- [ ] All 6 variables added to Vercel
- [ ] Variables set for "Production" environment
- [ ] Variables set for "Preview" environment
- [ ] Project redeployed
- [ ] Open live site and test authentication
- [ ] Check browser console for Firebase errors
- [ ] Try signing up/signing in

---

## 🔍 HOW TO VERIFY THEY'RE SET

### **In Vercel Dashboard:**
1. Go to your project
2. Settings → Environment Variables
3. You should see all 6 variables listed:
   - ✅ VITE_FIREBASE_API_KEY
   - ✅ VITE_FIREBASE_AUTH_DOMAIN
   - ✅ VITE_FIREBASE_PROJECT_ID
   - ✅ VITE_FIREBASE_STORAGE_BUCKET
   - ✅ VITE_FIREBASE_MESSAGING_SENDER_ID
   - ✅ VITE_FIREBASE_APP_ID

### **Via CLI:**
```bash
cd nihon-quest-fullstack/frontend
vercel env ls
# Should show all 6 variables
```

---

## 🔥 FIREBASE CLI COMMANDS

### **Check Firebase Project:**
```bash
# Login to Firebase
firebase login

# List projects
firebase projects:list

# Select project
firebase use nihonselfpacepractic

# Check current project
firebase projects:list
```

### **Check Firebase Config:**
```bash
# Get web app config
firebase apps:sdkconfig web

# Should show the same values as above
```

---

## 📊 CURRENT FIREBASE CONFIG

**From:** `nihon-quest-fullstack/frontend/src/config/firebaseConfig.ts`

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyAEZ-4sPafZkPUseFK4hRN1q4-Vv-eEq_I",
  authDomain: "nihonselfpacepractic.firebaseapp.com",
  projectId: "nihonselfpacepractic",
  storageBucket: "nihonselfpacepractic.firebasestorage.app",
  messagingSenderId: "319096782095",
  appId: "1:319096782095:web:4eb19452c95a823eab527a",
  measurementId: "G-WWWT98XTT0"
};
```

**Note:** These are **public** client-side keys. They're safe to use in frontend code and protected by Firebase Security Rules.

---

## 🚨 TROUBLESHOOTING

### **Firebase Not Working After Deploy?**

**Problem:** Authentication or database not working on Vercel

**Solution:**
1. Check all 6 environment variables are set
2. Verify no typos in variable names (must match exactly)
3. Ensure variables are set for "Production" environment
4. Redeploy the project
5. Clear browser cache and try again

### **Check Console Errors:**
```javascript
// Open browser console on live site
// Look for Firebase errors:
// "Firebase: No Firebase App '[DEFAULT]' has been created"
// "Firebase: Error (auth/api-key-not-valid)"
```

### **Test Firebase Connection:**
```bash
# Test if Firebase is configured
curl https://nihonselfpacepractic.firebaseapp.com

# Should return Firebase hosting page or redirect
```

---

## 🎯 QUICK COPY-PASTE FOR VERCEL

**Variable Names (copy exactly):**
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

**Variable Values (copy exactly):**
```
AIzaSyAEZ-4sPafZkPUseFK4hRN1q4-Vv-eEq_I
nihonselfpacepractic.firebaseapp.com
nihonselfpacepractic
nihonselfpacepractic.firebasestorage.app
319096782095
1:319096782095:web:4eb19452c95a823eab527a
```

---

## 📝 IMPORTANT NOTES

1. **VITE_ Prefix Required:** Vercel needs the `VITE_` prefix to expose these to the frontend
2. **Public Keys:** These Firebase keys are meant to be public (client-side)
3. **Security:** Firebase Security Rules protect your data, not API keys
4. **No Quotes:** Don't add quotes around values in Vercel
5. **Redeploy Required:** After adding variables, redeploy to apply changes

---

## 🎉 AFTER ADDING VARIABLES

Your Vercel deployment will have:
- ✅ Firebase Authentication working
- ✅ Firestore Database working
- ✅ User sign up/sign in functional
- ✅ All game progress saving
- ✅ Profile data persisting

---

## 🔗 USEFUL LINKS

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Firebase Console:** https://console.firebase.google.com/project/nihonselfpacepractic
- **Vercel Env Vars Docs:** https://vercel.com/docs/environment-variables

---

**Ready to add! Just copy the values above into Vercel Dashboard! 🚀**
