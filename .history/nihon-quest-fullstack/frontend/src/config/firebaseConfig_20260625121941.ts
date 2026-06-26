import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEZ-4sPafZkPUseFK4hRN1q4-Vv-eEq_I",
  authDomain: "nihonselfpacepractic.firebaseapp.com",
  projectId: "nihonselfpacepractic",
  storageBucket: "nihonselfpacepractic.firebasestorage.app",
  messagingSenderId: "319096782095",
  appId: "1:319096782095:web:4eb19452c95a823eab527a",
  measurementId: "G-WWWT98XTT0"
};

const app = initializeApp(firebaseConfig);

let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export { app, analytics };
