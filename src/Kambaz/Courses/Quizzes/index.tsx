import { useDispatch, useSelector } from "react-redux";
import { Dropdown, ListGroup } from "react-bootstrap";
import { FaBan, FaCaretDown, FaCheckCircle, FaPlus, FaRocket, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import { addQuizz, deleteQuiz, setQuizzes, updateQuiz } from "./reducer";
import { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import FacultyOnly from "../../FacultyOnly";
import { FaPencil } from "react-icons/fa6";


export default function Quizzes() {
  const dispatch = useDispatch();
  const {quizzes} = useSelector((state: any) => state.quizzesReducer);
  const {cid} = useParams();
  const navigate = useNavigate();

  const fetchQuizzesForCourse = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid!);
    dispatch(setQuizzes(quizzes));
  };
  useEffect(() => {
    fetchQuizzesForCourse();
  }, [cid, dispatch]);

  const filterQuizzesByTitle = async (title: string) => {
    const quizzes = await coursesClient.findQuizzesByPartialTitle(cid!, title);
    dispatch(setQuizzes(quizzes));
  };
  
  const addQuizHandler = async () => {
    const quiz = {
      title: "New Quiz",
      description: "Quiz Description",
      course: cid,
      published: false,
      quizType: "Graded Quiz",
      assignmentGroup: "Quizzes",
      points: 100,
      shuffleAnswers: "No",
      timeLimit: 20,
      multipleAttempts: "No",
      viewResponses: "Always",
      showCorrectAnswers: "Immediately",
      oneQuestionAtATime: "Yes",
      requireRespondusLockDownBrowser: "No",
      requiredtoViewQuizResults: "No",
      webcamRequired: "No",
      lockQuestionsAfterAnswer: "No",
      dueDate: "2025-12-31",
      availableDate: "2025-01-01",
      untilDate: "2025-12-31",
    };
    const newQuiz = await coursesClient.createQuizForCourse(cid!, quiz);
    dispatch(addQuizz(newQuiz));
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${newQuiz._id}/details`);
  }

  const deleteQuizHandler = async (quizId: string) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const publishQuizHandler = async (quiz: any) => {
    const updatedQuiz = {...quiz, published: !quiz.published};
    await quizzesClient.updateQuiz(updatedQuiz);
    dispatch(updateQuiz(updatedQuiz));
  };

  // Sort quizzes by availableDate before mapping
  const sortedQuizzes = [...quizzes].sort((a,b) => {
    const dateA = new Date(a.availableDate || 0).getTime();
    const dateB = new Date(b.availableDate || 0).getTime();
    return dateA - dateB;  // Sort in ascending order (earliest date first)
  })

  return (
    <div id="wd-quizzes">
      <div id="wd-quizzes-controls" className="d-flex justify-content-between align-items-center">
        <input
          onChange={(e) => filterQuizzesByTitle(e.target.value)}
          type="text"
          className="form-control text-secondary w-50 ms-2"
          placeholder="Search for Quiz"
        />
  
        <FacultyOnly>
          <button onClick={addQuizHandler}
            className="btn btn-danger me-2">
            <FaPlus className="me-2" />
            Quiz
          </button>
        </FacultyOnly>
      </div>
      <hr />

      <ListGroup id="wd-quizzes" className="rounded-0">
        <ListGroup.Item className="bg-secondary p-3 fs-4">
          <FaCaretDown className="me-2" />
          Quizzes
        </ListGroup.Item>

        {sortedQuizzes.map((quiz: any) => (
          <ListGroup.Item key={quiz._id}
              className="wd-quiz d-flex align-items-center justify-content-between p-3">
            <div>
              <FaRocket className="me-3 fs-3" />
            </div>

            <div>
              <Link to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/details`}
                  className="fs-5 text-decoration-none text-reset">
                {quiz.title}
              </Link>
              <div className="small d-flex flex-wrap mt-1">
                <span className="me-1">
                  Not available until: {quiz.availableDate ? new Date(quiz.availableDate).toLocaleDateString() : 'N/A'}
                </span>
                <span className="me-1">|</span>
                <span className="me-1">
                  Due at: {quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : 'N/A'}
                  </span>
                <span className="me-1">|</span>
                <span className="me-1">{quiz.points} pts</span>
                <span className="me-1">|</span>
                <span className="me-1">{quiz.numQuestions} Qustions</span>
              </div>
            </div>

            <FacultyOnly>
              {quiz.published ? 
                <FaCheckCircle className="text-success fs-2 me-2" />
                : <FaBan className="text-danger fs-2 me-2" />}

              <Dropdown>
                <Dropdown.Toggle as="span" bsPrefix="p-0">
                  <BsThreeDotsVertical className="fs-2" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/edit`)}>
                    <FaPencil className="me-2 mb-1" /> Edit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => deleteQuizHandler(quiz._id)} className="text-danger">
                    <FaTrash className="me-2 mb-1" /> Delete
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => publishQuizHandler(quiz)}>
                    {quiz.published ? <FaBan className="me-2 mb-1" /> : 
                                      <FaCheckCircle className="me-2 mb-1" />}
                    {quiz.published ? "Unpublish" : "Publish"}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </FacultyOnly>

            </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}