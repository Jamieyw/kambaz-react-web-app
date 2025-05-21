import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";

export default function Courses() {
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {/* 
          Font Awesome "hamburger menu" icon component:
          - FaAlignJustify renders the horizontal bars/lines icon commonly used for mobile menus
          - Bootstrap utility classes applied:
            - me-4: adds margin-end (right margin) of 1.5rem
            - fs-4: sets font-size to level 4 in Bootstrap scale (1.25rem)
            - mb-1: adds a small margin-bottom of 0.25rem to align icon vertically
          - Typically used as a toggle button for responsive navigation menus
          - Commonly referred to as a "hamburger" or "sandwich" icon in UI design
        */}
        Course 1234
      </h2> <hr />
      <div className="d-flex">
        {/* 
          Parent container with d-flex:
          - Creates a flexbox container (display: flex)
          - Allows child elements to be positioned using flexbox properties
          - Common for creating horizontal layouts or aligning items
          - By default, places children in a row (flex-direction: row)
        */}
        <div className="d-none d-md-block">
          {/* 
            Responsive visibility div:
            - This creates content that is only visible on medium-sized screens and larger
          */}
          <CourseNavigation />
        </div>

        <div className="flex-fill">
          {/* 
            flex-fill Bootstrap utility class:
            - Sets flex: 1 1 auto (grow: 1, shrink: 1, basis: auto)
            - Forces the element to fill all available space in a flex container
            - Must be used within a parent that has d-flex or d-inline-flex applied
          */}
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h2>Piazza</h2>} />
            <Route path="Zoom" element={<h2>Zoom</h2>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Quizzes" element={<h2>Quizzes</h2>} />
            <Route path="Grades" element={<h2>Grades</h2>} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}