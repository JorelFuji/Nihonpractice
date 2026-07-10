class PictureCard {
  final String id;
  final String character;
  final String romanji;
  final String emoji;
  final String image; // English
  final String imageJapanese; // Japanese word
  final String? sound;

  const PictureCard({
    required this.id,
    required this.character,
    required this.romanji,
    required this.emoji,
    required this.image,
    required this.imageJapanese,
    this.sound,
  });
}

// Hiragana cards for matching game - ALL 46 BASIC CHARACTERS
const List<PictureCard> hiraganaCards = [
  // あ行 (a-row)
  PictureCard(
    id: 'a',
    character: 'あ',
    romanji: 'a',
    emoji: '🐜',
    image: 'あり',
    imageJapanese: 'あり',
    sound: 'あ',
  ),
  PictureCard(
    id: 'i',
    character: 'い',
    romanji: 'i',
    emoji: '🪑',
    image: 'いす',
    imageJapanese: 'いす',
    sound: 'い',
  ),
  PictureCard(
    id: 'u',
    character: 'う',
    romanji: 'u',
    emoji: '🐰',
    image: 'うさぎ',
    imageJapanese: 'うさぎ',
    sound: 'う',
  ),
  PictureCard(
    id: 'e',
    character: 'え',
    romanji: 'e',
    emoji: '✏️',
    image: 'えんぴつ',
    imageJapanese: 'えんぴつ',
    sound: 'え',
  ),
  PictureCard(
    id: 'o',
    character: 'お',
    romanji: 'o',
    emoji: '👑',
    image: 'おう',
    imageJapanese: 'おう',
    sound: 'お',
  ),
  
  // か行 (ka-row)
  PictureCard(
    id: 'ka',
    character: 'か',
    romanji: 'ka',
    emoji: '🦟',
    image: 'か',
    imageJapanese: 'か',
    sound: 'か',
  ),
  PictureCard(
    id: 'ki',
    character: 'き',
    romanji: 'ki',
    emoji: '🌳',
    image: 'き',
    imageJapanese: 'き',
    sound: 'き',
  ),
  PictureCard(
    id: 'ku',
    character: 'く',
    romanji: 'ku',
    emoji: '☁️',
    image: 'くも',
    imageJapanese: 'くも',
    sound: 'く',
  ),
  PictureCard(
    id: 'ke',
    character: 'け',
    romanji: 'ke',
    emoji: '🍰',
    image: 'ケーキ',
    imageJapanese: 'ケーキ',
    sound: 'け',
  ),
  PictureCard(
    id: 'ko',
    character: 'こ',
    romanji: 'ko',
    emoji: '👶',
    image: 'こども',
    imageJapanese: 'こども',
    sound: 'こ',
  ),
  
  // さ行 (sa-row)
  PictureCard(
    id: 'sa',
    character: 'さ',
    romanji: 'sa',
    emoji: '🐟',
    image: 'さかな',
    imageJapanese: 'さかな',
    sound: 'さ',
  ),
  PictureCard(
    id: 'shi',
    character: 'し',
    romanji: 'shi',
    emoji: '🦁',
    image: 'しし',
    imageJapanese: 'しし',
    sound: 'し',
  ),
  PictureCard(
    id: 'su',
    character: 'す',
    romanji: 'su',
    emoji: '🍉',
    image: 'すいか',
    imageJapanese: 'すいか',
    sound: 'す',
  ),
  PictureCard(
    id: 'se',
    character: 'せ',
    romanji: 'se',
    emoji: '🌎',
    image: 'せかい',
    imageJapanese: 'せかい',
    sound: 'せ',
  ),
  PictureCard(
    id: 'so',
    character: 'そ',
    romanji: 'so',
    emoji: '🌅',
    image: 'そら',
    imageJapanese: 'そら',
    sound: 'そ',
  ),
  
  // た行 (ta-row)
  PictureCard(
    id: 'ta',
    character: 'た',
    romanji: 'ta',
    emoji: '🥁',
    image: 'たいこ',
    imageJapanese: 'たいこ',
    sound: 'た',
  ),
  PictureCard(
    id: 'chi',
    character: 'ち',
    romanji: 'chi',
    emoji: '🩸',
    image: 'ち',
    imageJapanese: 'ち',
    sound: 'ち',
  ),
  PictureCard(
    id: 'tsu',
    character: 'つ',
    romanji: 'tsu',
    emoji: '🌙',
    image: 'つき',
    imageJapanese: 'つき',
    sound: 'つ',
  ),
  PictureCard(
    id: 'te',
    character: 'て',
    romanji: 'te',
    emoji: '✋',
    image: 'て',
    imageJapanese: 'て',
    sound: 'て',
  ),
  PictureCard(
    id: 'to',
    character: 'と',
    romanji: 'to',
    emoji: '🚪',
    image: 'とびら',
    imageJapanese: 'とびら',
    sound: 'と',
  ),
  
  // な行 (na-row)
  PictureCard(
    id: 'na',
    character: 'な',
    romanji: 'na',
    emoji: '🍐',
    image: 'なし',
    imageJapanese: 'なし',
    sound: 'な',
  ),
  PictureCard(
    id: 'ni',
    character: 'に',
    romanji: 'ni',
    emoji: '🌈',
    image: 'にじ',
    imageJapanese: 'にじ',
    sound: 'に',
  ),
  PictureCard(
    id: 'nu',
    character: 'ぬ',
    romanji: 'nu',
    emoji: '🧵',
    image: 'ぬの',
    imageJapanese: 'ぬの',
    sound: 'ぬ',
  ),
  PictureCard(
    id: 'ne',
    character: 'ね',
    romanji: 'ne',
    emoji: '🐱',
    image: 'ねこ',
    imageJapanese: 'ねこ',
    sound: 'ね',
  ),
  PictureCard(
    id: 'no',
    character: 'の',
    romanji: 'no',
    emoji: '🌾',
    image: 'のはら',
    imageJapanese: 'のはら',
    sound: 'の',
  ),
  
  // は行 (ha-row)
  PictureCard(
    id: 'ha',
    character: 'は',
    romanji: 'ha',
    emoji: '🦷',
    image: 'は',
    imageJapanese: 'は',
    sound: 'は',
  ),
  PictureCard(
    id: 'hi',
    character: 'ひ',
    romanji: 'hi',
    emoji: '🔥',
    image: 'ひ',
    imageJapanese: 'ひ',
    sound: 'ひ',
  ),
  PictureCard(
    id: 'fu',
    character: 'ふ',
    romanji: 'fu',
    emoji: '🎈',
    image: 'ふうせん',
    imageJapanese: 'ふうせん',
    sound: 'ふ',
  ),
  PictureCard(
    id: 'he',
    character: 'へ',
    romanji: 'he',
    emoji: '🐍',
    image: 'へび',
    imageJapanese: 'へび',
    sound: 'へ',
  ),
  PictureCard(
    id: 'ho',
    character: 'ほ',
    romanji: 'ho',
    emoji: '📖',
    image: 'ほん',
    imageJapanese: 'ほん',
    sound: 'ほ',
  ),
  
  // ま行 (ma-row)
  PictureCard(
    id: 'ma',
    character: 'ま',
    romanji: 'ma',
    emoji: '🪟',
    image: 'まど',
    imageJapanese: 'まど',
    sound: 'ま',
  ),
  PictureCard(
    id: 'mi',
    character: 'み',
    romanji: 'mi',
    emoji: '👂',
    image: 'みみ',
    imageJapanese: 'みみ',
    sound: 'み',
  ),
  PictureCard(
    id: 'mu',
    character: 'む',
    romanji: 'mu',
    emoji: '🐛',
    image: 'むし',
    imageJapanese: 'むし',
    sound: 'む',
  ),
  PictureCard(
    id: 'me',
    character: 'め',
    romanji: 'me',
    emoji: '👁️',
    image: 'め',
    imageJapanese: 'め',
    sound: 'め',
  ),
  PictureCard(
    id: 'mo',
    character: 'も',
    romanji: 'mo',
    emoji: '🍑',
    image: 'もも',
    imageJapanese: 'もも',
    sound: 'も',
  ),
  
  // や行 (ya-row)
  PictureCard(
    id: 'ya',
    character: 'や',
    romanji: 'ya',
    emoji: '🏔️',
    image: 'やま',
    imageJapanese: 'やま',
    sound: 'や',
  ),
  PictureCard(
    id: 'yu',
    character: 'ゆ',
    romanji: 'yu',
    emoji: '🛁',
    image: 'ゆ',
    imageJapanese: 'ゆ',
    sound: 'ゆ',
  ),
  PictureCard(
    id: 'yo',
    character: 'よ',
    romanji: 'yo',
    emoji: '🌃',
    image: 'よる',
    imageJapanese: 'よる',
    sound: 'よ',
  ),
  
  // ら行 (ra-row)
  PictureCard(
    id: 'ra',
    character: 'ら',
    romanji: 'ra',
    emoji: '🎺',
    image: 'らっぱ',
    imageJapanese: 'らっぱ',
    sound: 'ら',
  ),
  PictureCard(
    id: 'ri',
    character: 'り',
    romanji: 'ri',
    emoji: '🍏',
    image: 'りんご',
    imageJapanese: 'りんご',
    sound: 'り',
  ),
  PictureCard(
    id: 'ru',
    character: 'る',
    romanji: 'ru',
    emoji: '📏',
    image: 'ルール',
    imageJapanese: 'ルール',
    sound: 'る',
  ),
  PictureCard(
    id: 're',
    character: 'れ',
    romanji: 're',
    emoji: '🧊',
    image: 'れいぞうこ',
    imageJapanese: 'れいぞうこ',
    sound: 'れ',
  ),
  PictureCard(
    id: 'ro',
    character: 'ろ',
    romanji: 'ro',
    emoji: '🕯️',
    image: 'ろうそく',
    imageJapanese: 'ろうそく',
    sound: 'ろ',
  ),
  
  // わ行 (wa-row)
  PictureCard(
    id: 'wa',
    character: 'わ',
    romanji: 'wa',
    emoji: '🐊',
    image: 'わに',
    imageJapanese: 'わに',
    sound: 'わ',
  ),
  PictureCard(
    id: 'wo',
    character: 'を',
    romanji: 'wo',
    emoji: '💍',
    image: 'をかざり',
    imageJapanese: 'をかざり',
    sound: 'を',
  ),
  
  // ん (n)
  PictureCard(
    id: 'n',
    character: 'ん',
    romanji: 'n',
    emoji: '🍞',
    image: 'パン',
    imageJapanese: 'パン',
    sound: 'ん',
  ),
];

// Katakana cards for future implementation
const List<PictureCard> katakanaCards = [
  PictureCard(
    id: 'a',
    character: 'ア',
    romanji: 'a',
    emoji: '🍦',
    image: 'アイス',
    imageJapanese: 'アイス',
    sound: 'ア',
  ),
  PictureCard(
    id: 'i',
    character: 'イ',
    romanji: 'i',
    emoji: '🍓',
    image: 'イチゴ',
    imageJapanese: 'イチゴ',
    sound: 'イ',
  ),
  PictureCard(
    id: 'u',
    character: 'ウ',
    romanji: 'u',
    emoji: '🐰',
    image: 'ウサギ',
    imageJapanese: 'ウサギ',
    sound: 'ウ',
  ),
  PictureCard(
    id: 'e',
    character: 'エ',
    romanji: 'e',
    emoji: '🎽',
    image: 'エプロン',
    imageJapanese: 'エプロン',
    sound: 'エ',
  ),
  PictureCard(
    id: 'o',
    character: 'オ',
    romanji: 'o',
    emoji: '🍊',
    image: 'オレンジ',
    imageJapanese: 'オレンジ',
    sound: 'オ',
  ),
  PictureCard(
    id: 'ka',
    character: 'カ',
    romanji: 'ka',
    emoji: '📷',
    image: 'カメラ',
    imageJapanese: 'カメラ',
    sound: 'カ',
  ),
  PictureCard(
    id: 'ki',
    character: 'キ',
    romanji: 'ki',
    emoji: '🔑',
    image: 'キー',
    imageJapanese: 'キー',
    sound: 'キ',
  ),
  PictureCard(
    id: 'ku',
    character: 'ク',
    romanji: 'ku',
    emoji: '🍪',
    image: 'クッキー',
    imageJapanese: 'クッキー',
    sound: 'ク',
  ),
];

// Memory Card class for memory game
class MemoryCard {
  final int id;
  final String character;
  final String emoji;
  final int pairId;

  MemoryCard({
    required this.id,
    required this.character,
    required this.emoji,
    required this.pairId,
  });
}

// Falling Character class for Fast Tap game
class FallingCharacter {
  final String character;
  final String emoji;
  double position; // 0.0 to 1.0 (top to bottom)
  final double horizontalPosition; // 0.0 to 1.0 (left to right)

  FallingCharacter({
    required this.character,
    required this.emoji,
    required this.position,
    required this.horizontalPosition,
  });
}
