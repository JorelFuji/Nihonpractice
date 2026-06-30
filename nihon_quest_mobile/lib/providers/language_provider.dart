import 'package:flutter/foundation.dart';
import '../models/game_text.dart';

class LanguageState {
  final GameLanguage language;
  final bool showBothLanguages;

  LanguageState({
    this.language = GameLanguage.japanese_hiragana,
    this.showBothLanguages = true,
  });

  LanguageState copyWith({
    GameLanguage? language,
    bool? showBothLanguages,
  }) {
    return LanguageState(
      language: language ?? this.language,
      showBothLanguages: showBothLanguages ?? this.showBothLanguages,
    );
  }
}

class LanguageNotifier extends ChangeNotifier {
  LanguageState _state = LanguageState();

  LanguageState get state => _state;

  void setLanguage(GameLanguage language) {
    _state = _state.copyWith(language: language);
    notifyListeners();
  }

  void toggleBilingual() {
    _state = _state.copyWith(showBothLanguages: !_state.showBothLanguages);
    notifyListeners();
  }

  String getText(String key) {
    return GameText.get(key, _state.language.code);
  }

  String getBilingualText(String key) {
    if (!_state.showBothLanguages) {
      return getText(key);
    }
    
    final japanese = GameText.get(key, _state.language.code);
    final english = GameText.get(key, 'en');
    
    if (_state.language == GameLanguage.english) {
      return english;
    }
    
    return '$japanese\n$english';
  }
}
