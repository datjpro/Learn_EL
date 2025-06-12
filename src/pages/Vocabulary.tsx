import React, { useState, useEffect } from "react";
import { Volume2, RotateCcw, CheckCircle, XCircle, Filter } from "lucide-react";
import { sampleWords, categories, levels } from "../data/vocabulary";
import { Word } from "../types";
import { useProgress } from "../hooks/useProgress";
import { playAudio, shuffleArray } from "../utils/helpers";

const Vocabulary: React.FC = () => {
  const [words, setWords] = useState<Word[]>(sampleWords);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showVietnamese, setShowVietnamese] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [studiedWords, setStudiedWords] = useState<string[]>([]);
  const { addWordsLearned, addPoints } = useProgress();

  const currentWord = words[currentWordIndex];

  useEffect(() => {
    filterWords();
  }, [selectedCategory, selectedLevel]);

  const filterWords = () => {
    let filtered = sampleWords;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((word) => word.category === selectedCategory);
    }

    if (selectedLevel !== "all") {
      filtered = filtered.filter((word) => word.level === selectedLevel);
    }

    setWords(shuffleArray(filtered));
    setCurrentWordIndex(0);
    setShowVietnamese(false);
  };

  const nextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setCurrentWordIndex(0);
    }
    setShowVietnamese(false);
  };

  const previousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    } else {
      setCurrentWordIndex(words.length - 1);
    }
    setShowVietnamese(false);
  };

  const markAsStudied = (difficulty: "easy" | "hard") => {
    if (!studiedWords.includes(currentWord.id)) {
      setStudiedWords([...studiedWords, currentWord.id]);
      addWordsLearned([currentWord.id]);

      const points = difficulty === "easy" ? 5 : 10;
      addPoints(points);
    }

    nextWord();
  };

  const resetProgress = () => {
    setStudiedWords([]);
    setCurrentWordIndex(0);
    setShowVietnamese(false);
  };

  if (words.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          Không tìm thấy từ vựng phù hợp với bộ lọc đã chọn.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Học từ vựng</h1>
        <p className="text-gray-600">
          Từ {currentWordIndex + 1} / {words.length} | Đã học:{" "}
          {studiedWords.length}
        </p>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="h-5 w-5 text-gray-600" />
          <span className="font-medium text-gray-900">Bộ lọc:</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chủ đề
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              <option value="all">Tất cả chủ đề</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cấp độ
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="input-field"
            >
              <option value="all">Tất cả cấp độ</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="card bg-gradient-to-br from-blue-50 to-indigo-100 min-h-96">
        <div className="text-center space-y-6">
          {/* Word */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              {currentWord.english}
            </h2>
            <p className="text-lg text-gray-600">{currentWord.pronunciation}</p>

            <button
              onClick={() => playAudio(currentWord.english)}
              className="mt-2 flex items-center justify-center space-x-2 mx-auto text-primary-600 hover:text-primary-700"
            >
              <Volume2 className="h-5 w-5" />
              <span>Phát âm</span>
            </button>
          </div>

          {/* Vietnamese Translation */}
          <div className="min-h-20">
            {showVietnamese ? (
              <div className="space-y-2">
                <p className="text-2xl font-semibold text-green-700">
                  {currentWord.vietnamese}
                </p>
                <p className="text-gray-700 italic">"{currentWord.example}"</p>
                <div className="flex justify-center space-x-2 mt-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentWord.level === "beginner"
                        ? "bg-green-100 text-green-800"
                        : currentWord.level === "intermediate"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {currentWord.level}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {currentWord.category}
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowVietnamese(true)}
                className="btn-primary text-lg px-8 py-3"
              >
                Hiển thị nghĩa
              </button>
            )}
          </div>

          {/* Action Buttons */}
          {showVietnamese && (
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => markAsStudied("hard")}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <XCircle className="h-5 w-5" />
                <span>Khó (10 điểm)</span>
              </button>

              <button
                onClick={() => markAsStudied("easy")}
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Dễ (5 điểm)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button onClick={previousWord} className="btn-secondary">
          ← Từ trước
        </button>

        <div className="flex space-x-2">
          <button
            onClick={resetProgress}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Đặt lại</span>
          </button>
        </div>

        <button onClick={nextWord} className="btn-secondary">
          Từ tiếp →
        </button>
      </div>

      {/* Progress Bar */}
      <div className="card">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Tiến độ học tập
          </span>
          <span className="text-sm text-gray-600">
            {Math.round((studiedWords.length / words.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(studiedWords.length / words.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Vocabulary;
