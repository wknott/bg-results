import React from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";

import CreateUser from "./components/CreateUser";
import CreateGame from "./components/CreateGame";

function App() {
  return (
    <Router>
      <Route path="/user" exact component={CreateUser} />
      <Route path="/game" exact component={CreateGame} />
    </Router>
  );
}

export default App;
