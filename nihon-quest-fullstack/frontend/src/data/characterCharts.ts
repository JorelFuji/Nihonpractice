/**
 * Japanese Character Charts Data
 * Complete Hiragana, Katakana, and Common Kanji with English translations
 */

export interface CharacterData {
  character: string;
  romaji: string;
  english?: string;
}

export interface KanjiData {
  character: string;
  romaji: string;
  meaning: string;
  examples?: string[];
}

// HIRAGANA CHART (Gojūon - 50 sounds)
export const HIRAGANA_CHART: CharacterData[][] = [
  // Vowels
  [
    { character: 'あ', romaji: 'a' },
    { character: 'い', romaji: 'i' },
    { character: 'う', romaji: 'u' },
    { character: 'え', romaji: 'e' },
    { character: 'お', romaji: 'o' }
  ],
  // K-row
  [
    { character: 'か', romaji: 'ka' },
    { character: 'き', romaji: 'ki' },
    { character: 'く', romaji: 'ku' },
    { character: 'け', romaji: 'ke' },
    { character: 'こ', romaji: 'ko' }
  ],
  // S-row
  [
    { character: 'さ', romaji: 'sa' },
    { character: 'し', romaji: 'shi' },
    { character: 'す', romaji: 'su' },
    { character: 'せ', romaji: 'se' },
    { character: 'そ', romaji: 'so' }
  ],
  // T-row
  [
    { character: 'た', romaji: 'ta' },
    { character: 'ち', romaji: 'chi' },
    { character: 'つ', romaji: 'tsu' },
    { character: 'て', romaji: 'te' },
    { character: 'と', romaji: 'to' }
  ],
  // N-row
  [
    { character: 'な', romaji: 'na' },
    { character: 'に', romaji: 'ni' },
    { character: 'ぬ', romaji: 'nu' },
    { character: 'ね', romaji: 'ne' },
    { character: 'の', romaji: 'no' }
  ],
  // H-row
  [
    { character: 'は', romaji: 'ha' },
    { character: 'ひ', romaji: 'hi' },
    { character: 'ふ', romaji: 'fu' },
    { character: 'へ', romaji: 'he' },
    { character: 'ほ', romaji: 'ho' }
  ],
  // M-row
  [
    { character: 'ま', romaji: 'ma' },
    { character: 'み', romaji: 'mi' },
    { character: 'む', romaji: 'mu' },
    { character: 'め', romaji: 'me' },
    { character: 'も', romaji: 'mo' }
  ],
  // Y-row
  [
    { character: 'や', romaji: 'ya' },
    { character: '', romaji: '' },
    { character: 'ゆ', romaji: 'yu' },
    { character: '', romaji: '' },
    { character: 'よ', romaji: 'yo' }
  ],
  // R-row
  [
    { character: 'ら', romaji: 'ra' },
    { character: 'り', romaji: 'ri' },
    { character: 'る', romaji: 'ru' },
    { character: 'れ', romaji: 're' },
    { character: 'ろ', romaji: 'ro' }
  ],
  // W-row + N
  [
    { character: 'わ', romaji: 'wa' },
    { character: '', romaji: '' },
    { character: '', romaji: '' },
    { character: '', romaji: '' },
    { character: 'を', romaji: 'wo/o' }
  ],
  // N
  [
    { character: 'ん', romaji: 'n' },
    { character: '', romaji: '' },
    { character: '', romaji: '' },
    { character: '', romaji: '' },
    { character: '', romaji: '' }
  ]
];

// KATAKANA CHART (Gojūon - 50 sounds)
export const KATAKANA_CHART: CharacterData[][] = [
  // Vowels
  [
    { character: 'ア', romaji: 'a' },
    { character: 'イ', romaji: 'i' },
    { character: 'ウ', romaji: 'u' },
    { character: 'エ', romaji: 'e' },
    { character: 'オ', romaji: 'o' }
  ],
  // K-row
  [
    { character: 'カ', romaji: 'ka' },
    { character: 'キ', romaji: 'ki' },
    { character: 'ク', romaji: 'ku' },
    { character: 'ケ', romaji: 'ke' },
    { character: 'コ', romaji: 'ko' }
  ],
  // S-row
  [
    { character: 'サ', romaji: 'sa' },
    { character: 'シ', romaji: 'shi' },
    { character: 'ス', romaji: 'su' },
    { character: 'セ', romaji: 'se' },
    { character: 'ソ', romaji: 'so' }
  ],
  // T-row
  [
    { character: 'タ', romaji: 'ta' },
    { character: 'チ', romaji: 'chi' },
    { character: 'ツ', romaji: 'tsu' },
    { character: 'テ', romaji: 'te' },
    { character: 'ト', romaji: 'to' }
  ],
  // N-row
  [
    { character: 'ナ', romaji: 'na' },
    { character: 'ニ', romaji: 'ni' },
    { character: 'ヌ', romaji: 'nu' },
    { character: 'ネ', romaji: 'ne' },
    { character: 'ノ', romaji: 'no' }
  ],
  // H-row
  [
    { character: 'ハ', romaji: 'ha' },
    { character: 'ヒ', romaji: 'hi' },
    { character: 'フ', romaji: 'fu' },
    { character: 'ヘ', romaji: 'he' },
    { character: 'ホ', romaji: 'ho' }
  ],
  // M-row
  [
    { character: 'マ', romaji: 'ma' },
    { character: 'ミ', romaji: 'mi' },
    { character: 'ム', romaji: 'mu' },
    { character: 'メ', romaji: 'me' },
    { character: 'モ', romaji: 'mo' }
  ],
  // Y-row
  [
    { character: 'ヤ', romaji: 'ya' },
    { character: '', romaji: '' },
    { character: 'ユ', romaji: 'yu' },
    { character: '', romaji: '' },
    { character: 'ヨ', romaji: 'yo' }
  ],
  // R-row
  [
    { character: 'ラ', romaji: 'ra' },
    { character: 'リ', romaji: 'ri' },
    { character: 'ル', romaji: 'ru' },
    { character: 'レ', romaji: 're' },
    { character: 'ロ', romaji: 'ro' }
  ],
  // W-row + N
  [
    { character: 'ワ', romaji: 'wa' },
    { character: '', romaji: '' },
    { character: '', romaji: '' },
    { character: '', romaji: '' },
    { character: 'ヲ', romaji: 'wo/o' }
  ],
  // N
  [
    { character: 'ン', romaji: 'n' },
    { character: '', romaji: '' },
    { character: '', romaji: '' },
    { character: '', romaji: '' },
    { character: '', romaji: '' }
  ]
];

// COMMON KANJI (JLPT N5 Level - Most Essential)
export const COMMON_KANJI: KanjiData[] = [
  // Numbers
  { character: '一', romaji: 'ichi', meaning: 'one', examples: ['一つ (hitotsu)'] },
  { character: '二', romaji: 'ni', meaning: 'two', examples: ['二つ (futatsu)'] },
  { character: '三', romaji: 'san', meaning: 'three', examples: ['三つ (mittsu)'] },
  { character: '四', romaji: 'shi/yon', meaning: 'four', examples: ['四つ (yottsu)'] },
  { character: '五', romaji: 'go', meaning: 'five', examples: ['五つ (itsutsu)'] },
  { character: '六', romaji: 'roku', meaning: 'six', examples: ['六つ (muttsu)'] },
  { character: '七', romaji: 'shichi/nana', meaning: 'seven', examples: ['七つ (nanatsu)'] },
  { character: '八', romaji: 'hachi', meaning: 'eight', examples: ['八つ (yattsu)'] },
  { character: '九', romaji: 'kyū/ku', meaning: 'nine', examples: ['九つ (kokonotsu)'] },
  { character: '十', romaji: 'jū', meaning: 'ten', examples: ['十 (tō)'] },
  { character: '百', romaji: 'hyaku', meaning: 'hundred' },
  { character: '千', romaji: 'sen', meaning: 'thousand' },
  { character: '万', romaji: 'man', meaning: 'ten thousand' },
  
  // Time
  { character: '日', romaji: 'nichi/hi', meaning: 'day, sun', examples: ['日本 (Nihon)'] },
  { character: '月', romaji: 'getsu/tsuki', meaning: 'month, moon', examples: ['一月 (ichigatsu)'] },
  { character: '火', romaji: 'ka/hi', meaning: 'fire, Tuesday', examples: ['火曜日 (kayōbi)'] },
  { character: '水', romaji: 'sui/mizu', meaning: 'water, Wednesday', examples: ['水曜日 (suiyōbi)'] },
  { character: '木', romaji: 'moku/ki', meaning: 'tree, Thursday', examples: ['木曜日 (mokuyōbi)'] },
  { character: '金', romaji: 'kin/kane', meaning: 'gold, Friday', examples: ['金曜日 (kinyōbi)'] },
  { character: '土', romaji: 'do/tsuchi', meaning: 'earth, Saturday', examples: ['土曜日 (doyōbi)'] },
  { character: '年', romaji: 'nen/toshi', meaning: 'year', examples: ['今年 (kotoshi)'] },
  { character: '時', romaji: 'ji/toki', meaning: 'time, hour', examples: ['一時 (ichiji)'] },
  { character: '分', romaji: 'fun/bun', meaning: 'minute, divide', examples: ['十分 (juppun)'] },
  { character: '週', romaji: 'shū', meaning: 'week', examples: ['今週 (konshū)'] },
  { character: '間', romaji: 'kan/aida', meaning: 'interval, between', examples: ['時間 (jikan)'] },
  
  // People & Family
  { character: '人', romaji: 'jin/nin/hito', meaning: 'person', examples: ['日本人 (nihonjin)'] },
  { character: '父', romaji: 'fu/chichi', meaning: 'father', examples: ['お父さん (otōsan)'] },
  { character: '母', romaji: 'bo/haha', meaning: 'mother', examples: ['お母さん (okāsan)'] },
  { character: '子', romaji: 'shi/ko', meaning: 'child', examples: ['子供 (kodomo)'] },
  { character: '男', romaji: 'dan/otoko', meaning: 'man, male', examples: ['男の子 (otokonoko)'] },
  { character: '女', romaji: 'jo/onna', meaning: 'woman, female', examples: ['女の子 (onnanoko)'] },
  { character: '先', romaji: 'sen/saki', meaning: 'before, ahead', examples: ['先生 (sensei)'] },
  { character: '生', romaji: 'sei/nama', meaning: 'life, birth', examples: ['学生 (gakusei)'] },
  { character: '友', romaji: 'yū/tomo', meaning: 'friend', examples: ['友達 (tomodachi)'] },
  { character: '名', romaji: 'mei/na', meaning: 'name', examples: ['名前 (namae)'] },
  
  // Places
  { character: '国', romaji: 'koku/kuni', meaning: 'country', examples: ['外国 (gaikoku)'] },
  { character: '本', romaji: 'hon/moto', meaning: 'book, origin', examples: ['日本 (Nihon)'] },
  { character: '山', romaji: 'san/yama', meaning: 'mountain', examples: ['富士山 (Fujisan)'] },
  { character: '川', romaji: 'sen/kawa', meaning: 'river', examples: ['川 (kawa)'] },
  { character: '田', romaji: 'den/ta', meaning: 'rice field', examples: ['田中 (Tanaka)'] },
  { character: '学', romaji: 'gaku/mana', meaning: 'study, learn', examples: ['学校 (gakkō)'] },
  { character: '校', romaji: 'kō', meaning: 'school', examples: ['学校 (gakkō)'] },
  { character: '駅', romaji: 'eki', meaning: 'station', examples: ['東京駅 (Tōkyō-eki)'] },
  { character: '店', romaji: 'ten/mise', meaning: 'shop, store', examples: ['店 (mise)'] },
  { character: '所', romaji: 'sho/tokoro', meaning: 'place', examples: ['場所 (basho)'] },
  
  // Directions & Position
  { character: '上', romaji: 'jō/ue', meaning: 'up, above', examples: ['上 (ue)'] },
  { character: '下', romaji: 'ka/shita', meaning: 'down, below', examples: ['下 (shita)'] },
  { character: '中', romaji: 'chū/naka', meaning: 'middle, inside', examples: ['中 (naka)'] },
  { character: '外', romaji: 'gai/soto', meaning: 'outside', examples: ['外 (soto)'] },
  { character: '左', romaji: 'sa/hidari', meaning: 'left', examples: ['左 (hidari)'] },
  { character: '右', romaji: 'u/migi', meaning: 'right', examples: ['右 (migi)'] },
  { character: '前', romaji: 'zen/mae', meaning: 'front, before', examples: ['前 (mae)'] },
  { character: '後', romaji: 'go/ato', meaning: 'after, behind', examples: ['後ろ (ushiro)'] },
  { character: '東', romaji: 'tō/higashi', meaning: 'east', examples: ['東京 (Tōkyō)'] },
  { character: '西', romaji: 'sei/nishi', meaning: 'west', examples: ['西 (nishi)'] },
  { character: '南', romaji: 'nan/minami', meaning: 'south', examples: ['南 (minami)'] },
  { character: '北', romaji: 'hoku/kita', meaning: 'north', examples: ['北 (kita)'] },
  
  // Actions & Verbs
  { character: '出', romaji: 'shutsu/de', meaning: 'exit, come out', examples: ['出る (deru)'] },
  { character: '入', romaji: 'nyū/hai', meaning: 'enter', examples: ['入る (hairu)'] },
  { character: '行', romaji: 'kō/i', meaning: 'go', examples: ['行く (iku)'] },
  { character: '来', romaji: 'rai/ku', meaning: 'come', examples: ['来る (kuru)'] },
  { character: '見', romaji: 'ken/mi', meaning: 'see, look', examples: ['見る (miru)'] },
  { character: '聞', romaji: 'bun/ki', meaning: 'hear, listen', examples: ['聞く (kiku)'] },
  { character: '食', romaji: 'shoku/ta', meaning: 'eat, food', examples: ['食べる (taberu)'] },
  { character: '飲', romaji: 'in/no', meaning: 'drink', examples: ['飲む (nomu)'] },
  { character: '買', romaji: 'bai/ka', meaning: 'buy', examples: ['買う (kau)'] },
  { character: '読', romaji: 'doku/yo', meaning: 'read', examples: ['読む (yomu)'] },
  { character: '書', romaji: 'sho/ka', meaning: 'write', examples: ['書く (kaku)'] },
  { character: '話', romaji: 'wa/hana', meaning: 'speak, talk', examples: ['話す (hanasu)'] },
  { character: '聴', romaji: 'chō/ki', meaning: 'listen', examples: ['聴く (kiku)'] },
  
  // Common Words
  { character: '今', romaji: 'kon/ima', meaning: 'now', examples: ['今 (ima)'] },
  { character: '何', romaji: 'nan/nani', meaning: 'what', examples: ['何 (nani)'] },
  { character: '大', romaji: 'dai/ō', meaning: 'big, large', examples: ['大きい (ōkii)'] },
  { character: '小', romaji: 'shō/chii', meaning: 'small, little', examples: ['小さい (chīsai)'] },
  { character: '高', romaji: 'kō/taka', meaning: 'high, tall, expensive', examples: ['高い (takai)'] },
  { character: '新', romaji: 'shin/atara', meaning: 'new', examples: ['新しい (atarashii)'] },
  { character: '古', romaji: 'ko/furu', meaning: 'old', examples: ['古い (furui)'] },
  { character: '長', romaji: 'chō/naga', meaning: 'long', examples: ['長い (nagai)'] },
  { character: '白', romaji: 'haku/shiro', meaning: 'white', examples: ['白い (shiroi)'] },
  { character: '赤', romaji: 'seki/aka', meaning: 'red', examples: ['赤い (akai)'] },
  { character: '青', romaji: 'sei/ao', meaning: 'blue', examples: ['青い (aoi)'] },
  { character: '黒', romaji: 'koku/kuro', meaning: 'black', examples: ['黒い (kuroi)'] },
  
  // More Essentials
  { character: '車', romaji: 'sha/kuruma', meaning: 'car, vehicle', examples: ['車 (kuruma)'] },
  { character: '電', romaji: 'den', meaning: 'electricity', examples: ['電車 (densha)'] },
  { character: '語', romaji: 'go', meaning: 'language, word', examples: ['日本語 (nihongo)'] },
  { character: '文', romaji: 'bun/fumi', meaning: 'sentence, text', examples: ['文 (bun)'] },
  { character: '手', romaji: 'shu/te', meaning: 'hand', examples: ['手 (te)'] },
  { character: '足', romaji: 'soku/ashi', meaning: 'foot, leg', examples: ['足 (ashi)'] },
  { character: '目', romaji: 'moku/me', meaning: 'eye', examples: ['目 (me)'] },
  { character: '口', romaji: 'kō/kuchi', meaning: 'mouth', examples: ['口 (kuchi)'] },
  { character: '耳', romaji: 'ji/mimi', meaning: 'ear', examples: ['耳 (mimi)'] },
  { character: '心', romaji: 'shin/kokoro', meaning: 'heart, mind', examples: ['心 (kokoro)'] }
];

// Helper function to get total character count
export const getChartStats = () => {
  const hiraganaCount = HIRAGANA_CHART.flat().filter(c => c.character).length;
  const katakanaCount = KATAKANA_CHART.flat().filter(c => c.character).length;
  const kanjiCount = COMMON_KANJI.length;
  
  return {
    hiragana: hiraganaCount,
    katakana: katakanaCount,
    kanji: kanjiCount,
    total: hiraganaCount + katakanaCount + kanjiCount
  };
};
