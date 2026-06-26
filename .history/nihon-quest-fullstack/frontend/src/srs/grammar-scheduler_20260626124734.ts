/**
 * grammar-scheduler.ts
 * ---------------------
 * Per-user scheduling layer on top of ts-fsrs.
 *
 * Storage rule: ts-fsrs Card uses JS Date objects. Firestore round-trips
 * Dates as Timestamps, which is lossy and annoying to query. So we persist
 * a FLAT, serializable ReviewState with epoch-millisecond numbers, and
 * convert to/from the ts-fsrs Card only in memory at review time.
 */

import {
  createEmptyCard,
  fsrs,
  generatorParameters,
  Rating,
  State,
  type Card,
  type FSRS,
  type Grade,
} from 'ts-fsrs';

/**
 * Tune these once. request_retention 0.9 = target 90% recall; raise it for
 * harder review load and higher retention, lower it to reduce daily reviews.
 * enable_short_term keeps same-day learning steps (good for new grammar).
 */
const PARAMS = generatorParameters({
  request_retention: 0.9,
  maximum_interval: 36500,
  enable_fuzz: true,
  enable_short_term: true,
});

const scheduler: FSRS = fsrs(PARAMS);

/**
 * Serializable scheduling state, one per (user, grammarPointId).
 * Store this object directly in Firestore. All times are epoch ms.
 */
export interface ReviewState {
  /** Foreign key to GrammarPoint.id. */
  grammarPointId: string;
  /** Epoch ms when this card is next due. */
  due: number;
  stability: number;
  difficulty: number;
  elapsedDays: number;
  scheduledDays: number;
  reps: number;
  lapses: number;
  /** ts-fsrs State enum value (New/Learning/Review/Relearning). */
  state: State;
  /** Epoch ms of last review, or null if never reviewed. */
  lastReview: number | null;
}

/** A grammar point paired with its scheduling state, ready to study. */
export interface StudyCard<TPoint extends { id: string }> {
  point: TPoint;
  review: ReviewState;
}

/** Create initial scheduling state for a grammar point the user just unlocked. */
export function newReviewState(grammarPointId: string, now: Date = new Date()): ReviewState {
  const card = createEmptyCard(now);
  return toReviewState(grammarPointId, card);
}

/**
 * Apply a user's rating and return the updated state.
 * Use this when you already know the grade (the normal review flow).
 */
export function gradeCard(
  state: ReviewState,
  rating: Grade,
  now: Date = new Date(),
): ReviewState {
  const card = toCard(state);
  const { card: next } = scheduler.next(card, now, rating);
  return toReviewState(state.grammarPointId, next);
}

/**
 * Preview the next interval (in days) for each of the four buttons, so the UI
 * can show "Again 1m / Hard 8m / Good 4d / Easy 9d" before the user picks.
 */
export function previewIntervals(
  state: ReviewState,
  now: Date = new Date(),
): Record<Grade, { due: Date; scheduledDays: number }> {
  const card = toCard(state);
  const preview = scheduler.repeat(card, now);
  const pick = (r: Grade) => ({
    due: preview[r].card.due,
    scheduledDays: preview[r].card.scheduled_days,
  });
  return {
    [Rating.Again]: pick(Rating.Again),
    [Rating.Hard]: pick(Rating.Hard),
    [Rating.Good]: pick(Rating.Good),
    [Rating.Easy]: pick(Rating.Easy),
  } as Record<Grade, { due: Date; scheduledDays: number }>;
}

/** Filter a user's cards down to those due now, soonest first. */
export function getDueCards<TPoint extends { id: string }>(
  cards: StudyCard<TPoint>[],
  now: Date = new Date(),
): StudyCard<TPoint>[] {
  const cutoff = now.getTime();
  return cards
    .filter((c) => c.review.due <= cutoff)
    .sort((a, b) => a.review.due - b.review.due);
}

/** Re-export so callers grade with a stable enum, not magic numbers. */
export { Rating, State };

// ---- internal conversion helpers -------------------------------------------

function toCard(state: ReviewState): Card {
  return {
    due: new Date(state.due),
    stability: state.stability,
    difficulty: state.difficulty,
    elapsed_days: state.elapsedDays,
    scheduled_days: state.scheduledDays,
    reps: state.reps,
    lapses: state.lapses,
    state: state.state,
    last_review: state.lastReview === null ? undefined : new Date(state.lastReview),
  } as Card;
}

function toReviewState(grammarPointId: string, card: Card): ReviewState {
  return {
    grammarPointId,
    due: card.due.getTime(),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsedDays: card.elapsed_days,
    scheduledDays: card.scheduled_days,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state,
    lastReview: card.last_review ? card.last_review.getTime() : null,
  };
}
