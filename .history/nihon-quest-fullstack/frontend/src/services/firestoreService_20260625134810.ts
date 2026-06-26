import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

export interface UserProgress {
  uid: string;
  level: number;
  xp: number;
  streak: number;
  gems: number;
  hearts: number;
  totalKanji: number;
  totalVocab: number;
  totalGrammar: number;
  currentJLPTLevel: string;
  lastPracticeDate?: Timestamp;
  updatedAt: any;
}

export interface PracticeSession {
  id?: string;
  uid: string;
  sessionType: 'vocabulary' | 'grammar' | 'kanji' | 'handwriting' | 'quiz';
  questionsAnswered: number;
  correctAnswers: number;
  xpEarned: number;
  gemsEarned: number;
  duration: number;
  jlptLevel: string;
  completedAt: any;
}

export interface LessonProgress {
  id?: string;
  uid: string;
  lessonId: string;
  lessonTitle: string;
  progress: number;
  completed: boolean;
  lastAccessedAt: any;
}

export interface ReviewCard {
  id?: string;
  uid: string;
  word: string;
  reading?: string;
  meaning: string;
  cardType: 'vocabulary' | 'kanji' | 'grammar';
  jlptLevel: string;
  nextReviewDate: Timestamp;
  easeFactor: number;
  interval: number;
  repetitions: number;
  createdAt: any;
}

export const firestoreService = {
  async getUserProgress(uid: string): Promise<UserProgress | null> {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data() as UserProgress;
      }
      return null;
    } catch (error) {
      console.error('Error getting user progress:', error);
      throw error;
    }
  },

  async updateUserProgress(uid: string, updates: Partial<UserProgress>): Promise<void> {
    try {
      const docRef = doc(db, 'users', uid);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating user progress:', error);
      throw error;
    }
  },

  async addXP(uid: string, xpAmount: number): Promise<void> {
    try {
      const docRef = doc(db, 'users', uid);
      await updateDoc(docRef, {
        xp: increment(xpAmount),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error adding XP:', error);
      throw error;
    }
  },

  async addGems(uid: string, gemsAmount: number): Promise<void> {
    try {
      const docRef = doc(db, 'users', uid);
      await updateDoc(docRef, {
        gems: increment(gemsAmount),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error adding gems:', error);
      throw error;
    }
  },

  async updateStreak(uid: string): Promise<void> {
    try {
      const userProgress = await this.getUserProgress(uid);
      if (!userProgress) return;

      const now = new Date();
      const lastPractice = userProgress.lastPracticeDate?.toDate();
      
      let newStreak = userProgress.streak;
      
      if (lastPractice) {
        const daysDiff = Math.floor((now.getTime() - lastPractice.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
          newStreak += 1;
        } else if (daysDiff > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }

      await updateDoc(doc(db, 'users', uid), {
        streak: newStreak,
        lastPracticeDate: Timestamp.now(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating streak:', error);
      throw error;
    }
  },

  async savePracticeSession(session: PracticeSession): Promise<string> {
    try {
      const sessionsRef = collection(db, 'practiceSessions');
      const docRef = doc(sessionsRef);
      
      await setDoc(docRef, {
        ...session,
        completedAt: serverTimestamp()
      });

      await this.addXP(session.uid, session.xpEarned);
      await this.addGems(session.uid, session.gemsEarned);
      await this.updateStreak(session.uid);

      return docRef.id;
    } catch (error) {
      console.error('Error saving practice session:', error);
      throw error;
    }
  },

  async getPracticeSessions(uid: string, limitCount: number = 10): Promise<PracticeSession[]> {
    try {
      const q = query(
        collection(db, 'practiceSessions'),
        where('uid', '==', uid),
        orderBy('completedAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as PracticeSession));
    } catch (error) {
      console.error('Error getting practice sessions:', error);
      throw error;
    }
  },

  async saveLessonProgress(progress: LessonProgress): Promise<void> {
    try {
      const docRef = doc(db, 'lessonProgress', `${progress.uid}_${progress.lessonId}`);
      await setDoc(docRef, {
        ...progress,
        lastAccessedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error('Error saving lesson progress:', error);
      throw error;
    }
  },

  async getLessonProgress(uid: string, lessonId: string): Promise<LessonProgress | null> {
    try {
      const docRef = doc(db, 'lessonProgress', `${uid}_${lessonId}`);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as LessonProgress;
      }
      return null;
    } catch (error) {
      console.error('Error getting lesson progress:', error);
      throw error;
    }
  },

  async getAllLessonProgress(uid: string): Promise<LessonProgress[]> {
    try {
      const q = query(
        collection(db, 'lessonProgress'),
        where('uid', '==', uid),
        orderBy('lastAccessedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as LessonProgress));
    } catch (error) {
      console.error('Error getting all lesson progress:', error);
      throw error;
    }
  },

  async saveReviewCard(card: ReviewCard): Promise<string> {
    try {
      const cardsRef = collection(db, 'reviewCards');
      const docRef = doc(cardsRef);
      
      await setDoc(docRef, {
        ...card,
        createdAt: serverTimestamp()
      });

      return docRef.id;
    } catch (error) {
      console.error('Error saving review card:', error);
      throw error;
    }
  },

  async getDueReviewCards(uid: string): Promise<ReviewCard[]> {
    try {
      const now = Timestamp.now();
      const q = query(
        collection(db, 'reviewCards'),
        where('uid', '==', uid),
        where('nextReviewDate', '<=', now),
        orderBy('nextReviewDate', 'asc'),
        limit(20)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ReviewCard));
    } catch (error) {
      console.error('Error getting due review cards:', error);
      throw error;
    }
  },

  async updateReviewCard(cardId: string, updates: Partial<ReviewCard>): Promise<void> {
    try {
      const docRef = doc(db, 'reviewCards', cardId);
      await updateDoc(docRef, updates);
    } catch (error) {
      console.error('Error updating review card:', error);
      throw error;
    }
  }
};
