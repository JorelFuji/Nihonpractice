# 🔥 Firebase Setup Guide

## ✅ What's Already Done

Firebase SDK has been integrated into your project with:
- ✅ **Authentication** (Email/Password + Google Sign-In)
- ✅ **Firestore Database** (User progress, lessons, practice sessions)
- ✅ **Analytics** (Track user engagement and learning patterns)

## 🚀 Quick Start

### 1. Enable Firebase Services in Console

Go to [Firebase Console](https://console.firebase.google.com/project/nihonselfpacepractic/overview) and enable these services:

#### **A. Authentication**
1. Click **"Authentication"** in left sidebar
2. Click **"Get Started"**
3. Enable **Email/Password** sign-in method
4. Enable **Google** sign-in method
   - You'll need to add your project's support email

#### **B. Firestore Database**
1. Click **"Firestore Database"** in left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select your region (e.g., us-central1)
5. Click **"Enable"**

#### **C. Analytics**
1. Click **"Analytics"** in left sidebar
2. Click **"Enable Analytics"**
3. Follow the setup wizard

### 2. Configure Firestore Security Rules

Once Firestore is enabled, go to **Rules** tab and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profiles - users can only read/write their own data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Practice sessions - users can only access their own sessions
    match /practiceSessions/{sessionId} {
      allow read: if request.auth != null && resource.data.uid == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.uid == request.auth.uid;
    }
    
    // Lesson progress - users can only access their own progress
    match /lessonProgress/{progressId} {
      allow read, write: if request.auth != null && 
        (resource.data.uid == request.auth.uid || 
         request.resource.data.uid == request.auth.uid);
    }
    
    // Review cards - users can only access their own cards
    match /reviewCards/{cardId} {
      allow read, write: if request.auth != null && 
        (resource.data.uid == request.auth.uid || 
         request.resource.data.uid == request.auth.uid);
    }
  }
}
```

**Change to production rules later:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 3. Set Up Firestore Indexes (Optional, for better performance)

Go to **Indexes** tab and create these composite indexes:

**practiceSessions collection:**
- Fields: `uid` (Ascending), `completedAt` (Descending)

**reviewCards collection:**
- Fields: `uid` (Ascending), `nextReviewDate` (Ascending)

**lessonProgress collection:**
- Fields: `uid` (Ascending), `lastAccessedAt` (Descending)

## 📦 Firebase Project Structure

### Collections in Firestore:

#### **users/** (User profiles)
```typescript
{
  uid: string                    // User ID
  email: string                  // Email address
  displayName: string            // Display name
  photoURL?: string              // Profile photo URL
  level: number                  // Current level (1-100)
  xp: number                     // Experience points
  streak: number                 // Daily streak count
  gems: number                   // Virtual currency
  hearts: number                 // Lives (1-5)
  totalKanji: number             // Kanji mastered
  totalVocab: number             // Vocabulary words learned
  totalGrammar: number           // Grammar points learned
  currentJLPTLevel: string       // N5, N4, N3, N2, or N1
  lastPracticeDate: Timestamp    // Last practice session
  createdAt: Timestamp
  lastLoginAt: Timestamp
  updatedAt: Timestamp
}
```

#### **practiceSessions/** (Practice history)
```typescript
{
  uid: string                    // User ID
  sessionType: string            // 'vocabulary' | 'grammar' | 'kanji' | 'handwriting' | 'quiz'
  questionsAnswered: number      // Total questions
  correctAnswers: number         // Correct responses
  xpEarned: number              // XP gained
  gemsEarned: number            // Gems earned
  duration: number              // Session duration (seconds)
  jlptLevel: string             // N5-N1
  completedAt: Timestamp
}
```

#### **lessonProgress/** (Lesson tracking)
```typescript
{
  uid: string                    // User ID
  lessonId: string              // Unique lesson identifier
  lessonTitle: string           // Lesson name
  progress: number              // 0-100 percentage
  completed: boolean            // Completion status
  lastAccessedAt: Timestamp
}
```

#### **reviewCards/** (Spaced repetition)
```typescript
{
  uid: string                    // User ID
  word: string                   // Japanese word/character
  reading?: string               // Hiragana/Katakana reading
  meaning: string                // English translation
  cardType: string               // 'vocabulary' | 'kanji' | 'grammar'
  jlptLevel: string             // N5-N1
  nextReviewDate: Timestamp      // When to review next
  easeFactor: number            // FSRS ease factor
  interval: number              // Days until next review
  repetitions: number           // Times reviewed
  createdAt: Timestamp
}
```

## 🎯 How to Use Firebase in Your Code

### Authentication

```typescript
import { authService } from '@/services/authService';

// Sign up with email
await authService.signUpWithEmail(email, password, displayName);

// Sign in with email
await authService.signInWithEmail(email, password);

// Sign in with Google
await authService.signInWithGoogle();

// Sign out
await authService.signOut();

// Reset password
await authService.resetPassword(email);
```

### Firestore - User Progress

```typescript
import { firestoreService } from '@/services/firestoreService';

// Get user progress
const progress = await firestoreService.getUserProgress(userId);

// Update progress
await firestoreService.updateUserProgress(userId, {
  level: 5,
  xp: 500,
  totalKanji: 50
});

// Add XP
await firestoreService.addXP(userId, 10);

// Add gems
await firestoreService.addGems(userId, 5);

// Update streak
await firestoreService.updateStreak(userId);
```

### Firestore - Practice Sessions

```typescript
// Save practice session
const sessionId = await firestoreService.savePracticeSession({
  uid: userId,
  sessionType: 'vocabulary',
  questionsAnswered: 10,
  correctAnswers: 8,
  xpEarned: 40,
  gemsEarned: 20,
  duration: 180,
  jlptLevel: 'N5'
});

// Get recent sessions
const sessions = await firestoreService.getPracticeSessions(userId, 10);
```

### Firestore - Lesson Progress

```typescript
// Save lesson progress
await firestoreService.saveLessonProgress({
  uid: userId,
  lessonId: 'hiragana-basics',
  lessonTitle: 'Hiragana: The Basics',
  progress: 60,
  completed: false
});

// Get lesson progress
const progress = await firestoreService.getLessonProgress(userId, 'hiragana-basics');

// Get all lessons progress
const allProgress = await firestoreService.getAllLessonProgress(userId);
```

### Firestore - Review Cards (SRS)

```typescript
// Save review card
const cardId = await firestoreService.saveReviewCard({
  uid: userId,
  word: '食べる',
  reading: 'たべる',
  meaning: 'to eat',
  cardType: 'vocabulary',
  jlptLevel: 'N5',
  nextReviewDate: Timestamp.fromDate(new Date(Date.now() + 86400000)),
  easeFactor: 2.5,
  interval: 1,
  repetitions: 0
});

// Get due review cards
const dueCards = await firestoreService.getDueReviewCards(userId);

// Update review card after review
await firestoreService.updateReviewCard(cardId, {
  nextReviewDate: Timestamp.fromDate(newDate),
  easeFactor: 2.6,
  interval: 3,
  repetitions: 1
});
```

### Analytics

```typescript
import { analyticsService } from '@/services/analyticsService';

// Log practice session
analyticsService.logPracticeSession('vocabulary', 10, 8);

// Log lesson view
analyticsService.logLessonView('lesson-1', 'Hiragana Basics', 'N5');

// Log lesson completion
analyticsService.logLessonComplete('lesson-1', 300);

// Log AI tutor question
analyticsService.logAITutorQuestion('grammar', 'N5');

// Log level up
analyticsService.logLevelUp(5, 500);

// Log streak milestone
analyticsService.logStreakMilestone(7);
```

## 🔐 Environment Variables

Your Firebase config is already set in:
- `frontend/src/config/firebaseConfig.ts`

**Important:** The API key is public-facing and safe to commit. Security is handled by Firestore rules.

## 🛡️ Security Best Practices

1. **Never store sensitive data** in Firestore without proper rules
2. **Always validate data** on the backend if using Cloud Functions
3. **Use Firestore security rules** to restrict access
4. **Enable App Check** in production to prevent abuse
5. **Monitor usage** in Firebase Console to detect anomalies

## 📊 View Analytics Dashboard

1. Go to Firebase Console → **Analytics** → **Dashboard**
2. See real-time active users
3. Track custom events:
   - `practice_session_complete`
   - `lesson_view`
   - `lesson_complete`
   - `ai_tutor_question`
   - `level_up`
   - `streak_milestone`

## 🚀 Next Steps

1. ✅ **Enable Authentication** in Firebase Console
2. ✅ **Create Firestore Database** in test mode
3. ✅ **Configure Security Rules** as shown above
4. ✅ **Test sign up/sign in** in your app
5. ✅ **Verify data** is being saved to Firestore
6. ✅ **Check Analytics** dashboard for events

## 🆘 Troubleshooting

### "Firebase: Error (auth/operation-not-allowed)"
- Go to Authentication → Sign-in method
- Enable Email/Password and Google

### "Missing or insufficient permissions"
- Update Firestore security rules as shown above
- Make sure you're signed in when accessing data

### "Firebase Analytics is not available"
- Make sure you're running on `localhost` or `https://`
- Check browser console for errors
- Analytics only works in production builds on web

### Data not saving to Firestore
- Check Firebase Console → Firestore → Data
- Check browser console for errors
- Verify user is authenticated
- Check security rules

## 📚 Documentation Links

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firestore Docs](https://firebase.google.com/docs/firestore)
- [Analytics Docs](https://firebase.google.com/docs/analytics)
- [Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)

---

**Your Firebase is ready to use!** 🎉

All the code is integrated. Just enable the services in Firebase Console and start testing!
