import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import type { MultipleChoiceQuestion } from "./types";

interface MultipleChoiceEditorProps {
  question: MultipleChoiceQuestion;
  onChange: (question: MultipleChoiceQuestion) => void;
  error?: string;
}

export default function MultipleChoiceEditor({
  question,
  onChange,
  error
}: MultipleChoiceEditorProps) {
  
  // Add a new choice
  const handleAddChoice = () => {
    const newChoices = [
      ...question.choices,
      { text: `Choice ${question.choices.length + 1}`, isCorrect: false }
    ];
    onChange({ ...question, choices: newChoices });
  };

  // Remove a choice
  const handleRemoveChoice = (index: number) => {
    const newChoices = question.choices.filter((_, i) => i !== index);
    // If we removed the correct answer, make the first one correct
    if (question.choices[index].isCorrect && newChoices.length > 0) {
      newChoices[0].isCorrect = true;
    }
    onChange({ ...question, choices: newChoices });
  };

  // Update choice text
  const handleChoiceTextChange = (index: number, text: string) => {
    const newChoices = question.choices.map((choice, i) => 
      i === index ? { ...choice, text } : choice
    );
    onChange({ ...question, choices: newChoices });
  };

  // Update correct answer
  const handleCorrectAnswerChange = (index: number) => {
    const newChoices = question.choices.map((choice, i) => ({
      ...choice,
      isCorrect: i === index
    }));
    onChange({ ...question, choices: newChoices });
  };

  return (
    <div>
      <Form.Group>
        <Form.Label className="fw-bold mb-3">
          Answer Choices
          {error && <span className="text-danger ms-2 fw-normal small">{error}</span>}
        </Form.Label>
        
        {question.choices.map((choice, index) => (
          <Row key={index} className="mb-2 align-items-center">
            <Col xs="auto">
              <Form.Check
                type="radio"
                name={`correct-answer-${question._id || 'new'}`}
                checked={choice.isCorrect}
                onChange={() => handleCorrectAnswerChange(index)}
                label={String.fromCharCode(65 + index)}
                title="Select as correct answer"
              />
            </Col>
            <Col>
              <InputGroup>
                <Form.Control
                  type="text"
                  value={choice.text}
                  onChange={(e) => handleChoiceTextChange(index, e.target.value)}
                  placeholder={`Enter choice ${String.fromCharCode(65 + index)}`}
                  className={choice.isCorrect ? "border-success" : ""}
                />
                <Button
                  variant="outline-danger"
                  onClick={() => handleRemoveChoice(index)}
                  disabled={question.choices.length <= 2}
                  title="Remove choice"
                >
                  <FaTrash />
                </Button>
              </InputGroup>
            </Col>
          </Row>
        ))}
        
        <Button
          variant="outline-primary"
          size="sm"
          onClick={handleAddChoice}
          className="mt-2"
        >
          <FaPlus className="me-2" />
          Add Choice
        </Button>
        
        <Form.Text className="d-block mt-2 text-muted">
          Select the radio button next to the correct answer. Minimum 2 choices required.
        </Form.Text>
      </Form.Group>
    </div>
  );
}