import 'package:flutter/material.dart';
import 'package:confetti/confetti.dart';
import 'dart:math';
import '../models/picture_card.dart';
import '../services/audio_service.dart';

class PuzzleSlideScreen extends StatefulWidget {
  const PuzzleSlideScreen({super.key});

  @override
  State<PuzzleSlideScreen> createState() => _PuzzleSlideScreenState();
}

class _PuzzleSlideScreenState extends State<PuzzleSlideScreen> {
  final AudioService _audioService = AudioService();
  late ConfettiController _confettiController;
  
  List<int> _tiles = [];
  int _emptyIndex = 8;
  int _moves = 0;
  int _currentCardIndex = 0;
  
  @override
  void initState() {
    super.initState();
    _confettiController = ConfettiController(duration: const Duration(seconds: 2));
    _audioService.initialize();
    _initializePuzzle();
  }

  @override
  void dispose() {
    _confettiController.dispose();
    super.dispose();
  }

  PictureCard get _currentCard => hiraganaCards[_currentCardIndex];

  void _initializePuzzle() {
    // Create tiles 0-8 (8 is empty)
    _tiles = List.generate(9, (index) => index);
    
    // Shuffle with valid moves to ensure solvable
    final random = Random();
    for (int i = 0; i < 50; i++) {
      final validMoves = _getValidMoves(_emptyIndex);
      final move = validMoves[random.nextInt(validMoves.length)];
      _swapTiles(_emptyIndex, move);
      _emptyIndex = move;
    }
    
    setState(() {
      _moves = 0;
    });
  }

  List<int> _getValidMoves(int emptyPos) {
    final List<int> valid = [];
    final row = emptyPos ~/ 3;
    final col = emptyPos % 3;
    
    // Up
    if (row > 0) valid.add(emptyPos - 3);
    // Down
    if (row < 2) valid.add(emptyPos + 3);
    // Left
    if (col > 0) valid.add(emptyPos - 1);
    // Right
    if (col < 2) valid.add(emptyPos + 1);
    
    return valid;
  }

  void _swapTiles(int index1, int index2) {
    final temp = _tiles[index1];
    _tiles[index1] = _tiles[index2];
    _tiles[index2] = temp;
  }

  void _onTileTap(int index) {
    if (!_getValidMoves(_emptyIndex).contains(index)) {
      return;
    }

    setState(() {
      _swapTiles(_emptyIndex, index);
      _emptyIndex = index;
      _moves++;
    });

    _checkWin();
  }

  void _checkWin() {
    for (int i = 0; i < 8; i++) {
      if (_tiles[i] != i) return;
    }

    // Puzzle complete!
    _confettiController.play();
    _audioService.speak(_currentCard.character);
    
    Future.delayed(const Duration(milliseconds: 1000), () {
      if (_currentCardIndex < hiraganaCards.length - 1) {
        setState(() {
          _currentCardIndex++;
          _initializePuzzle();
        });
      } else {
        _showWinDialog();
      }
    });
  }

  void _showWinDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('🎉 Puzzle Master!'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              'You completed all puzzles!',
              style: TextStyle(fontSize: 18),
            ),
            const SizedBox(height: 10),
            Text(
              'Total Moves: $_moves',
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
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
              setState(() {
                _currentCardIndex = 0;
                _initializePuzzle();
              });
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
              Color(0xFFE1F5FE), // Light cyan
              Color(0xFFB3E5FC), // Cyan
              Color(0xFF81D4FA), // Blue
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
                      icon: const Icon(Icons.arrow_back, color: Colors.cyan, size: 30),
                      onPressed: () => Navigator.of(context).pop(),
                    ),
                    const Text(
                      '🧩 Slide Puzzle',
                      style: TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                        color: Colors.cyan,
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.refresh, color: Colors.cyan, size: 30),
                      onPressed: _initializePuzzle,
                    ),
                  ],
                ),
              ),

              // Character info
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
                        Text(
                          _currentCard.emoji,
                          style: const TextStyle(fontSize: 40),
                        ),
                        Text(
                          _currentCard.character,
                          style: const TextStyle(
                            fontSize: 36,
                            fontWeight: FontWeight.bold,
                            color: Colors.cyan,
                          ),
                        ),
                      ],
                    ),
                    Container(
                      width: 2,
                      height: 60,
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
                            color: Colors.orange,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              // Puzzle grid
              Expanded(
                child: Stack(
                  children: [
                    Center(
                      child: AspectRatio(
                        aspectRatio: 1,
                        child: Container(
                          margin: const EdgeInsets.all(16),
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(color: Colors.cyan, width: 4),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.2),
                                blurRadius: 15,
                                offset: const Offset(0, 5),
                              ),
                            ],
                          ),
                          child: GridView.builder(
                            physics: const NeverScrollableScrollPhysics(),
                            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: 3,
                              crossAxisSpacing: 8,
                              mainAxisSpacing: 8,
                            ),
                            itemCount: 9,
                            itemBuilder: (context, index) {
                              final tileValue = _tiles[index];
                              
                              if (tileValue == 8) {
                                // Empty tile
                                return Container(
                                  decoration: BoxDecoration(
                                    color: Colors.cyan[50],
                                    borderRadius: BorderRadius.circular(10),
                                  ),
                                );
                              }

                              return GestureDetector(
                                onTap: () => _onTileTap(index),
                                child: Container(
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment.topLeft,
                                      end: Alignment.bottomRight,
                                      colors: [
                                        Colors.cyan[300]!,
                                        Colors.cyan[500]!,
                                      ],
                                    ),
                                    borderRadius: BorderRadius.circular(10),
                                    border: Border.all(
                                      color: Colors.white,
                                      width: 2,
                                    ),
                                    boxShadow: [
                                      BoxShadow(
                                        color: Colors.black.withOpacity(0.2),
                                        blurRadius: 4,
                                        offset: const Offset(0, 2),
                                      ),
                                    ],
                                  ),
                                  child: Center(
                                    child: Text(
                                      '${tileValue + 1}',
                                      style: const TextStyle(
                                        fontSize: 40,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.white,
                                      ),
                                    ),
                                  ),
                                ),
                              );
                            },
                          ),
                        ),
                      ),
                    ),
                    // Confetti
                    Align(
                      alignment: Alignment.topCenter,
                      child: ConfettiWidget(
                        confettiController: _confettiController,
                        blastDirection: 3.14 / 2,
                        emissionFrequency: 0.05,
                        numberOfParticles: 30,
                        gravity: 0.3,
                      ),
                    ),
                  ],
                ),
              ),

              // Instructions
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Text(
                  'Slide tiles to arrange them in order (1-8)',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.cyan[800],
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
