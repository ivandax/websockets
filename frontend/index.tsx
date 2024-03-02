import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";

const toaster = document.getElementById("root");

const root = ReactDOM.createRoot(toaster as HTMLElement);

root.render(<App />);
