import React, { Component } from 'react';
import { Form, Button, Table, Container, Row, Col } from 'react-bootstrap';
import { getWinners } from '../logic/game-statistics';
export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      users: null,
      results: null,
      username: ''
    };
  }

  componentDidMount() {
    const resultsPromise = fetch('/results/').then(response => response.json());
    const usersPromise = fetch('users/').then(response => response.json());
    Promise.all([resultsPromise, usersPromise]).then(([results, users]) => {
      users = this.addGamesAndWinns(results, users);
      this.setState({ users });
    });
  }

  addGamesAndWinns(results, users) {
    users.map(user => {
      results.map(result => {
        result.scores.map(score => {
          if (score.user.username === user.username)
            user.games = (user.games || 0) + 1;
          return user;
        });
        getWinners(result).map(winner => {
          if (user.username === winner) user.wins = (user.wins || 0) + 1;
          return user;
        });
        return user;
      });
      return user;
    });
    return users;
  }
  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = { username: this.state.username };
    console.log(user);
    fetch(' /users/add', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-type': 'application/json' }
    });
    this.setState({ username: '' });
    fetch('/users/')
      .then(response => response.json())
      .then(data => {
        const users = data;
        this.setState({ users });
      });
  }

  render() {
    const addUser = (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Control
            placeholder="Username"
            type="text"
            required
            value={this.state.username}
            onChange={this.onChangeUsername}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Create User
        </Button>
      </Form>
    );
    if (this.state.users === null || this.state.users === [])
      return <Container>{addUser}</Container>;
    else {
      return (
        <Container>
          <Row>
            <Col>{addUser}</Col>
          </Row>
          <Row>
            <Col md="6">
              <br />{' '}
              <Table size="sm" striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <td>#</td>
                    <td>Name</td>
                    <td>Wins</td>
                    <td>Games</td>
                    <td>%</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users
                    .sort((a, b) => b.games - a.games)
                    .map((user, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.username}</td>
                          <td>{user.wins}</td>
                          <td>{user.games}</td>
                          <td>
                            {((user.wins / user.games) * 100).toFixed(0)}%
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}
