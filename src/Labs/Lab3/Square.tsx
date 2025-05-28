import type { ReactNode } from "react";

// children is a special prop in React that refers to whatever is placed between the opening and closing tags of a component in JSX.
export default function Square({ children }: { children: ReactNode }) {
  const num = Number(children);
  return <span id="wd-square">{num * num}</span>
}