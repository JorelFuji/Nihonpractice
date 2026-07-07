import 'package:flutter/material.dart';

class RetroGamesScreen extends StatefulWidget {
  const RetroGamesScreen({super.key});

  @override
  State<RetroGamesScreen> createState() => _RetroGamesScreenState();
}

class _RetroGamesScreenState extends State<RetroGamesScreen> {
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
        backgroundColor: Colors.deepOrange,
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
        title: const Text('🕹️ レトロゲーム'),
        backgroundColor: Colors.deepOrange,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            tooltip: 'Refresh',
            onPressed: _refreshPage,
          ),
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
              Color(0xFFFBE9E7),
              Color(0xFFFFCCBC),
              Color(0xFFFFAB91),
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
                  // Version banner
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
                      children: const [
                        Icon(Icons.check_circle, color: Colors.white, size: 20),
                        SizedBox(width: 8),
                        Text(
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
                    '🕹️ ゲームのれきし',
                    style: TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      color: Colors.deepOrange,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 10),
                  // Game count badge
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(
                      color: Colors.deepOrange.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: Colors.deepOrange, width: 2),
                    ),
                    child: const Text(
                      '📊 50+ Classic Games from 1972-2009',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: Colors.deepOrange,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 20),

                  // ATARI SECTION
                  _buildEraHeader('🇺🇸 Atari Classics (1970s-80s)'),
                  const SizedBox(height: 15),

                  // Atari Arcade Games
                  _buildSubheader('Arcade Legends'),
                  const SizedBox(height: 10),

                  _buildGameCard(
                    context,
                    icon: '🏓',
                    title: 'ポン [Pong] (1972)',
                    subtitle: 'The game that started it all',
                    era: 'Arcade',
                    color: Colors.black87,
                    onTap: () => _showComingSoon(context, 'Pong'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '☄️',
                    title: 'アステロイド [Asteroids] (1979)',
                    subtitle: 'Vector space shooter',
                    era: 'Arcade',
                    color: Colors.grey.shade800,
                    onTap: () => _showComingSoon(context, 'Asteroids'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🐛',
                    title: 'センティピード [Centipede] (1981)',
                    subtitle: 'Shoot through mushroom field',
                    era: 'Arcade',
                    color: Colors.green.shade700,
                    onTap: () => _showComingSoon(context, 'Centipede'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🚀',
                    title: 'ミサイルコマンド [Missile Command] (1980)',
                    subtitle: 'Defend cities from nukes',
                    era: 'Arcade',
                    color: Colors.red.shade700,
                    onTap: () => _showComingSoon(context, 'Missile Command'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🌀',
                    title: 'テンペスト [Tempest] (1981)',
                    subtitle: 'Fast tube shooter',
                    era: 'Arcade',
                    color: Colors.purple.shade700,
                    onTap: () => _showComingSoon(context, 'Tempest'),
                  ),
                  const SizedBox(height: 15),

                  // Atari 2600 Games
                  _buildSubheader('Atari 2600 Home Classics'),
                  const SizedBox(height: 10),

                  _buildGameCard(
                    context,
                    icon: '👾',
                    title: 'スペースインベーダー [Space Invaders] (1980)',
                    subtitle: 'The killer app',
                    era: 'Atari 2600',
                    color: Colors.black,
                    onTap: () => _showComingSoon(context, 'Space Invaders'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🌴',
                    title: 'ピットフォール [Pitfall!] (1982)',
                    subtitle: 'Jungle platformer',
                    era: 'Atari 2600',
                    color: Colors.brown.shade700,
                    onTap: () => _showComingSoon(context, 'Pitfall!'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🗝️',
                    title: 'アドベンチャー [Adventure] (1980)',
                    subtitle: 'First action-adventure + Easter egg',
                    era: 'Atari 2600',
                    color: Colors.orange.shade700,
                    onTap: () => _showComingSoon(context, 'Adventure'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🎮',
                    title: 'コンバット [Combat] (1977)',
                    subtitle: 'Tank and plane duels',
                    era: 'Atari 2600',
                    color: Colors.blueGrey.shade700,
                    onTap: () => _showComingSoon(context, 'Combat'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🐝',
                    title: 'ヤーズリベンジ [Yars\' Revenge] (1982)',
                    subtitle: 'Best-selling original 2600 game',
                    era: 'Atari 2600',
                    color: Colors.teal.shade700,
                    onTap: () => _showComingSoon(context, "Yars' Revenge"),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '✈️',
                    title: 'リバーレイド [River Raid] (1982)',
                    subtitle: 'Vertical shooter by Carol Shaw',
                    era: 'Atari 2600',
                    color: Colors.blue.shade700,
                    onTap: () => _showComingSoon(context, 'River Raid'),
                  ),
                  const SizedBox(height: 20),

                  // JAPANESE CLASSICS
                  _buildEraHeader('🇯🇵 Japanese Classics (1970s-2000s)'),
                  const SizedBox(height: 15),

                  // 1970s
                  _buildSubheader('1970s - Arcade Era Begins'),
                  const SizedBox(height: 10),

                  _buildGameCard(
                    context,
                    icon: '👾',
                    title: 'スペースインベーダー [Space Invaders] (1978)',
                    subtitle: 'Global phenomenon',
                    era: '1970s',
                    color: Colors.black,
                    onTap: () => _showComingSoon(context, 'Space Invaders'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🌌',
                    title: 'ギャラクシアン [Galaxian] (1979)',
                    subtitle: 'Colorful space shooter',
                    era: '1970s',
                    color: Colors.indigo.shade800,
                    onTap: () => _showComingSoon(context, 'Galaxian'),
                  ),
                  const SizedBox(height: 15),

                  // 1980s
                  _buildSubheader('1980s - Famicom Golden Age'),
                  const SizedBox(height: 10),

                  _buildGameCard(
                    context,
                    icon: '🟡',
                    title: 'パックマン [Pac-Man] (1980)',
                    subtitle: 'Maze chase icon',
                    era: '1980s',
                    color: Colors.yellow.shade700,
                    onTap: () => _showComingSoon(context, 'Pac-Man'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🦍',
                    title: 'ドンキーコング [Donkey Kong] (1981)',
                    subtitle: 'Introduced Mario',
                    era: '1980s',
                    color: Colors.brown.shade600,
                    onTap: () => _showComingSoon(context, 'Donkey Kong'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🍄',
                    title: 'スーパーマリオブラザーズ [Super Mario Bros.] (1985)',
                    subtitle: 'Platform revolution',
                    era: '1980s',
                    color: Colors.red.shade600,
                    onTap: () => _showComingSoon(context, 'Super Mario Bros.'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🗡️',
                    title: 'ゼルダの伝説(でんせつ) [The Legend of Zelda] (1986)',
                    subtitle: 'Open-world adventure',
                    era: '1980s',
                    color: Colors.green.shade600,
                    onTap: () => _showComingSoon(context, 'Zelda'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🐉',
                    title: 'ドラゴンクエスト [Dragon Quest] (1986)',
                    subtitle: 'JRPG foundation',
                    era: '1980s',
                    color: Colors.blue.shade700,
                    onTap: () => _showComingSoon(context, 'Dragon Quest'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '⚔️',
                    title: 'ファイナルファンタジー [Final Fantasy] (1987)',
                    subtitle: 'RPG classic',
                    era: '1980s',
                    color: Colors.purple.shade700,
                    onTap: () => _showComingSoon(context, 'Final Fantasy'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🤖',
                    title: 'ロックマン [Mega Man/Rockman] (1987)',
                    subtitle: 'Action platformer',
                    era: '1980s',
                    color: Colors.cyan.shade700,
                    onTap: () => _showComingSoon(context, 'Mega Man'),
                  ),
                  const SizedBox(height: 15),

                  // 1990s
                  _buildSubheader('1990s - PlayStation & Pokémon Era'),
                  const SizedBox(height: 10),

                  _buildGameCard(
                    context,
                    icon: '🥋',
                    title: 'ストリートファイターII [Street Fighter II] (1991)',
                    subtitle: 'Fighting game boom',
                    era: '1990s',
                    color: Colors.orange.shade700,
                    onTap: () => _showComingSoon(context, 'Street Fighter II'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🦔',
                    title: 'ソニック・ザ・ヘッジホッグ [Sonic the Hedgehog] (1991)',
                    subtitle: 'Speed platformer',
                    era: '1990s',
                    color: Colors.blue.shade600,
                    onTap: () => _showComingSoon(context, 'Sonic'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🎾',
                    title: 'ポケットモンスター 赤(あか)・緑(みどり) [Pokémon Red/Green] (1996)',
                    subtitle: 'Global phenomenon',
                    era: '1990s',
                    color: Colors.red.shade700,
                    onTap: () => _showComingSoon(context, 'Pokémon'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🧟',
                    title: 'バイオハザード [Resident Evil/Biohazard] (1996)',
                    subtitle: 'Survival horror',
                    era: '1990s',
                    color: Colors.red.shade900,
                    onTap: () => _showComingSoon(context, 'Resident Evil'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '💎',
                    title: 'ファイナルファンタジーVII [Final Fantasy VII] (1997)',
                    subtitle: 'Cinematic RPG',
                    era: '1990s',
                    color: Colors.purple.shade800,
                    onTap: () => _showComingSoon(context, 'Final Fantasy VII'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '📦',
                    title: 'メタルギアソリッド [Metal Gear Solid] (1998)',
                    subtitle: 'Stealth action',
                    era: '1990s',
                    color: Colors.grey.shade800,
                    onTap: () => _showComingSoon(context, 'Metal Gear Solid'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🏎️',
                    title: 'グランツーリスモ [Gran Turismo] (1997)',
                    subtitle: 'Racing sim',
                    era: '1990s',
                    color: Colors.blue.shade800,
                    onTap: () => _showComingSoon(context, 'Gran Turismo'),
                  ),
                  const SizedBox(height: 15),

                  // 2000s
                  _buildSubheader('2000s - DS, Wii, PSP Era'),
                  const SizedBox(height: 10),

                  _buildGameCard(
                    context,
                    icon: '🏡',
                    title: 'どうぶつの森(もり) [Animal Crossing] (2001)',
                    subtitle: 'Life simulation',
                    era: '2000s',
                    color: Colors.green.shade600,
                    onTap: () => _showComingSoon(context, 'Animal Crossing'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🗝️',
                    title: 'キングダムハーツ [Kingdom Hearts] (2002)',
                    subtitle: 'Disney x FF',
                    era: '2000s',
                    color: Colors.deepPurple.shade600,
                    onTap: () => _showComingSoon(context, 'Kingdom Hearts'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🥁',
                    title: '太鼓(たいこ)の達人(たつじん) [Taiko no Tatsujin] (2001)',
                    subtitle: 'Rhythm drumming',
                    era: '2000s',
                    color: Colors.red.shade600,
                    onTap: () => _showComingSoon(context, 'Taiko no Tatsujin'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '⚔️',
                    title: 'モンスターハンター [Monster Hunter] (2004)',
                    subtitle: 'Co-op hunting',
                    era: '2000s',
                    color: Colors.brown.shade700,
                    onTap: () => _showComingSoon(context, 'Monster Hunter'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🎲',
                    title: '塊魂(かたまりだましい) [Katamari Damacy] (2004)',
                    subtitle: 'Roll everything up',
                    era: '2000s',
                    color: Colors.pink.shade600,
                    onTap: () => _showComingSoon(context, 'Katamari Damacy'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🧠',
                    title: '脳(のう)を鍛(きた)える [Brain Age] (2005)',
                    subtitle: 'Brain training',
                    era: '2000s',
                    color: Colors.blue.shade600,
                    onTap: () => _showComingSoon(context, 'Brain Age'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🐕',
                    title: 'ニンテンドッグス [Nintendogs] (2005)',
                    subtitle: 'Virtual pets',
                    era: '2000s',
                    color: Colors.brown.shade500,
                    onTap: () => _showComingSoon(context, 'Nintendogs'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🎾',
                    title: 'Wiiスポーツ [Wii Sports] (2006)',
                    subtitle: 'Motion control',
                    era: '2000s',
                    color: Colors.lightBlue.shade600,
                    onTap: () => _showComingSoon(context, 'Wii Sports'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🎩',
                    title: 'レイトン教授(きょうじゅ) [Professor Layton] (2007)',
                    subtitle: 'Puzzle adventure',
                    era: '2000s',
                    color: Colors.amber.shade800,
                    onTap: () => _showComingSoon(context, 'Professor Layton'),
                  ),
                  const SizedBox(height: 12),

                  _buildGameCard(
                    context,
                    icon: '🧘',
                    title: 'Wiiフィット [Wii Fit] (2007)',
                    subtitle: 'Fitness gaming',
                    era: '2000s',
                    color: Colors.green.shade500,
                    onTap: () => _showComingSoon(context, 'Wii Fit'),
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

  Widget _buildEraHeader(String era) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.deepOrange.shade700,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.3),
            blurRadius: 8,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.history, color: Colors.white, size: 24),
          const SizedBox(width: 10),
          Flexible(
            child: Text(
              era,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSubheader(String subtitle) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.orange.shade300,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.videogame_asset, color: Colors.white, size: 18),
          const SizedBox(width: 8),
          Text(
            subtitle,
            style: const TextStyle(
              fontSize: 16,
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
    required String era,
    required Color color,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(15),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(15),
          border: Border.all(color: color, width: 2),
          boxShadow: [
            BoxShadow(
              color: color.withOpacity(0.3),
              blurRadius: 8,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              width: 60,
              height: 60,
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Center(
                child: Text(
                  icon,
                  style: const TextStyle(fontSize: 32),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: color,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.grey[600],
                    ),
                  ),
                  const SizedBox(height: 4),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(
                      color: color.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      era,
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                        color: color,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              Icons.play_circle_outline,
              color: color,
              size: 32,
            ),
          ],
        ),
      ),
    );
  }

  void _showComingSoon(BuildContext context, String gameName) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('$gameName - Coming soon! 🚀🕹️'),
        duration: const Duration(seconds: 2),
        backgroundColor: Colors.deepOrange,
      ),
    );
  }
}
