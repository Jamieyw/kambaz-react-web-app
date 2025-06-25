import { Navigate, Route, Routes } from "react-router";
import QuizDetailsTab from "./QuizDetailsTab";
import QuizQuestionsTab from "./Questions/QuizQuestionsTab";
import QuizTabNavigation from "./QuizTabNavigation";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import * as quizzesClient from "./client";

export default function QuizDetailsEditor() {
  const { qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);

  const fetchQuiz = async () => {
    try {
      const quizData = await quizzesClient.findQuizById(qid!);
      setQuiz(quizData);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };
  useEffect(() => {
    fetchQuiz();
  }, [qid]);
  
  return (
    <div id="wd-quiz-details-editor">
      <h1>Quiz Details Editor</h1><br/>

    {quiz && (
      <div className="text-end">
        Quiz Points: {quiz.points || 0}
      </div>
    )}

      <QuizTabNavigation /><br />

      {/* Tab Content - Rendered based on route */}
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="quiz-details-editor-screen" />} />
          <Route path="quiz-details-editor-screen" element={<QuizDetailsTab quiz={quiz} onUpdate={fetchQuiz} />} />
          <Route path="quiz-questions-screen" element={<QuizQuestionsTab onUpdate={fetchQuiz} />} />
        </Routes>
      </div>
    </div>
  );
}