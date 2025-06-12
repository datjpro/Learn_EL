import React, { useState, useEffect } from "react";
import { Shuffle, Timer, Trophy, Target, RotateCcw } from "lucide-react";
import { sampleWords } from "../data/vocabulary";
import { Word } from "../types";
import { useProgress } from "../hooks/useProgress";
import { shuffleArray, getRandomItems, formatTime } from "../utils/helpers";

type GameType = "word-match" | "typing-race" | "memory-cards" | null;

const Games: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<GameType>(null);
  const [gameWords, setGameWords] = useState<Word[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const { addPoints } = useProgress();

  // Word Match Game State
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);

  // Typing Race Game State
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [userInput, setUserInput] = useState("");
  const [wordsCompleted, setWordsCompleted] = useState(0);

  // Memory Cards Game State
  const [cards, setCards] = useState<
    {
      id: string;
      word: string;
      translation: string;
      flipped: boolean;
      matched: boolean;
    }[]
  >([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameActive) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameActive]);

  const startGame = (gameType: GameType) => {
    setSelectedGame(gameType);
    setScore(0);
    setTimeLeft(60);
    setGameActive(true);
    setGameCompleted(false);

    const words = getRandomItems(sampleWords, 20);
    setGameWords(words);

    switch (gameType) {
      case "word-match":
        setupWordMatch(words);
        break;
      case "typing-race":
        setupTypingRace(words);
        break;
      case "memory-cards":
        setupMemoryCards(words);
        break;
    }
  };

  const endGame = () => {
    setGameActive(false);
    setGameCompleted(true);
    addPoints(score);
  };

  const resetGame = () => {
    setSelectedGame(null);
    setScore(0);
    setTimeLeft(60);
    setGameActive(false);
    setGameCompleted(false);
  };

  // Word Match Game Logic
  const setupWordMatch = (words: Word[]) => {
    setCurrentWordIndex(0);
    generateOptions(words[0], words);
  };

  const generateOptions = (correctWord: Word, allWords: Word[]) => {
    const incorrectOptions = getRandomItems(
      allWords.filter((w) => w.id !== correctWord.id),
      3
    ).map((w) => w.vietnamese);

    const allOptions = shuffleArray([
      correctWord.vietnamese,
      ...incorrectOptions,
    ]);
    setOptions(allOptions);
  };

  const handleWordMatchAnswer = (option: string) => {
    setSelectedOption(option);
    setShowResult(true);

    const isCorrect = option === gameWords[currentWordIndex].vietnamese;
    if (isCorrect) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (currentWordIndex < gameWords.length - 1) {
        const nextIndex = currentWordIndex + 1;
        setCurrentWordIndex(nextIndex);
        generateOptions(gameWords[nextIndex], gameWords);
        setSelectedOption("");
        setShowResult(false);
      } else {
        endGame();
      }
    }, 1500);
  };

  // Typing Race Game Logic
  const setupTypingRace = (words: Word[]) => {
    setCurrentWord(words[0]);
    setUserInput("");
    setWordsCompleted(0);
  };

  const handleTypingInput = (value: string) => {
    setUserInput(value);

    if (value.toLowerCase().trim() === currentWord?.english.toLowerCase()) {
      setScore(score + 15);
      setWordsCompleted(wordsCompleted + 1);

      const nextWordIndex = wordsCompleted + 1;
      if (nextWordIndex < gameWords.length) {
        setCurrentWord(gameWords[nextWordIndex]);
        setUserInput("");
      } else {
        endGame();
      }
    }
  };

  // Memory Cards Game Logic
  const setupMemoryCards = (words: Word[]) => {
    const selectedWords = words.slice(0, 6);
    const cardPairs = selectedWords.flatMap((word) => [
      {
        id: `${word.id}-en`,
        word: word.english,
        translation: word.vietnamese,
        flipped: false,
        matched: false,
      },
      {
        id: `${word.id}-vi`,
        word: word.vietnamese,
        translation: word.english,
        flipped: false,
        matched: false,
      },
    ]);

    setCards(shuffleArray(cardPairs));
    setFlippedCards([]);
  };

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 ||
      cards[index].flipped ||
      cards[index].matched
    )
      return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      const isMatch =
        (firstCard.word === secondCard.translation &&
          secondCard.word === firstCard.translation) ||
        (firstCard.translation === secondCard.word &&
          secondCard.translation === firstCard.word);

      setTimeout(() => {
        const updatedCards = [...newCards];

        if (isMatch) {
          updatedCards[firstIndex].matched = true;
          updatedCards[secondIndex].matched = true;
          setScore(score + 20);

          // Check if all cards are matched
          if (updatedCards.every((card) => card.matched)) {
            endGame();
          }
        } else {
          updatedCards[firstIndex].flipped = false;
          updatedCards[secondIndex].flipped = false;
        }

        setCards(updatedCards);
        setFlippedCards([]);
      }, 1000);
    }
  };

  const games = [
    {
      id: "word-match",
      title: "Ghép từ",
      description: "Chọn nghĩa tiếng Việt đúng cho từ tiếng Anh",
      icon: Target,
      color: "bg-blue-500",
    },
    {
      id: "typing-race",
      title: "Đua gõ phím",
      description: "Gõ từ tiếng Anh theo nghĩa tiếng Việt",
      icon: Timer,
      color: "bg-green-500",
    },
    {
      id: "memory-cards",
      title: "Lật thẻ ghi nhớ",
      description: "Tìm cặp từ tiếng Anh và nghĩa tiếng Việt",
      icon: Shuffle,
      color: "bg-purple-500",
    },
  ];

  if (selectedGame) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Game Header */}
        <div className="card">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {games.find((g) => g.id === selectedGame)?.title}
              </h1>
              <p className="text-gray-600">
                {games.find((g) => g.id === selectedGame)?.description}
              </p>
            </div>
            <button
              onClick={resetGame}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="flex space-x-6">
              <div className="text-center">
                <div className="text-xl font-bold text-primary-600">
                  {score}
                </div>
                <div className="text-sm text-gray-600">Điểm</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-red-600">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm text-gray-600">Thời gian</div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Content */}
        {selectedGame === "word-match" && gameWords.length > 0 && (
          <div className="card">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {gameWords[currentWordIndex]?.english}
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showResult && handleWordMatchAnswer(option)}
                    disabled={showResult}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      showResult
                        ? option === gameWords[currentWordIndex].vietnamese
                          ? "bg-green-100 border-green-500 text-green-800"
                          : option === selectedOption
                          ? "bg-red-100 border-red-500 text-red-800"
                          : "bg-gray-100 border-gray-300"
                        : "border-gray-300 hover:border-primary-500 hover:bg-primary-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedGame === "typing-race" && currentWord && (
          <div className="card">
            <div className="text-center space-y-6">
              <div>
                <p className="text-lg text-gray-600 mb-2">
                  Gõ từ tiếng Anh cho:
                </p>
                <h2 className="text-3xl font-bold text-primary-600">
                  {currentWord.vietnamese}
                </h2>
              </div>

              <input
                type="text"
                value={userInput}
                onChange={(e) => handleTypingInput(e.target.value)}
                className="input-field text-2xl text-center"
                placeholder="Nhập từ tiếng Anh..."
                autoFocus
              />

              <div className="text-sm text-gray-600">
                Đã hoàn thành: {wordsCompleted} / {gameWords.length}
              </div>
            </div>
          </div>
        )}

        {selectedGame === "memory-cards" && (
          <div className="card">
            <div className="grid grid-cols-4 gap-4">
              {cards.map((card, index) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(index)}
                  className={`h-24 rounded-lg border-2 transition-all ${
                    card.flipped || card.matched
                      ? card.matched
                        ? "bg-green-100 border-green-500 text-green-800"
                        : "bg-blue-100 border-blue-500 text-blue-800"
                      : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {card.flipped || card.matched ? card.word : "?"}
                </button>
              ))}
            </div>
          </div>
        )}

        {gameCompleted && (
          <div className="card bg-gradient-to-r from-green-50 to-blue-50 text-center">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Chúc mừng!
            </h2>
            <p className="text-gray-600 mb-4">
              Bạn đã hoàn thành trò chơi với {score} điểm
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => startGame(selectedGame)}
                className="btn-primary"
              >
                Chơi lại
              </button>
              <button onClick={resetGame} className="btn-secondary">
                Về menu
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Trò chơi học tập
        </h1>
        <p className="text-gray-600">
          Học tiếng Anh thông qua các trò chơi thú vị
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="card hover:scale-105 transform transition-all duration-300 cursor-pointer"
            onClick={() => startGame(game.id as GameType)}
          >
            <div className="text-center space-y-4">
              <div
                className={`${game.color} p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center`}
              >
                <game.icon className="h-8 w-8 text-white" />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {game.title}
                </h3>
                <p className="text-gray-600">{game.description}</p>
              </div>

              <button className="btn-primary w-full">Bắt đầu chơi</button>
            </div>
          </div>
        ))}
      </div>

      {/* Game Rules */}
      <div className="card bg-gradient-to-r from-purple-50 to-pink-50">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Cách chơi</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">Ghép từ</h4>
            <p className="text-sm text-gray-600">
              Chọn nghĩa tiếng Việt đúng cho từ tiếng Anh được hiển thị. Mỗi câu
              trả lời đúng bạn sẽ được 10 điểm.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-green-600 mb-2">Đua gõ phím</h4>
            <p className="text-sm text-gray-600">
              Nhìn nghĩa tiếng Việt và gõ từ tiếng Anh tương ứng càng nhanh càng
              tốt. Mỗi từ đúng được 15 điểm.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-purple-600 mb-2">
              Lật thẻ ghi nhớ
            </h4>
            <p className="text-sm text-gray-600">
              Lật các thẻ để tìm cặp từ tiếng Anh và nghĩa tiếng Việt. Mỗi cặp
              đúng được 20 điểm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
