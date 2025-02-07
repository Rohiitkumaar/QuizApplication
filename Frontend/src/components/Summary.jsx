import React from "react";

const Summary = ({ score, totalQuestions }) => {
  const percentage = (score / totalQuestions) * 100;

  let performanceMessage = "";
  if (percentage <= 30) {
    performanceMessage = "😟 You can do better! Keep practicing!";
  } else if (percentage > 30 && percentage <= 50) {
    performanceMessage = "🙂 Not bad! A little more effort and you'll improve!";
  } else if (percentage > 50 && percentage <= 70) {
    performanceMessage = "😃 Good job! You're getting there!";
  } else if (percentage > 70 && percentage <= 90) {
    performanceMessage = "🎉 Great work! You're almost perfect!";
  } else {
    performanceMessage = "🌟 I knew you were great! Perfect score!";
  }

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
          <span className="font-bold text-blue-500">
            {percentage.toFixed(2)}%
          </span>
        </p>
        <p className="text-lg font-semibold text-gray-700 mb-6">
          {performanceMessage}
        </p>
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-800 transition duration-300 shadow-lg"
        >
          🔁 Try Again
        </button>
      </div>
    </div>
  );
};

export default Summary;
