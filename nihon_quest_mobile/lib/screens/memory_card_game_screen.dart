import 'package:flutter/material.dart';
import 'package:confetti/confetti.dart';
import 'dart:async';
import '../models/picture_card.dart';
import '../services/audio_service.dart';

class MemoryCardGameScreen extends StatefulWidget {
  const MemoryCardGameScreen({super.key});

  @override
  State<MemoryCardGameScreen> createState() => _MemoryCardGameScreenState();
}

class _MemoryCardGameScreenState extends State<MemoryCardGameScreen> with SingleTickerProviderStateMixin {
  final AudioService _audioService = AudioService();
  late ConfettiController _confettiController;
  late AnimationController _flipController;
  
  List<MemoryCard> _cards = [];
  List<int> _flippedIndices = [];
  Set<int> _matchedIndices = {};
  int _score = 0;
  int _moves = 0;
  bool _isChecking = false;

  @override
  void initState() {
    super.initState();
    _confettiController = ConfettiController(duration: const Duration(seconds: 2));
    _flipController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _audioService.initialize();
    _initializeGame();
  }

  @override
  void dispose() {
    _confettiController.dispose();
    _flipController.dispose();
    super.dispose();
  }

  void _initializeGame() {
    // Take first 6 hiragana cards and create pairs
    final cards = hiraganaCards.take(6).toList();
    final pairs = <MemoryCard>[];
    
    for (int i = 0; i < cards.length; i++) {
      pairs.add(MemoryCard(
        id: i * 2,
        character: cards[i].character,
        emoji: cards[i].emoji,
        pairId: i,
      ));
      pairs.add(MemoryCard(
        id: i * 2 + 1,
        character: cards[i].character,
        emoji: cards[i].emoji,
        pairId: i,
      ));
    }
    
    pairs.shuffle();
    setState(() {
      _cards = pairs;
      _flippedIndices.clear();
      _matchedIndices.clear();
      _score = 0;
      _moves = 0;
    });
  }

  void _onCardTap(int index) {
    if (_isChecking || 
        _flippedIndices.contains(index) || 
        _matchedIndices.contains(index) ||
        _flippedIndices.length >= 2) {
      return;
    }

    setState(() {
      _flippedIndices.add(index);
      _moves++;
    });

    // Play sound
    _audioService.speak(_cards[index].character);

    if (_flippedIndices.length == 2) {
      _checkMatch();
    }
  }

  void _checkMatch() {
    _isChecking = true;
    final firstIndex = _flippedIndices[0];
    final secondIndex = _flippedIndices[1];
    
    if (_cards[firstIndex].pairId == _cards[secondIndex].pairId) {
      // Match!
      setState(() {
        _matchedIndices.add(firstIndex);
        _matchedIndices.add(secondIndex);
        _score += 20;
        _flippedIndices.clear();
        _isChecking = false;
      });
      
      _confettiController.play();
      
      // Check if game complete
      if (_matchedIndices.length == _cards.length) {
        Future.delayed(const Duration(milliseconds: 500), _showWinDialog);
      }
    } else {
      // No match - flip back after delay
      Future.delayed(const Duration(milliseconds: 1000), () {
        setState(() {
          _flippedIndices.clear();
          _isChecking = false;
        });
      });
    }
  }

  void _showWinDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('🎉 You Win!'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Score: $_score',
              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            Text(
              'Moves: $_moves',
              style: const TextStyle(fontSize: 18),
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
              _initializeGame();
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
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFFE3F2FD), // Light blue
              Color(0xFFBBDEFB), // Blue
              Color(0xFF90CAF9), // Medium blue
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
                      icon: const Icon(Icons.arrow_back, color: Colors.blue, size: 30),
                      onPressed: () => Navigator.of(context).pop(),
                    ),
                    const Text(
                      '🧠 Memory Match',
                      style: TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                        color: Colors.blue,
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.refresh, color: Colors.blue, size: 30),
                      onPressed: _initializeGame,
                    ),
                  ],
                ),
              ),

              // Score and Moves
              Container(
                margin: const EdgeInsets.symmetric(horizontal: 16),
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
                        const Text(
                          '⭐ Score',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        Text(
                          '$_score',
                          style: const TextStyle(
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                            color: Colors.orange,
                          ),
                        ),
                      ],
                    ),
                    Container(
                      width: 2,
                      height: 50,
                      color: Colors.grey[300],
                    ),
                    Column(
                      children: [
                        const Text(
                          '🎯 Moves',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        Text(
                          '$_moves',
                          style: const TextStyle(
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                            color: Colors.blue,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              // Game Grid
              Expanded(
                child: Stack(
                  children: [
                    GridView.builder(
                      padding: const EdgeInsets.all(16),
                      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 3,
                        crossAxisSpacing: 12,
                        mainAxisSpacing: 12,
                        childAspectRatio: 0.8,
                      ),
                      itemCount: _cards.length,
                      itemBuilder: (context, index) {
                        final card = _cards[index];
                        final isFlipped = _flippedIndices.contains(index) || 
                                         _matchedIndices.contains(index);
                        final isMatched = _matchedIndices.contains(index);

                        return GestureDetector(
                          onTap: () => _onCardTap(index),
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 300),
                            decoration: BoxDecoration(
                              color: isMatched 
                                  ? Colors.green[100]
                                  : isFlipped 
                                      ? Colors.white 
                                      : Colors.blue[400],
                              borderRadius: BorderRadius.circular(15),
                              border: Border.all(
                                color: isMatched 
                                    ? Colors.green 
                                    : Colors.blue[700]!,
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
                              child: isFlipped
                                  ? Column(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: [
                                        Text(
                                          card.emoji,
                                          style: const TextStyle(fontSize: 50),
                                        ),
                                        const SizedBox(height: 5),
                                        Text(
                                          card.character,
                                          style: const TextStyle(
                                            fontSize: 36,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        if (isMatched)
                                          const Text(
                                            '✓',
                                            style: TextStyle(
                                              fontSize: 40,
                                              color: Colors.green,
                                            ),
                                          ),
                                      ],
                                    )
                                  : const Text(
                                      '?',
                                      style: TextStyle(
                                        fontSize: 60,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.white,
                                      ),
                                    ),
                            ),
                          ),
                        );
                      },
                    ),
                    // Confetti
                    Align(
                      alignment: Alignment.topCenter,
                      child: ConfettiWidget(
                        confettiController: _confettiController,
                        blastDirection: 3.14 / 2,
                        emissionFrequency: 0.05,
                        numberOfParticles: 20,
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

class MemoryCard {
  final int id;
  final String character;
  final String emoji;
  final int pairId;

  MemoryCard({
    required this.id,
    required this.character,
    required this.emoji,
    required this.pairId,
  });
}
