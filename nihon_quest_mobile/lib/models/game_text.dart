class GameText {
  static const Map<String, Map<String, String>> translations = {
    'game_title': {
      'ja_hiragana': 'かんじポン',
      'ja_katakana': 'カンジポン',
      'en': 'Kanji Pong',
    },
    'player_1': {
      'ja_hiragana': 'プレイヤー１',
      'ja_katakana': 'プレイヤー１',
      'en': 'Player 1',
    },
    'player_2': {
      'ja_hiragana': 'プレイヤー２',
      'ja_katakana': 'プレイヤー２',
      'en': 'Player 2',
    },
    'score': {
      'ja_hiragana': 'てん',
      'ja_katakana': 'テン',
      'en': 'Score',
    },
    'touch_left': {
      'ja_hiragana': 'ひだりをタッチ',
      'ja_katakana': 'ヒダリヲタッチ',
      'en': 'Touch Left',
    },
    'touch_right': {
      'ja_hiragana': 'みぎをタッチ',
      'ja_katakana': 'ミギヲタッチ',
      'en': 'Touch Right',
    },
    'paused': {
      'ja_hiragana': 'いちじていし',
      'ja_katakana': 'イチジテイシ',
      'en': 'Paused',
    },
    'resume': {
      'ja_hiragana': 'つづける',
      'ja_katakana': 'ツヅケル',
      'en': 'Resume',
    },
    'quit': {
      'ja_hiragana': 'やめる',
      'ja_katakana': 'ヤメル',
      'en': 'Quit',
    },
    'winner': {
      'ja_hiragana': 'かち',
      'ja_katakana': 'カチ',
      'en': 'Winner',
    },
    'wins': {
      'ja_hiragana': 'のかち！',
      'ja_katakana': 'ノカチ！',
      'en': 'Wins!',
    },
    'final_score': {
      'ja_hiragana': 'さいしゅうスコア',
      'ja_katakana': 'サイシュウスコア',
      'en': 'Final Score',
    },
    'rematch': {
      'ja_hiragana': 'もういちど',
      'ja_katakana': 'モウイチド',
      'en': 'Rematch',
    },
    'main_menu': {
      'ja_hiragana': 'メインメニュー',
      'ja_katakana': 'メインメニュー',
      'en': 'Main Menu',
    },
    'first_to_win': {
      'ja_hiragana': 'さきに１０てんでかち！',
      'ja_katakana': 'サキニ１０テンデカチ！',
      'en': 'First to 10 wins!',
    },
    'move_paddle': {
      'ja_hiragana': 'じぶんのがわをタッチしてうごかす',
      'ja_katakana': 'ジブンノガワヲタッチシテウゴカス',
      'en': 'Touch your side to move',
    },
    'kanji_learned': {
      'ja_hiragana': 'べんきょうしたかんじ',
      'ja_katakana': 'ベンキョウシタカンジ',
      'en': 'Kanji Learned',
    },
  };

  static String get(String key, String language) {
    return translations[key]?[language] ?? translations[key]?['en'] ?? key;
  }
}

enum GameLanguage {
  japanese_hiragana('ja_hiragana', 'ひらがな', 'Hiragana'),
  japanese_katakana('ja_katakana', 'カタカナ', 'Katakana'),
  english('en', 'English', 'English');

  final String code;
  final String nativeName;
  final String englishName;

  const GameLanguage(this.code, this.nativeName, this.englishName);
}
