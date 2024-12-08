import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import type { Word, Topic } from '../types/game';

// Fallback data for demo mode
const DEMO_TOPICS: Topic[] = [
  {
    id: 'basic-phrases',
    name: 'Basic Phrases',
    description: 'Essential Spanish phrases for beginners',
    difficulty: 1,
  },
  {
    id: 'common-verbs',
    name: 'Common Verbs',
    description: 'Most frequently used Spanish verbs',
    difficulty: 2,
  },
];

const DEMO_WORDS: Record<string, Word[]> = {
  'basic-phrases': [
    { id: '1', english: 'Hello', spanish: 'Hola', difficulty: 1, topicId: 'basic-phrases' },
    { id: '2', english: 'Goodbye', spanish: 'Adiós', difficulty: 1, topicId: 'basic-phrases' },
    { id: '3', english: 'Please', spanish: 'Por favor', difficulty: 1, topicId: 'basic-phrases' },
    { id: '4', english: 'Thank you', spanish: 'Gracias', difficulty: 1, topicId: 'basic-phrases' },
  ],
  'common-verbs': [
    { id: '5', english: 'To be', spanish: 'Ser', difficulty: 2, topicId: 'common-verbs' },
    { id: '6', english: 'To have', spanish: 'Tener', difficulty: 2, topicId: 'common-verbs' },
    { id: '7', english: 'To go', spanish: 'Ir', difficulty: 2, topicId: 'common-verbs' },
    { id: '8', english: 'To want', spanish: 'Querer', difficulty: 2, topicId: 'common-verbs' },
  ],
};

export async function getTopics(): Promise<Topic[]> {
  if (!isFirebaseConfigured) {
    return DEMO_TOPICS;
  }

  try {
    const topicsRef = collection(db, 'topics');
    const snapshot = await getDocs(topicsRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      description: doc.data().description,
      difficulty: doc.data().difficulty,
    }));
  } catch (error) {
    console.error('Error fetching topics, falling back to demo data:', error);
    return DEMO_TOPICS;
  }
}

export async function getWordsByTopic(topicId: string): Promise<Word[]> {
  if (!isFirebaseConfigured) {
    return DEMO_WORDS[topicId] || [];
  }

  try {
    const wordsRef = collection(db, 'words');
    const q = query(wordsRef, where('topicId', '==', topicId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      english: doc.data().english,
      spanish: doc.data().spanish,
      difficulty: doc.data().difficulty,
      topicId: doc.data().topicId,
    }));
  } catch (error) {
    console.error('Error fetching words, falling back to demo data:', error);
    return DEMO_WORDS[topicId] || [];
  }
}

export async function getRandomWords(topicId: string, count: number = 4): Promise<Word[]> {
  if (!isFirebaseConfigured) {
    const words = DEMO_WORDS[topicId] || [];
    return words.slice(0, count);
  }

  try {
    const wordsRef = collection(db, 'words');
    const q = query(wordsRef, where('topicId', '==', topicId), limit(count));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      english: doc.data().english,
      spanish: doc.data().spanish,
      difficulty: doc.data().difficulty,
      topicId: doc.data().topicId,
    }));
  } catch (error) {
    console.error('Error fetching random words, falling back to demo data:', error);
    const words = DEMO_WORDS[topicId] || [];
    return words.slice(0, count);
  }
}

export function generateOptions(words: Word[], correctWord: Word): string[] {
  const options = new Set([correctWord.spanish]);
  
  // Add other words' Spanish translations as options
  words.forEach(word => {
    if (options.size < 4 && word.id !== correctWord.id) {
      options.add(word.spanish);
    }
  });
  
  return Array.from(options).sort(() => Math.random() - 0.5);
}