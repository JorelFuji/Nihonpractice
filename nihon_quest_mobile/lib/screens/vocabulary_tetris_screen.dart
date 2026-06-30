import 'package:flutter/material.dart';

/// Vocabulary Tetris Game
/// Educational Focus: Word formation and vocabulary building
/// 
/// TODO: Implement game features:
/// - Falling blocks with hiragana/katakana/kanji characters
/// - Combine characters to form valid Japanese words
/// - Clear lines when words are formed
/// - Progressive speed increase
/// - Special blocks: Particle blocks, compound word blocks
/// - Combo system for multiple words
/// - Dictionary integration for word validation
/// - Bilingual word definitions on clear
class VocabularyTetrisScreen extends StatefulWidget {
  const VocabularyTetrisScreen({super.key});

  @override
  State<VocabularyTetrisScreen> createState() => _VocabularyTetrisScreenState();
}

class _VocabularyTetrisScreenState extends State<VocabularyTetrisScreen> {
  // Game state variables
  int score = 0;
  int level = 1;
  int linesCleared = 0;
  int wordsFormed = 0;
  List<String> recentWords = [];
  
  // TODO: Add game state variables:
  // - Game board grid (10x20)
  // - Current falling piece
  // - Next piece preview
  // - Piece rotation state
  // - Fall speed
  // - Game over state
  // - Word validation dictionary

  @override
  void initState() {
    super.initState();
    // TODO: Initialize game
    // - Create empty game board
    // - Load vocabulary dictionary
    // - Generate first piece
    // - Start game loop
    // - Set initial fall speed
  }

  @override
  void dispose() {
    // TODO: Clean up game resources
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF2C3E50), Color(0xFF3498DB)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: SafeArea(
          child: Row(
            children: [
              // Left panel - Stats and next piece
              Expanded(
                flex: 1,
                child: _buildLeftPanel(),
              ),
              
              // Center - Game board
              Expanded(
                flex: 2,
                child: _buildGameBoard(),
              ),
              
              // Right panel - Words formed
              Expanded(
                flex: 1,
                child: _buildRightPanel(),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLeftPanel() {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Back button
          IconButton(
            icon: const Icon(Icons.arrow_back, color: Colors.white),
            onPressed: () => Navigator.pop(context),
          ),
          const SizedBox(height: 20),
          
          // Title
          const Text(
            'テトリス',
            style: TextStyle(fontSize: 32, color: Colors.yellow, fontWeight: FontWeight.bold),
          ),
          const Text(
            'Tetris',
            style: TextStyle(fontSize: 20, color: Colors.white),
          ),
          const SizedBox(height: 30),
          
          // Stats
          _buildStatCard('スコア\nScore', score.toString(), Colors.green),
          const SizedBox(height: 15),
          _buildStatCard('レベル\nLevel', level.toString(), Colors.blue),
          const SizedBox(height: 15),
          _buildStatCard('ライン\nLines', linesCleared.toString(), Colors.purple),
          const SizedBox(height: 15),
          _buildStatCard('ことば\nWords', wordsFormed.toString(), Colors.orange),
          
          const Spacer(),
          
          // Next piece preview
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.5),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: Colors.cyan, width: 2),
            ),
            child: Column(
              children: [
                const Text(
                  'つぎ / Next',
                  style: TextStyle(fontSize: 16, color: Colors.cyan),
                ),
                const SizedBox(height: 10),
                Container(
                  width: 80,
                  height: 80,
                  color: Colors.black26,
                  child: const Center(
                    child: Text(
                      '?',
                      style: TextStyle(fontSize: 40, color: Colors.white),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGameBoard() {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 20),
      decoration: BoxDecoration(
        color: Colors.black.withOpacity(0.7),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.cyan, width: 4),
      ),
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              '🎮 ごいテトリス',
              style: TextStyle(fontSize: 36, color: Colors.cyan),
            ),
            const SizedBox(height: 20),
            const Text(
              'Vocabulary Tetris',
              style: TextStyle(fontSize: 24, color: Colors.white),
            ),
            const SizedBox(height: 40),
            const Icon(Icons.grid_4x4, size: 100, color: Colors.cyan),
            const SizedBox(height: 40),
            const Text(
              '🚧 ゲームロジックをここに追加 🚧',
              style: TextStyle(fontSize: 18, color: Colors.orange),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 10),
            const Text(
              'Add game logic here',
              style: TextStyle(fontSize: 14, color: Colors.orange),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 30),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 20),
              child: Text(
                'TODO:\n• Grid rendering (10x20)\n• Piece generation and rotation\n• Collision detection\n• Line clearing logic\n• Word validation system\n• Gravity and drop mechanics\n• Touch/keyboard controls',
                style: TextStyle(fontSize: 12, color: Colors.white70),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRightPanel() {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'つくったことば',
            style: TextStyle(fontSize: 18, color: Colors.yellow, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 5),
          const Text(
            'Words Formed',
            style: TextStyle(fontSize: 14, color: Colors.white70),
          ),
          const SizedBox(height: 20),
          
          // Words list
          Expanded(
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.black.withOpacity(0.3),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: Colors.yellow.withOpacity(0.5)),
              ),
              child: recentWords.isEmpty
                  ? const Center(
                      child: Text(
                        'ことばをつくろう！\nForm words!',
                        style: TextStyle(fontSize: 14, color: Colors.white54),
                        textAlign: TextAlign.center,
                      ),
                    )
                  : ListView.builder(
                      itemCount: recentWords.length,
                      itemBuilder: (context, index) {
                        return Container(
                          margin: const EdgeInsets.only(bottom: 8),
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: Colors.yellow.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: Colors.yellow),
                          ),
                          child: Text(
                            recentWords[index],
                            style: const TextStyle(fontSize: 16, color: Colors.yellow),
                          ),
                        );
                      },
                    ),
            ),
          ),
          
          const SizedBox(height: 20),
          
          // Controls hint
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.blue.withOpacity(0.2),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: Colors.blue),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('そうさ / Controls:', style: TextStyle(fontSize: 14, color: Colors.blue, fontWeight: FontWeight.bold)),
                SizedBox(height: 8),
                Text('← → : いどう / Move', style: TextStyle(fontSize: 12, color: Colors.white)),
                Text('↑ : かいてん / Rotate', style: TextStyle(fontSize: 12, color: Colors.white)),
                Text('↓ : はやくおとす / Drop', style: TextStyle(fontSize: 12, color: Colors.white)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatCard(String label, String value, Color color) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: color.withOpacity(0.2),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: color, width: 2),
      ),
      child: Column(
        children: [
          Text(
            label,
            style: TextStyle(fontSize: 12, color: color),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 5),
          Text(
            value,
            style: TextStyle(fontSize: 24, color: color, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }
}
