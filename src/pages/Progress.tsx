import React from "react";
import {
  Trophy,
  Star,
  Target,
  Calendar,
  Book,
  GamepadIcon,
  TrendingUp,
  Award,
} from "lucide-react";
import { useProgress } from "../hooks/useProgress";

const Progress: React.FC = () => {
  const { progress, resetProgress } = useProgress();

  const achievements = [
    {
      id: "first-word",
      name: "Từ đầu tiên",
      description: "Học từ vựng đầu tiên",
      icon: Star,
      condition: progress.wordsLearned.length >= 1,
      color: "text-yellow-500",
    },
    {
      id: "word-master-10",
      name: "Thầy từ vựng",
      description: "Học 10 từ vựng",
      icon: Book,
      condition: progress.wordsLearned.length >= 10,
      color: "text-blue-500",
    },
    {
      id: "lesson-complete",
      name: "Học sinh chăm chỉ",
      description: "Hoàn thành bài học đầu tiên",
      icon: Award,
      condition: progress.lessonsCompleted.length >= 1,
      color: "text-green-500",
    },
    {
      id: "point-collector",
      name: "Thợ săn điểm",
      description: "Đạt 500 điểm",
      icon: Target,
      condition: progress.totalPoints >= 500,
      color: "text-purple-500",
    },
    {
      id: "streak-master",
      name: "Nhà vô địch",
      description: "Học liên tiếp 7 ngày",
      icon: Trophy,
      condition: progress.currentStreak >= 7,
      color: "text-orange-500",
    },
  ];

  const stats = [
    {
      label: "Tổng từ đã học",
      value: progress.wordsLearned.length,
      icon: Book,
      color: "bg-blue-500",
      description: "từ vựng",
    },
    {
      label: "Bài học hoàn thành",
      value: progress.lessonsCompleted.length,
      icon: Award,
      color: "bg-green-500",
      description: "bài học",
    },
    {
      label: "Tổng điểm",
      value: progress.totalPoints,
      icon: Star,
      color: "bg-yellow-500",
      description: "điểm",
    },
    {
      label: "Cấp độ hiện tại",
      value: progress.level,
      icon: TrendingUp,
      color: "bg-purple-500",
      description: "level",
    },
    {
      label: "Chuỗi ngày học",
      value: progress.currentStreak,
      icon: Calendar,
      color: "bg-orange-500",
      description: "ngày",
    },
  ];

  const nextLevelPoints = progress.level * 1000;
  const currentLevelProgress = progress.totalPoints % 1000;
  const progressPercentage = (currentLevelProgress / 1000) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tiến độ học tập
        </h1>
        <p className="text-gray-600">
          Theo dõi quá trình học tiếng Anh của bạn
        </p>
      </div>

      {/* Level Progress */}
      <div className="card bg-gradient-to-r from-primary-600 to-blue-700 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Cấp độ {progress.level}</h2>
            <p className="opacity-90">
              {currentLevelProgress} / 1000 điểm để lên cấp độ{" "}
              {progress.level + 1}
            </p>
          </div>
          <div className="text-right">
            <Trophy className="h-12 w-12 text-yellow-300 mb-2 mx-auto" />
            <div className="text-lg font-semibold">
              {progress.totalPoints} điểm
            </div>
          </div>
        </div>

        <div className="w-full bg-white/20 rounded-full h-4">
          <div
            className="bg-yellow-400 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="card text-center">
            <div
              className={`${stat.color} p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center`}
            >
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.description}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Thành tích</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                achievement.condition
                  ? "border-green-300 bg-green-50"
                  : "border-gray-200 bg-gray-50 opacity-60"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-full ${
                    achievement.condition ? "bg-green-100" : "bg-gray-100"
                  }`}
                >
                  <achievement.icon
                    className={`h-6 w-6 ${
                      achievement.condition
                        ? achievement.color
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h4
                    className={`font-semibold ${
                      achievement.condition ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {achievement.name}
                  </h4>
                  <p
                    className={`text-sm ${
                      achievement.condition ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {achievement.description}
                  </p>
                </div>
                {achievement.condition && (
                  <div className="text-green-600">
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Calendar */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Lịch học tập
        </h3>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-600 py-2"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }, (_, i) => {
            const isActive = Math.random() > 0.7; // Simulate some activity
            return (
              <div
                key={i}
                className={`h-8 rounded border ${
                  isActive
                    ? "bg-green-200 border-green-300"
                    : "bg-gray-100 border-gray-200"
                }`}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span>Ít hoạt động</span>
          <div className="flex space-x-1">
            <div className="h-3 w-3 bg-gray-100 border rounded"></div>
            <div className="h-3 w-3 bg-green-100 border rounded"></div>
            <div className="h-3 w-3 bg-green-200 border rounded"></div>
            <div className="h-3 w-3 bg-green-300 border rounded"></div>
            <div className="h-3 w-3 bg-green-400 border rounded"></div>
          </div>
          <span>Nhiều hoạt động</span>
        </div>
      </div>

      {/* Weekly Goals */}
      <div className="card bg-gradient-to-r from-purple-50 to-pink-50">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Mục tiêu tuần này
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Book className="h-5 w-5 text-blue-600" />
              <span>Học 50 từ vựng mới</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${Math.min(
                      (progress.wordsLearned.length / 50) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
              <span className="text-sm text-gray-600">
                {progress.wordsLearned.length}/50
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GamepadIcon className="h-5 w-5 text-purple-600" />
              <span>Chơi game 5 lần</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: "60%" }}
                />
              </div>
              <span className="text-sm text-gray-600">3/5</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Award className="h-5 w-5 text-green-600" />
              <span>Hoàn thành 3 bài học</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${Math.min(
                      (progress.lessonsCompleted.length / 3) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
              <span className="text-sm text-gray-600">
                {progress.lessonsCompleted.length}/3
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Progress */}
      <div className="card border-red-200 bg-red-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-red-800 mb-1">
              Đặt lại tiến độ
            </h3>
            <p className="text-red-600 text-sm">
              Xóa tất cả tiến độ học tập và bắt đầu lại từ đầu
            </p>
          </div>
          <button
            onClick={resetProgress}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Đặt lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default Progress;
