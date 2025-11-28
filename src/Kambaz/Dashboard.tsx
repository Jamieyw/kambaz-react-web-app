// client/src/Dashboard.tsx
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import FacultyOnly from "./FacultyOnly";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard ({currentUser.username})
        <button onClick={() => setEnrolling(!enrolling)}
            className="float-end btn btn-primary">
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      </h1>
      <hr />

      <FacultyOnly>
        <h5>
          New Course
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={addNewCourse}
          >
            Add
          </button>
          <button
            className="btn btn-warning float-end me-2"
            onClick={updateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>
        </h5>
        <hr />
        <FormControl
          value={course.name}
          className="mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <FormControl
          value={course.description}
          as="textarea"
          rows={3}
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
        />
        <hr />
      </FacultyOnly>

      <h2 id="wd-dashboard-published">
        {`${enrolling ? "All Courses" : "My Enrolled Courses"} (${courses.length})`}
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course: any) => {
            return (
              <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link
                    to={`/Kambaz/Courses/${course._id}/Home`}
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
                        {
                          enrolling && (
                            <button onClick={(event) => {
                                  event.preventDefault();
                                  updateEnrollment(course._id, !course.enrolled);
                                }}
                                className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`} >
                              {course.enrolled ? "Unenroll" : "Enroll"}
                            </button>
                          )
                        }
                        {course.name}
                      </Card.Title>
                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </Card.Text>

                      <Button variant="primary">Go</Button>

                      <FacultyOnly>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
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
                            setCourse(course);
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
            );
          })}
        </Row>
      </div>
    </div>
  );
}