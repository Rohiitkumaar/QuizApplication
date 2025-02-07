import { useState, useEffect } from "react";
import fetchQuizData from "../api";
import Loader from "./Loader";
import Summary from "./Summary";

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);


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

  const handleOptionClick = (option) => {
    setSelectedOption(option.id);
    const isCorrect = option.isCorrect;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setCorrectAnswer(isCorrect);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setCorrectAnswer(null);
        setSelectedOption(null);
      } else {
        setQuizCompleted(true)
      }
    }, 2000);
  };

  if (loading)
    return (
     <Loader/>
    );
  if (questions.length === 0)
    return (
      <div className="text-center text-3xl mt-20 text-gray-700">
        No questions available.
      </div>
    );
  
  if (quizCompleted) {
    if (quizCompleted) {
      return (
        <Summary
          score={score}
          totalQuestions={questions.length}
        />
      );
    }
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex ) / questions.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="fixed top-0 left-0 w-full bg-gray-200 h-3 shadow-inner z-50">
        <div
          className="bg-blue-600 h-3 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="absolute top-6 right-6 bg-white text-gray-800 px-6 py-3 rounded-full shadow-lg text-lg font-semibold">
        Score: {score}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[80%] max-w-xl mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {currentQuestion.description}
        </h2>

        <div className="flex flex-col space-y-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              className={`py-3 px-5 rounded-lg transition-all duration-300 shadow-lg text-lg font-medium ${
                selectedOption === option.id
                  ? correctAnswer
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-700"
              } ${selectedOption === null ? "hover:shadow-xl" : ""}`}
              onClick={() => handleOptionClick(option)}
              disabled={selectedOption !== null}
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

