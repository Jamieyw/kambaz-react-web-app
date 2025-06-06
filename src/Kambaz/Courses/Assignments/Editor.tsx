import { useNavigate, useParams } from "react-router";
import {
  FormControl,
  FormGroup,
  FormLabel,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addAssignment,
  updateAssignment,
  updateAssignmentField,
} from "./reducer";
import type React from "react";

export default function AssignmentEditor() {
  const { cid, aid } = useParams(); // Get course ID (cid) and assignment ID (aid) from URL
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Get dispatch function from Redux

  // Select the current assignment from the Redux store
  const currentAssignment = useSelector((state: any) => {
    // If aid is "new", use the default template from the reducer's initial state
    if (aid === "new") {
      return { ...state.assignmentsReducer.assignment, course: cid };
    }
    // Otherwise, find the assignment from the list
    return state.assignmentsReducer.assignments.find((a: any) => a._id === aid);
  });

  // If assignment is not found and it's not a new assignment, display an error
  if (!currentAssignment) {
    return <div>Assignment not found.</div>;
  }

  // * handleChange + updateAssignmentField work together to allow for real-time,
  //   granular updates as the user interacts with the form.
  // * handleSave + addAssignment / updateAssignment work together to persist the final,
  //   complete assignment object into the main list of assignments in the Redux store.
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    let fieldName: string;
    switch (id) {
      case "assignment-title":
        fieldName = "title";
        break;
      case "assignment-description":
        fieldName = "description";
        break;
      case "assignment-points":
        fieldName = "points";
        break;
      case "assignment-due-date":
        fieldName = "dueDate";
        break;
      case "assignment-available-from":
        fieldName = "availableFrom";
        break;
      case "assignment-available-until":
        fieldName = "availableUntil";
        break;
      default:
        return; // Do nothing if field not recognized
    }
    dispatch(updateAssignmentField({ field: fieldName, value }));
  };

  const handleSave = () => {
    if (aid === "new") {
      // For new assignments, dispatch addAssignment
      dispatch(addAssignment({ ...currentAssignment, course: cid }));
    } else {
      // For existing assignments, dispatch updateAssignment
      dispatch(updateAssignment(currentAssignment));
    }
    // Navigate back to assignments list
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <div>
      <FormGroup>
        <FormLabel htmlFor="assignment-title">Assignment Name</FormLabel>
        <FormControl
          id="assignment-title"
          value={`${aid} - ${currentAssignment.title}`}
          onChange={handleChange}
          placeholder="Assignment title"
        />
      </FormGroup>

      <div className="my-4 border rounded p-3">
        <FormGroup className="mb-3">
          <FormLabel htmlFor="assignment-description">
            Assignment Description
          </FormLabel>
          <FormControl
            as="textarea"
            id="assignment-description"
            // The "value" prop makes this a controlled component, ensuring the textarea's content
            // is always synchronized with the currentAssignment.description from Redux state.
            // Any changes made by the user are handled by the handleChange function, which dispatches
            // an action to update the Redux store in real-time.
            value={currentAssignment.description}
            onChange={handleChange}
            placeholder="Assignment description"
            rows={5}
          />
        </FormGroup>
      </div>

      <Form.Group as={Row} className="mb-3" controlId="points">
        <Form.Label column sm={3} className="text-end">
          Points
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            id="assignment-points"
            type="number"
            value={currentAssignment.points}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="assignment-group">
        <Form.Label column sm={3} className="text-end">
          Assignment Group
        </Form.Label>
        <Col sm={9}>
          <Form.Select>
            <option selected>ASSIGNMENTS</option>
            <option>QUIZZES</option>
            <option>EXAMS</option>
            <option>PROJECTS</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="grade-display">
        <Form.Label column sm={3} className="text-end">
          Display Grade as
        </Form.Label>
        <Col sm={9}>
          <Form.Select>
            <option selected>Percentage</option>
            <option>Letter</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="submission-type">
        <Form.Label column sm={3} className="text-end">
          Submission Type
        </Form.Label>
        <Col sm={9}>
          <div className="border rounded p-3">
            <Form.Select className="mb-3">
              <option>Online</option>
            </Form.Select>

            <Form.Group controlId="online-entry-options">
              <Form.Label className="fw-bold mb-2">
                Online Entry Options
              </Form.Label>
              <div className="mt-2">
                <Form.Check
                  type="checkbox"
                  id="text-entry"
                  label="Text Entry"
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  id="website-url"
                  label="Website URL"
                  defaultChecked={true}
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  id="media-recordings"
                  label="Media Recordings"
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  id="student-annotation"
                  label="Student Annotation"
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  id="file-uploads"
                  label="File Uploads"
                />
              </div>
            </Form.Group>
          </div>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-end">
          Assign
        </Form.Label>
        <Col sm={9}>
          <div className="border rounded p-3">
            {/* Assign to section */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Assign to</Form.Label>
              <Form.Select className="form-control">
                <option>Everyone</option>
                <option>Self</option>
                <option>Selected Group</option>
              </Form.Select>
            </Form.Group>

            {/* Due date section */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Due</Form.Label>
              <Form.Control
                id="assignment-due-date"
                type="date"
                value={currentAssignment.dueDate}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Available from/until section */}
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Available from</Form.Label>
                  <Form.Control
                    id="assignment-available-from"
                    type="date"
                    value={currentAssignment.availableFrom}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Until</Form.Label>
                  <Form.Control
                    id="assignment-available-until"
                    type="date"
                    value={currentAssignment.availableUntil}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Col>
      </Form.Group>

      <hr />
      <Button variant="danger" onClick={handleSave} className="me-2 float-end">
        Save
      </Button>
      <Button variant="secondary" onClick={handleCancel} className="me-1 float-end">
        Cancel
      </Button>
    </div>
  );
}
