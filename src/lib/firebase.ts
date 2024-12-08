import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-mode',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-mode',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-mode',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-mode',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'demo-mode',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'demo-mode'
};

export const isFirebaseConfigured = firebaseConfig.apiKey !== 'demo-mode';

let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);

  if (isFirebaseConfigured) {
    setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.error('Error setting persistence:', error.message);
    });
  }
} catch (error) {
  console.error('Firebase initialization in demo mode');
}

export { auth, db };
export default app;