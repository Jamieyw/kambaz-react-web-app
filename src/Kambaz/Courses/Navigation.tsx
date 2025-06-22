import { ListGroup } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";

export default function CourseNavigation() {
  const { pathname } = useLocation();
  const { cid } = useParams();
  const links = [
    { label: "Home",        path: `/Kambaz/Courses/${cid}/Home` },
    { label: "Modules",     path: `/Kambaz/Courses/${cid}/Modules` },
    { label: "Piazza",      path: `/Kambaz/Courses/${cid}/Piazza` },
    { label: "Zoom",        path: `/Kambaz/Courses/${cid}/Zoom` },
    { label: "Assignments", path: `/Kambaz/Courses/${cid}/Assignments` },
    { label: "Quizzes",     path: `/Kambaz/Courses/${cid}/Quizzes` },
    { label: "Grades",      path: `/Kambaz/Courses/${cid}/Grades` },
    { label: "People",      path: `/Kambaz/Courses/${cid}/People` },
  ];

  return (
    <ListGroup id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {/* 
        Course Navigation Container:
          * "wd": Custom namespace prefix for the application
          * "list-group": Bootstrap component that creates a bordered list of items
          * "fs-5": Bootstrap font-size utility (sets font size to level 5, approximately 1.25rem)
          * "rounded-0": Removes border radius, creating square corners instead of rounded ones
      */}
      {links.map((link) => (
        <ListGroup.Item key={link.path} as={Link} to={link.path} 
            className={`list-group-item border border-0
              ${pathname.includes(link.label) ? "active" : "text-danger"}`}>
          {link.label}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}