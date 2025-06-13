import { useEffect, useState } from "react";
import * as client from "./client";

export default function HttpClient() {
  // welcomeOnClickt will store the response data from the server.
  const [welcomeOnClick, setWelcomeOnClick] = useState("");

  const [welcomeOnLoad, setWelcomeOnLoad] = useState("");

  // Defines an asynchronous function to fetch data from the server when a button is clicked
  const fetchWelcomeOnClick = async () => {
    const message = await client.fetchWelcomeMessage();
    setWelcomeOnClick(message);
  };

  const fetchWelcomeOnLoad = async () => {
    const welcome = await client.fetchWelcomeMessage();
    setWelcomeOnLoad(welcome);
  };
  // useEffect hook: This hook runs side effects after every render.
  // When the dependency array `[]` is empty, it means the effect
  // will only run once after the initial render (component mount),
  // simulating a 'componentDidMount' behavior to fetch data on load.
  useEffect(() => {
    fetchWelcomeOnLoad();
  }, []);

  return (
    <div>
      <h3>HTTP Client</h3>
      <h4>Requesting on Click</h4>
      <button className="btn btn-primary me-2"
          onClick={fetchWelcomeOnClick}>
        Fetch Welcome
      </button><br />
      Response from server: <b>{welcomeOnClick}</b>
      <hr />

      <h4>Requesting on Load</h4>
      Response from server: <b>{welcomeOnLoad}</b>
      <hr />
    </div>
  );
}