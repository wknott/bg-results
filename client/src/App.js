import React from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";

import CreateUser from "./components/CreateUser";
import CreateGame from "./components/CreateGame";
import CreateResult from "./components/CreateResult";

function App() {
  return (
    <Router>
      <Route path="/user" exact component={CreateUser} />
      <Route path="/game" exact component={CreateGame} />
      <Route path="/result" exact component={CreateResult} />
    </Router>
  );
}

export default App;
