import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

export default function TodoList() {
  const { todos } = useSelector((state: any) => state.todosReducer);

  // const [todos, setTodos] = useState([
  //   { id: "1", title: "Learn React" },
  //   { id: "2", title: "Learn Node"}
  // ]);

  // const [todo, setTodo] = useState({ id: "-1", title: "Learn Mongo" });

  // const addTodo = (todo: any) => {
  //   const newTodos = [ ...todos, { ...todo,  // spread existing todos, append new todo
  //     id: new Date().getTime().toString() }];  // override id
  //   setTodos(newTodos);  // update todos
  //   setTodo({id: "-1", title: ""});
  // };

  // const deleteTodo = (id: string) => {
  //   const newTodos = todos.filter((todo) => todo.id !== id);
  //   setTodos(newTodos);
  // };

  // const updateTodo = (todo: any) => {
  //   const newTodos = todos.map((item) =>
  //     (item.id === todo.id ? todo : item));
  //   setTodos(newTodos);
  //   setTodo({id: "-1", title: ""});
  // };

  return (
    <div>
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        
        {todos.map((todo: any) => (
          <TodoItem todo={todo} />
        ))}

        {/* Approach 1
        <ListGroup.Item className="d-flex">
          <FormControl value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            className="me-5" />
          <Button onClick={() => updateTodo(todo)}
                  id="wd-update-todo-click"
                  variant="warning"
                  className="me-2">
            Update
          </Button>
          <Button onClick={() => addTodo(todo)}
                  id="wd-add-todo-click"
                  variant="success">
            Add
          </Button>
        </ListGroup.Item>
        {todos.map((todo) => (
          <ListGroup.Item key={todo.id}
                          className="d-flex justify-content-between align-items-center">
            {todo.title}
            <div className="d-flex">  // Wrap buttons in a div with d-flex
              <Button onClick={() => setTodo(todo)}
                      id="wd-set-todo-click"
                      variant="primary"
                      className="me-2">
                Edit
              </Button>
              <Button onClick={() => deleteTodo(todo.id)}
                      id="wd-delete-todo-click"
                      variant="danger">
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))} */}
      </ListGroup>
      <hr />
    </div>
  );
}