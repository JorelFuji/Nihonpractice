# 🏓 Quick Start: Kanji Pong Implementation

## Step 1: Update pubspec.yaml

Add these dependencies to your `nihon_quest_mobile/pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # Existing dependencies...
  cupertino_icons: ^1.0.8
  firebase_core: ^3.8.1
  cloud_firestore: ^5.5.0
  firebase_auth: ^5.3.3
  flutter_tts: ^4.2.0
  audioplayers: ^6.1.0
  confetti: ^0.7.0
  flutter_animate: ^4.5.0
  google_fonts: ^6.2.1
  
  # NEW: Game Engine
  flame: ^1.18.0
  flame_audio: ^2.1.0
  flame_forge2d: ^0.18.0
  
  # NEW: State Management
  riverpod: ^2.5.0
  flutter_riverpod: ^2.5.0
  
  # NEW: Animations
  rive: ^0.13.0
  lottie: ^3.1.0
  
  # NEW: Local Storage
  hive: ^2.2.3
  hive_flutter: ^1.1.0
  
  # NEW: Speech Recognition (Optional)
  speech_to_text: ^7.0.0
```

Run:
```bash
cd nihon_quest_mobile
flutter pub get
```

---

## Step 2: Create Game Structure

Create these new directories and files:

```
lib/
├── games/
│   └── kanji_pong/
│       ├── kanji_pong_game.dart
│       ├── components/
│       │   ├── paddle.dart
│       │   ├── ball.dart
│       │   ├── score_display.dart
│       │   └── kanji_display.dart
│       └── screens/
│           └── kanji_pong_screen.dart
├── providers/
│   └── game_state_provider.dart
└── models/
    └── kanji_item.dart
```

---

## Step 3: Implementation Files

### File 1: `lib/models/kanji_item.dart`

```dart
class KanjiItem {
  final String kanji;
  final String reading;
  final String meaning;
  final String level; // N5, N4, N3, N2, N1

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
    ];
  }
}
```

### File 2: `lib/providers/game_state_provider.dart`

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

class GameState {
  final int playerScore;
  final int aiScore;
  final int streak;
  final bool isPaused;
  final String currentKanji;
  final String currentReading;

  GameState({
    this.playerScore = 0,
    this.aiScore = 0,
    this.streak = 0,
    this.isPaused = false,
    this.currentKanji = '',
    this.currentReading = '',
  });

  GameState copyWith({
    int? playerScore,
    int? aiScore,
    int? streak,
    bool? isPaused,
    String? currentKanji,
    String? currentReading,
  }) {
    return GameState(
      playerScore: playerScore ?? this.playerScore,
      aiScore: aiScore ?? this.aiScore,
      streak: streak ?? this.streak,
      isPaused: isPaused ?? this.isPaused,
      currentKanji: currentKanji ?? this.currentKanji,
      currentReading: currentReading ?? this.currentReading,
    );
  }
}

class GameStateNotifier extends StateNotifier<GameState> {
  GameStateNotifier() : super(GameState());

  void incrementPlayerScore() {
    state = state.copyWith(
      playerScore: state.playerScore + 1,
      streak: state.streak + 1,
    );
  }

  void incrementAIScore() {
    state = state.copyWith(
      aiScore: state.aiScore + 1,
      streak: 0,
    );
  }

  void updateKanji(String kanji, String reading) {
    state = state.copyWith(
      currentKanji: kanji,
      currentReading: reading,
    );
  }

  void togglePause() {
    state = state.copyWith(isPaused: !state.isPaused);
  }

  void reset() {
    state = GameState();
  }
}

final gameStateProvider = StateNotifierProvider<GameStateNotifier, GameState>(
  (ref) => GameStateNotifier(),
);
```

### File 3: `lib/games/kanji_pong/components/paddle.dart`

```dart
import 'package:flame/components.dart';
import 'package:flame/collisions.dart';
import 'package:flutter/material.dart';

class Paddle extends PositionComponent with CollisionCallbacks {
  final bool isPlayer;
  double speed = 300.0;
  Paint paint = Paint()..color = Colors.white;

  Paddle({
    required Vector2 position,
    required this.isPlayer,
  }) : super(
          position: position,
          size: Vector2(20, 100),
          anchor: Anchor.center,
        );

  @override
  Future<void> onLoad() async {
    await super.onLoad();
    add(RectangleHitbox());
  }

  @override
  void render(Canvas canvas) {
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        size.toRect(),
        const Radius.circular(10),
      ),
      paint,
    );
  }

  void moveUp(double dt) {
    position.y -= speed * dt;
    // Clamp to screen bounds
    if (position.y < size.y / 2) {
      position.y = size.y / 2;
    }
  }

  void moveDown(double dt, double screenHeight) {
    position.y += speed * dt;
    // Clamp to screen bounds
    if (position.y > screenHeight - size.y / 2) {
      position.y = screenHeight - size.y / 2;
    }
  }
}
```

### File 4: `lib/games/kanji_pong/components/ball.dart`

```dart
import 'package:flame/components.dart';
import 'package:flame/collisions.dart';
import 'package:flutter/material.dart';
import 'dart:math';

class Ball extends PositionComponent with CollisionCallbacks {
  Vector2 velocity = Vector2.zero();
  final String kanji;
  final String reading;
  final double radius = 30;
  
  Paint ballPaint = Paint()..color = Colors.yellow;
  late TextPaint textPaint;

  Ball({
    required Vector2 position,
    required this.kanji,
    required this.reading,
  }) : super(
          position: position,
          size: Vector2.all(60),
          anchor: Anchor.center,
        ) {
    textPaint = TextPaint(
      style: const TextStyle(
        fontSize: 32,
        color: Colors.black,
        fontWeight: FontWeight.bold,
      ),
    );
  }

  @override
  Future<void> onLoad() async {
    await super.onLoad();
    add(CircleHitbox());
    reset();
  }

  void reset() {
    final random = Random();
    final angle = (random.nextDouble() * pi / 2) - pi / 4; // -45° to 45°
    final speed = 200.0;
    velocity = Vector2(cos(angle), sin(angle)) * speed;
    
    // Random direction
    if (random.nextBool()) {
      velocity.x *= -1;
    }
  }

  @override
  void update(double dt) {
    super.update(dt);
    position += velocity * dt;
  }

  @override
  void render(Canvas canvas) {
    // Draw ball
    canvas.drawCircle(
      Offset(size.x / 2, size.y / 2),
      radius,
      ballPaint,
    );

    // Draw kanji
    textPaint.render(
      canvas,
      kanji,
      Vector2(size.x / 2 - 16, size.y / 2 - 16),
    );
  }

  void reverseX() {
    velocity.x *= -1;
  }

  void reverseY() {
    velocity.y *= -1;
  }
}
```

### File 5: `lib/games/kanji_pong/kanji_pong_game.dart`

```dart
import 'package:flame/game.dart';
import 'package:flame/components.dart';
import 'package:flame/events.dart';
import 'package:flutter/material.dart';
import 'dart:math';
import 'components/paddle.dart';
import 'components/ball.dart';
import '../../models/kanji_item.dart';

class KanjiPongGame extends FlameGame with TapDetector, PanDetector {
  late Paddle playerPaddle;
  late Paddle aiPaddle;
  late Ball ball;
  
  int playerScore = 0;
  int aiScore = 0;
  
  List<KanjiItem> kanjiList = [];
  int currentKanjiIndex = 0;
  
  Function(int, int)? onScoreUpdate;
  Function(String, String)? onKanjiChange;

  @override
  Future<void> onLoad() async {
    await super.onLoad();
    
    // Load kanji list
    kanjiList = KanjiItem.getN5Kanji();
    kanjiList.shuffle();
    
    // Create paddles
    playerPaddle = Paddle(
      position: Vector2(30, size.y / 2),
      isPlayer: true,
    );
    
    aiPaddle = Paddle(
      position: Vector2(size.x - 30, size.y / 2),
      isPlayer: false,
    );
    
    // Create ball
    _createNewBall();
    
    addAll([playerPaddle, aiPaddle, ball]);
  }

  void _createNewBall() {
    final currentKanji = kanjiList[currentKanjiIndex];
    ball = Ball(
      position: size / 2,
      kanji: currentKanji.kanji,
      reading: currentKanji.reading,
    );
    
    onKanjiChange?.call(currentKanji.kanji, currentKanji.reading);
    
    currentKanjiIndex = (currentKanjiIndex + 1) % kanjiList.length;
  }

  @override
  void update(double dt) {
    super.update(dt);
    
    // Ball collision with top/bottom
    if (ball.position.y <= ball.radius || 
        ball.position.y >= size.y - ball.radius) {
      ball.reverseY();
    }
    
    // Ball collision with paddles
    if (_checkPaddleCollision(playerPaddle) || 
        _checkPaddleCollision(aiPaddle)) {
      ball.reverseX();
      ball.velocity *= 1.05; // Increase speed slightly
    }
    
    // Scoring
    if (ball.position.x <= 0) {
      _aiScored();
    } else if (ball.position.x >= size.x) {
      _playerScored();
    }
    
    // AI paddle follows ball
    _updateAI(dt);
  }

  bool _checkPaddleCollision(Paddle paddle) {
    final ballRect = Rect.fromCenter(
      center: ball.position.toOffset(),
      width: ball.size.x,
      height: ball.size.y,
    );
    
    final paddleRect = Rect.fromCenter(
      center: paddle.position.toOffset(),
      width: paddle.size.x,
      height: paddle.size.y,
    );
    
    return ballRect.overlaps(paddleRect);
  }

  void _updateAI(double dt) {
    final aiCenter = aiPaddle.position.y;
    final ballCenter = ball.position.y;
    
    if (ballCenter < aiCenter - 10) {
      aiPaddle.moveUp(dt);
    } else if (ballCenter > aiCenter + 10) {
      aiPaddle.moveDown(dt, size.y);
    }
  }

  void _playerScored() {
    playerScore++;
    onScoreUpdate?.call(playerScore, aiScore);
    _resetBall();
  }

  void _aiScored() {
    aiScore++;
    onScoreUpdate?.call(playerScore, aiScore);
    _resetBall();
  }

  void _resetBall() {
    remove(ball);
    _createNewBall();
    add(ball);
  }

  @override
  void onPanUpdate(DragUpdateInfo info) {
    playerPaddle.position.y += info.delta.global.y;
    
    // Clamp paddle position
    if (playerPaddle.position.y < playerPaddle.size.y / 2) {
      playerPaddle.position.y = playerPaddle.size.y / 2;
    } else if (playerPaddle.position.y > size.y - playerPaddle.size.y / 2) {
      playerPaddle.position.y = size.y - playerPaddle.size.y / 2;
    }
  }
}
```

### File 6: `lib/games/kanji_pong/screens/kanji_pong_screen.dart`

```dart
import 'package:flutter/material.dart';
import 'package:flame/game.dart';
import '../kanji_pong_game.dart';

class KanjiPongScreen extends StatefulWidget {
  const KanjiPongScreen({super.key});

  @override
  State<KanjiPongScreen> createState() => _KanjiPongScreenState();
}

class _KanjiPongScreenState extends State<KanjiPongScreen> {
  late KanjiPongGame game;
  int playerScore = 0;
  int aiScore = 0;
  String currentKanji = '';
  String currentReading = '';

  @override
  void initState() {
    super.initState();
    game = KanjiPongGame()
      ..onScoreUpdate = (player, ai) {
        setState(() {
          playerScore = player;
          aiScore = ai;
        });
      }
      ..onKanjiChange = (kanji, reading) {
        setState(() {
          currentKanji = kanji;
          currentReading = reading;
        });
      };
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Game canvas
          GameWidget(game: game),
          
          // Score overlay
          SafeArea(
            child: Column(
              children: [
                // Top bar
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
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      // Back button
                      IconButton(
                        icon: const Icon(Icons.arrow_back, color: Colors.white),
                        onPressed: () => Navigator.pop(context),
                      ),
                      
                      // Score
                      Text(
                        '$playerScore - $aiScore',
                        style: const TextStyle(
                          fontSize: 32,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                      
                      // Pause button
                      IconButton(
                        icon: const Icon(Icons.pause, color: Colors.white),
                        onPressed: () {
                          game.pauseEngine();
                          _showPauseDialog();
                        },
                      ),
                    ],
                  ),
                ),
                
                const Spacer(),
                
                // Kanji display at bottom
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
                      Text(
                        currentKanji,
                        style: const TextStyle(
                          fontSize: 64,
                          color: Colors.yellow,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        currentReading,
                        style: const TextStyle(
                          fontSize: 24,
                          color: Colors.white,
                        ),
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

  void _showPauseDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: const Text('⏸️ Paused'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('Score: $playerScore - $aiScore'),
            const SizedBox(height: 20),
            const Text('Swipe to move your paddle'),
            const Text('Hit the ball to continue!'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              game.resumeEngine();
            },
            child: const Text('Resume'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pop(context);
            },
            child: const Text('Quit'),
          ),
        ],
      ),
    );
  }
}
```

---

## Step 4: Add to Kids Mode Screen

Update `lib/screens/kids_mode_screen.dart` to include Kanji Pong:

```dart
// Add this import at the top
import '../games/kanji_pong/screens/kanji_pong_screen.dart';

// Add this game card in the grid
_buildGameCard(
  context,
  icon: '🏓',
  title: 'Kanji Pong',
  subtitle: 'Learn kanji while playing!',
  color: Colors.orange,
  onTap: () {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const KanjiPongScreen(),
      ),
    );
  },
),
```

---

## Step 5: Test the Game

```bash
cd nihon_quest_mobile
flutter run -d chrome  # For web testing
# or
flutter run  # For mobile device
```

---

## 🎮 How to Play

1. **Swipe up/down** on the left side to move your paddle
2. **Hit the ball** to keep it in play
3. **Learn the kanji** displayed on the ball
4. **Score points** when the AI misses
5. **Build streaks** for bonus points

---

## 🚀 Next Enhancements

1. **Add voice recognition** - Say the kanji reading to power up
2. **Power-ups** - Collect hiragana for special abilities
3. **Difficulty levels** - Adjust AI speed
4. **Multiplayer** - Play against friends online
5. **Progress tracking** - Save scores to Firebase

---

## 📊 Educational Value

- **Kanji Recognition**: Visual learning through gameplay
- **Reading Practice**: Associate kanji with readings
- **Spaced Repetition**: Kanji appear multiple times
- **Engagement**: Fun way to review N5 kanji
- **Muscle Memory**: Physical interaction reinforces learning

---

**Ready to build more games? Check MODERN_ARCADE_GAMES_PLAN.md for the full roadmap!**
