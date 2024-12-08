import { auth } from './firebase';
import { 
  signInAnonymously, 
  signInWithPopup, 
  GoogleAuthProvider,
  User,
  AuthError
} from 'firebase/auth';

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    const authError = error as AuthError;
    console.error('Google sign in error:', authError.code, authError.message);
    
    if (authError.code === 'auth/configuration-not-found') {
      throw new Error('Authentication service is not properly configured. Please try again later.');
    }
    
    if (authError.code === 'auth/popup-blocked') {
      throw new Error('Please allow popups for this website to sign in with Google.');
    }
    
    throw new Error('Failed to sign in with Google. Please try again later.');
  }
};

export const signInAsGuest = async () => {
  try {
    if (!auth.app.options.apiKey) {
      throw new Error('Firebase configuration is missing. Please check your environment variables.');
    }
    
    // Validate Firebase initialization before attempting sign in
    if (!auth.app) {
      throw new Error('Firebase has not been properly initialized.');
    }
    
    const result = await signInAnonymously(auth);
    return result;
  } catch (error) {
    const authError = error as AuthError;
    console.error('Guest sign in error:', authError.code, authError.message);
    
    if (authError.code === 'auth/api-key-not-valid') {
      throw new Error('Authentication service is not properly configured. Please try again later.');
    }
    
    throw new Error('Guest sign-in is temporarily unavailable. Please try again later.');
  }
};

export const getDisplayName = (user: User | null) => {
  if (!user) return 'Guest';
  if (user.isAnonymous) {
    return `Guest ${user.uid.slice(0, 4)}`;
  }
  return user.displayName || `Player ${user.uid.slice(0, 4)}`;
};