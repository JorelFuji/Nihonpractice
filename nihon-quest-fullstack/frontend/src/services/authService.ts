import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  signOut,
  User,
  UserCredential,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/config/firebaseConfig';

const googleProvider = new GoogleAuthProvider();
const auth0Provider = new OAuthProvider('oidc.auth0');
const oktaProvider = new OAuthProvider('oidc.okta');
const lineProvider = new OAuthProvider('oidc.line');

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  level: number;
  xp: number;
  streak: number;
  gems: number;
  hearts: number;
  totalKanji: number;
  totalVocab: number;
  totalGrammar: number;
  currentJLPTLevel: string;
  createdAt: any;
  lastLoginAt: any;
}

export const authService = {
  async signUpWithEmail(email: string, password: string, displayName: string): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(userCredential.user, {
        displayName: displayName
      });

      await this.createUserProfile(userCredential.user, displayName);
      
      return userCredential;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async signInWithEmail(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      await this.updateLastLogin(userCredential.user.uid);
      
      return userCredential;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async signInWithGoogle(): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        await this.createUserProfile(result.user, result.user.displayName || 'Student');
      } else {
        await this.updateLastLogin(result.user.uid);
      }
      
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async signInWithAuth0(): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(auth, auth0Provider);
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        await this.createUserProfile(result.user, result.user.displayName || 'Student');
      } else {
        await this.updateLastLogin(result.user.uid);
      }
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async signInWithOkta(): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(auth, oktaProvider);
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        await this.createUserProfile(result.user, result.user.displayName || 'Student');
      } else {
        await this.updateLastLogin(result.user.uid);
      }
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async signInWithLine(): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(auth, lineProvider);
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        await this.createUserProfile(result.user, result.user.displayName || 'Student');
      } else {
        await this.updateLastLogin(result.user.uid);
      }
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async createUserProfile(user: User, displayName: string): Promise<void> {
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: displayName,
      photoURL: user.photoURL || undefined,
      level: 1,
      xp: 0,
      streak: 0,
      gems: 100,
      hearts: 5,
      totalKanji: 0,
      totalVocab: 0,
      totalGrammar: 0,
      currentJLPTLevel: 'N5',
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp()
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);
  },

  async updateLastLogin(uid: string): Promise<void> {
    await setDoc(doc(db, 'users', uid), {
      lastLoginAt: serverTimestamp()
    }, { merge: true });
  },

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  },

  getCurrentUser(): User | null {
    return auth.currentUser;
  }
};
