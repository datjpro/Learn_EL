import React from "react";
import { Link } from "react-router-dom";
import {
  Book,
  BookOpen,
  GamepadIcon,
  TrendingUp,
  Star,
  Award,
  Target,
} from "lucide-react";
import { useProgress } from "../hooks/useProgress";

const Home: React.FC = () => {
  const { progress } = useProgress();

  const features = [
    {
      title: "Học từ vựng",
      description: "Hàng nghìn từ vựng được phân loại theo cấp độ và chủ đề",
      icon: Book,
      link: "/vocabulary",
      color: "bg-blue-500",
    },
    {
      title: "Bài học có cấu trúc",
      description: "Các bài học được thiết kế từ cơ bản đến nâng cao",
      icon: BookOpen,
      link: "/lessons",
      color: "bg-green-500",
    },
    {
      title: "Trò chơi học tập",
      description: "Học tiếng Anh thông qua các trò chơi thú vị",
      icon: GamepadIcon,
      link: "/games",
      color: "bg-purple-500",
    },
    {
      title: "Theo dõi tiến độ",
      description: "Xem chi tiết quá trình học tập và thành tích của bạn",
      icon: TrendingUp,
      link: "/progress",
      color: "bg-orange-500",
    },
  ];

  const stats = [
    {
      label: "Từ đã học",
      value: progress.wordsLearned.length,
      icon: Book,
      color: "text-blue-600",
    },
    {
      label: "Bài hoàn thành",
      value: progress.lessonsCompleted.length,
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      label: "Điểm số",
      value: progress.totalPoints,
      icon: Star,
      color: "text-yellow-600",
    },
    {
      label: "Cấp độ",
      value: progress.level,
      icon: Award,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-primary-600 to-blue-700 rounded-2xl text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Học tiếng Anh hiệu quả
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Nền tảng học tiếng Anh toàn diện với AI và game hóa
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/lessons"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Bắt đầu học
          </Link>
          <Link
            to="/vocabulary"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
          >
            Khám phá từ vựng
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="card text-center">
            <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Link
            key={index}
            to={feature.link}
            className="card hover:scale-105 transform transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className={`${feature.color} p-3 rounded-lg`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Start Section */}
      <div className="card bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-primary-500">
        <div className="flex items-center space-x-4">
          <div className="bg-primary-100 p-3 rounded-full">
            <Target className="h-8 w-8 text-primary-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Mục tiêu hôm nay
            </h3>
            <p className="text-gray-600 mb-4">
              Học 10 từ mới và hoàn thành 1 bài học để duy trì chuỗi ngày học
              tập
            </p>
            <div className="flex space-x-3">
              <Link to="/vocabulary" className="btn-primary">
                Học từ vựng
              </Link>
              <Link to="/lessons" className="btn-secondary">
                Làm bài tập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
