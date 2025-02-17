import { useState, useEffect } from "react";
import fetchQuizData from "../api";
import Loader from "./Loader";
import Summary from "./Summary";

const QuizComponent = () => {
  // State management
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Fetch quiz questions on component mount
  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await fetchQuizData();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    };
    getQuestions();
  }, []);

  /**
   * Handles option selection
   * - Updates selected option
   * - Increments score if correct
   * - Moves to the next question after a delay
   */
  const handleOptionClick = (option) => {
    setSelectedOption(option.id);
    const isCorrect = option.isCorrect;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setCorrectAnswer(isCorrect);

    setTimeout(() => {
      moveToNextQuestion();
    }, 2000);
  };

  /**
   * Moves to the next question
   * - Resets selected option & correct answer
   * - Marks quiz as completed if last question is reached
   */
  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setCorrectAnswer(null);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  // Show loader while fetching data
  if (loading) return <Loader />;

  // Handle empty questions array
  if (questions.length === 0) {
    return (
      <div className="text-center text-3xl mt-20 text-gray-700">
        No questions available.
      </div>
    );
  }

  // Show quiz summary when completed
  if (quizCompleted) {
    return <Summary score={score} totalQuestions={questions.length} />;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100; // Fixed progress calculation

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-500 px-4">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full bg-gray-200 h-3 shadow-inner z-50">
        <div
          className="bg-blue-600 h-3 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Score Display */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white text-gray-800 px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg text-sm md:text-lg font-semibold">
        Score: {score}
      </div>

      {/* Quiz Question & Options */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-xl mt-8">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
          {currentQuestion.description}
        </h2>

        <div className="flex flex-col space-y-3 md:space-y-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              className={`py-2 px-4 md:py-3 md:px-5 rounded-lg transition-all duration-300 shadow-lg text-base md:text-lg font-medium ${
                selectedOption === option.id
                  ? correctAnswer
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-700"
              } ${selectedOption === null ? "hover:shadow-xl" : ""}`}
              onClick={() => handleOptionClick(option)}
              disabled={selectedOption !== null} // Disable selection after choosing an option
            >
              {option.description}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
