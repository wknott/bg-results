import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Users from './components/Users';
import Games from './components/Games';
import CreateResult from './components/CreateResult';
import Results from './components/Results';
import NavbarBGR from './components/Navbar';
import GameStatistics from './components/GameStatistics';
import Result7Wonders from './components/Result7Wonders';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <NavbarBGR />
        <Route path="/" exact component={Results} />
        <Route path="/users" exact component={Users} />
        <Route path="/games" exact component={Games} />
        <Route path="/result" exact component={CreateResult} />
        <Route path="/gamestats" exact component={GameStatistics} />
        <Route path="/7wonders" exact component={Result7Wonders} />
      </div>
    </Router>
  );
}

export default App;
