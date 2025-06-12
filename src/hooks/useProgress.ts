import { useState, useEffect } from "react";
import { UserProgress } from "../types";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  calculateLevel,
} from "../utils/helpers";

const initialProgress: UserProgress = {
  userId: "user-1",
  wordsLearned: [],
  lessonsCompleted: [],
  currentStreak: 0,
  totalPoints: 0,
  level: 1,
  achievements: [],
};

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(
    loadFromLocalStorage("userProgress", initialProgress)
  );

  useEffect(() => {
    saveToLocalStorage("userProgress", progress);
  }, [progress]);

  const addWordsLearned = (wordIds: string[]) => {
    setProgress((prev) => {
      const newWordsLearned = [...new Set([...prev.wordsLearned, ...wordIds])];
      const pointsGained = wordIds.length * 10;
      const newTotalPoints = prev.totalPoints + pointsGained;

      return {
        ...prev,
        wordsLearned: newWordsLearned,
        totalPoints: newTotalPoints,
        level: calculateLevel(newTotalPoints),
      };
    });
  };

  const completeLesson = (lessonId: string) => {
    setProgress((prev) => {
      if (prev.lessonsCompleted.includes(lessonId)) return prev;

      const newLessonsCompleted = [...prev.lessonsCompleted, lessonId];
      const pointsGained = 100;
      const newTotalPoints = prev.totalPoints + pointsGained;

      return {
        ...prev,
        lessonsCompleted: newLessonsCompleted,
        totalPoints: newTotalPoints,
        level: calculateLevel(newTotalPoints),
        currentStreak: prev.currentStreak + 1,
      };
    });
  };

  const addPoints = (points: number) => {
    setProgress((prev) => {
      const newTotalPoints = prev.totalPoints + points;
      return {
        ...prev,
        totalPoints: newTotalPoints,
        level: calculateLevel(newTotalPoints),
      };
    });
  };

  const resetProgress = () => {
    setProgress(initialProgress);
  };

  return {
    progress,
    addWordsLearned,
    completeLesson,
    addPoints,
    resetProgress,
  };
};
