import 'package:shared_preferences/shared_preferences.dart';

class ProgressService {
  static final ProgressService _instance = ProgressService._internal();
  factory ProgressService() => _instance;
  ProgressService._internal();

  SharedPreferences? _prefs;

  Future<void> initialize() async {
    _prefs ??= await SharedPreferences.getInstance();
  }

  // Save high score for a game
  Future<void> saveHighScore(String gameName, int score) async {
    await initialize();
    final currentHighScore = await getHighScore(gameName);
    if (score > currentHighScore) {
      await _prefs!.setInt('highscore_$gameName', score);
    }
  }

  // Get high score for a game
  Future<int> getHighScore(String gameName) async {
    await initialize();
    return _prefs!.getInt('highscore_$gameName') ?? 0;
  }

  // Save last score
  Future<void> saveLastScore(String gameName, int score) async {
    await initialize();
    await _prefs!.setInt('lastscore_$gameName', score);
  }

  // Get last score
  Future<int> getLastScore(String gameName) async {
    await initialize();
    return _prefs!.getInt('lastscore_$gameName') ?? 0;
  }

  // Increment games played
  Future<void> incrementGamesPlayed(String gameName) async {
    await initialize();
    final count = await getGamesPlayed(gameName);
    await _prefs!.setInt('gamesplayed_$gameName', count + 1);
  }

  // Get games played count
  Future<int> getGamesPlayed(String gameName) async {
    await initialize();
    return _prefs!.getInt('gamesplayed_$gameName') ?? 0;
  }

  // Get total games played across all games
  Future<int> getTotalGamesPlayed() async {
    await initialize();
    final games = [
      'hiragana_match',
      'katakana_match',
      'memory_game',
      'character_trace',
      'puzzle_slide',
      'fast_tap'
    ];
    
    int total = 0;
    for (final game in games) {
      total += await getGamesPlayed(game);
    }
    return total;
  }

  // Save win count
  Future<void> incrementWins(String gameName) async {
    await initialize();
    final count = await getWinCount(gameName);
    await _prefs!.setInt('wins_$gameName', count + 1);
  }

  // Get win count
  Future<int> getWinCount(String gameName) async {
    await initialize();
    return _prefs!.getInt('wins_$gameName') ?? 0;
  }

  // Save best time (in seconds)
  Future<void> saveBestTime(String gameName, int seconds) async {
    await initialize();
    final currentBest = await getBestTime(gameName);
    if (currentBest == 0 || seconds < currentBest) {
      await _prefs!.setInt('besttime_$gameName', seconds);
    }
  }

  // Get best time
  Future<int> getBestTime(String gameName) async {
    await initialize();
    return _prefs!.getInt('besttime_$gameName') ?? 0;
  }

  // Achievement tracking
  Future<void> unlockAchievement(String achievementId) async {
    await initialize();
    await _prefs!.setBool('achievement_$achievementId', true);
  }

  // Check if achievement is unlocked
  Future<bool> isAchievementUnlocked(String achievementId) async {
    await initialize();
    return _prefs!.getBool('achievement_$achievementId') ?? false;
  }

  // Get all unlocked achievements
  Future<List<String>> getUnlockedAchievements() async {
    await initialize();
    final achievements = [
      'first_match',
      'perfect_game',
      'speed_demon',
      'memory_master',
      'five_game_streak',
      'hiragana_master',
      'katakana_master',
    ];
    
    final unlocked = <String>[];
    for (final achievement in achievements) {
      if (await isAchievementUnlocked(achievement)) {
        unlocked.add(achievement);
      }
    }
    return unlocked;
  }

  // Save streak count
  Future<void> saveStreak(int streak) async {
    await initialize();
    await _prefs!.setInt('current_streak', streak);
  }

  // Get current streak
  Future<int> getStreak() async {
    await initialize();
    return _prefs!.getInt('current_streak') ?? 0;
  }

  // Reset all progress (for testing or fresh start)
  Future<void> resetAllProgress() async {
    await initialize();
    await _prefs!.clear();
  }

  // Get game statistics
  Future<Map<String, dynamic>> getGameStats(String gameName) async {
    return {
      'highScore': await getHighScore(gameName),
      'lastScore': await getLastScore(gameName),
      'gamesPlayed': await getGamesPlayed(gameName),
      'wins': await getWinCount(gameName),
      'bestTime': await getBestTime(gameName),
    };
  }

  // Get overall player statistics
  Future<Map<String, dynamic>> getOverallStats() async {
    return {
      'totalGamesPlayed': await getTotalGamesPlayed(),
      'currentStreak': await getStreak(),
      'achievementsUnlocked': (await getUnlockedAchievements()).length,
      'hiraganaHighScore': await getHighScore('hiragana_match'),
      'katakanaHighScore': await getHighScore('katakana_match'),
      'memoryHighScore': await getHighScore('memory_game'),
    };
  }
}
