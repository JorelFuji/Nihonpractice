import { logEvent, setUserId, setUserProperties } from 'firebase/analytics';
import { analytics } from '@/config/firebaseConfig';

export const analyticsService = {
  logEvent(eventName: string, eventParams?: Record<string, any>) {
    if (analytics) {
      logEvent(analytics, eventName, eventParams);
    }
  },

  setUser(userId: string, properties?: Record<string, any>) {
    if (analytics) {
      setUserId(analytics, userId);
      if (properties) {
        setUserProperties(analytics, properties);
      }
    }
  },

  logPracticeSession(sessionType: string, questionsAnswered: number, correctAnswers: number) {
    this.logEvent('practice_session_complete', {
      session_type: sessionType,
      questions_answered: questionsAnswered,
      correct_answers: correctAnswers,
      accuracy: correctAnswers / questionsAnswered
    });
  },

  logLessonView(lessonId: string, lessonTitle: string, jlptLevel: string) {
    this.logEvent('lesson_view', {
      lesson_id: lessonId,
      lesson_title: lessonTitle,
      jlpt_level: jlptLevel
    });
  },

  logLessonComplete(lessonId: string, duration: number) {
    this.logEvent('lesson_complete', {
      lesson_id: lessonId,
      duration_seconds: duration
    });
  },

  logAITutorQuestion(questionType: string, jlptLevel: string) {
    this.logEvent('ai_tutor_question', {
      question_type: questionType,
      jlpt_level: jlptLevel
    });
  },

  logHandwritingPractice(character: string, attempts: number) {
    this.logEvent('handwriting_practice', {
      character: character,
      attempts: attempts
    });
  },

  logLevelUp(newLevel: number, xp: number) {
    this.logEvent('level_up', {
      new_level: newLevel,
      total_xp: xp
    });
  },

  logStreakMilestone(streakDays: number) {
    this.logEvent('streak_milestone', {
      streak_days: streakDays
    });
  },

  logSignUp(method: string) {
    this.logEvent('sign_up', {
      method: method
    });
  },

  logLogin(method: string) {
    this.logEvent('login', {
      method: method
    });
  },

  logSearch(searchTerm: string, resultCount: number) {
    this.logEvent('search', {
      search_term: searchTerm,
      result_count: resultCount
    });
  }
};
