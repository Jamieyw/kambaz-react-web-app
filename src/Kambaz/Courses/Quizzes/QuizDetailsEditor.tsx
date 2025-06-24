import { Navigate, Route, Routes } from "react-router";
import QuizDetailsTab from "./QuizDetailsTab";
import QuizQuestionsTab from "./Questions/QuizQuestionsTab";
import QuizTabNavigation from "./QuizTabNavigation";

export default function QuizDetailsEditor() {
  return (
    <div id="wd-quiz-details-editor">
      <h1>Quiz Details Editor</h1><br/>

      <QuizTabNavigation /><br />

      {/* Tab Content - Rendered based on route */}
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="quiz-details-editor-screen" />} />
          <Route path="quiz-details-editor-screen" element={<QuizDetailsTab />} />
          <Route path="quiz-questions-screen" element={<QuizQuestionsTab />} />
        </Routes>
      </div>
    </div>
  );
}