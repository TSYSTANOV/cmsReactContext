import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ModalContextApp } from "./context/ModalContextApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ModalContextApp>
    <App />
  </ModalContextApp>
);
