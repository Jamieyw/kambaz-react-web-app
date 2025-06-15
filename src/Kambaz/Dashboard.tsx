import { Link } from "react-router-dom";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FacultyOnly from "./FacultyOnly";
import { enrollUserInCourse, unenrollUserFromCourse } from "./Courses/People/Enrollment/reducer";

export default function Dashboard({
  courses,
  course,  
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

  // Check if user is enrolled in a course
  const isUserEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  };

  // Handle enrollment/unenrollment
  const handleEnrollmentToggle = (courseId: string) => {
    if (isUserEnrolled(courseId)) {
      dispatch(unenrollUserFromCourse({
        userId: currentUser._id,
        courseId
      }));
    } else {
      dispatch(enrollUserInCourse({
        userId: currentUser._id,
        courseId
      }));
    }
  };

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard ({currentUser.username})</h1>
      </div>
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
        {`My Courses (${courses.length})`}
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((c: any) => {
            const enrolled = isUserEnrolled(c._id);
            return (
              <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
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

                      {enrolled && <Button variant="primary">Go</Button>}

                      <Button
                        variant={enrolled ? "secondary" : "success"}
                        className="float-end"
                        onClick={(event) => {
                          event.preventDefault();
                          handleEnrollmentToggle(c._id);
                        }}
                      >
                        {enrolled ? "Unenroll" : "Enroll"}
                      </Button>

                      <FacultyOnly>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(c._id);
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
                            setCourse(c);
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