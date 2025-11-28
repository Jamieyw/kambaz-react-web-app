import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Container, Card, Button, Form, Alert, Badge } from "react-bootstrap";
import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import * as quizzesClient from "./client";
import type { Question, MultipleChoiceQuestion, TrueFalseQuestion, FillInBlankQuestion } from "./Questions/types";

interface QuizAttempt {
  //  An object to store user's answers, where keys are question IDs and values are the answers.
  answers: Record<string, any>;
  startTime: number;
  endTime?: number;
  submitted: boolean;
}

interface QuizResults {
  score: number;
  totalPoints: number;
  percentage: number;
  // An object detailing the outcome for each question
  questionResults: Record<string, {
    correct: boolean;
    userAnswer: any;
    correctAnswer: any;
    points: number;
  }>;
}

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  
  // Quiz data
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Quiz attempt state: Holds the current state of the user's answers and submission status.
  const [attempt, setAttempt] = useState<QuizAttempt>({
    answers: {},
    startTime: Date.now(),
    submitted: false
  });
  
  // Timer state
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  
  // Results state: Stores the calculated QuizResults after submission.
  const [results, setResults] = useState<QuizResults | null>(null);
  
  // Current question for one-at-a-time mode
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Fetch quiz and questions
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        const [quizData, questionsData] = await Promise.all([
          quizzesClient.findQuizById(qid!),
          quizzesClient.findQuestionsForQuiz(qid!)
        ]);
        
        setQuiz(quizData);
        setQuestions(questionsData.sort((a: Question, b: Question) => a.order - b.order));
        
        // Initialize timer if quiz has time limit
        if (quizData.timeLimit && quizData.timeLimit > 0) {
          setTimeRemaining(quizData.timeLimit * 60); // Convert minutes to seconds
        }
      } catch (err) {
        console.error("Error fetching quiz data:", err);
        setError("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuizData();
  }, [qid]);

  // Timer effect: manages the quiz timer. 
  // It runs when timeRemaining or attempt.submitted changes.
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0 || attempt.submitted) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(timeRemaining => {
        if (timeRemaining === null || timeRemaining <= 1) {
          handleSubmit(); // Auto-submit when time runs out
          return 0;
        }
        return timeRemaining - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeRemaining, attempt.submitted]);

  // Format time for display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer change
  const handleAnswerChange = (questionId: string, answer: any) => {
    setAttempt(prevAttemptObject => ({
      ...prevAttemptObject,
      answers: {
        ...prevAttemptObject.answers,
        [questionId]: answer
      }
    }));
  };

  // Calculate results
  const calculateResults = (): QuizResults => {
    let totalScore = 0;
    let totalPossiblePoints = 0;
    const questionResults: QuizResults['questionResults'] = {};
    
    questions.forEach(question => {
      const userAnswer = attempt.answers[question._id!];
      let isCorrect = false;
      let correctAnswer: any = null;
      
      totalPossiblePoints += question.points;
      
      switch (question.type) {
        case 'multiple-choice':
          const mcQuestion = question as MultipleChoiceQuestion;
          const correctChoice = mcQuestion.choices.find(c => c.isCorrect);
          correctAnswer = correctChoice?.text;
          isCorrect = userAnswer === correctAnswer;
          break;
          
        case 'true-false':
          const tfQuestion = question as TrueFalseQuestion;
          correctAnswer = tfQuestion.correctAnswer;
          isCorrect = userAnswer === correctAnswer;
          break;
          
        case 'fill-blank':
          const fbQuestion = question as FillInBlankQuestion;
          correctAnswer = fbQuestion.blanks.map(b => b.text).join(', ');
          // Check if user answer matches any acceptable answer
          isCorrect = fbQuestion.blanks.some(blank => {
            if (blank.caseSensitive) {
              return userAnswer === blank.text;
            }
            return userAnswer?.toLowerCase() === blank.text.toLowerCase();
          });
          break;
      }
      
      if (isCorrect) {
        totalScore += question.points;
      }
      
      questionResults[question._id!] = {
        correct: isCorrect,
        userAnswer,
        correctAnswer,
        points: question.points
      };
    });
    
    return {
      score: totalScore,
      totalPoints: totalPossiblePoints,
      percentage: totalPossiblePoints > 0 ? (totalScore / totalPossiblePoints) * 100 : 0,
      questionResults
    };
  };

  // Handle quiz submission
  const handleSubmit = () => {
    const quizResults = calculateResults();
    setResults(quizResults);
    setAttempt(prev => ({
      ...prev,
      endTime: Date.now(),
      submitted: true
    }));
  };

  // Handle navigation between questions (one-at-a-time mode)
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0 && quiz.lockQuestionsAfterAnswer !== "Yes") {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Render question based on type
  const renderQuestion = (question: Question, index: number) => {
    const questionId = question._id!;
    const userAnswer = attempt.answers[questionId];
    const isSubmitted = attempt.submitted;
    const result = results?.questionResults[questionId];
    
    return (
      <Card key={questionId} className="mb-4">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Question {index + 1}</strong>
              <Badge bg="info" className="ms-2">{question.points} pts</Badge>
              {isSubmitted && (
                result?.correct ? 
                  <Badge bg="success" className="ms-2"><FaCheckCircle /> Correct</Badge> :
                  <Badge bg="danger" className="ms-2"><FaTimesCircle /> Incorrect</Badge>
              )}
            </div>
          </div>
        </Card.Header>
        
        <Card.Body>
          <div dangerouslySetInnerHTML={{ __html: question.question }} className="mb-3" />
          
          {question.type === 'multiple-choice' && renderMultipleChoice(question as MultipleChoiceQuestion, questionId, userAnswer, isSubmitted)}
          {question.type === 'true-false' && renderTrueFalse(question as TrueFalseQuestion, questionId, userAnswer, isSubmitted)}
          {question.type === 'fill-blank' && renderFillBlank(question as FillInBlankQuestion, questionId, userAnswer, isSubmitted, result)}
        </Card.Body>
      </Card>
    );
  };

  // Render multiple choice question
  const renderMultipleChoice = (
    question: MultipleChoiceQuestion, 
    questionId: string, 
    userAnswer: any, 
    isSubmitted: boolean,
  ) => {
    return (
      <div>
        {question.choices.map((choice, index) => {
          const letter = String.fromCharCode(65 + index);
          const isSelected = userAnswer === choice.text;
          const isCorrect = choice.isCorrect;
          
          return (
            <Form.Check
              key={index}
              type="radio"
              id={`${questionId}-${index}`}
              name={`question-${questionId}`}
              label={
                <span className={
                  isSubmitted ? (
                    isCorrect ? "text-success fw-bold" : 
                    isSelected && !isCorrect ? "text-danger" : ""
                  ) : ""
                }>
                  {letter}. {choice.text}
                  {isSubmitted && isCorrect && " ✓"}
                  {isSubmitted && isSelected && !isCorrect && " ✗"}
                </span>
              }
              checked={isSelected}
              onChange={() => handleAnswerChange(questionId, choice.text)}
              disabled={isSubmitted}
              className="mb-2"
            />
          );
        })}
      </div>
    );
  };

  // Render true/false question
  const renderTrueFalse = (
    question: TrueFalseQuestion, 
    questionId: string, 
    userAnswer: any, 
    isSubmitted: boolean,
  ) => {
    return (
      <div>
        <Form.Check
          type="radio"
          id={`${questionId}-true`}
          name={`question-${questionId}`}
          label={
            <span className={
              isSubmitted && question.correctAnswer === true ? "text-success fw-bold" :
              isSubmitted && userAnswer === true && !question.correctAnswer ? "text-danger" : ""
            }>
              True
              {isSubmitted && question.correctAnswer === true && " ✓"}
              {isSubmitted && userAnswer === true && !question.correctAnswer && " ✗"}
            </span>
          }
          checked={userAnswer === true}
          onChange={() => handleAnswerChange(questionId, true)}
          disabled={isSubmitted}
          className="mb-2"
        />
        <Form.Check
          type="radio"
          id={`${questionId}-false`}
          name={`question-${questionId}`}
          label={
            <span className={
              isSubmitted && question.correctAnswer === false ? "text-success fw-bold" :
              isSubmitted && userAnswer === false && question.correctAnswer ? "text-danger" : ""
            }>
              False
              {isSubmitted && question.correctAnswer === false && " ✓"}
              {isSubmitted && userAnswer === false && question.correctAnswer && " ✗"}
            </span>
          }
          checked={userAnswer === false}
          onChange={() => handleAnswerChange(questionId, false)}
          disabled={isSubmitted}
        />
      </div>
    );
  };

  // Render fill in the blank question
  const renderFillBlank = (
    question: FillInBlankQuestion, 
    questionId: string, 
    userAnswer: any, 
    isSubmitted: boolean,
    result: any
  ) => {
    return (
      <div>
        <Form.Control
          type="text"
          value={userAnswer || ""}
          onChange={(e) => handleAnswerChange(questionId, e.target.value)}
          disabled={isSubmitted}
          placeholder="Enter your answer"
          className={
            isSubmitted ? (
              result?.correct ? "border-success" : "border-danger"
            ) : ""
          }
        />
        {isSubmitted && (
          <div className="mt-2">
            {result?.correct ? (
              <span className="text-success">Correct!</span>
            ) : (
              <div>
                <span className="text-danger">Incorrect. </span>
                <span className="text-muted">
                  Acceptable answers: {question.blanks.map(b => b.text).join(", ")}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Render quiz results
  const renderResults = () => {
    if (!results) return null;
    
    // const grade = results.percentage >= 90 ? 'A' : 
    //               results.percentage >= 80 ? 'B' : 
    //               results.percentage >= 70 ? 'C' : 
    //               results.percentage >= 60 ? 'D' : 'F';
    
    return (
      <div>
        <h3 className="mb-3 text-success">
          Score: {results.score} / {results.totalPoints} points
        </h3>
      </div>
      // <Card className="mb-4 border-primary">
      //   <Card.Header className="bg-primary text-white">
      //     <h4 className="mb-0">Quiz Results</h4>
      //   </Card.Header>
      //   <Card.Body>
      //     <div className="text-center mb-4">
      //       <h2 className="mb-3">
      //         Score: {results.score} / {results.totalPoints} points
      //       </h2>
      //       <h3 className={
      //         results.percentage >= 70 ? "text-success" : "text-danger"
      //       }>
      //         {results.percentage.toFixed(1)}% - Grade: {grade}
      //       </h3>
      //     </div>
          
      //     <ProgressBar 
      //       now={results.percentage} 
      //       variant={results.percentage >= 70 ? "success" : "danger"}
      //       label={`${results.percentage.toFixed(1)}%`}
      //       className="mb-4"
      //       style={{ height: "30px" }}
      //     />
          
      //     <div className="d-flex justify-content-around text-center">
      //       <div>
      //         <h5>Correct Answers</h5>
      //         <p className="text-success fs-3">
      //           {Object.values(results.questionResults).filter(r => r.correct).length}
      //         </p>
      //       </div>
      //       <div>
      //         <h5>Incorrect Answers</h5>
      //         <p className="text-danger fs-3">
      //           {Object.values(results.questionResults).filter(r => !r.correct).length}
      //         </p>
      //       </div>
      //       <div>
      //         <h5>Total Questions</h5>
      //         <p className="fs-3">{questions.length}</p>
      //       </div>
      //     </div>
      //   </Card.Body>
      // </Card>
    );
  };

  // Render question navigator
  const renderQuestionNavigator = () => {
    return (
      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">Question Navigator</h5>
        </Card.Header>
        <Card.Body>
          <div className="d-flex flex-wrap gap-2">
            {questions.map((question, index) => {
              const questionId = question._id!;
              const isAnswered = !!attempt.answers[questionId];
              const isCurrent = index === currentQuestionIndex;
              const result = results?.questionResults[questionId];
              
              let variant = "outline-secondary";
              if (attempt.submitted && result) {
                variant = result.correct ? "success" : "danger";
              } else if (isCurrent) {
                variant = "primary";
              } else if (isAnswered) {
                variant = "secondary";
              }
              
              return (
                <Button
                  key={index}
                  variant={variant}
                  size="sm"
                  onClick={() => setCurrentQuestionIndex(index)}
                  disabled={attempt.submitted}
                  className={isCurrent ? "fw-bold" : ""}
                  style={{ minWidth: "45px" }}
                >
                  {index + 1}
                  {isAnswered && !attempt.submitted && (
                    <span className="ms-1">✓</span>
                  )}
                </Button>
              );
            })}
          </div>
          <div className="mt-3 small text-muted">
            <div>✓: Answered</div>
            {attempt.submitted && (
              <>
                <div><span className="text-success">Green</span>: Correct</div>
                <div><span className="text-danger">Red</span>: Incorrect</div>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <p>Loading quiz...</p>
      </Container>
    );
  }

  if (error || !quiz) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          {error || "Quiz not found"}
          <div className="mt-2">
            <Button variant="primary" onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}>
              Back to Quizzes
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  const isOneAtATime = quiz.oneQuestionAtATime === "Yes";
  const currentQuestion = isOneAtATime ? questions[currentQuestionIndex] : null;

  return (
    <Container className="mt-4">
      {/* Quiz Header */}
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>{quiz.title}</h2>
              <p className="text-muted mb-0">Faculty Preview Mode</p>
            </div>
            <div className="text-end">
              {timeRemaining !== null && !attempt.submitted && (
                <div className="mb-2">
                  <FaClock className="me-2" />
                  <span className={timeRemaining < 300 ? "text-danger fw-bold" : ""}>
                    Time Remaining: {formatTime(timeRemaining)}
                  </span>
                </div>
              )}
              <div>
                <strong>Total Points: {quiz.points}</strong>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Results Section */}
      {attempt.submitted && renderResults()}

      {/* Question Navigator for submitted quizzes */}
      {attempt.submitted && questions.length > 0 && (
        <div className="mb-4">
          {renderQuestionNavigator()}
        </div>
      )}

      {/* Questions Section */}
      {questions.length === 0 ? (
        <Alert variant="warning">
          No questions in this quiz yet.
          <div className="mt-2">
            <Button 
              variant="primary" 
              onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit/quiz-questions-screen`)}
            >
              Add Questions
            </Button>
          </div>
        </Alert>
      ) : (
        <>
          {isOneAtATime && !attempt.submitted ? (
            // One question at a time mode
            <div>
              {/* Question Navigator */}
              {renderQuestionNavigator()}
              
              {currentQuestion && renderQuestion(currentQuestion, currentQuestionIndex)}
              
              <div className="d-flex justify-content-between mt-4">
                <Button
                  variant="secondary"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0 || quiz.lockQuestionsAfterAnswer === "Yes"}
                >
                  Previous
                </Button>
                
                {currentQuestionIndex === questions.length - 1 ? (
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={attempt.submitted}
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleNextQuestion}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          ) : (
            // All questions at once mode
            <div>
              {/* Question Navigator for all-at-once mode */}
              {!attempt.submitted && renderQuestionNavigator()}
              
              {questions.map((question, index) => renderQuestion(question, index))}
              
              {!attempt.submitted && (
                <div className="text-center mt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={attempt.submitted}
                  >
                    Submit Quiz
                  </Button>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Footer Actions */}
      <div className="text-center mt-5 mb-4">
        <Button
          variant="secondary"
          onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/details`)}
        >
          Back to Quiz Details
        </Button>
      </div>
    </Container>
  );
}