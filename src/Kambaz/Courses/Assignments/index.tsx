import { useParams } from "react-router-dom";
import * as db from "../../Database";
import { Link } from "react-router-dom";
import AssignmentControls from "./AssignmentControls";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

  return (
    <div id="wd-assignments">
      <AssignmentControls /><br /><br /><br /><br />

      <ListGroup className="rounded-0 p-0 mb-5 fs-5 border border-gray" id="wd-assignments">
        <div className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="me-2 fs-3" />
          Assignments
          <AssignmentsControlButtons />
        </div>

        {assignments
          .filter((assignment: any) => cid === assignment.course)
          .map((assignment: any) => (
          <ListGroup className="rounded-0">
            <ListGroup.Item className="wd-assignment p-3 ps-1">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex me-2">
                  <BsGripVertical className="me-2 fs-2" />
                  <FaEdit className="me-2 fs-2" />
                </div>

                <div className="d-flex me-2">
                  <div className="me-auto">
                    <Link to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                        className="fs-5 text-decoration-none text-reset">
                      {assignment._id}
                    </Link>
                    <div className="small d-flex flex-wrap mt-1">
                      <span className="text-danger me-1">{assignment.title}</span>
                      <span className="me-1">|</span>
                      <span className="me-1"><span className="fw-bold">Not available until</span> May 6 at 12:00am</span>
                      <span className="me-1">|</span>
                      <span className="me-1">Due May 13 at 11:59pm</span>
                      <span className="me-1">|</span>
                      <span>100 pts</span>
                    </div>
                  </div>
                </div>

                <div className="d-flex">
                  <GreenCheckmark />
                  <IoEllipsisVertical className="fs-4" />
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        ))}
      </ListGroup>
    </div>
  );
}