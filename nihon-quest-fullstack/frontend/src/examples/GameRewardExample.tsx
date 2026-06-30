/**
 * Example: How to integrate stat rewards into your games/quizzes
 * 
 * This example shows how to use the statsManager to award points
 * Copy this pattern into your existing game components
 */

import { rewardForActivity, resetStats } from '../utils/statsManager';
import toast from 'react-hot-toast';

export default function GameRewardExample() {
  // Reset handler (same as header button uses)
  const handleResetStats = () => {
    if (window.confirm('Reset all stats to 0?')) {
      resetStats();
      toast.success('🔄 Stats reset to 0!');
    }
  };
  // Example 1: Completing a quiz
  const handleQuizComplete = (quizScore: number) => {
    // Award stats based on quiz score
    rewardForActivity.quiz(quizScore);
    
    // Show feedback
    if (quizScore >= 80) {
      toast.success(`🎉 Great job! ${quizScore}% - Earned hearts, energy, and gems!`);
    } else if (quizScore >= 60) {
      toast.success(`👍 Good work! ${quizScore}% - Earned some rewards!`);
    } else {
      toast('Keep practicing! Earned small rewards.', { icon: '📚' });
    }
  };

  // Example 2: Completing a curriculum lesson
  const handleLessonComplete = () => {
    rewardForActivity.curriculumLesson();
    toast.success('✅ Lesson completed! +2 ❤️ +5 ⚡ +5 💎');
  };

  // Example 3: Winning/losing a game
  const handleGameEnd = (won: boolean) => {
    rewardForActivity.game(won);
    
    if (won) {
      toast.success('🏆 You won! +3 ❤️ +10 ⚡ +15 💎');
    } else {
      toast('Good try! +1 ❤️ +3 ⚡ +3 💎', { icon: '🎮' });
    }
  };

  // Example 4: Learning new words
  const handleNewWords = (wordCount: number) => {
    rewardForActivity.newWords(wordCount);
    toast.success(`📚 Learned ${wordCount} new words! +${wordCount} ⚡ +${wordCount * 2} 💎`);
  };

  // Example 5: Completing daily review
  const handleDailyReview = () => {
    rewardForActivity.dailyReview();
    toast.success('✅ Daily review completed! +1 ❤️ +3 ⚡ +3 💎');
  };

  // Example 6: Daily streak bonus
  const handleStreakBonus = (days: number) => {
    rewardForActivity.dailyStreak(days);
    toast.success(`🔥 ${days} day streak! +${days} ❤️ +${days * 2} ⚡ +${days * 5} 💎`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        📖 Game Reward System Examples
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-purple-600">Example 1: Quiz Completion</h2>
        <p className="text-gray-700">
          Award stats based on quiz performance (0-100%)
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => handleQuizComplete(90)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Complete Quiz (90%)
          </button>
          <button
            onClick={() => handleQuizComplete(70)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Complete Quiz (70%)
          </button>
          <button
            onClick={() => handleQuizComplete(50)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            Complete Quiz (50%)
          </button>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-mono text-sm">
            rewardForActivity.quiz(90) // Gives 4❤️ 9⚡ 10💎
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-purple-600">Example 2: Curriculum Lesson</h2>
        <p className="text-gray-700">
          Fixed reward for completing any curriculum lesson
        </p>
        <button
          onClick={handleLessonComplete}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
        >
          Complete Lesson
        </button>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-mono text-sm">
            rewardForActivity.curriculumLesson() // Gives 2❤️ 5⚡ 5💎
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-purple-600">Example 3: Game Win/Loss</h2>
        <p className="text-gray-700">
          Different rewards for winning vs. losing a game
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => handleGameEnd(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Win Game
          </button>
          <button
            onClick={() => handleGameEnd(false)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Lose Game
          </button>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-mono text-sm">
            rewardForActivity.game(true) // Win: 3❤️ 10⚡ 15💎<br />
            rewardForActivity.game(false) // Lose: 1❤️ 3⚡ 3💎
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-purple-600">Example 4: Learning New Words</h2>
        <p className="text-gray-700">
          Reward scales with number of words learned
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => handleNewWords(5)}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
          >
            Learn 5 Words
          </button>
          <button
            onClick={() => handleNewWords(10)}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
          >
            Learn 10 Words
          </button>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-mono text-sm">
            rewardForActivity.newWords(5) // 5⚡ 10💎
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-purple-600">Example 5: Daily Review</h2>
        <p className="text-gray-700">
          Small reward for daily practice consistency
        </p>
        <button
          onClick={handleDailyReview}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
        >
          Complete Daily Review
        </button>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-mono text-sm">
            rewardForActivity.dailyReview() // 1❤️ 3⚡ 3💎
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-purple-600">Example 6: Daily Streak Bonus</h2>
        <p className="text-gray-700">
          Escalating rewards for maintaining daily streaks
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => handleStreakBonus(7)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            7 Day Streak
          </button>
          <button
            onClick={() => handleStreakBonus(30)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            30 Day Streak
          </button>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-mono text-sm">
            rewardForActivity.dailyStreak(7) // 7❤️ 14⚡ 35💎<br />
            rewardForActivity.dailyStreak(30) // 30❤️ 60⚡ 150💎
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-purple-600">Example 7: Reset Stats</h2>
        <p className="text-gray-700">
          Programmatically reset all stats (same as header button)
        </p>
        <button
          onClick={handleResetStats}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
        >
          <span>🔄</span> Reset All Stats to 0
        </button>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-mono text-sm">
            import {'{ resetStats }'} from '../utils/statsManager';<br />
            resetStats(); // Resets ❤️ ⚡ 💎 to 0
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-6">
        <h3 className="text-xl font-bold mb-2">💡 Integration Tips</h3>
        <ul className="space-y-2 text-sm">
          <li>✅ Import: <code className="bg-black/20 px-2 py-1 rounded">import {'{ rewardForActivity, resetStats }'} from '../utils/statsManager'</code></li>
          <li>✅ Call the appropriate function when activity completes</li>
          <li>✅ Stats update automatically in the header</li>
          <li>✅ Use toast notifications to show what was earned</li>
          <li>✅ Stats persist across page reloads via localStorage</li>
          <li>✅ resetStats() is centralized - header button uses same function</li>
        </ul>
      </div>
    </div>
  );
}

/**
 * HOW TO USE IN YOUR EXISTING COMPONENTS:
 * 
 * 1. Import the reward function:
 *    import { rewardForActivity } from '@/utils/statsManager';
 * 
 * 2. Call it when activity completes:
 *    - Quiz: rewardForActivity.quiz(score)
 *    - Lesson: rewardForActivity.curriculumLesson()
 *    - Game: rewardForActivity.game(won)
 *    - Words: rewardForActivity.newWords(count)
 *    - Review: rewardForActivity.dailyReview()
 *    - Streak: rewardForActivity.dailyStreak(days)
 * 
 * 3. Optional: Show toast notification
 *    toast.success('Earned rewards!')
 * 
 * That's it! The header stats will update automatically.
 */
