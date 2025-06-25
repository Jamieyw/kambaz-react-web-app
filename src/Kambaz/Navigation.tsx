import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function KambazNavigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Dashboard", path: "/Kambaz/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses",   path: "/Kambaz/Dashboard", icon: LiaBookSolid },
    { label: "Calendar",  path: "/Kambaz/Calendar",  icon: IoCalendarOutline },
    { label: "Inbox",     path: "/Kambaz/Inbox",     icon: FaInbox },
    { label: "Labs",      path: "/Labs",             icon: LiaCogSolid },
  ];

  return (
    <ListGroup id="wd-kambaz-navigation" style={{ width: 120}}
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
      <ListGroup.Item id="wd-neu-link" target="_blank" action
          href="https://www.northeastern.edu/"
          className="bg-black border-0 text-center">
        <img src="/images/NEU.png" width="75px" />
      </ListGroup.Item>

      <ListGroup.Item to="/Kambaz/Account" as={Link} className={`text-center border-0 bg-black 
          ${pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"}`}>
        <FaRegCircleUser className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`} />
        <br />
        Account
      </ListGroup.Item>

      {links.map((link) => (
        <ListGroup.Item key={link.label} as={Link} to={link.path} className={`bg-black text-center border-0
            ${pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"}`}>
          {link.icon({ className: "fs-1 text-danger "})}
          <br />
          {link.label}
        </ListGroup.Item>
      ))}

    </ListGroup>
  );
}
