import 'package:flutter/material.dart';
import 'kids_mode_screen.dart';
import 'about_screen.dart';
import 'kanji_pong_screen.dart';
import 'hiragana_pacman_screen.dart';
import 'kanji_mario_screen.dart';
import 'vocabulary_tetris_screen.dart';
import 'kanji_climb_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFFF3E5F5), // Light purple
              Color(0xFFE1BEE7), // Purple
              Color(0xFFF8BBD0), // Pink
            ],
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Title
                const Text(
                  '🌸 日本語クエスト 🌸',
                  style: TextStyle(
                    fontSize: 48,
                    fontWeight: FontWeight.bold,
                    color: Colors.purple,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 10),
                const Text(
                  'にほんごがくしゅうのぼうけん',
                  style: TextStyle(
                    fontSize: 20,
                    color: Colors.deepPurple,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 60),

                // Kids Mode Button
                _buildMenuCard(
                  context,
                  icon: '👶',
                  title: 'こどもモード',
                  subtitle: '4-8さいのゲーム',
                  colors: [Colors.pink.shade300, Colors.pink.shade100],
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const KidsModeScreen(),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 20),

                // Kanji Pong Game Button
                _buildMenuCard(
                  context,
                  icon: '🏓',
                  title: 'かんじポン',
                  subtitle: '2プレイヤー・ゲーム',
                  colors: [Colors.blue.shade300, Colors.blue.shade100],
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const KanjiPongScreen(),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 20),

                // Hiragana Pac-Man Button
                _buildMenuCard(
                  context,
                  icon: '👻',
                  title: 'ひらがなパックマン',
                  subtitle: 'もじをあつめよう',
                  colors: [Colors.yellow.shade300, Colors.yellow.shade100],
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const HiraganaPacmanScreen(),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 20),

                // Kanji Mario Button
                _buildMenuCard(
                  context,
                  icon: '�',
                  title: 'かんじマリオ',
                  subtitle: 'ぶんぽうをまなぼう',
                  colors: [Colors.red.shade300, Colors.red.shade100],
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const KanjiMarioScreen(),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 20),

                // Vocabulary Tetris Button
                _buildMenuCard(
                  context,
                  icon: '🎮',
                  title: 'ごいテトリス',
                  subtitle: 'ことばをつくろう',
                  colors: [Colors.cyan.shade300, Colors.cyan.shade100],
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const VocabularyTetrisScreen(),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 20),

                // Kanji Climb Button
                _buildMenuCard(
                  context,
                  icon: '🦍',
                  title: 'かんじクライム',
                  subtitle: 'ぶしゅをあつめよう',
                  colors: [Colors.purple.shade300, Colors.purple.shade100],
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const KanjiClimbScreen(),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 20),

                // About Button
                _buildMenuCard(
                  context,
                  icon: 'ℹ️',
                  title: 'About',
                  subtitle: 'App info & copyright',
                  colors: [Colors.grey.shade300, Colors.grey.shade100],
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const AboutScreen(),
                      ),
                    );
                  },
                ),

                const Spacer(),

                // Footer
                const Text(
                  'ゲームをえらんでください！ / Choose a game!',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.deepPurple,
                    fontStyle: FontStyle.italic,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildMenuCard(
    BuildContext context, {
    required String icon,
    required String title,
    required String subtitle,
    required List<Color> colors,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: colors,
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: colors[0].withOpacity(0.3),
              blurRadius: 10,
              offset: const Offset(0, 5),
            ),
          ],
        ),
        child: Row(
          children: [
            Text(
              icon,
              style: const TextStyle(fontSize: 60),
            ),
            const SizedBox(width: 20),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    subtitle,
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.white.withOpacity(0.9),
                    ),
                  ),
                ],
              ),
            ),
            const Icon(
              Icons.arrow_forward_ios,
              color: Colors.white,
              size: 30,
            ),
          ],
        ),
      ),
    );
  }
}
