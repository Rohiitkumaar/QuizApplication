import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-blue-200 to-purple-300 px-6">
      <div className="text-center w-full max-w-2xl space-y-6">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 animate-pulse">
          Welcome to the Ultimate Quiz! 🎉
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 font-medium italic">
          Your moment of glory awaits! Take the quiz and prove your brilliance!
        </p>
        <button
          onClick={() => navigate("/quiz")}
          className="bg-purple-600 text-white px-6 py-3 md:px-10 md:py-4 rounded-xl text-lg md:text-2xl font-semibold shadow-md hover:bg-purple-700 transition-all transform hover:scale-105 hover:shadow-xl duration-300"
        >
          🚀 Start Quiz
        </button>
      </div>
    </div>
  );
};

export default StartPage;
