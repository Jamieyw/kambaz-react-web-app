import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import * as quizzesClient from "./client";
import { updateQuiz } from "./reducer";

export default function QuizDetailsTab(
  { quiz: initialQuiz, onUpdate }: { quiz: any; onUpdate: () => void }
) {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    if (initialQuiz) {
      // Format dates for input fields
      const formattedQuiz = {
        ...initialQuiz,
        dueDate: initialQuiz.dueDate ? new Date(initialQuiz.dueDate).toISOString().split('T')[0] : "",
        availableDate: initialQuiz.availableDate ? new Date(initialQuiz.availableDate).toISOString().split('T')[0] : "",
        untilDate: initialQuiz.untilDate ? new Date(initialQuiz.untilDate).toISOString().split('T')[0] : "",
      };
      setQuiz(formattedQuiz);
    }
  }, [initialQuiz, qid]);

  const handleInputChange = (field: string, value: any) => {
    if (quiz) {
      setQuiz({ ...quiz, [field]: value });
    }
  };

  const handleSave = async () => {
    if (!quiz) return;
    try {
      const updatedQuiz = await quizzesClient.updateQuiz(quiz);
      dispatch(updateQuiz(updatedQuiz));
      onUpdate(); // Refresh parent data
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/details`);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handleSaveAndPublish = async () => {
    if (!quiz) return;
    try {
      const publishedQuiz = { ...quiz, published: true };
      const updatedQuiz = await quizzesClient.updateQuiz(publishedQuiz);
      dispatch(updateQuiz(updatedQuiz));
      onUpdate(); // Refresh parent data
      navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Error saving and publishing quiz:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  if (!quiz) {
    return (
      <div className="text-center">
        <p>Loading quiz details editor...</p>
      </div>
    );
  }

  return (
    <Container className="mt-3">
      <Form>
        {/* Title */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-end">
            Title
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              value={quiz.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Quiz Title"
            />
          </Col>
        </Form.Group>

        {/* Description */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-end">
            Description
          </Form.Label>
          <Col sm={9}>
            <ReactQuill
              theme="snow"
              value={quiz.description || ""}
              onChange={(value) => handleInputChange("description", value)}
              modules={modules}
              placeholder="Add quiz description here."
              style={{ backgroundColor: "white", minHeight: "150px" }}
            />
          </Col>
        </Form.Group>

        {/* Quiz Type */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-end">
            Quiz Type
          </Form.Label>
          <Col sm={9}>
            <Form.Select
              value={quiz.quizType || "Graded Quiz"}
              onChange={(e) => handleInputChange("quizType", e.target.value)}
            >
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Points */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-end">
            Points
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              value={quiz.points !== null && !isNaN(quiz.points) ? quiz.points : ""}
              onChange={(e) => {
                const value = e.target.value;
                const numericValue = Number(value);
                handleInputChange("points", isNaN(numericValue) ? 0 : numericValue);
              }}
              min="0"
            />
          </Col>
        </Form.Group>

        {/* Assignment Group */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-end">
            Assignment Group
          </Form.Label>
          <Col sm={9}>
            <Form.Select
              value={quiz.assignmentGroup || "Quizzes"}
              onChange={(e) =>
                handleInputChange("assignmentGroup", e.target.value)
              }
            >
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Shuffle Answers */}
        <Form.Group as={Row} className="mb-3 d-flex align-items-center">
          <Form.Label column sm={3} className="text-end">
            Shuffle Answers
          </Form.Label>
          <Col sm={9}>
            <Form.Check
              type="radio"
              label="Yes"
              name="shuffleAnswers"
              checked={quiz.shuffleAnswers === "Yes" || !quiz.shuffleAnswers}
              // onChange handler only fires when that specific radio button is clicked
              onChange={() => handleInputChange("shuffleAnswers", "Yes")}
              inline
            />
            <Form.Check
              type="radio"
              label="No"
              name="shuffleAnswers"
              checked={quiz.shuffleAnswers === "No"}
              onChange={() => handleInputChange("shuffleAnswers", "No")}
              inline
            />
          </Col>
        </Form.Group>

        {/* Time Limit */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-end">
            Time Limit
          </Form.Label>
          <Col sm={9}>
            <Row className="d-flex align-items-center">
              <Col sm={1}>
                <Form.Check type="checkbox"
                  checked={quiz.timeLimit && quiz.timeLimit > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleInputChange("timeLimit", 20);
                    } else {
                      handleInputChange("timeLimit", 0);
                    }
                  }}
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  type="number"
                  value={quiz.timeLimit}
                  onChange={(e) =>
                    handleInputChange("timeLimit", e.target.value)
                  }
                  min="0"
                />
              </Col>
              <Col sm={3}>
                <Form.Text>Minutes</Form.Text>
              </Col>
            </Row>
          </Col>
        </Form.Group>

        {/* Multiple Attempts */}
        <Form.Group as={Row} className="mb-3 d-flex align-items-center">
          <Form.Label column sm={3} className="text-end">
            Multiple Attempts
          </Form.Label>
          <Col sm={9}>
            <Form.Check
              type="radio"
              label="Yes"
              name="multipleAttempts"
              checked={quiz.multipleAttempts === "Yes"}
              onChange={() => handleInputChange("multipleAttempts", "Yes")}
              inline
            />
            <Form.Check
              type="radio"
              label="No"
              name="multipleAttempts"
              checked={quiz.multipleAttempts === "No" || !quiz.multipleAttempts}
              onChange={() => handleInputChange("multipleAttempts", "No")}
              inline
            />
          </Col>
        </Form.Group>

        {/* Show Correct Answers */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-end">
            Show Correct Answers
          </Form.Label>
          <Col sm={9}>
            <Form.Select
              value={quiz.showCorrectAnswers || "After Due Date"}
              onChange={(e) =>
                handleInputChange("showCorrectAnswers", e.target.value)
              }
            >
              <option value="Immediately">Immediately</option>
              <option value="After Due Date">After Due Date</option>
              <option value="Never">Never</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Access Code */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-end">
            Access Code
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              value={quiz.accessCode || ""}
              onChange={(e) => handleInputChange("accessCode", e.target.value)}
              placeholder="Leave blank for no access code"
            />
          </Col>
        </Form.Group>

        {/* One Question at a Time */}
        <Form.Group as={Row} className="mb-3 d-flex align-items-center">
          <Form.Label column sm={3} className="text-end">
            One Question at a Time
          </Form.Label>
          <Col sm={9}>
            <Form.Check
              type="radio"
              label="Yes"
              name="oneQuestionAtATime"
              checked={quiz.oneQuestionAtATime === "Yes" || !quiz.oneQuestionAtATime}
              onChange={() => handleInputChange("oneQuestionAtATime", "Yes")}
              inline
            />
            <Form.Check
              type="radio"
              label="No"
              name="oneQuestionAtATime"
              checked={quiz.oneQuestionAtATime === "No"}
              onChange={() => handleInputChange("oneQuestionAtATime", "No")}
              inline
            />
          </Col>
        </Form.Group>

        {/* Webcam Required */}
        <Form.Group as={Row} className="mb-3 d-flex align-items-center">
          <Form.Label column sm={3} className="text-end">
            Webcam Required
          </Form.Label>
          <Col sm={9}>
            <Form.Check
              type="radio"
              label="Yes"
              name="webcamRequired"
              checked={quiz.webcamRequired === "Yes"}
              onChange={() => handleInputChange("webcamRequired", "Yes")}
              inline
            />
            <Form.Check
              type="radio"
              label="No"
              name="webcamRequired"
              checked={quiz.webcamRequired === "No" || !quiz.webcamRequired}
              onChange={() => handleInputChange("webcamRequired", "No")}
              inline
            />
          </Col>
        </Form.Group>

        {/* Lock Questions After Answering */}
        <Form.Group as={Row} className="mb-3 d-flex align-items-center">
          <Form.Label column sm={3} className="text-end">
            Lock Questions After Answering
          </Form.Label>
          <Col sm={9}>
            <Form.Check
              type="radio"
              label="Yes"
              name="lockQuestionsAfterAnswer"
              checked={quiz.lockQuestionsAfterAnswer === "Yes"}
              onChange={() =>
                handleInputChange("lockQuestionsAfterAnswer", "Yes")
              }
              inline
            />
            <Form.Check
              type="radio"
              label="No"
              name="lockQuestionsAfterAnswer"
              checked={quiz.lockQuestionsAfterAnswer === "No" || !quiz.lockQuestionsAfterAnswer}
              onChange={() =>
                handleInputChange("lockQuestionsAfterAnswer", "No")
              }
              inline
            />
          </Col>
        </Form.Group>

        {/* Due Date */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-end">
            Due Date
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              value={quiz.dueDate || ""}
              onChange={(e) => handleInputChange("dueDate", e.target.value)}
            />
          </Col>
        </Form.Group>

        {/* Available Date */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-end">
            Available Date
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              value={quiz.availableDate || ""}
              onChange={(e) =>
                handleInputChange("availableDate", e.target.value)
              }
            />
          </Col>
        </Form.Group>

        {/* Until Date */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-end">
            Until Date
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              value={quiz.untilDate || ""}
              onChange={(e) => handleInputChange("untilDate", e.target.value)}
            />
          </Col>
        </Form.Group>
        <hr />

        {/* Action Buttons */}
        <div className="d-flex justify-content-center">
          <Button
            variant="success"
            onClick={handleSaveAndPublish}
            className="me-3"
          >
            Save and Publish
          </Button>
          <Button variant="primary" onClick={handleSave} className="me-3">
            Save
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
}
