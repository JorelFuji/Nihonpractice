from datetime import datetime
from typing import List, Optional
from sqlalchemy import Boolean, Column, DateTime, Enum, Float, ForeignKey, Integer, JSON, String, Text, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import enum

Base = declarative_base()

class JLPTLevel(str, enum.Enum):
    N5 = "N5"
    N4 = "N4"
    N3 = "N3"
    N2 = "N2"
    N1 = "N1"

class CardType(str, enum.Enum):
    VOCABULARY = "vocabulary"
    KANJI = "kanji"
    GRAMMAR = "grammar"
    SENTENCE = "sentence"

class ReviewRating(int, enum.Enum):
    AGAIN = 1
    HARD = 2
    GOOD = 3
    EASY = 4

user_achievements = Table(
    'user_achievements',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('achievement_id', Integer, ForeignKey('achievements.id'), primary_key=True),
    Column('earned_at', DateTime, default=datetime.utcnow)
)

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    
    current_level = Column(Enum(JLPTLevel), default=JLPTLevel.N5)
    exp_points = Column(Integer, default=0)
    streak_days = Column(Integer, default=0)
    last_practice_date = Column(DateTime)
    
    hearts = Column(Integer, default=5)
    gems = Column(Integer, default=0)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    is_premium = Column(Boolean, default=False)
    
    cards = relationship("Card", back_populates="user")
    reviews = relationship("Review", back_populates="user")
    lessons_completed = relationship("UserLessonProgress", back_populates="user")
    achievements = relationship("Achievement", secondary=user_achievements, back_populates="users")
    conversation_history = relationship("ConversationMessage", back_populates="user")

class DictionaryEntry(Base):
    __tablename__ = "dictionary_entries"
    
    id = Column(Integer, primary_key=True, index=True)
    sequence_number = Column(Integer, unique=True, index=True)
    
    kanji = Column(String, index=True)
    reading = Column(String, nullable=False, index=True)
    romaji = Column(String, index=True)
    
    meanings = Column(JSON)
    part_of_speech = Column(JSON)
    jlpt_level = Column(Enum(JLPTLevel), index=True)
    frequency_rank = Column(Integer)
    
    audio_url = Column(String)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    example_sentences = relationship("ExampleSentence", back_populates="word")

class KanjiEntry(Base):
    __tablename__ = "kanji_entries"
    
    id = Column(Integer, primary_key=True, index=True)
    character = Column(String(1), unique=True, index=True, nullable=False)
    
    meanings = Column(JSON)
    onyomi = Column(JSON)
    kunyomi = Column(JSON)
    
    stroke_count = Column(Integer)
    stroke_order_svg = Column(Text)
    
    grade = Column(Integer)
    jlpt_level = Column(Enum(JLPTLevel), index=True)
    frequency_rank = Column(Integer)
    
    radicals = Column(JSON)
    components = Column(JSON)
    
    created_at = Column(DateTime, default=datetime.utcnow)

class ExampleSentence(Base):
    __tablename__ = "example_sentences"
    
    id = Column(Integer, primary_key=True, index=True)
    word_id = Column(Integer, ForeignKey("dictionary_entries.id"))
    
    japanese = Column(Text, nullable=False)
    reading = Column(Text)
    english = Column(Text, nullable=False)
    
    source = Column(String)
    audio_url = Column(String)
    
    word = relationship("DictionaryEntry", back_populates="example_sentences")

class GrammarPattern(Base):
    __tablename__ = "grammar_patterns"
    
    id = Column(Integer, primary_key=True, index=True)
    pattern = Column(String, nullable=False, index=True)
    jlpt_level = Column(Enum(JLPTLevel), index=True, nullable=False)
    
    meaning = Column(Text, nullable=False)
    structure = Column(Text, nullable=False)
    explanation = Column(Text)
    
    examples = Column(JSON)
    related_patterns = Column(JSON)
    
    created_at = Column(DateTime, default=datetime.utcnow)

class Lesson(Base):
    __tablename__ = "lessons"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    
    jlpt_level = Column(Enum(JLPTLevel), index=True, nullable=False)
    order = Column(Integer, nullable=False)
    
    lesson_type = Column(String)
    content = Column(JSON)
    
    vocabulary_ids = Column(JSON)
    grammar_ids = Column(JSON)
    kanji_ids = Column(JSON)
    
    estimated_minutes = Column(Integer)
    exp_reward = Column(Integer, default=10)
    gems_reward = Column(Integer, default=5)
    
    is_published = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user_progress = relationship("UserLessonProgress", back_populates="lesson")

class UserLessonProgress(Base):
    __tablename__ = "user_lesson_progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=False)
    
    is_completed = Column(Boolean, default=False)
    score = Column(Float)
    time_spent_seconds = Column(Integer)
    
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime)
    
    user = relationship("User", back_populates="lessons_completed")
    lesson = relationship("Lesson", back_populates="user_progress")

class Card(Base):
    __tablename__ = "cards"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    card_type = Column(Enum(CardType), nullable=False)
    
    word_id = Column(Integer, ForeignKey("dictionary_entries.id"))
    kanji_id = Column(Integer, ForeignKey("kanji_entries.id"))
    grammar_id = Column(Integer, ForeignKey("grammar_patterns.id"))
    
    front = Column(Text, nullable=False)
    back = Column(Text, nullable=False)
    notes = Column(Text)
    
    difficulty = Column(Float, default=0)
    stability = Column(Float, default=0)
    due_date = Column(DateTime, default=datetime.utcnow)
    last_review = Column(DateTime)
    
    reps = Column(Integer, default=0)
    lapses = Column(Integer, default=0)
    state = Column(String, default="new")
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="cards")
    reviews = relationship("Review", back_populates="card")

class Review(Base):
    __tablename__ = "reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    card_id = Column(Integer, ForeignKey("cards.id"), nullable=False)
    
    rating = Column(Integer, nullable=False)
    duration_ms = Column(Integer)
    
    difficulty_before = Column(Float)
    difficulty_after = Column(Float)
    stability_before = Column(Float)
    stability_after = Column(Float)
    
    reviewed_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="reviews")
    card = relationship("Card", back_populates="reviews")

class Achievement(Base):
    __tablename__ = "achievements"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    description = Column(Text)
    icon = Column(String)
    
    requirement_type = Column(String)
    requirement_value = Column(Integer)
    
    exp_reward = Column(Integer, default=0)
    gems_reward = Column(Integer, default=0)
    
    users = relationship("User", secondary=user_achievements, back_populates="achievements")

class ConversationMessage(Base):
    __tablename__ = "conversation_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    role = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    
    session_id = Column(String, index=True)
    model = Column(String)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="conversation_history")

class HandwritingSubmission(Base):
    __tablename__ = "handwriting_submissions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    target_character = Column(String, nullable=False)
    strokes_data = Column(JSON, nullable=False)
    
    score = Column(Float)
    feedback = Column(Text)
    
    created_at = Column(DateTime, default=datetime.utcnow)

class SpeechSubmission(Base):
    __tablename__ = "speech_submissions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    target_text = Column(Text, nullable=False)
    transcription = Column(Text)
    audio_url = Column(String)
    
    accuracy_score = Column(Float)
    feedback = Column(Text)
    
    created_at = Column(DateTime, default=datetime.utcnow)
