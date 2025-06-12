# 🚀 English Learning System (Learn_EL)

Hệ thống học tiếng Anh toàn diện với giao diện hiện đại, được xây dựng bằng React + TypeScript + Tailwind CSS.

## ✨ Tính năng chính

### 📚 Học từ vựng

- **Flashcards thông minh**: Hệ thống thẻ từ tương tác với thuật toán spaced repetition
- **Phân loại theo chủ đề**: Từ vựng được chia theo các chủ đề như gia đình, công việc, du lịch...
- **Nhiều cấp độ**: Từ cơ bản (Beginner) đến nâng cao (Advanced)
- **Phát âm**: Tích hợp audio để luyện phát âm chuẩn
- **Theo dõi tiến độ**: Biết được từ nào đã thuộc, từ nào cần ôn lại

### 🎓 Bài học có cấu trúc

- **Lộ trình rõ ràng**: Từ cơ bản đến nâng cao theo từng level
- **Ngữ pháp**: Các bài học ngữ pháp với ví dụ minh họa
- **Bài tập tương tác**: Quiz, fill-in-the-blank, multiple choice
- **Giải thích chi tiết**: Mỗi bài đều có phần giải thích và ghi chú

### 🎮 Trò chơi học tập

- **Word Matching**: Ghép từ với nghĩa
- **Sentence Builder**: Sắp xếp từ thành câu hoàn chỉnh
- **Quick Quiz**: Trả lời nhanh để tích điểm
- **Grammar Challenge**: Thử thách ngữ pháp
- **Pronunciation Game**: Game luyện phát âm

### 📊 Theo dõi tiến độ

- **Thống kê chi tiết**: Số từ đã học, bài hoàn thành, điểm số
- **Biểu đồ tiến độ**: Visualize quá trình học tập theo thời gian
- **Hệ thống cấp độ**: Level up khi đạt milestone
- **Achievements**: Huy hiệu thành tích để tăng động lực
- **Streak counter**: Đếm số ngày học liên tục

## 🛠️ Công nghệ sử dụng

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Hooks (useState, useEffect, useContext)

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống

- Node.js >= 18.x
- npm hoặc yarn

### Cài đặt

```bash
# Clone repository
git clone https://github.com/datjpro/Learn_EL.git
cd Learn_EL

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build
```

### Scripts có sẵn

```bash
npm run dev      # Chạy development server
npm run build    # Build production
npm run preview  # Preview production build
```

## 📁 Cấu trúc dự án

```
src/
├── components/          # UI Components
│   └── Navbar.tsx      # Navigation bar
├── pages/              # Các trang chính
│   ├── Home.tsx        # Trang chủ
│   ├── Vocabulary.tsx  # Trang học từ vựng
│   ├── Lessons.tsx     # Trang bài học
│   ├── Games.tsx       # Trang trò chơi
│   └── Progress.tsx    # Trang theo dõi tiến độ
├── hooks/              # Custom React Hooks
│   └── useProgress.ts  # Hook quản lý tiến độ học tập
├── types/              # TypeScript type definitions
│   └── index.ts        # Các interface và type
├── data/               # Dữ liệu mẫu
│   └── vocabulary.ts   # Dữ liệu từ vựng
├── utils/              # Utility functions
│   └── helpers.ts      # Các hàm tiện ích
└── index.css           # Styles chính
```

## 🎯 Tính năng nổi bật

### 🧠 AI-Powered Learning

- Thuật toán spaced repetition cho việc ôn tập từ vựng hiệu quả
- Gợi ý bài học dựa trên tiến độ hiện tại
- Phân tích điểm yếu để đưa ra lộ trình học phù hợp

### 🎨 Giao diện hiện đại

- Responsive design hoạt động tốt trên mọi thiết bị
- Dark/Light theme (planned)
- Animations mượt mà với Tailwind CSS
- UX/UI thân thiện và dễ sử dụng

### 📱 Progressive Web App (PWA) Ready

- Có thể cài đặt như app native
- Hoạt động offline (planned)
- Push notifications cho việc nhắc nhở học tập (planned)

## 🔮 Roadmap

### Version 1.1 (Đang phát triển)

- [ ] Tích hợp speech recognition cho luyện nói
- [ ] Thêm nhiều game học tập
- [ ] Hệ thống badge và achievements
- [ ] Export tiến độ học tập

### Version 1.2 (Kế hoạch)

- [ ] Tích hợp AI chatbot để luyện hội thoại
- [ ] Hệ thống flashcard tùy chỉnh
- [ ] Chia sẻ tiến độ lên social media
- [ ] Chế độ học nhóm

### Version 2.0 (Tương lai)

- [ ] Backend API với database
- [ ] Đăng ký/đăng nhập user
- [ ] Đồng bộ dữ liệu cross-platform
- [ ] Premium features

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Hãy:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Dự án này sử dụng MIT License. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 📞 Liên hệ

- **Author**: DatJ Pro
- **Email**: [todat2207@gmail.com]
- **GitHub**: [@datjpro](https://github.com/datjpro)

---

⭐ **Nếu dự án này hữu ích, đừng quên cho chúng tôi một star!** ⭐
