import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import CreateUser from './components/CreateUser';
import CreateGame from './components/CreateGame';
import CreateResult from './components/CreateResult';
import ResultsList from './components/ResultsList';
import Navbar from './components/Navbar';
import GameStatistics from './components/GameStatistics';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/" exact component={ResultsList} />
        <Route path="/user" exact component={CreateUser} />
        <Route path="/game" exact component={CreateGame} />
        <Route path="/result" exact component={CreateResult} />
        <Route path="/gamestats" exact component={GameStatistics} />
      </div>
    </Router>
  );
}

export default App;
