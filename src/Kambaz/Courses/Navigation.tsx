import { Link } from "react-router-dom";

export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {/* 
        Course Navigation Container:
          * "wd": Custom namespace prefix for the application
          * "list-group": Bootstrap component that creates a bordered list of items
          * "fs-5": Bootstrap font-size utility (sets font size to level 5, approximately 1.25rem)
          * "rounded-0": Removes border radius, creating square corners instead of rounded ones
      */}
      <Link to="/Kambaz/Courses/1234/Home" id="wd-course-home-link"
        className="list-group-item active border border-0">Home</Link>
        {/* 
          Navigation Link:
          - className="list-group-item active border border-0":
            * "list-group-item": Bootstrap class that styles each item in a list-group
            * "active": Bootstrap class that highlights the current/active item (blue background by default)
            * "border border-0": Sets border width to 0, effectively removing all borders
              (border class is needed first to enable border utility, then border-0 removes all borders)
        */}
      <Link to="/Kambaz/Courses/1234/Modules" id="wd-course-modules-link"
        className="list-group-item text-danger border border-0">Modules</Link>
      <Link to="/Kambaz/Courses/1234/Piazza" id="wd-course-piazza-link"
        className="list-group-item text-danger border border-0">Piazza</Link>
      <Link to="/Kambaz/Courses/1234/Zoom" id="wd-course-zoom-link"
        className="list-group-item text-danger border border-0">Zoom</Link>
      <Link to="/Kambaz/Courses/1234/Assignments" id="wd-course-quizzes-link"
        className="list-group-item text-danger border border-0">Assignments</Link>
      <Link to="/Kambaz/Courses/1234/Quizzes" id="wd-course-assignments-link"
        className="list-group-item text-danger border border-0">Quizzes</Link>
      <Link to="/Kambaz/Courses/1234/Grades" id="wd-course-grades-link"
        className="list-group-item text-danger border border-0">Grades</Link>
      <Link to="/Kambaz/Courses/1234/People" id="wd-course-people-link"
        className="list-group-item text-danger border border-0">People</Link>
    </div>
  );
}