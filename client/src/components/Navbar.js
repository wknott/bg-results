import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Board Games Results
        </Link>
        <div className="mr-auto">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/result" className="nav-link">
                Create result
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">
                Create user
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/game" className="nav-link">
                Create game
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
