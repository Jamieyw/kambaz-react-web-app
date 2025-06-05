import Labs from "./Labs";
import Kambaz from "./Kambaz";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Kambaz/store";

/**
 * Main application component that sets up routing using HashRouter.
 * Routes include:
 * - Root path ("/") redirects to the "Kambaz" route
 * - "/Labs/*" renders the Labs component (which contains the TOC)
 * - "/Kambaz/*" renders the Kambaz component
 * @returns The rendered application with configured routes
 */
export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Kambaz" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kambaz/*" element={<Kambaz />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}