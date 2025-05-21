import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <Form.Control id="wd-username" defaultValue="alice" placeholder="username" className="mb-2" />
      <Form.Control id="wd-password" type="password" defaultValue="123" placeholder="password" className="mb-2" />
      <Form.Control id="wd-firstname" defaultValue="Alice" placeholder="First Name" className="mb-2" />
      <Form.Control id="wd-lastname" defaultValue="Wonderland" placeholder="Last Name" className="mb-2" />
      <Form.Control id="wd-dob" type="date" placeholder="mm/dd/yyyy" className="mb-2" />
      <Form.Control id="wd-email" defaultValue="alice@wonderland" placeholder="email" className="mb-2" />
      <Form.Control id="wd-role" defaultValue="User" placeholder="Role" className="mb-2" />
      <Link className="btn btn-danger w-100 mb-2" to="/Kambaz/Account/Signin">Sign out</Link>
    </div>
  );
}