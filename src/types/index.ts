export interface Word {
  id: string;
  english: string;
  vietnamese: string;
  pronunciation: string;
  example: string;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  audioUrl?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  words: Word[];
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  type: "multiple-choice" | "fill-blank" | "speaking" | "listening";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface UserProgress {
  userId: string;
  wordsLearned: string[];
  lessonsCompleted: string[];
  currentStreak: number;
  totalPoints: number;
  level: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface GameScore {
  gameType: string;
  score: number;
  timeSpent: number;
  correctAnswers: number;
  totalQuestions: number;
  date: Date;
}
