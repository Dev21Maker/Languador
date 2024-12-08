export interface GameState {
  playerHealth: number;
  aiHealth: number;
  level: number;
  topic: Topic;
  score: number;
  playerCombo: number;
  playerPowerUps: PowerUp[];
  aiLevel: number;
  aiMood: AIMood;
  timeLeft: number;
  currentQuestion: Question;
  currentOptions: string[];
}

export interface Question {
  id: string;
  text: string;
  prompt: string;
  answer: string;
  difficulty: number;
}

export interface PowerUp {
  id: string;
  name: string;
  icon: string;
  effect: string;
}

export interface Word {
  id: string;
  english: string;
  spanish: string;
  difficulty: number;
  topicId: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  difficulty: number;
}

export type AIMood = 'neutral' | 'impressed' | 'challenging' | 'encouraging';