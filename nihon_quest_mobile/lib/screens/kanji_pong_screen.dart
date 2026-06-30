import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:confetti/confetti.dart';
import '../models/kanji_item.dart';
import '../models/game_text.dart';
import '../providers/language_provider.dart';

class KanjiPongScreen extends StatefulWidget {
  const KanjiPongScreen({super.key});

  @override
  State<KanjiPongScreen> createState() => _KanjiPongScreenState();
}

class _KanjiPongScreenState extends State<KanjiPongScreen> {
  final LanguageNotifier _languageNotifier = LanguageNotifier();
  late ConfettiController _confettiController;
  
  // Game state
  int player1Score = 0;
  int player2Score = 0;
  int? winner;
  bool isPaused = false;
  String difficulty = 'easy'; // easy, medium, hard
  bool showDifficultySelect = true;
  
  // Ball state
  double ballX = 0.5;
  double ballY = 0.5;
  double ballSpeedX = 0.003; // Slower starting speed
  double ballSpeedY = 0.003;
  double baseSpeed = 0.003; // Base speed for current difficulty
  double speedMultiplier = 1.0;
  
  // Paddle state
  double player1PaddleY = 0.5;
  double player2PaddleY = 0.5;
  double paddleHeight = 0.18; // Will be adjusted by difficulty
  final double paddleWidth = 0.02;
  
  // Kanji state
  late List<KanjiItem> kanjiList;
  int currentKanjiIndex = 0;
  late KanjiItem currentKanji;
  
  Timer? gameTimer;
  final int winningScore = 10;

  @override
  void initState() {
    super.initState();
    _confettiController = ConfettiController(duration: const Duration(seconds: 3));
    kanjiList = KanjiItem.getN5Kanji()..shuffle();
    currentKanji = kanjiList[currentKanjiIndex];
    // Don't start game until difficulty is selected
  }

  @override
  void dispose() {
    _confettiController.dispose();
    gameTimer?.cancel();
    super.dispose();
  }

  void _startGame() {
    gameTimer = Timer.periodic(const Duration(milliseconds: 16), (timer) {
      if (!isPaused && winner == null) {
        setState(() {
          _updateBall();
        });
      }
    });
  }

  void _updateBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // Top and bottom walls
    if (ballY <= 0 || ballY >= 1) {
      ballSpeedY = -ballSpeedY;
    }
    
    // Player 1 paddle (left)
    if (ballX <= paddleWidth && 
        ballY >= player1PaddleY - paddleHeight / 2 && 
        ballY <= player1PaddleY + paddleHeight / 2) {
      ballSpeedX = -ballSpeedX * speedMultiplier;
      ballX = paddleWidth;
    }
    
    // Player 2 paddle (right)
    if (ballX >= 1 - paddleWidth && 
        ballY >= player2PaddleY - paddleHeight / 2 && 
        ballY <= player2PaddleY + paddleHeight / 2) {
      ballSpeedX = -ballSpeedX * speedMultiplier;
      ballX = 1 - paddleWidth;
    }
    
    // Scoring
    if (ballX <= 0) {
      _player2Scored();
    } else if (ballX >= 1) {
      _player1Scored();
    }
  }

  void _player1Scored() {
    player1Score++;
    _resetBall();
    _nextKanji();
    
    if (player1Score >= winningScore) {
      _endGame(1);
    }
  }

  void _player2Scored() {
    player2Score++;
    _resetBall();
    _nextKanji();
    
    if (player2Score >= winningScore) {
      _endGame(2);
    }
  }

  void _resetBall() {
    ballX = 0.5;
    ballY = 0.5;
    final random = Random();
    ballSpeedX = (random.nextBool() ? 1 : -1) * baseSpeed;
    ballSpeedY = (random.nextDouble() - 0.5) * (baseSpeed * 2);
  }

  void _setDifficulty(String level) {
    setState(() {
      difficulty = level;
      showDifficultySelect = false;
      
      // Set base speed and multiplier based on difficulty
      switch (level) {
        case 'easy':
          baseSpeed = 0.003;
          speedMultiplier = 1.02; // Slower acceleration
          paddleHeight = 0.18; // Larger paddles
          break;
        case 'medium':
          baseSpeed = 0.005;
          speedMultiplier = 1.05; // Medium acceleration
          paddleHeight = 0.15; // Normal paddles
          break;
        case 'hard':
          baseSpeed = 0.008;
          speedMultiplier = 1.08; // Faster acceleration
          paddleHeight = 0.12; // Smaller paddles
          break;
      }
      
      _resetBall();
      _startGame();
    });
  }

  void _nextKanji() {
    currentKanjiIndex = (currentKanjiIndex + 1) % kanjiList.length;
    currentKanji = kanjiList[currentKanjiIndex];
  }

  void _endGame(int winnerNum) {
    winner = winnerNum;
    gameTimer?.cancel();
    _confettiController.play();
    _showWinnerDialog(winnerNum);
  }

  void _resetGame() {
    setState(() {
      player1Score = 0;
      player2Score = 0;
      winner = null;
      currentKanjiIndex = 0;
      currentKanji = kanjiList[currentKanjiIndex];
      showDifficultySelect = true;
    });
    gameTimer?.cancel();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Game canvas
          GestureDetector(
            onPanUpdate: (details) {
              if (winner != null) return;
              
              final RenderBox box = context.findRenderObject() as RenderBox;
              final localPosition = box.globalToLocal(details.globalPosition);
              final screenWidth = box.size.width;
              final screenHeight = box.size.height;
              
              final normalizedY = localPosition.dy / screenHeight;
              
              setState(() {
                if (localPosition.dx < screenWidth / 2) {
                  // Left side - Player 1
                  player1PaddleY = normalizedY.clamp(paddleHeight / 2, 1 - paddleHeight / 2);
                } else {
                  // Right side - Player 2
                  player2PaddleY = normalizedY.clamp(paddleHeight / 2, 1 - paddleHeight / 2);
                }
              });
            },
            child: Container(
              color: Colors.black,
              child: CustomPaint(
                painter: PongPainter(
                  ballX: ballX,
                  ballY: ballY,
                  player1PaddleY: player1PaddleY,
                  player2PaddleY: player2PaddleY,
                  paddleHeight: paddleHeight,
                  paddleWidth: paddleWidth,
                  kanji: currentKanji.kanji,
                ),
                child: Container(),
              ),
            ),
          ),
          
          // Difficulty selection overlay
          if (showDifficultySelect)
            Container(
              color: Colors.black.withOpacity(0.9),
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      '🏓 かんじポン',
                      style: TextStyle(
                        fontSize: 48,
                        fontWeight: FontWeight.bold,
                        color: Colors.yellow,
                      ),
                    ),
                    const SizedBox(height: 20),
                    const Text(
                      'Kanji Pong',
                      style: TextStyle(
                        fontSize: 32,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 60),
                    const Text(
                      'レベルをえらんでください',
                      style: TextStyle(
                        fontSize: 24,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 10),
                    const Text(
                      'Select Difficulty Level',
                      style: TextStyle(
                        fontSize: 20,
                        color: Colors.white70,
                      ),
                    ),
                    const SizedBox(height: 40),
                    _buildDifficultyButton(
                      '🟢 かんたん / Easy',
                      'easy',
                      Colors.green,
                      'Slower speed • Larger paddles',
                    ),
                    const SizedBox(height: 20),
                    _buildDifficultyButton(
                      '🟡 ふつう / Medium',
                      'medium',
                      Colors.orange,
                      'Normal speed • Normal paddles',
                    ),
                    const SizedBox(height: 20),
                    _buildDifficultyButton(
                      '🔴 むずかしい / Hard',
                      'hard',
                      Colors.red,
                      'Fast speed • Smaller paddles',
                    ),
                    const SizedBox(height: 40),
                    TextButton.icon(
                      onPressed: () => Navigator.pop(context),
                      icon: const Icon(Icons.arrow_back, color: Colors.white70),
                      label: const Text(
                        'もどる / Back',
                        style: TextStyle(color: Colors.white70),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          
          // Confetti overlay
          Align(
            alignment: Alignment.topCenter,
            child: ConfettiWidget(
              confettiController: _confettiController,
              blastDirectionality: BlastDirectionality.explosive,
              colors: const [Colors.blue, Colors.red, Colors.yellow, Colors.green, Colors.purple],
            ),
          ),
          
          // UI Overlay
          SafeArea(
            child: Column(
              children: [
                // Top bar
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [Colors.black.withOpacity(0.7), Colors.transparent],
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
                          _buildLanguageButton('🇯🇵 ひらがな', GameLanguage.japanese_hiragana),
                          const SizedBox(width: 8),
                          _buildLanguageButton('🇯🇵 カタカナ', GameLanguage.japanese_katakana),
                          const SizedBox(width: 8),
                          _buildLanguageButton('🇺🇸 EN', GameLanguage.english),
                        ],
                      ),
                      const SizedBox(height: 16),
                      
                      // Scores
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          _buildPlayerScore(_languageNotifier.getText('player_1'), player1Score, Colors.blue),
                          Column(
                            children: [
                              IconButton(
                                icon: const Icon(Icons.pause, color: Colors.white),
                                onPressed: () {
                                  setState(() => isPaused = true);
                                  _showPauseDialog();
                                },
                              ),
                              IconButton(
                                icon: const Icon(Icons.close, color: Colors.white),
                                onPressed: () => Navigator.pop(context),
                              ),
                            ],
                          ),
                          _buildPlayerScore(_languageNotifier.getText('player_2'), player2Score, Colors.red),
                        ],
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
                      colors: [Colors.transparent, Colors.black.withOpacity(0.7)],
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                    ),
                  ),
                  child: Column(
                    children: [
                      Text(
                        currentKanji.kanji,
                        style: const TextStyle(fontSize: 64, color: Colors.yellow, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        currentKanji.reading,
                        style: const TextStyle(fontSize: 24, color: Colors.white),
                      ),
                      Text(
                        currentKanji.meaning,
                        style: TextStyle(fontSize: 18, color: Colors.white.withOpacity(0.8), fontStyle: FontStyle.italic),
                      ),
                      const SizedBox(height: 10),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          _buildControlHint('👈 ${_languageNotifier.getText('touch_left')}', Colors.blue),
                          _buildControlHint('${_languageNotifier.getText('touch_right')} 👉', Colors.red),
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

  Widget _buildLanguageButton(String label, GameLanguage language) {
    final isSelected = _languageNotifier.state.language == language;
    
    return InkWell(
      onTap: () {
        setState(() {
          _languageNotifier.setLanguage(language);
        });
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected ? Colors.purple.withOpacity(0.7) : Colors.white.withOpacity(0.2),
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

  Widget _buildPlayerScore(String name, int score, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      decoration: BoxDecoration(
        color: color.withOpacity(0.3),
        borderRadius: BorderRadius.circular(15),
        border: Border.all(color: color, width: 2),
      ),
      child: Column(
        children: [
          Text(name, style: TextStyle(fontSize: 16, color: color, fontWeight: FontWeight.bold), textAlign: TextAlign.center),
          const SizedBox(height: 5),
          Text('$score', style: TextStyle(fontSize: 36, color: color, fontWeight: FontWeight.bold)),
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
      child: Text(text, style: TextStyle(fontSize: 12, color: color), textAlign: TextAlign.center),
    );
  }

  Widget _buildDifficultyButton(String label, String level, Color color, String description) {
    return InkWell(
      onTap: () => _setDifficulty(level),
      child: Container(
        width: 320,
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [color.withOpacity(0.8), color.withOpacity(0.5)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: color, width: 3),
          boxShadow: [
            BoxShadow(
              color: color.withOpacity(0.5),
              blurRadius: 15,
              offset: const Offset(0, 5),
            ),
          ],
        ),
        child: Column(
          children: [
            Text(
              label,
              style: const TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            Text(
              description,
              style: TextStyle(
                fontSize: 14,
                color: Colors.white.withOpacity(0.9),
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  void _showPauseDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: Text('⏸️ ${_languageNotifier.getBilingualText('paused')}', textAlign: TextAlign.center),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Column(
                  children: [
                    Text(_languageNotifier.getText('player_1'), style: const TextStyle(color: Colors.blue)),
                    Text('$player1Score', style: const TextStyle(fontSize: 32, color: Colors.blue)),
                  ],
                ),
                const Text('-', style: TextStyle(fontSize: 32)),
                Column(
                  children: [
                    Text(_languageNotifier.getText('player_2'), style: const TextStyle(color: Colors.red)),
                    Text('$player2Score', style: const TextStyle(fontSize: 32, color: Colors.red)),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 20),
            Text(_languageNotifier.getBilingualText('move_paddle'), textAlign: TextAlign.center),
            const SizedBox(height: 10),
            Text(_languageNotifier.getBilingualText('first_to_win'), textAlign: TextAlign.center, style: const TextStyle(fontWeight: FontWeight.bold)),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              setState(() => isPaused = false);
            },
            child: Text(_languageNotifier.getBilingualText('resume')),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pop(context);
            },
            child: Text(_languageNotifier.getBilingualText('quit')),
          ),
        ],
      ),
    );
  }

  void _showWinnerDialog(int winnerNum) {
    final winnerColor = winnerNum == 1 ? Colors.blue : Colors.red;
    final winnerName = winnerNum == 1 ? _languageNotifier.getText('player_1') : _languageNotifier.getText('player_2');
    
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('🏆 '),
            Text('$winnerName ${_languageNotifier.getText('wins')}', style: TextStyle(color: winnerColor)),
            const Text(' 🏆'),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(_languageNotifier.getBilingualText('final_score'), style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.grey[700]), textAlign: TextAlign.center),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Column(
                  children: [
                    Text(_languageNotifier.getText('player_1'), style: const TextStyle(color: Colors.blue)),
                    Text('$player1Score', style: const TextStyle(fontSize: 48, color: Colors.blue, fontWeight: FontWeight.bold)),
                  ],
                ),
                const Text('-', style: TextStyle(fontSize: 32)),
                Column(
                  children: [
                    Text(_languageNotifier.getText('player_2'), style: const TextStyle(color: Colors.red)),
                    Text('$player2Score', style: const TextStyle(fontSize: 48, color: Colors.red, fontWeight: FontWeight.bold)),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 20),
            Text('🎌 ${_languageNotifier.getBilingualText('kanji_learned')}: $currentKanjiIndex', style: const TextStyle(fontSize: 16), textAlign: TextAlign.center),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              _resetGame();
            },
            child: Text('🔄 ${_languageNotifier.getBilingualText('rematch')}'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pop(context);
            },
            child: Text(_languageNotifier.getBilingualText('main_menu')),
          ),
        ],
      ),
    );
  }
}

class PongPainter extends CustomPainter {
  final double ballX;
  final double ballY;
  final double player1PaddleY;
  final double player2PaddleY;
  final double paddleHeight;
  final double paddleWidth;
  final String kanji;

  PongPainter({
    required this.ballX,
    required this.ballY,
    required this.player1PaddleY,
    required this.player2PaddleY,
    required this.paddleHeight,
    required this.paddleWidth,
    required this.kanji,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..color = Colors.white;
    
    // Draw center line
    final dashedLinePaint = Paint()
      ..color = Colors.white.withOpacity(0.3)
      ..strokeWidth = 2;
    
    for (double i = 0; i < size.height; i += 20) {
      canvas.drawLine(
        Offset(size.width / 2, i),
        Offset(size.width / 2, i + 10),
        dashedLinePaint,
      );
    }
    
    // Draw player 1 paddle (blue)
    paint.color = Colors.blue;
    canvas.drawRect(
      Rect.fromLTWH(
        0,
        player1PaddleY * size.height - (paddleHeight * size.height / 2),
        paddleWidth * size.width,
        paddleHeight * size.height,
      ),
      paint,
    );
    
    // Draw player 2 paddle (red)
    paint.color = Colors.red;
    canvas.drawRect(
      Rect.fromLTWH(
        size.width - paddleWidth * size.width,
        player2PaddleY * size.height - (paddleHeight * size.height / 2),
        paddleWidth * size.width,
        paddleHeight * size.height,
      ),
      paint,
    );
    
    // Draw ball with kanji
    final ballRadius = 20.0;
    paint.color = Colors.yellow;
    canvas.drawCircle(
      Offset(ballX * size.width, ballY * size.height),
      ballRadius,
      paint,
    );
    
    // Draw kanji on ball
    final textPainter = TextPainter(
      text: TextSpan(
        text: kanji,
        style: const TextStyle(
          color: Colors.black,
          fontSize: 24,
          fontWeight: FontWeight.bold,
        ),
      ),
      textDirection: TextDirection.ltr,
    );
    textPainter.layout();
    textPainter.paint(
      canvas,
      Offset(
        ballX * size.width - textPainter.width / 2,
        ballY * size.height - textPainter.height / 2,
      ),
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
