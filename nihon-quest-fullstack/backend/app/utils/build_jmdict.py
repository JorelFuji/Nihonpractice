#!/usr/bin/env python3
"""
Build SQLite database from JMdict-simplified JSON.

Download the latest version from:
https://github.com/scriptin/jmdict-simplified/releases

Example:
    python build_jmdict.py jmdict-eng-3.6.1.json jmdict.sqlite
"""

import sqlite3
import json
import sys
from pathlib import Path
from typing import Dict, Any

def create_tables(conn: sqlite3.Connection):
    """Create database schema."""
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS entries (
            id TEXT PRIMARY KEY,
            entry TEXT NOT NULL,
            common INTEGER NOT NULL DEFAULT 0
        );
        
        CREATE TABLE IF NOT EXISTS forms (
            entry_id TEXT NOT NULL,
            form TEXT NOT NULL,
            FOREIGN KEY (entry_id) REFERENCES entries(id)
        );
        
        CREATE INDEX IF NOT EXISTS idx_forms_form ON forms(form);
        CREATE INDEX IF NOT EXISTS idx_entries_common ON entries(common);
        
        CREATE VIRTUAL TABLE IF NOT EXISTS glosses_fts USING fts5(
            entry_id,
            glosses,
            content=''
        );
    """)

def extract_forms(entry: Dict) -> list:
    """Extract all Japanese forms (kanji + kana) from entry."""
    forms = []
    
    # Add kanji forms
    for k in entry.get('kanji', []):
        if isinstance(k, dict):
            forms.append(k.get('text', ''))
        else:
            forms.append(k)
    
    # Add kana forms
    for k in entry.get('kana', []):
        if isinstance(k, dict):
            forms.append(k.get('text', ''))
        else:
            forms.append(k)
    
    return [f for f in forms if f]

def extract_glosses(entry: Dict) -> str:
    """Extract all English glosses from entry for FTS5."""
    glosses = []
    
    for sense in entry.get('sense', []):
        for gloss in sense.get('gloss', []):
            if isinstance(gloss, dict):
                glosses.append(gloss.get('text', ''))
            else:
                glosses.append(gloss)
    
    return ' '.join(glosses)

def build_database(json_path: str, db_path: str):
    """Build SQLite database from JMdict JSON."""
    print(f"📖 Building dictionary database...")
    print(f"   Source: {json_path}")
    print(f"   Output: {db_path}")
    
    # Load JSON
    print("📥 Loading JSON...")
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    words = data.get('words', [])
    print(f"✓ Loaded {len(words):,} entries")
    
    # Create database
    db_file = Path(db_path)
    if db_file.exists():
        print(f"⚠️  Removing existing database...")
        db_file.unlink()
    
    print("🔨 Creating database schema...")
    conn = sqlite3.connect(db_path)
    create_tables(conn)
    
    # Bulk insert
    print("💾 Inserting entries (this may take a minute)...")
    
    conn.execute("BEGIN TRANSACTION")
    
    entry_count = 0
    form_count = 0
    gloss_count = 0
    
    for entry in words:
        entry_id = entry.get('id', '')
        is_common = 1 if entry.get('common', False) else 0
        entry_json = json.dumps(entry)
        
        # Insert entry
        conn.execute(
            "INSERT INTO entries (id, entry, common) VALUES (?, ?, ?)",
            (entry_id, entry_json, is_common)
        )
        entry_count += 1
        
        # Insert forms
        forms = extract_forms(entry)
        for form in forms:
            conn.execute(
                "INSERT INTO forms (entry_id, form) VALUES (?, ?)",
                (entry_id, form)
            )
            form_count += 1
        
        # Insert glosses for FTS
        glosses = extract_glosses(entry)
        if glosses:
            conn.execute(
                "INSERT INTO glosses_fts (entry_id, glosses) VALUES (?, ?)",
                (entry_id, glosses)
            )
            gloss_count += 1
        
        if entry_count % 10000 == 0:
            print(f"   ... {entry_count:,} entries processed")
    
    conn.execute("COMMIT")
    
    # Optimize FTS5 index
    print("🔍 Optimizing search index...")
    conn.execute("INSERT INTO glosses_fts(glosses_fts) VALUES('optimize')")
    
    # Vacuum to reduce file size
    print("🗜️  Compacting database...")
    conn.execute("VACUUM")
    
    conn.close()
    
    # Stats
    file_size_mb = db_file.stat().st_size / (1024 * 1024)
    
    print("\n✅ Database built successfully!")
    print(f"   📊 Stats:")
    print(f"      Entries: {entry_count:,}")
    print(f"      Forms:   {form_count:,}")
    print(f"      Glosses: {gloss_count:,}")
    print(f"      Size:    {file_size_mb:.1f} MB")
    print(f"\n💡 Usage:")
    print(f"   from app.services.jmdict_service import get_jmdict_service")
    print(f"   dict = get_jmdict_service()")
    print(f"   results = dict.lookup('食べる')")

def main():
    if len(sys.argv) != 3:
        print("Usage: python build_jmdict.py <json_path> <db_path>")
        print("\nDownload JMdict-simplified from:")
        print("https://github.com/scriptin/jmdict-simplified/releases")
        sys.exit(1)
    
    json_path = sys.argv[1]
    db_path = sys.argv[2]
    
    if not Path(json_path).exists():
        print(f"❌ Error: File not found: {json_path}")
        sys.exit(1)
    
    try:
        build_database(json_path, db_path)
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == '__main__':
    main()
