import { Container, ListGroup } from "react-bootstrap";
import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import BooleanVariables from "./BooleanVariables"
import IfElse from "./IfElse";
import TernaryOperator from "./TernaryOperator";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse"
import ConditionalOutputInline from "./ConditionalOutputInline";
import LegacyFunctions from "./LegacyFunctions";
import ArrowFunctions from "./ArrowFunctions";
import ImpliedReturn from "./ImpliedReturn";
import TemplateLiterals from "./TemplateLiterals";
import SimpleArrays from "./SimpleArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ForLoops from "./ForLoops";
import MapFunction from "./MapFunction";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import FilterFunction from "./FilterFunction";
import JsonStringify from "./JsonStringify";
import House from "./House";
import TodoItem from "./TodoItem";
import TodoList from "./TodoList";
import Spreading from "./Spreading";
import Destructing from "./Destructing";
import FunctionDestructing from "./FunctionDestructing";
import DestructingImports from "./DestructingImports";
import Classes from "./Classes";
import Styles from "./Styles";
import Add from "./Add";
import Square from "./Square";
import Highlight from "./Highlight";
import PathParameters from "./PathParameters";
import { useSelector } from "react-redux";

export default function Lab3() {
  console.log("Hello World!");
  const { todos } = useSelector((state: any) => state.todosReducer);

  return (
    <Container>
      <div id="wd-lab3">
        <h2>Lab3 - JavaScript</h2>
        
        <ListGroup>
          {todos.map((todo: any) => (
            <ListGroup.Item key={todo.id}>
              {todo.title}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <VariablesAndConstants />
        <VariableTypes />
        <BooleanVariables />
        <IfElse />
        <TernaryOperator />
        <ConditionalOutputIfElse />
        <ConditionalOutputInline />
        <LegacyFunctions />
        <ArrowFunctions />
        <ImpliedReturn />
        <TemplateLiterals />
        <SimpleArrays />
        <ArrayIndexAndLength />
        <AddingAndRemovingToFromArrays />
        <ForLoops />
        <MapFunction />
        <FindFunction />
        <FindIndex />
        <FilterFunction />
        <JsonStringify />
        <House />
        <TodoItem />
        <TodoList />
        <Spreading />
        <Destructing />
        <FunctionDestructing />
        <DestructingImports />
        <Classes />
        <Styles />

        <Add a={3} b={4} />

        <h4>Square of 4</h4>
        <Square>4</Square>
        <hr />

        <Highlight>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
          vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
        </Highlight>
        <hr />

        <PathParameters />
      </div>
    </Container>
  );
}