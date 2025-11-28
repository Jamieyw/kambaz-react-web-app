import { Card, Button, Badge } from "react-bootstrap";
import { FaPencil, FaTrash } from "react-icons/fa6";
import type { Question, MultipleChoiceQuestion, TrueFalseQuestion, FillInBlankQuestion } from "./types";
import QuestionEditor from "./QuestionEditor";

interface QuestionItemProps {
  question: Question;
  questionNumber: number;
  onToggleEdit: () => void;
  onSave: (question: Question) => void;
  onCancel: (question: Question) => void;
  onDelete: (questionId: string) => void;
  onUpdate: (question: Question) => void;
}

export default function QuestionItem({
  question,
  questionNumber,
  onToggleEdit,
  onSave,
  onCancel,
  onDelete,
  onUpdate
}: QuestionItemProps) {
  
  // Render question preview based on type
  const renderQuestionPreview = () => {
    switch (question.type) {
      case 'multiple-choice':
        const mcQuestion = question as MultipleChoiceQuestion;
        return (
          <div>
            <div 
              className="mb-2" 
              dangerouslySetInnerHTML={{ __html: question.question || '<em>No question content</em>' }}
            />
            <div className="ms-3">
              {mcQuestion.choices.map((choice, index) => (
                <div key={index} className="mb-1">
                  <span className={choice.isCorrect ? "text-success fw-bold" : ""}>
                    {String.fromCharCode(65 + index)}. {choice.text}
                    {choice.isCorrect && " ✓"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'true-false':
        const tfQuestion = question as TrueFalseQuestion;
        return (
          <div>
            <div 
              className="mb-2" 
              dangerouslySetInnerHTML={{ __html: question.question || '<em>No question content</em>' }}
            />
            <div className="ms-3">
              <span className="text-success fw-bold">
                Correct Answer: {tfQuestion.correctAnswer ? "True" : "False"}
              </span>
            </div>
          </div>
        );
      
      case 'fill-blank':
        const fbQuestion = question as FillInBlankQuestion;
        return (
          <div>
            <div 
              className="mb-2" 
              dangerouslySetInnerHTML={{ __html: question.question || '<em>No question content</em>' }}
            />
            <div className="ms-3">
              <div className="text-muted">Acceptable answers:</div>
              {fbQuestion.blanks.map((blank, index) => (
                <div key={index} className="ms-2">
                  • {blank.text} {blank.caseSensitive && "(case sensitive)"}
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  // Get question type label
  const getTypeLabel = () => {
    switch (question.type) {
      case 'multiple-choice': return 'Multiple Choice';
      case 'true-false': return 'True/False';
      case 'fill-blank': return 'Fill in the Blank';
    }
  };

  // If in edit mode, show editor
  if (question.editMode) {
    return (
      <QuestionEditor
        question={question}
        onSave={onSave}
        onCancel={() => onCancel(question)}
        onChange={onUpdate}
      />
    );
  }

  // Preview mode
  return (
    <Card className="mb-3">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <span className="fw-bold me-3">Question {questionNumber}</span>
          <Badge bg="warning" className="me-2">{getTypeLabel()}</Badge>
          <Badge bg="info">{question.points} pts</Badge>
        </div>
        
        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={onToggleEdit}
          >
            <FaPencil className="me-1" />
            Edit
          </Button>
          {question._id && (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this question?')) {
                  onDelete(question._id!);
                }
              }}
            >
              <FaTrash />
            </Button>
          )}
        </div>
      </Card.Header>
      
      <Card.Body>
        {renderQuestionPreview()}
      </Card.Body>
    </Card>
  );
}