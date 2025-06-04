import CounterRedux from "./CounterRedux";
import HelloRedux from "./HelloRedux";
import AddReducer from "./AddRedux";

export default function ReduxExamples() {
  return (
    <div>
      <h2>Redux Examples</h2>
      <HelloRedux />
      <CounterRedux />
      <AddReducer />
    </div>
  );
}