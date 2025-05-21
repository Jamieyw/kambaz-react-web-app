import { Button } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";

export default function AssignmentControls() {
  return (
    <div id="wd-assignments-controls" className="d-flex justify-content-between align-items-center">
      {/* Search part - left aligned */}
      <div className="position-relative" style={{ width: "300px" }}>
        <input
          type="text"
          className="form-control text-secondary"
          placeholder="Search..."
          style={{ paddingLeft: "40px" }}
        />

        <FaSearch
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "gray",
            backgroundColor: "white"
          }}
        />
      </div>
      
      {/* Buttons part - right aligned */}
      <div>
        <Button variant="light" size="lg" className="me-1" id="wd-add-group-btn">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Group
        </Button>
        <Button variant="danger" size="lg" id="wd-add-assignment-btn">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Assignment
        </Button>
      </div>
    </div>
  );
}