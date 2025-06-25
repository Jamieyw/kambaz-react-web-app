import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import type { Question, MultipleChoiceQuestion, TrueFalseQuestion, FillInBlankQuestion } from "./types";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillInBlankEditor from "./FillInBlankEditor";

interface QuestionEditorProps {
  // The Question object being edited.
  question: Question;
  // Callback to save the question.
  onSave: (question: Question) => void;
  // Callback to cancel editing.
  onCancel: () => void;
  // Callback to update the parent's (QuizQuestionsTab) state with local changes as they happen.
  onChange: (question: Question) => void;
}

export default function QuestionEditor({
  question,
  onSave,
  onCancel,
  onChange
}: QuestionEditorProps) {
  const [localQuestion, setLocalQuestion] = useState<Question>(question);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle field changes
  const handleFieldChange = (field: keyof Question, value: any) => {
    const updated = { ...localQuestion, [field]: value } as Question;
    setLocalQuestion(updated);
    onChange(updated);
    
    // Clear error for this field
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  // Handle question type change
  const handleTypeChange = (newType: Question['type']) => {
    let newQuestion: Question;
    
    // Preserve common fields
    const baseFields = {
      _id: localQuestion._id,
      quizId: localQuestion.quizId,
      points: localQuestion.points,
      question: localQuestion.question,
      order: localQuestion.order,
      isNew: localQuestion.isNew,
      editMode: localQuestion.editMode
    };

    // Create new question with type-specific defaults
    switch (newType) {
      case 'multiple-choice':
        newQuestion = {
          ...baseFields,
          type: 'multiple-choice',
          choices: [
            { text: 'Choice 1', isCorrect: true },
            { text: 'Choice 2', isCorrect: false },
            { text: 'Choice 3', isCorrect: false }
          ]
        } as MultipleChoiceQuestion;
        break;
      
      case 'true-false':
        newQuestion = {
          ...baseFields,
          type: 'true-false',
          correctAnswer: true
        } as TrueFalseQuestion;
        break;
      
      case 'fill-blank':
        newQuestion = {
          ...baseFields,
          type: 'fill-blank',
          blanks: [
            { text: '', caseSensitive: false }
          ]
        } as FillInBlankQuestion;
        break;
    }

    setLocalQuestion(newQuestion);
    onChange(newQuestion);
  };

  // Validate question before saving
  const validateQuestion = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (localQuestion.points < 0) {
      newErrors.points = 'Points must be 0 or greater';
    }

    if (!localQuestion.question.trim()) {
      newErrors.question = 'Question content is required';
    }

    // Type-specific validation
    switch (localQuestion.type) {
      case 'multiple-choice':
        const mcQuestion = localQuestion as MultipleChoiceQuestion;
        if (mcQuestion.choices.length < 2) {
          newErrors.choices = 'At least 2 choices are required';
        }
        if (!mcQuestion.choices.some(c => c.isCorrect)) {
          newErrors.choices = 'At least one correct answer is required';
        }
        if (mcQuestion.choices.some(c => !c.text.trim())) {
          newErrors.choices = 'All choices must have text';
        }
        break;
      
      case 'fill-blank':
        const fbQuestion = localQuestion as FillInBlankQuestion;
        if (fbQuestion.blanks.length === 0) {
          newErrors.blanks = 'At least one answer is required';
        }
        if (fbQuestion.blanks.some(b => !b.text.trim())) {
          newErrors.blanks = 'All answers must have text';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save
  const handleSave = () => {
    if (validateQuestion()) {
      onSave(localQuestion);
    }
  };

  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <Container className="border rounded p-4 mb-3 bg-light">
      <Form>
        {/* Question Type Dropdown */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Question Type
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              value={localQuestion.type}
              onChange={(e) => handleTypeChange(e.target.value as Question['type'])}
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="true-false">True/False</option>
              <option value="fill-blank">Fill in the Blank</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Points */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Points
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              value={localQuestion.points}
              onChange={(e) => {
                  // Allow empty string or numbers.
                  // If the value is an empty string, set it to an empty string.
                  // Otherwise, parse it as an integer, defaulting to 0 if NaN.
                  const value = e.target.value;
                  handleFieldChange('points', value === '' ? '' : parseInt(value) || 0);
                }}
              isInvalid={!!errors.points}
              min="0"
            />
            <Form.Control.Feedback type="invalid">
              {errors.points}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Question Content */}
        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm={2}>
            Question
          </Form.Label>
          <Col sm={10}>
            <ReactQuill
              theme="snow"
              value={localQuestion.question}
              onChange={(value) => handleFieldChange('question', value)}
              modules={modules}
              placeholder="Enter question"
              style={{ backgroundColor: "white", minHeight: "150px" }}
            />
            {errors.question && (
              <div className="text-danger small mt-1">{errors.question}</div>
            )}
          </Col>
        </Form.Group>

        Type-specific editor
        <div className="border-top pt-3">
          {localQuestion.type === 'multiple-choice' && (
            <MultipleChoiceEditor
              question={localQuestion as MultipleChoiceQuestion}
              onChange={(updated) => {
                setLocalQuestion(updated);
                onChange(updated);
              }}
              error={errors.choices}
            />
          )}
          
          {localQuestion.type === 'true-false' && (
            <TrueFalseEditor
              question={localQuestion as TrueFalseQuestion}
              onChange={(updated) => {
                setLocalQuestion(updated);
                onChange(updated);
              }}
            />
          )}
          
          {localQuestion.type === 'fill-blank' && (
            <FillInBlankEditor
              question={localQuestion as FillInBlankQuestion}
              onChange={(updated) => {
                setLocalQuestion(updated);
                onChange(updated);
              }}
              error={errors.blanks}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end mt-4 gap-2">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {localQuestion.isNew ? 'Save Question' : 'Update Question'}
          </Button>
        </div>
      </Form>
    </Container>
  );
}