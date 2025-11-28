// Questions/QuizQuestionsTab.tsx
import { useEffect, useState } from "react";
import { Button, Container, Alert } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router";
import * as quizzesClient from "../client";
import * as questionsClient from "./client";
import { type Question, createDefaultQuestion } from "./types";
import QuestionItem from "./QuestionItem";

export default function QuizQuestionsTab({
  onUpdate,
}: {
  onUpdate: () => void;
}) {
  const { qid } = useParams();
  // An array of Question objects, representing all questions for the current quiz.
  const [questions, setQuestions] = useState<Question[]>([]);
  // loading: A boolean indicating if questions are currently being fetched.
  const [loading, setLoading] = useState(true);
  // A string to store any error messages during API calls.
  const [error, setError] = useState<string | null>(null);

  // Fetch questions on mount
  const fetchQuestions = async () => {
    if (!qid) return;

    try {
      setLoading(true);
      const fetchedQuestions = await quizzesClient.findQuestionsForQuiz(qid);
      // Add editMode flag to all questions (default to false)
      const questionsWithEditMode = fetchedQuestions.map((q: Question) => ({
        ...q,
        editMode: false, // flag to control fetched question's display state (preview vs. editor)
      }));
      setQuestions(questionsWithEditMode);
      setError(null);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [qid]);

  // Calculate total points
  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  // Add new question
  const handleAddQuestion = () => {
    const newOrder = questions.length;
    const newQuestion = {
      ...createDefaultQuestion(qid!, newOrder),
      _id: `temp-${Date.now()}`, // Temporary ID for tracking
      isNew: true, // Mark as a new question
    };
    setQuestions([...questions, newQuestion]);
  };

  // Toggle edit mode for a question, switching it between preview and editor views.
  const handleToggleEdit = (questionId: string | undefined) => {
    setQuestions(
      questions.map((q) =>
        // Also handles the case for newly added questions that don't have a backend _id (undefined) yet.
        q._id === questionId || (q.isNew && !q._id && questionId === undefined)
          ? { ...q, editMode: !q.editMode }
          : q
      )
    );
  };

  // Save question (create or update)
  const handleSaveQuestion = async (question: Question) => {
    try {
      let savedQuestion: Question;

      // Save new question
      if (question.isNew) {
        // object destructuring: extract specific properties (isNew, editMode,
        // _id) from the question object. The ...questionData syntax
        // (known as the rest operator) collects the remaining properties
        // of the question object into a new object
        const { isNew, editMode, _id, ...questionData } = question;
        savedQuestion = await quizzesClient.createQuestion(qid!, questionData);
      } else {
        // Update existing question
        const { editMode, isNew, ...questionData } = question;
        console.log("Updating question:", question._id, questionData);
        savedQuestion = await questionsClient.updateQuestion(
          question._id!,
          questionData
        );
      }

      // Update local state
      setQuestions(
        questions.map((q) => {
          // For new questions, match by the temporary ID
          // For existing questions, match by _id
          if (q._id === question._id) {
            return { ...savedQuestion, editMode: false };
          }
          return q;
        })
      );

      // Update parent quiz to reflect new question count
      onUpdate();
    } catch (err: any) {
      console.error("Error saving question:", err);
      console.error("Error response:", err.response?.data);
      setError(
        `Failed to save question: ${err.response?.data?.message || err.message || "Unknown error"}`
      );
    }
  };

  // Cancel editing
  const handleCancelEdit = (question: Question) => {
    if (question.isNew) {
      // Remove new unsaved question
      setQuestions(questions.filter((q) => q._id !== question._id));
    } else {
      // Just toggle edit mode off for existing question
      handleToggleEdit(question._id);
    }
  };

  // Delete question
  const handleDeleteQuestion = async (questionId: string) => {
    try {
      await questionsClient.deleteQuestion(questionId);
      setQuestions(questions.filter((q) => q._id !== questionId));
      onUpdate();
    } catch (err) {
      console.error("Error deleting question:", err);
      setError("Failed to delete question");
    }
  };

  // Update question in local state as the user types or makes changes in the editor
  const handleUpdateQuestion = (updatedQuestion: Question) => {
    setQuestions(
      questions.map((q) =>
        q._id === updatedQuestion._id ? updatedQuestion : q
      )
    );
  };

  if (loading) {
    return (
      <Container className="mt-3 text-center">
        <p>Loading questions...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-3">
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* total points */}
      <div className="text-end mb-3">
        <strong>Total Points: {totalPoints}</strong>
      </div>

      {/* Questions list */}
      {questions.length === 0 ? (
        <Alert variant="info">
          No questions yet. Click "New Question" to add question.
        </Alert>
      ) : (
        <div className="questions-list">
          {questions
            .sort((a, b) => a.order - b.order)
            .map((question, index) => (
              <QuestionItem
                key={question._id}
                question={question}
                questionNumber={index + 1}
                onToggleEdit={() => handleToggleEdit(question._id)}
                onSave={handleSaveQuestion}
                onCancel={handleCancelEdit}
                onDelete={handleDeleteQuestion}
                onUpdate={handleUpdateQuestion}
              />
            ))}
        </div>
      )}

      {/* add button */}
      <div className="text-center mt-4">
        <Button
          variant="danger"
          onClick={handleAddQuestion}
          disabled={questions.some((q) => q.isNew)}
        >
          <FaPlus className="me-2" />
          New Question
        </Button>
      </div>
    </Container>
  );
}
