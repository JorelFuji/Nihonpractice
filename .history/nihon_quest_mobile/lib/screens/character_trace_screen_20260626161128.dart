import 'package:flutter/material.dart';
import 'dart:ui' as ui;
import 'package:confetti/confetti.dart';
import '../models/picture_card.dart';
import '../services/audio_service.dart';

class CharacterTraceScreen extends StatefulWidget {
  const CharacterTraceScreen({super.key});

  @override
  State<CharacterTraceScreen> createState() => _CharacterTraceScreenState();
}

class _CharacterTraceScreenState extends State<CharacterTraceScreen> {
  final AudioService _audioService = AudioService();
  late ConfettiController _confettiController;
  
  List<Offset> _points = [];
  int _currentCardIndex = 0;
  int _score = 0;
  bool _hasDrawn = false;

  @override
  void initState() {
    super.initState();
    _confettiController = ConfettiController(duration: const Duration(seconds: 1));
    _audioService.initialize();
  }

  @override
  void dispose() {
    _confettiController.dispose();
    super.dispose();
  }

  PictureCard get _currentCard => hiraganaCards[_currentCardIndex];

  void _clearDrawing() {
    setState(() {
      _points.clear();
      _hasDrawn = false;
    });
  }

  void _checkDrawing() {
    if (_points.length < 10) {
      // Need more drawing
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Try tracing the character!'),
          duration: Duration(seconds: 1),
        ),
      );
      return;
    }

    // Simple check - if they drew something substantial, count it as success
    setState(() {
      _score += 15;
      _hasDrawn = false;
    });

    _confettiController.play();
    _audioService.speak(_currentCard.character);

    // Move to next card
    Future.delayed(const Duration(milliseconds: 1500), () {
      if (_currentCardIndex < hiraganaCards.length - 1) {
        setState(() {
          _currentCardIndex++;
          _points.clear();
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
        title: const Text('🎉 Great Job!'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              'You traced all characters!',
              style: TextStyle(fontSize: 18),
            ),
            const SizedBox(height: 10),
            Text(
              'Score: $_score',
              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
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
                _score = 0;
                _points.clear();
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
              Color(0xFFFFF9C4), // Light yellow
              Color(0xFFFFF59D), // Yellow
              Color(0xFFFFEE58), // Bright yellow
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
                      icon: const Icon(Icons.arrow_back, color: Colors.orange, size: 30),
                      onPressed: () => Navigator.of(context).pop(),
                    ),
                    const Text(
                      '✏️ Trace Character',
                      style: TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                        color: Colors.orange,
                      ),
                    ),
                    Text(
                      '⭐ $_score',
                      style: const TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.orange,
                      ),
                    ),
                  ],
                ),
              ),

              // Progress
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Column(
                  children: [
                    Text(
                      'Character ${_currentCardIndex + 1} of ${hiraganaCards.length}',
                      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 8),
                    LinearProgressIndicator(
                      value: (_currentCardIndex + 1) / hiraganaCards.length,
                      backgroundColor: Colors.orange[100],
                      valueColor: const AlwaysStoppedAnimation<Color>(Colors.orange),
                      minHeight: 8,
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              // Character to trace (background guide)
              Container(
                margin: const EdgeInsets.symmetric(horizontal: 16),
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
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          _currentCard.emoji,
                          style: const TextStyle(fontSize: 50),
                        ),
                        const SizedBox(width: 20),
                        Text(
                          _currentCard.romanji,
                          style: const TextStyle(
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                            color: Colors.orange,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Text(
                      _currentCard.image,
                      style: const TextStyle(fontSize: 20),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              // Drawing canvas
              Expanded(
                child: Stack(
                  children: [
                    Container(
                      margin: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: Colors.orange, width: 4),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.1),
                            blurRadius: 10,
                            offset: const Offset(0, 5),
                          ),
                        ],
                      ),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(16),
                        child: Stack(
                          children: [
                            // Background character (faded guide)
                            Center(
                              child: Opacity(
                                opacity: 0.2,
                                child: Text(
                                  _currentCard.character,
                                  style: const TextStyle(
                                    fontSize: 200,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.orange,
                                  ),
                                ),
                              ),
                            ),
                            // Drawing layer
                            GestureDetector(
                              onPanStart: (details) {
                                setState(() {
                                  _hasDrawn = true;
                                  _points.add(details.localPosition);
                                });
                              },
                              onPanUpdate: (details) {
                                setState(() {
                                  _points.add(details.localPosition);
                                });
                              },
                              onPanEnd: (details) {
                                setState(() {
                                  _points.add(Offset.infinite);
                                });
                              },
                              child: CustomPaint(
                                painter: DrawingPainter(_points),
                                child: Container(),
                              ),
                            ),
                          ],
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

              // Action buttons
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  children: [
                    Expanded(
                      child: ElevatedButton(
                        onPressed: _clearDrawing,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.red,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(15),
                          ),
                        ),
                        child: const Text(
                          '🗑️ Clear',
                          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: ElevatedButton(
                        onPressed: _hasDrawn ? _checkDrawing : null,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.green,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(15),
                          ),
                        ),
                        child: const Text(
                          '✓ Check',
                          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                        ),
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

class DrawingPainter extends CustomPainter {
  final List<Offset> points;

  DrawingPainter(this.points);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.orange
      ..strokeWidth = 12.0
      ..strokeCap = StrokeCap.round;

    for (int i = 0; i < points.length - 1; i++) {
      if (points[i].isFinite && points[i + 1].isFinite) {
        canvas.drawLine(points[i], points[i + 1], paint);
      }
    }
  }

  @override
  bool shouldRepaint(DrawingPainter oldDelegate) => true;
}
