import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./components/StartPAge";
import QuizComponent from "./components/QuizComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/quiz" element={<QuizComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
