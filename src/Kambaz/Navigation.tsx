import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function KambazNavigation() {
  return (
    <ListGroup id="wd-kambaz-navigation" style={{ width: 110}}
        className="rounded-0 position-fixed bottom-0 top-0 
        d-none d-md-block bg-black z-2">
      {/* 
        React Bootstrap ListGroup component with complex styling:
        
        id="wd-kambaz-navigation":
        - Custom ID for targeting with CSS or JavaScript
        - Likely used for specific styling or functionality related to "kambaz"
        
        style={{ width: 120}}:
        - Inline style setting a fixed width of 120px
        - Uses direct style prop rather than Bootstrap classes for exact width control
        
        className="rounded-0 position-fixed buttom-0 top-0 d-none d-md-block bg-black z-2":
        - rounded-0: Removes border radius (square corners instead of rounded)
        - position-fixed: Fixes the element in the viewport (doesn't scroll with content)
        - buttom-0: Anchors to bottom of viewport (note: there appears to be a typo, should be "bottom-0")
        - top-0: Anchors to top of viewport
          (combined with bottom-0, this makes it span the full height of the viewport)
        - d-none: Hidden by default on all screen sizes
        - d-md-block: Visible as a block element on medium screens and larger (≥768px)
        - bg-black: Sets background color to black
        - z-2: Sets z-index to 2 (controls stacking order of elements)
      */}
      <ListGroup.Item id="wd-neu-link" target="_black" action
          href="https://www.northeastern.edu/"
          className="bg-black border-0 text-center">
        <img src="/images/NEU.png" width="75px" />
      </ListGroup.Item>

      <ListGroup.Item to="/Kambaz/Account" as={Link}
          className="text-center border-0 bg-black text-white">
        <FaRegCircleUser className="fs-1 text-white" /><br />
        Account
      </ListGroup.Item>

      <ListGroup.Item to="/Kambaz/Dashboard" as={Link}
          className="text-center border-0 bg-white text-danger">
        <AiOutlineDashboard className="fs-1 text-danger" /><br />
        Dashboard
      </ListGroup.Item>

      <ListGroup.Item to="/Kambaz/Dashboard" as={Link}
          className="text-center border-0 bg-black text-white">
        <LiaBookSolid className="fs-1 text-danger" /><br />
        Courses
      </ListGroup.Item>

      <ListGroup.Item to="/Kambaz/Calendar" as={Link}
          className="text-center border-0 bg-black text-white">
        <IoCalendarOutline className="fs-1 text-danger" /><br />
        Calendar
      </ListGroup.Item>

      <ListGroup.Item to="/Kambaz/Inbox" as={Link}
          className="text-center border-0 bg-black text-white">
        <FaInbox className="fs-1 text-danger" /><br />
        Inbox
      </ListGroup.Item>

      <ListGroup.Item to="/Kambaz/Labs" as={Link}
          className="text-center border-0 bg-black text-white">
        <LiaCogSolid className="fs-1 text-danger" /><br />
        Labs
      </ListGroup.Item>
    </ListGroup>
  );
}
