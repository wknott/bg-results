import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Users from './components/Users';
import CreateGame from './components/CreateGame';
import CreateResult from './components/CreateResult';
import ResultsList from './components/ResultsList';
import NavbarBGR from './components/Navbar';
import GameStatistics from './components/GameStatistics';

import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <NavbarBGR />
        <Route path="/" exact component={ResultsList} />
        <Route path="/users" exact component={Users} />
        <Route path="/game" exact component={CreateGame} />
        <Route path="/result" exact component={CreateResult} />
        <Route path="/gamestats" exact component={GameStatistics} />
      </div>
    </Router>
  );
}

export default App;
