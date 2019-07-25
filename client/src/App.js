import React from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";

import CreateUser from "./components/CreateUser";

function App() {
  return (
    <Router>
      <Route path="/" exact component={CreateUser} />

    </Router>
  );
}

export default App;
