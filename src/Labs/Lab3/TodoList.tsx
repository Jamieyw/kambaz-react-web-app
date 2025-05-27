import { ListGroup } from "react-bootstrap";
import TodoItem from "./TodoItem";
import todos from "./todos.json";

export default function TodoList() {
  return (
    <>
      <h3>Todo List</h3>
      <ListGroup>
        {todos.map((curr_todo) => {
          return <TodoItem todo={curr_todo} />;  // <TodoItem /> represents a React Component
        })}
      </ListGroup><hr />
    </>
  );
}