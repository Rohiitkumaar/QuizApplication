
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 via-blue-200 to-purple-300 px-4">
      <div className="text-center max-w-[90%] md:max-w-2xl">
        <h1 className="text-2xl md:text-4xl sm:text-center font-extrabold text-gray-900 mb-4 animate-pulse">
          Welcome to the Ultimate Quiz!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 italic font-medium">
          Your moment of glory awaits! Take the quiz and prove your brilliance!
        </p>
        <button
          onClick={startQuiz}
          className="bg-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl text-lg md:text-xl font-bold shadow-lg hover:bg-purple-800 transition-transform transform hover:scale-110 duration-300"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default StartPage;
