import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AssignmentControls from "./AssignmentControls";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import FacultyOnly from "../../FacultyOnly";
import { deleteAssignment, setAssignments } from "./reducer"; // Import setAssignments
import { useState, useEffect } from "react"; // Import useEffect
import * as client from "./client"; // Import the new assignment client

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const assignments = useSelector(
    (state: any) => state.assignmentsReducer.assignments
  );

  // State for managing the delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<any>(null);

  // Function to show the delete confirmation modal
  const handleDeleteClick = (assignment: any) => {
    setAssignmentToDelete(assignment);
    setShowDeleteModal(true);
  };

  // Async function to confirm deletion with API call
  const handleConfirmDelete = async () => {
    if (assignmentToDelete && assignmentToDelete._id) {
      try {
        await client.deleteAssignment(assignmentToDelete._id); // Call the API
        dispatch(deleteAssignment(assignmentToDelete._id)); // Update Redux state on success
        setShowDeleteModal(false);
        setAssignmentToDelete(null);
      } catch (error) {
        console.error("Error deleting assignment:", error);
      }
    }
  };

  // Function to cancel deletion
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setAssignmentToDelete(null);
  };

  // Fetch assignments from the backend when the component mounts or cid changes
  const fetchAssignments = async () => {
    if (cid) { // Only fetch if cid is available
      try {
        const fetchedAssignments = await client.findAssignmentsForCourse(cid);
        dispatch(setAssignments(fetchedAssignments)); // Set assignments in Redux
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]); // Re-fetch when course ID changes

  return (
    <div id="wd-assignments">
      <AssignmentControls />
      <br />
      <br />
      <br />
      <br />

      <ListGroup
        className="rounded-0 p-0 mb-5 fs-5 border border-gray"
        id="wd-assignments"
      >
        <div className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="me-2 fs-3" />
          Assignments
          <AssignmentsControlButtons />
        </div>

        {assignments
          .filter((assignment: any) => cid === assignment.course) // Still filter locally based on current course
          .map((assignment: any) => (
            <ListGroup className="rounded-0" key={assignment._id}> {/* Add key for list rendering */}
              <ListGroup.Item className="wd-assignment p-3 ps-1">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex me-2">
                    <BsGripVertical className="me-2 fs-2" />
                    <FaEdit className="me-2 fs-2" />
                  </div>

                  <div className="d-flex me-2">
                    <div className="me-auto">
                      <Link
                        to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                        className="fs-5 text-decoration-none text-reset"
                      >
                        {assignment.title}
                      </Link>
                      <div className="small d-flex flex-wrap mt-1">
                        <span className="text-danger me-1">
                          {assignment.title}
                        </span>
                        <span className="me-1">|</span>
                        <span className="me-1">
                          <span className="fw-bold">Not available until</span>{" "}
                          {assignment.availableFrom}
                        </span>
                        <span className="me-1">|</span>
                        <span className="me-1">
                          Due at {assignment.dueDate}
                        </span>
                        <span className="me-1">|</span>
                        <span>{assignment.points} pts</span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex">
                    <FacultyOnly>
                      <FaTrash
                        className="text-danger me-2"
                        onClick={() => handleDeleteClick(assignment)}
                      />
                    </FacultyOnly>
                    <GreenCheckmark />
                    <IoEllipsisVertical className="fs-4" />
                  </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          ))}
      </ListGroup>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {assignmentToDelete && (
            <p>
              Are you sure you want to remove the assignment "<strong>{assignmentToDelete.title}</strong>"?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}