import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">

        {/* Course 1 */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
            <img src="images/reactjs.jpg" width={200} />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 2 */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/2345/Home" className="wd-dashboard-course-link">
            <img src="images/reactjs.jpg" width={200} />
            <div>
              <h5>CS2345 Node.js</h5>
              <p className="wd-dashboard-course-title">
                Server-side JavaScript
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 3 */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/3456/Home" className="wd-dashboard-course-link">
            <img src="images/reactjs.jpg" width={200} />
            <div>
              <h5>CS3456 Python</h5>
              <p className="wd-dashboard-course-title">
                Data Science and Machine Learning
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 4 */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/4567/Home" className="wd-dashboard-course-link">
            <img src="images/reactjs.jpg" width={200} />
            <div>
              <h5>CS4567 Angular</h5>
              <p className="wd-dashboard-course-title">
                Enterprise Frontend Framework
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 5 */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/5678/Home" className="wd-dashboard-course-link">
            <img src="images/reactjs.jpg" width={200} />
            <div>
              <h5>CS5678 Database Systems</h5>
              <p className="wd-dashboard-course-title">
                SQL and NoSQL Data Management
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 6 */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/6789/Home" className="wd-dashboard-course-link">
            <img src="images/reactjs.jpg" width={200} />
            <div>
              <h5>CS6789 Mobile Development</h5>
              <p className="wd-dashboard-course-title">
                iOS and Android with React Native
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 7 */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/7890/Home" className="wd-dashboard-course-link">
            <img src="images/reactjs.jpg" width={200} />
            <div>
              <h5>CS7890 Cybersecurity</h5>
              <p className="wd-dashboard-course-title">
                Network and Application Security
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}