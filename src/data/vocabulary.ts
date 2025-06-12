import { Word, Lesson } from "../types";

export const sampleWords: Word[] = [
  {
    id: "1",
    english: "hello",
    vietnamese: "xin chào",
    pronunciation: "/həˈləʊ/",
    example: "Hello, how are you today?",
    level: "beginner",
    category: "greetings",
  },
  {
    id: "2",
    english: "goodbye",
    vietnamese: "tạm biệt",
    pronunciation: "/ˌɡʊdˈbaɪ/",
    example: "Goodbye! See you tomorrow.",
    level: "beginner",
    category: "greetings",
  },
  {
    id: "3",
    english: "beautiful",
    vietnamese: "đẹp",
    pronunciation: "/ˈbjuːtɪfəl/",
    example: "The sunset is beautiful tonight.",
    level: "intermediate",
    category: "adjectives",
  },
  {
    id: "4",
    english: "responsibility",
    vietnamese: "trách nhiệm",
    pronunciation: "/rɪˌspɒnsəˈbɪləti/",
    example: "It is your responsibility to complete the project.",
    level: "advanced",
    category: "nouns",
  },
  {
    id: "5",
    english: "accomplish",
    vietnamese: "hoàn thành",
    pronunciation: "/əˈkʌmplɪʃ/",
    example: "She worked hard to accomplish her goals.",
    level: "advanced",
    category: "verbs",
  },
];

export const sampleLessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "Greetings and Introductions",
    description: "Learn basic greetings and how to introduce yourself",
    level: "beginner",
    words: sampleWords.filter((word) => word.category === "greetings"),
    exercises: [
      {
        id: "ex-1",
        type: "multiple-choice",
        question: 'What does "hello" mean in Vietnamese?',
        options: ["tạm biệt", "xin chào", "cảm ơn", "xin lỗi"],
        correctAnswer: "xin chào",
        explanation:
          'Hello means "xin chào" in Vietnamese - a common greeting.',
      },
    ],
  },
  {
    id: "lesson-2",
    title: "Describing Things",
    description: "Learn adjectives to describe people and objects",
    level: "intermediate",
    words: sampleWords.filter((word) => word.category === "adjectives"),
    exercises: [
      {
        id: "ex-2",
        type: "fill-blank",
        question: "The sunset is _____ tonight.",
        correctAnswer: "beautiful",
        explanation:
          "Beautiful is an adjective used to describe something pleasing to look at.",
      },
    ],
  },
];

export const categories = [
  "greetings",
  "family",
  "food",
  "colors",
  "numbers",
  "animals",
  "weather",
  "transportation",
  "work",
  "hobbies",
  "adjectives",
  "verbs",
  "nouns",
];

export const levels = ["beginner", "intermediate", "advanced"] as const;
