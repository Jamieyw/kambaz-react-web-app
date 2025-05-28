import { useParams } from "react-router";
import * as db from "../../Database";
import { FormControl, FormGroup, FormLabel, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find((assignment) => assignment._id === aid);

  if (!assignment) {
    return <div>Assignment not found.</div>;
  }

  return (
    <div>
      <FormGroup>
        <FormLabel>Assignment Name</FormLabel>
        <FormControl defaultValue={`${aid} - ${assignment.title}`} placeholder="Assignment name" />
      </FormGroup>

      <div className="my-4 border rounded p-3">
        <p>The assignment is <span className="text-danger">available online</span></p>
        <p>Submit a link to the landing page of your Web application running on Netlify.</p>
        <p>The landing page should be the landing page of the Lab exercises and should include the following:</p>
        <ul>
          <li>Your full name and section</li>
          <li>Links to each of the lab assignments</li>
          <li>Link to the Kambaz application</li>
          <li>Links to all relevant source code repositories</li>
        </ul>
        <p>The Kambaz application should include a link to navigate back to the landing page.</p>
      </div>

      <Form.Group as={Row} className="mb-3" controlId="points">
        <Form.Label column sm={3} className="text-end">Points</Form.Label>
        <Col sm={9}>
          <Form.Control type="number" defaultValue="100" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="assignment-group">
        <Form.Label column sm={3} className="text-end">Assignment Group</Form.Label>
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
        <Form.Label column sm={3} className="text-end">Display Grade as</Form.Label>
        <Col sm={9}>
          <Form.Select>
            <option selected>Percentage</option>
            <option>Letter</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="submission-type">
        <Form.Label column sm={3} className="text-end">Submission Type</Form.Label>
        <Col sm={9}>
          <div className="border rounded p-3">
            <Form.Select className="mb-3">
              <option>Online</option>
            </Form.Select>
            
            <Form.Group controlId="online-entry-options">
              <Form.Label className="fw-bold mb-2">Online Entry Options</Form.Label>
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
        <Form.Label column sm={3} className="text-end">Assign</Form.Label>
        <Col sm={9}>
          <div className="border rounded p-3">
            {/* Assign to section */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Assign to</Form.Label>
              <Form.Select multiple className="form-control">
                <option>Everyone</option>
                <option>Self</option>
                <option>Selected Group</option>
              </Form.Select>
              <Form.Text className="text-muted">
                Hold Ctrl (or Cmd on Mac) to select multiple options
              </Form.Text>
            </Form.Group>

            {/* Due date section */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Due</Form.Label>
              <Form.Control 
                type="date" 
                defaultValue="2024-05-13"
              />
            </Form.Group>

            {/* Available from/until section */}
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Available from</Form.Label>
                  <Form.Control 
                    type="date" 
                    defaultValue="2024-05-06"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Until</Form.Label>
                  <Form.Control 
                    type="date"
                    defaultValue="2024-05-13"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Col>
      </Form.Group>

      <hr />
      <Link to={`/Kambaz/Courses/${cid}/Assignments`} className="btn btn-danger me-2 float-end">
        Save
      </Link>
      <Link to={`/Kambaz/Courses/${cid}/Assignments`} className="btn btn-secondary me-1 float-end">
        Cancel
      </Link>

    </div>
  );
}