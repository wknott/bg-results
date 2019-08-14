import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
export default class NavbarBGR extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Board Game Results</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
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
                <li className="navbar-item">
                  <Link to="/gamestats" className="nav-link">
                    Games
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
