import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Nav } from 'react-bootstrap';

export default function LandingPage() {
  return (
    <Container className="my-5">
      <Row className="justify-content-center text-center mb-4">
        <Col sm={8}>
          <h1 className="display-4 mb-3">Final Project Info</h1>
        </Col>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Text>
                <strong>Name:</strong> Yunwen Hu
              </Card.Text>
              <Card.Text>
                <strong>GitHub Repository (Frontend):</strong>{' '}
                <a href="https://github.com/Jamieyw/kambaz-react-web-app/tree/final-project">
                  https://github.com/Jamieyw/kambaz-react-web-app/tree/final-project
                </a>
              </Card.Text>
              <Card.Text>
                <strong>GitHub Repository (Server):</strong>{' '}
                <a href="https://github.com/Jamieyw/kambaz-node-server-app/tree/final-project">
                  https://github.com/Jamieyw/kambaz-node-server-app/tree/final-project
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col>
          <Nav justify variant="pills">
            <Nav.Item>
              <Nav.Link as={Link} to="/Kambaz" id="wd-to-kambaz" className="fs-3">Kambaz (Final Project)</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/Labs" id="wd-to-labs" className="fs-3">Labs</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
}