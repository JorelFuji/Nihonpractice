import 'package:flutter/material.dart';
import 'package:confetti/confetti.dart';
import '../models/picture_card.dart';
import '../services/audio_service.dart';
import '../services/progress_service.dart';

class KatakanaMatchScreen extends StatefulWidget {
  const KatakanaMatchScreen({super.key});

  @override
  State<KatakanaMatchScreen> createState() => _KatakanaMatchScreenState();
}

class _KatakanaMatchScreenState extends State<KatakanaMatchScreen> {
  final AudioService _audioService = AudioService();
  final ProgressService _progressService = ProgressService();
  late ConfettiController _confettiController;
  
  String? _selectedPicture;
  String? _selectedCharacter;
  final Set<String> _matchedPairs = {};
  int _score = 0;
  int _highScore = 0;
  bool _isNewHighScore = false;

  @override
  void initState() {
    super.initState();
    _confettiController = ConfettiController(duration: const Duration(seconds: 2));
    _audioService.initialize();
    _loadHighScore();
    _progressService.incrementGamesPlayed('katakana_match');
  }

  Future<void> _loadHighScore() async {
    final highScore = await _progressService.getHighScore('katakana_match');
    setState(() {
      _highScore = highScore;
    });
  }

  @override
  void dispose() {
    _confettiController.dispose();
    super.dispose();
  }

  void _handlePictureSelect(String id) {
    if (_matchedPairs.contains(id)) return;
    
    setState(() {
      _selectedPicture = _selectedPicture == id ? null : id;
    });

    _checkMatch();
  }

  void _handleCharacterSelect(String id) {
    if (_matchedPairs.contains(id)) return;
    
    // Play sound
    final card = katakanaCards.firstWhere((c) => c.id == id);
    _audioService.speak(card.sound ?? card.character);
    
    setState(() {
      _selectedCharacter = _selectedCharacter == id ? null : id;
    });

    _checkMatch();
  }

  void _checkMatch() {
    if (_selectedPicture != null && _selectedCharacter != null) {
      if (_selectedPicture == _selectedCharacter) {
        // Match!
        setState(() {
          _matchedPairs.add(_selectedPicture!);
          _score += 10;
          _selectedPicture = null;
          _selectedCharacter = null;
        });
        
        _confettiController.play();
        
        // Check if game complete
        if (_matchedPairs.length == katakanaCards.length) {
          _showWinDialog();
        }
      } else {
        // No match - reset after delay
        Future.delayed(const Duration(milliseconds: 500), () {
          setState(() {
            _selectedPicture = null;
            _selectedCharacter = null;
          });
        });
      }
    }
  }

  Future<void> _showWinDialog() async {
    await _progressService.saveHighScore('katakana_match', _score);
    await _progressService.saveLastScore('katakana_match', _score);
    await _progressService.incrementWins('katakana_match');
    
    _isNewHighScore = _score > _highScore;
    if (_isNewHighScore) {
      _highScore = _score;
    }
    
    if (!mounted) return;
    
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: Text(
          _isNewHighScore ? '� NEW HIGH SCORE! 🏆' : '�🎉 You Won! 🎉',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 28, 
            fontWeight: FontWeight.bold,
            color: _isNewHighScore ? Colors.orange : null,
          ),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              '⭐⭐⭐',
              style: TextStyle(fontSize: 48),
            ),
            const SizedBox(height: 20),
            Text(
              'Score: $_score points!',
              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            if (_isNewHighScore) ...[
              const SizedBox(height: 10),
              const Text(
                '✨ Amazing! New personal best! ✨',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 16, color: Colors.orange, fontWeight: FontWeight.bold),
              ),
            ] else if (_highScore > 0) ...[
              const SizedBox(height: 10),
              Text(
                'High Score: $_highScore',
                style: const TextStyle(fontSize: 16, color: Colors.grey),
              ),
            ],
            const SizedBox(height: 10),
            const Text(
              'Great job learning katakana!',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 18),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              _resetGame();
            },
            child: const Text('Play Again', style: TextStyle(fontSize: 18)),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pop(context);
            },
            child: const Text('Back to Menu', style: TextStyle(fontSize: 18)),
          ),
        ],
      ),
    );
  }

  void _resetGame() {
    setState(() {
      _selectedPicture = null;
      _selectedCharacter = null;
      _matchedPairs.clear();
      _score = 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Match Katakana!'),
        backgroundColor: Colors.green,
        foregroundColor: Colors.white,
        actions: [
          if (_highScore > 0)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 12.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text('High Score', style: TextStyle(fontSize: 10)),
                  Text('🏆 $_highScore', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                ],
              ),
            ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Chip(
              label: Text(
                '⭐ $_score',
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              backgroundColor: Colors.yellow,
            ),
          ),
        ],
      ),
      body: Stack(
        children: [
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Color(0xFFE8F5E9),
                  Color(0xFFC8E6C9),
                  Color(0xFFA5D6A7),
                ],
              ),
            ),
            child: SafeArea(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: [
                    const Text(
                      'Tap picture, then tap matching letter!',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.green,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 20),
                    Expanded(
                      child: Row(
                        children: [
                          // Pictures column
                          Expanded(
                            child: _buildPictureColumn(),
                          ),
                          const SizedBox(width: 10),
                          // Characters column
                          Expanded(
                            child: _buildCharacterColumn(),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          // Confetti
          Align(
            alignment: Alignment.topCenter,
            child: ConfettiWidget(
              confettiController: _confettiController,
              blastDirectionality: BlastDirectionality.explosive,
              numberOfParticles: 30,
              colors: const [
                Colors.red,
                Colors.green,
                Colors.blue,
                Colors.yellow,
                Colors.purple,
                Colors.orange,
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPictureColumn() {
    return ListView.builder(
      itemCount: katakanaCards.length,
      itemBuilder: (context, index) {
        final card = katakanaCards[index];
        final isSelected = _selectedPicture == card.id;
        final isMatched = _matchedPairs.contains(card.id);

        return Padding(
          padding: const EdgeInsets.only(bottom: 10),
          child: InkWell(
            onTap: () => _handlePictureSelect(card.id),
            borderRadius: BorderRadius.circular(15),
            child: Container(
              padding: const EdgeInsets.all(15),
              decoration: BoxDecoration(
                color: isMatched
                    ? Colors.green.shade100
                    : isSelected
                        ? Colors.purple.shade100
                        : Colors.white,
                borderRadius: BorderRadius.circular(15),
                border: Border.all(
                  color: isMatched
                      ? Colors.green
                      : isSelected
                          ? Colors.purple
                          : Colors.green.shade200,
                  width: 3,
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.1),
                    blurRadius: 5,
                    offset: const Offset(0, 3),
                  ),
                ],
              ),
              child: Row(
                children: [
                  Text(
                    card.emoji,
                    style: const TextStyle(fontSize: 40),
                  ),
                  const SizedBox(width: 15),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          card.imageJapanese,
                          style: const TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: Colors.green,
                          ),
                        ),
                        Text(
                          card.image,
                          style: const TextStyle(
                            fontSize: 14,
                            color: Colors.grey,
                          ),
                        ),
                      ],
                    ),
                  ),
                  if (isMatched)
                    const Icon(
                      Icons.check_circle,
                      color: Colors.green,
                      size: 30,
                    ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildCharacterColumn() {
    return ListView.builder(
      itemCount: katakanaCards.length,
      itemBuilder: (context, index) {
        final card = katakanaCards[index];
        final isSelected = _selectedCharacter == card.id;
        final isMatched = _matchedPairs.contains(card.id);

        return Padding(
          padding: const EdgeInsets.only(bottom: 10),
          child: InkWell(
            onTap: () => _handleCharacterSelect(card.id),
            borderRadius: BorderRadius.circular(15),
            child: Container(
              padding: const EdgeInsets.all(15),
              decoration: BoxDecoration(
                color: isMatched
                    ? Colors.green.shade100
                    : isSelected
                        ? Colors.green.shade100
                        : Colors.white,
                borderRadius: BorderRadius.circular(15),
                border: Border.all(
                  color: isMatched
                      ? Colors.green
                      : isSelected
                          ? Colors.green
                          : Colors.green.shade200,
                  width: 3,
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.1),
                    blurRadius: 5,
                    offset: const Offset(0, 3),
                  ),
                ],
              ),
              child: Column(
                children: [
                  Text(
                    card.character,
                    style: const TextStyle(
                      fontSize: 48,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    card.romanji,
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.grey[600],
                    ),
                  ),
                  if (isMatched)
                    const Icon(
                      Icons.check_circle,
                      color: Colors.green,
                      size: 30,
                    ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
