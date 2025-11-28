import { Nav } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";

export default function QuizTabNavigation() {
  const { pathname } = useLocation();
  const { cid, qid } = useParams();
  
  return (
    <div>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link as={Link} 
              to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit/quiz-details-editor-screen`}
              active={pathname.includes("quiz-details-editor-screen")}
              replace={true}>
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link}
              to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit/quiz-questions-screen`}
              active={pathname.includes("quiz-questions-screen")}>
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}