import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

export default class NewGameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      minPlayers: '',
      maxPlayers: '',
      imgUrl: '',
      loading: false
    };
  }
  onChangeName = e => {
    this.setState({ name: e.target.value });
  };

  onChangeMinPlayers = e => {
    this.setState({ minPlayers: e.target.value });
  };

  onChangeMaxPlayers = e => {
    this.setState({ maxPlayers: e.target.value });
  };

  onChangeImgUrl = e => {
    this.setState({ imgUrl: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const game = {
      name: this.state.name,
      minPlayers: this.state.minPlayers,
      maxPlayers: this.state.maxPlayers,
      imgUrl: this.state.imgUrl
    };
    fetch('api/games/add', {
      method: 'POST',
      body: JSON.stringify(game),
      headers: { 'Content-type': 'application/json' }
    });
    fetch('api/games/')
      .then(response => response.json())
      .then(data => {
        const games = data;
        this.setState({
          name: '',
          minPlayers: '',
          maxPlayers: '',
          imgUrl: '',
          games
        });
      });
  };
  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Control
            placeholder="Name"
            type="text"
            required
            value={this.state.name}
            onChange={this.onChangeName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Min number of players"
            type="number"
            required
            value={this.state.minPlayers}
            onChange={this.onChangeMinPlayers}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Max number of players"
            type="number"
            required
            value={this.state.maxPlayers}
            onChange={this.onChangeMaxPlayers}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Game image URL"
            type="text"
            value={this.state.imgUrl}
            onChange={this.onChangeImgUrl}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Game
        </Button>
      </Form>
    );
  }
}
