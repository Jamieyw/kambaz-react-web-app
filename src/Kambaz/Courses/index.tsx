import { FaAlignJustify } from "react-icons/fa6";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import Quizzes from "./Quizzes";
import { useSelector } from "react-redux";
import * as client from "./client";
import { useEffect, useState } from "react";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizDetailsEditor from "./Quizzes/QuizDetailsEditor";
import QuizPreview from "./Quizzes/QuizPreview";

export default function Courses() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const {courses} = useSelector((state: any) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);
  const [users, setUsers] = useState<any[]>([]);

  const findUsersForCourse = async () => {
    try {
      const users = await client.findUsersForCourse(course._id);
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    findUsersForCourse();
  }, [course]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2> <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>

        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h2>Piazza</h2>} />
            <Route path="Zoom" element={<h2>Zoom</h2>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:qid/details" element={<QuizDetails />} />
            <Route path="Quizzes/:qid/preview" element={<QuizPreview />} />
            <Route path="Quizzes/:qid/edit/*" element={<QuizDetailsEditor />} />
            <Route path="Grades" element={<h2>Grades</h2>} />
            <Route path="People" element={<PeopleTable users={users} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}