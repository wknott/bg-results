import React, { Component } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { addGamesAndWinns } from '../logic/game-statistics';
import NewUserForm from './NewUserForm';
import UsersTable from './UsersTable';
export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      user: null,
      imgUrl: '',
      show: false
    };
  }

  loadUsers = () => {
    const resultsPromise = fetch('/results/').then(response => response.json());
    const usersPromise = fetch('/users/').then(response => response.json());
    Promise.all([resultsPromise, usersPromise]).then(([results, users]) => {
      const newUsers = addGamesAndWinns(results, users);
      this.setState({ users: newUsers });
    });
  };

  componentDidMount() {
    this.loadUsers();
  }

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
    }).then(() => {
      this.loadUsers();
      this.setState({
        show: false,
        imgUrl: ''
      });
    });
  };

  render() {
    if (this.state.users === null || this.state.users === [])
      return (
        <Container>
          <NewUserForm onCreated={this.loadUsers} />
        </Container>
      );
    else {
      const { users } = this.state;
      return (
        <Container>
          <Row>
            <Col>
              <NewUserForm onCreated={this.loadUsers} />
            </Col>
          </Row>
          <Row className="hidden-lg">
            <Col>
              <br />{' '}
              <UsersTable
                handleImageChange={this.handleImageChange}
                users={users.sort((a, b) => b.games - a.games)}
              />
            </Col>
          </Row>
          <Row className="hidden-xs">
            <Col>
              <br />{' '}
              <UsersTable
                handleImageChange={this.handleImageChange}
                users={users
                  .sort((a, b) => b.games - a.games)
                  .filter((game, index) => index < this.state.users.length / 2)}
              />
            </Col>
            <Col>
              <br />{' '}
              <UsersTable
                handleImageChange={this.handleImageChange}
                users={users
                  .sort((a, b) => b.games - a.games)
                  .filter(
                    (game, index) => index >= this.state.users.length / 2
                  )}
              />
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
