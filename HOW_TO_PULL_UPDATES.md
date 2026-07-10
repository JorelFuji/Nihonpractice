# 📥 How to Pull Updates from GitHub

## 🔗 Your Repository Configuration

**Local Folder:** `/Users/m1876041/Documents/Github/NihonSelfPace`  
**GitHub Repo:** `https://github.com/JorelFuji/Nihonpractice.git`  
**Branch:** main

---

## ✅ **Quick Pull Command**

To update your local folder with the latest code from GitHub:

```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace
git pull origin main
```

---

## 📋 **Step-by-Step Pull Process**

### **1. Navigate to Your Project Folder**
```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace
```

### **2. Check Current Status**
```bash
git status
```
This shows:
- Current branch
- Any uncommitted changes
- If you're behind/ahead of remote

### **3. Fetch Latest Changes (Preview)**
```bash
git fetch origin
```
This downloads changes but doesn't apply them yet.

### **4. Pull and Merge Changes**
```bash
git pull origin main
```
This downloads AND applies changes to your local files.

---

## 🔍 **Understanding Git Remote**

### **Check Your Remote Connection:**
```bash
git remote -v
```

**Expected Output:**
```
origin  https://github.com/JorelFuji/Nihonpractice.git (fetch)
origin  https://github.com/JorelFuji/Nihonpractice.git (push)
```

This confirms your local folder is connected to the correct GitHub repo.

---

## ⚠️ **Before Pulling - Handle Local Changes**

### **Scenario 1: You Have Uncommitted Changes**

If you've made local changes:

**Option A - Save Your Changes (Recommended):**
```bash
# Commit your changes first
git add .
git commit -m "Description of your changes"
git pull origin main
```

**Option B - Stash Your Changes:**
```bash
# Temporarily save changes
git stash

# Pull updates
git pull origin main

# Restore your changes
git stash pop
```

**Option C - Discard Your Changes:**
```bash
# WARNING: This deletes your local changes!
git reset --hard HEAD
git pull origin main
```

---

## 🔄 **Complete Pull Workflow**

### **Safe Pull Process:**
```bash
# 1. Go to project folder
cd /Users/m1876041/Documents/Github/NihonSelfPace

# 2. Check what branch you're on
git branch

# 3. Check for local changes
git status

# 4. If you have changes, commit them
git add .
git commit -m "Your changes description"

# 5. Fetch to see what's new
git fetch origin

# 6. Check if you're behind
git status

# 7. Pull the latest code
git pull origin main

# 8. Verify it worked
git log --oneline -5
```

---

## 🚨 **Common Pull Issues & Solutions**

### **Issue 1: "You have unstaged changes"**
```
error: Your local changes to the following files would be overwritten by merge
```

**Solution:**
```bash
# Save your changes first
git add .
git commit -m "Save local work"
git pull origin main
```

### **Issue 2: "Merge Conflict"**
```
CONFLICT (content): Merge conflict in filename.tsx
```

**Solution:**
```bash
# 1. Open the conflicting file
# 2. Look for markers: <<<<<<< HEAD, =======, >>>>>>>
# 3. Edit the file to resolve conflicts
# 4. Remove conflict markers
# 5. Save the file

# 6. Mark as resolved
git add filename.tsx

# 7. Complete the merge
git commit -m "Resolve merge conflict"
```

### **Issue 3: "Already up to date"**
```
Already up to date.
```

**This is good!** It means you have the latest code.

### **Issue 4: "fatal: not a git repository"**
```
fatal: not a git repository (or any of the parent directories): .git
```

**Solution:**
```bash
# You're in the wrong folder. Navigate to project:
cd /Users/m1876041/Documents/Github/NihonSelfPace
```

---

## 📊 **Useful Git Commands**

### **Check Status:**
```bash
git status                    # Current state
git log --oneline -10        # Recent commits
git branch                   # Current branch
git remote -v                # Remote connections
```

### **View Changes:**
```bash
git diff                     # Changes not staged
git diff --staged            # Changes staged for commit
git log origin/main..HEAD    # Commits not pushed yet
```

### **Update Info:**
```bash
git fetch origin             # Download latest info
git fetch --all             # Fetch from all remotes
```

---

## 🎯 **Different Pull Scenarios**

### **Pull Specific Branch:**
```bash
git pull origin branch-name
```

### **Pull with Rebase (Cleaner History):**
```bash
git pull --rebase origin main
```

### **Pull All Branches:**
```bash
git fetch --all
git pull --all
```

### **Force Pull (Overwrite Local):**
```bash
# WARNING: This discards ALL local changes!
git fetch origin
git reset --hard origin/main
```

---

## 🔐 **Authentication**

If prompted for credentials:

### **HTTPS (Username/Password or Token):**
```
Username: JorelFuji
Password: [GitHub Personal Access Token]
```

### **SSH (If configured):**
```bash
# Check SSH connection
ssh -T git@github.com

# Should say: "Hi JorelFuji!"
```

---

## 📁 **Your Project Structure**

After pulling, your folder contains:

```
/Users/m1876041/Documents/Github/NihonSelfPace/
├── nihon-quest-fullstack/
│   ├── frontend/           ← React web app
│   ├── backend/            ← FastAPI backend
│   └── README.md
├── nihon_quest_mobile/     ← Flutter mobile app
├── Nihon Pace iOS/         ← iOS version
├── ENHANCED_KANJI_LEARNING.md
├── FIREBASE_TESTING_GUIDE_COMPLETE.md
└── [other documentation files]
```

---

## 🔄 **Pull + Deploy Workflow**

### **Update and Deploy in One Go:**
```bash
# 1. Pull latest code
cd /Users/m1876041/Documents/Github/NihonSelfPace
git pull origin main

# 2. Install any new dependencies
cd nihon-quest-fullstack/frontend
npm install

# 3. Build the app
npm run build

# 4. Deploy to Firebase
firebase deploy --only hosting

# 5. Test live site
open https://nihonselfpacepractic.web.app
```

---

## 💡 **Best Practices**

### **Daily Workflow:**
```bash
# Morning: Pull latest
git pull origin main

# Work: Make changes...

# Evening: Commit and push
git add .
git commit -m "Description"
git push origin main
```

### **Before Making Changes:**
```bash
# Always pull first!
git pull origin main

# Then start working
```

### **Regular Checks:**
```bash
# Check if you're behind
git fetch origin
git status

# See what changed remotely
git log origin/main
```

---

## 🎓 **Understanding Pull vs Fetch**

| Command | What it Does | When to Use |
|---------|-------------|-------------|
| `git fetch` | Downloads changes, doesn't apply | Preview what's new |
| `git pull` | Downloads AND applies changes | Update your files |
| `git pull origin main` | Pull from main branch | Standard update |

**Think of it as:**
- **Fetch** = Check mail (download but don't open)
- **Pull** = Check and open mail (download and apply)

---

## 🚀 **Quick Reference Card**

```bash
# Location
cd /Users/m1876041/Documents/Github/NihonSelfPace

# Standard pull
git pull origin main

# Safe pull (with check)
git status              # Check first
git pull origin main    # Then pull

# Emergency pull (discard local)
git fetch origin
git reset --hard origin/main

# Pull specific file
git checkout origin/main -- path/to/file.tsx
```

---

## 📞 **When to Pull**

✅ **Pull when:**
- Starting work for the day
- Before making new changes
- After someone else pushed updates
- Before creating a new branch
- When GitHub shows "This branch is X commits behind"

❌ **Don't pull when:**
- You have uncommitted changes (commit first!)
- In the middle of resolving conflicts
- During a failed merge (finish or abort first)

---

## 🎯 **Summary**

**To update your local folder from GitHub:**

```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace
git pull origin main
```

**That's it!** Your local files will be updated with the latest code from GitHub.

---

**Your repo is connected to:**
- **Remote:** origin
- **URL:** https://github.com/JorelFuji/Nihonpractice.git
- **Branch:** main

**Keep this guide handy for future pulls!** 📥✨
