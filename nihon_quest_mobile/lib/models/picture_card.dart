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

// Hiragana cards for matching game
const List<PictureCard> hiraganaCards = [
  PictureCard(
    id: 'a',
    character: 'あ',
    romanji: 'a',
    emoji: '🍎',
    image: 'Apple',
    imageJapanese: 'りんご',
    sound: 'あ',
  ),
  PictureCard(
    id: 'i',
    character: 'い',
    romanji: 'i',
    emoji: '🦷',
    image: 'Tooth',
    imageJapanese: 'は',
    sound: 'い',
  ),
  PictureCard(
    id: 'u',
    character: 'う',
    romanji: 'u',
    emoji: '🐰',
    image: 'Rabbit',
    imageJapanese: 'うさぎ',
    sound: 'う',
  ),
  PictureCard(
    id: 'e',
    character: 'え',
    romanji: 'e',
    emoji: '✏️',
    image: 'Pencil',
    imageJapanese: 'えんぴつ',
    sound: 'え',
  ),
  PictureCard(
    id: 'o',
    character: 'お',
    romanji: 'o',
    emoji: '👑',
    image: 'King',
    imageJapanese: 'おう',
    sound: 'お',
  ),
  PictureCard(
    id: 'ka',
    character: 'か',
    romanji: 'ka',
    emoji: '🚗',
    image: 'Car',
    imageJapanese: 'くるま',
    sound: 'か',
  ),
  PictureCard(
    id: 'ki',
    character: 'き',
    romanji: 'ki',
    emoji: '🌳',
    image: 'Tree',
    imageJapanese: 'き',
    sound: 'き',
  ),
  PictureCard(
    id: 'ku',
    character: 'く',
    romanji: 'ku',
    emoji: '☁️',
    image: 'Cloud',
    imageJapanese: 'くも',
    sound: 'く',
  ),
];

// Katakana cards for future implementation
const List<PictureCard> katakanaCards = [
  PictureCard(
    id: 'a',
    character: 'ア',
    romanji: 'a',
    emoji: '🍦',
    image: 'Ice Cream',
    imageJapanese: 'アイス',
    sound: 'ア',
  ),
  PictureCard(
    id: 'i',
    character: 'イ',
    romanji: 'i',
    emoji: '🍓',
    image: 'Strawberry',
    imageJapanese: 'いちご',
    sound: 'イ',
  ),
  PictureCard(
    id: 'u',
    character: 'ウ',
    romanji: 'u',
    emoji: '🎾',
    image: 'Tennis',
    imageJapanese: 'テニス',
    sound: 'ウ',
  ),
  PictureCard(
    id: 'e',
    character: 'エ',
    romanji: 'e',
    emoji: '🏃',
    image: 'Running',
    imageJapanese: 'はしる',
    sound: 'エ',
  ),
  PictureCard(
    id: 'o',
    character: 'オ',
    romanji: 'o',
    emoji: '🐺',
    image: 'Wolf',
    imageJapanese: 'おおかみ',
    sound: 'オ',
  ),
  PictureCard(
    id: 'ka',
    character: 'カ',
    romanji: 'ka',
    emoji: '📷',
    image: 'Camera',
    imageJapanese: 'カメラ',
    sound: 'カ',
  ),
  PictureCard(
    id: 'ki',
    character: 'キ',
    romanji: 'ki',
    emoji: '🔑',
    image: 'Key',
    imageJapanese: 'かぎ',
    sound: 'キ',
  ),
  PictureCard(
    id: 'ku',
    character: 'ク',
    romanji: 'ku',
    emoji: '🍪',
    image: 'Cookie',
    imageJapanese: 'クッキー',
    sound: 'ク',
  ),
];
