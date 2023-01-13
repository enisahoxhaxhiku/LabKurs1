import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router } from "react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router history={history}>
      <App />
    </Router>
);

reportWebVitals();