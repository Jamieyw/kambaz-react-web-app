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
  setAssignment,
  updateAssignment,
  updateAssignmentField,
} from "./reducer";
import type React from "react";
import { useEffect } from "react";
import * as assignmentsClient from "./client";
import * as coursesClient from "../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams(); // Get course ID (cid) and assignment ID (aid) from URL
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Get dispatch function from Redux store

  // Get the current assignment being edited from Redux state
  const currentAssignment = useSelector((state: any) => state.assignmentsReducer.assignment);
  
  // Get all assignments to find the one being edited
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);

  // If assignment is not found and it's not a new assignment, display an error
  if (aid !== "new" && !assignments.find((a: any) => a._id === aid)) {
    return <div>Assignment not found.</div>;
  }

  const loadAssignment = async () => {
    if (aid === "new") {
      // For new assignments, set the default template
      dispatch(setAssignment({
        _id: "newId",
        title: "New Assignment",
        course: cid,
        description: "New Assignment Description",
        points: "100",
        dueDate: new Date().toISOString().split('T')[0],
        availableFrom: new Date().toISOString().split('T')[0],
        availableUntil: new Date().toISOString().split('T')[0],
      }));
    } else {
      try {
        const fetchedAssignment = await assignmentsClient.findAssignmentById(aid as string);
        dispatch(setAssignment(fetchedAssignment));
      } catch (error) {
        console.error("Error fetching assignment for edit:", error);
        // Handle error: navigate back
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
      }
    }
  };

  // Initialize the assignment data when component mounts or aid changes
  useEffect(() => {
    loadAssignment();
  }, [aid, cid, dispatch]);

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

  const handleSave = async () => {
    if (aid === "new") {
      const newAssignment = { ...currentAssignment, course: cid };
      const createdAssignment = await coursesClient.createAssignmentForCourse(cid as string, newAssignment);
      dispatch(addAssignment(createdAssignment));
    } else {
      try {
        await assignmentsClient.updateAssignment(currentAssignment);
        dispatch(updateAssignment(currentAssignment));
      } catch (error) {
        console.error("Error updating assignment:", error);
      }
    }
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
          value={currentAssignment.title || ""}
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
            value={currentAssignment.description || ""}
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
            value={currentAssignment.points || ""}
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
                value={currentAssignment.dueDate || ""}
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
                    value={currentAssignment.availableFrom || ""}
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
                    value={currentAssignment.availableUntil || ""}
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