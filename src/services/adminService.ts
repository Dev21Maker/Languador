import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import type { Word, Topic } from '../types/game';

export async function addTopic(topic: Omit<Topic, 'id'>): Promise<string> {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured');
  }

  const docRef = await addDoc(collection(db, 'topics'), topic);
  return docRef.id;
}

export async function addWord(word: Omit<Word, 'id'>): Promise<string> {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured');
  }

  const docRef = await addDoc(collection(db, 'words'), word);
  return docRef.id;
}

export async function updateWord(id: string, word: Partial<Word>): Promise<void> {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured');
  }

  const wordRef = doc(db, 'words', id);
  await updateDoc(wordRef, word);
}

export async function deleteWord(id: string): Promise<void> {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured');
  }

  const wordRef = doc(db, 'words', id);
  await deleteDoc(wordRef);
}