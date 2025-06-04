import { useState } from "react";
import { FormControl } from "react-bootstrap";

export default function DateStateVariable() {
  const [startDate, setStartDate] = useState(new Date());
  const dateObjectToHtmlDataString = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 : ""}${
      date.getMonth() + 1}-${date.getDate() + 1 < 10 ? 0 : ""}${date.getDate() + 1}`
  };

  return (
    <div id="wd-date-state-variables">
      <h2>Date State Variables</h2>
      <h3>{JSON.stringify(startDate)}</h3>
      <h3>{dateObjectToHtmlDataString(startDate)}</h3>
      <FormControl
        type="date"
        defaultValue={dateObjectToHtmlDataString(startDate)}
        onChange={(e) => {setStartDate(new Date(e.target.value))}}
      />
      <hr />
    </div>
  );
}