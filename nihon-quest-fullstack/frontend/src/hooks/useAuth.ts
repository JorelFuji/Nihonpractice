import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { authService } from '@/services/authService';
import { firestoreService, UserProgress } from '@/services/firestoreService';
import { analyticsService } from '@/services/analyticsService';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange(async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        analyticsService.setUser(firebaseUser.uid, {
          display_name: firebaseUser.displayName,
          email: firebaseUser.email
        });

        try {
          const progress = await firestoreService.getUserProgress(firebaseUser.uid);
          setUserProgress(progress);
        } catch (error) {
          console.error('Error fetching user progress:', error);
        }
      } else {
        setUserProgress(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshUserProgress = async () => {
    if (user) {
      try {
        const progress = await firestoreService.getUserProgress(user.uid);
        setUserProgress(progress);
      } catch (error) {
        console.error('Error refreshing user progress:', error);
      }
    }
  };

  return {
    user,
    userProgress,
    loading,
    isAuthenticated: !!user,
    refreshUserProgress
  };
}
