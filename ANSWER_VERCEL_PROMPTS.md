# ⚡ ANSWER THESE VERCEL PROMPTS NOW

**You're at:** `? Which Git remote should be used?`

---

## 🎯 COPY-PASTE THESE ANSWERS

### **Prompt 1:**
```
? Which Git remote should be used?
```
**Answer:** Use arrow keys, select `github`, press Enter

---

### **Prompt 2:**
```
? Link to existing project?
```
**Answer:** Type `N`, press Enter

---

### **Prompt 3:**
```
? What's your project's name?
```
**Answer:** Type `nihon-quest`, press Enter

---

### **Prompt 4:**
```
? In which directory is your code located?
```
**Answer:** Type `./`, press Enter

---

### **Prompt 5:**
```
? Want to override the settings?
```
**Answer:** Type `N`, press Enter

---

## 🎉 DONE!

Vercel will now deploy. You'll see:

```
✔ Uploading...
✔ Installing...
✔ Building...
✔ Deployed!

🎉 https://nihon-quest.vercel.app
```

**Your app will be LIVE in 2 minutes!**

---

## 🚀 AFTER DEPLOYMENT

### **Add Firebase Environment Variables:**

```bash
# Option 1: Via Dashboard (Easier)
open https://vercel.com/dashboard
# Select project → Settings → Environment Variables
# Add all 6 Firebase variables

# Option 2: Via CLI
vercel env add VITE_FIREBASE_API_KEY production
vercel env add VITE_FIREBASE_AUTH_DOMAIN production
vercel env add VITE_FIREBASE_PROJECT_ID production
vercel env add VITE_FIREBASE_STORAGE_BUCKET production
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID production
vercel env add VITE_FIREBASE_APP_ID production

# Then redeploy
vercel --prod
```

---

## ✅ COMPLETE!

Once you answer the 5 prompts, your app goes live!

**がんばって！Just answer the questions! 🚀**
