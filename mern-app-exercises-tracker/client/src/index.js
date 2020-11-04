import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Navbar } from "./components/navbar";
import { UsersList } from "./components/users-list";
import { ExercisesList } from "./components/exercises-list";
import { CreateUser } from "./components/create-user";
import CreateExercise from "./components/create-exercise";
import EditExercise from "./components/edit-exercise";

const App = () => (
  <Router>
    <div className="container">
      <Navbar />
      <Route path="/" exact component={UsersList} />
      <Route path="/exercises" component={ExercisesList} />
      <Route path="/create-user" component={CreateUser} />
      <Route path="/create-exercise" component={CreateExercise} />
      <Route path="/edit/:id" component={EditExercise} />
    </div>
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
