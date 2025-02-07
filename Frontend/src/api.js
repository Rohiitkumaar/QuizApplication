import axios from "axios";

const API_URL = "https://quizapplication-xfud.onrender.com/api/quiz"; 
const fetchQuizData = async () => {
  try {
    const response = await axios.get(API_URL);
    let questions = response.data.map((q) => ({
      // id: q.id, 
      description: q.description, 
      options: q.options.map((opt) => ({
        id: opt.id, 
        description: opt.description,
        isCorrect: opt.is_correct,
      })),
    }));

    // questions = shuffleArray(questions)

    return questions;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return [];
  }
};
// For random questions logic

// const shuffleArray = (array) => {
//   let shuffled = [...array];

//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   }
//   return shuffled;
//   };

export default fetchQuizData;
