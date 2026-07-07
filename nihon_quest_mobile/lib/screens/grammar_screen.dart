import 'package:flutter/material.dart';

class GrammarScreen extends StatefulWidget {
  const GrammarScreen({super.key});

  @override
  State<GrammarScreen> createState() => _GrammarScreenState();
}

class _GrammarScreenState extends State<GrammarScreen> {
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
        backgroundColor: Colors.blue,
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
        title: const Text('📚 ぶんぽう N5-N1'),
        backgroundColor: Colors.blue,
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
              Color(0xFFE3F2FD),
              Color(0xFFBBDEFB),
              Color(0xFF90CAF9),
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
                    '📚 ぶんぽうゲーム',
                    style: TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      color: Colors.blue,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 10),
                  // Game count indicator
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(
                      color: Colors.blue.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: Colors.blue, width: 2),
                    ),
                    child: const Text(
                      '📊 10 Grammar Games (N5 → N1)',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: Colors.blue,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 20),

                  // N5 Level Games
                  _buildLevelHeader('N5 - Beginner'),
                  const SizedBox(height: 15),

                  // Game 1: Particle Practice (は vs が)
                  _buildGameCard(
                    context,
                    icon: '⚪',
                    title: '1️⃣ 助詞(じょし)練習(れんしゅう) [Particle Practice]',
                    subtitle: 'は・が・を・に・で',
                    level: 'N5',
                    color: Colors.green,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Particle Practice - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Game 2: Verb Conjugation
                  _buildGameCard(
                    context,
                    icon: '🔄',
                    title: '2️⃣ 動詞(どうし)の活用(かつよう) [Verb Conjugation]',
                    subtitle: 'ます・ません・ました',
                    level: 'N5',
                    color: Colors.lightGreen,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Verb Conjugation - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // N4 Level Games
                  _buildLevelHeader('N4 - Elementary'),
                  const SizedBox(height: 15),

                  // Game 3: Te-form Practice
                  _buildGameCard(
                    context,
                    icon: '✋',
                    title: '3️⃣ て形(けい)練習(れんしゅう) [Te-form Practice]',
                    subtitle: 'て・た・たら・たり',
                    level: 'N4',
                    color: Colors.teal,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Te-form Practice - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Game 4: Sentence Building
                  _buildGameCard(
                    context,
                    icon: '🏗️',
                    title: '4️⃣ 文(ぶん)を作(つく)ろう [Sentence Building]',
                    subtitle: 'Sentence structure',
                    level: 'N4',
                    color: Colors.cyan,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Sentence Building - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // N3 Level Games
                  _buildLevelHeader('N3 - Intermediate'),
                  const SizedBox(height: 15),

                  // Game 5: Keigo Practice
                  _buildGameCard(
                    context,
                    icon: '🎩',
                    title: '5️⃣ 敬語(けいご)練習(れんしゅう) [Keigo Practice]',
                    subtitle: '尊敬語(そんけいご)・謙譲語(けんじょうご)',
                    level: 'N3',
                    color: Colors.blue,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Keigo Practice - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Game 6: Passive & Causative
                  _buildGameCard(
                    context,
                    icon: '🔁',
                    title: '6️⃣ 受(う)け身(み)・使役(しえき) [Passive & Causative]',
                    subtitle: 'Passive & Causative',
                    level: 'N3',
                    color: Colors.indigo,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Passive & Causative - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // N2 Level Games
                  _buildLevelHeader('N2 - Upper Intermediate'),
                  const SizedBox(height: 15),

                  // Game 7: Grammar Patterns
                  _buildGameCard(
                    context,
                    icon: '📐',
                    title: '7️⃣ 文型(ぶんけい)練習(れんしゅう) [Grammar Patterns]',
                    subtitle: 'N2 Grammar Patterns',
                    level: 'N2',
                    color: Colors.deepPurple,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Grammar Patterns - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Game 8: Reading Comprehension
                  _buildGameCard(
                    context,
                    icon: '📖',
                    title: '8️⃣ 読解(どっかい) [Reading Comprehension]',
                    subtitle: 'Reading Practice',
                    level: 'N2',
                    color: Colors.purple,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Reading Comprehension - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // N1 Level Games
                  _buildLevelHeader('N1 - Advanced'),
                  const SizedBox(height: 15),

                  // Game 9: Advanced Expressions
                  _buildGameCard(
                    context,
                    icon: '🎓',
                    title: '9️⃣ 高級(こうきゅう)表現(ひょうげん) [Advanced Expressions]',
                    subtitle: 'Advanced Expressions',
                    level: 'N1',
                    color: Colors.red,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Advanced Expressions - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Game 10: Business Japanese
                  _buildGameCard(
                    context,
                    icon: '💼',
                    title: '🔟 ビジネス日本語(にほんご) [Business Japanese]',
                    subtitle: 'Business Japanese',
                    level: 'N1',
                    color: Colors.deepOrange,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Business Japanese - Coming soon! 🚀'),
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

  Widget _buildLevelHeader(String level) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      decoration: BoxDecoration(
        color: Colors.blue.shade700,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.school, color: Colors.white, size: 20),
          const SizedBox(width: 10),
          Text(
            level,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGameCard(
    BuildContext context, {
    required String icon,
    required String title,
    required String subtitle,
    required String level,
    required Color color,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.all(20),
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
              width: 70,
              height: 70,
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(15),
              ),
              child: Center(
                child: Text(
                  icon,
                  style: const TextStyle(fontSize: 40),
                ),
              ),
            ),
            const SizedBox(width: 15),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: color,
                    ),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    subtitle,
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey[600],
                    ),
                  ),
                  const SizedBox(height: 5),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color: color.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Text(
                      level,
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: color,
                      ),
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
