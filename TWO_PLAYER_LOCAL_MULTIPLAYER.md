# 🎮 Two-Player Local Multiplayer - Implementation Guide

## Overview
Add local multiplayer where two players use the same device to play together, each controlling their own paddle.

---

## 🎯 Features

- **Split-screen controls**: Player 1 (left) and Player 2 (right)
- **Touch controls**: Each player taps their side of the screen
- **Score tracking**: Individual scores for both players
- **Winner detection**: First to 10 points wins
- **Rematch option**: Play again without restarting

---

## 📝 Implementation

### File 1: Update `lib/games/kanji_pong/kanji_pong_game.dart`

Replace the AI paddle logic with a second player paddle:

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
  late Paddle player1Paddle;
  late Paddle player2Paddle;
  late Ball ball;
  
  int player1Score = 0;
  int player2Score = 0;
  
  List<KanjiItem> kanjiList = [];
  int currentKanjiIndex = 0;
  
  // Callbacks
  Function(int, int)? onScoreUpdate;
  Function(String, String)? onKanjiChange;
  Function(int)? onGameOver; // Winner: 1 or 2
  
  // Game settings
  final int winningScore = 10;
  bool gameEnded = false;
  
  // Touch tracking for two players
  Map<int, Vector2> activeTouches = {};

  @override
  Future<void> onLoad() async {
    await super.onLoad();
    
    // Load kanji list
    kanjiList = KanjiItem.getN5Kanji();
    kanjiList.shuffle();
    
    // Create paddles for both players
    player1Paddle = Paddle(
      position: Vector2(30, size.y / 2),
      isPlayer: true,
      color: Colors.blue, // Player 1 color
    );
    
    player2Paddle = Paddle(
      position: Vector2(size.x - 30, size.y / 2),
      isPlayer: true,
      color: Colors.red, // Player 2 color
    );
    
    // Create ball
    _createNewBall();
    
    addAll([player1Paddle, player2Paddle, ball]);
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
    
    if (gameEnded) return;
    
    // Ball collision with top/bottom
    if (ball.position.y <= ball.radius || 
        ball.position.y >= size.y - ball.radius) {
      ball.reverseY();
    }
    
    // Ball collision with paddles
    if (_checkPaddleCollision(player1Paddle) || 
        _checkPaddleCollision(player2Paddle)) {
      ball.reverseX();
      ball.velocity *= 1.05; // Increase speed slightly
    }
    
    // Scoring
    if (ball.position.x <= 0) {
      _player2Scored();
    } else if (ball.position.x >= size.x) {
      _player1Scored();
    }
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

  void _player1Scored() {
    player1Score++;
    onScoreUpdate?.call(player1Score, player2Score);
    
    if (player1Score >= winningScore) {
      _endGame(1);
    } else {
      _resetBall();
    }
  }

  void _player2Scored() {
    player2Score++;
    onScoreUpdate?.call(player1Score, player2Score);
    
    if (player2Score >= winningScore) {
      _endGame(2);
    } else {
      _resetBall();
    }
  }

  void _endGame(int winner) {
    gameEnded = true;
    pauseEngine();
    onGameOver?.call(winner);
  }

  void _resetBall() {
    remove(ball);
    _createNewBall();
    add(ball);
  }

  void resetGame() {
    player1Score = 0;
    player2Score = 0;
    gameEnded = false;
    onScoreUpdate?.call(0, 0);
    _resetBall();
    resumeEngine();
  }

  // Handle multi-touch for two players
  @override
  void onTapDown(TapDownInfo info) {
    final touchId = info.raw.pointer;
    final touchPos = info.eventPosition.global;
    activeTouches[touchId] = touchPos;
  }

  @override
  void onTapUp(TapUpInfo info) {
    final touchId = info.raw.pointer;
    activeTouches.remove(touchId);
  }

  @override
  void onPanUpdate(DragUpdateInfo info) {
    final touchPos = info.eventPosition.global;
    
    // Determine which side of screen was touched
    if (touchPos.x < size.x / 2) {
      // Left side - Player 1
      player1Paddle.position.y = touchPos.y;
      _clampPaddle(player1Paddle);
    } else {
      // Right side - Player 2
      player2Paddle.position.y = touchPos.y;
      _clampPaddle(player2Paddle);
    }
  }

  void _clampPaddle(Paddle paddle) {
    if (paddle.position.y < paddle.size.y / 2) {
      paddle.position.y = paddle.size.y / 2;
    } else if (paddle.position.y > size.y - paddle.size.y / 2) {
      paddle.position.y = size.y - paddle.size.y / 2;
    }
  }
}
```

---

### File 2: Update `lib/games/kanji_pong/components/paddle.dart`

Add color customization for each player:

```dart
import 'package:flame/components.dart';
import 'package:flame/collisions.dart';
import 'package:flutter/material.dart';

class Paddle extends PositionComponent with CollisionCallbacks {
  final bool isPlayer;
  final Color color;
  double speed = 300.0;
  late Paint paint;

  Paddle({
    required Vector2 position,
    required this.isPlayer,
    this.color = Colors.white,
  }) : super(
          position: position,
          size: Vector2(20, 100),
          anchor: Anchor.center,
        ) {
    paint = Paint()..color = color;
  }

  @override
  Future<void> onLoad() async {
    await super.onLoad();
    add(RectangleHitbox());
  }

  @override
  void render(Canvas canvas) {
    // Draw paddle with gradient
    final gradient = LinearGradient(
      colors: [color, color.withOpacity(0.6)],
      begin: Alignment.topCenter,
      end: Alignment.bottomCenter,
    );
    
    final rect = size.toRect();
    final gradientPaint = Paint()
      ..shader = gradient.createShader(rect);
    
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        rect,
        const Radius.circular(10),
      ),
      gradientPaint,
    );
    
    // Add glow effect
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        rect,
        const Radius.circular(10),
      ),
      Paint()
        ..color = color.withOpacity(0.3)
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 10),
    );
  }

  void moveUp(double dt) {
    position.y -= speed * dt;
  }

  void moveDown(double dt, double screenHeight) {
    position.y += speed * dt;
  }
}
```

---

### File 3: Update `lib/games/kanji_pong/screens/kanji_pong_screen.dart`

Add two-player UI and winner detection:

```dart
import 'package:flutter/material.dart';
import 'package:flame/game.dart';
import '../kanji_pong_game.dart';
import 'package:confetti/confetti.dart';

class KanjiPongScreen extends StatefulWidget {
  const KanjiPongScreen({super.key});

  @override
  State<KanjiPongScreen> createState() => _KanjiPongScreenState();
}

class _KanjiPongScreenState extends State<KanjiPongScreen> {
  late KanjiPongGame game;
  late ConfettiController _confettiController;
  
  int player1Score = 0;
  int player2Score = 0;
  String currentKanji = '';
  String currentReading = '';
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
      ..onKanjiChange = (kanji, reading) {
        setState(() {
          currentKanji = kanji;
          currentReading = reading;
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
                // Top bar with scores
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
                      // Player 1 Score
                      _buildPlayerScore(
                        'Player 1',
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
                        'Player 2',
                        player2Score,
                        Colors.red,
                        isLeft: false,
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
                      const SizedBox(height: 10),
                      // Control instructions
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          _buildControlHint('👈 P1: Touch left', Colors.blue),
                          _buildControlHint('P2: Touch right 👉', Colors.red),
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
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Column(
                  children: [
                    const Text('Player 1', style: TextStyle(color: Colors.blue)),
                    Text('$player1Score', style: const TextStyle(fontSize: 32, color: Colors.blue)),
                  ],
                ),
                const Text('-', style: TextStyle(fontSize: 32)),
                Column(
                  children: [
                    const Text('Player 2', style: TextStyle(color: Colors.red)),
                    Text('$player2Score', style: const TextStyle(fontSize: 32, color: Colors.red)),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 20),
            const Text('Touch your side to move paddle'),
            const Text('First to 10 wins!'),
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

  void _showWinnerDialog(int winnerNum) {
    final winnerColor = winnerNum == 1 ? Colors.blue : Colors.red;
    final winnerName = 'Player $winnerNum';
    
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('🏆 '),
            Text(
              '$winnerName Wins!',
              style: TextStyle(color: winnerColor),
            ),
            const Text(' 🏆'),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Final Score',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.grey[700],
              ),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Column(
                  children: [
                    const Text('Player 1', style: TextStyle(color: Colors.blue)),
                    Text(
                      '$player1Score',
                      style: TextStyle(
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
                    const Text('Player 2', style: TextStyle(color: Colors.red)),
                    Text(
                      '$player2Score',
                      style: TextStyle(
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
              '🎌 Kanji Learned: ${game.currentKanjiIndex}',
              style: const TextStyle(fontSize: 16),
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
            child: const Text('Rematch 🔄'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pop(context);
            },
            child: const Text('Main Menu'),
          ),
        ],
      ),
    );
  }
}
```

---

## 🎮 How It Works

### **Control Scheme**
- **Player 1 (Blue)**: Touch/drag on **left half** of screen
- **Player 2 (Red)**: Touch/drag on **right half** of screen
- Each player controls their paddle independently

### **Scoring System**
```dart
- Ball goes past Player 1 → Player 2 scores
- Ball goes past Player 2 → Player 1 scores
- First to 10 points wins
- Scores displayed at top
```

### **Game Flow**
1. Both players ready
2. Ball launches with random kanji
3. Players move paddles to hit ball
4. Score updates on each point
5. New kanji appears after each point
6. Game ends when someone reaches 10
7. Winner celebration with confetti
8. Option to rematch or return to menu

---

## 📊 Score Tracking Features

### **Real-time Updates**
```dart
onScoreUpdate: (p1Score, p2Score) {
  setState(() {
    player1Score = p1Score;
    player2Score = p2Score;
  });
}
```

### **Winner Detection**
```dart
if (player1Score >= winningScore) {
  _endGame(1); // Player 1 wins
}
```

### **Statistics Tracked**
- Individual scores
- Kanji learned count
- Game duration (optional)
- Win/loss record (optional)

---

## 🎨 Visual Enhancements

### **Player Differentiation**
- **Player 1**: Blue paddle, blue score
- **Player 2**: Red paddle, red score
- Color-coded UI elements
- Glow effects on paddles

### **Winner Celebration**
- Confetti explosion
- Winner dialog with trophy
- Final score display
- Rematch option

---

## 💾 Optional: Save Match History

Add to track player statistics:

```dart
// lib/models/match_history.dart
class MatchHistory {
  final DateTime timestamp;
  final int player1Score;
  final int player2Score;
  final int winner;
  final int kanjiLearned;

  MatchHistory({
    required this.timestamp,
    required this.player1Score,
    required this.player2Score,
    required this.winner,
    required this.kanjiLearned,
  });

  Map<String, dynamic> toJson() => {
    'timestamp': timestamp.toIso8601String(),
    'player1Score': player1Score,
    'player2Score': player2Score,
    'winner': winner,
    'kanjiLearned': kanjiLearned,
  };

  factory MatchHistory.fromJson(Map<String, dynamic> json) => MatchHistory(
    timestamp: DateTime.parse(json['timestamp']),
    player1Score: json['player1Score'],
    player2Score: json['player2Score'],
    winner: json['winner'],
    kanjiLearned: json['kanjiLearned'],
  );
}
```

### Save to Hive:
```dart
// Save match history
final box = await Hive.openBox('matchHistory');
await box.add(MatchHistory(
  timestamp: DateTime.now(),
  player1Score: player1Score,
  player2Score: player2Score,
  winner: winner,
  kanjiLearned: game.currentKanjiIndex,
).toJson());
```

---

## 🎯 Testing Instructions

1. **Run the game**: `flutter run`
2. **Player 1**: Touch left side to move blue paddle
3. **Player 2**: Touch right side to move red paddle
4. **Score points**: Let ball pass opponent
5. **Win condition**: First to 10 points
6. **Rematch**: Click rematch button

---

## 🚀 Advanced Features (Optional)

### **1. Tournament Mode**
```dart
- Best of 3/5/7 matches
- Track overall wins
- Championship bracket
```

### **2. Power-ups**
```dart
- Speed boost: Faster paddle
- Freeze: Slow opponent
- Multi-ball: Two balls at once
- Shield: Block one goal
```

### **3. Custom Rules**
```dart
- Adjustable winning score
- Ball speed settings
- Paddle size options
- Time limits
```

### **4. Leaderboard**
```dart
- Save top scores to Firebase
- Display all-time records
- Weekly/monthly champions
```

---

## 📱 Mobile Optimization

### **Touch Zones**
```dart
// Clear visual separation
Container(
  decoration: BoxDecoration(
    border: Border(
      right: BorderSide(
        color: Colors.white.withOpacity(0.2),
        width: 2,
      ),
    ),
  ),
)
```

### **Haptic Feedback**
```dart
import 'package:flutter/services.dart';

// On paddle hit
HapticFeedback.mediumImpact();

// On score
HapticFeedback.heavyImpact();
```

---

## ✅ Summary

You now have:
- ✅ Two-player local multiplayer
- ✅ Split-screen touch controls
- ✅ Individual score tracking
- ✅ Winner detection (first to 10)
- ✅ Rematch functionality
- ✅ Color-coded players
- ✅ Confetti celebration
- ✅ Match history (optional)

**Both players can now play together on the same device with full score tracking!** 🎮🏓

---

**© 2026 Osaka Oaks LLC**
