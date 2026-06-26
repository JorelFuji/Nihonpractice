import sqlite3
import json
from pathlib import Path
from typing import List, Dict, Optional, Any
import logging

logger = logging.getLogger(__name__)

class JMDictService:
    """
    Japanese-English dictionary service using JMdict data in SQLite.
    Supports exact, prefix, and full-text search.
    """
    
    def __init__(self, db_path: str = "data/jmdict.sqlite"):
        self.db_path = db_path
        self.conn: Optional[sqlite3.Connection] = None
        self._ensure_db()
    
    def _ensure_db(self):
        """Ensure database exists and is connected."""
        db_file = Path(self.db_path)
        if not db_file.exists():
            logger.warning(f"Dictionary database not found at {self.db_path}")
            logger.info("You can build it by downloading jmdict-simplified JSON and running build_jmdict.py")
            return
        
        self.conn = sqlite3.connect(self.db_path, check_same_thread=False)
        self.conn.row_factory = sqlite3.Row
    
    def lookup(self, query: str, prefix: bool = False, limit: int = 20) -> List[Dict[str, Any]]:
        """
        Look up a word in the dictionary.
        
        Args:
            query: Search term (Japanese or English)
            prefix: If True, match Japanese words starting with query
            limit: Maximum results to return
            
        Returns:
            List of dictionary entries with kanji, kana, senses, etc.
        """
        if not self.conn:
            return []
        
        results = []
        
        # Try exact Japanese match first (kanji or kana)
        if self._is_japanese(query):
            results = self._search_japanese(query, prefix, limit)
        
        # If no results, try English FTS search
        if not results:
            results = self._search_english(query, limit)
        
        return results
    
    def _is_japanese(self, text: str) -> bool:
        """Check if text contains Japanese characters."""
        for char in text:
            code = ord(char)
            # Hiragana, Katakana, or CJK Unified Ideographs
            if (0x3040 <= code <= 0x309F or  # Hiragana
                0x30A0 <= code <= 0x30FF or  # Katakana
                0x4E00 <= code <= 0x9FAF):   # Kanji
                return True
        return False
    
    def _search_japanese(self, query: str, prefix: bool, limit: int) -> List[Dict[str, Any]]:
        """Search by Japanese text (exact or prefix match)."""
        try:
            if prefix:
                sql = """
                    SELECT DISTINCT e.id, e.entry
                    FROM entries e
                    JOIN forms f ON e.id = f.entry_id
                    WHERE f.form LIKE ? || '%'
                    ORDER BY e.common DESC
                    LIMIT ?
                """
                cursor = self.conn.execute(sql, (query, limit))
            else:
                sql = """
                    SELECT e.id, e.entry
                    FROM entries e
                    JOIN forms f ON e.id = f.entry_id
                    WHERE f.form = ?
                    ORDER BY e.common DESC
                    LIMIT ?
                """
                cursor = self.conn.execute(sql, (query, limit))
            
            results = []
            for row in cursor:
                entry = json.loads(row['entry'])
                results.append(self._format_entry(entry))
            
            return results
        except Exception as e:
            logger.error(f"Japanese search error: {e}")
            return []
    
    def _search_english(self, query: str, limit: int) -> List[Dict[str, Any]]:
        """Search by English meaning using FTS5."""
        try:
            # Try FTS5 full-text search
            sql = """
                SELECT e.id, e.entry
                FROM entries e
                JOIN glosses_fts g ON e.id = g.entry_id
                WHERE glosses_fts MATCH ?
                ORDER BY e.common DESC
                LIMIT ?
            """
            cursor = self.conn.execute(sql, (query, limit))
            
            results = []
            for row in cursor:
                entry = json.loads(row['entry'])
                results.append(self._format_entry(entry))
            
            return results
        except Exception as e:
            logger.error(f"English search error: {e}")
            return []
    
    def _format_entry(self, entry: Dict) -> Dict[str, Any]:
        """Format dictionary entry for API response."""
        return {
            'id': entry.get('id'),
            'common': entry.get('common', False),
            'kanji': entry.get('kanji', []),
            'kana': entry.get('kana', []),
            'senses': [
                {
                    'partOfSpeech': sense.get('partOfSpeech', []),
                    'glosses': sense.get('gloss', []),
                    'info': sense.get('info', [])
                }
                for sense in entry.get('sense', [])
            ]
        }
    
    def get_random_words(self, count: int = 10) -> List[Dict[str, Any]]:
        """Get random dictionary entries."""
        if not self.conn:
            return []
        
        try:
            sql = """
                SELECT id, entry
                FROM entries
                WHERE common = 1
                ORDER BY RANDOM()
                LIMIT ?
            """
            cursor = self.conn.execute(sql, (count,))
            
            results = []
            for row in cursor:
                entry = json.loads(row['entry'])
                results.append(self._format_entry(entry))
            
            return results
        except Exception as e:
            logger.error(f"Random words error: {e}")
            return []
    
    def close(self):
        """Close database connection."""
        if self.conn:
            self.conn.close()
            self.conn = None


# Global instance
_jmdict_service: Optional[JMDictService] = None

def get_jmdict_service() -> JMDictService:
    """Get or create the global JMDict service instance."""
    global _jmdict_service
    if _jmdict_service is None:
        _jmdict_service = JMDictService()
    return _jmdict_service
