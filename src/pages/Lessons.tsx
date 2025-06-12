import React, { useState } from "react";
import { CheckCircle, Lock, Play, Star, Clock } from "lucide-react";
import { sampleLessons } from "../data/vocabulary";
import { Lesson, Exercise } from "../types";
import { useProgress } from "../hooks/useProgress";
import { playAudio } from "../utils/helpers";

const Lessons: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [exerciseResults, setExerciseResults] = useState<boolean[]>([]);
  const { progress, completeLesson, addPoints } = useProgress();

  const isLessonCompleted = (lessonId: string) => {
    return progress.lessonsCompleted.includes(lessonId);
  };

  const startLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentExerciseIndex(0);
    setUserAnswer("");
    setShowResult(false);
    setExerciseResults([]);
  };

  const submitAnswer = () => {
    if (!selectedLesson) return;

    const currentExercise = selectedLesson.exercises[currentExerciseIndex];
    const isCorrect =
      userAnswer.toLowerCase().trim() ===
      currentExercise.correctAnswer.toLowerCase().trim();

    setExerciseResults([...exerciseResults, isCorrect]);
    setShowResult(true);

    if (isCorrect) {
      addPoints(20);
    }
  };

  const nextExercise = () => {
    if (!selectedLesson) return;

    if (currentExerciseIndex < selectedLesson.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setUserAnswer("");
      setShowResult(false);
    } else {
      // Lesson completed
      const correctAnswers = exerciseResults.filter((result) => result).length;
      const totalQuestions = selectedLesson.exercises.length;
      const score = Math.round((correctAnswers / totalQuestions) * 100);

      if (score >= 70 && !isLessonCompleted(selectedLesson.id)) {
        completeLesson(selectedLesson.id);
      }

      // Show completion modal or navigate back
      alert(`Bài học hoàn thành! Điểm số: ${score}%`);
      setSelectedLesson(null);
    }
  };

  const renderExercise = (exercise: Exercise) => {
    switch (exercise.type) {
      case "multiple-choice":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">{exercise.question}</h3>
            <div className="space-y-2">
              {exercise.options?.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={userAnswer === option}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="text-primary-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case "fill-blank":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">{exercise.question}</h3>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="input-field text-lg"
              placeholder="Nhập câu trả lời của bạn..."
            />
          </div>
        );

      default:
        return <div>Loại bài tập không được hỗ trợ</div>;
    }
  };

  if (selectedLesson) {
    const currentExercise = selectedLesson.exercises[currentExerciseIndex];

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Lesson Header */}
        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedLesson.title}
              </h1>
              <p className="text-gray-600">{selectedLesson.description}</p>
            </div>
            <button
              onClick={() => setSelectedLesson(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Câu hỏi {currentExerciseIndex + 1} /{" "}
              {selectedLesson.exercises.length}
            </div>
            <div className="w-48 bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((currentExerciseIndex + 1) /
                      selectedLesson.exercises.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Exercise */}
        <div className="card">
          {renderExercise(currentExercise)}

          {!showResult ? (
            <div className="mt-6">
              <button
                onClick={submitAnswer}
                disabled={!userAnswer.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Kiểm tra
              </button>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div
                className={`p-4 rounded-lg ${
                  exerciseResults[exerciseResults.length - 1]
                    ? "bg-green-100 border border-green-300"
                    : "bg-red-100 border border-red-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {exerciseResults[exerciseResults.length - 1] ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <span className="h-5 w-5 text-red-600">✗</span>
                  )}
                  <span
                    className={`font-medium ${
                      exerciseResults[exerciseResults.length - 1]
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    {exerciseResults[exerciseResults.length - 1]
                      ? "Chính xác!"
                      : "Sai rồi!"}
                  </span>
                </div>

                {!exerciseResults[exerciseResults.length - 1] && (
                  <p className="mt-2 text-red-700">
                    Đáp án đúng:{" "}
                    <strong>{currentExercise.correctAnswer}</strong>
                  </p>
                )}

                {currentExercise.explanation && (
                  <p className="mt-2 text-gray-700">
                    <strong>Giải thích:</strong> {currentExercise.explanation}
                  </p>
                )}
              </div>

              <button onClick={nextExercise} className="btn-primary">
                {currentExerciseIndex < selectedLesson.exercises.length - 1
                  ? "Câu tiếp theo"
                  : "Hoàn thành bài học"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bài học</h1>
        <p className="text-gray-600">
          Học tiếng Anh qua các bài học có cấu trúc
        </p>
      </div>

      {/* Lessons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleLessons.map((lesson, index) => {
          const completed = isLessonCompleted(lesson.id);
          const locked =
            index > 0 && !isLessonCompleted(sampleLessons[index - 1].id);

          return (
            <div
              key={lesson.id}
              className={`card transition-all duration-300 ${
                locked ? "opacity-60" : "hover:scale-105 cursor-pointer"
              }`}
              onClick={() => !locked && startLesson(lesson)}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-2 rounded-lg ${
                    completed
                      ? "bg-green-100"
                      : locked
                      ? "bg-gray-100"
                      : "bg-primary-100"
                  }`}
                >
                  {completed ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : locked ? (
                    <Lock className="h-6 w-6 text-gray-500" />
                  ) : (
                    <Play className="h-6 w-6 text-primary-600" />
                  )}
                </div>

                <div className="flex items-center space-x-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      lesson.level === "beginner"
                        ? "bg-green-100 text-green-800"
                        : lesson.level === "intermediate"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {lesson.level}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {lesson.title}
              </h3>
              <p className="text-gray-600 mb-4">{lesson.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{lesson.exercises.length} bài tập</span>
                </div>

                {completed && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <Star className="h-4 w-4 fill-current" />
                    <span>Hoàn thành</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div className="card bg-gradient-to-r from-primary-50 to-blue-50">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Tổng quan tiến độ
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {progress.lessonsCompleted.length}
            </div>
            <div className="text-sm text-gray-600">Bài hoàn thành</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {progress.totalPoints}
            </div>
            <div className="text-sm text-gray-600">Tổng điểm</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {progress.currentStreak}
            </div>
            <div className="text-sm text-gray-600">Chuỗi ngày</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
