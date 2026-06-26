import 'package:flutter/material.dart';
import 'package:confetti/confetti.dart';
import 'dart:async';
import 'dart:math';
import '../models/picture_card.dart';
import '../services/audio_service.dart';

class CharacterTapGameScreen extends StatefulWidget {
  const CharacterTapGameScreen({super.key});

  @override
  State<CharacterTapGameScreen> createState() => _CharacterTapGameScreenState();
}

class _CharacterTapGameScreenState extends State<CharacterTapGameScreen> {
  final AudioService _audioService = AudioService();
  late ConfettiController _confettiController;
  
  String _targetCharacter = '';
  List<FallingCharacter> _fallingCharacters = [];
  int _score = 0;
  int _lives = 3;
  Timer? _spawnTimer;
  Timer? _gameTimer;
  int _timeLeft = 60; // 60 seconds game
  bool _gameStarted = false;
  bool _gameOver = false;

  @override
  void initState() {
    super.initState();
    _confettiController = ConfettiController(duration: const Duration(milliseconds: 500));
    _audioService.initialize();
  }

  @override
  void dispose() {
    _spawnTimer?.cancel();
    _gameTimer?.cancel();
    _confettiController.dispose();
    super.dispose();
  }

  void _startGame() {
    setState(() {
      _gameStarted = true;
      _gameOver = false;
      _score = 0;
      _lives = 3;
      _timeLeft = 60;
      _fallingCharacters.clear();
      _targetCharacter = hiraganaCards[0].character;
    });

    // Spawn characters
    _spawnTimer = Timer.periodic(const Duration(milliseconds: 800), (timer) {
      _spawnCharacter();
    });

    // Game timer
    _gameTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      setState(() {
        _timeLeft--;
        if (_timeLeft <= 0 || _lives <= 0) {
          _endGame();
        }
      });
    });

    // Update positions
    Timer.periodic(const Duration(milliseconds: 50), (timer) {
      if (!_gameStarted || _gameOver) {
        timer.cancel();
        return;
      }

      setState(() {
        _fallingCharacters = _fallingCharacters.where((char) {
          char.position += 0.01;
          if (char.position > 1.0) {
            // Character reached bottom - lose life if it's the target
            if (char.character == _targetCharacter) {
              _lives--;
            }
            return false;
          }
          return true;
        }).toList();
      });
    });
  }

  void _spawnCharacter() {
    final random = Random();
    final cards = hiraganaCards;
    
    // 60% chance to spawn target character, 40% others
    final isTarget = random.nextDouble() < 0.6;
    final card = isTarget 
        ? cards.firstWhere((c) => c.character == _targetCharacter)
        : cards[random.nextInt(cards.length)];

    setState(() {
      _fallingCharacters.add(FallingCharacter(
        character: card.character,
        emoji: card.emoji,
        position: 0.0,
        x: random.nextDouble() * 0.8 + 0.1, // Random x position
      ));
    });
  }

  void _onCharacterTap(FallingCharacter char) {
    setState(() {
      _fallingCharacters.remove(char);
      
      if (char.character == _targetCharacter) {
        // Correct!
        _score += 10;
        _confettiController.play();
        _audioService.speak(char.character);
        
        // Change target character every 5 correct taps
        if (_score % 50 == 0) {
          final random = Random();
          _targetCharacter = hiraganaCards[random.nextInt(hiraganaCards.length)].character;
        }
      } else {
        // Wrong!
        _lives--;
      }
    });
  }

  void _endGame() {
    _spawnTimer?.cancel();
    _gameTimer?.cancel();
    
    setState(() {
      _gameOver = true;
      _gameStarted = false;
    });

    Future.delayed(const Duration(milliseconds: 500), _showGameOverDialog);
  }

  void _showGameOverDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: const Text('🎮 Game Over!'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Final Score:',
              style: TextStyle(fontSize: 18, color: Colors.grey[600]),
            ),
            Text(
              '$_score',
              style: const TextStyle(
                fontSize: 48,
                fontWeight: FontWeight.bold,
                color: Colors.purple,
              ),
            ),
            const SizedBox(height: 10),
            Text(
              _score >= 100 ? '🌟 Amazing!' : _score >= 50 ? '👍 Good Job!' : '💪 Keep Practicing!',
              style: const TextStyle(fontSize: 20),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              Navigator.of(context).pop();
            },
            child: const Text('Back to Menu'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.of(context).pop();
              _startGame();
            },
            child: const Text('Play Again'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFFE8EAF6), // Light indigo
              Color(0xFFC5CAE9), // Indigo
              Color(0xFF9FA8DA), // Darker indigo
            ],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              // Header
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    IconButton(
                      icon: const Icon(Icons.arrow_back, color: Colors.indigo, size: 30),
                      onPressed: () => Navigator.of(context).pop(),
                    ),
                    const Text(
                      '⚡ Fast Tap',
                      style: TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                        color: Colors.indigo,
                      ),
                    ),
                    const SizedBox(width: 48),
                  ],
                ),
              ),

              if (!_gameStarted && !_gameOver)
                // Start screen
                Expanded(
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text(
                          '⚡ Fast Tap Game',
                          style: TextStyle(
                            fontSize: 36,
                            fontWeight: FontWeight.bold,
                            color: Colors.indigo,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 20),
                        Container(
                          margin: const EdgeInsets.symmetric(horizontal: 40),
                          padding: const EdgeInsets.all(20),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(20),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.1),
                                blurRadius: 10,
                                offset: const Offset(0, 5),
                              ),
                            ],
                          ),
                          child: const Column(
                            children: [
                              Text(
                                '📖 How to Play:',
                                style: TextStyle(
                                  fontSize: 24,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              SizedBox(height: 15),
                              Text(
                                '1. Tap the target character\n'
                                '2. Avoid wrong characters\n'
                                '3. Get high score in 60 seconds!',
                                style: TextStyle(fontSize: 18),
                                textAlign: TextAlign.center,
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 40),
                        ElevatedButton(
                          onPressed: _startGame,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.indigo,
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(
                              horizontal: 60,
                              vertical: 20,
                            ),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(30),
                            ),
                          ),
                          child: const Text(
                            '🚀 Start Game',
                            style: TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                )
              else
                // Game screen
                Expanded(
                  child: Stack(
                    children: [
                      // Game info
                      Positioned(
                        top: 0,
                        left: 0,
                        right: 0,
                        child: Container(
                          margin: const EdgeInsets.all(16),
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(15),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.1),
                                blurRadius: 10,
                                offset: const Offset(0, 5),
                              ),
                            ],
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceAround,
                            children: [
                              Column(
                                children: [
                                  const Text('⏱️ Time', style: TextStyle(fontSize: 14)),
                                  Text(
                                    '$_timeLeft',
                                    style: const TextStyle(
                                      fontSize: 28,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.orange,
                                    ),
                                  ),
                                ],
                              ),
                              Column(
                                children: [
                                  const Text('⭐ Score', style: TextStyle(fontSize: 14)),
                                  Text(
                                    '$_score',
                                    style: const TextStyle(
                                      fontSize: 28,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.green,
                                    ),
                                  ),
                                ],
                              ),
                              Column(
                                children: [
                                  const Text('❤️ Lives', style: TextStyle(fontSize: 14)),
                                  Text(
                                    '$_lives',
                                    style: const TextStyle(
                                      fontSize: 28,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.red,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),

                      // Target character
                      Positioned(
                        bottom: 20,
                        left: 0,
                        right: 0,
                        child: Container(
                          margin: const EdgeInsets.symmetric(horizontal: 16),
                          padding: const EdgeInsets.all(20),
                          decoration: BoxDecoration(
                            color: Colors.indigo,
                            borderRadius: BorderRadius.circular(20),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.3),
                                blurRadius: 15,
                                offset: const Offset(0, 5),
                              ),
                            ],
                          ),
                          child: Column(
                            children: [
                              const Text(
                                'Tap This:',
                                style: TextStyle(
                                  fontSize: 20,
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              Text(
                                _targetCharacter,
                                style: const TextStyle(
                                  fontSize: 60,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),

                      // Falling characters
                      ..._fallingCharacters.map((char) {
                        return Positioned(
                          top: MediaQuery.of(context).size.height * char.position - 100,
                          left: MediaQuery.of(context).size.width * char.x - 50,
                          child: GestureDetector(
                            onTap: () => _onCharacterTap(char),
                            child: Container(
                              width: 100,
                              height: 100,
                              decoration: BoxDecoration(
                                color: char.character == _targetCharacter
                                    ? Colors.green[100]
                                    : Colors.red[100],
                                borderRadius: BorderRadius.circular(15),
                                border: Border.all(
                                  color: char.character == _targetCharacter
                                      ? Colors.green
                                      : Colors.red,
                                  width: 3,
                                ),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withOpacity(0.2),
                                    blurRadius: 8,
                                    offset: const Offset(0, 4),
                                  ),
                                ],
                              ),
                              child: Center(
                                child: Text(
                                  char.character,
                                  style: const TextStyle(
                                    fontSize: 50,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        );
                      }),

                      // Confetti
                      Align(
                        alignment: Alignment.topCenter,
                        child: ConfettiWidget(
                          confettiController: _confettiController,
                          blastDirection: 3.14 / 2,
                          emissionFrequency: 0.1,
                          numberOfParticles: 15,
                          gravity: 0.3,
                        ),
                      ),
                    ],
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

class FallingCharacter {
  final String character;
  final String emoji;
  double position;
  final double x;

  FallingCharacter({
    required this.character,
    required this.emoji,
    required this.position,
    required this.x,
  });
}
