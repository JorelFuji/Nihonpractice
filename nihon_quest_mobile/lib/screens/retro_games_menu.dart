import 'package:flutter/material.dart';
import '../widgets/web_game_launcher.dart';

class RetroGamesMenu extends StatelessWidget {
  const RetroGamesMenu({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFF1a1a2e),
              Color(0xFF16213e),
              Color(0xFF0f3460),
              Color(0xFF533483),
            ],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              _buildHeader(context),
              Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      _buildHeroSection(),
                      _buildGameGrid(context),
                      const SizedBox(height: 32),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Row(
        children: [
          IconButton(
            icon: const Icon(Icons.arrow_back, color: Colors.white, size: 30),
            onPressed: () => Navigator.pop(context),
          ),
          const Spacer(),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  Colors.purple.withOpacity(0.3),
                  Colors.pink.withOpacity(0.3),
                ],
              ),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: Colors.white.withOpacity(0.3)),
            ),
            child: const Row(
              children: [
                Text(
                  '🕹️',
                  style: TextStyle(fontSize: 24),
                ),
                SizedBox(width: 8),
                Text(
                  'RETRO ARCADE',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                    letterSpacing: 2,
                  ),
                ),
              ],
            ),
          ),
          const Spacer(),
          const SizedBox(width: 48),
        ],
      ),
    );
  }

  Widget _buildHeroSection() {
    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            Colors.purple.withOpacity(0.2),
            Colors.blue.withOpacity(0.2),
          ],
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white.withOpacity(0.2)),
      ),
      child: Column(
        children: [
          const Text(
            '🎮 CLASSIC WEB GAMES',
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 12),
          Text(
            'Play amazing browser-based games',
            style: TextStyle(
              fontSize: 16,
              color: Colors.white.withOpacity(0.8),
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildGameGrid(BuildContext context) {
    final games = [
      GameInfo(
        title: 'Neko Othello',
        emoji: '🔵⚪',
        url: 'https://nihonselfpacepractic.web.app/games/othello/',
        color: const Color(0xFF667eea),
        description: 'Strategic board game',
        tags: ['Strategy', '2 Player', 'Board Game'],
      ),
      GameInfo(
        title: 'Shiritori Battle',
        emoji: '🗣️✨',
        url: 'https://nihonselfpacepractic.web.app/games/shiritori/',
        color: const Color(0xFFf5576c),
        description: 'Japanese word chain game in 3D!',
        tags: ['Word Game', 'Japanese', '3D'],
      ),
      GameInfo(
        title: 'Kawaii Logic',
        emoji: '🧩💡',
        url: 'https://nihonselfpacepractic.web.app/games/kawaii-logic/',
        color: const Color(0xFF4facfe),
        description: 'Cute puzzle challenges',
        tags: ['Puzzle', 'Logic', 'Brain'],
      ),
      GameInfo(
        title: 'Battle Arena',
        emoji: '⚔️🎮',
        url: 'https://nihonselfpacepractic.web.app/games/battle-arena/',
        color: const Color(0xFFfa709a),
        description: 'Cute characters, epic battles!',
        tags: ['Fighting', 'Multiplayer', 'Action'],
      ),
      GameInfo(
        title: 'Pet Spirit',
        emoji: '🐱💫',
        url: 'https://nihonselfpacepractic.web.app/games/pet-spirit/',
        color: const Color(0xFF30cfd0),
        description: 'Virtual pet companion',
        tags: ['Pet', 'Adventure', 'Cute'],
      ),
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        children: games.map((game) => _buildGameCard(context, game)).toList(),
      ),
    );
  }

  Widget _buildGameCard(BuildContext context, GameInfo game) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () => _launchGame(context, game),
          borderRadius: BorderRadius.circular(20),
          child: Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  game.color.withOpacity(0.8),
                  game.color.withOpacity(0.6),
                ],
              ),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(
                color: game.color.withOpacity(0.5),
                width: 2,
              ),
              boxShadow: [
                BoxShadow(
                  color: game.color.withOpacity(0.3),
                  blurRadius: 15,
                  offset: const Offset(0, 8),
                ),
              ],
            ),
            child: Row(
              children: [
                // Emoji Icon
                Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(15),
                  ),
                  child: Center(
                    child: Text(
                      game.emoji,
                      style: const TextStyle(fontSize: 40),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                // Game Info
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        game.title,
                        style: const TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        game.description,
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.white.withOpacity(0.9),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Wrap(
                        spacing: 6,
                        runSpacing: 6,
                        children: game.tags.map((tag) => _buildTag(tag)).toList(),
                      ),
                    ],
                  ),
                ),
                // Play Button
                Container(
                  width: 60,
                  height: 60,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(15),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.2),
                        blurRadius: 8,
                        offset: const Offset(0, 4),
                      ),
                    ],
                  ),
                  child: Icon(
                    Icons.play_arrow,
                    size: 36,
                    color: game.color,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTag(String tag) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.25),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.white.withOpacity(0.3)),
      ),
      child: Text(
        tag,
        style: const TextStyle(
          fontSize: 11,
          color: Colors.white,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  void _launchGame(BuildContext context, GameInfo game) {
    // Show loading indicator while navigating
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => Center(
        child: Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: game.color,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                game.emoji,
                style: const TextStyle(fontSize: 48),
              ),
              const SizedBox(height: 16),
              const CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation(Colors.white),
              ),
              const SizedBox(height: 16),
              const Text(
                'Loading game...',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
      ),
    );

    // Navigate to game
    Future.delayed(const Duration(milliseconds: 500), () {
      Navigator.pop(context); // Close loading dialog
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => WebGameLauncher(
            gameUrl: game.url,
            gameTitle: game.title,
            themeColor: game.color,
            emoji: game.emoji,
          ),
        ),
      );
    });
  }
}

class GameInfo {
  final String title;
  final String emoji;
  final String url;
  final Color color;
  final String description;
  final List<String> tags;

  GameInfo({
    required this.title,
    required this.emoji,
    required this.url,
    required this.color,
    required this.description,
    required this.tags,
  });
}
