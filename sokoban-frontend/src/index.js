import React from "react";
import ReactDOM from "react-dom/client";
import Solver from "./Solver";
import "simplebar-react/dist/simplebar.min.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Solver />
    <footer>
      <a href="https://github.com/michal-sar">Michał Sar</a>
    </footer>
  </React.StrictMode>,
);
