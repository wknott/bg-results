import React, { Component } from 'react';
import {
  Form,
  Button,
  Table,
  Container,
  Row,
  Col,
  Image,
  Modal
} from 'react-bootstrap';
import { addGamesAndWinns } from '../logic/game-statistics';
export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      user: null,
      results: null,
      username: '',
      imgUrl: '',
      loading: false,
      show: false
    };
  }

  componentDidMount() {
    const resultsPromise = fetch('/results/').then(response => response.json());
    const usersPromise = fetch('/users/').then(response => response.json());
    Promise.all([resultsPromise, usersPromise]).then(([results, users]) => {
      const newUsers = addGamesAndWinns(results, users);
      this.setState({ users: newUsers, results });
    });
  }

  onChangeUsername = e => {
    this.setState({ username: e.target.value });
  };
  onChangeImgUrl = e => {
    this.setState({ imgUrl: e.target.value });
  };

  handleImageChange = user => {
    this.setState({ show: true, user });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  onSubmitUpdate = e => {
    e.preventDefault();
    const user = {
      username: this.state.user.username,
      imgUrl: this.state.imgUrl
    };
    fetch(`/users/update/${this.state.user._id}`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-type': 'application/json' }
    });
    fetch('/users/')
      .then(response => response.json())
      .then(data => {
        const newUsers = addGamesAndWinns(this.state.results, data);
        this.setState({
          username: '',
          imgUrl: '',
          loading: false,
          show: false,
          users: newUsers
        });
      });
  };

  onSubmit = e => {
    e.preventDefault();
    const user = { username: this.state.username, imgUrl: this.state.imgUrl };
    fetch('/users/add', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-type': 'application/json' }
    }).then(() => {
      this.setState({ loading: true });
    });
    fetch('/users/')
      .then(response => response.json())
      .then(data => {
        const newUsers = addGamesAndWinns(this.state.results, data);
        this.setState({
          username: '',
          imgUrl: '',
          loading: false,
          users: newUsers
        });
      });
  };

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
        <Form.Group>
          <Form.Control
            placeholder="User image URL"
            type="text"
            required
            value={this.state.imgUrl}
            onChange={this.onChangeImgUrl}
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
                          <td
                            style={{ cursor: 'pointer' }}
                            onClick={() => this.handleImageChange(user)}
                          >
                            <Image
                              roundedCircle
                              className="imgGameList"
                              src={
                                user.imgUrl || 'https://i.imgur.com/7ZeE7Ww.jpg'
                              }
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
                          <td
                            style={{ cursor: 'pointer' }}
                            onClick={() => this.handleImageChange(user)}
                          >
                            <Image
                              roundedCircle
                              className="imgGameList"
                              src={
                                user.imgUrl || 'https://i.imgur.com/7ZeE7Ww.jpg'
                              }
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
                          <td
                            style={{ cursor: 'pointer' }}
                            onClick={() => this.handleImageChange(user)}
                          >
                            <Image
                              roundedCircle
                              className="imgGameList"
                              src={
                                user.imgUrl || 'https://i.imgur.com/7ZeE7Ww.jpg'
                              }
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
          <Modal
            className="dark-modal"
            centered
            show={this.state.show !== false}
            onHide={this.handleClose}
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              Add User image URL:
              <Form onSubmit={this.onSubmitUpdate}>
                <Form.Group>
                  <Form.Control
                    placeholder="User image URL"
                    type="text"
                    required
                    value={this.state.imgUrl}
                    onChange={this.onChangeImgUrl}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Update User
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      );
    }
  }
}
