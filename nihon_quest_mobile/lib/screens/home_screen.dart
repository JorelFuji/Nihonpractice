import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'kids_mode_screen.dart';
import 'grammar_screen.dart';
import 'adult_learning_screen.dart';
import 'retro_games_screen.dart';
import 'about_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final ScrollController _verticalController = ScrollController();
  final ScrollController _horizontalController = ScrollController();

  @override
  void dispose() {
    _verticalController.dispose();
    _horizontalController.dispose();
    super.dispose();
  }

  void _refreshApp() {
    // Force refresh by clearing any cached state
    setState(() {});
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('🔄 App refreshed! If you still see old content, hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)'),
        duration: Duration(seconds: 4),
        backgroundColor: Colors.purple,
      ),
    );
  }

  Future<void> _launchWebApp() async {
    final Uri url = Uri.parse('https://nihonselfpacepractic.web.app/');
    if (!await launchUrl(url, mode: LaunchMode.externalApplication)) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('❌ Could not open web app'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('🌸 日本語クエスト'),
        backgroundColor: Colors.purple,
        foregroundColor: Colors.white,
        actions: [
          // Web App button
          IconButton(
            icon: const Icon(Icons.web),
            tooltip: 'Open Web App',
            onPressed: _launchWebApp,
          ),
          // Refresh button
          IconButton(
            icon: const Icon(Icons.refresh),
            tooltip: 'Refresh App',
            onPressed: _refreshApp,
          ),
          const SizedBox(width: 8),
        ],
      ),
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
        child: Stack(
          children: [
            SafeArea(
          child: Scrollbar(
            controller: _verticalController,
            thumbVisibility: true,
            trackVisibility: true,
            thickness: 16.0,
            radius: const Radius.circular(8.0),
            interactive: true,
            child: SingleChildScrollView(
              controller: _verticalController,
              physics: const AlwaysScrollableScrollPhysics(),
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
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

                // Grammar Button
                _buildMenuCard(
                  context,
                  icon: '📚',
                  title: 'ぶんぽう N5-N1',
                  subtitle: 'もうすぐ！',
                  colors: [Colors.blue.shade300, Colors.blue.shade100],
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const GrammarScreen(),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 20),

                // Adult Learning Button
                _buildMenuCard(
                  context,
                  icon: '🎓',
                  title: 'おとながくしゅう',
                  subtitle: 'もうすぐ！',
                  colors: [Colors.purple.shade300, Colors.purple.shade100],
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const AdultLearningScreen(),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 20),

                // Retro Games Button
                _buildMenuCard(
                  context,
                  icon: '🕹️',
                  title: 'レトロゲーム',
                  subtitle: 'Classic gaming history',
                  colors: [Colors.deepOrange.shade300, Colors.orange.shade100],
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const RetroGamesScreen(),
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

                const SizedBox(height: 40),

                // Footer
                const Text(
                  'Tap Kids Mode to start learning!',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.deepPurple,
                    fontStyle: FontStyle.italic,
                  ),
                ),
                const SizedBox(height: 60),
                
                // Extra content to ensure scrolling
                const Text(
                  '🎯 Features',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.purple,
                  ),
                ),
                const SizedBox(height: 10),
                const Text(
                  '• Interactive Japanese Learning\n• Fun Games for Kids\n• Audio Support\n• Progress Tracking',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 14,
                    color: Colors.deepPurple,
                    height: 1.8,
                  ),
                ),
                const SizedBox(height: 100),
                  ],
                ),
              ),
            ),
          ),
            ),
            // Version Badge
            Positioned(
              bottom: 16,
              right: 16,
              child: SafeArea(
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: Colors.purple.withOpacity(0.8),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: const Text(
                    'v2.0.0',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ),
          ],
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
