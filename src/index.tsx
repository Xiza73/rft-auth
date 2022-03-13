import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "./layout/Layout";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Layout>
        <App />
      </Layout>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
