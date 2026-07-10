import 'package:flutter_test/flutter_test.dart';
import 'package:nihon_quest_mobile/models/picture_card.dart';

void main() {
  group('PictureCard Model Tests', () {
    test('hiraganaCards should have 46 cards', () {
      expect(hiraganaCards.length, equals(46));
    });

    test('katakanaCards should have at least 8 cards', () {
      expect(katakanaCards.length, greaterThanOrEqualTo(8));
    });

    test('all hiragana cards should have required fields', () {
      for (var card in hiraganaCards) {
        expect(card.id, isNotEmpty);
        expect(card.character, isNotEmpty);
        expect(card.romanji, isNotEmpty);
        expect(card.emoji, isNotEmpty);
        expect(card.image, isNotEmpty);
        expect(card.imageJapanese, isNotEmpty);
      }
    });

    test('all hiragana cards should have Japanese image text', () {
      for (var card in hiraganaCards) {
        // Check that image field is Japanese (contains hiragana/katakana)
        expect(card.image, isNot(contains(RegExp(r'[A-Z][a-z]+'))),
            reason: 'Card ${card.id} has English text in image field: ${card.image}');
      }
    });

    test('image and imageJapanese should match for all cards', () {
      for (var card in hiraganaCards) {
        expect(card.image, equals(card.imageJapanese),
            reason: 'Card ${card.id} image fields do not match');
      }
    });

    test('specific word りんご should exist', () {
      final appleCard = hiraganaCards.firstWhere(
        (card) => card.imageJapanese == 'りんご',
        orElse: () => throw Exception('りんご card not found'),
      );
      
      expect(appleCard.character, equals('り'));
      expect(appleCard.romanji, equals('ri'));
      expect(appleCard.emoji, equals('🍏'));
      expect(appleCard.image, equals('りんご'));
    });

    test('specific word ねこ should exist', () {
      final catCard = hiraganaCards.firstWhere(
        (card) => card.imageJapanese == 'ねこ',
        orElse: () => throw Exception('ねこ card not found'),
      );
      
      expect(catCard.character, equals('ね'));
      expect(catCard.romanji, equals('ne'));
      expect(catCard.emoji, equals('🐱'));
      expect(catCard.image, equals('ねこ'));
    });

    test('specific word は should exist', () {
      final toothCard = hiraganaCards.firstWhere(
        (card) => card.character == 'は' && card.imageJapanese == 'は',
        orElse: () => throw Exception('は card not found'),
      );
      
      expect(toothCard.romanji, equals('ha'));
      expect(toothCard.emoji, equals('🦷'));
      expect(toothCard.image, equals('は'));
    });

    test('all hiragana card IDs should be unique', () {
      final ids = hiraganaCards.map((card) => card.id).toList();
      final uniqueIds = ids.toSet();
      expect(ids.length, equals(uniqueIds.length),
          reason: 'Duplicate IDs found in hiragana cards');
    });

    test('all katakana cards should have Japanese image text', () {
      for (var card in katakanaCards) {
        // Check that image field is Japanese (no English words like "Apple", "Ice Cream")
        expect(card.image, isNot(contains(RegExp(r'[A-Z][a-z]+'))),
            reason: 'Card ${card.id} has English text in image field: ${card.image}');
      }
    });

    test('katakana image and imageJapanese should match', () {
      for (var card in katakanaCards) {
        expect(card.image, equals(card.imageJapanese),
            reason: 'Katakana card ${card.id} image fields do not match');
      }
    });
  });

  group('PictureCard Japanese Character Tests', () {
    test('all basic hiragana characters should be present', () {
      final basicChars = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ',
                         'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と',
                         'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ',
                         'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ',
                         'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん'];
      
      for (var char in basicChars) {
        expect(
          hiraganaCards.any((card) => card.character == char),
          isTrue,
          reason: 'Character $char not found in hiragana cards',
        );
      }
    });

    test('all cards should have valid emoji', () {
      for (var card in hiraganaCards) {
        expect(card.emoji, isNotEmpty);
        // Basic check that it looks like an emoji (could be improved)
        expect(card.emoji.length, greaterThanOrEqualTo(1));
      }
    });
  });

  group('PictureCard Consistency Tests', () {
    final testWords = {
      'りんご': {'char': 'り', 'romaji': 'ri'},
      'うさぎ': {'char': 'う', 'romaji': 'u'},
      'ねこ': {'char': 'ね', 'romaji': 'ne'},
      'き': {'char': 'き', 'romaji': 'ki'},
      'さかな': {'char': 'さ', 'romaji': 'sa'},
    };

    testWords.forEach((word, details) {
      test('word $word should have correct character and romaji', () {
        final card = hiraganaCards.firstWhere(
          (c) => c.imageJapanese == word,
          orElse: () => throw Exception('$word not found'),
        );
        
        expect(card.character, equals(details['char']));
        expect(card.romanji, equals(details['romaji']));
        expect(card.image, equals(word));
      });
    });
  });
}
