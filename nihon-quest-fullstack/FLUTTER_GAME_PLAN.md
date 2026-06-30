# 🎮 Japanese Learning Game - Minecraft/Roblox Style in Flutter

## 🎯 **Project Vision**

Build a **3D voxel-based educational game** where kids learn Japanese through exploration, building, and interactive challenges. Think "Minecraft meets Duolingo" - a sandbox world where learning Japanese unlocks new abilities, items, and areas.

---

## 🏗️ **Game Concept: "NihonCraft" (日本クラフト)**

### **Core Gameplay Loop**
1. **Explore** a Japanese-themed voxel world (villages, temples, cities)
2. **Learn** Japanese through NPCs, signs, quests
3. **Build** structures using learned vocabulary
4. **Unlock** new areas by completing language challenges
5. **Multiplayer** - practice with other learners

### **Educational Integration**
- NPCs speak Japanese (with furigana/romaji)
- Building blocks labeled in Japanese
- Quests require reading/writing Japanese
- Voice chat for speaking practice
- Kanji treasure hunts
- Grammar puzzle dungeons

---

## 🛠️ **Technology Stack**

### **Game Engine: Flame + Flutter**
```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # Game Engine
  flame: ^1.18.0              # 2D/3D game engine for Flutter
  flame_3d: ^0.1.0            # 3D rendering (experimental)
  flame_forge2d: ^0.16.0      # Physics engine
  flame_audio: ^2.1.0         # Sound effects & music
  
  # 3D Voxel Alternative
  vector_math: ^2.1.4         # 3D math
  flutter_cube: ^0.1.1        # 3D object rendering
  
  # Backend (Firebase)
  firebase_core: ^3.6.0
  firebase_auth: ^5.3.1
  cloud_firestore: ^5.4.4
  firebase_storage: ^12.3.4
  
  # Multiplayer
  firebase_database: ^11.1.4  # Realtime sync
  
  # AI/Learning
  firebase_ai: ^0.3.0         # Gemini for NPC conversations
  google_mlkit_text_recognition: ^0.13.1  # OCR for handwriting
  
  # State Management
  riverpod: ^2.6.1
  
  # UI
  google_fonts: ^6.2.1
  flutter_animate: ^4.5.0
```

### **Alternative: Godot + Flutter Hybrid**
If 3D performance is critical:
- **Godot 4.x** for game engine (free, MIT license)
- **Flutter** for UI/menus/learning modules
- **GDScript** or **C#** for game logic
- **Firebase** for backend (same as above)

---

## 🎨 **Game Architecture**

### **1. World Structure**

```
NihonCraft World
├── Tutorial Island (N5 basics)
│   ├── Hiragana Village
│   ├── Katakana Caves
│   └── Basic Grammar Temple
│
├── Mainland (N4-N3)
│   ├── Particle Plains
│   ├── Verb Conjugation Mountains
│   ├── City of Conversations
│   └── Keigo Castle
│
├── Advanced Islands (N2-N1)
│   ├── Business District
│   ├── Literary Library
│   └── Cultural Festival Grounds
│
└── Multiplayer Hub
    ├── Practice Dojo
    ├── Trading Post
    └── Collaborative Build Zones
```

### **2. Learning Mechanics**

#### **A. Vocabulary System**
```dart
class VocabularyItem {
  final String id;
  final String kanji;
  final String hiragana;
  final String romaji;
  final String english;
  final String category; // 'block', 'tool', 'npc', 'action'
  final int jlptLevel;
  final String audioUrl;
  
  // Game integration
  final String blockTexture;
  final ItemRarity rarity;
}
```

**In-Game Usage:**
- **Blocks** labeled in Japanese (木 = wood, 石 = stone)
- **Tools** require knowing the name to craft
- **NPCs** teach new words through dialogue
- **Signs** in Japanese guide players

#### **B. Grammar Challenges**

**Particle Puzzles:**
```
Quest: "Build a sentence bridge"
- Drag particles (は、が、を、に) to complete sentences
- Correct answers unlock bridge pieces
- Bridge connects to new island
```

**Verb Conjugation Dungeons:**
```
Challenge: "Conjugate to proceed"
- Each room requires correct verb form
- て-form opens doors
- た-form reveals treasures
- Potential form unlocks abilities
```

**Conversation Quests:**
```
NPC Dialogue Trees:
- Multiple choice responses in Japanese
- Correct grammar = quest progress
- Wrong answer = NPC gives hints
- Natural conversation practice
```

#### **C. Kanji Collection**

**Kanji as Collectibles:**
- Each kanji is a "rune" you collect
- Combine kanji to craft items (木 + 火 = 林)
- Kanji power-ups (力 = strength boost)
- Rare kanji in hidden locations

**Reading Challenges:**
- Signs point to treasures
- Books contain lore in Japanese
- Scrolls teach new abilities
- Newspapers with current events (N2+)

---

## 🎮 **Core Game Features**

### **1. Voxel Building System**

```dart
class VoxelWorld {
  Map<Vector3, Block> blocks = {};
  
  void placeBlock(Vector3 position, BlockType type) {
    blocks[position] = Block(
      type: type,
      name: getJapaneseName(type),
      description: getJapaneseDescription(type),
    );
  }
  
  void removeBlock(Vector3 position) {
    blocks.remove(position);
  }
  
  List<Block> getVisibleBlocks(Camera camera) {
    // Frustum culling for performance
  }
}
```

**Block Types (with Japanese names):**
- 土 (tsuchi) - Dirt
- 石 (ishi) - Stone
- 木 (ki) - Wood
- 水 (mizu) - Water
- 草 (kusa) - Grass
- 砂 (suna) - Sand
- レンガ (renga) - Brick
- ガラス (garasu) - Glass

### **2. NPC System with AI**

```dart
class JapaneseNPC {
  final String name;
  final int jlptLevel;
  final List<DialogueNode> dialogueTree;
  
  // AI-powered conversations
  Future<String> respondToPlayer(String playerInput) async {
    // Use Firebase AI (Gemini) for dynamic responses
    final response = await FirebaseAI.generateResponse(
      context: "You are a friendly Japanese NPC teaching ${jlptLevel} level Japanese",
      userInput: playerInput,
      constraints: "Respond in Japanese with furigana",
    );
    return response;
  }
}
```

**NPC Types:**
- **Teachers** - Formal lessons
- **Shopkeepers** - Transactional Japanese
- **Friends** - Casual conversation
- **Elders** - Keigo practice
- **Kids** - Simple, playful language

### **3. Quest System**

```dart
class Quest {
  final String id;
  final BilingualText title;
  final BilingualText description;
  final QuestType type;
  final List<QuestObjective> objectives;
  final List<Reward> rewards;
  final int requiredJLPTLevel;
  
  bool isComplete() {
    return objectives.every((obj) => obj.isComplete);
  }
}

enum QuestType {
  vocabulary,    // Learn 10 new words
  grammar,       // Complete particle puzzle
  conversation,  // Talk to 3 NPCs
  reading,       // Read 5 signs
  writing,       // Write 3 sentences
  building,      // Build structure with Japanese labels
  exploration,   // Find hidden kanji
}
```

**Example Quests:**

**N5 Quest: "Welcome to Hiragana Village"**
```
Objectives:
1. Learn 10 hiragana characters
2. Read the village welcome sign
3. Introduce yourself to 3 villagers
4. Build a house (家 - ie)

Rewards:
- Hiragana Pickaxe (mines faster)
- 100 experience points
- Access to Katakana Caves
```

**N4 Quest: "The Particle Plains Challenge"**
```
Objectives:
1. Complete 5 particle puzzles
2. Use を correctly in 3 sentences
3. Navigate using に and で directions
4. Build a particle monument

Rewards:
- Particle Compass (shows correct usage)
- Grammar boost (25% faster learning)
- Unlock Verb Mountains
```

### **4. Multiplayer Features**

```dart
class MultiplayerManager {
  final FirebaseDatabase database;
  
  // Realtime player positions
  Stream<Map<String, PlayerData>> getOnlinePlayers() {
    return database.ref('players').onValue.map((event) {
      // Parse player data
    });
  }
  
  // Collaborative building
  void syncBlockPlacement(Vector3 position, Block block) {
    database.ref('world/blocks/${position.hash}').set(block.toJson());
  }
  
  // Voice chat for speaking practice
  void enableVoiceChat(String roomId) {
    // WebRTC integration
  }
}
```

**Multiplayer Modes:**
- **Co-op Building** - Build together, label in Japanese
- **Practice Dojo** - Conversation practice with other learners
- **Quiz Battles** - Competitive grammar challenges
- **Trading Post** - Negotiate in Japanese
- **Cultural Events** - Seasonal festivals (お正月, 花見, etc.)

---

## 📱 **UI/UX Design**

### **Main Menu**
```
┌─────────────────────────────────────┐
│   🏯 NihonCraft - 日本クラフト       │
│                                     │
│   [シングルプレイ / Single Player]   │
│   [マルチプレイ / Multiplayer]       │
│   [学習モード / Learning Mode]       │
│   [設定 / Settings]                 │
│                                     │
│   Progress: N5 ████░░ 80%          │
└─────────────────────────────────────┘
```

### **In-Game HUD**
```
┌─────────────────────────────────────┐
│ HP: ❤️❤️❤️❤️❤️                      │
│ 経験値 (XP): ████████░░ 850/1000   │
│                                     │
│ Hotbar:                             │
│ [木] [石] [土] [水] [剣] [本]       │
│                                     │
│ Current Quest:                      │
│ 「助詞の平原」を完成する             │
│ Complete Particle Plains            │
│ Progress: 3/5 puzzles               │
└─────────────────────────────────────┘
```

### **Learning Panel (Overlay)**
```
┌─────────────────────────────────────┐
│   📚 New Word Learned!              │
│                                     │
│   木 (き / ki)                      │
│   Tree / Wood                       │
│                                     │
│   Example:                          │
│   木を切る (ki wo kiru)             │
│   Cut a tree                        │
│                                     │
│   [🔊 Listen] [✏️ Practice] [✓ Got it] │
└─────────────────────────────────────┘
```

---

## 🎯 **Learning Progression System**

### **Experience & Leveling**

```dart
class PlayerProgress {
  int totalXP = 0;
  int currentLevel = 1;
  JLPTLevel jlptLevel = JLPTLevel.N5;
  
  Map<String, int> skillLevels = {
    'vocabulary': 0,
    'grammar': 0,
    'reading': 0,
    'listening': 0,
    'speaking': 0,
  };
  
  Set<String> learnedWords = {};
  Set<String> learnedGrammar = {};
  Set<String> learnedKanji = {};
  
  void addXP(int amount, String skill) {
    totalXP += amount;
    skillLevels[skill] = (skillLevels[skill] ?? 0) + amount;
    checkLevelUp();
  }
  
  void checkLevelUp() {
    int newLevel = (totalXP / 1000).floor() + 1;
    if (newLevel > currentLevel) {
      currentLevel = newLevel;
      unlockNewContent();
    }
  }
}
```

### **Spaced Repetition Integration**

```dart
class SRSManager {
  // Integrate with existing grammar roadmap
  Map<String, SRSCard> cards = {};
  
  void reviewWord(String wordId, bool correct) {
    if (correct) {
      cards[wordId]?.levelUp();
    } else {
      cards[wordId]?.reset();
    }
  }
  
  List<SRSCard> getDueCards() {
    return cards.values
        .where((card) => card.isDue())
        .toList();
  }
}
```

**In-Game SRS:**
- NPCs quiz you on old vocabulary
- Signs use previously learned words
- Building requires recalling kanji
- Natural spaced repetition through gameplay

---

## 🎨 **Art Style & Assets**

### **Visual Style**
- **Voxel-based** (Minecraft-like)
- **Japanese aesthetic** - temples, torii gates, pagodas
- **Colorful & friendly** - appeal to kids
- **Clear text** - readable Japanese with furigana

### **Asset Creation**

**Free Tools:**
- **MagicaVoxel** - Free voxel editor
- **Blockbench** - Free 3D modeling for voxel games
- **Blender** - Free 3D modeling (if needed)
- **Aseprite** - Pixel art (paid but cheap)

**Asset Packs (Free/Paid):**
- **Kenney.nl** - Free game assets
- **OpenGameArt** - Free community assets
- **itch.io** - Affordable asset packs

### **Japanese-Themed Assets**
- Traditional buildings (寺、神社、城)
- Cherry blossom trees (桜)
- Lanterns (提灯)
- Tatami mats (畳)
- Shoji screens (障子)
- Torii gates (鳥居)
- Koi ponds (鯉)

---

## 🔊 **Audio Design**

### **Sound Effects**
```dart
class AudioManager {
  final FlameAudio audio;
  
  void playBlockPlace() => audio.play('block_place.mp3');
  void playBlockBreak() => audio.play('block_break.mp3');
  void playQuestComplete() => audio.play('quest_complete.mp3');
  void playLevelUp() => audio.play('level_up.mp3');
  
  // Japanese pronunciation
  void playWordAudio(String word) {
    audio.play('words/$word.mp3');
  }
}
```

### **Music**
- **Traditional Japanese instruments** (koto, shamisen, taiko)
- **Ambient exploration music**
- **Upbeat battle/challenge music**
- **Calm learning mode music**

**Free Music Sources:**
- **Incompetech** (Kevin MacLeod)
- **Purple Planet Music**
- **Bensound**

---

## 🚀 **Development Roadmap**

### **Phase 1: Prototype (2-3 months)**
- ✅ Basic voxel world rendering
- ✅ Player movement & camera
- ✅ Block placement/removal
- ✅ Simple NPC dialogue
- ✅ Firebase integration
- ✅ Basic vocabulary system
- ✅ N5 content (hiragana, basic words)

### **Phase 2: Core Gameplay (3-4 months)**
- ✅ Quest system
- ✅ Grammar challenges
- ✅ Kanji collection
- ✅ Crafting system
- ✅ Inventory management
- ✅ N4 content
- ✅ Sound effects & music

### **Phase 3: Multiplayer (2-3 months)**
- ✅ Realtime player sync
- ✅ Collaborative building
- ✅ Voice chat
- ✅ Trading system
- ✅ Leaderboards
- ✅ N3 content

### **Phase 4: Polish & Content (2-3 months)**
- ✅ Advanced quests (N2-N1)
- ✅ AI-powered NPCs
- ✅ Seasonal events
- ✅ Achievement system
- ✅ Tutorial improvements
- ✅ Performance optimization

### **Phase 5: Launch (1 month)**
- ✅ Beta testing
- ✅ Bug fixes
- ✅ App store submission
- ✅ Marketing materials
- ✅ Community setup

---

## 💰 **Monetization (Optional)**

### **Free-to-Play Model**
- **Base game:** Free
- **Core content:** Free (N5-N3)
- **Ads:** Optional (remove with purchase)

### **Premium Features**
- **Premium Pass:** $4.99/month
  - Ad-free
  - Exclusive building blocks
  - Advanced content (N2-N1)
  - Custom avatars
  - Private multiplayer servers

### **One-Time Purchases**
- **Content Packs:** $2.99 each
  - Business Japanese pack
  - Anime/Manga vocabulary
  - Cultural deep-dives
  - Advanced grammar

### **Ethical Considerations**
- No pay-to-win mechanics
- All learning content accessible
- No loot boxes
- COPPA compliant (kids under 13)

---

## 📊 **Technical Specifications**

### **Performance Targets**
- **60 FPS** on mid-range devices
- **30 FPS minimum** on low-end devices
- **< 200MB** initial download
- **< 500MB** with all content
- **< 100ms** network latency for multiplayer

### **Platform Support**
- **iOS** 12.0+
- **Android** 6.0+ (API 23+)
- **Web** (Flutter Web) - limited 3D
- **Desktop** (Windows/Mac/Linux) - future

### **Chunk System (Performance)**
```dart
class ChunkManager {
  static const int CHUNK_SIZE = 16;
  Map<Vector2, Chunk> loadedChunks = {};
  
  void updateChunks(Vector3 playerPosition) {
    // Load chunks around player
    // Unload distant chunks
    // Optimize rendering
  }
}
```

---

## 🔗 **Integration with Existing System**

### **Sync with Web App**
```dart
class ProgressSync {
  // Sync grammar roadmap progress
  Future<void> syncGrammarProgress() async {
    final webProgress = await Firestore.collection('users')
        .doc(userId)
        .collection('grammarProgress')
        .get();
    
    // Apply to game
    for (var doc in webProgress.docs) {
      unlockGameContent(doc.id);
    }
  }
  
  // Sync vocabulary
  Future<void> syncVocabulary() async {
    // Same Firebase project, shared data
  }
}
```

**Benefits:**
- Learn on web, play on mobile
- Progress syncs automatically
- Same Firebase backend
- Consistent learning path

---

## 🎓 **Educational Effectiveness**

### **Learning Principles**
1. **Immersion** - Constant Japanese exposure
2. **Context** - Words learned in meaningful situations
3. **Repetition** - Natural SRS through gameplay
4. **Motivation** - Fun gameplay drives learning
5. **Social** - Practice with peers
6. **Feedback** - Immediate correction

### **Metrics to Track**
- Words learned per hour
- Grammar accuracy over time
- Retention rates
- Engagement duration
- Quest completion rates
- Multiplayer interaction frequency

---

## 🛠️ **Getting Started**

### **1. Set Up Flutter Project**
```bash
flutter create nihoncraft
cd nihoncraft
flutter pub add flame firebase_core cloud_firestore
flutterfire configure
```

### **2. Project Structure**
```
nihoncraft/
├── lib/
│   ├── main.dart
│   ├── game/
│   │   ├── nihoncraft_game.dart
│   │   ├── world/
│   │   │   ├── voxel_world.dart
│   │   │   ├── chunk.dart
│   │   │   └── block.dart
│   │   ├── entities/
│   │   │   ├── player.dart
│   │   │   └── npc.dart
│   │   ├── systems/
│   │   │   ├── quest_system.dart
│   │   │   ├── inventory_system.dart
│   │   │   └── learning_system.dart
│   │   └── ui/
│   │       ├── hud.dart
│   │       └── menus.dart
│   ├── data/
│   │   ├── vocabulary.dart
│   │   ├── grammar.dart
│   │   └── quests.dart
│   └── services/
│       ├── firebase_service.dart
│       ├── audio_service.dart
│       └── multiplayer_service.dart
├── assets/
│   ├── images/
│   ├── audio/
│   └── data/
└── test/
```

### **3. Basic Game Loop**
```dart
class NihonCraftGame extends FlameGame {
  late VoxelWorld world;
  late Player player;
  late QuestSystem questSystem;
  
  @override
  Future<void> onLoad() async {
    await super.onLoad();
    
    // Initialize world
    world = VoxelWorld();
    add(world);
    
    // Initialize player
    player = Player();
    add(player);
    
    // Initialize systems
    questSystem = QuestSystem();
    
    // Load initial content
    await loadN5Content();
  }
  
  @override
  void update(double dt) {
    super.update(dt);
    world.update(dt);
    questSystem.update(dt);
  }
}
```

---

## 🎯 **Success Metrics**

### **Launch Goals**
- **1,000 downloads** in first month
- **500 daily active users** by month 3
- **70% retention** after 7 days
- **4.5+ star rating** on app stores
- **50+ user reviews** (positive)

### **Learning Goals**
- **100+ words learned** per user (average)
- **80% accuracy** on grammar quizzes
- **30 minutes** average daily playtime
- **10+ quests completed** per user

---

## 🎉 **Why This Will Work**

### **Unique Value Proposition**
1. **First true 3D Japanese learning game**
2. **Minecraft appeal** - proven engagement
3. **Natural learning** - not forced drills
4. **Multiplayer** - social motivation
5. **Free to start** - low barrier to entry
6. **Syncs with web app** - comprehensive system

### **Target Audience**
- **Kids 8-16** learning Japanese
- **Parents** wanting educational games
- **Japanese learners** who love gaming
- **Your family** - Mei's kids can test it!

---

## 📚 **Resources & References**

### **Game Development**
- **Flame Documentation**: https://docs.flame-engine.org/
- **Flutter Game Development**: https://flutter.dev/games
- **Voxel Engine Tutorial**: (search "Flutter voxel engine")

### **Educational Game Design**
- **Duolingo's Design Principles**
- **Minecraft Education Edition**
- **Roblox Educational Games**

### **Japanese Learning**
- Your existing grammar roadmap data
- JLPT vocabulary lists
- Genki textbook content (for reference)

---

## 🚀 **Next Steps**

1. **Prototype the voxel engine** (1-2 weeks)
2. **Integrate Firebase** (3-5 days)
3. **Build basic NPC system** (1 week)
4. **Create N5 content** (1-2 weeks)
5. **Test with family** (ongoing)
6. **Iterate based on feedback**

**Want me to start building the prototype? I can create:**
- Basic Flutter + Flame project structure
- Simple voxel rendering system
- Player movement and camera
- Firebase integration
- First NPC with dialogue

**This game will make learning Japanese fun for kids while leveraging your existing Firebase backend and Japanese content!** 🎮🇯🇵✨
