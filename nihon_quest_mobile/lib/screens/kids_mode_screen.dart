import 'package:flutter/material.dart';
import 'hiragana_match_screen.dart';
import 'memory_card_game_screen.dart';
import 'character_trace_screen.dart';
import 'puzzle_slide_screen.dart';
import 'character_tap_game_screen.dart';
import 'katakana_match_screen.dart';

class KidsModeScreen extends StatefulWidget {
  const KidsModeScreen({super.key});

  @override
  State<KidsModeScreen> createState() => _KidsModeScreenState();
}

class _KidsModeScreenState extends State<KidsModeScreen> {
  final ScrollController _scrollController = ScrollController();

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _refreshPage() {
    setState(() {});
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('🔄 Page refreshed!'),
        duration: Duration(seconds: 2),
        backgroundColor: Colors.pink,
      ),
    );
  }

  void _goHome() {
    Navigator.of(context).popUntil((route) => route.isFirst);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('👶 こどもモード'),
        backgroundColor: Colors.pink,
        foregroundColor: Colors.white,
        actions: [
          // Refresh button
          IconButton(
            icon: const Icon(Icons.refresh),
            tooltip: 'Refresh',
            onPressed: _refreshPage,
          ),
          // Home button
          IconButton(
            icon: const Icon(Icons.home),
            tooltip: 'Go Home',
            onPressed: _goHome,
          ),
          const SizedBox(width: 8),
        ],
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
          child: Scrollbar(
            controller: _scrollController,
            thumbVisibility: true,
            trackVisibility: true,
            thickness: 16.0,
            radius: const Radius.circular(8.0),
            interactive: true,
            child: SingleChildScrollView(
              controller: _scrollController,
              physics: const AlwaysScrollableScrollPhysics(),
              padding: const EdgeInsets.all(20.0),
              child: Column(
                children: [
                  // Version indicator banner
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.green,
                      borderRadius: BorderRadius.circular(10),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.2),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.check_circle, color: Colors.white, size: 20),
                        const SizedBox(width: 8),
                        const Text(
                          'v2.0.0 - Latest Version ✅',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),
                  const Text(
                    '🎮 ゲームをえらぼう！',
                    style: TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      color: Colors.pink,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 10),
                  // Game count indicator
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(
                      color: Colors.green.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: Colors.green, width: 2),
                    ),
                    child: const Text(
                      '✅ 6 Games - All Ready to Play!',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: Colors.green,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Game 1: Hiragana Match
                  _buildGameCard(
                    context,
                    icon: 'あ',
                    title: '1️⃣ ひらがナマッチ [Hiragana Match]',
                    subtitle: 'えとじをあわせよう！',
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

                  // Game 2: Memory Card Game
                  _buildGameCard(
                    context,
                    icon: '🧠',
                    title: '2️⃣ 記憶(きおく)ゲーム [Memory Game]',
                    subtitle: 'おなじカードをさがそう！',
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

                  // Game 3: Character Trace
                  _buildGameCard(
                    context,
                    icon: '✏️',
                    title: '3️⃣ 文字(もじ)を書(か)こう [Character Trace]',
                    subtitle: 'ひらがなをかく！',
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

                  // Game 4: Puzzle Slide
                  _buildGameCard(
                    context,
                    icon: '🧩',
                    title: '4️⃣ スライドパズル [Slide Puzzle]',
                    subtitle: 'すうじパズルをとこう！',
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

                  // Game 5: Fast Tap Game
                  _buildGameCard(
                    context,
                    icon: '⚡',
                    title: '5️⃣ 速(はや)くタップ [Fast Tap]',
                    subtitle: 'おちてくるもじをタップ！',
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

                  // Game 6: Katakana Match
                  _buildGameCard(
                    context,
                    icon: 'ア',
                    title: '6️⃣ カタカナマッチ [Katakana Match]',
                    subtitle: 'がいこくごのもじをあわせよう！',
                    color: Colors.green,
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const KatakanaMatchScreen(),
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
