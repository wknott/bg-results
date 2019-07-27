import React from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";

import CreateUser from "./components/CreateUser";
import CreateGame from "./components/CreateGame";
import CreateResult from "./components/CreateResult";
import ResultsList from "./components/ResultsList";


function App() {
  return (
    <Router>
      <Route path="/" exact component={ResultsList} />
      <Route path="/user" exact component={CreateUser} />
      <Route path="/game" exact component={CreateGame} />
      <Route path="/result" exact component={CreateResult} />
    </Router>
  );
}

export default App;
