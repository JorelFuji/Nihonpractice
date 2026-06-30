/**
 * Stats Manager - Utilities for managing player stats
 * Use these functions to award hearts, energy, and gems based on gameplay
 */

export interface PlayerStats {
  hearts: number;
  energy: number;
  gems: number;
}

/**
 * Get current stats from localStorage
 */
export const getStats = (): PlayerStats => {
  const hearts = Number(localStorage.getItem('hearts') || '0');
  const energy = Number(localStorage.getItem('energy') || '0');
  const gems = Number(localStorage.getItem('gems') || '0');
  
  return { hearts, energy, gems };
};

/**
 * Add hearts to player's total
 * @param amount - Number of hearts to add
 */
export const addHearts = (amount: number): void => {
  const current = Number(localStorage.getItem('hearts') || '0');
  const newTotal = current + amount;
  localStorage.setItem('hearts', newTotal.toString());
  
  // Trigger storage event for cross-tab sync
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'hearts',
    newValue: newTotal.toString(),
  }));
};

/**
 * Add energy to player's total
 * @param amount - Number of energy points to add
 */
export const addEnergy = (amount: number): void => {
  const current = Number(localStorage.getItem('energy') || '0');
  const newTotal = current + amount;
  localStorage.setItem('energy', newTotal.toString());
  
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'energy',
    newValue: newTotal.toString(),
  }));
};

/**
 * Add gems to player's total
 * @param amount - Number of gems to add
 */
export const addGems = (amount: number): void => {
  const current = Number(localStorage.getItem('gems') || '0');
  const newTotal = current + amount;
  localStorage.setItem('gems', newTotal.toString());
  
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'gems',
    newValue: newTotal.toString(),
  }));
};

/**
 * Award stats based on activity completion
 */
export const rewardForActivity = {
  /**
   * Reward for completing a quiz
   * @param score - Quiz score (0-100)
   */
  quiz: (score: number): void => {
    const hearts = Math.floor(score / 20); // 0-5 hearts
    const energy = Math.floor(score / 10); // 0-10 energy
    const gems = score >= 80 ? 10 : score >= 60 ? 5 : 2;
    
    addHearts(hearts);
    addEnergy(energy);
    addGems(gems);
  },

  /**
   * Reward for completing curriculum lesson
   */
  curriculumLesson: (): void => {
    addHearts(2);
    addEnergy(5);
    addGems(5);
  },

  /**
   * Reward for completing a game
   * @param won - Whether the player won
   */
  game: (won: boolean): void => {
    if (won) {
      addHearts(3);
      addEnergy(10);
      addGems(15);
    } else {
      addHearts(1);
      addEnergy(3);
      addGems(3);
    }
  },

  /**
   * Reward for daily streak
   * @param days - Number of consecutive days
   */
  dailyStreak: (days: number): void => {
    const bonus = Math.min(days, 30); // Cap at 30 days
    addHearts(bonus);
    addEnergy(bonus * 2);
    addGems(bonus * 5);
  },

  /**
   * Reward for learning new words
   * @param count - Number of new words learned
   */
  newWords: (count: number): void => {
    addEnergy(count);
    addGems(count * 2);
  },

  /**
   * Reward for completing daily reviews
   */
  dailyReview: (): void => {
    addHearts(1);
    addEnergy(3);
    addGems(3);
  },
};

/**
 * Reset all stats to 0
 * This is used by the reset button in the header and can be called programmatically
 */
export const resetStats = (): void => {
  localStorage.setItem('hearts', '0');
  localStorage.setItem('energy', '0');
  localStorage.setItem('gems', '0');
  
  // Trigger events for UI update across all components
  window.dispatchEvent(new StorageEvent('storage', { key: 'hearts', newValue: '0' }));
  window.dispatchEvent(new StorageEvent('storage', { key: 'energy', newValue: '0' }));
  window.dispatchEvent(new StorageEvent('storage', { key: 'gems', newValue: '0' }));
  
  console.log('📊 Stats reset to 0: ❤️ 0 | ⚡ 0 | 💎 0');
};

/**
 * Example usage in game components:
 * 
 * import { rewardForActivity, resetStats } from '@/utils/statsManager';
 * 
 * // After completing a quiz with 85% score
 * rewardForActivity.quiz(85);
 * 
 * // After winning a game
 * rewardForActivity.game(true);
 * 
 * // After completing a lesson
 * rewardForActivity.curriculumLesson();
 * 
 * // After daily login
 * rewardForActivity.dailyStreak(7);
 * 
 * // Reset all stats (integrated with header button)
 * resetStats();
 */
