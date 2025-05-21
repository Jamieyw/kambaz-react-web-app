import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";

export default function AssignmentsControlButtons() {
  return (
    <div className="float-end">
      <span className="bg-secondary rounded-pill px-3 py-1 border border-dark">40% of Total</span>
      <BsPlus className="fs-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}