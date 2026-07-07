import 'package:flutter/material.dart';

class AdultLearningScreen extends StatefulWidget {
  const AdultLearningScreen({super.key});

  @override
  State<AdultLearningScreen> createState() => _AdultLearningScreenState();
}

class _AdultLearningScreenState extends State<AdultLearningScreen> {
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
        backgroundColor: Colors.purple,
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
        title: const Text('🎓 おとながくしゅう'),
        backgroundColor: Colors.purple,
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
              Color(0xFFF3E5F5),
              Color(0xFFE1BEE7),
              Color(0xFFCE93D8),
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
                    '🎓 じっせんがくしゅう',
                    style: TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      color: Colors.purple,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 10),
                  // Game count indicator
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(
                      color: Colors.purple.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: Colors.purple, width: 2),
                    ),
                    child: const Text(
                      '📊 12 Practical Activities for Adults',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: Colors.purple,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Daily Life Section
                  _buildSectionHeader('Daily Life'),
                  const SizedBox(height: 15),

                  // Game 1: Restaurant Ordering
                  _buildGameCard(
                    context,
                    icon: '🍜',
                    title: '1️⃣ レストラン [Restaurant]',
                    subtitle: 'Restaurant ordering',
                    category: 'Daily Life',
                    color: Colors.orange,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Restaurant Practice - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Game 2: Shopping
                  _buildGameCard(
                    context,
                    icon: '🛒',
                    title: '2️⃣ 買(か)い物(もの) [Shopping]',
                    subtitle: 'Shopping scenarios',
                    category: 'Daily Life',
                    color: Colors.green,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Shopping Practice - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Game 3: Transportation
                  _buildGameCard(
                    context,
                    icon: '🚇',
                    title: '3️⃣ 交通(こうつう) [Transportation]',
                    subtitle: 'Train, bus, taxi',
                    category: 'Daily Life',
                    color: Colors.blue,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Transportation Practice - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Game 4: Doctor Visit
                  _buildGameCard(
                    context,
                    icon: '⚕️',
                    title: '4️⃣ 病院(びょういん) [Hospital]',
                    subtitle: 'Medical situations',
                    category: 'Daily Life',
                    color: Colors.red,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Medical Practice - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Business Section
                  _buildSectionHeader('Business Japanese'),
                  const SizedBox(height: 15),

                  // Game 5: Email Writing
                  _buildGameCard(
                    context,
                    icon: '📧',
                    title: '5️⃣ ビジネスメール [Business Email]',
                    subtitle: 'Professional emails',
                    category: 'Business',
                    color: Colors.indigo,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Business Email - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Game 6: Phone Calls
                  _buildGameCard(
                    context,
                    icon: '📞',
                    title: '6️⃣ 電話(でんわ)応対(おうたい) [Phone Calls]',
                    subtitle: 'Phone conversations',
                    category: 'Business',
                    color: Colors.teal,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Phone Calls - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Game 7: Meeting Phrases
                  _buildGameCard(
                    context,
                    icon: '👔',
                    title: '7️⃣ 会議(かいぎ) [Meeting]',
                    subtitle: 'Meeting expressions',
                    category: 'Business',
                    color: Colors.deepPurple,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Meeting Practice - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Game 8: Presentations
                  _buildGameCard(
                    context,
                    icon: '📊',
                    title: '8️⃣ プレゼンテーション [Presentation]',
                    subtitle: 'Presentation skills',
                    category: 'Business',
                    color: Colors.pink,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Presentation Practice - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Culture & Social Section
                  _buildSectionHeader('Culture & Social'),
                  const SizedBox(height: 15),

                  // Game 9: Introducing Yourself
                  _buildGameCard(
                    context,
                    icon: '🤝',
                    title: '9️⃣ 自己紹介(じこしょうかい) [Self Introduction]',
                    subtitle: 'Self introductions',
                    category: 'Social',
                    color: Colors.amber,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Self Introduction - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Game 10: Small Talk
                  _buildGameCard(
                    context,
                    icon: '💬',
                    title: '🔟 スモールトーク [Small Talk]',
                    subtitle: 'Casual conversations',
                    category: 'Social',
                    color: Colors.lime,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Small Talk - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Game 11: Cultural Etiquette
                  _buildGameCard(
                    context,
                    icon: '🎎',
                    title: '1️⃣1️⃣ 文化(ぶんか)とマナー [Culture & Etiquette]',
                    subtitle: 'Japanese customs',
                    category: 'Culture',
                    color: Colors.brown,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Cultural Etiquette - Coming soon! 🚀'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 15),

                  // Game 12: Travel Phrases
                  _buildGameCard(
                    context,
                    icon: '✈️',
                    title: '1️⃣2️⃣ 旅行(りょこう) [Travel]',
                    subtitle: 'Travel essentials',
                    category: 'Travel',
                    color: Colors.cyan,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Travel Phrases - Coming soon! 🚀'),
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

  Widget _buildSectionHeader(String section) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      decoration: BoxDecoration(
        color: Colors.purple.shade700,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.category, color: Colors.white, size: 20),
          const SizedBox(width: 10),
          Text(
            section,
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
    required String category,
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
                      category,
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
