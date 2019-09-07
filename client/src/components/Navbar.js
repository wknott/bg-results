import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
export default class NavbarBGR extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand as={Link} to="/" href="#">
          Board Game Results
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/result" href="#">
              Create result
            </Nav.Link>
            <Nav.Link as={Link} to="/users" href="#">
              Users
            </Nav.Link>
            <Nav.Link as={Link} to="/game" href="#">
              Create game
            </Nav.Link>
            <Nav.Link as={Link} to="/gamestats" href="#">
              Games
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
