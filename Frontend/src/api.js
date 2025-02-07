import axios from "axios";

const API_URL = "https://quizapplication-xfud.onrender.com/api/quiz";

/**
 * Fetches quiz data from the API.
 * @returns {Promise<Array>} List of quiz questions or an empty array if an error occurs.
 */
const fetchQuizData = async () => {
  try {
    const response = await axios.get(API_URL);
    let questions = response.data.map((q) => ({
      description: q.description,
      options: q.options.map((opt) => ({
        id: opt.id,
        description: opt.description,
        isCorrect: opt.is_correct,
      })),
    }));

    // Enable shuffling if needed
    // questions = shuffleArray(questions);
    return questions;
  } catch (error) {
    console.error("Failed to fetch quiz data:", error.message);
    return [];
  }
};

/**
 * Shuffles an array using the Fisher-Yates algorithm.
//  * @param {Array} array - The array to shuffle.
//  * @returns {Array} - A new shuffled array.
//  */
// const shuffleArray = (array) => {
//   const shuffled = [...array];
//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   }
//   return shuffled;
// };

export default fetchQuizData;
