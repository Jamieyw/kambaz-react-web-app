import { Link } from "react-router-dom";
import AssignmentControls from "./AssignmentControls";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentControls /><br /><br /><br /><br />

      <ListGroup className="rounded-0" id="wd-assignments">

        <ListGroup.Item className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Assignments <AssignmentsControlButtons />
          </div>

          <ListGroup className="rounded-0">
            <ListGroup.Item className="wd-assignment p-3 ps-1">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex me-2">
                  <BsGripVertical className="me-2 fs-2" />
                  <FaEdit className="me-2 fs-2" />
                </div>

                <div className="d-flex me-2">
                  <div className="me-auto">
                    <Link to="/Kambaz/Courses/1234/Assignments/1" 
                        className="fs-5 text-decoration-none text-reset">
                      A1
                    </Link>
                    <div className="small d-flex flex-wrap mt-1">
                      <span className="text-danger me-1">Multiple Modules</span>
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

            <ListGroup.Item className="wd-assignment p-3 ps-1">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex me-2">
                  <BsGripVertical className="me-2 fs-2" />
                  <FaEdit className="me-2 fs-2" />
                </div>

                <div className="d-flex me-2">
                  <div className="me-auto">
                    <Link to="/Kambaz/Courses/1234/Assignments/1" 
                        className="fs-5 text-decoration-none text-reset">
                      A2
                    </Link>
                    <div className="small d-flex flex-wrap mt-1">
                      <span className="text-danger me-1">Multiple Modules</span>
                      <span className="me-1">|</span>
                      <span className="me-1"><span className="fw-bold">Not available until</span> May 13 at 12:00am</span>
                      <span className="me-1">|</span>
                      <span className="me-1">Due May 20 at 11:59pm</span>
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

            <ListGroup.Item className="wd-assignment p-3 ps-1">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex me-2">
                  <BsGripVertical className="me-2 fs-2" />
                  <FaEdit className="me-2 fs-2" />
                </div>

                <div className="d-flex me-2">
                  <div className="me-auto">
                    <Link to="/Kambaz/Courses/1234/Assignments/1" 
                        className="fs-5 text-decoration-none text-reset">
                      A3
                    </Link>
                    <div className="small d-flex flex-wrap mt-1">
                      <span className="text-danger me-1">Multiple Modules</span>
                      <span className="me-1">|</span>
                      <span className="me-1"><span className="fw-bold">Not available until</span> May 20 at 12:00am</span>
                      <span className="me-1">|</span>
                      <span className="me-1">Due May 27 at 11:59pm</span>
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
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}