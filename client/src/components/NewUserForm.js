import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

export default class NewUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      imgUrl: '',
      loading: false
    };
  }
  onChangeUsername = e => {
    this.setState({ username: e.target.value });
  };
  onChangeImgUrl = e => {
    this.setState({ imgUrl: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const user = { username: this.state.username, imgUrl: this.state.imgUrl };
    this.setState({ loading: true });
    fetch('api/users/add', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-type': 'application/json' }
    }).then(() => {
      this.props.onCreated();
      this.setState({ loading: false, username: '' });
    });
  };
  render() {
    return (
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
  }
}
