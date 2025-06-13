import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;

  const [module, setModule] = useState({
    id: "M101",
    name: "Introduction to Web Development",
    description: "Learn the basics of web development with HTML, CSS, and JavaScript.",
    course: "CS101",
  });
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary me-2"
          href={`${REMOTE_SERVER}/lab5/assignment`}>
        Get Assignment
      </a>
      <a id="wd-retrieve-modules" className="btn btn-info"
          href={`${REMOTE_SERVER}/lab5/module`}>
        Get Module
      </a><hr />

      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary me-2"
          href={`${REMOTE_SERVER}/lab5/assignment/title`}>
        Get Assignment Title
      </a>
      <a id="wd-retrieve-module-name" className="btn btn-info"
          href={`${REMOTE_SERVER}/lab5/module/name`}>
        Get Module Name
      </a><hr />

      <h4>Modifying Properties</h4>
      {/* Update Assignment Title */}
      <div className="mb-3 d-flex align-items-center">
        <label htmlFor="wd-assignment-title" className="form-label me-2 mb-0">Assignment Title:</label>
        <FormControl className="w-50 me-2" id="wd-assignment-title"
          defaultValue={assignment.title} onChange={(e) =>
            setAssignment({...assignment, title: e.target.value})} />
        <a id="wd-update-assignment-title"
            className="btn btn-primary"
            href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
          Update
        </a>
      </div>

      {/* Update Assignment Score */}
      <div className="mb-3 d-flex align-items-center">
        <label htmlFor="wd-assignment-score" className="form-label me-2 mb-0">Assignment Score:</label>
        <FormControl type="number" className="form-control w-50 me-2" id="wd-assignment-score"
          defaultValue={assignment.score} onChange={(e) =>
            setAssignment({...assignment, score: parseInt(e.target.value)})} />
        <a id="wd-update-assignment-score"
            className="btn btn-primary"
            href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
          Update
        </a>
      </div>

      {/* Update Assignment Completed */}
      <div className="mb-3 form-check d-flex align-items-center">
        <input type="checkbox" className="form-check-input me-2" id="wd-assignment-completed"
          checked={assignment.completed} onChange={(e) =>
            setAssignment({...assignment, completed: e.target.checked})} />
        <label className="form-check-label me-2 mb-0" htmlFor="wd-assignment-completed">Assignment Completed</label>
        <a id="wd-update-assignment-completed"
            className="btn btn-primary"
            href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
          Update
        </a>
      </div>

      {/* Update Module Name */}
      <div className="mb-3 d-flex align-items-center">
        <label htmlFor="wd-module-name" className="form-label me-2 mb-0">Module Name:</label>
        <FormControl className="w-50 me-2" id="wd-module-name"
          defaultValue={module.name} onChange={(e) =>
            setModule({...module, name: e.target.value})} />
        <a id="wd-update-module-name"
            className="btn btn-info"
            href={`${MODULE_API_URL}/name/${module.name}`}>
          Update
        </a>
      </div>

      {/* Update Module Description */}
      <div className="mb-3 d-flex align-items-center">
        <label htmlFor="wd-module-description" className="form-label me-2 mb-0">Module Description:</label>
        <FormControl as="textarea" className="w-50 me-2" id="wd-module-description" rows={3}
          defaultValue={module.description} onChange={(e) =>
            setModule({...module, description: e.target.value})} />
        <a id="wd-update-module-description"
            className="btn btn-info"
            href={`${MODULE_API_URL}/description/${module.description}`}>
          Update
        </a>
      </div>
      <hr />
    </div>
  );
}