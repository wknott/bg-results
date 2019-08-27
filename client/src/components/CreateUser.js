import React, { Component } from 'react';
import {
  Form,
  Button,
  Table,
  Container,
  Row,
  Col,
  Image
} from 'react-bootstrap';
import { addGamesAndWinns } from '../logic/game-statistics';
export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      users: null,
      results: null,
      username: '',
      loading: false
    };
  }

  componentDidMount() {
    const resultsPromise = fetch('/results/').then(response => response.json());
    const usersPromise = fetch('/users/').then(response => response.json());
    Promise.all([resultsPromise, usersPromise]).then(([results, users]) => {
      const newUsers = addGamesAndWinns(results, users);
      this.setState({ users: newUsers });
    });
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = { username: this.state.username };
    this.setState = { loading: true };
    console.log(user);
    fetch('/users/add', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-type': 'application/json' }
    }).then(() => {
      this.setState({ username: '', loading: false });
    });
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
        <Button
          disabled={this.state.loading || !this.state.username}
          type="submit"
          variant="primary"
        >
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
          <Row className="hidden-lg">
            <Col>
              <br />{' '}
              <Table responsive size="sm" striped bordered hover variant="dark">
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
                          <td>
                            <Image
                              roundedCircle
                              className="imgGameList"
                              src={'https://i.imgur.com/7ZeE7Ww.jpg'}
                            />
                          </td>
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
          <Row className="hidden-xs">
            <Col>
              <br />{' '}
              <Table responsive size="sm" striped bordered hover variant="dark">
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
                    .filter(
                      (game, index) => index < this.state.users.length / 2
                    )
                    .map((user, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <Image
                              roundedCircle
                              className="imgGameList"
                              src={'https://i.imgur.com/7ZeE7Ww.jpg'}
                            />
                          </td>
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
            <Col>
              <br />{' '}
              <Table responsive size="sm" striped bordered hover variant="dark">
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
                    .filter(
                      (game, index) => index >= this.state.users.length / 2
                    )
                    .map((user, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <Image
                              roundedCircle
                              className="imgGameList"
                              src={'https://i.imgur.com/7ZeE7Ww.jpg'}
                            />
                          </td>
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
