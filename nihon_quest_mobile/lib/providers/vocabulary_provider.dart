import 'package:flutter/foundation.dart';
import '../models/picture_card.dart' as cards;
import '../models/picture_card.dart' show PictureCard;

class VocabularyProvider with ChangeNotifier {
  final List<PictureCard> _hiraganaCards = cards.hiraganaCards;
  final List<PictureCard> _katakanaCards = cards.katakanaCards;
  
  List<String> _masteredCharacters = [];
  int _totalGamesPlayed = 0;
  int _totalScore = 0;
  
  List<PictureCard> get hiraganaCards => _hiraganaCards;
  List<PictureCard> get katakanaCards => _katakanaCards;
  List<String> get masteredCharacters => _masteredCharacters;
  int get totalGamesPlayed => _totalGamesPlayed;
  int get totalScore => _totalScore;
  
  double get progressPercent {
    if (_hiraganaCards.isEmpty) return 0;
    return (_masteredCharacters.length / _hiraganaCards.length) * 100;
  }
  
  void addMasteredCharacter(String characterId) {
    if (!_masteredCharacters.contains(characterId)) {
      _masteredCharacters.add(characterId);
      notifyListeners();
    }
  }
  
  void incrementGamesPlayed() {
    _totalGamesPlayed++;
    notifyListeners();
  }
  
  void addScore(int points) {
    _totalScore += points;
    notifyListeners();
  }
  
  List<PictureCard> getUnmasteredCards() {
    return _hiraganaCards
        .where((card) => !_masteredCharacters.contains(card.id))
        .toList();
  }
  
  List<PictureCard> getMasteredCards() {
    return _hiraganaCards
        .where((card) => _masteredCharacters.contains(card.id))
        .toList();
  }
  
  void resetProgress() {
    _masteredCharacters.clear();
    _totalGamesPlayed = 0;
    _totalScore = 0;
    notifyListeners();
  }
}
