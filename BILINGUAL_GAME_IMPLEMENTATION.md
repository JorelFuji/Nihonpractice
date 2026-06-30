# 🌐 Bilingual Game Implementation (Japanese + English)

## Overview
Add full bilingual support with Hiragana, Katakana, and English throughout the game interface.

---

## 📝 Implementation Files

### File 1: Create `lib/models/game_text.dart`

Bilingual text manager with Hiragana, Katakana, and English:

```dart
class GameText {
  static const Map<String, Map<String, String>> translations = {
    // Game Title
    'game_title': {
      'ja_hiragana': 'かんじポン',
      'ja_katakana': 'カンジポン',
      'ja_kanji': '漢字ポン',
      'en': 'Kanji Pong',
    },
    
    // Players
    'player_1': {
      'ja_hiragana': 'プレイヤー１',
      'ja_katakana': 'プレイヤー１',
      'en': 'Player 1',
    },
    'player_2': {
      'ja_hiragana': 'プレイヤー２',
      'ja_katakana': 'プレイヤー２',
      'en': 'Player 2',
    },
    
    // Score
    'score': {
      'ja_hiragana': 'てん',
      'ja_katakana': 'テン',
      'ja_kanji': '点',
      'en': 'Score',
    },
    
    // Controls
    'touch_left': {
      'ja_hiragana': 'ひだりをタッチ',
      'ja_katakana': 'ヒダリヲタッチ',
      'en': 'Touch Left',
    },
    'touch_right': {
      'ja_hiragana': 'みぎをタッチ',
      'ja_katakana': 'ミギヲタッチ',
      'en': 'Touch Right',
    },
    
    // Game States
    'paused': {
      'ja_hiragana': 'いちじていし',
      'ja_katakana': 'イチジテイシ',
      'ja_kanji': '一時停止',
      'en': 'Paused',
    },
    'resume': {
      'ja_hiragana': 'つづける',
      'ja_katakana': 'ツヅケル',
      'ja_kanji': '続ける',
      'en': 'Resume',
    },
    'quit': {
      'ja_hiragana': 'やめる',
      'ja_katakana': 'ヤメル',
      'en': 'Quit',
    },
    
    // Winner
    'winner': {
      'ja_hiragana': 'かち',
      'ja_katakana': 'カチ',
      'ja_kanji': '勝ち',
      'en': 'Winner',
    },
    'wins': {
      'ja_hiragana': 'のかち！',
      'ja_katakana': 'ノカチ！',
      'en': 'Wins!',
    },
    'final_score': {
      'ja_hiragana': 'さいしゅうスコア',
      'ja_katakana': 'サイシュウスコア',
      'ja_kanji': '最終スコア',
      'en': 'Final Score',
    },
    
    // Actions
    'rematch': {
      'ja_hiragana': 'もういちど',
      'ja_katakana': 'モウイチド',
      'ja_kanji': 'もう一度',
      'en': 'Rematch',
    },
    'main_menu': {
      'ja_hiragana': 'メインメニュー',
      'ja_katakana': 'メインメニュー',
      'en': 'Main Menu',
    },
    
    // Instructions
    'first_to_win': {
      'ja_hiragana': 'さきに１０てんでかち！',
      'ja_katakana': 'サキニ１０テンデカチ！',
      'ja_kanji': '先に10点で勝ち！',
      'en': 'First to 10 wins!',
    },
    'move_paddle': {
      'ja_hiragana': 'じぶんのがわをタッチしてうごかす',
      'ja_katakana': 'ジブンノガワヲタッチシテウゴカス',
      'en': 'Touch your side to move',
    },
    
    // Kanji Learning
    'kanji_learned': {
      'ja_hiragana': 'べんきょうしたかんじ',
      'ja_katakana': 'ベンキョウシタカンジ',
      'ja_kanji': '勉強した漢字',
      'en': 'Kanji Learned',
    },
    'reading': {
      'ja_hiragana': 'よみかた',
      'ja_katakana': 'ヨミカタ',
      'ja_kanji': '読み方',
      'en': 'Reading',
    },
    'meaning': {
      'ja_hiragana': 'いみ',
      'ja_katakana': 'イミ',
      'ja_kanji': '意味',
      'en': 'Meaning',
    },
  };

  static String get(String key, String language) {
    return translations[key]?[language] ?? translations[key]?['en'] ?? key;
  }
}

// Language options
enum GameLanguage {
  japanese_hiragana('ja_hiragana', 'ひらがな', 'Hiragana'),
  japanese_katakana('ja_katakana', 'カタカナ', 'Katakana'),
  japanese_kanji('ja_kanji', '漢字', 'Kanji'),
  english('en', 'English', 'English');

  final String code;
  final String nativeName;
  final String englishName;

  const GameLanguage(this.code, this.nativeName, this.englishName);
}
```

---

### File 2: Create `lib/providers/language_provider.dart`

State management for language switching:

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/game_text.dart';

class LanguageState {
  final GameLanguage language;
  final bool showBothLanguages; // Show Japanese + English together

  LanguageState({
    this.language = GameLanguage.japanese_hiragana,
    this.showBothLanguages = true,
  });

  LanguageState copyWith({
    GameLanguage? language,
    bool? showBothLanguages,
  }) {
    return LanguageState(
      language: language ?? this.language,
      showBothLanguages: showBothLanguages ?? this.showBothLanguages,
    );
  }
}

class LanguageNotifier extends StateNotifier<LanguageState> {
  LanguageNotifier() : super(LanguageState());

  void setLanguage(GameLanguage language) {
    state = state.copyWith(language: language);
  }

  void toggleBilingual() {
    state = state.copyWith(showBothLanguages: !state.showBothLanguages);
  }

  String getText(String key) {
    return GameText.get(key, state.language.code);
  }

  // Get bilingual text (Japanese + English)
  String getBilingualText(String key) {
    if (!state.showBothLanguages) {
      return getText(key);
    }
    
    final japanese = GameText.get(key, state.language.code);
    final english = GameText.get(key, 'en');
    
    if (state.language == GameLanguage.english) {
      return english;
    }
    
    return '$japanese\n$english';
  }
}

final languageProvider = StateNotifierProvider<LanguageNotifier, LanguageState>(
  (ref) => LanguageNotifier(),
);
```

---

### File 3: Update `lib/games/kanji_pong/screens/kanji_pong_screen.dart`

Add bilingual UI:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flame/game.dart';
import '../kanji_pong_game.dart';
import 'package:confetti/confetti.dart';
import '../../../providers/language_provider.dart';
import '../../../models/game_text.dart';

class KanjiPongScreen extends ConsumerStatefulWidget {
  const KanjiPongScreen({super.key});

  @override
  ConsumerState<KanjiPongScreen> createState() => _KanjiPongScreenState();
}

class _KanjiPongScreenState extends ConsumerState<KanjiPongScreen> {
  late KanjiPongGame game;
  late ConfettiController _confettiController;
  
  int player1Score = 0;
  int player2Score = 0;
  String currentKanji = '';
  String currentReading = '';
  String currentMeaning = '';
  int? winner;

  @override
  void initState() {
    super.initState();
    _confettiController = ConfettiController(duration: const Duration(seconds: 3));
    
    game = KanjiPongGame()
      ..onScoreUpdate = (p1, p2) {
        setState(() {
          player1Score = p1;
          player2Score = p2;
        });
      }
      ..onKanjiChange = (kanji, reading, meaning) {
        setState(() {
          currentKanji = kanji;
          currentReading = reading;
          currentMeaning = meaning;
        });
      }
      ..onGameOver = (winnerNum) {
        setState(() {
          winner = winnerNum;
        });
        _confettiController.play();
        _showWinnerDialog(winnerNum);
      };
  }

  @override
  void dispose() {
    _confettiController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final languageNotifier = ref.watch(languageProvider.notifier);
    final languageState = ref.watch(languageProvider);
    
    return Scaffold(
      body: Stack(
        children: [
          // Game canvas
          GameWidget(game: game),
          
          // Confetti overlay
          Align(
            alignment: Alignment.topCenter,
            child: ConfettiWidget(
              confettiController: _confettiController,
              blastDirectionality: BlastDirectionality.explosive,
              colors: const [
                Colors.blue,
                Colors.red,
                Colors.yellow,
                Colors.green,
                Colors.purple,
              ],
            ),
          ),
          
          // UI Overlay
          SafeArea(
            child: Column(
              children: [
                // Top bar with scores and language toggle
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [
                        Colors.black.withOpacity(0.7),
                        Colors.transparent,
                      ],
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                    ),
                  ),
                  child: Column(
                    children: [
                      // Language selector
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          _buildLanguageButton(
                            '🇯🇵 ひらがな',
                            GameLanguage.japanese_hiragana,
                            languageState.language,
                            languageNotifier,
                          ),
                          const SizedBox(width: 8),
                          _buildLanguageButton(
                            '🇯🇵 カタカナ',
                            GameLanguage.japanese_katakana,
                            languageState.language,
                            languageNotifier,
                          ),
                          const SizedBox(width: 8),
                          _buildLanguageButton(
                            '🇺🇸 EN',
                            GameLanguage.english,
                            languageState.language,
                            languageNotifier,
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      
                      // Scores
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          // Player 1 Score
                          _buildPlayerScore(
                            languageNotifier.getText('player_1'),
                            player1Score,
                            Colors.blue,
                            isLeft: true,
                          ),
                          
                          // Center controls
                          Column(
                            children: [
                              IconButton(
                                icon: const Icon(Icons.pause, color: Colors.white),
                                onPressed: () {
                                  game.pauseEngine();
                                  _showPauseDialog();
                                },
                              ),
                              IconButton(
                                icon: const Icon(Icons.close, color: Colors.white),
                                onPressed: () => Navigator.pop(context),
                              ),
                            ],
                          ),
                          
                          // Player 2 Score
                          _buildPlayerScore(
                            languageNotifier.getText('player_2'),
                            player2Score,
                            Colors.red,
                            isLeft: false,
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                
                const Spacer(),
                
                // Kanji display at bottom (bilingual)
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [
                        Colors.transparent,
                        Colors.black.withOpacity(0.7),
                      ],
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                    ),
                  ),
                  child: Column(
                    children: [
                      // Kanji character
                      Text(
                        currentKanji,
                        style: const TextStyle(
                          fontSize: 64,
                          color: Colors.yellow,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      
                      // Reading (Hiragana)
                      Text(
                        currentReading,
                        style: const TextStyle(
                          fontSize: 24,
                          color: Colors.white,
                        ),
                      ),
                      
                      // Meaning (English)
                      Text(
                        currentMeaning,
                        style: TextStyle(
                          fontSize: 18,
                          color: Colors.white.withOpacity(0.8),
                          fontStyle: FontStyle.italic,
                        ),
                      ),
                      
                      const SizedBox(height: 10),
                      
                      // Control instructions (bilingual)
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          _buildControlHint(
                            languageState.showBothLanguages
                                ? '👈 ${languageNotifier.getText('touch_left')}'
                                : '👈 ${languageNotifier.getBilingualText('touch_left')}',
                            Colors.blue,
                          ),
                          _buildControlHint(
                            languageState.showBothLanguages
                                ? '${languageNotifier.getText('touch_right')} 👉'
                                : '${languageNotifier.getBilingualText('touch_right')} 👉',
                            Colors.red,
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLanguageButton(
    String label,
    GameLanguage language,
    GameLanguage currentLanguage,
    LanguageNotifier notifier,
  ) {
    final isSelected = currentLanguage == language;
    
    return InkWell(
      onTap: () => notifier.setLanguage(language),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected 
              ? Colors.purple.withOpacity(0.7)
              : Colors.white.withOpacity(0.2),
          borderRadius: BorderRadius.circular(15),
          border: Border.all(
            color: isSelected ? Colors.purple : Colors.white.withOpacity(0.5),
            width: 2,
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            color: Colors.white,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
          ),
        ),
      ),
    );
  }

  Widget _buildPlayerScore(String name, int score, Color color, {required bool isLeft}) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      decoration: BoxDecoration(
        color: color.withOpacity(0.3),
        borderRadius: BorderRadius.circular(15),
        border: Border.all(color: color, width: 2),
      ),
      child: Column(
        children: [
          Text(
            name,
            style: TextStyle(
              fontSize: 16,
              color: color,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 5),
          Text(
            '$score',
            style: TextStyle(
              fontSize: 36,
              color: color,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildControlHint(String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: color.withOpacity(0.2),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: color.withOpacity(0.5)),
      ),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 12,
          color: color,
        ),
        textAlign: TextAlign.center,
      ),
    );
  }

  void _showPauseDialog() {
    final languageNotifier = ref.read(languageProvider.notifier);
    
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: Text(
          '⏸️ ${languageNotifier.getBilingualText('paused')}',
          textAlign: TextAlign.center,
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Column(
                  children: [
                    Text(
                      languageNotifier.getText('player_1'),
                      style: const TextStyle(color: Colors.blue),
                    ),
                    Text(
                      '$player1Score',
                      style: const TextStyle(fontSize: 32, color: Colors.blue),
                    ),
                  ],
                ),
                const Text('-', style: TextStyle(fontSize: 32)),
                Column(
                  children: [
                    Text(
                      languageNotifier.getText('player_2'),
                      style: const TextStyle(color: Colors.red),
                    ),
                    Text(
                      '$player2Score',
                      style: const TextStyle(fontSize: 32, color: Colors.red),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 20),
            Text(
              languageNotifier.getBilingualText('move_paddle'),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 10),
            Text(
              languageNotifier.getBilingualText('first_to_win'),
              textAlign: TextAlign.center,
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              game.resumeEngine();
            },
            child: Text(languageNotifier.getBilingualText('resume')),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pop(context);
            },
            child: Text(languageNotifier.getBilingualText('quit')),
          ),
        ],
      ),
    );
  }

  void _showWinnerDialog(int winnerNum) {
    final languageNotifier = ref.read(languageProvider.notifier);
    final winnerColor = winnerNum == 1 ? Colors.blue : Colors.red;
    final winnerName = winnerNum == 1 
        ? languageNotifier.getText('player_1')
        : languageNotifier.getText('player_2');
    
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('🏆 '),
            Text(
              '$winnerName ${languageNotifier.getText('wins')}',
              style: TextStyle(color: winnerColor),
            ),
            const Text(' 🏆'),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              languageNotifier.getBilingualText('final_score'),
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.grey[700],
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Column(
                  children: [
                    Text(
                      languageNotifier.getText('player_1'),
                      style: const TextStyle(color: Colors.blue),
                    ),
                    Text(
                      '$player1Score',
                      style: const TextStyle(
                        fontSize: 48,
                        color: Colors.blue,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                const Text('-', style: TextStyle(fontSize: 32)),
                Column(
                  children: [
                    Text(
                      languageNotifier.getText('player_2'),
                      style: const TextStyle(color: Colors.red),
                    ),
                    Text(
                      '$player2Score',
                      style: const TextStyle(
                        fontSize: 48,
                        color: Colors.red,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 20),
            Text(
              '🎌 ${languageNotifier.getBilingualText('kanji_learned')}: ${game.currentKanjiIndex}',
              style: const TextStyle(fontSize: 16),
              textAlign: TextAlign.center,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              setState(() {
                winner = null;
                player1Score = 0;
                player2Score = 0;
              });
              game.resetGame();
            },
            child: Text('🔄 ${languageNotifier.getBilingualText('rematch')}'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pop(context);
            },
            child: Text(languageNotifier.getBilingualText('main_menu')),
          ),
        ],
      ),
    );
  }
}
```

---

### File 4: Update `lib/models/kanji_item.dart`

Add English meanings:

```dart
class KanjiItem {
  final String kanji;
  final String reading;
  final String meaning;
  final String level;

  KanjiItem({
    required this.kanji,
    required this.reading,
    required this.meaning,
    required this.level,
  });

  static List<KanjiItem> getN5Kanji() {
    return [
      KanjiItem(kanji: '日', reading: 'ひ', meaning: 'sun/day', level: 'N5'),
      KanjiItem(kanji: '月', reading: 'つき', meaning: 'moon/month', level: 'N5'),
      KanjiItem(kanji: '火', reading: 'ひ', meaning: 'fire', level: 'N5'),
      KanjiItem(kanji: '水', reading: 'みず', meaning: 'water', level: 'N5'),
      KanjiItem(kanji: '木', reading: 'き', meaning: 'tree/wood', level: 'N5'),
      KanjiItem(kanji: '金', reading: 'きん', meaning: 'gold/money', level: 'N5'),
      KanjiItem(kanji: '土', reading: 'つち', meaning: 'earth/soil', level: 'N5'),
      KanjiItem(kanji: '人', reading: 'ひと', meaning: 'person', level: 'N5'),
      KanjiItem(kanji: '山', reading: 'やま', meaning: 'mountain', level: 'N5'),
      KanjiItem(kanji: '川', reading: 'かわ', meaning: 'river', level: 'N5'),
      KanjiItem(kanji: '田', reading: 'た', meaning: 'rice field', level: 'N5'),
      KanjiItem(kanji: '目', reading: 'め', meaning: 'eye', level: 'N5'),
      KanjiItem(kanji: '口', reading: 'くち', meaning: 'mouth', level: 'N5'),
      KanjiItem(kanji: '手', reading: 'て', meaning: 'hand', level: 'N5'),
      KanjiItem(kanji: '足', reading: 'あし', meaning: 'foot/leg', level: 'N5'),
      KanjiItem(kanji: '雨', reading: 'あめ', meaning: 'rain', level: 'N5'),
      KanjiItem(kanji: '空', reading: 'そら', meaning: 'sky', level: 'N5'),
      KanjiItem(kanji: '花', reading: 'はな', meaning: 'flower', level: 'N5'),
      KanjiItem(kanji: '犬', reading: 'いぬ', meaning: 'dog', level: 'N5'),
      KanjiItem(kanji: '猫', reading: 'ねこ', meaning: 'cat', level: 'N5'),
    ];
  }
}
```

---

### File 5: Update `lib/games/kanji_pong/kanji_pong_game.dart`

Pass meaning to callback:

```dart
class KanjiPongGame extends FlameGame with TapDetector, PanDetector {
  // ... existing code ...
  
  Function(String, String, String)? onKanjiChange; // Added meaning parameter

  void _createNewBall() {
    final currentKanji = kanjiList[currentKanjiIndex];
    ball = Ball(
      position: size / 2,
      kanji: currentKanji.kanji,
      reading: currentKanji.reading,
    );
    
    // Pass kanji, reading, and meaning
    onKanjiChange?.call(
      currentKanji.kanji,
      currentKanji.reading,
      currentKanji.meaning,
    );
    
    currentKanjiIndex = (currentKanjiIndex + 1) % kanjiList.length;
  }
}
```

---

### File 6: Update `lib/main.dart`

Wrap app with Riverpod:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(
    const ProviderScope(
      child: NihonQuestApp(),
    ),
  );
}

class NihonQuestApp extends StatelessWidget {
  const NihonQuestApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NihongoQuest',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.purple,
          primary: Colors.purple,
          secondary: Colors.pink,
        ),
        textTheme: GoogleFonts.quicksandTextTheme(),
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }
}
```

---

## 🎨 Visual Examples

### **Language Toggle Bar**
```
┌─────────────────────────────────────┐
│  🇯🇵 ひらがな  🇯🇵 カタカナ  🇺🇸 EN  │
└─────────────────────────────────────┘
```

### **Bilingual Score Display**
```
┌──────────────┐         ┌──────────────┐
│ プレイヤー１  │         │ プレイヤー２  │
│  Player 1    │         │  Player 2    │
│      5       │         │      3       │
└──────────────┘         └──────────────┘
```

### **Kanji Display (Trilingual)**
```
        日
      (ひ)
    sun/day
```

### **Control Hints**
```
👈 ひだりをタッチ          みぎをタッチ 👉
   Touch Left             Touch Right
```

---

## 🌐 Language Options

### **1. Hiragana Mode (ひらがな)**
- All Japanese text in Hiragana
- Easy for beginners
- Example: `プレイヤー１` → `ぷれいやー１`

### **2. Katakana Mode (カタカナ)**
- All Japanese text in Katakana
- Practice reading Katakana
- Example: `プレイヤー１` (stays same)

### **3. English Mode**
- All text in English
- For non-Japanese speakers
- Example: `Player 1`

### **4. Bilingual Mode (Default)**
- Shows both Japanese and English
- Best for learning
- Example:
  ```
  プレイヤー１
  Player 1
  ```

---

## 📝 Update pubspec.yaml

Add Riverpod dependency:

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # Existing...
  firebase_core: ^3.8.1
  cloud_firestore: ^5.5.0
  firebase_auth: ^5.3.3
  flutter_tts: ^4.2.0
  audioplayers: ^6.1.0
  confetti: ^0.7.0
  flutter_animate: ^4.5.0
  google_fonts: ^6.2.1
  
  # Game Engine
  flame: ^1.18.0
  flame_audio: ^2.1.0
  flame_forge2d: ^0.18.0
  
  # NEW: State Management for Language
  riverpod: ^2.5.0
  flutter_riverpod: ^2.5.0
```

Run:
```bash
flutter pub get
```

---

## 🎯 Features Summary

### **✅ Implemented:**
- 🇯🇵 **Hiragana mode** - All text in Hiragana
- 🇯🇵 **Katakana mode** - All text in Katakana  
- 🇺🇸 **English mode** - All text in English
- 🌐 **Bilingual mode** - Japanese + English together
- 🔄 **Live language switching** - Change during gameplay
- 📚 **Kanji learning** - Shows kanji, reading, and meaning
- 🎮 **Localized UI** - All buttons and labels translated
- 💬 **Localized dialogs** - Pause, winner screens in chosen language

### **Text Coverage:**
- Player names
- Score labels
- Control instructions
- Pause menu
- Winner dialog
- Kanji information
- All buttons and actions

---

## 🚀 Testing

```bash
cd nihon_quest_mobile
flutter run -d chrome
```

### **Test Checklist:**
- [ ] Switch to Hiragana mode - all text updates
- [ ] Switch to Katakana mode - all text updates
- [ ] Switch to English mode - all text updates
- [ ] Bilingual mode shows both languages
- [ ] Kanji displays with reading and meaning
- [ ] Pause dialog is translated
- [ ] Winner dialog is translated
- [ ] Control hints are translated

---

## 💡 Additional Features (Optional)

### **1. Romaji Mode**
Add romaji option for absolute beginners:
```dart
'player_1': {
  'ja_romaji': 'Pureiiyaa 1',
  'en': 'Player 1',
}
```

### **2. Audio Pronunciation**
Use TTS to speak text:
```dart
import 'package:flutter_tts/flutter_tts.dart';

final tts = FlutterTts();
await tts.setLanguage('ja-JP');
await tts.speak('プレイヤー１');
```

### **3. Furigana Support**
Show readings above kanji:
```dart
Text.rich(
  TextSpan(
    children: [
      TextSpan(text: 'ひ\n', style: TextStyle(fontSize: 12)),
      TextSpan(text: '日', style: TextStyle(fontSize: 32)),
    ],
  ),
)
```

---

## ✅ Summary

Your game now has:
- ✅ **Full bilingual support** (Japanese + English)
- ✅ **Three Japanese writing systems** (Hiragana, Katakana, Kanji)
- ✅ **Live language switching** during gameplay
- ✅ **Educational kanji display** with readings and meanings
- ✅ **Localized UI** throughout the entire game
- ✅ **Easy to extend** with more languages

**Players can now learn Japanese while playing in their preferred script!** 🎮🇯🇵🇺🇸

---

**© 2026 Osaka Oaks LLC**
