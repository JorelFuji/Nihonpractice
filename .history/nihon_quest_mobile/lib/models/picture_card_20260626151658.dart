class PictureCard {
  final String id;
  final String character;
  final String romanji;
  final String emoji;
  final String image;
  final String? sound;

  const PictureCard({
    required this.id,
    required this.character,
    required this.romanji,
    required this.emoji,
    required this.image,
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
    sound: 'あ',
  ),
  PictureCard(
    id: 'i',
    character: 'い',
    romanji: 'i',
    emoji: '🦷',
    image: 'Tooth',
    sound: 'い',
  ),
  PictureCard(
    id: 'u',
    character: 'う',
    romanji: 'u',
    emoji: '🐰',
    image: 'Rabbit',
    sound: 'う',
  ),
  PictureCard(
    id: 'e',
    character: 'え',
    romanji: 'e',
    emoji: '✏️',
    image: 'Pencil',
    sound: 'え',
  ),
  PictureCard(
    id: 'o',
    character: 'お',
    romanji: 'o',
    emoji: '👑',
    image: 'King',
    sound: 'お',
  ),
  PictureCard(
    id: 'ka',
    character: 'か',
    romanji: 'ka',
    emoji: '🚗',
    image: 'Car',
    sound: 'か',
  ),
  PictureCard(
    id: 'ki',
    character: 'き',
    romanji: 'ki',
    emoji: '🌳',
    image: 'Tree',
    sound: 'き',
  ),
  PictureCard(
    id: 'ku',
    character: 'く',
    romanji: 'ku',
    emoji: '☁️',
    image: 'Cloud',
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
    sound: 'ア',
  ),
  PictureCard(
    id: 'i',
    character: 'イ',
    romanji: 'i',
    emoji: '🍓',
    image: 'Strawberry',
    sound: 'イ',
  ),
  PictureCard(
    id: 'u',
    character: 'ウ',
    romanji: 'u',
    emoji: '🎾',
    image: 'Tennis',
    sound: 'ウ',
  ),
  PictureCard(
    id: 'e',
    character: 'エ',
    romanji: 'e',
    emoji: '🏃',
    image: 'Running',
    sound: 'エ',
  ),
  PictureCard(
    id: 'o',
    character: 'オ',
    romanji: 'o',
    emoji: '🐺',
    image: 'Wolf',
    sound: 'オ',
  ),
  PictureCard(
    id: 'ka',
    character: 'カ',
    romanji: 'ka',
    emoji: '📷',
    image: 'Camera',
    sound: 'カ',
  ),
  PictureCard(
    id: 'ki',
    character: 'キ',
    romanji: 'ki',
    emoji: '🔑',
    image: 'Key',
    sound: 'キ',
  ),
  PictureCard(
    id: 'ku',
    character: 'ク',
    romanji: 'ku',
    emoji: '🍪',
    image: 'Cookie',
    sound: 'ク',
  ),
];
