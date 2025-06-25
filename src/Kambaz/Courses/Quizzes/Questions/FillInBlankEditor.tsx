import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import type { FillInBlankQuestion } from "./types";

interface FillInBlankEditorProps {
  question: FillInBlankQuestion;
  // Callback to update the parent (QuestionEditor) with changes.
  onChange: (question: FillInBlankQuestion) => void;
  error?: string;
}

export default function FillInBlankEditor({
  question,
  onChange,
  error
}: FillInBlankEditorProps) {
  
  // Add a new blank answer
  const handleAddBlank = () => {
    const newBlanks = [
      ...question.blanks,
      { text: '', caseSensitive: false }
    ];
    onChange({ ...question, blanks: newBlanks });
  };

  // Remove a blank answer
  const handleRemoveBlank = (index: number) => {
    const newBlanks = question.blanks.filter((_, i) => i !== index);
    onChange({ ...question, blanks: newBlanks });
  };

  // Update blank text
  const handleBlankTextChange = (index: number, text: string) => {
    const newBlanks = question.blanks.map((blank, i) => 
      i === index ? { ...blank, text } : blank
    );
    onChange({ ...question, blanks: newBlanks });
  };

  // Toggle case sensitivity
  const handleCaseSensitiveChange = (index: number, caseSensitive: boolean) => {
    const newBlanks = question.blanks.map((blank, i) => 
      i === index ? { ...blank, caseSensitive } : blank
    );
    onChange({ ...question, blanks: newBlanks });
  };

  return (
    <div>
      <Form.Group>
        <Form.Label className="fw-bold mb-2">
          Acceptable Answers
          {error && <span className="text-danger ms-2 fw-normal small">{error}</span>}
        </Form.Label>
        
        <Form.Text className="d-block mb-3 text-muted">
          Add all possible correct answers for the blank. Students' answers will be compared against these.
        </Form.Text>
        
        {question.blanks.map((blank, index) => (
          <div key={index} className="mb-3 p-3 border rounded bg-white">
            <Row className="align-items-center">
              <Col>
                <InputGroup>
                  <InputGroup.Text>Possible Answer {index + 1}</InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={blank.text}
                    onChange={(e) => handleBlankTextChange(index, e.target.value)}
                    placeholder="Enter acceptable answer"
                  />
                  <Button
                    variant="outline-danger"
                    onClick={() => handleRemoveBlank(index)}
                    disabled={question.blanks.length <= 1}
                    title="Remove answer"
                  >
                    <FaTrash />
                  </Button>
                </InputGroup>
              </Col>
            </Row>
            
            <Row className="mt-2">
              <Col>
                <Form.Check
                  type="checkbox"
                  id={`case-sensitive-${question._id || 'new'}-${index}`}
                  label="Case sensitive"
                  checked={blank.caseSensitive}
                  onChange={(e) => handleCaseSensitiveChange(index, e.target.checked)}
                />
              </Col>
            </Row>
          </div>
        ))}
        
        <Button
          variant="outline-primary"
          size="sm"
          onClick={handleAddBlank}
          className="mt-2"
        >
          <FaPlus className="me-2" />
          Add Another Answer
        </Button>
      </Form.Group>
    </div>
  );
}