import React from "react";
import { useNavigate } from "react-router-dom";

const Summary = ({ score, totalQuestions }) => {
  const navigate = useNavigate();
  const percentage = ((score / totalQuestions) * 100).toFixed(2);

  // Determine performance message based on percentage
  const getPerformanceMessage = (percentage) => {
    if (percentage <= 30) return "😟 You can do better! Keep practicing!";
    if (percentage <= 50)
      return "🙂 Not bad! A little more effort and you'll improve!";
    if (percentage <= 70) return "😃 Good job! You're getting there!";
    if (percentage <= 90) return "🎉 Great work! You're almost perfect!";
    return "🌟 I knew you were great! Perfect score!";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-[80%] max-w-xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🎉 Quiz Completed!
        </h2>

        <p className="text-xl mb-4">
          Your Score: <span className="font-bold text-green-500">{score}</span>{" "}
          / {totalQuestions}
        </p>

        <p className="text-xl mb-6">
          Percentage:{" "}
          <span className="font-bold text-blue-500">{percentage}%</span>
        </p>

        <p className="text-lg font-semibold text-gray-700 mb-6">
          {getPerformanceMessage(percentage)}
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-800 transition duration-300 shadow-lg"
        >
          🔁 Try Again
        </button>
      </div>
    </div>
  );
};

export default Summary;
