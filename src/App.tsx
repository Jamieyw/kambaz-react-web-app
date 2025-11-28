import Labs from "./Labs";
import Kambaz from "./Kambaz";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Kambaz/store";
import LandingPage from "./LandingPage";

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
            <Route path="/" element={<Navigate to="Landing-page" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kambaz/*" element={<Kambaz />} />
            <Route path="/Landing-page" element={<LandingPage />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}