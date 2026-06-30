# 🎮 Stats & Reward System

## **Earn-Based Progression System**

**Last Updated:** June 29, 2026

---

## 🎯 **OVERVIEW**

The stats system now works on an **earn-only** basis:
- ❤️ **Hearts:** Start at 0
- ⚡ **Energy:** Start at 0
- 💎 **Gems:** Start at 0

**All stats must be earned through gameplay, quizzes, lessons, and activities!**

---

## 📊 **HOW TO EARN STATS**

### **1. Complete Quizzes** 🧠
```typescript
import { rewardForActivity } from '@/utils/statsManager';

// After quiz completion
const score = 85; // 0-100
rewardForActivity.quiz(score);
```

**Rewards Based on Score:**
- **90-100%:** 4-5 ❤️, 9-10 ⚡, 10 💎
- **80-89%:** 4 ❤️, 8-9 ⚡, 10 💎
- **60-79%:** 3-4 ❤️, 6-7 ⚡, 5 💎
- **0-59%:** 0-2 ❤️, 0-5 ⚡, 2 💎

---

### **2. Complete Curriculum Lessons** 📚
```typescript
// After lesson completion
rewardForActivity.curriculumLesson();
```

**Fixed Reward:**
- +2 ❤️
- +5 ⚡
- +5 💎

---

### **3. Play Games** 🎮
```typescript
// After game ends
const won = true; // or false
rewardForActivity.game(won);
```

**Win Reward:**
- +3 ❤️
- +10 ⚡
- +15 💎

**Lose Reward:**
- +1 ❤️
- +3 ⚡
- +3 💎

---

### **4. Learn New Words** 📖
```typescript
// After learning vocabulary
const wordCount = 10;
rewardForActivity.newWords(wordCount);
```

**Reward Per Word:**
- +1 ⚡ per word
- +2 💎 per word

**Example:** 10 words = 10 ⚡, 20 💎

---

### **5. Daily Review** ✅
```typescript
// After completing daily review
rewardForActivity.dailyReview();
```

**Fixed Reward:**
- +1 ❤️
- +3 ⚡
- +3 💎

---

### **6. Daily Streak Bonus** 🔥
```typescript
// When user logs in on consecutive days
const streakDays = 7;
rewardForActivity.dailyStreak(streakDays);
```

**Reward Scales with Streak:**
- **1 day:** 1 ❤️, 2 ⚡, 5 💎
- **7 days:** 7 ❤️, 14 ⚡, 35 💎
- **30 days:** 30 ❤️, 60 ⚡, 150 💎
- **Max:** Caps at 30 days

---

## 💻 **IMPLEMENTATION GUIDE**

### **Step 1: Import the Manager**

```typescript
import { rewardForActivity } from '@/utils/statsManager';
```

### **Step 2: Add to Your Component**

**Example: Quiz Component**
```typescript
const handleQuizComplete = async (score: number) => {
  // Award stats based on score
  rewardForActivity.quiz(score);
  
  // Optional: Show toast notification
  if (score >= 80) {
    toast.success(`🎉 Great job! Earned +${Math.floor(score/20)} ❤️`);
  }
  
  // Continue with your normal quiz completion logic
  navigate('/results');
};
```

**Example: Game Component**
```typescript
const handleGameEnd = (playerWon: boolean) => {
  // Award stats
  rewardForActivity.game(playerWon);
  
  // Show results
  if (playerWon) {
    toast.success('🏆 Victory! +3 ❤️ +10 ⚡ +15 💎');
  } else {
    toast('Good try! +1 ❤️ +3 ⚡ +3 💎', { icon: '🎮' });
  }
};
```

**Example: Lesson Component**
```typescript
const handleLessonComplete = () => {
  // Mark lesson as complete
  markLessonComplete(lessonId);
  
  // Award stats
  rewardForActivity.curriculumLesson();
  
  // Show feedback
  toast.success('✅ Lesson completed! +2 ❤️ +5 ⚡ +5 💎');
};
```

### **Step 3: That's It!**

The header stats will update automatically thanks to:
- ✅ localStorage persistence
- ✅ Storage event listeners
- ✅ React state management

---

## 🔄 **RESET FUNCTIONALITY**

### **Reset Button Location**
- Top-right header
- Green 🔄 icon button
- Next to stats display

### **What It Does**
1. Shows confirmation dialog
2. Resets all stats to 0
3. Clears localStorage
4. Updates UI instantly

### **Use Cases**
- Testing new reward amounts
- Starting fresh progression
- Debugging stat issues
- Resetting after demo

---

## 📁 **FILE STRUCTURE**

```
frontend/
├── src/
│   ├── utils/
│   │   └── statsManager.ts          # Main reward system
│   ├── components/
│   │   └── Layout.tsx                # Header with live stats
│   └── examples/
│       └── GameRewardExample.tsx     # Integration examples
```

---

## 🧪 **TESTING THE SYSTEM**

### **Manual Testing**

1. **Start Fresh:**
   - Click green reset button
   - Confirm all stats are 0

2. **Test Quiz Reward:**
   ```typescript
   // In browser console or test component
   import { rewardForActivity } from './utils/statsManager';
   rewardForActivity.quiz(90);
   // Should see stats increase in header
   ```

3. **Test Game Reward:**
   ```typescript
   rewardForActivity.game(true);
   // Should see +3 ❤️ +10 ⚡ +15 💎
   ```

4. **Test Persistence:**
   - Earn some stats
   - Refresh the page
   - Stats should persist

5. **Test Reset:**
   - Click reset button
   - Confirm dialog
   - All stats should be 0

---

## 📱 **INTEGRATION CHECKLIST**

### **For Each Game/Quiz/Activity:**

- [ ] Import `rewardForActivity` from statsManager
- [ ] Identify completion trigger (e.g., quiz submit, game end)
- [ ] Call appropriate reward function
- [ ] Optional: Add toast notification
- [ ] Test that stats update in header
- [ ] Verify stats persist on refresh

### **Example Integration:**

```typescript
// ✅ BEFORE (no rewards)
const handleComplete = () => {
  setCompleted(true);
  navigate('/next');
};

// ✅ AFTER (with rewards)
const handleComplete = (score: number) => {
  // Award stats
  rewardForActivity.quiz(score);
  
  // Show feedback
  toast.success('Quiz completed! Stats earned!');
  
  // Continue as normal
  setCompleted(true);
  navigate('/next');
};
```

---

## 🎨 **UI/UX CONSIDERATIONS**

### **Visual Feedback**

**Good Practices:**
- ✅ Show toast notification when stats are earned
- ✅ Include what was earned (+2 ❤️ +5 ⚡ +5 💎)
- ✅ Use emoji for visual appeal
- ✅ Keep messages brief and positive

**Example Toast Messages:**
```typescript
// Excellent
toast.success('🎉 Perfect score! +5 ❤️ +10 ⚡ +10 💎');

// Good
toast.success('👍 Nice work! +3 ❤️ +7 ⚡ +5 💎');

// Participation
toast('Keep practicing! +1 ❤️ +2 ⚡ +2 💎', { icon: '📚' });
```

### **Stats Display**

Current header shows:
- ❤️ **Hearts** (red, with heart icon)
- ⚡ **Energy** + 💎 **Gems** (purple, in one badge)
- 🔄 **Reset button** (green)

---

## 🔧 **ADVANCED CUSTOMIZATION**

### **Adjust Reward Amounts**

Edit `src/utils/statsManager.ts`:

```typescript
export const rewardForActivity = {
  quiz: (score: number): void => {
    const hearts = Math.floor(score / 20); // Change divisor
    const energy = Math.floor(score / 10); // Adjust rate
    const gems = score >= 80 ? 15 : 10;    // Modify thresholds
    
    addHearts(hearts);
    addEnergy(energy);
    addGems(gems);
  },
  
  // ... customize other rewards
};
```

### **Add New Reward Types**

```typescript
export const rewardForActivity = {
  // ... existing rewards
  
  // New custom reward
  achievementUnlocked: (rarity: 'common' | 'rare' | 'legendary'): void => {
    const rewards = {
      common: { hearts: 1, energy: 5, gems: 10 },
      rare: { hearts: 3, energy: 15, gems: 30 },
      legendary: { hearts: 10, energy: 50, gems: 100 }
    };
    
    const reward = rewards[rarity];
    addHearts(reward.hearts);
    addEnergy(reward.energy);
    addGems(reward.gems);
  }
};
```

---

## 🐛 **TROUBLESHOOTING**

### **Issue: Stats not updating**

**Solution:**
1. Check browser console for errors
2. Verify import path is correct
3. Ensure function is called after activity completes
4. Check localStorage in DevTools

### **Issue: Stats reset unexpectedly**

**Solution:**
1. Check if user clicked reset button
2. Verify localStorage isn't being cleared elsewhere
3. Check for conflicting localStorage keys

### **Issue: Stats don't persist**

**Solution:**
1. Verify browser allows localStorage
2. Check for private/incognito mode
3. Test in different browser

---

## 📈 **FUTURE ENHANCEMENTS**

### **Potential Features:**

1. **Stat Usage System**
   - Spend hearts on continues
   - Use energy for powerups
   - Buy items with gems

2. **Leaderboards**
   - Track highest gem counts
   - Compare with friends
   - Weekly/monthly rankings

3. **Achievements**
   - Unlock badges for milestones
   - Earn bonus stats for achievements
   - Share achievements socially

4. **Progressive Rewards**
   - Increase rewards for higher levels
   - Bonus multipliers for streaks
   - Special events with double rewards

5. **Analytics**
   - Track which activities earn most stats
   - Monitor user progression
   - Identify popular features

---

## 🎓 **BEST PRACTICES**

### **DO:**
- ✅ Award stats immediately after activity completion
- ✅ Show clear feedback about what was earned
- ✅ Test reward amounts for balance
- ✅ Use consistent reward amounts across similar activities
- ✅ Make earning stats feel rewarding

### **DON'T:**
- ❌ Award stats before activity is truly complete
- ❌ Make rewards so easy that stats lose meaning
- ❌ Make rewards so hard that users get discouraged
- ❌ Forget to show users what they earned
- ❌ Change reward amounts without testing

---

## 📞 **SUPPORT**

**Questions?**
- Check `src/examples/GameRewardExample.tsx` for live examples
- Review `src/utils/statsManager.ts` for implementation details
- Test with the example component (add route to App.tsx)

**Need Help?**
- All reward logic is in one file: `statsManager.ts`
- Header logic is in: `Layout.tsx`
- Import and use - it's that simple!

---

## ✅ **SUMMARY**

### **What Changed:**
- ❤️ Hearts start at 0 (was 5)
- ⚡ Energy starts at 0 (was 5)
- 💎 Gems start at 0 (was 120)
- All stats must be earned through gameplay
- Reset button now resets to 0 (with confirmation)

### **What Was Added:**
- `statsManager.ts` - Complete reward system
- `GameRewardExample.tsx` - Integration examples
- Storage event listeners for real-time updates
- Confirmation dialog on reset

### **What to Do:**
1. Import `rewardForActivity` in your components
2. Call appropriate function when activity completes
3. Optionally show toast notification
4. Test and verify stats update correctly

---

**🚀 Stats system is now LIVE at:** https://nihonselfpacepractic.web.app/

**Start at 0, earn through gameplay, track your progress!** 🎮📈
