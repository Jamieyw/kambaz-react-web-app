const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
import { Container } from "react-bootstrap";
import EnvironmentVariables from "./EnvironmentVariables";
import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";

export default function Lab5() {
  return (
    <Container>
      <div id="wd-lab5">
        <h2>Lab 5</h2>
        <div className="list-group">
          <a href={`${REMOTE_SERVER}/lab5/welcome`}
              className="list-group-item">
            Welcome
          </a>
        </div><hr />

        <EnvironmentVariables />
        <PathParameters />
        <QueryParameters />
      </div>
    </Container>
  );
}