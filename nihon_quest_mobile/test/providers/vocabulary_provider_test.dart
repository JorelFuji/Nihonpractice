import 'package:flutter_test/flutter_test.dart';
import 'package:nihon_quest_mobile/providers/vocabulary_provider.dart';

void main() {
  group('VocabularyProvider Tests', () {
    late VocabularyProvider provider;

    setUp(() {
      provider = VocabularyProvider();
    });

    test('initial state should be empty', () {
      expect(provider.masteredCharacters, isEmpty);
      expect(provider.totalGamesPlayed, equals(0));
      expect(provider.totalScore, equals(0));
      expect(provider.progressPercent, equals(0.0));
    });

    test('should add mastered character', () {
      provider.addMasteredCharacter('a');
      
      expect(provider.masteredCharacters, contains('a'));
      expect(provider.masteredCharacters.length, equals(1));
    });

    test('should not add duplicate mastered character', () {
      provider.addMasteredCharacter('a');
      provider.addMasteredCharacter('a');
      
      expect(provider.masteredCharacters.length, equals(1));
    });

    test('should increment games played', () {
      provider.incrementGamesPlayed();
      expect(provider.totalGamesPlayed, equals(1));
      
      provider.incrementGamesPlayed();
      expect(provider.totalGamesPlayed, equals(2));
    });

    test('should add score', () {
      provider.addScore(10);
      expect(provider.totalScore, equals(10));
      
      provider.addScore(25);
      expect(provider.totalScore, equals(35));
    });

    test('should calculate progress percentage', () {
      // Add 10 mastered characters (out of 46 hiragana)
      for (var i = 0; i < 10; i++) {
        provider.addMasteredCharacter('char_$i');
      }
      
      // 10 / 46 * 100 = ~21.74%
      expect(provider.progressPercent, closeTo(21.74, 0.1));
    });

    test('should get unmastered cards', () {
      provider.addMasteredCharacter('a');
      provider.addMasteredCharacter('i');
      
      final unmasteredCards = provider.getUnmasteredCards();
      
      expect(unmasteredCards.length, lessThan(provider.hiraganaCards.length));
      expect(unmasteredCards.any((card) => card.id == 'a'), isFalse);
      expect(unmasteredCards.any((card) => card.id == 'i'), isFalse);
    });

    test('should get mastered cards', () {
      provider.addMasteredCharacter('a');
      provider.addMasteredCharacter('i');
      
      final masteredCards = provider.getMasteredCards();
      
      expect(masteredCards.length, equals(2));
      expect(masteredCards.any((card) => card.id == 'a'), isTrue);
      expect(masteredCards.any((card) => card.id == 'i'), isTrue);
    });

    test('should reset progress', () {
      provider.addMasteredCharacter('a');
      provider.incrementGamesPlayed();
      provider.addScore(100);
      
      provider.resetProgress();
      
      expect(provider.masteredCharacters, isEmpty);
      expect(provider.totalGamesPlayed, equals(0));
      expect(provider.totalScore, equals(0));
    });

    test('should have access to hiragana cards', () {
      expect(provider.hiraganaCards, isNotEmpty);
      expect(provider.hiraganaCards.length, equals(46));
    });

    test('should have access to katakana cards', () {
      expect(provider.katakanaCards, isNotEmpty);
    });
  });
}
