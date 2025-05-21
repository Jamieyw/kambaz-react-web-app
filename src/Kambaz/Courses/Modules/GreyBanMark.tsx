import { FaBan, FaCircle } from "react-icons/fa";

export default function GreyBanMark() {
  return (
    <span className="me-1 position-relative">
      <FaBan style={{ top: "1px" }} className="text-relative me-1 position-absolute fs-5" />
      <FaCircle className="text-white me-1 fs-6" />
    </span>
  );
}