import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC.tsx";  // TOC: Table of Contents
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
export default function Labs() {
    return (
        <div id="wd-labs">
            <div>
                <h2>My Name: Yunwen Hu</h2>
                <a id="wd-github" href="https://github.com/Jamieyw/kambaz-react-web-app">GitHub Repository</a>
            </div>
            <h1>Labs</h1>
            <TOC />  {/* TOC is always rendered */}
            <Routes>
                <Route path="/" element={<Navigate to="Lab1" />} />
                <Route path="Lab1" element={<Lab1 />} />
                <Route path="Lab2/*" element={<Lab2 />} />
                <Route path="Lab3/*" element={<Lab3 />} />
            </Routes>
        </div>
    );
}