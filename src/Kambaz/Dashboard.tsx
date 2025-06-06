import { Link } from "react-router-dom";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as db from "./Database";
import FacultyOnly from "./FacultyOnly";
import { addCourse, deleteCourse, updateCourse, setCourse } from "./Courses/reducer";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses, course } = useSelector((state: any) => state.coursesReducer);
  // Destructure enrollments data from the imported database module (db)
  // Extract the enrollments array (from Database/enrollments.json via Database/index.ts) from the db object
  const { enrollments } = db;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard ({currentUser.username})</h1> <hr />
      <FacultyOnly>
        <h5>
          New Course
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={() => dispatch(addCourse(course))}
          >
            Add
          </button>
          <button
            className="btn btn-warning float-end me-2"
            onClick={() => dispatch(updateCourse(course))}
            id="wd-update-course-click"
          >
            Update
          </button>
        </h5>
        <hr />
        <FormControl
          value={course.name}
          className="mb-2"
          onChange={(e) => dispatch(setCourse({ ...course, name: e.target.value }))}
        />
        <FormControl
          value={course.description}
          as="textarea"
          rows={3}
          onChange={(e) => dispatch(setCourse({ ...course, description: e.target.value }))}
        />
        <hr />
      </FacultyOnly>

      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            .filter((c: any) =>
              enrollments.some(
                (enrollment) =>
                  enrollment.user === currentUser._id &&
                  enrollment.course === c._id
              )
            )
            .map((c: any) => (
              <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link
                    to={`/Kambaz/Courses/${c._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      src="/images/reactjs.jpg"
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <Card.Body className="card-body">
                      <Card.Title className="wd-dashboard-course-title text-nowarp overflow-hidden">
                        {c.name}
                      </Card.Title>
                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {c.description}
                      </Card.Text>

                      <Button variant="primary">Go</Button>

                      <FacultyOnly>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(deleteCourse(c._id));
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(setCourse(c));
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </FacultyOnly>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}