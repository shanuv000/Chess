import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import FirebaseContextProvider from "./context/FirebaseContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <FirebaseContextProvider>
      <App />
    </FirebaseContextProvider>
  </BrowserRouter>
);
