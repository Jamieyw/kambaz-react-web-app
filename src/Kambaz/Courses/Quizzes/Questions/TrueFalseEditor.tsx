import { Form, Row, Col } from "react-bootstrap";
import type { TrueFalseQuestion } from "./types";

interface TrueFalseEditorProps {
  question: TrueFalseQuestion;
  onChange: (question: TrueFalseQuestion) => void;
}

export default function TrueFalseEditor({
  question,
  onChange
}: TrueFalseEditorProps) {
  
  const handleAnswerChange = (value: boolean) => {
    onChange({ ...question, correctAnswer: value });
  };

  return (
    <div>
      <Form.Group>
        <Form.Label className="fw-bold mb-3">Correct Answer</Form.Label>
        
        <Row>
          <Col sm={6}>
            <Form.Check
              type="radio"
              id={`true-${question._id || 'new'}`}
              name={`tf-answer-${question._id || 'new'}`}
              label={
                <span className={question.correctAnswer === true ? "text-success fw-bold" : ""}>
                  True
                </span>
              }
              checked={question.correctAnswer === true}
              onChange={() => handleAnswerChange(true)}
            />
          </Col>
          <Col sm={6}>
            <Form.Check
              type="radio"
              id={`false-${question._id || 'new'}`}
              name={`tf-answer-${question._id || 'new'}`}
              label={
                <span className={question.correctAnswer === false ? "text-success fw-bold" : ""}>
                  False
                </span>
              }
              checked={question.correctAnswer === false}
              onChange={() => handleAnswerChange(false)}
            />
          </Col>
        </Row>
        
        <Form.Text className="d-block mt-2 text-muted">
          Select whether the statement in the question is true or false.
        </Form.Text>
      </Form.Group>
    </div>
  );
}