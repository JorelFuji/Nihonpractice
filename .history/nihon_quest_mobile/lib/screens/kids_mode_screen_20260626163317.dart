import 'package:flutter/material.dart';
import 'hiragana_match_screen.dart';
import 'memory_card_game_screen.dart';
import 'character_trace_screen.dart';
import 'puzzle_slide_screen.dart';
import 'character_tap_game_screen.dart';

class KidsModeScreen extends StatelessWidget {
  const KidsModeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('👶 こどもモード'),
        backgroundColor: Colors.pink,
        foregroundColor: Colors.white,
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFFFCE4EC),
              Color(0xFFF8BBD0),
              Color(0xFFF48FB1),
            ],
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: SingleChildScrollView(
              child: Column(
                children: [
                  const Text(
                    '🎮 Choose a Game!',
                    style: TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      color: Colors.pink,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 30),

                  // Hiragana Match
                  _buildGameCard(
                    context,
                    icon: 'あ',
                    title: 'Hiragana Match',
                    subtitle: 'Match pictures with letters!',
                    color: Colors.blue,
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const HiraganaMatchScreen(),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Memory Card Game
                  _buildGameCard(
                    context,
                    icon: '🧠',
                    title: 'Memory Match',
                    subtitle: 'Find matching pairs!',
                    color: Colors.purple,
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const MemoryCardGameScreen(),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Character Trace
                  _buildGameCard(
                    context,
                    icon: '✏️',
                    title: 'Trace Character',
                    subtitle: 'Draw hiragana letters!',
                    color: Colors.orange,
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const CharacterTraceScreen(),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Puzzle Slide
                  _buildGameCard(
                    context,
                    icon: '🧩',
                    title: 'Slide Puzzle',
                    subtitle: 'Solve the number puzzle!',
                    color: Colors.cyan,
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const PuzzleSlideScreen(),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Fast Tap Game
                  _buildGameCard(
                    context,
                    icon: '⚡',
                    title: 'Fast Tap',
                    subtitle: 'Tap falling characters!',
                    color: Colors.indigo,
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const CharacterTapGameScreen(),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Katakana Match (Coming Soon)
                  _buildGameCard(
                    context,
                    icon: 'ア',
                    title: 'Katakana Match',
                    subtitle: 'Coming soon!',
                    color: Colors.green,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 20),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildGameCard(
    BuildContext context, {
    required String icon,
    required String title,
    required String subtitle,
    required Color color,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.all(25),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: color, width: 3),
          boxShadow: [
            BoxShadow(
              color: color.withOpacity(0.3),
              blurRadius: 10,
              offset: const Offset(0, 5),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(15),
              ),
              child: Center(
                child: Text(
                  icon,
                  style: const TextStyle(fontSize: 50),
                ),
              ),
            ),
            const SizedBox(width: 20),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: color,
                    ),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    subtitle,
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.grey[600],
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              Icons.play_circle_filled,
              color: color,
              size: 40,
            ),
          ],
        ),
      ),
    );
  }
}
