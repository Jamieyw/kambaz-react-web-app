import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {/* 
            Row component with responsive column settings:
            - xs={1}: Creates 1 column layout on extra small screens (mobile)
            - md={5}: Creates 5 column layout on medium screens and larger
            - className="g-4": Adds gap/gutters of size 4 (1.5rem/24px) between columns
          */}
          <Col className="wd-dashboard-course" style={{ width: "300px"}}>
            {/* 
              Col component with fixed width override:
              - style={{ width: "300px" }}: Forces each column to be exactly 300px wide
                * This fixed width overrides Bootstrap's default percentage-based column widths
                * Creates a "hybrid responsive" behavior where:
                  1. Bootstrap's Row/Col structure handles the overall layout
                  2. The fixed 300px width ensures consistent card sizing
                  3. The number of columns per row adapts based on available screen width:
                    - Narrow screens: Only 1 column fits (300px + gutters)
                    - Medium screens (~768px): 2-3 columns fit
                    - Wider screens: 3-4 columns fit
                    - Very wide screens (1700px+): All 5 columns fit
                * This approach prioritizes consistent card size over strictly adhering to
                  the xs={1} md={5} column count, allowing a more gradual responsive transition
            */}
            <Card>
              <Link to="/Kambaz/Courses/1234/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
                {/* 
                  Link wrapping the card, making the entire card clickable:
                  - wd-dashboard-course-link: Custom class for course links
                  - text-decoration-none: Removes underline from link
                  - text-dark: Sets text color to dark (nearly black)
                */}
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                {/* 
                  Card.Img - Bootstrap component for card images:
                  - variant="top": Positions image at the top of card
                  - width="100%": Makes image take full width of card
                */}
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {/* 
                      Card.Title - Card's title section:
                      - wd-dashboard-course-title: Custom class for course titles
                      - text-nowrap: Prevents title from wrapping to next line
                      - overflow-hidden: Hides text that exceeds container width (truncates)
                    */}
                    CS1234 React JS
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px"}}>
                    Full Stack software developer
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
  
          <Col className="wd-dashboard-course" style={{ width: "300px"}}>
            <Card>
              <Link to="/Kambaz/Courses/2345/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS2345 Node.js
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px"}}>
                    Server-side JavaScript
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          
          <Col className="wd-dashboard-course" style={{ width: "300px"}}>
            <Card>
              <Link to="/Kambaz/Courses/3456/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS3456 Python
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px"}}>
                    Data Science and Machine Learning
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          
          <Col className="wd-dashboard-course" style={{ width: "300px"}}>
            <Card>
              <Link to="/Kambaz/Courses/4567/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS4567 Angular
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px"}}>
                    Enterprise Frontend Framework
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          
          <Col className="wd-dashboard-course" style={{ width: "300px"}}>
            <Card>
              <Link to="/Kambaz/Courses/5678/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS5678 Database Systems
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px"}}>
                    SQL and NoSQL Data Management
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          
          <Col className="wd-dashboard-course" style={{ width: "300px"}}>
            <Card>
              <Link to="/Kambaz/Courses/6789/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS6789 Mobile Development
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px"}}>
                    iOS and Android with React Native
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          
          <Col className="wd-dashboard-course" style={{ width: "300px"}}>
            <Card>
              <Link to="/Kambaz/Courses/7890/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS7890 Cybersecurity
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px"}}>
                    Network and Application Security
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>

        </Row>
      </div>
    </div>
  );
}