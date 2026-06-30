class KanjiItem {
  final String kanji;
  final String reading;
  final String meaning;
  final String level;

  KanjiItem({
    required this.kanji,
    required this.reading,
    required this.meaning,
    required this.level,
  });

  static List<KanjiItem> getN5Kanji() {
    return [
      KanjiItem(kanji: '日', reading: 'ひ', meaning: 'sun/day', level: 'N5'),
      KanjiItem(kanji: '月', reading: 'つき', meaning: 'moon/month', level: 'N5'),
      KanjiItem(kanji: '火', reading: 'ひ', meaning: 'fire', level: 'N5'),
      KanjiItem(kanji: '水', reading: 'みず', meaning: 'water', level: 'N5'),
      KanjiItem(kanji: '木', reading: 'き', meaning: 'tree/wood', level: 'N5'),
      KanjiItem(kanji: '金', reading: 'きん', meaning: 'gold/money', level: 'N5'),
      KanjiItem(kanji: '土', reading: 'つち', meaning: 'earth/soil', level: 'N5'),
      KanjiItem(kanji: '人', reading: 'ひと', meaning: 'person', level: 'N5'),
      KanjiItem(kanji: '山', reading: 'やま', meaning: 'mountain', level: 'N5'),
      KanjiItem(kanji: '川', reading: 'かわ', meaning: 'river', level: 'N5'),
      KanjiItem(kanji: '田', reading: 'た', meaning: 'rice field', level: 'N5'),
      KanjiItem(kanji: '目', reading: 'め', meaning: 'eye', level: 'N5'),
      KanjiItem(kanji: '口', reading: 'くち', meaning: 'mouth', level: 'N5'),
      KanjiItem(kanji: '手', reading: 'て', meaning: 'hand', level: 'N5'),
      KanjiItem(kanji: '足', reading: 'あし', meaning: 'foot/leg', level: 'N5'),
      KanjiItem(kanji: '雨', reading: 'あめ', meaning: 'rain', level: 'N5'),
      KanjiItem(kanji: '空', reading: 'そら', meaning: 'sky', level: 'N5'),
      KanjiItem(kanji: '花', reading: 'はな', meaning: 'flower', level: 'N5'),
      KanjiItem(kanji: '犬', reading: 'いぬ', meaning: 'dog', level: 'N5'),
      KanjiItem(kanji: '猫', reading: 'ねこ', meaning: 'cat', level: 'N5'),
      KanjiItem(kanji: '車', reading: 'くるま', meaning: 'car', level: 'N5'),
      KanjiItem(kanji: '本', reading: 'ほん', meaning: 'book', level: 'N5'),
      KanjiItem(kanji: '学', reading: 'がく', meaning: 'study', level: 'N5'),
      KanjiItem(kanji: '生', reading: 'せい', meaning: 'life/birth', level: 'N5'),
      KanjiItem(kanji: '先', reading: 'せん', meaning: 'before/ahead', level: 'N5'),
    ];
  }
}
