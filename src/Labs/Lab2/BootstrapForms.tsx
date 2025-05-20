import { FormGroup, FormLabel, FormControl, FormSelect, Form, InputGroup, Row, Col, Button } from "react-bootstrap";
import FormRange from "react-bootstrap/esm/FormRange";

export default function BootstrapForms() {
  return (
    <div>
      <div id="wd-css-styling-forms">
        <h2>Forms</h2>
        <FormGroup className="mb-3" controlId="wd-email">
          {/* 
            React Bootstrap FormGroup component:
            - mb-3: adds margin-bottom spacing
            - controlId="wd-email": provides accessibility by linking label and input,
              also serves as a unique identifier for this form field
          */}
          <FormLabel>Email address</FormLabel>
          <FormControl type="email" placeholder="name@example.com" />  {/* Input field where user can type */}
        </FormGroup>

        <FormGroup className="mb-3" controlId="wd-textarea">
          <FormLabel>Example textarea</FormLabel>
          <FormControl as="textarea" rows={3} />
          {/* as="textarea" (default: "input") would render a multi-line text area instead of a single-line input */}
        </FormGroup>
      </div>

      <div id="wd-css-styling-dropdowns">
        <h3>Dropdowns</h3>
        <FormSelect>
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </FormSelect>
      </div>

      <div id="wd-css-styling-switches">
        <h3>Switches</h3>
        <Form.Check type="switch" checked={false} id="wd-switch-1"
                    label="Unchecked switch checkbox input" />
        <Form.Check type="switch" checked={true} id="wd-switch-2" 
                    label="Checked switch checkbox input" />
        <Form.Check type="switch" checked={false} disabled 
                    id="custom-switch" 
                    label="Unchecked disabled switch checkbox input" />
        <Form.Check type="switch" checked={true} disabled 
                    id="custom-switch" 
                    label="Checked disbled switch checkbox input" />
      </div>

      <div id="wd-css-styling-range-and-sliders">
        <h3>Range</h3>
        <FormGroup controlId="wd-range1">
          <FormLabel>Example range</FormLabel>
          <FormRange min="0" max="5" step="0.5" />
        </FormGroup>
      </div>

      <div id="wd-css-styling-addons">
        <h3>Addons</h3>
        <InputGroup className="mb-3">
          {/* 
            InputGroup with prepended text elements:
            - Groups form controls and text/buttons together as a single form element
            - mb-3 adds margin-bottom spacing
          */}
          <InputGroup.Text>$</InputGroup.Text>
          <InputGroup.Text>0.00</InputGroup.Text>
          <FormControl />  {/* Input field where user can type */}
        </InputGroup>

        <InputGroup>
          <FormControl />
          <InputGroup.Text>$</InputGroup.Text>
          <InputGroup.Text>0.00</InputGroup.Text>
        </InputGroup>
      </div>

      <div id="wd-css-responsive-forms-1">
        <h3>Responsive forms</h3>
        <Form.Group as={Row} className="mb-3" controlId="email1">
          {/* 
            as={Row}:
            - Changes this component from its default 'div' rendering to a Bootstrap Row
            - Row component creates a horizontal flexbox container with Bootstrap's grid
            - Enables side-by-side layout of form elements using Col components inside
            - Without this prop, form elements would stack vertically by default
          */}
          <Form.Label column sm={2}>
            {/* 
              Form.Label with column prop:
              - Creates a label element that's styled as a grid column
              - sm={2} makes it take up 2 columns (out of 12) on small screens and larger
              - This creates the left side of the horizontal form layout
              - The "column" prop is essential to make the label work within the grid
            */}
            Email
          </Form.Label>
          <Col sm={10}>
            {/* 
              Col component:
              - Creates a Bootstrap grid column
              - Houses the actual form input control
            */}
            <Form.Control type="email" value="email@example.com" />
            {/* 
              Form.Control:
              - The actual input element (renders as <input> HTML element)
              - value="email@example.com" sets a default/initial value for the input
            */}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="password1">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="textarea2">
          <Form.Label column sm={2}>
            Bio
          </Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" style={{height: "100px"}} />
          </Col>
        </Form.Group>
      </div>

      <div id="wd-css-responsive-forms-2">
        <h3>Responsive forms</h3>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Email</Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Email" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Password</Form.Label>
            <Col sm={10}>
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>

          <fieldset>
            {/* 
              <fieldset> is an HTML element used to group related form controls.
              It's especially important for accessibility with radio buttons,
              as it semantically indicates these controls are related.
            */}
            <Form.Group as={Row} className="mb-3">
              {/* 
                Form.Group rendered as a Row for horizontal layout.
                - Creates a flexbox row container for the label and inputs
                - mb-3 adds margin-bottom spacing
              */}
              <Form.Label as="legend" column sm={2}>
                {/* 
                  Form.Label rendered as HTML <legend> element:
                  - <legend> is the proper semantic element for a fieldset's title
                  - Improves accessibility by properly labeling the group of radios
                  - In a fieldset, using legend is better than a regular label
                */}
                Radios
              </Form.Label>
              <Col sm={10}>
                <Form.Check type="radio" label="first radio" checked name="formHorizontalRadios" />
                {/* 
                  First radio button:
                  - type="radio" creates a radio input instead of checkbox
                  - label="first radio" provides the text shown next to the radio button
                    and improves accessibility by associating text with the input
                  - checked attribute makes this option selected by default
                  - name="formHorizontalRadios" groups all radios with this name together
                    (critical: radios with the same name work as a single group where
                    only one can be selected at a time)
                */}
                <Form.Check type="radio" label="second radio" name="formHorizontalRadios" />
                <Form.Check type="radio" label="third radio" name="formHorizontalRadios" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                {/* 
                  Advanced Bootstrap grid column with object-based props:
                  sm={{ span: 10, offset: 2 }}:
                  - An object with two properties instead of just a number
                  - span: 10 → Takes up 10 columns out of 12 in the grid
                  - offset: 2 → Pushes the column 2 columns from the left
                */}
                <Form.Check label="Remember me" />
              </Col>
            </Form.Group>
            
            <Form.Group as={Row} className="mb-3">
              <Col>
                <Button type="submit">Sign in</Button>
              </Col>
            </Form.Group>
          </fieldset>
        </Form>
      </div>

    </div>
  );
}