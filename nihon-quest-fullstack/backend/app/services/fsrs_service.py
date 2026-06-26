from datetime import datetime, timedelta
from typing import Dict, List
from fsrs import FSRS, Card as FSRSCard, Rating, ReviewLog

class SRSService:
    def __init__(self):
        self.fsrs = FSRS()
    
    def schedule_card(
        self,
        difficulty: float,
        stability: float,
        last_review: datetime,
        state: str
    ) -> Dict:
        card = FSRSCard()
        card.difficulty = difficulty
        card.stability = stability
        card.last_review = last_review
        card.state = self._map_state(state)
        
        now = datetime.utcnow()
        scheduling_cards = self.fsrs.repeat(card, now)
        
        return {
            "again": {
                "due": scheduling_cards[Rating.Again.value].due.isoformat(),
                "difficulty": scheduling_cards[Rating.Again.value].difficulty,
                "stability": scheduling_cards[Rating.Again.value].stability,
                "state": self._map_state_reverse(scheduling_cards[Rating.Again.value].state)
            },
            "hard": {
                "due": scheduling_cards[Rating.Hard.value].due.isoformat(),
                "difficulty": scheduling_cards[Rating.Hard.value].difficulty,
                "stability": scheduling_cards[Rating.Hard.value].stability,
                "state": self._map_state_reverse(scheduling_cards[Rating.Hard.value].state)
            },
            "good": {
                "due": scheduling_cards[Rating.Good.value].due.isoformat(),
                "difficulty": scheduling_cards[Rating.Good.value].difficulty,
                "stability": scheduling_cards[Rating.Good.value].stability,
                "state": self._map_state_reverse(scheduling_cards[Rating.Good.value].state)
            },
            "easy": {
                "due": scheduling_cards[Rating.Easy.value].due.isoformat(),
                "difficulty": scheduling_cards[Rating.Easy.value].difficulty,
                "stability": scheduling_cards[Rating.Easy.value].stability,
                "state": self._map_state_reverse(scheduling_cards[Rating.Easy.value].state)
            }
        }
    
    def review_card(
        self,
        rating: int,
        difficulty: float,
        stability: float,
        last_review: datetime,
        state: str
    ) -> Dict:
        card = FSRSCard()
        card.difficulty = difficulty
        card.stability = stability
        card.last_review = last_review
        card.state = self._map_state(state)
        
        now = datetime.utcnow()
        rating_enum = Rating(rating)
        
        scheduling_cards = self.fsrs.repeat(card, now)
        next_card = scheduling_cards[rating_enum.value]
        
        return {
            "difficulty": next_card.difficulty,
            "stability": next_card.stability,
            "due_date": next_card.due.isoformat(),
            "state": self._map_state_reverse(next_card.state),
            "elapsed_days": next_card.elapsed_days,
            "scheduled_days": next_card.scheduled_days,
            "reps": next_card.reps,
            "lapses": next_card.lapses
        }
    
    def get_next_intervals(
        self,
        difficulty: float,
        stability: float,
        state: str
    ) -> Dict[str, int]:
        card = FSRSCard()
        card.difficulty = difficulty
        card.stability = stability
        card.state = self._map_state(state)
        
        now = datetime.utcnow()
        scheduling_cards = self.fsrs.repeat(card, now)
        
        return {
            "again": (scheduling_cards[Rating.Again.value].due - now).days,
            "hard": (scheduling_cards[Rating.Hard.value].due - now).days,
            "good": (scheduling_cards[Rating.Good.value].due - now).days,
            "easy": (scheduling_cards[Rating.Easy.value].due - now).days
        }
    
    def _map_state(self, state_str: str) -> int:
        state_map = {
            "new": 0,
            "learning": 1,
            "review": 2,
            "relearning": 3
        }
        return state_map.get(state_str, 0)
    
    def _map_state_reverse(self, state_int: int) -> str:
        state_map = {
            0: "new",
            1: "learning",
            2: "review",
            3: "relearning"
        }
        return state_map.get(state_int, "new")
    
    def calculate_retention(self, stability: float, elapsed_days: int) -> float:
        return self.fsrs.calculate_retention(stability, elapsed_days)
    
    def optimize_parameters(self, review_logs: List[ReviewLog]) -> Dict:
        optimized_fsrs = self.fsrs.optimize(review_logs)
        return {
            "parameters": optimized_fsrs.p.to_list(),
            "message": "Parameters optimized based on review history"
        }

srs_service = SRSService()
