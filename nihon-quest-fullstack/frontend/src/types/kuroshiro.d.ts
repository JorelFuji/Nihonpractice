declare module 'kuroshiro' {
  interface ConvertOptions {
    to?: 'hiragana' | 'katakana' | 'romaji'
    mode?: 'normal' | 'spaced' | 'okurigana' | 'furigana'
    romajiSystem?: 'nippon' | 'passport' | 'hepburn'
  }

  class Kuroshiro {
    constructor()
    init(analyzer: any): Promise<void>
    convert(str: string, options?: ConvertOptions): Promise<string>
  }

  export default Kuroshiro
}

declare module 'kuroshiro-analyzer-kuromoji' {
  class KuromojiAnalyzer {
    constructor(options?: any)
  }

  export default KuromojiAnalyzer
}
