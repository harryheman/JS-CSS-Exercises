import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// import Counter from "./classes/Counter";
// import Counter from "./hooks/Counter";

// import Greeting from "./classes/Greeting";
// import Greeting from "./hooks/Greeting";

// import App from "./classes/Profile";
import App from "./hooks/Profile";

ReactDOM.render(
  <React.StrictMode>
    <Counter />
    <Greeting />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
