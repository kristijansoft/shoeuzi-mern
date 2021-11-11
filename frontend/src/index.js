import React from "react";
import { hydrate, render } from "react-dom";
import App from "./app/App";
import "./styles/index.css";

const rootElement = document.getElementById("root");

if (rootElement?.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
