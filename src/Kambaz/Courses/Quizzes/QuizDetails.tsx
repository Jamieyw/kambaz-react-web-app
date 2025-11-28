import { Col, Container, Row, Table } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { Link, useParams } from "react-router";
import * as quizzesClient from "./client";
import FacultyOnly from "../../FacultyOnly";
import { useEffect, useState } from "react";

export default function QuizDetails() {
  const {cid, qid} = useParams();
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);

  const fetchQuiz = async () => {
    const quiz = await quizzesClient.findQuizById(qid!);
    setCurrentQuiz(quiz);
  };
  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  if (!currentQuiz || currentQuiz._id !== qid) {
    return <div>Loading quiz details...</div>;
  }

  return (
    <div id="wd-quiz-details">
      <FacultyOnly>
        <div className="d-flex justify-content-center">
          <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`}
              className="btn btn-outline-secondary me-2">
            Preview
          </Link>
          <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`}
              className="btn btn-outline-secondary">
            <FaPencil className="me-2" />
            Edit
          </Link>
        </div>
      </FacultyOnly>

      <div className="mt-3 border border-dotted">
        <div className="ms-2 mt-2">
          <h3>{currentQuiz.title}</h3>
          <Container>
            <Row className="mb-2">
              <Col sm={5} className="text-end fw-bold fw-bold">Quiz Type</Col>
              <Col sm={7}>{currentQuiz.quizType}</Col>
            </Row>
            <Row className="mb-2">
              <Col sm={5} className="text-end fw-bold">Points</Col>
              <Col sm={7}>{currentQuiz.points}</Col>
            </Row>
            <Row className="mb-2">
              <Col sm={5} className="text-end fw-bold">Assignment Group</Col>
              <Col sm={7}>{currentQuiz.assignmentGroup}</Col>
            </Row>
            <Row className="mb-2">
              <Col sm={5} className="text-end fw-bold">Shuffle Answers</Col>
              <Col sm={7}>{currentQuiz.shuffleAnswers}</Col>
            </Row>
            <Row className="mb-2">
              <Col sm={5} className="text-end fw-bold">Time Limit</Col>
              <Col sm={7}>
                {currentQuiz.timeLimit && currentQuiz.timeLimit > 0 ? 
                  `${currentQuiz.timeLimit} Minutes` : 'No Time Limit'}
                </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={5} className="text-end fw-bold">Multiple Attempts</Col>
              <Col sm={7}>{currentQuiz.multipleAttempts}</Col>
            </Row>
            <Row className="mb-2">
              <Col sm={5} className="text-end fw-bold">View Responses</Col>
              <Col sm={7}>{currentQuiz.viewResponses}</Col>
            </Row>
            <Row className="mb-2">
              <Col sm={5} className="text-end fw-bold">Show Correct Answers</Col>
              <Col sm={7}>{currentQuiz.showCorrectAnswers}</Col>
            </Row>
            <Row className="mb-2">
              <Col sm={5} className="text-end fw-bold">One Question at a Time</Col>
              <Col sm={7}>{currentQuiz.oneQuestionAtATime}</Col>
            </Row>
            <Row className="mb-2">
              <Col sm={5} className="text-end fw-bold">Require Respondus LockDown Browser</Col>
              <Col sm={7}>{currentQuiz.requireRespondusLockDownBrowser}</Col>
            </Row>
            <Row className="mb-2">
              <Col sm={5} className="text-end fw-bold">Required to View Quiz Results</Col>
              <Col sm={7}>{currentQuiz.requiredtoViewQuizResults}</Col>
            </Row>
            <Row className="mb-2">
              <Col sm={5} className="text-end fw-bold">Webcam Required</Col>
              <Col sm={7}>{currentQuiz.webcamRequired}</Col>
            </Row>
            <Row className="mb-4">
              <Col sm={5} className="text-end fw-bold">Lock Questions After Answer</Col>
              <Col sm={7}>{currentQuiz.lockQuestionsAfterAnswer}</Col>
            </Row>
          </Container>

          <Table>
            <thead>
              <tr>
                <th>Due</th>
                <th>For</th>
                <th>Available from</th>
                <th>Until</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{new Date(currentQuiz.dueDate).toISOString().split('T')[0]}</td>
                <td>{currentQuiz.assignedTo}</td>
                <td>{new Date(currentQuiz.availableDate).toISOString().split('T')[0]}</td>
                <td>{new Date(currentQuiz.untilDate).toISOString().split('T')[0]}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}